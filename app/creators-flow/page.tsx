import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { CreatorsFlowHero } from "@/components/sections/CreatorsFlowHero";

export const metadata: Metadata = {
  title: "Creators Flow — Influencer Marketing Platform",
  description:
    "Creators Flow by Zynthovo Digital — Influencer Marketing. Amplified. Discover creators, run campaigns end to end, and measure real ROI from one platform.",
};

const features = [
  {
    icon: "fa-people-group",
    title: "Creator Discovery",
    desc: "Find and match the right creators for your brand by niche, audience, location, and engagement.",
  },
  {
    icon: "fa-diagram-project",
    title: "Campaign Management",
    desc: "Brief, approve content, track deliverables and timelines — every campaign in one organised place.",
  },
  {
    icon: "fa-chart-simple",
    title: "Real Analytics",
    desc: "Track reach, engagement, clicks, and ROI with transparent reporting on every campaign.",
  },
  {
    icon: "fa-shield-halved",
    title: "Secure & Managed",
    desc: "Contracts, content rights, and payouts handled smoothly so collaborations stay hassle-free.",
  },
];

const steps = [
  { n: "01", title: "Share your goals", desc: "Tell us your brand, budget, and audience — or set up your campaign directly." },
  { n: "02", title: "We match creators", desc: "Get matched with vetted creators who fit your niche and target audience." },
  { n: "03", title: "Launch the campaign", desc: "Approve content and go live across the right platforms at the right time." },
  { n: "04", title: "Measure & scale", desc: "See real performance data and double down on what works." },
];

export default function CreatorsFlowPage() {
  return (
    <>
      <CreatorsFlowHero />

      {/* Features */}
      <section className="bg-[#f8f9fa] py-20">
        <div className="site-container px-4 sm:px-0">
          <SectionTitle
            eyebrow="Why Creators Flow"
            title="Everything you need to run influencer campaigns"
            description="One platform for discovery, management, analytics, and payouts."
          />
          <Reveal stagger={0.1} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-white p-7 shadow-[0_10px_30px_rgba(0,25,70,0.05)] transition hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(123,47,247,0.15)]"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#7b2ff7] to-[#2f6bff] text-white">
                  <i className={`fa-solid ${f.icon} text-xl`} />
                </div>
                <h4 className="mb-2 text-lg font-bold text-navy">{f.title}</h4>
                <p className="text-sm text-[#6c757d]">{f.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-24 py-20">
        <div className="site-container px-4 sm:px-0">
          <SectionTitle
            eyebrow="How It Works"
            title="From brief to results in 4 steps"
          />
          <Reveal stagger={0.12} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-[#001946]/[0.06] bg-white p-7 shadow-[0_10px_30px_rgba(0,25,70,0.05)]"
              >
                <span className="bg-gradient-to-r from-[#7b2ff7] to-[#2f6bff] bg-clip-text text-4xl font-extrabold text-transparent">
                  {s.n}
                </span>
                <h4 className="mb-2 mt-3 text-lg font-bold text-navy">
                  {s.title}
                </h4>
                <p className="text-sm text-[#6c757d]">{s.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#7b2ff7] via-[#9b3fd1] to-[#2f6bff] py-20">
        <div className="site-container px-4 text-center sm:px-0">
          <Reveal animation="zoom-in" className="mx-auto max-w-2xl">
            <h3 className="text-4xl font-bold text-white">
              Ready to amplify your brand?
            </h3>
            <p className="mt-4 text-lg text-white/85">
              Run your next influencer campaign with Creators Flow and reach the
              right audience through the right creators.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-lg bg-white px-10 py-4 font-semibold text-[#7b2ff7] shadow-lg transition hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
