import { Reveal } from "@/components/Reveal";
import { ElegantShape } from "@/components/ElegantShape";

const features = [
  "Discover & match the right creators for your brand",
  "Run and track campaigns end to end in one place",
  "Real performance analytics — reach, engagement, ROI",
];

export function CreatorsFlow() {
  return (
    <section className="bg-background py-20">
      <div className="site-container px-4 sm:px-0">
        <Reveal animation="zoom-in">
          <div className="relative overflow-hidden rounded-[28px] bg-[#030303] p-8 text-white sm:p-12">
            {/* Animated floating shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <ElegantShape
                delay={0.3}
                width={420}
                height={110}
                rotate={12}
                gradient="from-violet-500/[0.2]"
                className="left-[-8%] top-[-10%]"
              />
              <ElegantShape
                delay={0.5}
                width={360}
                height={90}
                rotate={-15}
                gradient="from-fuchsia-500/[0.2]"
                className="right-[-6%] bottom-[-15%]"
              />
              <ElegantShape
                delay={0.4}
                width={220}
                height={64}
                rotate={-8}
                gradient="from-blue-500/[0.2]"
                className="left-[35%] bottom-[-20%]"
              />
              <ElegantShape
                delay={0.6}
                width={160}
                height={48}
                rotate={20}
                gradient="from-cyan-500/[0.2]"
                className="right-[30%] top-[-12%]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-blue-600/20" />

            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
                  Our Product
                </span>
                <h2 className="mt-5 text-4xl font-bold">Creators Flow</h2>
                <p className="mt-1 text-lg font-medium text-white/80">
                  Influencer Marketing. Amplified.
                </p>
                <p className="mt-5 text-white/80">
                  Creators Flow is our in-house influencer marketing platform
                  that connects brands with the right creators and runs
                  data-driven campaigns from start to finish.
                </p>
                <ul className="mt-6 space-y-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <i className="bi bi-check-circle-fill mt-0.5 text-xl text-white" />
                      <span className="text-white/90">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/creators-flow"
                  className="mt-8 inline-block rounded-lg bg-white px-8 py-3.5 font-semibold text-[#7b2ff7] shadow-lg transition hover:-translate-y-0.5"
                >
                  Explore Creators Flow
                </a>
              </div>

              <div className="flex justify-center">
                <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-[32px] bg-white/10 p-4 backdrop-blur sm:h-60 sm:w-60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/creators_flow.png"
                    alt="Creators Flow logo"
                    className="h-full w-full rounded-[24px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
