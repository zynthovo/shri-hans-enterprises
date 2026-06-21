import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { Features } from "@/components/sections/Features";
import { Technologies } from "@/components/sections/Technologies";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "Services - Zynthovo Digital Private Limited",
  description:
    "IT solutions, web & software development, mobile apps, AI automation, IoT, CRM/ERP, digital & influencer marketing (Creators Flow), graphic design, video editing, company formation, GST returns and income tax filing in Lucknow.",
};

const pillars = [
  {
    icon: "fa-laptop-code",
    title: "Technology & Development",
    desc: "Websites, custom software, CRM/ERP, mobile apps, AI automation and IoT — engineered to run and scale your business.",
  },
  {
    icon: "fa-bullhorn",
    title: "Marketing & Creative",
    desc: "Digital marketing, influencer campaigns via Creators Flow, graphic design and video editing to grow your brand.",
  },
  {
    icon: "fa-file-invoice-dollar",
    title: "Finance, Tax & Compliance",
    desc: "Company formation, GST, income tax, accounting and full CA services to keep you 100% compliant.",
  },
];

const services = [
  { icon: "fa-globe", title: "Website Design & Development", desc: "Responsive, SEO-friendly websites and e-commerce stores tailored to your brand." },
  { icon: "fa-code", title: "Software, CRM & ERP", desc: "Custom software, CRM and ERP systems to automate and manage your operations." },
  { icon: "fa-mobile-screen-button", title: "Mobile App Development", desc: "Native Android & iOS apps with great UX and reliable performance." },
  { icon: "fa-robot", title: "AI Automation", desc: "Intelligent automation that removes manual work and reduces costs." },
  { icon: "fa-graduation-cap", title: "AI School Management Software", desc: "Our AI-powered platform for admissions, fees, attendance and academics." },
  { icon: "fa-microchip", title: "IoT Solutions", desc: "Connected devices, real-time monitoring and intelligent control systems." },
  { icon: "fa-chart-line", title: "Digital Marketing", desc: "SEO, social media, paid ads and content strategy that drive real growth." },
  { icon: "fa-bullseye", title: "Influencer Marketing — Creators Flow", desc: "Run influencer campaigns at scale with our own platform, Creators Flow." },
  { icon: "fa-palette", title: "Graphic Design", desc: "Logos, branding, social creatives and marketing collateral that stand out." },
  { icon: "fa-clapperboard", title: "Video Editing", desc: "Editing for ads, reels, YouTube and corporate videos that convert." },
  { icon: "fa-building-columns", title: "Company Formation", desc: "Incorporation, documentation, registrations and legal compliance." },
  { icon: "fa-file-invoice", title: "GST, Tax & Accounting", desc: "GST registration & returns, income tax filing, bookkeeping and full CA services." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Services"
        crumb="Services"
        description="One company for everything your business needs — technology, marketing, and financial compliance under a single roof."
      />

      {/* Pillars */}
      <section className="py-20">
        <div className="site-container px-4 sm:px-0">
          <Reveal stagger={0.12} className="grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-[#001946]/[0.06] bg-surface p-8 text-center shadow-[0_10px_30px_rgba(0,25,70,0.05)] transition hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,93,237,0.12)]"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-white">
                  <i className={`fa-solid ${p.icon} text-2xl`} />
                </div>
                <h4 className="mb-2 text-xl font-bold text-heading">{p.title}</h4>
                <p className="text-muted">{p.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Full service list */}
      <section className="bg-surface-alt py-20">
        <div className="site-container px-4 sm:px-0">
          <SectionTitle
            eyebrow="Everything We Do"
            title="Our Complete Services"
            description="From your first line of code to your annual tax return — we cover it all."
          />
          <Reveal stagger={0.08} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="flex gap-4 rounded-2xl bg-surface p-6 shadow-[0_10px_30px_rgba(0,25,70,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,93,237,0.1)]"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <i className={`fa-solid ${s.icon} text-lg`} />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-heading">{s.title}</h4>
                  <p className="text-sm text-muted">{s.desc}</p>
                </div>
              </div>
            ))}
          </Reveal>

          <div className="mt-12 text-center">
            <Link
              href="/get-a-quote"
              className="inline-block rounded-lg bg-brand px-10 py-4 font-semibold text-white shadow-[0_4px_15px_rgba(0,93,237,0.4)] transition hover:bg-brand-dark"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      <Features />
      <Technologies />
      <Testimonials />
    </>
  );
}
