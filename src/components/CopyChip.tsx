"use client";

import { useState } from "react";

export default function CopyChip({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API unavailable — no-op, the email is still visible as text
    }
  };

  return (
    <button type="button" className={`copy-chip${copied ? " copied" : ""}`} onClick={onClick}>
      <i className={copied ? "fa-solid fa-check" : "fa-regular fa-copy"}></i> {copied ? "Copied!" : value}
    </button>
  );
}
