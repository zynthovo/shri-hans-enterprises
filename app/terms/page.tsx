import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Terms & Conditions - Shri Hans Enterprises",
  description:
    "The terms governing your use of Shri Hans Enterprises's website and services.",
};

const LAST_UPDATED = "11 July 2026";

type Section = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

const sections: Section[] = [
  {
    heading: "1. Acceptance of Terms",
    paragraphs: [
      "These Terms & Conditions (“Terms”) govern your access to and use of the website and services of Shri Hans Enterprises (“Shri Hans”, “we”, “us” or “our”), a steel fabrication and laser cutting workshop based in Faridabad, Haryana, India. By accessing our website or engaging our services, you agree to be bound by these Terms.",
    ],
  },
  {
    heading: "2. Our Services",
    paragraphs: [
      "Shri Hans provides laser cutting, CNC laser cutting, MS & SS fabrication, powder coating, welding, railings, gates, steel structures, and custom metal design and installation.",
      "The specific scope, deliverables, timelines, and fees for any project will be set out in a separate quote or agreement, which forms part of these Terms.",
    ],
  },
  {
    heading: "3. Quotes, Pricing & Payment",
    list: [
      "Quotes are based on the site details, measurements, and designs shared with us and are valid for the period stated in the quote.",
      "Fees, payment milestones, and schedules are as agreed in the relevant quote or invoice.",
      "Unless stated otherwise, payments are non-refundable once fabrication has commenced or materials have been ordered.",
      "Applicable taxes will be charged in addition to the quoted amounts.",
    ],
  },
  {
    heading: "4. Client Responsibilities",
    paragraphs: [
      "To deliver our services effectively, you agree to provide accurate site measurements, timely feedback and approvals, and safe site access for installation. Delays in providing these may affect timelines and costs.",
    ],
  },
  {
    heading: "5. Warranties & Disclaimers",
    paragraphs: [
      "We deliver our fabrication and installation work with reasonable skill and care, using the materials and finish agreed in your quote. Normal wear, exposure damage, or damage from improper use or maintenance is not covered unless otherwise agreed in writing.",
    ],
  },
  {
    heading: "6. Third-Party Materials & Services",
    paragraphs: [
      "Our work may rely on third-party materials, coatings, or hardware. We are not responsible for defects in materials supplied by third parties beyond the manufacturer's own warranty.",
    ],
  },
  {
    heading: "7. Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by law, Shri Hans shall not be liable for any indirect, incidental, or consequential losses. Our total liability for any claim arising out of a project shall not exceed the fees paid by you for that specific project.",
    ],
  },
  {
    heading: "8. Termination",
    paragraphs: [
      "Either party may terminate a project as set out in the relevant quote or agreement. On termination, you agree to pay for all work and materials committed up to the date of termination.",
    ],
  },
  {
    heading: "9. Governing Law & Jurisdiction",
    paragraphs: [
      "These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Faridabad, Haryana.",
    ],
  },
  {
    heading: "10. Changes to These Terms",
    paragraphs: [
      "We may update these Terms from time to time. Continued use of our website or services after changes are posted constitutes acceptance of the updated Terms.",
    ],
  },
  {
    heading: "11. Contact Us",
    paragraphs: [
      "For any questions about these Terms, contact us via the phone number or email listed on our Contact page.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms & Conditions"
        crumb="Terms & Conditions"
        description="The terms that govern your use of our website and services."
      />

      <section className="py-16">
        <div className="site-container px-4 sm:px-0">
          <Reveal animation="fade-up" className="mx-auto max-w-3xl">
            <p className="mb-10 text-sm text-muted">
              Last updated: {LAST_UPDATED}
            </p>

            <div className="space-y-10">
              {sections.map((s) => (
                <div key={s.heading}>
                  <h2 className="mb-3 text-xl font-bold text-heading sm:text-2xl">
                    {s.heading}
                  </h2>
                  {s.paragraphs?.map((p, i) => (
                    <p key={i} className="mb-3 leading-relaxed text-muted">
                      {p}
                    </p>
                  ))}
                  {s.list ? (
                    <ul className="mt-2 space-y-2">
                      {s.list.map((li) => (
                        <li
                          key={li}
                          className="flex items-start gap-2 leading-relaxed text-muted"
                        >
                          <i className="bi bi-check-circle mt-1 shrink-0 text-brand" />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
