"use client";

import { useState, type FormEvent } from "react";
import type { ContactFormField } from "@/lib/wix";

const FALLBACK_FIELDS: ContactFormField[] = [
  { target: "name", label: "Name", placeholder: "Your Name", required: true, kind: "text" },
  { target: "email", label: "Email", placeholder: "Your Email", required: true, kind: "email" },
  { target: "phone", label: "Phone", placeholder: "Phone", required: false, kind: "tel" },
  { target: "subject", label: "Subject", placeholder: "Subject", required: false, kind: "text" },
  { target: "message", label: "Message", placeholder: "Write a Message", required: true, kind: "textarea" },
];

export default function HomeContactForm({ fields }: { fields?: ContactFormField[] }) {
  const formFields = fields && fields.length > 0 ? fields : FALLBACK_FIELDS;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(formFields.map((f) => [f.target, String(data.get(f.target) || "")]));

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("sent");
      form.reset();
    } catch {
      // Fall back to a pre-filled mailto so the message is never lost
      const name = values.name ?? "";
      const email = values.email ?? "";
      const subject = values.subject || "Message from CCIC website";
      const message = values.message ?? Object.entries(values).map(([k, v]) => `${k}: ${v}`).join("\n");
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:cariboo.secretary@thebcma.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      setStatus("error");
    }
  };

  return (
    <div className="contact-form">
      <form onSubmit={onSubmit}>
        <div className="row g-4">
          {formFields.map((f) =>
            f.kind === "textarea" ? (
              <div className="col-12" key={f.target}>
                <textarea placeholder={f.placeholder ?? f.label} name={f.target} required={f.required}></textarea>
              </div>
            ) : (
              <div className="col-12" key={f.target}>
                <input
                  type={f.kind}
                  className="form-control"
                  placeholder={f.placeholder ?? f.label}
                  name={f.target}
                  required={f.required}
                />
              </div>
            )
          )}
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
