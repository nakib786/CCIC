import { NextResponse } from "next/server";
import { isSubscribed, submitSubscriber } from "@/lib/wix";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { email } = (body ?? {}) as { email?: string };
  const trimmedEmail = email?.trim();

  if (!trimmedEmail) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  try {
    if (await isSubscribed(trimmedEmail)) {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }
    await submitSubscriber(trimmedEmail);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Subscriber submission failed", err);
    return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 502 });
  }
}
