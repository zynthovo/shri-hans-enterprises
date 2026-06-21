import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { CreatorsFlow } from "@/components/sections/CreatorsFlow";
import { CallToAction } from "@/components/sections/CallToAction";
import { Features } from "@/components/sections/Features";
import { Technologies } from "@/components/sections/Technologies";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      {/* <FeaturedServices /> */}
      <About />
      <Services />
      <CreatorsFlow />
      <CallToAction />
      <Features />
      <Technologies />
      <Pricing />
      <Testimonials />
      <Faq />
    </>
  );
}
