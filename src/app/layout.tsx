import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import SmoothScroll from "@/components/SmoothScroll";
import { ADDRESS, CONTACT_EMAIL, GEO, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Central Cariboo Islamic Center | BC Muslim Association — Williams Lake",
    template: "%s | Central Cariboo Islamic Center",
  },
  description: SITE_DESCRIPTION,
  icons: { icon: "/assets/images/BCMA_Logo.jpg" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    url: SITE_URL,
    images: [{ url: "/assets/images/banner-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/images/banner-image.jpg"],
  },
};

const mosqueJsonLd = {
  "@context": "https://schema.org",
  "@type": "Mosque",
  name: SITE_NAME,
  alternateName: "CCIC",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  email: CONTACT_EMAIL,
  image: `${SITE_URL}/assets/images/banner-image.jpg`,
  logo: `${SITE_URL}/assets/images/BCMA_Logo.jpg`,
  address: { "@type": "PostalAddress", ...ADDRESS },
  geo: { "@type": "GeoCoordinates", ...GEO },
  areaServed: "Williams Lake, BC",
  memberOf: { "@type": "Organization", name: "BC Muslim Association", url: "https://thebcma.com" },
  sameAs: SOCIAL_LINKS,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Marcellus&family=Amiri:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.css" rel="stylesheet" />
        <link href="/assets/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/css/theme.css" rel="stylesheet" />
        <link href="/assets/css/utilities.css" rel="stylesheet" />
        <link href="/assets/css/custom.css" rel="stylesheet" />
      </head>
      <body>
        {/* JSON-LD belongs in the body, not <head> — React 19 specially
            hoists/dedupes <script>/<style>/<link> tags for the document
            head, and a hand-placed <script> inside a literal <head> element
            conflicts with that, causing a hydration mismatch. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(mosqueJsonLd) }}
        />
        <div className="page-wrapper">
          {/* .back-to-top is `position: fixed`, which only stays pinned to
              the viewport if nothing between it and <body> carries a
              transform — GSAP ScrollSmoother puts one on #smooth-content, so
              it lives outside that region. Header's own always-fixed pieces
              (.sticky-header, .mobile-menu) portal themselves out for the
              same reason; its plain .header-lower bar stays inside so it
              still occupies normal flow and pushes page content down. */}
          <SmoothScroll>
            <Header />
            {children}
            <Footer />
          </SmoothScroll>
          <BackToTop />
        </div>

        <Script src="/assets/js/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/popper.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/ripples.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
