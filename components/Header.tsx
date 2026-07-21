"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { LanguageToggle } from "@/components/LanguageToggle";
import type { Locale } from "@/lib/i18n/locale";
import type { Dictionary } from "@/lib/i18n/getDictionary";

export function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: dict.header.nav.home, href: "/" },
    { label: dict.header.nav.about, href: "/about" },
    { label: dict.header.nav.services, href: "/services" },
    { label: dict.header.nav.gallery, href: "/#gallery" },
    { label: dict.header.nav.contact, href: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-ink/95 shadow-lg backdrop-blur py-2"
          : "bg-ink/80 py-3"
      }`}
    >
      <div className="site-container flex items-center px-4 sm:px-0">
        <Link href="/" className="me-auto flex items-center gap-2.5">
          <Logo className="h-9 w-9 drop-shadow-[0_2px_8px_rgba(212,175,55,0.35)] md:h-10 md:w-10" />
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-wide text-white md:text-xl">
              SHRI HANS ENTERPRISES
            </span>
            <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.25em] text-white/50 md:text-[10px]">
              {dict.header.wordmarkTagline}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 xl:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-[15px] font-medium text-white/90 transition hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <LanguageToggle locale={locale} className="ms-4 hidden xl:flex" />
        <ThemeToggle className="ms-2 hidden xl:flex" />

        <Link
          href="/get-a-quote"
          className="ms-3 hidden rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-black shadow-[0_4px_15px_rgba(212,175,55,0.4)] transition hover:bg-brand-dark xl:inline-block"
        >
          {dict.header.getQuote}
        </Link>

        {/* Mobile actions */}
        <LanguageToggle locale={locale} className="ms-auto xl:hidden" />
        <ThemeToggle className="ms-2 xl:hidden" />

        <button
          className="ms-2 text-2xl text-white xl:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <i className={`bi ${mobileOpen ? "bi-x" : "bi-list"}`} />
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-white/10 bg-ink px-6 py-4 xl:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block py-2 text-white/90"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/get-a-quote"
                className="inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-black"
                onClick={() => setMobileOpen(false)}
              >
                {dict.header.getQuote}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
