import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getSettings } from "@/lib/settings";

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
  metadataBase: new URL("https://zynthovo.com"),
  title: {
    default:
      "Zynthovo Digital Private Limited - IT, Marketing, AI & Tax Services in Lucknow",
    template: "%s | Zynthovo Digital",
  },
  description:
    "Zynthovo Digital Private Limited, Lucknow — website & software development, CRM/ERP, mobile apps, AI automation, IoT, digital & influencer marketing (Creators Flow), graphic design, video editing, company formation, GST returns & income tax filing.",
  keywords:
    "Zynthovo Digital, IT solutions Lucknow, web development, software development, CRM, ERP, mobile app development, AI automation, IoT solutions, digital marketing, influencer marketing, Creators Flow, graphic design, video editing, AI school management software, company formation, GST returns, income tax filing, CA services Lucknow",
  authors: [{ name: "Zynthovo Digital Private Limited" }],
  openGraph: {
    title:
      "Zynthovo Digital Private Limited - Technology, Marketing & Compliance",
    description:
      "One partner for software, marketing, and financial compliance. Based in Lucknow, India.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { contact } = await getSettings();
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${poppins.variable} ${roboto.variable}`}
    >
      <head>
        <script
          // Apply the saved theme before paint to avoid a flash of the wrong theme.
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();",
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
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton phone={contact.whatsapp} />
        <ScrollToTop />
      </body>
    </html>
  );
}
