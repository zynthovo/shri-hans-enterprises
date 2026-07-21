import { Reveal } from "@/components/Reveal";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/getDictionary";

export async function About() {
  const dict = await getDictionary(await getLocale());
  const { about } = dict;

  return (
    <section id="about" className="bg-background py-20">
      <div className="site-container">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Icon panel */}
          <Reveal animation="zoom-in" className="order-first lg:order-last">
            <div className="relative mx-auto flex aspect-square w-full max-w-[520px] items-center justify-center overflow-hidden rounded-[28px] bg-gradient-to-br from-card via-ink to-card text-brand shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <i className="fa-solid fa-fire-flame-curved text-[9rem] drop-shadow-[0_0_40px_rgba(212,175,55,0.45)]" />
            </div>
          </Reveal>

          {/* Content */}
          <Reveal animation="fade-up" className="order-last lg:order-first">
            <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              {about.eyebrow}
            </span>
            <h3 className="mb-5 text-4xl font-bold text-heading">
              {about.title}
            </h3>
            <p className="mb-8 text-lg leading-relaxed text-muted">
              {about.body}
            </p>
            <ul className="space-y-5">
              {about.points.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <i className="bi bi-check-circle-fill mt-1 text-2xl text-brand" />
                  <div>
                    <h5 className="mb-1 font-semibold text-heading">{p.title}</h5>
                    <p className="text-muted">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
