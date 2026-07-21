import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/getDictionary";

export const metadata: Metadata = {
  title: "Services - Shri Hans Enterprises",
  description:
    "Laser cutting, CNC laser cutting, MS & SS fabrication, powder coating, welding, railings, gates, steel structures, and custom metal design.",
};

export default async function ServicesPage() {
  const dict = await getDictionary(await getLocale());
  const { servicesPage } = dict;

  return (
    <>
      <PageHeader
        title={servicesPage.title}
        crumb={servicesPage.title}
        description={servicesPage.description}
        homeLabel={dict.pageHeader.breadcrumbHome}
      />

      {/* Pillars */}
      <section className="py-20">
        <div className="site-container px-4 sm:px-0">
          <Reveal stagger={0.12} className="grid gap-6 md:grid-cols-3">
            {servicesPage.pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-line bg-surface p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(212,175,55,0.15)]"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-black">
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
            eyebrow={servicesPage.sectionEyebrow}
            title={servicesPage.sectionTitle}
            description={servicesPage.sectionDescription}
          />
          <Reveal stagger={0.08} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {servicesPage.list.map((s) => (
              <div
                key={s.title}
                className="flex gap-4 rounded-2xl bg-surface p-6 shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(212,175,55,0.12)]"
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
              className="inline-block rounded-lg bg-brand px-10 py-4 font-semibold text-black shadow-[0_4px_15px_rgba(212,175,55,0.4)] transition hover:bg-brand-dark"
            >
              {servicesPage.ctaQuote}
            </Link>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <Testimonials dict={dict.testimonials} />
    </>
  );
}
