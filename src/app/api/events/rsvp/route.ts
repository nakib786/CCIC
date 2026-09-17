import { NextResponse } from "next/server";
import { createRsvp, WixApiError, type CreateRsvpInput, type RsvpInputValue } from "@/lib/wix";

// Wix application error codes (see CreateRsvp's documented error list) mapped
// to copy a site visitor can act on. Anything not listed here falls back to a
// generic message rather than leaking a raw Wix error code.
const FRIENDLY_ERRORS: Record<string, string> = {
  MEMBER_EMAIL_ALREADY_REGISTERED: "You've already RSVP'd to this event with that email address.",
  RSVP_LIMIT_EXCEEDED: "Sorry — this event just reached its guest limit.",
  GUEST_LIMIT_EXCEEDED: "Sorry — that many guests would go over the event's guest limit. Try a smaller number.",
  RSVPS_CLOSED: "RSVPs for this event are now closed.",
  RSVPS_NOT_STARTED: "RSVPs for this event haven't opened yet.",
  WAITING_LIST_UNAVAILABLE: "The waitlist isn't available for this event.",
  ADDITIONAL_GUESTS_MUST_HAVE_NAMES: "Please add a name for each additional guest.",
  INVALID_FORM_RESPONSE: "Please check the form for missing or invalid fields and try again.",
  EVENT_NOT_FOUND: "This event couldn't be found — it may have been removed.",
  INVALID_EVENT_TYPE: "This event doesn't accept RSVPs.",
};

function parseInputValues(raw: unknown): RsvpInputValue[] {
  if (!Array.isArray(raw)) return [];
  const values: RsvpInputValue[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") continue;
    const e = entry as Record<string, unknown>;
    if (typeof e.inputName !== "string" || !e.inputName) continue;
    const value: RsvpInputValue = { inputName: e.inputName };
    if (typeof e.value === "string") value.value = e.value;
    if (Array.isArray(e.values)) value.values = e.values.filter((v): v is string => typeof v === "string");
    if (value.value !== undefined || (value.values && value.values.length > 0)) values.push(value);
  }
  return values;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const b = body as Record<string, unknown>;

  const eventId = typeof b.eventId === "string" ? b.eventId.trim() : "";
  const firstName = typeof b.firstName === "string" ? b.firstName.trim() : "";
  const lastName = typeof b.lastName === "string" ? b.lastName.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const status = b.status === "NO" ? "NO" : b.status === "WAITLIST" ? "WAITLIST" : "YES";

  if (!eventId || !firstName || !lastName || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  let additionalGuestDetails: CreateRsvpInput["additionalGuestDetails"];
  if (b.additionalGuestDetails && typeof b.additionalGuestDetails === "object") {
    const g = b.additionalGuestDetails as Record<string, unknown>;
    const guestCount = typeof g.guestCount === "number" && g.guestCount > 0 ? Math.floor(g.guestCount) : 0;
    if (guestCount > 0) {
      const guestNames = Array.isArray(g.guestNames)
        ? g.guestNames.filter((n): n is string => typeof n === "string" && n.trim() !== "")
        : undefined;
      additionalGuestDetails = { guestCount, ...(guestNames && guestNames.length ? { guestNames } : {}) };
    }
  }

  try {
    const rsvp = await createRsvp({
      eventId,
      firstName,
      lastName,
      email,
      status,
      inputValues: parseInputValues(b.inputValues),
      additionalGuestDetails,
    });
    return NextResponse.json({ ok: true, status: rsvp.status, totalGuests: rsvp.totalGuests });
  } catch (err) {
    const code = err instanceof WixApiError ? err.applicationCode : undefined;
    console.error("RSVP submission failed", err);
    // A known business-rule rejection (e.g. already registered, event closed)
    // is a 409; any other 4xx Wix hands back (should only happen from a
    // tampered request, since eventId always comes from a real fetched
    // event) is a 400; anything else — network failure, a 5xx from Wix — is
    // a genuine upstream failure, 502.
    const status = code ? 409 : err instanceof WixApiError && err.status < 500 ? 400 : 502;
    return NextResponse.json(
      { error: (code && FRIENDLY_ERRORS[code]) || "Submission failed. Please try again.", code },
      { status }
    );
  }
}
