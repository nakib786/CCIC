import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Media",
  description: "News coverage, community voices and civic recognition of the Williams Lake Muslim community and the Central Cariboo Islamic Center.",
  alternates: { canonical: "/media/" },
};

type MediaItem = {
  date: string;
  outlet: string;
  title: string;
  url: string;
  excerpt: string;
};

// Newest first. Every link below was verified live before publishing —
// re-check before adding new rows, since Black Press (wltribune.com) has
// retired old article URLs before (see the 2019 Ramadan op-ed, dropped).
const NEWS: MediaItem[] = [
  {
    date: "August 1, 2026",
    outlet: "Williams Lake Tribune",
    title: "Williams Lake Muslim community member plans to run for city councillor",
    url: "https://wltribune.com/2026/08/01/williams-lake-muslim-community-member-plans-to-run-for-city-councillor/",
    excerpt: "CCIC chairperson Dr. Rafiullah Sahibzada announces his candidacy for the October 2026 civic election, citing years of volunteering with local literacy and restorative-justice groups. “I want to give back to the community by serving them.”",
  },
  {
    date: "June 30, 2026",
    outlet: "Williams Lake Tribune",
    title: "Williams Lake council affirms stand against hate, Islamophobia",
    url: "https://wltribune.com/2026/06/30/williams-lake-council-affirms-stand-against-hate-islamophobia/",
    excerpt: "After CCIC members raised safety concerns with council, Williams Lake unanimously recognizes Islamophobia as a form of harm under the B.C. Anti-Racism Act and commits to community action.",
  },
  {
    date: "March 18, 2026",
    outlet: "Williams Lake Tribune",
    title: "Central Cariboo Islamic Center eyes new land for region’s first mosque",
    url: "https://wltribune.com/2026/03/18/central-cariboo-islamic-center-eyes-new-land-for-regions-first-mosque/",
    excerpt: "The CCIC board declines its first donated parcel after a geotechnical review, and continues the search for a safe, permanent site — while still running a Ramadan food drive for local families.",
  },
  {
    date: "November 5, 2025",
    outlet: "Williams Lake Tribune · Quesnel Cariboo Observer",
    title: "Money raised, land donated for the Cariboo’s first mosque",
    url: "https://wltribune.com/2025/11/05/money-raised-land-donated-for-the-cariboos-first-mosque/",
    excerpt: "Roughly $23,000 raised and an acre of land donated at a Nov. 1 fundraiser, as the Williams Lake Muslim Association restructures into the Central Cariboo Islamic Centre under the BC Muslim Association.",
  },
  {
    date: "April 7, 2025",
    outlet: "Williams Lake Tribune",
    title: "VIDEO: Williams Lake Muslim community celebrates end of Ramadan",
    url: "https://wltribune.com/2025/04/07/video-williams-lake-muslim-community-celebrates-end-of-ramadan/",
    excerpt: "About 150 people — including guests from the Sikh, Ukrainian and Hindu communities — join an Eid al-Fitr dinner at St. Andrew’s. Mayor Rathor: “Williams Lake is a mosaic.”",
  },
  {
    date: "November 19, 2024",
    outlet: "Williams Lake Tribune / Local Journalism Initiative",
    title: "New Muslim association in Cariboo town looking to connect",
    url: "https://www.pentictonherald.ca/spare_news/article_0bd6bba0-7516-5a2d-a82d-4869af4db3f4.html",
    excerpt: "The founding story: with nearest mosque in Prince George and prayers held in a rented studio apartment, Imran Khan, Afroj Shaikh and Rafiullah Sahibzada relaunch the Williams Lake Muslim Association. “The community is actually connecting and it’s growing... in a very positive way.”",
  },
];

const VOICES: MediaItem[] = [
  {
    date: "July 24, 2021",
    outlet: "Williams Lake Tribune — Letter to the Editor",
    title: "Muslims celebrate Eid-ul-Adha",
    url: "https://www.wltribune.com/opinion/letter-muslims-celebrate-eid-ul-adha/",
    excerpt: "Dr. Rafiullah Sahibzada explains the meaning of Eid-ul-Adha and the story of Prophet Abraham’s sacrifice to Williams Lake Tribune readers.",
  },
];

function MediaCard({ item }: { item: MediaItem }) {
  return (
    <div className="col-md-6">
      <div className="causes-block give-block h-100">
        <div className="inner-block">
          <div className="content-box">
            <div className="tag"><i className="fa-solid fa-newspaper"></i> {item.outlet} &middot; {item.date}</div>
            <h3 className="h4 title">{item.title}</h3>
            <p className="text">{item.excerpt}</p>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-style-six">
              Read the Article
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MediaPage() {
  // Press mentions as structured data, matching what's visibly listed below —
  // real, independently-published coverage that reinforces this as a genuine
  // local entity (the kind of signal Google's quality guidelines call
  // E-E-A-T), not a claim the site makes about itself.
  const allMentions = [...NEWS, ...VOICES];
  const mentionsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: allMentions.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "NewsArticle",
        headline: item.title,
        url: item.url,
        datePublished: new Date(item.date).toISOString().slice(0, 10),
        description: item.excerpt,
        publisher: { "@type": "Organization", name: item.outlet },
        about: { "@type": "Mosque", name: SITE_NAME },
      },
    })),
  };

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Media" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mentionsJsonLd) }} />
      <section className="page-banner">
        <div className="container">
          <h1 className="h1">Media</h1>
          <div className="breadcrumb-nav"><Link href="/">Home</Link> <i className="fa-solid fa-angle-right"></i> Media</div>
        </div>
      </section>

      <section className="pt-120">
        <div className="container">
          <div className="row justify-content-center mb-50">
            <div className="col-lg-8 text-center">
              <span className="sub-title section-eyebrow">In the Press</span>
              <h2 className="h2 title mt-10">Williams Lake Muslims in the News</h2>
              <p className="text mt-20">
                A collection of verified local news coverage, community voices and civic milestones involving the
                Williams Lake Muslim community and the Central Cariboo Islamic Center. Every link below opens the
                original article on the publisher&apos;s site.
              </p>
            </div>
          </div>
          <div className="row g-4">
            {NEWS.map((item) => (
              <MediaCard key={item.url} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="pt-120">
        <div className="container">
          <div className="row justify-content-center mb-50">
            <div className="col-lg-8 text-center">
              <span className="sub-title section-eyebrow">Civic Recognition</span>
              <h2 className="h2 title mt-10">Standing With Our Community</h2>
              <p className="text mt-20">
                On June 23, 2026, Williams Lake City Council unanimously resolved to recognize Islamophobia as a
                form of harm under the B.C. Anti-Racism Act, affirming that hate speech, religious discrimination
                and intimidation have no place in the community — a resolution brought forward after CCIC members
                shared their concerns with council.
              </p>
              <p className="text mt-10">
                &ldquo;The love and support from our neighbours across the Cariboo show that we are one community,
                united by kindness and hope.&rdquo; — Mayor Surinderpal Rathor
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center mb-50">
            <div className="col-lg-8 text-center">
              <span className="sub-title section-eyebrow">From Our Community</span>
              <h2 className="h2 title mt-10">Op-Eds &amp; Letters</h2>
              <p className="text mt-20">
                Members of our community have also written directly to local readers to share what our faith and
                festivals mean.
              </p>
            </div>
          </div>
          <div className="row g-4 justify-content-center">
            {VOICES.map((item) => (
              <MediaCard key={item.url} item={item} />
            ))}
          </div>
          <div className="row justify-content-center mt-50">
            <div className="col-lg-8 text-center">
              <p className="text">
                Are we missing an article, interview or award? Let us know at{" "}
                <a href="mailto:cariboo.secretary@thebcma.com" className="text-navy">cariboo.secretary@thebcma.com</a>{" "}
                and we&apos;ll add it here. For day-to-day updates, follow{" "}
                <a href="https://www.instagram.com/ccic_bcma/" target="_blank" rel="noopener noreferrer" className="text-navy">@ccic_bcma</a> on Instagram or{" "}
                <a href="https://www.facebook.com/williamslakemuslims/" target="_blank" rel="noopener noreferrer" className="text-navy">Williams Lake Muslims</a> on Facebook.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
