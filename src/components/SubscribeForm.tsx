"use client";

import { useState, type FormEvent } from "react";

export default function SubscribeForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "already" | "error">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") || "");

    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("submit failed");
      const data = (await res.json()) as { alreadySubscribed?: boolean };
      setStatus(data.alreadySubscribed ? "already" : "sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="footer-subscribe">
      <p className="footer-subscribe-title">Subscribe to get exclusive updates</p>
      {status === "sent" ? (
        <p className="footer-subscribe-thanks">Thanks for subscribing!</p>
      ) : status === "already" ? (
        <p className="footer-subscribe-thanks">You&apos;re already on our mailing list — Jazakum Allahu Khairan!</p>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="footer-subscribe-row">
            <input type="email" name="email" placeholder="e.g., email@example.com" required disabled={status === "sending"} />
            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Joining…" : "Join Our Mailing List"}
            </button>
          </div>
          <label className="footer-subscribe-checkbox">
            <input type="checkbox" name="subscribe" defaultChecked required />
            I want to subscribe to your mailing list.
          </label>
          {status === "error" && <p className="footer-subscribe-error">Something went wrong — please try again.</p>}
        </form>
      )}
    </div>
  );
}
