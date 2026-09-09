import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import PhotoGalleryGrid from "@/components/PhotoGalleryGrid";
import VideoGalleryGrid from "@/components/VideoGalleryGrid";
import { getInstagramPhotos, getInstagramVideos } from "@/lib/instagram";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and videos from the Central Cariboo Islamic Center community in Williams Lake, BC.",
  alternates: { canonical: "/gallery/" },
};

export default async function GalleryPage() {
  // Photos and videos/Reels are both pulled live from the Instagram Graph
  // API (see src/lib/instagram.ts) — every current and future upload shows
  // up here automatically, no manual URL list needed.
  const [instagramPhotos, instagramVideos] = await Promise.all([
    getInstagramPhotos(),
    getInstagramVideos(),
  ]);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Gallery" }]} />
      <section className="page-banner">
        <div className="container">
          <h1 className="h1">Gallery</h1>
          <div className="breadcrumb-nav"><Link href="/">Home</Link> <i className="fa-solid fa-angle-right"></i> Gallery</div>
        </div>
      </section>

      <section className="pt-120 pb-0">
        <div className="container">
          <div className="row justify-content-center mb-50">
            <div className="col-lg-7 text-center">
              <span className="sub-title section-eyebrow">Community Life</span>
              <h2 className="h2 title mt-10">A Glimpse of Our Masjid</h2>
              <p className="text mt-20">
                Photos and videos from our gatherings and events are posted regularly — follow{" "}
                <a href="https://www.instagram.com/ccic_bcma/" target="_blank" rel="noopener noreferrer" className="text-navy">@ccic_bcma</a> on Instagram or{" "}
                <a href="https://www.facebook.com/williamslakemuslims/" target="_blank" rel="noopener noreferrer" className="text-navy">Williams Lake Muslims</a> on Facebook to see more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {instagramPhotos.length > 0 && (
        <section className="pt-0 pb-120">
          <div className="container">
            <div className="row justify-content-center mb-50">
              <div className="col-lg-7 text-center">
                <span className="sub-title section-eyebrow">From Instagram</span>
                <h2 className="h2 title mt-10">Latest Photos</h2>
              </div>
            </div>
            <PhotoGalleryGrid photos={instagramPhotos} />
          </div>
        </section>
      )}

      {instagramVideos.length > 0 && (
        <section className="pt-0 pb-120">
          <div className="container">
            <div className="row justify-content-center mb-50">
              <div className="col-lg-7 text-center">
                <span className="sub-title section-eyebrow">From Instagram</span>
                <h2 className="h2 title mt-10">Latest Videos &amp; Reels</h2>
              </div>
            </div>
            <VideoGalleryGrid videos={instagramVideos} />
          </div>
        </section>
      )}
    </>
  );
}
