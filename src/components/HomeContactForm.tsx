"use client";

import { useState, type FormEvent } from "react";

export default function HomeContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const subject = String(data.get("subject") || "Message from CCIC website");
    const message = String(data.get("message") || "");

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("sent");
      form.reset();
    } catch {
      // Fall back to a pre-filled mailto so the message is never lost
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:cariboo.secretary@thebcma.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      setStatus("error");
    }
  };

  return (
    <div className="contact-form">
      <form onSubmit={onSubmit}>
        <div className="row g-4">
          <div className="col-md-6"><input type="text" className="form-control" placeholder="Your Name" name="name" required /></div>
          <div className="col-md-6"><input type="email" className="form-control" placeholder="Your Email" name="email" required /></div>
          <div className="col-12"><input type="text" className="form-control" placeholder="Subject" name="subject" /></div>
          <div className="col-12"><textarea placeholder="Write a Message" name="message" required></textarea></div>
          <div className="col-12">
            <button type="submit" className="theme-btn btn-style-four" disabled={status === "sending"}>
              <span className="btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
              <span className="btn-title">{status === "sending" ? "Sending…" : status === "sent" ? "Sent — Jazakum Allahu Khairan!" : "Send Message "}</span>
              <span className="btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
