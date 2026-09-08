"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function GalleryGrid({ images }: { images: { src: string; alt: string }[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      <div className="gallery-grid">
        {images.map((img) => (
          <figure key={img.src} onClick={() => setActive(img.src)}>
            <Image src={img.src} alt={img.alt} fill sizes="(max-width: 767px) 50vw, 33vw" style={{ objectFit: "cover" }} />
          </figure>
        ))}
      </div>
      {/* `.lightbox-overlay` is `position: fixed; inset: 0`, which only
          covers the true viewport if nothing between it and <body> carries a
          transform — GSAP ScrollSmoother puts one on #smooth-content, an
          ancestor of this component, so the overlay is portaled straight to
          <body> to escape it (same reason Header/BackToTop sit outside the
          smoothed region in layout.tsx). */}
      {mounted && createPortal(
        <div className={`lightbox-overlay${active ? " open" : ""}`} onClick={() => setActive(null)}>
          <div className="lightbox-close" onClick={() => setActive(null)}><i className="fa fa-times"></i></div>
          {/* Full-resolution lightbox view, shown only after a user click — not
              part of initial page load, so a plain img (no fill container to
              size against) is the right call here. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {active && <img src={active} alt="" />}
        </div>,
        document.body
      )}
    </>
  );
}
