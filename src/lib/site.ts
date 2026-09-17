// Single source of truth for site identity — used by metadata, robots.ts,
// sitemap.ts, and JSON-LD structured data so they can't drift out of sync.
export const SITE_URL = "https://new.theccic.ca";
export const SITE_NAME = "Central Cariboo Islamic Center";
export const SITE_DESCRIPTION =
  "Central Cariboo Islamic Center (CCIC), a chapter of the BC Muslim Association, serving the Muslim community of Williams Lake, BC with prayers, education and community programs.";

// Fallback used when the live value can't be read from the Wix CMS
// (SiteSettings collection) — see getSiteSettings() in @/lib/wix.
export const CONTACT_EMAIL = "cariboo@thebcma.com";

export const ADDRESS = {
  streetAddress: "1000 Huckvale Pl",
  addressLocality: "Williams Lake",
  addressRegion: "BC",
  postalCode: "V2G 4L2",
  addressCountry: "CA",
};

// Fallback used when the live value can't be read from the Wix CMS
// (SiteSettings collection) — see getSiteSettings() in @/lib/wix.
export const ADDRESS_LINE = `${ADDRESS.streetAddress}, ${ADDRESS.addressLocality}, ${ADDRESS.addressRegion} ${ADDRESS.postalCode}`;

// Splits a single-line address ("1000 Huckvale Pl, Williams Lake, BC V2G
// 4L2") at the first comma for the two-line display used on the contact
// blocks — matches the CMS field's "street, city/region/postal" format.
export function addressLines(address: string): [string, string] {
  const idx = address.indexOf(",");
  if (idx === -1) return [address, ""];
  return [address.slice(0, idx).trim(), address.slice(idx + 1).trim()];
}

export const GEO = { latitude: 52.1432, longitude: -122.1447 };

export const SOCIAL_LINKS = [
  "https://www.facebook.com/williamslakemuslims/",
  "https://www.instagram.com/ccic_bcma/",
];
