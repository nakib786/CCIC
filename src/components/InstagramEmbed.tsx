"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

// Instagram's embed.js scans the DOM once on load and replaces every
// `.instagram-media` blockquote with its real iframe. On a client-side route
// change back to this page the script is already loaded (Script only runs
// once per page load), so each InstagramEmbed below also calls process()
// itself on mount to pick up blockquotes the script's own load-time scan missed.
export function InstagramEmbedScript() {
  return (
    <Script
      src="https://www.instagram.com/embed.js"
      strategy="lazyOnload"
      onLoad={() => window.instgrm?.Embeds.process()}
    />
  );
}

export default function InstagramEmbed({ url }: { url: string }) {
  useEffect(() => {
    window.instgrm?.Embeds.process();
  }, [url]);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{
        background: "#FFF",
        border: 0,
        borderRadius: "3px",
        margin: "1px auto",
        maxWidth: 540,
        minWidth: 326,
        padding: 0,
        width: "99%",
      }}
    />
  );
}
