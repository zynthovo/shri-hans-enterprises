import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Gallery } from "@/components/sections/Gallery";
import { Process } from "@/components/sections/Process";
import { CallToAction } from "@/components/sections/CallToAction";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { getSettings } from "@/lib/settings";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/getDictionary";

export default async function Home() {
  const { contact } = await getSettings();
  const dict = await getDictionary(await getLocale());

  return (
    <>
      <Hero phone={contact.phone} dict={dict.hero} />
      <About />
      <Services />
      <WhyChooseUs />
      <Gallery dict={dict.gallery} />
      <Process />
      <CallToAction />
      <Testimonials dict={dict.testimonials} />
      <Faq dict={dict.faq} />
    </>
  );
}
