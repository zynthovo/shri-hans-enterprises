"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { FlipText } from "@/components/FlipText";
import type { Dictionary } from "@/lib/i18n/getDictionary";

export function Faq({ dict }: { dict: Dictionary["faq"] }) {
  const faqs = dict.items;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — animated heading */}
          <Reveal animation="fade-up" className="lg:sticky lg:top-28 lg:self-start">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              {dict.eyebrow}
            </span>
            <FlipText className="mt-4 text-4xl font-black uppercase text-heading sm:text-5xl lg:text-6xl">
              {dict.title}
            </FlipText>
            <p className="mt-6 max-w-md text-muted">{dict.description}</p>
          </Reveal>

          {/* Right — animated questions */}
          <Reveal stagger={0.08} className="divide-y divide-line border-t border-line">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="py-5">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-4 text-left"
                  >
                    <FlipText
                      className="text-xl font-bold uppercase text-heading sm:text-2xl"
                      incomingClassName="text-brand"
                    >
                      {item.q}
                    </FlipText>
                    <i
                      className={`bi bi-chevron-right mt-1 shrink-0 text-xl text-brand transition-transform duration-300 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "mt-4 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <p className="overflow-hidden leading-relaxed text-muted">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
