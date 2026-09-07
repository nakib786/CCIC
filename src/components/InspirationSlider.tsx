"use client";

import { useEffect, useRef } from "react";

type Quote = { text: string; source: string };

declare global {
  interface Window {
    Swiper?: new (el: Element, opts: Record<string, unknown>) => unknown;
  }
}

export default function InspirationSlider({ quotes }: { quotes: Quote[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const tryInit = () => {
      if (cancelled) return;
      if (window.Swiper && ref.current) {
        new window.Swiper(ref.current, {
          slidesPerView: 1,
          spaceBetween: 24,
          loop: true,
          autoplay: { delay: 6000, disableOnInteraction: false },
          pagination: { el: ref.current.querySelector(".swiper-pagination"), clickable: true },
          breakpoints: { 992: { slidesPerView: 2 } },
        });
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
    <div className="swiper inspiration-swiper" ref={ref}>
      <div className="swiper-wrapper">
        {quotes.map((q) => (
          <div className="swiper-slide" key={q.text}>
            <div className="testimonial-block-two">
              <div className="inner-block">
                <div className="content">
                  <blockquote className="text">{q.text}</blockquote>
                  <span className="quote-source">— {q.source}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="swiper-pagination mt-30"></div>
    </div>
  );
}
