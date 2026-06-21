"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Creators Flow", href: "/creators-flow" },
  { label: "Pricing", href: "/pricing" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

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
          ? "bg-[#001226]/95 shadow-lg backdrop-blur py-2"
          : "bg-[#001226]/80 py-3"
      }`}
    >
      <div className="site-container flex items-center px-4 sm:px-0">
        <Link href="/" className="me-auto flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/icon.png"
            alt="Zynthovo Digital"
            className="h-9 w-auto drop-shadow-[0_2px_8px_rgba(0,93,237,0.35)] md:h-10"
          />
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-wide text-white md:text-xl">
              ZYNTHOVO
            </span>
            <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.25em] text-white/50 md:text-[10px]">
              Digital Private Limited
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

          <div
            className="relative"
            onMouseEnter={() => setDropOpen(true)}
            onMouseLeave={() => setDropOpen(false)}
          >
            <button className="flex items-center gap-1 px-4 py-2 text-[15px] font-medium text-white/90 transition hover:text-white">
              Dropdown <i className="bi bi-chevron-down text-xs" />
            </button>
            <ul
              className={`absolute left-0 top-full min-w-[200px] rounded-xl bg-white p-2 shadow-xl transition ${
                dropOpen
                  ? "visible opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              }`}
            >
              {[
                { label: "Service Details", href: "/service-details" },
                { label: "Get a Quote", href: "/get-a-quote" },
                { label: "Starter Page", href: "/starter-page" },
              ].map((d) => (
                <li key={d.href}>
                  <Link
                    href={d.href}
                    className="block rounded-lg px-4 py-2 text-sm text-[#444] hover:bg-[#f3f6fb] hover:text-brand"
                  >
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/contact"
            className="px-4 py-2 text-[15px] font-medium text-white/90 transition hover:text-white"
          >
            Contact
          </Link>
        </nav>

        <ThemeToggle className="ms-4 hidden xl:flex" />

        <Link
          href="/get-a-quote"
          className="ms-3 hidden rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_15px_rgba(0,93,237,0.4)] transition hover:bg-brand-dark xl:inline-block"
        >
          Get a Quote
        </Link>

        {/* Mobile actions */}
        <ThemeToggle className="ms-auto xl:hidden" />

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
        <nav className="border-t border-white/10 bg-[#001226] px-6 py-4 xl:hidden">
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
            <li>
              <Link
                href="/contact"
                className="block py-2 text-white/90"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li className="pt-2">
              <Link
                href="/get-a-quote"
                className="inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Get a Quote
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
