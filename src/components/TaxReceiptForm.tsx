"use client";

import { useState, type FormEvent } from "react";
import { CONTACT_EMAIL } from "@/lib/site";
import { POSTAL_CODE_PATTERNS, POSTAL_CODE_PLACEHOLDERS } from "@/lib/address";

const CA_PROVINCES = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "NS", name: "Nova Scotia" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" },
  { code: "YT", name: "Yukon" },
];

const US_STATES = [
  { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" }, { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" }, { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" }, { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" }, { code: "GA", name: "Georgia" }, { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" }, { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" }, { code: "KS", name: "Kansas" }, { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" }, { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" }, { code: "MI", name: "Michigan" }, { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" }, { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" }, { code: "NV", name: "Nevada" }, { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" }, { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" }, { code: "ND", name: "North Dakota" }, { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" }, { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" }, { code: "SC", name: "South Carolina" }, { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" }, { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" }, { code: "VA", name: "Virginia" }, { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" }, { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" },
];

const DONATION_METHODS = ["PayPal", "Interac e-Transfer", "Cash", "Cheque", "Bank Transfer", "Other"];

export default function TaxReceiptForm({ contactEmail = CONTACT_EMAIL }: { contactEmail?: string }) {
  const [country, setCountry] = useState<"CA" | "US">("CA");
  const [subdivision, setSubdivision] = useState("BC");
  const [status, setStatus] = useState<"idle" | "verifying" | "sending" | "sent" | "error">("idle");
  // Set after a submit attempt whose address didn't verify (see onSubmit) —
  // lets the donor either fix the address or press submit again to send it
  // as entered. Cleared whenever an address field changes.
  const [addressWarning, setAddressWarning] = useState<string | null>(null);

  const provinceOptions = country === "CA" ? CA_PROVINCES : US_STATES;

  const clearAddressWarning = () => setAddressWarning(null);

  const onCountryChange = (next: "CA" | "US") => {
    setCountry(next);
    setSubdivision(next === "CA" ? "BC" : "");
    clearAddressWarning();
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = {
      firstName: String(data.get("firstName") || ""),
      lastName: String(data.get("lastName") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      addressLine: String(data.get("addressLine") || ""),
      addressLine2: String(data.get("addressLine2") || ""),
      city: String(data.get("city") || ""),
      postalCode: String(data.get("postalCode") || ""),
      donationDate: String(data.get("donationDate") || ""),
      donationAmount: String(data.get("donationAmount") || ""),
      donationMethod: String(data.get("donationMethod") || ""),
      referenceNumber: String(data.get("referenceNumber") || ""),
      notes: String(data.get("notes") || ""),
    };

    // Skip the check if we already warned once this attempt — the button
    // becomes "Submit Anyway" and just sends it as entered.
    if (!addressWarning) {
      setStatus("verifying");
      const provinceName = provinceOptions.find((p) => p.code === subdivision)?.name ?? subdivision;
      const addressText = [
        values.addressLine,
        values.addressLine2,
        values.city,
        `${provinceName} ${values.postalCode}`.trim(),
        country === "CA" ? "Canada" : "United States",
      ]
        .filter(Boolean)
        .join(", ");
      try {
        const verifyRes = await fetch("/api/address-verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: addressText, country }),
        });
        const verifyData = verifyRes.ok ? await verifyRes.json() : { verified: true };
        if (!verifyData.verified) {
          setAddressWarning(
            'We couldn’t confirm that address is deliverable. Please double-check it, then press "Submit Anyway" if it’s correct.'
          );
          setStatus("idle");
          return;
        }
      } catch {
        // Our own verify call failed (offline, etc.) — don't block a real donor over it.
      }
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/tax-receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          address: {
            addressLine: values.addressLine,
            addressLine2: values.addressLine2,
            city: values.city,
            subdivision: `${country}-${subdivision}`,
            postalCode: values.postalCode,
            country,
          },
          donationDate: values.donationDate,
          donationAmount: Number(values.donationAmount),
          donationMethod: values.donationMethod,
          referenceNumber: values.referenceNumber,
          notes: values.notes,
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("sent");
      form.reset();
      setCountry("CA");
      setSubdivision("BC");
      setAddressWarning(null);
    } catch {
      const provinceName = provinceOptions.find((p) => p.code === subdivision)?.name ?? subdivision;
      const body = encodeURIComponent(
        [
          `Name: ${values.firstName} ${values.lastName}`,
          `Email: ${values.email}`,
          values.phone && `Phone: ${values.phone}`,
          `Mailing Address: ${values.addressLine}${values.addressLine2 ? ", " + values.addressLine2 : ""}, ${values.city}, ${provinceName}, ${values.postalCode}, ${country === "CA" ? "Canada" : "United States"}`,
          `Date of Donation: ${values.donationDate}`,
          `Donation Amount: ${values.donationAmount}`,
          `Donation Method: ${values.donationMethod}`,
          values.referenceNumber && `Reference / Confirmation Number: ${values.referenceNumber}`,
          values.notes && `Notes: ${values.notes}`,
        ]
          .filter(Boolean)
          .join("\n")
      );
      window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent("Tax Receipt Request")}&body=${body}`;
      setStatus("error");
    }
  };

  return (
    <div className="donation-form mx-auto" style={{ maxWidth: 760 }}>
      <form onSubmit={onSubmit}>
        <div className="row g-4">
          <div className="col-md-6"><input type="text" className="form-control" placeholder="First Name *" name="firstName" required /></div>
          <div className="col-md-6"><input type="text" className="form-control" placeholder="Last Name *" name="lastName" required /></div>
          <div className="col-md-6"><input type="email" className="form-control" placeholder="Email *" name="email" required /></div>
          <div className="col-md-6"><input type="tel" className="form-control" placeholder="Phone (optional)" name="phone" /></div>

          <div className="col-12"><input type="text" className="form-control" placeholder="Mailing Address — Street Address *" name="addressLine" required onChange={clearAddressWarning} /></div>
          <div className="col-12"><input type="text" className="form-control" placeholder="Apartment / Suite / Unit (optional)" name="addressLine2" onChange={clearAddressWarning} /></div>
          <div className="col-md-6"><input type="text" className="form-control" placeholder="City *" name="city" required onChange={clearAddressWarning} /></div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder={`Postal / Zip Code * (${POSTAL_CODE_PLACEHOLDERS[country]})`}
              name="postalCode"
              pattern={POSTAL_CODE_PATTERNS[country]}
              title={`Enter a valid ${country === "CA" ? "Canadian postal code" : "US zip code"}, ${POSTAL_CODE_PLACEHOLDERS[country]}`}
              required
              onChange={clearAddressWarning}
            />
          </div>
          <div className="col-md-6">
            <select
              className="form-control form-select"
              value={country}
              onChange={(e) => onCountryChange(e.target.value as "CA" | "US")}
              aria-label="Country"
            >
              <option value="CA">Canada</option>
              <option value="US">United States</option>
            </select>
          </div>
          <div className="col-md-6">
            <select
              className="form-control form-select"
              value={subdivision}
              onChange={(e) => {
                setSubdivision(e.target.value);
                clearAddressWarning();
              }}
              required
              aria-label={country === "CA" ? "Province" : "State"}
            >
              {country === "US" && <option value="" disabled>State *</option>}
              {provinceOptions.map((p) => (
                <option key={p.code} value={p.code}>{p.name}</option>
              ))}
            </select>
          </div>
          {addressWarning && (
            <div className="col-12">
              <p className="text text-danger mt-0 mb-0" role="alert">{addressWarning}</p>
            </div>
          )}

          <div className="col-md-6">
            <label className="form-label small mb-1 d-block">Date of Donation *</label>
            <input type="date" className="form-control" name="donationDate" required />
          </div>
          <div className="col-md-6">
            <label className="form-label small mb-1 d-block">Donation Amount (CAD) *</label>
            <input type="number" className="form-control" placeholder="0.00" name="donationAmount" min="1" step="0.01" required />
          </div>

          <div className="col-12">
            <select className="form-control form-select" name="donationMethod" defaultValue="" required aria-label="How did you donate?">
              <option value="" disabled>How Did You Donate? *</option>
              {DONATION_METHODS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="col-12"><input type="text" className="form-control" placeholder="Reference / Confirmation Number (if any)" name="referenceNumber" /></div>
          <div className="col-12"><textarea className="form-control" placeholder="Additional Notes (optional)" name="notes" rows={3}></textarea></div>

          <div className="col-12">
            <button
              type="submit"
              className={`btn mt-10 w-100 ${addressWarning ? "btn-danger" : "btn-donate"}`}
              disabled={status === "sending" || status === "verifying"}
            >
              {status === "sending"
                ? "Sending…"
                : status === "verifying"
                ? "Checking address…"
                : status === "sent"
                ? "Request Sent — Jazakum Allahu Khairan!"
                : addressWarning
                ? "Submit Anyway"
                : "Submit Request"}
            </button>
            {status === "error" && (
              <p className="text mt-10 mb-0">
                We couldn&apos;t submit this automatically, so we&apos;ve opened an email to {contactEmail} with your details pre-filled — just hit send.
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
