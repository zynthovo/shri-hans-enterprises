import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { Pricing } from "@/components/sections/Pricing";

export const metadata: Metadata = { title: "Pricing - Zynthovo Digital" };

const altPlans = [
  {
    name: "Free Plan",
    price: 0,
    featured: false,
    features: ["Free initial consultation", "Project scope & estimate"],
  },
  {
    name: "Business Plan",
    price: 29,
    featured: true,
    features: [
      "Dedicated account manager",
      "Priority email & phone support",
      "Monthly progress reporting",
    ],
  },
  {
    name: "Developer Plan",
    price: 49,
    featured: false,
    features: [
      "Everything in Business",
      "Custom integrations & APIs",
      "24/7 technical support",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader title="Pricing" crumb="Pricing" />

      <Pricing />

      {/* Alt pricing */}
      <section className="bg-surface-alt py-20">
        <div className="site-container px-4 sm:px-0">
          <SectionTitle
            eyebrow="Plans"
            title="Simple, Transparent Plans"
            description="Flexible engagement options to match your business stage — from a free consultation to full-scale support."
          />
          <div className="space-y-4">
            {altPlans.map((p) => (
              <Reveal
                key={p.name}
                animation="fade-up"
                className={`grid items-center gap-4 rounded-2xl border bg-surface p-6 lg:grid-cols-4 ${
                  p.featured
                    ? "border-brand shadow-[0_20px_50px_rgba(0,93,237,0.18)]"
                    : "border-line shadow-[0_10px_30px_rgba(0,25,70,0.05)]"
                }`}
              >
                <h3 className="text-center text-xl font-semibold text-heading lg:text-left">
                  {p.name}
                </h3>
                <h4 className="text-center text-3xl font-bold text-brand">
                  <sup className="text-lg">$</sup>
                  {p.price}
                  <span className="text-sm font-normal text-[#9aa3b2]">
                    {" "}
                    / month
                  </span>
                </h4>
                <ul className="space-y-1 text-sm text-muted">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <i className="bi bi-check text-lg text-brand" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <a
                    href="#"
                    className={`inline-block rounded-full px-8 py-2.5 font-semibold transition ${
                      p.featured
                        ? "bg-brand text-white"
                        : "border border-brand text-brand hover:bg-brand hover:text-white"
                    }`}
                  >
                    Buy Now
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
