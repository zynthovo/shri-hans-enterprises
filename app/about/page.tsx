import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Stats } from "@/components/sections/Stats";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/getDictionary";

export const metadata: Metadata = {
  title: "About - Shri Hans Enterprises",
  description:
    "Shri Hans Enterprises has delivered precision MS & SS fabrication, laser cutting, railings, gates, and steel structures since 2002.",
};

export default async function AboutPage() {
  const dict = await getDictionary(await getLocale());
  const { aboutPage } = dict;

  return (
    <>
      <PageHeader
        title={aboutPage.title}
        crumb={aboutPage.title}
        description={aboutPage.description}
        homeLabel={dict.pageHeader.breadcrumbHome}
      />

      <section id="about" className="py-20">
        <div className="site-container px-4 sm:px-0">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal animation="fade-left" className="order-first lg:order-last">
              <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-card via-ink to-card text-brand shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                <i className="fa-solid fa-bolt text-[7rem] drop-shadow-[0_0_40px_rgba(212,175,55,0.45)]" />
              </div>
            </Reveal>

            <Reveal animation="fade-right" className="order-last lg:order-first">
              <h3 className="mb-4 text-3xl font-bold text-heading">
                {aboutPage.heading}
              </h3>
              <p className="mb-6 text-muted">{aboutPage.body}</p>
              <ul className="space-y-5">
                {aboutPage.points.map((p) => (
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

      <Stats dict={dict.stats} />
      <Team />
      <Testimonials dict={dict.testimonials} />
      <Faq dict={dict.faq} />
    </>
  );
}
