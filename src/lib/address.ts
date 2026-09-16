// Shared between the client form and the API routes, so no "server-only"
// import here — these are plain functions/constants, safe in the browser.

// HTML `pattern` attribute strings (not RegExp — React inputs need a plain
// string here), doubling as the source for the server-side RegExp below.
export const POSTAL_CODE_PATTERNS: Record<"CA" | "US", string> = {
  // Canadian postal code, e.g. "V2G 4L2" — letters exclude D,F,I,O,Q,U per
  // Canada Post's format, but we keep the pattern permissive (any letter)
  // since the goal is catching obvious typos, not full CASS-style validation.
  CA: "^[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d$",
  US: "^\\d{5}(-\\d{4})?$",
};

export const POSTAL_CODE_PLACEHOLDERS: Record<"CA" | "US", string> = {
  CA: "e.g. V2G 4L2",
  US: "e.g. 90210",
};

export function isValidPostalCode(postalCode: string, country: string): boolean {
  const pattern = POSTAL_CODE_PATTERNS[country as "CA" | "US"];
  if (!pattern) return true; // unknown country code — not ours to validate
  return new RegExp(pattern).test(postalCode.trim());
}
