"use client";

import { useEffect, useState } from "react";

function formatUpdated(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}

export default function DonationGoalBar({
  raised,
  target,
  lastUpdated,
  showStats = true,
  showUpdated = true,
  size = "default",
}: {
  raised: number;
  target: number;
  lastUpdated: string | null;
  showStats?: boolean;
  showUpdated?: boolean;
  size?: "default" | "sm";
}) {
  const pct = target > 0 ? Math.min(100, (raised / target) * 100) : 0;
  // Counts up from 0 on every mount (rather than on scroll-into-view) so the
  // bar/figures animate "on load" wherever this is rendered — a fresh page
  // load, a client-side nav to a page that renders it, or a modal opening.
  const [shown, setShown] = useState({ raised: 0, pct: 0 });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setShown({ raised, pct });
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let raf = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown({ raised: Math.round(raised * eased), pct: pct * eased });
      if (t < 1) raf = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [raised, pct]);

  const updatedLabel = showUpdated ? formatUpdated(lastUpdated) : null;

  return (
    <div className={`goal-progress goal-progress-${size}`}>
      <div className="goal-progress-track">
        <div className="goal-progress-fill" style={{ width: `${shown.pct}%` }}>
          {/* Only shown when the full stats line below is hidden (the
              header's compact strip) — otherwise the percentage would be
              stated twice right next to each other. */}
          {!showStats && <span className="goal-progress-tip">{Math.round(shown.pct)}%</span>}
          <span className="goal-progress-thumb" />
        </div>
      </div>
      {showStats && (
        <div className="goal-progress-stats">
          <span className="goal-progress-raised">
            <strong>${shown.raised.toLocaleString()}</strong> raised
          </span>
          <span className="goal-progress-pct">
            {Math.round(shown.pct)}% toward our ${target.toLocaleString()} Building Fund
          </span>
        </div>
      )}
      {updatedLabel && (
        <div className="goal-progress-updated">
          <i className="fa-solid fa-clock-rotate-left" aria-hidden="true"></i> Building Fund updated {updatedLabel}
        </div>
      )}
    </div>
  );
}
