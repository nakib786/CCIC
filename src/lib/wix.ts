// Server-only Wix Headless client for the Central Cariboo Islamic Center site.
// Uses the client_credentials OAuth flow (admin operations) to read real data
// from the site's Wix Events, Wix Data (CMS), and Wix Forms apps.
import "server-only";

const SITE_ID = process.env.WIX_SITE_ID!;
const CLIENT_ID = process.env.WIX_CLIENT_ID!;
const CLIENT_SECRET = process.env.WIX_CLIENT_SECRET!;

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) {
    return cachedToken.value;
  }
  const res = await fetch("https://www.wixapis.com/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });
  if (!res.ok) {
    throw new Error(`Wix token exchange failed: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

async function wixFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = await getAccessToken();
  const res = await fetch(`https://www.wixapis.com${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "wix-site-id": SITE_ID,
      ...(init?.headers ?? {}),
    },
    // Live event/donation data — avoid Next's default aggressive fetch caching.
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Wix API ${path} failed: ${res.status} ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

/**
 * Converts a Wix internal media URI (wix:image://v1/<id>/<name>#...) to a real
 * https URL. Uses the plain, untransformed static.wixstatic.com/media/<id>
 * form — confirmed against real API responses (e.g. event mainImage.url) —
 * rather than guessing a transform-pipeline query syntax.
 */
export function wixImageUrl(wixImageUri: string | undefined): string | null {
  if (!wixImageUri) return null;
  const match = /^wix:image:\/\/v1\/([^/]+)\//.exec(wixImageUri);
  if (!match) return null;
  return `https://static.wixstatic.com/media/${match[1]}`;
}

export type WixEvent = {
  id: string;
  title: string;
  slug: string;
  status: "UPCOMING" | "STARTED" | "ENDED" | "CANCELED" | string;
  shortDescription?: string;
  mainImage?: { url: string };
  location?: { name?: string; address?: { formattedAddress?: string } };
  dateAndTimeSettings?: { formatted?: { dateAndTime?: string } };
  eventPageUrl?: { base: string; path: string };
};

export async function getEvents(): Promise<WixEvent[]> {
  const data = await wixFetch<{ events: WixEvent[] }>("/events/v3/events/query", {
    method: "POST",
    body: JSON.stringify({
      query: { filter: { status: { $ne: "CANCELED" } }, paging: { limit: 50 } },
      fields: ["DETAILS", "TEXTS", "URLS"],
      includeDrafts: false,
    }),
  });
  return data.events ?? [];
}

export type BoardMember = {
  id: string;
  name: string;
  designation: string;
  photoUrl: string | null;
  sortKey: string;
};

export async function getBoardMembers(): Promise<BoardMember[]> {
  const data = await wixFetch<{ dataItems: Array<{ id: string; data: Record<string, any> }> }>(
    "/wix-data/v2/items/query",
    {
      method: "POST",
      body: JSON.stringify({
        dataCollectionId: "BoardMembers",
        query: { paging: { limit: 50 } },
      }),
    }
  );
  const sortField = Object.keys(data.dataItems[0]?.data ?? {}).find((k) =>
    k.startsWith("_manualSort_")
  );
  return data.dataItems
    .map((item) => ({
      id: item.id,
      name: item.data.title as string,
      designation: (item.data.designation as string) ?? "",
      photoUrl: wixImageUrl(item.data.profilePicture as string | undefined),
      sortKey: sortField ? ((item.data[sortField] as string) ?? "") : "",
    }))
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey));
}

export type DonationTotal = { raised: number; target: number };

export async function getDonationTotal(): Promise<DonationTotal | null> {
  const data = await wixFetch<{ dataItems: Array<{ data: Record<string, any> }> }>(
    "/wix-data/v2/items/query",
    {
      method: "POST",
      body: JSON.stringify({
        dataCollectionId: "DonationTotal",
        query: { paging: { limit: 1 } },
      }),
    }
  );
  const item = data.dataItems[0]?.data;
  if (!item) return null;
  return { raised: Number(item.number) || 0, target: Number(item.target) || 0 };
}

const ARABIC_CLASSES_FORM_ID = "c7857641-eba4-4ced-9ce7-d06b6dc54011";

export async function submitArabicClassesRegistration(input: {
  firstName: string;
  lastName?: string;
  email: string;
  deliveryPreferences: string[]; // "Online (Zoom, Teams, WhatsApp)" | "In- Person"
}): Promise<void> {
  await wixFetch("/forms/v4/submissions", {
    method: "POST",
    body: JSON.stringify({
      submission: {
        formId: ARABIC_CLASSES_FORM_ID,
        submissions: {
          first_name: input.firstName,
          last_name_39e6: input.lastName ?? "",
          email_8d95: input.email,
          delivery_preferences: input.deliveryPreferences,
        },
      },
    }),
  });
}
