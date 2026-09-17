"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import ToggleGroup from "@/components/ToggleGroup";
import type { RsvpFormControl, RsvpInputValue, WixEvent } from "@/lib/wix";

const MAX_GUESTS_FALLBACK = 10;

type SubmitState = "idle" | "sending" | "sent" | "waitlisted" | "declined" | "error";

export default function EventRsvpForm({ event }: { event: WixEvent }) {
  const reg = event.registration;
  const [guestCount, setGuestCount] = useState(0);
  const [status, setStatus] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!reg || reg.type === "NONE") return null;

  if (reg.type === "TICKETING") {
    const url = event.eventPageUrl ? `${event.eventPageUrl.base}${event.eventPageUrl.path}` : undefined;
    return (
      <div className="event-rsvp-box">
        <p className="text mb-15">Tickets are required to attend this event.</p>
        {url && (
          <a className="theme-btn btn-style-one" href={url} target="_blank" rel="noopener noreferrer">
            <span className="btn-arrow-left"><i className="fa-solid fa-ticket"></i></span>
            <span className="btn-title">Get Tickets</span>
            <span className="btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
          </a>
        )}
      </div>
    );
  }

  if (reg.type === "EXTERNAL") {
    return (
      <div className="event-rsvp-box">
        <p className="text mb-15">Registration for this event happens on an external site.</p>
        {reg.external?.url && (
          <a className="theme-btn btn-style-one" href={reg.external.url} target="_blank" rel="noopener noreferrer">
            <span className="btn-title">Register</span>
            <span className="btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
          </a>
        )}
      </div>
    );
  }

  if (reg.status === "CLOSED_AUTOMATICALLY" || reg.status === "CLOSED_MANUALLY") {
    return (
      <div className="event-rsvp-box">
        <p className="text">{event.form?.messages?.registrationClosed?.message || "RSVPs for this event are closed."}</p>
      </div>
    );
  }

  if (reg.status === "SCHEDULED_RSVP") {
    return (
      <div className="event-rsvp-box">
        <p className="text">RSVPs haven&apos;t opened yet for this event — check back soon.</p>
      </div>
    );
  }

  const isWaitlist = reg.status === "OPEN_RSVP_WAITLIST_ONLY";
  const responseType = reg.rsvp?.responseType ?? "YES_AND_NO";
  const messages = event.form?.messages?.rsvp;

  const controls = (event.form?.controls ?? [])
    .filter((c) => !c.deleted)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  const nameControl = controls.find((c) => c.type === "NAME");
  const emailControl = controls.find((c) => c.system && c.type !== "NAME");
  const guestControl = controls.find((c) => c.type === "GUEST_CONTROL");
  const otherControls = controls.filter(
    (c) => c !== nameControl && c !== emailControl && c !== guestControl
  );

  const firstNameField = nameControl?.inputs[0];
  const lastNameField = nameControl?.inputs[1];
  const emailField = emailControl?.inputs[0];
  const firstNameKey = firstNameField?.name ?? "firstName";
  const lastNameKey = lastNameField?.name ?? "lastName";
  const emailKey = emailField?.name ?? "email";

  const countInput = guestControl?.inputs.find((i) => i.type === "NUMBER");
  const namesInput = guestControl?.inputs.find((i) => i.type === "TEXT_ARRAY");
  const maxGuests = namesInput?.maxSize ?? MAX_GUESTS_FALLBACK;
  const namesMandatory = namesInput?.mandatory ?? false;

  if (status === "sent" || status === "waitlisted" || status === "declined") {
    const conf =
      status === "waitlisted" ? messages?.waitlistMessages?.confirmation
      : status === "declined" ? messages?.negativeMessages?.confirmation
      : messages?.positiveMessages?.confirmation;
    const fallbackTitle =
      status === "waitlisted" ? "You're on the waitlist"
      : status === "declined" ? "Thanks for letting us know"
      : "You're on the list!";
    const fallbackMessage =
      status === "waitlisted" ? "We'll email you if a spot opens up."
      : status === "declined" ? "We hope to see you at a future event, insha'Allah."
      : "We've got you down — see you there, insha'Allah.";
    return (
      <div className="event-rsvp-box rsvp-confirmed">
        <i className="fa-solid fa-circle-check"></i>
        <h4 className="h5 title">{conf?.title || fallbackTitle}</h4>
        <p className="text">{("message" in (conf ?? {}) && (conf as { message?: string }).message) || fallbackMessage}</p>
      </div>
    );
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const chosenStatus = data.get("rsvpStatus") === "NO" ? "NO" : data.get("rsvpStatus") === "WAITLIST" ? "WAITLIST" : "YES";
    const firstName = String(data.get(firstNameKey) || "").trim();
    const lastName = String(data.get(lastNameKey) || "").trim();
    const email = String(data.get(emailKey) || "").trim();

    const inputValues: RsvpInputValue[] = [
      { inputName: firstNameKey, value: firstName },
      { inputName: lastNameKey, value: lastName },
      { inputName: emailKey, value: email },
    ];

    for (const control of otherControls) {
      if (control.type === "CHECKBOX") {
        for (const input of control.inputs) {
          const values = data.getAll(input.name).map(String);
          if (values.length) inputValues.push({ inputName: input.name, values });
        }
      } else if (control.type === "ADDRESS_SHORT" || control.type === "ADDRESS_FULL") {
        for (const input of control.inputs) {
          const subKeys = Object.keys(input.additionalLabels ?? {});
          if (subKeys.length) {
            const values = subKeys.map((k) => String(data.get(`${input.name}__${k}`) || ""));
            if (values.some(Boolean)) inputValues.push({ inputName: input.name, values });
          } else {
            const v = data.get(input.name);
            if (v) inputValues.push({ inputName: input.name, value: String(v) });
          }
        }
      } else {
        for (const input of control.inputs) {
          const v = data.get(input.name);
          if (v != null && String(v) !== "") inputValues.push({ inputName: input.name, value: String(v) });
        }
      }
    }

    let additionalGuestDetails: { guestCount: number; guestNames?: string[] } | undefined;
    if (guestControl && countInput) {
      inputValues.push({ inputName: countInput.name, value: String(guestCount) });
      if (guestCount > 0) {
        const guestNames = Array.from({ length: guestCount }, (_, i) => String(data.get(`guestName_${i}`) || "").trim()).filter(
          Boolean
        );
        additionalGuestDetails = { guestCount, ...(guestNames.length ? { guestNames } : {}) };
        if (namesInput && guestNames.length) inputValues.push({ inputName: namesInput.name, values: guestNames });
      } else {
        additionalGuestDetails = { guestCount: 0 };
      }
    }

    setStatus("sending");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/events/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          firstName,
          lastName,
          email,
          status: chosenStatus,
          inputValues,
          additionalGuestDetails,
        }),
      });
      const resData = (await res.json().catch(() => ({}))) as { error?: string; status?: string };
      if (!res.ok) {
        setErrorMessage(resData.error || "Something went wrong — please try again.");
        setStatus("error");
        return;
      }
      setStatus(resData.status === "WAITLIST" ? "waitlisted" : resData.status === "NO" ? "declined" : "sent");
    } catch {
      setErrorMessage("Something went wrong — please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="event-rsvp-box">
      <h4 className="h5 title mb-20">
        {isWaitlist ? "Join the Waitlist" : "RSVP to This Event"}
        {reg.rsvp?.limit ? <span className="rsvp-limit-note"> — limited to {reg.rsvp.limit} guests</span> : null}
      </h4>
      <form onSubmit={onSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name={firstNameKey}
              placeholder={`First Name${firstNameField?.mandatory === false ? "" : " *"}`}
              required={firstNameField?.mandatory ?? true}
              maxLength={firstNameField?.maxLength}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              name={lastNameKey}
              placeholder={`Last Name${lastNameField?.mandatory === false ? "" : " *"}`}
              required={lastNameField?.mandatory ?? true}
              maxLength={lastNameField?.maxLength}
            />
          </div>
          <div className="col-12">
            <input
              type="email"
              className="form-control"
              name={emailKey}
              placeholder="Email *"
              required={emailField?.mandatory ?? true}
            />
          </div>

          {guestControl && countInput && (
            <div className="col-12">
              <label className="rsvp-field-label" htmlFor="rsvp-guest-count">
                {countInput.label || "Additional guests"}
              </label>
              <select
                id="rsvp-guest-count"
                className="form-control"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
              >
                {Array.from({ length: maxGuests + 1 }, (_, n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              {guestCount > 0 && (
                <div className="rsvp-guest-names">
                  {Array.from({ length: guestCount }, (_, i) => (
                    <input
                      key={i}
                      type="text"
                      className="form-control"
                      name={`guestName_${i}`}
                      placeholder={`Guest ${i + 1} name${namesMandatory ? " *" : ""}`}
                      required={namesMandatory}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {otherControls.map((control) => (
            <RsvpControlFields key={control.id} control={control} />
          ))}

          <div className="col-12">
            <p className="text small mb-15">
              By submitting this form, you agree to our <Link href="/privacy-policy/">Privacy Policy</Link>.
            </p>
            {errorMessage && <p className="rsvp-error-text mb-15">{errorMessage}</p>}
            <div className="rsvp-actions">
              <button type="submit" name="rsvpStatus" value={isWaitlist ? "WAITLIST" : "YES"} className="theme-btn btn-style-four" disabled={status === "sending"}>
                <span className="btn-arrow-left"><i className="fa-solid fa-arrow-right"></i></span>
                <span className="btn-title">
                  {status === "sending" ? "Sending…" : isWaitlist ? "Join the Waitlist" : messages?.rsvpYesOption || "Yes, I'll Be There"}
                </span>
                <span className="btn-arrow-right"><i className="fa-solid fa-arrow-right"></i></span>
              </button>
              {responseType === "YES_AND_NO" && (
                <button type="submit" name="rsvpStatus" value="NO" className="rsvp-decline-btn" disabled={status === "sending"}>
                  {messages?.rsvpNoOption || "Can't make it"}
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function RsvpControlFields({ control }: { control: RsvpFormControl }): ReactNode {
  switch (control.type) {
    case "TEXTAREA":
      return control.inputs.map((input) => (
        <div className="col-12" key={input.name}>
          <label className="rsvp-field-label" htmlFor={`rsvp-${input.name}`}>
            {input.label}
            {input.mandatory ? " *" : ""}
          </label>
          <textarea
            id={`rsvp-${input.name}`}
            className="form-control"
            name={input.name}
            required={input.mandatory}
            maxLength={input.maxLength}
          ></textarea>
        </div>
      ));

    case "DROPDOWN":
      return control.inputs.map((input) => (
        <div className="col-md-6" key={input.name}>
          <label className="rsvp-field-label" htmlFor={`rsvp-${input.name}`}>
            {input.label}
            {input.mandatory ? " *" : ""}
          </label>
          <select id={`rsvp-${input.name}`} className="form-control" name={input.name} required={input.mandatory} defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {(input.options ?? []).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ));

    case "RADIO":
      return control.inputs.map((input) => (
        <div className="col-12" key={input.name}>
          <label className="rsvp-field-label">
            {input.label}
            {input.mandatory ? " *" : ""}
          </label>
          <ToggleGroup options={input.options ?? []} hiddenFieldName={input.name} />
        </div>
      ));

    case "CHECKBOX":
      return control.inputs.map((input) => (
        <div className="col-12" key={input.name}>
          <label className="rsvp-field-label">
            {input.label}
            {input.mandatory ? " *" : ""}
          </label>
          <div className="rsvp-checkbox-group">
            {(input.options ?? []).map((opt) => (
              <label key={opt} className="rsvp-checkbox-option">
                <input type="checkbox" name={input.name} value={opt} />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ));

    case "DATE":
      return control.inputs.map((input) => (
        <div className="col-md-6" key={input.name}>
          <label className="rsvp-field-label" htmlFor={`rsvp-${input.name}`}>
            {input.label}
            {input.mandatory ? " *" : ""}
          </label>
          <input id={`rsvp-${input.name}`} type="date" className="form-control" name={input.name} required={input.mandatory} />
        </div>
      ));

    case "ADDRESS_SHORT":
    case "ADDRESS_FULL":
      return control.inputs.map((input) => {
        const subKeys = Object.keys(input.additionalLabels ?? {});
        if (subKeys.length === 0) {
          return (
            <div className="col-12" key={input.name}>
              <label className="rsvp-field-label" htmlFor={`rsvp-${input.name}`}>
                {input.label}
                {input.mandatory ? " *" : ""}
              </label>
              <input id={`rsvp-${input.name}`} type="text" className="form-control" name={input.name} required={input.mandatory} />
            </div>
          );
        }
        return (
          <div className="col-12" key={input.name}>
            <label className="rsvp-field-label">{input.label}</label>
            <div className="row g-2">
              {subKeys.map((key) => (
                <div className="col-md-6" key={key}>
                  <input
                    type="text"
                    className="form-control"
                    name={`${input.name}__${key}`}
                    placeholder={input.additionalLabels?.[key] ?? key}
                    required={input.mandatory}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      });

    case "INPUT":
    default:
      return control.inputs.map((input) => (
        <div className="col-md-6" key={input.name}>
          <input
            type={input.type === "NUMBER" ? "number" : "text"}
            className="form-control"
            name={input.name}
            placeholder={`${input.label}${input.mandatory ? " *" : ""}`}
            required={input.mandatory}
            maxLength={input.maxLength}
          />
        </div>
      ));
  }
}
