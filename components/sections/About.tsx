"use client";

import { Suspense, lazy } from "react";
import { Reveal } from "@/components/Reveal";
import { useInView } from "@/components/useInView";
import { useIsMobile } from "@/components/useIsMobile";

const Spline = lazy(() => import("@splinetool/react-spline"));

const ROBOT_SCENE =
  "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const points = [
  {
    title: "Full-Stack Development & AI",
    desc: "Websites, custom software, CRM & ERP, mobile apps, IoT, and AI-powered solutions — including our AI School Management Software.",
  },
  {
    title: "Marketing, Creative & Creators Flow",
    desc: "Digital marketing, graphic design, video editing, and influencer marketing powered by our own platform, Creators Flow.",
  },
  {
    title: "Complete Tax & Compliance (CA Services)",
    desc: "Company formation, GST registration & returns, income tax filing, accounting and end-to-end financial compliance.",
  },
];

export function About() {
  const isMobile = useIsMobile();
  const { ref: robotRef, inView: robotInView } = useInView<HTMLDivElement>({
    once: true,
  });

  return (
    <section id="about" className="bg-background py-20">
      <div className="site-container">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Robot */}
          <Reveal animation="fade-left" className="order-first lg:order-last">
            <div
              ref={robotRef}
              className="relative mx-auto aspect-square w-full max-w-[560px] overflow-hidden rounded-full bg-ink"
            >
              {robotInView && !isMobile ? (
                <Suspense
                  fallback={
                    <div className="flex h-full w-full items-center justify-center text-muted">
                      Loading 3D robot…
                    </div>
                  }
                >
                  <Spline
                    scene={ROBOT_SCENE}
                    style={{
                      width: "130%",
                      height: "130%",
                      transform: "translate(-12%, -8%)",
                    }}
                  />
                </Suspense>
              ) : (
                // Lightweight static fallback (used on phones — the Spline 3D
                // scene is far too heavy for mobile).
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand/25 via-ink to-accent/20 text-white/80">
                  <i className="bi bi-robot text-7xl drop-shadow-[0_0_30px_rgba(0,93,237,0.6)]" />
                </div>
              )}
            </div>
          </Reveal>

          {/* Content */}
          <Reveal animation="fade-right" className="order-last lg:order-first">
            <h3 className="mb-5 text-4xl font-bold text-heading">
              Your Complete Digital Transformation Partner
            </h3>
            <p className="mb-8 text-lg leading-relaxed text-muted">
              Zynthovo Digital Private Limited is a Lucknow-based company
              delivering end-to-end technology, marketing, and financial
              compliance under one roof. From building your software and app to
              growing your brand and filing your taxes — we handle it all so you
              can focus on running your business.
            </p>
            <ul className="space-y-5">
              {points.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <i className="bi bi-check-circle-fill mt-1 text-2xl text-brand" />
                  <div>
                    <h5 className="mb-1 font-semibold text-heading">{p.title}</h5>
                    <p className="text-muted">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
