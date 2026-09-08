import { SITE_URL } from "@/lib/site";

type Crumb = { name: string; path?: string };

// Matches the visible `.breadcrumb-nav` on every subpage, so search engines
// can show the same trail as a breadcrumb rich result.
export default function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: `${SITE_URL}${item.path}` } : {}),
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
