"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n/locale";

const OPTIONS: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "hi", label: "हिं" },
];

export function LanguageToggle({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const setLocale = async (next: Locale) => {
    if (next === locale || pending) return;
    setPending(true);
    try {
      await fetch("/api/set-locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: next }),
      });
      router.refresh();
    } finally {
      setPending(false);
    }
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className={`flex items-center gap-0.5 rounded-full border border-white/20 p-0.5 ${className}`}
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setLocale(opt.value)}
          disabled={pending}
          aria-pressed={locale === opt.value}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition disabled:opacity-60 ${
            locale === opt.value
              ? "bg-brand text-black"
              : "text-white/80 hover:text-white"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
