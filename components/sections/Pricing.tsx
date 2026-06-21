import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";

const plans = [
  {
    name: "Starter",
    price: "4,999",
    unit: "starting",
    featured: false,
    features: [
      { label: "Business website (up to 5 pages)", ok: true },
      { label: "Basic SEO & social media setup", ok: true },
      { label: "GST registration", ok: true },
      { label: "Logo / basic branding", ok: false },
      { label: "Dedicated account manager", ok: false },
    ],
  },
  {
    name: "Business",
    price: "14,999",
    unit: "starting",
    featured: true,
    features: [
      { label: "Dynamic website or CRM", ok: true },
      { label: "Digital marketing & creatives", ok: true },
      { label: "GST returns + income tax filing", ok: true },
      { label: "Logo, graphics & video editing", ok: true },
      { label: "Priority support", ok: true },
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "",
    featured: false,
    features: [
      { label: "Custom software / ERP / mobile app", ok: true },
      { label: "AI automation & IoT solutions", ok: true },
      { label: "Full marketing + Creators Flow", ok: true },
      { label: "Complete accounting & compliance", ok: true },
      { label: "Dedicated account manager", ok: true },
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-surface-alt py-20">
      <div className="site-container">
        <SectionTitle
          eyebrow="Pricing"
          title="Simple, Transparent Pricing"
          description="Flexible plans for every stage of your business — or get a custom quote tailored to exactly what you need."
        />

        <Reveal stagger={0.15} className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-item ${plan.featured ? "featured" : ""}`}
            >
              <h3>{plan.name}</h3>
              <h4>
                {plan.price !== "Custom" && <sup>₹</sup>}
                {plan.price}
                {plan.unit && <span> {plan.unit}</span>}
              </h4>
              <ul>
                {plan.features.map((f) => (
                  <li key={f.label} className={f.ok ? "" : "na"}>
                    <i className={`bi ${f.ok ? "bi-check" : "bi-x"}`} />
                    <span>{f.label}</span>
                  </li>
                ))}
              </ul>
              <Link href="/get-a-quote" className="buy-btn">
                Get a Quote
              </Link>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
