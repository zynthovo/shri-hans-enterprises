import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/getDictionary";

export const metadata: Metadata = { title: "Get a Quote - Shri Hans Enterprises" };

export default async function GetAQuotePage() {
  const dict = await getDictionary(await getLocale());
  const { getQuotePage } = dict;

  return (
    <>
      <PageHeader
        title={getQuotePage.title}
        crumb={getQuotePage.title}
        homeLabel={dict.pageHeader.breadcrumbHome}
      />

      <section className="py-20">
        <div className="site-container px-4 sm:px-0">
          <Reveal animation="fade-up" className="overflow-hidden rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
            <div className="grid lg:grid-cols-12">
              <div className="relative hidden min-h-[300px] items-center justify-center overflow-hidden bg-gradient-to-br from-card via-ink to-card lg:col-span-5 lg:flex">
                <i className="fa-solid fa-bolt text-[8rem] text-brand drop-shadow-[0_0_40px_rgba(212,175,55,0.45)]" />
              </div>
              <div className="lg:col-span-7">
                <ContactForm
                  heading={getQuotePage.heading}
                  intro={getQuotePage.intro}
                  fields={[
                    { name: "name", placeholder: getQuotePage.form.namePlaceholder },
                    { name: "email", type: "email", placeholder: getQuotePage.form.emailPlaceholder },
                    { name: "phone", placeholder: getQuotePage.form.phonePlaceholder },
                    { name: "service", placeholder: getQuotePage.form.servicePlaceholder },
                    { name: "budget", placeholder: getQuotePage.form.budgetPlaceholder, full: true, optional: true },
                    { name: "message", placeholder: getQuotePage.form.messagePlaceholder, textarea: true },
                  ]}
                  button={getQuotePage.form.button}
                  subject="New quote request from the Shri Hans website"
                  successMessage={getQuotePage.form.successMessage}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
