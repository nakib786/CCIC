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

// "Contact Us" Wix Forms schema, edited directly in the Wix dashboard (Forms
// app) so the site owner can add/remove/relabel fields without a code change.
const CONTACT_FORM_ID = "bebda589-5a26-440d-bfa0-2528832400d0";

export type ContactFormField = {
  target: string;
  label: string;
  placeholder?: string;
  required: boolean;
  kind: "text" | "email" | "tel" | "textarea";
};

type WixRawFormField = {
  id: string;
  identifier: string;
  fieldType: "INPUT" | "DISPLAY";
  inputOptions?: {
    target: string;
    required?: boolean;
    stringOptions?: {
      componentType: string;
      textInputOptions?: { label?: string; placeholder?: string };
      phoneInputOptions?: { label?: string; placeholder?: string };
    };
  };
};

type WixRawForm = {
  formFields: WixRawFormField[];
  steps: Array<{
    layout: { large?: { items: Array<{ fieldId: string; row: number; column: number }> } };
  }>;
};

/**
 * Reads the Contact form's field list live from Wix Forms on every request
 * (no-store, via wixFetch) so editing fields/labels/required in the Wix
 * dashboard is reflected on the site without redeploying.
 */
export async function getContactFormFields(): Promise<ContactFormField[]> {
  const data = await wixFetch<{ form: WixRawForm }>(
    `/form-schema-service/v4/forms/${CONTACT_FORM_ID}`
  );
  const form = data.form;

  const order = form.steps[0]?.layout.large?.items ?? [];
  const orderIndex = new Map(
    [...order]
      .sort((a, b) => a.row - b.row || a.column - b.column)
      .map((item, index) => [item.fieldId, index])
  );

  return form.formFields
    .filter((f): f is WixRawFormField & { inputOptions: NonNullable<WixRawFormField["inputOptions"]> } =>
      f.fieldType === "INPUT" && !!f.inputOptions
    )
    .sort((a, b) => (orderIndex.get(a.id) ?? 0) - (orderIndex.get(b.id) ?? 0))
    .map((f) => {
      const options = f.inputOptions.stringOptions;
      const kind: ContactFormField["kind"] =
        f.identifier === "TEXT_AREA"
          ? "textarea"
          : f.identifier === "CONTACTS_EMAIL"
            ? "email"
            : f.identifier === "CONTACTS_PHONE"
              ? "tel"
              : "text";
      const view = options?.textInputOptions ?? options?.phoneInputOptions;
      return {
        target: f.inputOptions.target,
        label: view?.label ?? f.inputOptions.target,
        placeholder: view?.placeholder,
        required: f.inputOptions.required ?? false,
        kind,
      };
    });
}

export async function submitContactForm(fields: Record<string, string>): Promise<void> {
  await wixFetch("/forms/v4/submissions", {
    method: "POST",
    body: JSON.stringify({
      submission: {
        formId: CONTACT_FORM_ID,
        submissions: fields,
      },
    }),
  });
}

// Same "Subscribe Form 2" already live in the footer and contact page of
// theccic.ca (the original Wix site) — reused here rather than creating a
// duplicate, so both sites feed the same Wix Contacts mailing list.
const SUBSCRIBE_FORM_ID = "a6a5c09a-ff02-41a7-be40-a006e8e8e3d1";

export async function isSubscribed(email: string): Promise<boolean> {
  const data = await wixFetch<{ subscriptions: Array<{ subscriptionStatus: string }> }>(
    "/email-marketing/v1/email-subscriptions/query",
    {
      method: "POST",
      body: JSON.stringify({ filter: { email: { $in: [email] } } }),
    }
  );
  return data.subscriptions.some((s) => s.subscriptionStatus === "SUBSCRIBED");
}

export async function submitSubscriber(email: string): Promise<void> {
  await wixFetch("/forms/v4/submissions", {
    method: "POST",
    body: JSON.stringify({
      submission: {
        formId: SUBSCRIBE_FORM_ID,
        submissions: {
          email,
          form_field_fcdc: true,
        },
      },
    }),
  });
}
