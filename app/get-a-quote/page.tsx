import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = { title: "Get a Quote - Zynthovo Digital" };

export default function GetAQuotePage() {
  return (
    <>
      <PageHeader title="Get a Quote" crumb="Get A Quote" />

      <section className="py-20">
        <div className="site-container px-4 sm:px-0">
          <Reveal animation="fade-up" className="overflow-hidden rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            <div className="grid lg:grid-cols-12">
              <div
                className="hidden min-h-[300px] lg:col-span-5 lg:block"
                style={{
                  backgroundImage: "url(/assets/img/quote-bg.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="lg:col-span-7">
                <ContactForm
                  heading="Get a quote"
                  intro="Tell us what you need — software, a website, marketing, GST/tax help, or all of it — and we'll get back with a tailored proposal."
                  fields={[
                    { name: "name", placeholder: "Your Name" },
                    { name: "email", type: "email", placeholder: "Your Email" },
                    { name: "phone", placeholder: "Phone Number" },
                    { name: "company", placeholder: "Company / Business Name" },
                    { name: "service", placeholder: "Service you're interested in", full: true },
                    { name: "budget", placeholder: "Approximate Budget (optional)", full: true, optional: true },
                    { name: "message", placeholder: "Tell us about your project", textarea: true },
                  ]}
                  button="Get a quote"
                  subject="New quote request from the Zynthovo website"
                  successMessage="Your quote request has been sent successfully. We'll be in touch shortly. Thank you!"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
