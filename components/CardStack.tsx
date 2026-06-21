"use client";

import * as React from "react";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  icon?: string;
  tag?: string;
};

export type CardStackProps<T extends CardStackItem> = {
  items: T[];
  initialIndex?: number;
  /** How many cards are visible around the active (odd recommended) */
  maxVisible?: number;
  /** Base card sizing (scaled down to fit the container) */
  cardWidth?: number;
  cardHeight?: number;
  /** How much cards overlap each other (0..0.8) */
  overlap?: number;
  /** Total fan angle (deg) */
  spreadDeg?: number;
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;
  loop?: boolean;
  showDots?: boolean;
  className?: string;
  onChangeIndex?: (index: number, item: T) => void;
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

/** Minimal signed offset from active index to i, with wrapping (for loop). */
function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 5,
  cardWidth = 520,
  cardHeight = 320,
  overlap = 0.48,
  spreadDeg = 48,
  perspectivePx = 1100,
  depthPx = 140,
  tiltXDeg = 12,
  activeLiftPx = 22,
  activeScale = 1.03,
  inactiveScale = 0.94,
  loop = true,
  showDots = true,
  className,
  onChangeIndex,
  renderCard,
}: CardStackProps<T>) {
  const len = items.length;
  const stageRef = React.useRef<HTMLDivElement>(null);

  const [active, setActive] = React.useState(() => wrapIndex(initialIndex, len));
  const [reduceMotion, setReduceMotion] = React.useState(false);
  const [stageWidth, setStageWidth] = React.useState(0);

  // drag state
  const [dragX, setDragX] = React.useState(0);
  const dragging = React.useRef(false);
  const startX = React.useRef(0);

  React.useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setStageWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    setActive((a) => wrapIndex(a, len));
  }, [len]);

  React.useEffect(() => {
    if (len) onChangeIndex?.(active, items[active]!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

  // responsive scale so the active card always fits
  const ratio = cardHeight / cardWidth;
  const w =
    stageWidth > 0 ? Math.min(cardWidth, Math.round(stageWidth * 0.84)) : cardWidth;
  const h = Math.round(w * ratio);
  const cardSpacing = Math.max(10, Math.round(w * (1 - overlap)));

  const prev = React.useCallback(() => {
    if (!len) return;
    if (!loop && active <= 0) return;
    setActive((a) => wrapIndex(a - 1, len));
  }, [active, len, loop]);

  const next = React.useCallback(() => {
    if (!len) return;
    if (!loop && active >= len - 1) return;
    setActive((a) => wrapIndex(a + 1, len));
  }, [active, len, loop]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  // pointer drag on the active card
  const onPointerDown = (e: React.PointerEvent) => {
    if (reduceMotion) return;
    dragging.current = true;
    startX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setDragX(e.clientX - startX.current);
  };
  const endDrag = () => {
    if (!dragging.current) return;
    dragging.current = false;
    const travel = dragX;
    const threshold = Math.min(160, w * 0.22);
    if (travel > threshold) prev();
    else if (travel < -threshold) next();
    setDragX(0);
  };

  if (!len) return null;
  const activeItem = items[active]!;

  return (
    <div className={cn("w-full", className)}>
      {/* Stage */}
      <div
        ref={stageRef}
        className="relative w-full outline-none"
        style={{ height: Math.max(360, h + 80) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {/* spotlight washes */}
        <div
          className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-48 w-[70%] rounded-full bg-white/5 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-40 w-[76%] rounded-full bg-black/40 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{ perspective: `${perspectivePx}px` }}
        >
          {items.map((item, i) => {
            const off = signedOffset(i, active, len, loop);
            const abs = Math.abs(off);
            if (abs > maxOffset) return null;

            const isActive = off === 0;
            const rotateZ = off * stepDeg;
            const x = off * cardSpacing + (isActive ? dragX : 0);
            const y = abs * 10;
            const z = -abs * depthPx;
            const scale = isActive ? activeScale : inactiveScale;
            const lift = isActive ? -activeLiftPx : 0;
            const rotateX = isActive ? 0 : tiltXDeg;
            const transition =
              reduceMotion || (isActive && dragging.current)
                ? "none"
                : "transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.4s";

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={-1}
                aria-label={item.title}
                onClick={() => {
                  if (Math.abs(dragX) < 4) setActive(i);
                }}
                onPointerDown={isActive ? onPointerDown : undefined}
                onPointerMove={isActive ? onPointerMove : undefined}
                onPointerUp={isActive ? endDrag : undefined}
                onPointerCancel={isActive ? endDrag : undefined}
                className={cn(
                  "absolute bottom-0 overflow-hidden rounded-2xl border-4 border-white/10 shadow-xl will-change-transform select-none",
                  isActive
                    ? "cursor-grab active:cursor-grabbing"
                    : "cursor-pointer"
                )}
                style={{
                  width: w,
                  height: h,
                  zIndex: 100 - abs,
                  transformStyle: "preserve-3d",
                  transform: `translateX(${x}px) translateY(${y + lift}px) translateZ(${z}px) rotateZ(${rotateZ}deg) rotateX(${rotateX}deg) scale(${scale})`,
                  transition,
                }}
              >
                {renderCard ? (
                  renderCard(item, { active: isActive })
                ) : (
                  <DefaultFanCard item={item} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots navigation */}
      {showDots ? (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={prev}
            aria-label="Previous"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition hover:border-brand hover:text-heading"
          >
            <i className="fa-solid fa-chevron-left text-sm" />
          </button>
          <div className="flex items-center gap-2">
            {items.map((it, idx) => (
              <button
                key={it.id}
                onClick={() => setActive(idx)}
                aria-label={`Go to ${it.title}`}
                className={cn(
                  "h-2 rounded-full transition-all",
                  idx === active
                    ? "w-6 bg-brand"
                    : "w-2 bg-muted/40 hover:bg-muted/70"
                )}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition hover:border-brand hover:text-heading"
          >
            <i className="fa-solid fa-chevron-right text-sm" />
          </button>
        </div>
      ) : null}

      {/* Active title + link */}
      <div className="mt-5 flex items-center justify-center gap-2 text-center">
        <span className="text-lg font-semibold text-heading">
          {activeItem.title}
        </span>
        {activeItem.href ? (
          <a
            href={activeItem.href}
            className="text-muted transition hover:text-heading"
            aria-label={`Open ${activeItem.title}`}
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-sm" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

function DefaultFanCard({ item }: { item: CardStackItem }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        {item.imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageSrc}
            alt={item.title}
            className="h-full w-full object-cover"
            draggable={false}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-card">
            {item.icon ? (
              <i className={`fa-solid ${item.icon} text-5xl text-brand`} />
            ) : (
              <span className="text-sm text-white/40">No image</span>
            )}
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-end p-5">
        {item.tag ? (
          <span className="mb-2 w-fit rounded-full bg-brand/90 px-3 py-1 text-xs font-semibold text-white">
            {item.tag}
          </span>
        ) : null}
        <div className="truncate text-xl font-semibold text-white">
          {item.title}
        </div>
        {item.description ? (
          <div className="mt-1 line-clamp-2 text-sm text-white/80">
            {item.description}
          </div>
        ) : null}
      </div>
    </div>
  );
}
