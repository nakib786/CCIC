"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Matches the eased, slightly-lagging wheel/touch feel of the original
// Islamus theme (GSAP ScrollSmoother, smooth: 2). Exposed on window so the
// legacy vanilla custom.js (anchor links, back-to-top) can route through the
// same smoother instead of fighting it with native `scrollTo`.
declare global {
  interface Window {
    ScrollSmoother?: typeof ScrollSmoother;
  }
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const isFirstRun = useRef(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    window.ScrollSmoother = ScrollSmoother;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: reduceMotion ? 0 : 2,
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: false,
      ignoreMobileResize: true,
    });
    smootherRef.current = smoother;

    return () => {
      smoother.kill();
      smootherRef.current = null;
      delete window.ScrollSmoother;
    };
  }, []);

  useEffect(() => {
    // The layout stays mounted across client-side navigations, so a route
    // change doesn't remount the smoother. Next.js resets the *native*
    // scroll position to 0 immediately, but the smoother's own lagging
    // transform doesn't know that and would otherwise ease toward it over
    // ~2s, making the new page look like it didn't scroll to top — so force
    // an instant (unsmoothed) jump before refreshing scroll-height bounds for
    // the new page's content.
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    smootherRef.current?.scrollTo(0, false);
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
