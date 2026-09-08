import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Only pages whose content is actually recomputed per request (live prayer
// times, live event/donation data from Wix) get today's date — claiming
// "just changed" for genuinely static pages trains crawlers to distrust
// lastmod, which hurts re-crawl prioritization more than it helps.
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    lastModified?: Date;
  }> = [
    { path: "/", priority: 1, changeFrequency: "daily", lastModified: now },
    { path: "/about/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/events/", priority: 0.9, changeFrequency: "daily", lastModified: now },
    { path: "/donate/", priority: 0.8, changeFrequency: "monthly", lastModified: now },
    { path: "/gallery/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/media/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact/", priority: 0.7, changeFrequency: "yearly" },
  ];

  return pages.map(({ path, priority, changeFrequency, lastModified }) => ({
    url: `${SITE_URL}${path}`,
    ...(lastModified ? { lastModified } : {}),
    changeFrequency,
    priority,
  }));
}
