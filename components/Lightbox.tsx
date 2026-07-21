"use client";

import { useEffect } from "react";

export interface LightboxItem {
  id: string | number;
  title: string;
  category: string;
  icon: string;
  gradient: string;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const item = items[index];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [index, items.length, onClose, onNavigate]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-2xl text-white/90 transition hover:border-brand hover:text-brand"
      >
        <i className="bi bi-x" />
      </button>

      <button
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index - 1 + items.length) % items.length);
        }}
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white/90 transition hover:border-brand hover:text-brand sm:left-6"
      >
        <i className="fa-solid fa-chevron-left" />
      </button>
      <button
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index + 1) % items.length);
        }}
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white/90 transition hover:border-brand hover:text-brand sm:right-6"
      >
        <i className="fa-solid fa-chevron-right" />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex aspect-[4/3] w-full max-w-2xl flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-br ${item.gradient} p-10 text-center shadow-2xl`}
      >
        <i className={`fa-solid ${item.icon} text-7xl text-white/90`} />
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            {item.category}
          </span>
          <h3 className="mt-1 text-2xl font-bold text-white">{item.title}</h3>
        </div>
      </div>
    </div>
  );
}
