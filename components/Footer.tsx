import Link from "next/link";
import { FooterGlassCard } from "@/components/FooterGlassCard";
import { getSettings } from "@/lib/settings";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/getDictionary";

const SOCIAL_ICONS: { key: keyof Awaited<ReturnType<typeof getSettings>>["socials"]; icon: string; label: string }[] = [
  { key: "facebook", icon: "fa-facebook-f", label: "Facebook" },
  { key: "instagram", icon: "fa-instagram", label: "Instagram" },
  { key: "youtube", icon: "fa-youtube", label: "YouTube" },
];

export async function Footer() {
  const { contact, socials } = await getSettings();
  const dict = await getDictionary(await getLocale());
  const activeSocials = SOCIAL_ICONS.filter((s) => socials[s.key]);

  return (
    <footer className="bg-[#06050a] text-white/70">
      <div className="site-container px-4 py-16 sm:px-0">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col items-center lg:col-span-4 lg:items-start">
            <FooterGlassCard socials={socials} dict={dict.footerGlassCard} />
            <p className="mt-6 text-center font-semibold text-white lg:text-left">
              SHRI HANS ENTERPRISES
            </p>
            <p className="mt-2 text-center text-sm lg:text-left">
              {dict.footer.tagline}
            </p>

            {(activeSocials.length > 0 || contact.whatsapp) && (
              <div className="mt-5 flex gap-3">
                {activeSocials.map((s) => (
                  <a
                    key={s.key}
                    href={socials[s.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-brand hover:bg-brand hover:text-black"
                  >
                    <i className={`fa-brands ${s.icon}`} />
                  </a>
                ))}
                {contact.whatsapp && (
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
                  >
                    <i className="fa-brands fa-whatsapp" />
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 font-semibold text-white">{dict.footer.quickLinksTitle}</h4>
            <ul className="space-y-2 text-sm">
              {dict.footer.quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-4 font-semibold text-white">{dict.footer.servicesTitle}</h4>
            <ul className="space-y-2 text-sm">
              {dict.footer.services.map((l) => (
                <li key={l}>
                  <Link href="/services" className="transition hover:text-white">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-4 font-semibold text-white">{dict.footer.contactTitle}</h4>
            {contact.address.split("\n").map((line) => (
              <p key={line} className="text-sm">
                {line}
              </p>
            ))}
            {contact.phone && (
              <p className="mt-4 text-sm">
                <strong className="text-white">{dict.footer.phoneLabel}</strong> {contact.phone}
              </p>
            )}
            <div className="mt-2 space-y-1 text-sm">
              {contact.emails.map((e) => (
                <p key={e}>
                  <a href={`mailto:${e}`} className="transition hover:text-white">
                    {e}
                  </a>
                </p>
              ))}
            </div>

            <h4 className="mb-2 mt-6 font-semibold text-white">{dict.footer.workingHoursTitle}</h4>
            <p className="text-sm">{dict.footer.workingHoursWeekday}</p>
            <p className="text-sm">{dict.footer.workingHoursSunday}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-sm">
        <div className="site-container flex flex-col items-center justify-between gap-3 px-4 text-center sm:flex-row sm:px-0 sm:text-left">
          <p>
            © <span>{dict.footer.copyrightPrefix}</span> {new Date().getFullYear()}{" "}
            <strong className="px-1 text-white">
              Shri Hans Enterprises
            </strong>
            . {dict.footer.copyrightSuffix}
          </p>
          <nav className="flex items-center gap-5">
            <Link href="/privacy" className="transition hover:text-white">
              {dict.footer.privacy}
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              {dict.footer.terms}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
