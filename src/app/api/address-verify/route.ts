import { NextResponse } from "next/server";

// Soft, free-tier address check for the tax receipt form — confirms the
// mailing address a donor typed actually resolves to a real place before we
// send it off for a CRA receipt, without requiring any paid service.
//
// Uses Geoapify's Geocoding API (free: 3,000 requests/day, no credit card —
// https://www.geoapify.com/pricing/), which is comfortably more than this
// low-volume form will ever need. Get a free key at myprojects.geoapify.com
// and set GEOAPIFY_API_KEY (see .env.local); for production, set it with
// `wrangler secret put GEOAPIFY_API_KEY` rather than wrangler.jsonc's plain
// `vars`, since it's a credential.
//
// Fails OPEN everywhere below (unset key, upstream error, timeout, no
// match): a false "unverified" would just annoy a legitimate donor with a
// rural or PO-box address the geocoder doesn't know, whereas a false
// "verified" costs nothing — the mosque still follows up if mail bounces.

const GOOD_MATCH_TYPES = new Set([
  "full_match",
  "inner_part",
  "match_by_building",
  "match_by_street",
]);

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { text, country } = (body ?? {}) as { text?: string; country?: string };
  if (!text?.trim()) {
    return NextResponse.json({ error: "Missing address text" }, { status: 400 });
  }

  const apiKey = process.env.GEOAPIFY_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ verified: true, configured: false });
  }

  const params = new URLSearchParams({
    text: text.trim(),
    format: "json",
    limit: "1",
    apiKey,
  });
  if (country === "CA" || country === "US") {
    params.set("filter", `countrycode:${country.toLowerCase()}`);
  }

  try {
    const res = await fetch(`https://api.geoapify.com/v1/geocode/search?${params}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.error("Geoapify lookup failed", res.status, await res.text());
      return NextResponse.json({ verified: true, configured: true });
    }
    const data = (await res.json()) as {
      results?: Array<{ rank?: { confidence?: number; match_type?: string }; formatted?: string }>;
    };
    const best = data.results?.[0];
    const verified =
      !!best &&
      (GOOD_MATCH_TYPES.has(best.rank?.match_type ?? "") || (best.rank?.confidence ?? 0) >= 0.7);
    return NextResponse.json({ verified, configured: true, formatted: best?.formatted });
  } catch (err) {
    console.error("Address verification lookup failed", err);
    return NextResponse.json({ verified: true, configured: true });
  }
}
