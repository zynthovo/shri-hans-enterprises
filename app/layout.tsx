import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getSettings } from "@/lib/settings";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/getDictionary";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shrihansenterprises.com"),
  title: {
    default:
      "Shri Hans Enterprises - Precision Steel Fabrication & Laser Cutting",
    template: "%s | Shri Hans Enterprises",
  },
  description:
    "Shri Hans Enterprises — MS & SS fabrication, CNC laser cutting, powder coating, welding, railings, gates, and steel structures for residential, commercial, and industrial projects.",
  keywords:
    "steel fabrication, laser cutting, CNC laser cutting, MS fabrication, SS fabrication, powder coating, welding, MS railings, SS railings, stair railings, balcony railings, main gates, industrial gates, steel structures, custom metal design",
  authors: [{ name: "Shri Hans Enterprises" }],
  openGraph: {
    title: "Shri Hans Enterprises - Precision in Every Cut",
    description:
      "Precision steel fabrication and laser cutting — railings, gates, structures, and custom metal work built to last.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { contact } = await getSettings();
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${poppins.variable} ${roboto.variable}`}
    >
      <head>
        <script
          // Apply the saved theme before paint to avoid a flash of the wrong theme.
          // Dark (industrial black/charcoal/gold) is the default look — only an
          // explicit "light" choice in localStorage opts back into the light theme.
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t!=='light'){document.documentElement.classList.add('dark');}}catch(e){document.documentElement.classList.add('dark');}})();",
          }}
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        <Header dict={dict} locale={locale} />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton
          phone={contact.whatsapp}
          message={dict.whatsapp.floatingMessage}
          label={dict.contactPage.whatsappCta}
        />
        <ScrollToTop />
      </body>
    </html>
  );
}
