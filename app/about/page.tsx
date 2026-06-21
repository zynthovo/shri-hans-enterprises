import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Stats } from "@/components/sections/Stats";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "About - Zynthovo Digital Private Limited",
  description:
    "Zynthovo Digital Private Limited is a Lucknow-based technology, marketing, and compliance company founded by Tarun Kumar Sahani and Sandeep Yadav.",
};

const points = [
  {
    icon: "bi-diagram-3",
    title: "Everything under one roof",
    desc: "Development, marketing, design, and CA services from a single, accountable team — no more juggling multiple vendors.",
  },
  {
    icon: "bi-cpu",
    title: "Products that work for you",
    desc: "Creators Flow for influencer marketing and our AI-powered School Management Software, alongside custom CRM & ERP builds.",
  },
  {
    icon: "bi-shield-check",
    title: "Compliance you can trust",
    desc: "GST, income tax, company formation and accounting handled correctly and on time, so you stay fully compliant.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About" crumb="About" />

      <section id="about" className="py-20">
        <div className="site-container px-4 sm:px-0">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal animation="fade-left" className="order-first lg:order-last">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/img/about.jpg"
                  alt="About Zynthovo Digital"
                  className="w-full rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)]"
                />
                <a
                  href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Play video"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-2xl text-white shadow-lg transition hover:scale-110">
                    <i className="bi bi-play-fill" />
                  </span>
                </a>
              </div>
            </Reveal>

            <Reveal animation="fade-right" className="order-last lg:order-first">
              <h3 className="mb-4 text-3xl font-bold text-heading">About Us</h3>
              <p className="mb-6 text-muted">
                Zynthovo Digital Private Limited is a Lucknow-based company that
                brings technology, marketing, and financial compliance together
                under one roof. Founded by{" "}
                <strong className="text-heading">Tarun Kumar Sahani</strong> and
                co-founded by{" "}
                <strong className="text-heading">Sandeep Yadav</strong>, we help
                businesses build software, grow their brand, and stay fully
                compliant — all with one trusted partner.
              </p>
              <ul className="space-y-5">
                {points.map((p) => (
                  <li key={p.title} className="flex gap-4">
                    <i className={`bi ${p.icon} mt-1 text-2xl text-brand`} />
                    <div>
                      <h5 className="font-semibold text-heading">{p.title}</h5>
                      <p className="text-muted">{p.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <Stats />
      <Team />
      <Testimonials />
      <Faq />
    </>
  );
}
