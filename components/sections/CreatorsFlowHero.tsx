import Link from "next/link";
import { ElegantShape } from "@/components/ElegantShape";

export function CreatorsFlowHero() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.06] via-transparent to-blue-500/[0.06] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-violet-500/[0.18]"
          className="left-[-10%] top-[15%] md:left-[-5%] md:top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-fuchsia-500/[0.18]"
          className="right-[-5%] top-[70%] md:right-[0%] md:top-[75%]"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-blue-500/[0.18]"
          className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]"
        />
        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-indigo-500/[0.18]"
          className="right-[15%] top-[10%] md:right-[20%] md:top-[15%]"
        />
        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.18]"
          className="left-[20%] top-[5%] md:left-[25%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/creators_flow.png"
          alt="Creators Flow logo"
          className="cf-fade mx-auto mb-6 h-24 w-24 rounded-3xl object-cover shadow-lg sm:h-32 sm:w-32"
          style={{ animationDelay: "0.3s" }}
        />
        <div
          className="cf-fade mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-1.5 md:mb-12"
          style={{ animationDelay: "0.5s" }}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-fuchsia-400 to-blue-400" />
          <span className="text-sm tracking-wide text-white/60">
            A product by Zynthovo Digital
          </span>
        </div>

        <h1
          className="cf-fade mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:mb-8 md:text-8xl"
          style={{ animationDelay: "0.7s" }}
        >
          <span className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
            Creators Flow
          </span>
          <br />
          <span className="bg-gradient-to-r from-violet-300 via-white/90 to-blue-300 bg-clip-text text-transparent">
            Influencer Marketing. Amplified.
          </span>
        </h1>

        <p
          className="cf-fade mx-auto mb-10 max-w-xl px-4 text-base font-light leading-relaxed tracking-wide text-white/50 sm:text-lg md:text-xl"
          style={{ animationDelay: "0.9s" }}
        >
          Our platform connects brands with the right creators and runs
          data-driven influencer campaigns from start to finish.
        </p>

        <div
          className="cf-fade flex flex-wrap justify-center gap-4"
          style={{ animationDelay: "1.1s" }}
        >
          <Link
            href="/contact"
            className="rounded-lg bg-gradient-to-r from-[#7b2ff7] to-[#2f6bff] px-8 py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
          >
            Launch a Campaign
          </Link>
          <a
            href="#how-it-works"
            className="rounded-lg border border-white/20 px-8 py-3.5 font-semibold text-white transition hover:bg-white/10"
          >
            How It Works
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80" />
    </section>
  );
}
