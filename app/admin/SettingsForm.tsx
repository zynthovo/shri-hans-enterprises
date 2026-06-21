"use client";

import { useState, type FormEvent } from "react";
import type { SiteSettings } from "@/lib/settings";

const input =
  "w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";
const label = "mb-1 block text-sm font-medium text-heading";

const SOCIALS: { key: keyof SiteSettings["socials"]; label: string; placeholder: string }[] = [
  { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/yourpage" },
  { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/yourhandle" },
  { key: "twitter", label: "Twitter / X", placeholder: "https://x.com/yourhandle" },
  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/company/you" },
  { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/@yourchannel" },
  { key: "github", label: "GitHub", placeholder: "https://github.com/you" },
];

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [contact, setContact] = useState(initial.contact);
  const [emailsText, setEmailsText] = useState(initial.contact.emails.join("\n"));
  const [socials, setSocials] = useState(initial.socials);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: {
            ...contact,
            emails: emailsText.split("\n").map((s) => s.trim()).filter(Boolean),
          },
          socials,
        }),
      });
      setStatus((await res.json()).success ? "saved" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Contact info */}
      <section className="rounded-2xl border border-line bg-surface p-6">
        <h2 className="mb-4 text-lg font-bold text-heading">Contact Information</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label}>Address</label>
            <textarea
              rows={2}
              value={contact.address}
              onChange={(e) => setContact({ ...contact, address: e.target.value })}
              className={input}
            />
          </div>
          <div>
            <label className={label}>Phone</label>
            <input
              value={contact.phone}
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
              className={input}
            />
          </div>
          <div>
            <label className={label}>WhatsApp number (with country code)</label>
            <input
              value={contact.whatsapp}
              onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
              placeholder="918948972625"
              className={input}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Emails (one per line)</label>
            <textarea
              rows={4}
              value={emailsText}
              onChange={(e) => setEmailsText(e.target.value)}
              className={input}
            />
          </div>
        </div>
      </section>

      {/* Socials */}
      <section className="rounded-2xl border border-line bg-surface p-6">
        <h2 className="mb-1 text-lg font-bold text-heading">Social Media Links</h2>
        <p className="mb-4 text-sm text-muted">
          Paste the full URL. Leave blank to hide that icon.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {SOCIALS.map((s) => (
            <div key={s.key}>
              <label className={label}>{s.label}</label>
              <input
                value={socials[s.key]}
                placeholder={s.placeholder}
                onChange={(e) => setSocials({ ...socials, [s.key]: e.target.value })}
                className={input}
              />
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "saving"}
          className="rounded-lg bg-brand px-8 py-3 font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
        >
          {status === "saving" ? "Saving…" : "Save changes"}
        </button>
        {status === "saved" && (
          <span className="text-sm font-medium text-green-600">Saved ✓</span>
        )}
        {status === "error" && (
          <span className="text-sm font-medium text-red-600">
            Couldn’t save. Try again.
          </span>
        )}
      </div>
    </form>
  );
}
