import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy - Shri Hans Enterprises",
  description:
    "How Shri Hans Enterprises collects, uses, and protects your personal information.",
};

const LAST_UPDATED = "11 July 2026";

type Section = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

const sections: Section[] = [
  {
    heading: "1. Introduction",
    paragraphs: [
      "Shri Hans Enterprises (“Shri Hans”, “we”, “us” or “our”) is a steel fabrication and laser cutting workshop based in Faridabad, Haryana, India. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, request a quote, or engage our fabrication services.",
      "By using our website or services, you agree to the collection and use of information in accordance with this policy.",
    ],
  },
  {
    heading: "2. Information We Collect",
    paragraphs: ["We may collect the following types of information:"],
    list: [
      "Contact details you provide — such as your name, email address, phone number, and message — when you request a quote, fill a form, or email us.",
      "Project details you share with us to prepare a quote or deliver a fabrication job (for example, site measurements, designs, or reference photos).",
      "Technical data such as IP address, browser type, device information, and pages visited, collected automatically through cookies and analytics.",
      "Communications and records of correspondence between you and our team.",
    ],
  },
  {
    heading: "3. How We Use Your Information",
    paragraphs: ["We use the information we collect to:"],
    list: [
      "Provide, operate, and improve our fabrication and laser cutting services.",
      "Respond to your enquiries, prepare quotes, and deliver projects.",
      "Send service updates and invoices related to your project.",
      "Maintain the security and integrity of our website and systems.",
      "Comply with applicable legal and regulatory obligations.",
    ],
  },
  {
    heading: "4. Cookies & Analytics",
    paragraphs: [
      "Our website may use cookies and similar technologies to remember your preferences and understand how the site is used. You can control or disable cookies through your browser settings, though some features may not function correctly without them.",
    ],
  },
  {
    heading: "5. Sharing & Disclosure",
    paragraphs: [
      "We do not sell your personal information. We may share it only with trusted service providers who help us operate (such as hosting or analytics providers), with government or regulatory authorities where required by law, or with your consent.",
    ],
  },
  {
    heading: "6. Data Security",
    paragraphs: [
      "We apply reasonable technical and organisational measures to protect your information against unauthorised access, loss, or misuse. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "7. Data Retention",
    paragraphs: [
      "We retain personal information only for as long as necessary to fulfil the purposes described in this policy, including any legal, accounting, or reporting requirements.",
    ],
  },
  {
    heading: "8. Your Rights",
    paragraphs: [
      "Subject to applicable law, you may request access to, correction of, or deletion of your personal information, and you may opt out of marketing communications at any time. To exercise these rights, contact us using the details below.",
    ],
  },
  {
    heading: "9. Third-Party Links",
    paragraphs: [
      "Our website may contain links to third-party websites or services, such as Google Maps or WhatsApp. We are not responsible for the privacy practices of those third parties and encourage you to review their policies.",
    ],
  },
  {
    heading: "10. Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised “last updated” date.",
    ],
  },
  {
    heading: "11. Contact Us",
    paragraphs: [
      "If you have any questions about this Privacy Policy or how we handle your data, please contact us via the phone number or email listed on our Contact page.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        crumb="Privacy Policy"
        description="How we collect, use, and protect your personal information."
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
