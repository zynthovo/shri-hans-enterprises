import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";

const features = [
  {
    img: "/assets/img/features-1.png",
    flip: false,
    title: "One partner for technology, marketing & compliance",
    italic:
      "Stop juggling multiple agencies and consultants. Zynthovo handles your software, marketing, and finances under a single roof.",
    list: [
      "Web, software, CRM/ERP, mobile apps, AI & IoT",
      "Digital marketing, design, video & influencer campaigns",
      "GST, income tax, company formation & accounting",
    ],
  },
  {
    img: "/assets/img/features-2.png",
    flip: true,
    title: "Built for Indian businesses",
    italic:
      "Lucknow-based and registered as Zynthovo Digital Private Limited — we understand local compliance and the way Indian businesses grow.",
    para: "From GST registration and return filing to income tax and ROC compliance, our in-house CA services keep you fully compliant while our tech and marketing teams help you scale.",
  },
  {
    img: "/assets/img/features-3.png",
    flip: false,
    title: "AI-first and future-ready",
    para: "We don't just build software — we build intelligent systems. From AI automation to our AI-powered School Management Software, we help you work smarter.",
    list: [
      "AI automation to cut manual, repetitive work",
      "AI-powered School Management Software",
      "Creators Flow — our influencer marketing platform",
    ],
  },
  {
    img: "/assets/img/features-4.png",
    flip: true,
    title: "Founder-led and client-obsessed",
    italic:
      "Led by directors Tarun Kumar Sahani and Sandeep Yadav, with hands-on involvement in every engagement.",
    para: "You get a dedicated point of contact, transparent communication, and ongoing support across info@, contact@, support@ and careers@zynthovo.com — we treat your business like our own.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20">
      <div className="site-container">
        <SectionTitle
          eyebrow="Features"
          title="Why Choose Zynthovo"
          description="One team for technology, marketing, and compliance — with senior, hands-on involvement in every engagement."
        />

        <div className="space-y-16">
          {features.map((f, idx) => (
            <Reveal
              key={idx}
              className="grid items-center gap-8 md:grid-cols-12"
            >
              <div
                className={`md:col-span-5 ${
                  f.flip ? "md:order-2" : "md:order-1"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.img}
                  alt=""
                  className="w-full rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
                />
              </div>
              <div
                className={`md:col-span-7 ${
                  f.flip ? "md:order-1" : "md:order-2"
                }`}
              >
                <h3 className="mb-4 text-2xl font-bold text-heading">{f.title}</h3>
                {f.italic && (
                  <p className="mb-4 italic text-muted">{f.italic}</p>
                )}
                {f.para && <p className="mb-4 text-muted">{f.para}</p>}
                {f.list && (
                  <ul className="space-y-2">
                    {f.list.map((li) => (
                      <li key={li} className="flex items-start gap-2 text-foreground">
                        <i className="bi bi-check mt-0.5 text-xl text-brand" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
