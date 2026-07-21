import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/getDictionary";

export async function WhyChooseUs() {
  const { whyChooseUs } = await getDictionary(await getLocale());

  return (
    <section id="why-choose-us" className="py-20">
      <div className="site-container">
        <SectionTitle
          eyebrow={whyChooseUs.eyebrow}
          title={whyChooseUs.title}
          description={whyChooseUs.description}
        />

        <Reveal
          stagger={0.08}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {whyChooseUs.reasons.map((r) => (
            <div
              key={r.title}
              className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(212,175,55,0.15)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-black">
                <i className={`fa-solid ${r.icon} text-xl`} />
              </div>
              <h5 className="font-semibold text-heading">{r.title}</h5>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
