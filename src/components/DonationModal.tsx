"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DonationGoalBar from "@/components/DonationGoalBar";
import type { DonationTotal } from "@/lib/wix";

const OPEN_DELAY_MS = 2000;
// Once dismissed, stay away for the rest of the browser tab's session
// instead of popping back up on every page navigation.
const DISMISS_KEY = "ccic-donation-modal-dismissed";

export default function DonationModal({ donation }: { donation: DonationTotal | null }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const hasGoal = !!donation && donation.target > 0;

  useEffect(() => {
    if (!hasGoal) return;
    if (pathname.startsWith("/donate")) return; // already looking at the ask
    if (sessionStorage.getItem(DISMISS_KEY)) return;
    const timer = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, [hasGoal, pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setOpen(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
  }

  if (!mounted || !donation || !hasGoal) return null;

  const pct = Math.round(Math.min(100, (donation.raised / donation.target) * 100));

  return createPortal(
    <div
      className={`donation-modal-overlay${open ? " open" : ""}`}
      onClick={close}
      role="presentation"
    >
      <div
        className="donation-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="donation-modal-title"
      >
        <button type="button" className="donation-modal-close" onClick={close} aria-label="Close">
          <i className="fa fa-times"></i>
        </button>
        <div className="sec-title text-center">
          <span className="sub-title section-eyebrow">Sadaqah Jariyah</span>
          <h3 id="donation-modal-title" className="donation-modal-title">
            Alhamdulillah — {pct}% raised toward our Building Fund
          </h3>
        </div>
        <p className="donation-modal-text">
          An Islamic center is a Sadaqah Jariyah — a gift that keeps on giving. Help us build a permanent home for the
          Williams Lake Muslim community.
        </p>
        {open && (
          <DonationGoalBar raised={donation.raised} target={donation.target} lastUpdated={donation.lastUpdated} />
        )}
        <div className="donation-modal-actions">
          <Link href="/donate/" className="theme-btn btn-style-one" onClick={close}>
            <span className="btn-arrow-left">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
            <span className="btn-title">Donate Now </span>
            <span className="btn-arrow-right">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
          </Link>
          <button type="button" className="donation-modal-dismiss" onClick={close}>
            Maybe later
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
