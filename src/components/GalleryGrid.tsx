"use client";

import { useState } from "react";

export default function GalleryGrid({ images }: { images: { src: string; alt: string }[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <div className="gallery-grid">
        {images.map((img) => (
          <figure key={img.src} onClick={() => setActive(img.src)}>
            <img src={img.src} alt={img.alt} />
          </figure>
        ))}
      </div>
      <div className={`lightbox-overlay${active ? " open" : ""}`} onClick={() => setActive(null)}>
        <div className="lightbox-close" onClick={() => setActive(null)}><i className="fa fa-times"></i></div>
        {active && <img src={active} alt="" />}
      </div>
    </>
  );
}
