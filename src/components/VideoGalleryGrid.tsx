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
        {videos.map((video) => {
          // Instagram omits media_url for Reels using licensed/trending audio
          // (copyright protection on their end) — there's no direct file to
          // play in that case, so send the click to the real post instead of
          // showing a lightbox that can never load anything.
          const playableHere = Boolean(video.mediaUrl);
          return (
            <figure
              key={video.id}
              className="video-figure"
              onClick={() =>
                playableHere
                  ? setActive(video)
                  : window.open(video.permalink, "_blank", "noopener,noreferrer")
              }
            >
              {video.thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={video.thumbnailUrl} alt={video.caption ?? "Instagram video"} />
              ) : playableHere ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video src={video.mediaUrl} muted playsInline preload="metadata" />
              ) : null}
              <span className="video-play-badge">
                <i className={playableHere ? "fa fa-play" : "fa-solid fa-up-right-from-square"}></i>
              </span>
            </figure>
          );
        })}
      </div>
      {/* Portaled to <body> because `.lightbox-overlay` is `position: fixed;
          inset: 0`, which only covers the true viewport if nothing between it
          and <body> carries a transform — GSAP ScrollSmoother puts one on
          #smooth-content, an ancestor of this component. */}
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
