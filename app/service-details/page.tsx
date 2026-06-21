import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Service Details - Zynthovo Digital",
};

const services = [
  "Web Design",
  "Software Development",
  "Product Management",
  "Graphic Design",
  "Marketing",
];

export default function ServiceDetailsPage() {
  return (
    <>
      <PageHeader title="Service Details" crumb="Service Details" />

      <section className="py-20">
        <div className="site-container px-4 sm:px-0">
          <div className="grid gap-8 lg:grid-cols-12">
            <Reveal animation="fade-right" className="lg:col-span-4">
              <div className="overflow-hidden rounded-2xl bg-surface p-3 shadow-[0_10px_30px_rgba(0,25,70,0.06)]">
                {services.map((s, i) => (
                  <a
                    key={s}
                    href="#"
                    className={`block rounded-lg px-4 py-3 font-medium transition ${
                      i === 0
                        ? "bg-brand text-white"
                        : "text-heading hover:bg-surface-alt hover:text-brand"
                    }`}
                  >
                    {s}
                  </a>
                ))}
              </div>
              <h4 className="mt-6 text-xl font-bold text-heading">
                Need help choosing a service?
              </h4>
              <p className="mt-2 text-muted">
                Tell us about your business and goals, and our team will
                recommend the right mix of technology, marketing, and compliance
                services. Reach us at info@zynthovo.com or call 8948972625.
              </p>
            </Reveal>

            <Reveal animation="fade-up" className="lg:col-span-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/img/services.jpg"
                alt="Service"
                className="mb-6 w-full rounded-2xl"
              />
              <h3 className="mb-4 text-2xl font-bold text-heading">
                End-to-end solutions built around your business
              </h3>
              <p className="mb-4 text-muted">
                From custom websites, software, CRM and ERP to mobile apps, AI
                automation and IoT — we design, build, and maintain the systems
                that run your operations, then market your brand and keep you
                financially compliant.
              </p>
              <ul className="mb-4 space-y-2">
                {[
                  "A single team for technology, marketing, and compliance.",
                  "Transparent communication and a dedicated point of contact.",
                  "Ongoing support and maintenance after launch.",
                ].map((li) => (
                  <li key={li} className="flex items-start gap-2 text-foreground">
                    <i className="bi bi-check-circle mt-0.5 text-brand" />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted">
                Whether you need a one-off project or a long-term partner, we
                tailor every engagement to your goals — so everything stays
                under one roof and moving in the same direction.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
