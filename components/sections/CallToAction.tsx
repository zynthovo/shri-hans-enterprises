import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { CursorDrivenParticleTypography } from "@/components/CursorDrivenParticleTypography";

export function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy to-brand-dark py-20">
      <div className="site-container relative z-10">
        <CursorDrivenParticleTypography
          text="ZYNTHOVO"
          color="#ffffff"
          className="mb-6 min-h-[110px] sm:min-h-[150px]"
        />

        <Reveal animation="zoom-in" className="mx-auto max-w-3xl text-center">
          <h3 className="mb-5 text-4xl font-bold text-white">
            Ready to Transform Your Business?
          </h3>
          <p className="mb-8 text-lg leading-relaxed text-white/90">
            Let&apos;s discuss how our IT solutions, marketing expertise, and
            compliance services can help you achieve your business goals. Get a
            free consultation today!
          </p>
          <Link
            href="/get-a-quote"
            className="inline-block rounded-lg bg-white px-10 py-4 text-lg font-semibold text-brand shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition hover:-translate-y-1"
          >
            Get Free Quote
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
