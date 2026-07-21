"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { Lightbox, type LightboxItem } from "@/components/Lightbox";
import type { Dictionary } from "@/lib/i18n/getDictionary";

// No project photography yet — each tile is a styled icon panel. Swap in real
// project photos later by rendering an <img> inside the tile in place of the
// icon, keeping the same id/category/title fields.
const GRADIENTS = [
  "from-[#3a2f10] to-[#0a0908]",
  "from-[#2b2b2b] to-[#0a0908]",
  "from-[#4a3c14] to-[#1a1610]",
  "from-[#3f3f3f] to-[#141414]",
];

export function Gallery({ dict }: { dict: Dictionary["gallery"] }) {
  const items: LightboxItem[] = useMemo(
    () =>
      dict.items.map((item, i) => ({
        id: item.id,
        category: dict.categories[item.categoryKey],
        title: item.title,
        icon: item.icon,
        gradient: GRADIENTS[i % GRADIENTS.length],
      })),
    [dict]
  );

  const categories = useMemo(
    () => [dict.all, ...Array.from(new Set(items.map((i) => i.category)))],
    [dict.all, items]
  );

  const [active, setActive] = useState(dict.all);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (active === dict.all ? items : items.filter((i) => i.category === active)),
    [active, items, dict.all]
  );

  return (
    <section id="gallery" className="bg-surface-alt py-20">
      <div className="site-container px-4 sm:px-0">
        <SectionTitle
          eyebrow={dict.eyebrow}
          title={dict.title}
          description={dict.description}
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active === c
                  ? "bg-brand text-black shadow-lg"
                  : "border border-line text-muted hover:border-brand hover:text-heading"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <Reveal
          stagger={0.06}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {filtered.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className={`group relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-br p-4 text-center shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(212,175,55,0.2)] ${item.gradient}`}
            >
              <i className={`fa-solid ${item.icon} text-4xl text-white/80 transition group-hover:scale-110 group-hover:text-brand`} />
              <span className="text-sm font-semibold text-white/90">{item.title}</span>
              <span className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                <i className="fa-solid fa-expand text-2xl text-white" />
              </span>
            </button>
          ))}
        </Reveal>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
