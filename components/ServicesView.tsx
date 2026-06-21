"use client";

import { useEffect, useRef, useState } from "react";
import { CardStack, type CardStackItem } from "@/components/CardStack";
import { ServicesCircularGallery } from "@/components/ServicesCircularGallery";
import { ServicesFlipGrid } from "@/components/ServicesFlipGrid";
import { ServicesStackedCards } from "@/components/ServicesStackedCards";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type View = "glass" | "stack" | "circle" | "grid";

const options: { id: View; label: string; icon: string }[] = [
  { id: "glass", label: "Glass", icon: "fa-clone" },
  { id: "stack", label: "Stack", icon: "fa-layer-group" },
  { id: "circle", label: "Circle", icon: "fa-asterisk" },
  { id: "grid", label: "Cards", icon: "fa-table-cells-large" },
];

function Toggle({
  view,
  setView,
}: {
  view: View;
  setView: (v: View) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Services view"
      className="inline-flex rounded-full glass-surface rounded-full p-1 backdrop-blur"
    >
      {options.map((opt) => {
        const active = view === opt.id;
        return (
          <button
            key={opt.id}
            role="tab"
            aria-selected={active}
            onClick={() => setView(opt.id)}
            className={cn(
              "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all",
              active
                ? "bg-brand text-white shadow-lg"
                : "text-muted hover:text-heading"
            )}
          >
            <i className={`fa-solid ${opt.icon} text-xs`} />
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function Heading({ compact }: { compact?: boolean }) {
  return (
    <div className="text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7aa2ff] sm:text-sm">
        Complete Solutions
      </span>
      <h2
        className={cn(
          "mt-2 font-bold text-heading",
          compact ? "text-2xl sm:text-3xl" : "text-4xl sm:text-5xl"
        )}
      >
        Our Services
      </h2>
      {!compact ? (
        <p className="mx-auto mt-4 max-w-2xl text-white/60">
          Explore everything your business needs — under one roof. Switch the
          view to browse your way.
        </p>
      ) : null}
    </div>
  );
}

export function ServicesView({ items }: { items: CardStackItem[] }) {
  const [view, setView] = useState<View>("glass");
  const [navH, setNavH] = useState(88);
  const [headerH, setHeaderH] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  // Measure the fixed site header + our sticky sub-header so the glass cards
  // can pin exactly below them (keeps "Our Services" visible while scrolling).
  useEffect(() => {
    const measure = () => {
      const nav = document.querySelector("header");
      setNavH(nav ? nav.offsetHeight : 88);
      if (headerRef.current) setHeaderH(headerRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 300);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [view]);

  if (view === "glass") {
    return (
      <div className="relative">
        {/* Sticky sub-header: stays pinned for the whole stack, releases only
            after the last card has scrolled through. */}
        <div
          ref={headerRef}
          style={{ top: navH }}
          className="sticky z-30 -mx-4 bg-background/90 px-4 pb-6 pt-6 backdrop-blur sm:mx-0 sm:px-0"
        >
          <Heading compact />
          <div className="mt-5 flex justify-center">
            <Toggle view={view} setView={setView} />
          </div>
        </div>

        <ServicesStackedCards items={items} stickyTop={navH + headerH + 12} />
      </div>
    );
  }

  return (
    <div>
      <Heading />
      <div className="mb-10 mt-8 flex justify-center">
        <Toggle view={view} setView={setView} />
      </div>

      <div className="overflow-hidden">
        {view === "stack" ? (
          <CardStack items={items} initialIndex={0} maxVisible={5} loop />
        ) : view === "circle" ? (
          <ServicesCircularGallery showHeading={false} />
        ) : (
          <ServicesFlipGrid items={items} />
        )}
      </div>
    </div>
  );
}
