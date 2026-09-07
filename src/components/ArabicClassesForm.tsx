"use client";

import { useState, type FormEvent } from "react";
import ToggleGroup from "@/components/ToggleGroup";

// Values must exactly match the choice options on the real Wix form field.
const ONLINE = "Online (Zoom, Teams, WhatsApp)";
const IN_PERSON = "In- Person";

export default function ArabicClassesForm() {
  const [preference, setPreference] = useState(ONLINE);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get("first") || "");
    const lastName = String(data.get("last") || "");
    const email = String(data.get("email") || "");

    setStatus("sending");
    try {
      const res = await fetch("/api/arabic-classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, deliveryPreferences: [preference] }),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("sent");
      form.reset();
    } catch {
      const body = encodeURIComponent(`Name: ${firstName} ${lastName}\nEmail: ${email}\nDelivery preference: ${preference}`);
      window.location.href = `mailto:cariboo.secretary@thebcma.com?subject=${encodeURIComponent("Arabic Classes Registration")}&body=${body}`;
      setStatus("error");
    }
  };

  return (
    <div className="donation-form mx-auto" style={{ maxWidth: 640 }}>
      <form onSubmit={onSubmit}>
        <div className="row g-4">
          <div className="col-md-6"><input type="text" className="form-control" placeholder="First Name *" name="first" required /></div>
          <div className="col-md-6"><input type="text" className="form-control" placeholder="Last Name (optional)" name="last" /></div>
          <div className="col-12"><input type="email" className="form-control" placeholder="Email *" name="email" required /></div>
          <div className="col-12">
            <ToggleGroup
              options={["Online (Zoom / Teams / WhatsApp)", "In-Person"]}
              onChange={(v) => setPreference(v === "In-Person" ? IN_PERSON : ONLINE)}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn mt-10 btn-donate w-100" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : status === "sent" ? "Registered — we'll be in touch!" : "Register Interest"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
