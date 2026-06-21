import Link from "next/link";
import { FooterGlassCard } from "@/components/FooterGlassCard";
import { getSettings } from "@/lib/settings";

const SOCIAL_ICONS: { key: keyof Awaited<ReturnType<typeof getSettings>>["socials"]; icon: string; label: string }[] = [
  { key: "facebook", icon: "fa-facebook-f", label: "Facebook" },
  { key: "instagram", icon: "fa-instagram", label: "Instagram" },
  { key: "twitter", icon: "fa-x-twitter", label: "Twitter / X" },
  { key: "linkedin", icon: "fa-linkedin-in", label: "LinkedIn" },
  { key: "youtube", icon: "fa-youtube", label: "YouTube" },
  { key: "github", icon: "fa-github", label: "GitHub" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Get a Quote", href: "/get-a-quote" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "Web & Software Development",
  "Mobile App Development",
  "AI Automation & IoT",
  "Digital & Influencer Marketing",
  "Graphic Design & Video Editing",
  "GST, Tax & Company Formation",
];

export async function Footer() {
  const { contact, socials } = await getSettings();
  const activeSocials = SOCIAL_ICONS.filter((s) => socials[s.key]);

  return (
    <footer className="bg-[#06080f] text-white/70">
      <div className="site-container px-4 py-16 sm:px-0">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col items-center lg:col-span-4 lg:items-start">
            <FooterGlassCard />
            <p className="mt-6 text-center font-semibold text-white lg:text-left">
              ZYNTHOVO DIGITAL PRIVATE LIMITED
            </p>
            <p className="mt-2 text-center text-sm lg:text-left">
              Your complete partner for technology, marketing, and financial
              compliance — building, marketing, and managing businesses end to
              end.
            </p>

            {activeSocials.length > 0 && (
              <div className="mt-5 flex gap-3">
                {activeSocials.map((s) => (
                  <a
                    key={s.key}
                    href={socials[s.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <i className={`fa-brands ${s.icon}`} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-4 font-semibold text-white">Our Services</h4>
            <ul className="space-y-2 text-sm">
              {services.map((l) => (
                <li key={l}>
                  <Link href="/services" className="transition hover:text-white">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-4 font-semibold text-white">Contact Us</h4>
            {contact.address.split("\n").map((line) => (
              <p key={line} className="text-sm">
                {line}
              </p>
            ))}
            {contact.phone && (
              <p className="mt-4 text-sm">
                <strong className="text-white">Phone:</strong> {contact.phone}
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
          </div>
        </div>
       
      </div>

      <div className="border-t border-white/10 py-6 text-sm">
        <div className="site-container flex flex-col items-center justify-between gap-3 px-4 text-center sm:flex-row sm:px-0 sm:text-left">
          <p>
            © <span>Copyright</span> {new Date().getFullYear()}{" "}
            <strong className="px-1 text-white">
              Zynthovo Digital Private Limited
            </strong>
            . All Rights Reserved.
          </p>
          <nav className="flex items-center gap-5">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms &amp; Conditions
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
