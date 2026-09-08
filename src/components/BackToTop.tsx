"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#top"
      className={`back-to-top${show ? " show" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        const smoother = window.ScrollSmoother?.get();
        if (smoother) smoother.scrollTo(0, true);
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <i className="fa fa-angle-up"></i>
    </a>
  );
}
