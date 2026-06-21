import Link from "next/link";
import { ServicesView } from "@/components/ServicesView";
import { type CardStackItem } from "@/components/CardStack";

// Local branded images live in public/assets/services/<id>.jpg
const IMG = (name: string) => `/assets/services/${name}.jpg`;

const services: CardStackItem[] = [
  {
    id: "websites",
    icon: "fa-globe",
    imageSrc: IMG("websites"),
    title: "Custom Websites",
    description:
      "Responsive, SEO-optimized websites with modern design, e-commerce and CMS.",
  },
  {
    id: "software",
    icon: "fa-code",
    imageSrc: IMG("software"),
    title: "Software, CRM & ERP",
    description:
      "Custom software, CRM and ERP systems to automate and run your operations.",
  },
  {
    id: "mobile",
    icon: "fa-mobile-screen-button",
    imageSrc: IMG("mobile"),
    title: "Mobile App Development",
    description:
      "Native Android and iOS apps with stunning UI/UX and seamless performance.",
  },
  {
    id: "ai",
    icon: "fa-robot",
    imageSrc: IMG("ai"),
    title: "AI Automation",
    description:
      "Intelligent automation to streamline workflows, reduce costs, and scale.",
  },
  {
    id: "marketing",
    icon: "fa-bullhorn",
    imageSrc: IMG("marketing"),
    title: "Digital Marketing",
    description:
      "SEO, social media, content strategy, and paid advertising — all in one.",
  },
  {
    id: "iot",
    icon: "fa-microchip",
    imageSrc: IMG("iot"),
    title: "IoT Solutions",
    description:
      "Connected devices, real-time monitoring, and intelligent control systems.",
  },
  {
    id: "creators-flow",
    icon: "fa-bullseye",
    tag: "Our Platform",
    imageSrc: IMG("creators-flow"),
    title: "Creators Flow",
    description:
      "Run influencer campaigns at scale. Influencer marketing, amplified.",
    href: "/creators-flow",
  },
  {
    id: "graphic",
    icon: "fa-palette",
    imageSrc: IMG("graphic"),
    title: "Graphic Design",
    description:
      "Logos, branding, and marketing collateral that make your brand stand out.",
  },
  {
    id: "video",
    icon: "fa-clapperboard",
    imageSrc: IMG("video"),
    title: "Video Editing",
    description:
      "Professional editing for ads, reels, YouTube, and product demos.",
  },
  {
    id: "company",
    icon: "fa-building-columns",
    imageSrc: IMG("company"),
    title: "Company Formation",
    description:
      "End-to-end incorporation, documentation, and legal compliance.",
  },
  {
    id: "gst",
    icon: "fa-file-invoice",
    imageSrc: IMG("gst"),
    title: "GST Registration & Returns",
    description:
      "GST registration and timely return filing to keep you fully compliant.",
  },
  {
    id: "tax",
    icon: "fa-file-invoice-dollar",
    imageSrc: IMG("tax"),
    title: "Income Tax & Accounting",
    description:
      "Income tax filing, bookkeeping, TDS, ROC compliance and CA services.",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-background py-20">
      <div className="site-container">
        <ServicesView items={services} />

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-block rounded-lg bg-brand px-8 py-3.5 font-semibold text-white shadow-lg transition hover:bg-brand-dark"
          >
            Explore All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
