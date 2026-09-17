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

// Thrown by wixFetch on a non-OK response. Every existing caller already
// treats a thrown Error as an opaque fallback trigger (`.catch(() => ...)`),
// so this stays a drop-in Error subclass — but callers that need to react to
// a *specific* failure (e.g. the RSVP route mapping a duplicate-email RSVP to
// a friendly message) can check `applicationCode` instead of string-parsing
// message text. Shape per https://dev.wix.com/docs/api-reference/articles/work-with-wix-apis/troubleshooting/about-errors.
export class WixApiError extends Error {
  readonly status: number;
  readonly body: string;

  constructor(status: number, body: string) {
    super(`Wix API failed: ${status} ${body}`);
    this.name = "WixApiError";
    this.status = status;
    this.body = body;
  }

  get applicationCode(): string | undefined {
    try {
      const parsed = JSON.parse(this.body) as { details?: { applicationError?: { code?: string } } };
      return parsed.details?.applicationError?.code;
    } catch {
      return undefined;
    }
  }
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
    throw new WixApiError(res.status, await res.text());
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

// Wix Events supports 4 registration types (Registration.type): RSVP,
// TICKETING, EXTERNAL, and NONE. This site implements the RSVP flow
// end-to-end (see createRsvp below) — TICKETING and EXTERNAL events link out
// to the Wix-hosted event page instead of reimplementing Wix's
// checkout/payment flow, which is a separate API surface entirely.
export type RsvpResponseType = "YES_ONLY" | "YES_AND_NO";

export type EventRegistrationStatus =
  | "UNKNOWN_REGISTRATION_STATUS"
  | "CLOSED_AUTOMATICALLY"
  | "CLOSED_MANUALLY"
  | "OPEN_RSVP"
  | "OPEN_RSVP_WAITLIST_ONLY"
  | "OPEN_TICKETS"
  | "OPEN_EXTERNAL"
  | "SCHEDULED_RSVP";

export type EventRegistration = {
  type: "RSVP" | "TICKETING" | "EXTERNAL" | "NONE";
  status: EventRegistrationStatus;
  initialType: "RSVP" | "TICKETING";
  rsvp?: {
    responseType: RsvpResponseType;
    limit?: number;
    waitlistEnabled?: boolean;
    startDate?: string;
    endDate?: string;
  };
  external?: { url?: string };
};

// Mirrors wix.events.form.Input — the field(s) inside one form control. Most
// controls have exactly 1 input; GUEST_CONTROL has 2 (a NUMBER guest count +
// a TEXT_ARRAY of guest names) and ADDRESS_FULL can have several, one per
// address line (see additionalLabels).
export type RsvpFormInput = {
  name: string;
  label: string;
  mandatory: boolean;
  type: "TEXT" | "NUMBER" | "TEXT_ARRAY" | "DATE_TIME" | "ADDRESS";
  options?: string[];
  maxLength?: number;
  maxSize?: number;
  additionalLabels?: Record<string, string>;
};

export type RsvpFormControl = {
  id: string;
  type:
    | "INPUT"
    | "TEXTAREA"
    | "DROPDOWN"
    | "RADIO"
    | "CHECKBOX"
    | "NAME"
    | "GUEST_CONTROL"
    | "ADDRESS_SHORT"
    | "ADDRESS_FULL"
    | "DATE";
  system: boolean;
  orderIndex: number;
  inputs: RsvpFormInput[];
  deleted?: boolean;
};

// Customizable copy from the Wix dashboard (Events > Registration Form >
// Messages) — rendering these instead of hardcoded strings keeps the site in
// sync with whatever the board sets up in Wix, same as getContactFormFields.
export type RsvpFormMessages = {
  rsvpYesOption?: string;
  rsvpNoOption?: string;
  submitActionLabel?: string;
  positiveMessages?: { title?: string; confirmation?: { title?: string; message?: string } };
  waitlistMessages?: { title?: string; confirmation?: { title?: string; message?: string } };
  negativeMessages?: { title?: string; confirmation?: { title?: string } };
};

export type RsvpForm = {
  controls: RsvpFormControl[];
  messages?: { rsvp?: RsvpFormMessages; registrationClosed?: { message?: string } };
};

export type WixEvent = {
  id: string;
  title: string;
  slug: string;
  status: "UPCOMING" | "STARTED" | "ENDED" | "CANCELED" | string;
  shortDescription?: string;
  mainImage?: { url: string };
  location?: { name?: string; locationTbd?: boolean; address?: { formattedAddress?: string } };
  dateAndTimeSettings?: {
    formatted?: { dateAndTime?: string };
    dateAndTimeTbd?: boolean;
    // ISO 8601 (RFC3339), confirmed against the live Query Events schema —
    // only present when dateAndTimeTbd is false.
    startDate?: string;
    endDate?: string;
  };
  eventPageUrl?: { base: string; path: string };
  // Only present when fetched with fields: ["REGISTRATION"] / ["FORM"].
  registration?: EventRegistration;
  form?: RsvpForm;
};

export async function getEvents(): Promise<WixEvent[]> {
  const data = await wixFetch<{ events: WixEvent[] }>("/events/v3/events/query", {
    method: "POST",
    body: JSON.stringify({
      query: { filter: { status: { $ne: "CANCELED" } }, paging: { limit: 50 } },
      // REGISTRATION is cheap (no per-event extra round trip, it's returned
      // inline by Query Events) and lets the list page show the right CTA
      // (RSVP / Get Tickets / Sold Out) without a detail-page fetch.
      fields: ["DETAILS", "TEXTS", "URLS", "REGISTRATION"],
      includeDrafts: false,
    }),
  });
  return data.events ?? [];
}

/**
 * Retrieves a single event with its full registration + form definition —
 * for the event detail/RSVP page. Unlike getEvents(), this always includes
 * FORM, which is too expensive to request for every event in a list.
 */
export async function getEventBySlug(slug: string): Promise<WixEvent | null> {
  const fields = ["DETAILS", "TEXTS", "URLS", "REGISTRATION", "FORM"];
  const query = fields.map((f) => `fields=${f}`).join("&");
  try {
    const data = await wixFetch<{ event: WixEvent }>(`/events/v3/events/slug/${encodeURIComponent(slug)}?${query}`);
    return data.event ?? null;
  } catch (err) {
    if (err instanceof WixApiError && (err.status === 404 || err.applicationCode === "EVENT_NOT_FOUND")) {
      return null;
    }
    throw err;
  }
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

export type DonationTotal = { raised: number; target: number; lastUpdated: string | null };

// Wix Data returns its system date fields (_createdDate/_updatedDate) as
// extended-JSON ({ "$date": "<ISO8601>" }) rather than a plain string —
// confirmed against a live query-items response for this collection.
function wixDateToIso(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && typeof (value as { $date?: unknown }).$date === "string") {
    return (value as { $date: string }).$date;
  }
  return null;
}

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
  return {
    raised: Number(item.number) || 0,
    target: Number(item.target) || 0,
    lastUpdated: wixDateToIso(item._updatedDate),
  };
}

export type SiteSettings = { email: string | null; address: string | null };

/**
 * Reads the site's contact email and mailing address from the "SiteSettings"
 * Wix Data collection (a single-item collection — see the Wix CMS/Content
 * Manager) so the site owner can update them from the Wix dashboard without
 * a code change/redeploy. Callers should fall back to the CONTACT_EMAIL /
 * ADDRESS_LINE constants in @/lib/site on failure (collection missing/empty,
 * API error, etc) or for any field not yet set.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await wixFetch<{ dataItems: Array<{ data: Record<string, any> }> }>(
    "/wix-data/v2/items/query",
    {
      method: "POST",
      body: JSON.stringify({
        dataCollectionId: "SiteSettings",
        query: { paging: { limit: 1 } },
      }),
    }
  );
  const item = data.dataItems[0]?.data ?? {};
  return {
    email: typeof item.email === "string" && item.email ? item.email : null,
    address: typeof item.address === "string" && item.address ? item.address : null,
  };
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

// "Tax Receipt Request" Wix Forms schema (Forms & Submissions app), created
// for donors who gave by cash/cheque/e-Transfer/bank transfer/PayPal and need
// an official CRA donation receipt. Field targets are fixed (not read live
// like the Contact form) because several fields are structured (address,
// date, number, dropdown) rather than plain text — see submitTaxReceiptRequest.
const TAX_RECEIPT_FORM_ID = "0c5cfbb0-b16d-49a6-9e6f-2110c9dcfd1c";

export type TaxReceiptRequestInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: {
    addressLine: string;
    addressLine2?: string;
    city: string;
    // ISO 3166-2 code, e.g. "CA-BC" or "US-NY" — must match the option the
    // visitor picked from a province/state list for the chosen country.
    subdivision: string;
    postalCode: string;
    // ISO 3166-1 alpha-2, e.g. "CA" or "US".
    country: string;
  };
  // ISO date (YYYY-MM-DD).
  donationDate: string;
  donationAmount: number;
  donationMethod: string;
  referenceNumber?: string;
  notes?: string;
};

export async function submitTaxReceiptRequest(input: TaxReceiptRequestInput): Promise<void> {
  const submissions: Record<string, unknown> = {
    first_name_tr01: input.firstName,
    last_name_tr01: input.lastName,
    email_tr01: input.email,
    mailing_address_tr01: {
      country: input.address.country,
      subdivision: input.address.subdivision,
      city: input.address.city,
      postalCode: input.address.postalCode,
      addressLine: input.address.addressLine,
      ...(input.address.addressLine2 ? { addressLine2: input.address.addressLine2 } : {}),
    },
    donation_date_tr01: input.donationDate,
    donation_amount_tr01: input.donationAmount,
    donation_method_tr01: input.donationMethod,
  };
  if (input.phone) submissions.phone_tr01 = input.phone;
  if (input.referenceNumber) submissions.reference_number_tr01 = input.referenceNumber;
  if (input.notes) submissions.additional_notes_tr01 = input.notes;

  await wixFetch("/forms/v4/submissions", {
    method: "POST",
    body: JSON.stringify({
      submission: { formId: TAX_RECEIPT_FORM_ID, submissions },
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

// ---- Event RSVPs -----------------------------------------------------------

export type RsvpInputValue = { inputName: string; value?: string; values?: string[] };

export type CreateRsvpInput = {
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: "YES" | "NO" | "WAITLIST";
  // Every control the visitor filled in, keyed by the event's own form field
  // names (see RsvpForm/getEventBySlug) — echoes firstName/lastName/email too,
  // per the Create RSVP API's documented request shape.
  inputValues: RsvpInputValue[];
  // Only send this when the event's form has a GUEST_CONTROL — omit entirely
  // for events that don't support additional guests.
  additionalGuestDetails?: { guestCount: number; guestNames?: string[] };
};

export type CreateRsvpResult = { id: string; status: "YES" | "NO" | "WAITLIST"; totalGuests: number };

/**
 * Submits an RSVP for an event through the real Wix Events "RSVP & Tickets"
 * app — it lands in the site's guest list exactly as if the guest had RSVP'd
 * on a Wix-hosted event page, and triggers Wix's own guest confirmation email
 * and daily new-guest summary email to the site's business address.
 */
export async function createRsvp(input: CreateRsvpInput): Promise<CreateRsvpResult> {
  const data = await wixFetch<{ rsvp: CreateRsvpResult }>("/events/v2/rsvps", {
    method: "POST",
    body: JSON.stringify({
      rsvp: {
        eventId: input.eventId,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        status: input.status,
        form: { inputValues: input.inputValues },
        ...(input.additionalGuestDetails ? { additionalGuestDetails: input.additionalGuestDetails } : {}),
      },
    }),
  });
  return data.rsvp;
}
