import type { Metadata } from "next";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from the Central Cariboo Islamic Center community in Williams Lake, BC.",
};

const IMAGES = [
  { src: "/assets/images/about-image1.jpg", alt: "Community gathering" },
  { src: "/assets/images/banner-image.jpg", alt: "Masjid interior" },
  { src: "/assets/images/service-image1.jpg", alt: "Prayer" },
  // Real photos from past CCIC events, pulled from the Wix site's Events data:
  { src: "https://static.wixstatic.com/media/440b00_25577b17fd9842ee9a5c7743c2cbb914~mv2.jpg", alt: "Fundraiser dinner" },
  { src: "https://static.wixstatic.com/media/667dc9_b06b8ff66df34791a57a2ec24c230178~mv2.jpg", alt: "Eid al-Fitr celebration" },
  { src: "https://static.wixstatic.com/media/667dc9_44b1c5f81e244f6a9e7c15e46341477d~mv2.jpg", alt: "Community potluck" },
  { src: "/assets/images/service-image2.jpg", alt: "Islamic education" },
  { src: "/assets/images/service-image3.jpg", alt: "Youth programs" },
  { src: "/assets/images/donation-image.jpg", alt: "Community support" },
  { src: "/assets/images/service-image4.jpg", alt: "Community" },
  { src: "/assets/images/contact-image.jpg", alt: "Masjid grounds" },
];

export default function GalleryPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <div className="h1">Gallery</div>
          <div className="breadcrumb-nav"><Link href="/">Home</Link> <i className="fa-solid fa-angle-right"></i> Gallery</div>
        </div>
      </section>

      <section className="pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center mb-50">
            <div className="col-lg-7 text-center">
              <span className="sub-title section-eyebrow">Community Life</span>
              <div className="h2 title mt-10">A Glimpse of Our Masjid</div>
              <p className="text mt-20">
                More photos from our gatherings and events are posted regularly — follow{" "}
                <a href="https://www.instagram.com/ccic_bcma/" target="_blank" rel="noopener noreferrer" className="text-navy">@ccic_bcma</a> on Instagram or{" "}
                <a href="https://www.facebook.com/williamslakemuslims/" target="_blank" rel="noopener noreferrer" className="text-navy">Williams Lake Muslims</a> on Facebook to see more.
              </p>
            </div>
          </div>
          <GalleryGrid images={IMAGES} />
        </div>
      </section>
    </>
  );
}
