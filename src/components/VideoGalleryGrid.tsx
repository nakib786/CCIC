"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { InstagramVideo } from "@/lib/instagram";

export default function VideoGalleryGrid({ videos }: { videos: InstagramVideo[] }) {
  const [active, setActive] = useState<InstagramVideo | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      <div className="gallery-grid">
        {videos.map((video) => (
          <figure key={video.id} className="video-figure" onClick={() => setActive(video)}>
            {video.thumbnailUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={video.thumbnailUrl} alt={video.caption ?? "Instagram video"} />
            ) : (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video src={video.mediaUrl} muted playsInline preload="metadata" />
            )}
            <span className="video-play-badge"><i className="fa fa-play"></i></span>
          </figure>
        ))}
      </div>
      {/* See GalleryGrid.tsx for why this is portaled to <body>: ScrollSmoother
          puts a transform on an ancestor, which would break `position: fixed`. */}
      {mounted && createPortal(
        <div className={`lightbox-overlay${active ? " open" : ""}`} onClick={() => setActive(null)}>
          <div className="lightbox-close" onClick={() => setActive(null)}><i className="fa fa-times"></i></div>
          {active && (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              key={active.id}
              src={active.mediaUrl}
              controls
              autoPlay
              playsInline
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>,
        document.body
      )}
    </>
  );
}
