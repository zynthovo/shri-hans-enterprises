"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useInView } from "@/components/useInView";
import type { Dictionary } from "@/lib/i18n/getDictionary";

export function Stats({ dict }: { dict: Dictionary["stats"] }) {
  const stats = dict.items;
  const { ref, inView } = useInView<HTMLDivElement>({ once: true });
  const scope = useRef<HTMLDivElement>(null);

  // Count-up animation once the section enters the viewport.
  useGSAP(
    () => {
      if (!inView) return;
      const counters = gsap.utils.toArray<HTMLElement>("[data-counter]");
      counters.forEach((el) => {
        const end = Number(el.dataset.counter);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration: 2,
          ease: "power1.out",
          onUpdate: () => {
            el.textContent = Math.floor(obj.val).toLocaleString();
          },
        });
      });
    },
    { dependencies: [inView], scope }
  );

  return (
    <section className="bg-surface py-16">
      <div ref={scope} className="site-container px-4 sm:px-0">
        <div ref={ref} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <span
                data-counter={s.end}
                className="block text-5xl font-bold text-heading"
              >
                0
              </span>
              <p className="mt-2 text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
