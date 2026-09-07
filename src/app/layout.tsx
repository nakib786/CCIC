import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Central Cariboo Islamic Center | BC Muslim Association — Williams Lake",
    template: "%s | Central Cariboo Islamic Center",
  },
  description:
    "Central Cariboo Islamic Center (CCIC), a chapter of the BC Muslim Association, serving the Muslim community of Williams Lake, BC with prayers, education and community programs.",
  icons: { icon: "/assets/images/BCMA_Logo.jpg" },
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
        <div className="page-wrapper">
          <Header />
          {children}
          <Footer />
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
