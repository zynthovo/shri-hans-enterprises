import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { getSettings } from "@/lib/settings";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/getDictionary";

export const metadata: Metadata = { title: "Contact - Shri Hans Enterprises" };
export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const { contact } = await getSettings();
  const dict = await getDictionary(await getLocale());
  const { contactPage } = dict;

  const info = [
    {
      icon: "bi-geo-alt",
      title: contactPage.addressLabel,
      text: contact.address.replace(/\n/g, " "),
    },
    { icon: "bi-telephone", title: contactPage.callLabel, text: `+91 ${contact.phone}` },
    {
      icon: "bi-envelope",
      title: contactPage.emailLabel,
      text: contact.emails.join(" · "),
    },
  ];

  return (
    <>
      <PageHeader
        title={contactPage.title}
        crumb={contactPage.title}
        homeLabel={dict.pageHeader.breadcrumbHome}
      />

      <section className="py-20">
        <div className="site-container px-4 sm:px-0">
          <Reveal animation="fade-up" className="mb-8 overflow-hidden rounded-2xl">
            <iframe
              title="Map"
              className="h-[300px] w-full border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228077!2d77.31!3d28.41!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2sFaridabad!5e0!3m2!1sen!2sin!4v1700000000000"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-12">
            <Reveal stagger={0.12} className="space-y-4 lg:col-span-4">
              {info.map((i) => (
                <div
                  key={i.title}
                  className="flex gap-4 rounded-2xl bg-surface p-6 shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
                >
                  <i className={`bi ${i.icon} text-2xl text-brand`} />
                  <div>
                    <h3 className="font-semibold text-heading">{i.title}</h3>
                    <p className="text-sm text-muted">{i.text}</p>
                  </div>
                </div>
              ))}

              <a
                href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
                  contactPage.whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] p-5 font-semibold text-white shadow-[0_10px_30px_rgba(37,211,102,0.3)] transition hover:bg-[#1fb855]"
              >
                <i className="fa-brands fa-whatsapp text-2xl" />
                {contactPage.whatsappCta}
              </a>
            </Reveal>

            <Reveal animation="fade-up" className="lg:col-span-8">
              <ContactForm
                fields={[
                  { name: "name", placeholder: contactPage.form.namePlaceholder },
                  { name: "phone", placeholder: contactPage.form.phonePlaceholder },
                  { name: "email", type: "email", placeholder: contactPage.form.emailPlaceholder, full: true },
                  { name: "message", placeholder: contactPage.form.messagePlaceholder, textarea: true },
                ]}
                button={contactPage.form.button}
                subject="New contact message from the Shri Hans website"
                successMessage={contactPage.form.successMessage}
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
