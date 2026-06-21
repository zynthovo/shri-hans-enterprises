import { Reveal } from "@/components/Reveal";
import { RiveRobot } from "@/components/RiveRobot";

const points = [
  {
    title: "Full-Stack Development & AI",
    desc: "Websites, custom software, CRM & ERP, mobile apps, IoT, and AI-powered solutions — including our AI School Management Software.",
  },
  {
    title: "Marketing, Creative & Creators Flow",
    desc: "Digital marketing, graphic design, video editing, and influencer marketing powered by our own platform, Creators Flow.",
  },
  {
    title: "Complete Tax & Compliance (CA Services)",
    desc: "Company formation, GST registration & returns, income tax filing, accounting and end-to-end financial compliance.",
  },
];

export function About() {
  return (
    <section id="about" className="bg-background py-20">
      <div className="site-container">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Interactive Rive robot — mouse on desktop, gyroscope on phones.
              Lazy-loads only when scrolled into view. */}
          <Reveal animation="zoom-in" className="order-first lg:order-last">
            <RiveRobot className="relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-[32px] bg-[#4040e2]" />
          </Reveal>

          {/* Content */}
          <Reveal animation="fade-up" className="order-last lg:order-first">
            <h3 className="mb-5 text-4xl font-bold text-heading">
              Your Complete Digital Transformation Partner
            </h3>
            <p className="mb-8 text-lg leading-relaxed text-muted">
              Zynthovo Digital Private Limited is a Lucknow-based company
              delivering end-to-end technology, marketing, and financial
              compliance under one roof. From building your software and app to
              growing your brand and filing your taxes — we handle it all so you
              can focus on running your business.
            </p>
            <ul className="space-y-5">
              {points.map((p) => (
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
