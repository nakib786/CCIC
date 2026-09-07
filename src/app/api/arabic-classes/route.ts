import { NextResponse } from "next/server";
import { submitArabicClassesRegistration } from "@/lib/wix";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { firstName, lastName, email, deliveryPreferences } = (body ?? {}) as {
    firstName?: string;
    lastName?: string;
    email?: string;
    deliveryPreferences?: string[];
  };

  if (!firstName?.trim() || !email?.trim() || !deliveryPreferences?.length) {
    return NextResponse.json(
      { error: "firstName, email, and at least one deliveryPreference are required" },
      { status: 400 }
    );
  }

  try {
    await submitArabicClassesRegistration({
      firstName: firstName.trim(),
      lastName: lastName?.trim(),
      email: email.trim(),
      deliveryPreferences,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Arabic classes submission failed", err);
    return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 502 });
  }
}
