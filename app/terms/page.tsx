import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Terms & Conditions - Zynthovo Digital",
  description:
    "The terms governing your use of Zynthovo Digital Private Limited's website, services, and products.",
};

const LAST_UPDATED = "21 June 2026";

type Section = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

const sections: Section[] = [
  {
    heading: "1. Acceptance of Terms",
    paragraphs: [
      "These Terms & Conditions (“Terms”) govern your access to and use of the website, services, and products of Zynthovo Digital Private Limited (“Zynthovo”, “we”, “us” or “our”), a company based in Lucknow, Uttar Pradesh, India. By accessing our website or engaging our services, you agree to be bound by these Terms.",
    ],
  },
  {
    heading: "2. Our Services",
    paragraphs: [
      "Zynthovo provides website and software development, CRM/ERP, mobile app development, AI automation, IoT solutions, digital and influencer marketing (including our platform, Creators Flow), graphic design, video editing, and financial compliance services such as company formation, GST registration & returns, income tax filing, and accounting.",
      "The specific scope, deliverables, timelines, and fees for any engagement will be set out in a separate proposal, quote, or agreement, which forms part of these Terms.",
    ],
  },
  {
    heading: "3. Quotes, Pricing & Payment",
    list: [
      "Quotes are based on the requirements shared with us and are valid for the period stated in the quote.",
      "Fees, payment milestones, and schedules are as agreed in the relevant proposal or invoice.",
      "Unless stated otherwise, payments are non-refundable once the corresponding work has commenced or been delivered.",
      "Applicable taxes (including GST) will be charged in addition to the quoted amounts.",
    ],
  },
  {
    heading: "4. Client Responsibilities",
    paragraphs: [
      "To deliver our services effectively, you agree to provide accurate information, timely feedback and approvals, and any content, access, or documents we reasonably require. Delays in providing these may affect timelines and costs. You are responsible for ensuring that any materials you provide do not infringe third-party rights.",
    ],
  },
  {
    heading: "5. Intellectual Property",
    paragraphs: [
      "Upon full payment, ownership of the final, custom deliverables created specifically for you transfers to you, unless otherwise agreed. Zynthovo retains ownership of its pre-existing tools, frameworks, source libraries, and any proprietary products or platforms (including Creators Flow and our AI-powered School Management Software). We may showcase completed work in our portfolio unless you request otherwise in writing.",
    ],
  },
  {
    heading: "6. Use of Our Products & Platforms",
    paragraphs: [
      "Access to our products and platforms, including Creators Flow, is subject to any additional terms presented with those products. You agree not to misuse, reverse-engineer, or attempt to gain unauthorised access to our platforms, and to use them only for lawful purposes.",
    ],
  },
  {
    heading: "7. Third-Party Services",
    paragraphs: [
      "Our services may rely on third-party tools, hosting, APIs, or platforms. We are not responsible for the availability, performance, or terms of such third-party services, and their use may be subject to separate terms.",
    ],
  },
  {
    heading: "8. Confidentiality",
    paragraphs: [
      "Both parties agree to keep confidential any non-public information shared during an engagement and to use it only for the purpose of delivering or receiving the services.",
    ],
  },
  {
    heading: "9. Warranties & Disclaimers",
    paragraphs: [
      "We deliver our services with reasonable skill and care. However, except as expressly stated, our website, services, and products are provided on an “as is” basis without warranties of any kind. We do not guarantee specific business results, search rankings, campaign outcomes, or uninterrupted, error-free operation.",
    ],
  },
  {
    heading: "10. Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by law, Zynthovo shall not be liable for any indirect, incidental, or consequential losses. Our total liability for any claim arising out of an engagement shall not exceed the fees paid by you for the specific service giving rise to the claim.",
    ],
  },
  {
    heading: "11. Termination",
    paragraphs: [
      "Either party may terminate an engagement as set out in the relevant agreement. On termination, you agree to pay for all work completed up to the date of termination.",
    ],
  },
  {
    heading: "12. Governing Law & Jurisdiction",
    paragraphs: [
      "These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Lucknow, Uttar Pradesh.",
    ],
  },
  {
    heading: "13. Changes to These Terms",
    paragraphs: [
      "We may update these Terms from time to time. Continued use of our website or services after changes are posted constitutes acceptance of the updated Terms.",
    ],
  },
  {
    heading: "14. Contact Us",
    paragraphs: [
      "For any questions about these Terms, contact us at info@zynthovo.com or 8948972625. Registered office: 70-A, Lok Nagar K.B. Marg, Alok Nagar, Kalyanpur, Lucknow-226022, Uttar Pradesh, India.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms & Conditions"
        crumb="Terms & Conditions"
        description="The terms that govern your use of our website, services, and products."
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
