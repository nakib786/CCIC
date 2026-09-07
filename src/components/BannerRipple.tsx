"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    jQuery?: ((selector: unknown) => JQueryLike) & { fn?: { ripples?: unknown } };
  }
  interface JQueryLike {
    ripples: (opts: Record<string, unknown>) => unknown;
  }
}

export default function BannerRipple() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const tryInit = () => {
      if (cancelled) return;
      if (window.jQuery && window.jQuery.fn?.ripples && ref.current) {
        try {
          window.jQuery(ref.current).ripples({ resolution: 256, perturbance: 0.03, dropRadius: 20 });
        } catch {
          // WebGL unsupported in this browser — the static banner image still shows fine
        }
      } else {
        setTimeout(tryInit, 150);
      }
    };
    tryInit();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="sec-bg banner-ripple"
      ref={ref}
      style={{ backgroundImage: "url('/assets/images/banner-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    />
  );
}
