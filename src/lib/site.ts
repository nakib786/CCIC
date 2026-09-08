// Single source of truth for site identity — used by metadata, robots.ts,
// sitemap.ts, and JSON-LD structured data so they can't drift out of sync.
export const SITE_URL = "https://new.theccic.ca";
export const SITE_NAME = "Central Cariboo Islamic Center";
export const SITE_DESCRIPTION =
  "Central Cariboo Islamic Center (CCIC), a chapter of the BC Muslim Association, serving the Muslim community of Williams Lake, BC with prayers, education and community programs.";

export const CONTACT_EMAIL = "cariboo.secretary@thebcma.com";

export const ADDRESS = {
  streetAddress: "1000 Huckvale Pl",
  addressLocality: "Williams Lake",
  addressRegion: "BC",
  postalCode: "V2G 4L2",
  addressCountry: "CA",
};

export const GEO = { latitude: 52.1432, longitude: -122.1447 };

export const SOCIAL_LINKS = [
  "https://www.facebook.com/williamslakemuslims/",
  "https://www.instagram.com/ccic_bcma/",
];
