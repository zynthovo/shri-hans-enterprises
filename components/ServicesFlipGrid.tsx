"use client";

import { FlippingCard } from "@/components/FlippingCard";
import { type CardStackItem } from "@/components/CardStack";

export function ServicesFlipGrid({ items }: { items: CardStackItem[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {items.map((item) => (
        <FlippingCard
          key={item.id}
          width={320}
          height={380}
          frontContent={
            <div className="relative h-full w-full overflow-hidden rounded-[inherit]">
              {/* icon tile always behind — shows if the image is missing/fails */}
              <div className="absolute inset-0 flex items-center justify-center bg-card">
                <i className={`fa-solid ${item.icon} text-6xl text-brand`} />
              </div>
              {item.imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : null}
              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 pt-12">
                {item.tag ? (
                  <span className="mb-2 inline-block rounded-full bg-brand/90 px-3 py-1 text-xs font-semibold text-white">
                    {item.tag}
                  </span>
                ) : null}
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              </div>
            </div>
          }
          backContent={
            <div className="flex h-full w-full flex-col items-center justify-center rounded-[inherit] bg-neutral-950 p-7 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/15">
                <i className={`fa-solid ${item.icon} text-2xl text-brand`} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">
                {item.description}
              </p>
            </div>
          }
        />
      ))}
    </div>
  );
}
