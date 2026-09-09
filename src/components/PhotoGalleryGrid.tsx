"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { InstagramPhoto } from "@/lib/instagram";

export default function PhotoGalleryGrid({ photos }: { photos: InstagramPhoto[] }) {
  const [active, setActive] = useState<InstagramPhoto | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      <div className="gallery-grid">
        {photos.map((photo) => (
          <figure key={photo.id} onClick={() => setActive(photo)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.mediaUrl} alt={photo.caption ?? "Instagram photo"} />
          </figure>
        ))}
      </div>
      {/* Portaled to <body> because `.lightbox-overlay` is `position: fixed;
          inset: 0`, which only covers the true viewport if nothing between it
          and <body> carries a transform — GSAP ScrollSmoother puts one on
          #smooth-content, an ancestor of this component. */}
      {mounted && createPortal(
        <div className={`lightbox-overlay${active ? " open" : ""}`} onClick={() => setActive(null)}>
          <div className="lightbox-close" onClick={() => setActive(null)}><i className="fa fa-times"></i></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {active && <img src={active.mediaUrl} alt={active.caption ?? ""} />}
        </div>,
        document.body
      )}
    </>
  );
}
