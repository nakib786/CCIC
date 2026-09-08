import { NextResponse } from "next/server";
import { submitContactForm } from "@/lib/wix";

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

  // Field set is whatever the live Wix "Contact Us" form currently defines
  // (see getContactFormFields) — Wix itself rejects the submission if a
  // field the dashboard marks required is missing or empty.
  const fields = Object.fromEntries(
    Object.entries(body as Record<string, unknown>)
      .filter(([, v]) => typeof v === "string")
      .map(([k, v]) => [k, (v as string).trim()])
  );

  try {
    await submitContactForm(fields);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form submission failed", err);
    return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 502 });
  }
}
