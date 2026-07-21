import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/getDictionary";

export async function Process() {
  const { process } = await getDictionary(await getLocale());

  return (
    <section id="process" className="bg-surface-alt py-20">
      <div className="site-container px-4 sm:px-0">
        <SectionTitle
          eyebrow={process.eyebrow}
          title={process.title}
          description={process.description}
        />

        <Reveal
          stagger={0.1}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {process.steps.map((s, i) => (
            <div
              key={s.title}
              className="relative rounded-2xl border border-line bg-surface p-8 shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(212,175,55,0.15)]"
            >
              <span className="absolute right-6 top-6 text-4xl font-black text-brand/15">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-black">
                <i className={`fa-solid ${s.icon} text-xl`} />
              </div>
              <h5 className="mb-2 text-lg font-semibold text-heading">
                {process.stepLabel} {i + 1}: {s.title}
              </h5>
              <p className="text-muted">{s.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
