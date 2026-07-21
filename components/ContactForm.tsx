"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "sent" | "error";

interface Field {
  name: string;
  type?: string;
  placeholder: string;
  full?: boolean;
  textarea?: boolean;
  optional?: boolean;
}

interface ContactFormProps {
  heading?: string;
  intro?: string;
  fields: Field[];
  button: string;
  successMessage: string;
  /** Email subject line so you can tell which form a submission came from. */
  subject?: string;
}

const inputClass =
  "w-full rounded-lg border border-[#e3e7ef] bg-surface px-4 py-3 text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

// Free access key from https://web3forms.com (tied to your destination email).
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export function ContactForm({
  heading,
  intro,
  fields,
  button,
  successMessage,
  subject = "New enquiry from the Shri Hans website",
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    setStatus("loading");

    const formData = new FormData(formEl);
    const values = Object.fromEntries(formData.entries());

    // 1) Store in the admin panel (source of truth — must succeed).
    let stored = false;
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, _type: subject }),
      });
      stored = (await res.json()).success === true;
    } catch (err) {
      console.error("Saving submission failed:", err);
    }

    // 2) Email notification via Web3Forms (best effort — don't block on it).
    if (ACCESS_KEY) {
      try {
        formData.append("access_key", ACCESS_KEY);
        formData.append("subject", subject);
        formData.append("from_name", "Shri Hans Website");
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });
      } catch (err) {
        console.error("Email notification failed:", err);
      }
    }

    if (stored) {
      setStatus("sent");
      formEl.reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl bg-surface p-6 shadow-[0_10px_30px_rgba(0,25,70,0.06)] sm:p-8"
    >
      {heading && (
        <h3 className="mb-1 text-2xl font-bold text-heading">{heading}</h3>
      )}
      {intro && <p className="mb-6 text-muted">{intro}</p>}

      {/* Honeypot — bots fill this in, humans never see it. */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((f) =>
          f.textarea ? (
            <textarea
              key={f.name}
              name={f.name}
              rows={6}
              required={!f.optional}
              placeholder={f.placeholder}
              className={`${inputClass} sm:col-span-2`}
            />
          ) : (
            <input
              key={f.name}
              type={f.type ?? "text"}
              name={f.name}
              required={!f.optional}
              placeholder={f.placeholder}
              className={`${inputClass} ${f.full ? "sm:col-span-2" : ""}`}
            />
          )
        )}
      </div>

      <div className="mt-6 text-center">
        {status === "sent" && (
          <p className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-green-700">
            {successMessage}
          </p>
        )}
        {status === "error" && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-red-700">
            Something went wrong. Please try again, or reach us on the phone
            or WhatsApp number in the footer.
          </p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-brand px-10 py-3 font-semibold text-black shadow-[0_4px_15px_rgba(212,175,55,0.4)] transition hover:bg-brand-dark disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : button}
        </button>
      </div>
    </form>
  );
}
