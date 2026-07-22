"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { GooeyText } from "@/components/GooeyText";
import type { Dictionary } from "@/lib/i18n/getDictionary";

const randomColors = (count: number) =>
  new Array(count)
    .fill(0)
    .map(
      () =>
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
    );

// Runtime ESM import that bypasses the bundler so the CDN module loads as-is
// (this is how the original site loaded the Tubes Cursor effect).
const runtimeImport = (url: string): Promise<{ default: unknown }> =>
  (new Function("u", "return import(u)") as (u: string) => Promise<{ default: unknown }>)(url);

const TUBES_CDN =
  "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";

export function Hero({
  phone = "9876543210",
  dict,
}: {
  phone?: string;
  dict: Dictionary["hero"];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  // threejs-components has no types; keep the app instance loosely typed.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appRef = useRef<any>(null);

  // GSAP entrance animation for the hero text (runs on mount)
  useGSAP(
    () => {
      gsap.from("[data-hero-anim]", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.2,
      });
    },
    { scope: sectionRef }
  );

  // Tubes Cursor (Three.js) background, recolored to gold/ember "spark" tones —
  // only alive while the hero is on screen, so it never competes with sections
  // further down the page.
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    // Skip the heavy WebGL tubes on phones / reduced-motion (the dark bg-ink
    // background + white text already look clean without it).
    if (prefersReduced || isMobile) return;

    let cancelled = false;

    const create = async () => {
      if (appRef.current || cancelled) return;
      try {
        const mod = await runtimeImport(TUBES_CDN);
        if (cancelled) return;
        const TubesCursor = mod.default as (
          c: HTMLCanvasElement,
          opts: unknown
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ) => any;
        const app = TubesCursor(canvas, {
          tubes: {
            colors: ["#d4af37", "#8a8a8a", "#ff6a00"],
            lights: {
              intensity: 200,
              colors: ["#ffd700", "#c0c0c0", "#ff8c00", "#ffffff"],
            },
          },
        });
        // Cap the render resolution for smoother performance on retina screens.
        try {
          app?.renderer?.setPixelRatio?.(Math.min(window.devicePixelRatio, 1.5));
        } catch {
          /* noop */
        }
        appRef.current = app;
      } catch (err) {
        console.error("Failed to load Tubes Cursor:", err);
      }
    };

    // Create once, the first time the hero scrolls into view. This WebGL
    // library doesn't tear down and rebuild its GL context cleanly, so
    // destroying/recreating it on every scroll in-and-out (the previous
    // approach) left the canvas blank after scrolling away and back.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          create();
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(section);

    return () => {
      cancelled = true;
      observer.disconnect();
      try {
        appRef.current?.dispose?.();
      } catch {
        /* noop */
      }
      appRef.current = null;
    };
  }, []);

  const handleColorShift = () => {
    const app = appRef.current;
    if (app?.tubes) {
      app.tubes.setColors(randomColors(3));
      app.tubes.setLightsColors(randomColors(4));
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      onClick={handleColorShift}
      className="relative min-h-screen cursor-pointer overflow-hidden bg-ink"
    >
      {/* Animated WebGL tubes backdrop (shown in both themes — the hero is a
          dark spotlight section so the animation stays vivid and the text
          readable in light and dark mode alike). */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] h-full w-full"
      />

      <div className="site-container relative z-10 flex min-h-screen items-start pt-36 sm:items-center sm:pt-0 px-4 sm:px-0">
        <div className="max-w-3xl">
          <h1
            data-hero-anim
            className="mb-5 text-4xl font-bold leading-tight text-white drop-shadow-[0_0_40px_rgba(0,0,0,1)] sm:text-5xl lg:text-[3.5rem]"
          >
            {dict.headline}
          </h1>
          <p
            data-hero-anim
            className="mb-6 text-lg text-white drop-shadow-[0_0_30px_rgba(0,0,0,1)] sm:text-xl"
          >
            {dict.subheading}
          </p>

          <div data-hero-anim className="mb-8">
            <p className="mb-1 text-sm font-semibold uppercase tracking-[0.2em] text-[#e0b84c]">
              {dict.eyebrow}
            </p>
            <GooeyText
              texts={dict.morphWords}
              morphTime={1}
              cooldownTime={1.2}
              align="left"
              className="h-[64px] md:h-[88px]"
              textClassName="font-bold text-white drop-shadow-[0_0_30px_rgba(0,0,0,1)]"
            />
          </div>

          <div data-hero-anim className="mb-8 flex flex-wrap gap-3">
            <Link
              href="/get-a-quote"
              onClick={(e) => e.stopPropagation()}
              className="rounded-lg bg-brand px-8 py-3.5 font-semibold text-black shadow-[0_4px_15px_rgba(212,175,55,0.4)] transition hover:bg-brand-dark"
            >
              {dict.ctaQuote}
            </Link>
            <a
              href={`tel:+91${phone}`}
              onClick={(e) => e.stopPropagation()}
              className="rounded-lg border-2 border-white px-8 py-3.5 font-semibold text-white transition hover:bg-white hover:text-black"
            >
              {dict.ctaCall}
            </a>
          </div>

          <div data-hero-anim className="grid max-w-2xl gap-3 sm:grid-cols-3">
            {dict.stats.map((s) => (
              <div key={s} className="flex items-center gap-2.5">
                <i className="bi bi-check-circle-fill text-2xl text-[#d4af37] drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                <span className="font-medium text-white drop-shadow-[0_0_20px_rgba(0,0,0,1)]">
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
