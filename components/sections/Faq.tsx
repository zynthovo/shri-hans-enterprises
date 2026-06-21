"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { FlipText } from "@/components/FlipText";

const faqs = [
  {
    q: "What services does Zynthovo Digital offer?",
    a: "We are a one-stop partner for technology, marketing, and compliance — website & software development, CRM/ERP, mobile apps, AI automation, IoT, digital and influencer marketing, graphic design, video editing, plus company formation, GST returns, income tax filing and full CA services.",
  },
  {
    q: "What is Creators Flow?",
    a: "Creators Flow is our own influencer marketing platform — \"Influencer Marketing. Amplified.\" It connects brands with the right creators and helps you plan, run, and measure influencer campaigns end to end.",
  },
  {
    q: "Can you handle both my software and my GST/tax compliance?",
    a: "Yes. That's exactly why we exist. The same company can build your website, app, CRM or ERP, market your brand, and handle your GST registration, returns, income tax filing and accounting — so everything stays under one roof.",
  },
  {
    q: "Do you offer ready-made products?",
    a: "Yes. Alongside custom development, we offer Creators Flow (influencer marketing) and an AI-powered School Management Software, plus CRM and ERP solutions that can be tailored to your business.",
  },
  {
    q: "Where are you located and how can I reach you?",
    a: "We're based in Lucknow, Uttar Pradesh. Call us at 8948972625 or email info@zynthovo.com (general), contact@zynthovo.com, support@zynthovo.com, or careers@zynthovo.com for careers.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — animated heading */}
          <Reveal animation="fade-up" className="lg:sticky lg:top-28 lg:self-start">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              FAQ
            </span>
            <FlipText className="mt-4 text-4xl font-black uppercase text-heading sm:text-5xl lg:text-6xl">
              Frequently Asked Questions
            </FlipText>
            <p className="mt-6 max-w-md text-muted">
              Everything you need to know about working with Zynthovo — from what
              we build to how we keep your business compliant.
            </p>
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
