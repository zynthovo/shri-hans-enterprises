"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";

const cn = (...classes: (string | false | undefined)[]) =>
  classes.filter(Boolean).join(" ");

// Local branded images: public/assets/services/<id>.jpg
const IMG = (name: string) => `/assets/services/${name}.jpg`;

interface Service {
  icon: string;
  title: string;
  description: string;
  image?: string;
}

const services: Service[] = [
  { icon: "fa-globe", image: IMG("websites"), title: "Custom Websites", description: "Responsive, SEO-optimized websites with modern design and CMS solutions." },
  { icon: "fa-code", image: IMG("software"), title: "Software, CRM & ERP", description: "Custom software, CRM and ERP systems to run your operations end to end." },
  { icon: "fa-mobile-screen-button", image: IMG("mobile"), title: "Mobile Apps", description: "Native Android and iOS apps with stunning UI/UX and seamless performance." },
  { icon: "fa-robot", image: IMG("ai"), title: "AI Automation", description: "Intelligent automation to streamline workflows, cut costs, and scale." },
  { icon: "fa-bullhorn", image: IMG("marketing"), title: "Digital Marketing", description: "SEO, social media, content strategy, and paid advertising — all in one." },
  { icon: "fa-microchip", image: IMG("iot"), title: "IoT Solutions", description: "Connected devices, real-time monitoring, and intelligent control systems." },
  { icon: "fa-bullseye", image: IMG("creators-flow"), title: "Creators Flow", description: "Run influencer campaigns at scale with our own platform. Marketing, amplified." },
  { icon: "fa-palette", image: IMG("graphic"), title: "Graphic Design", description: "Logos, branding, and marketing collateral that make your brand stand out." },
  { icon: "fa-clapperboard", image: IMG("video"), title: "Video Editing", description: "Professional editing for ads, reels, YouTube, and product demos." },
  { icon: "fa-building-columns", image: IMG("company"), title: "Company Formation", description: "End-to-end incorporation, documentation, and legal compliance." },
  { icon: "fa-file-invoice", image: IMG("gst"), title: "GST & Returns", description: "GST registration and timely return filing to keep you fully compliant." },
  { icon: "fa-file-invoice-dollar", image: IMG("tax"), title: "Tax & Accounting", description: "Income tax filing, bookkeeping, TDS, ROC compliance and CA services." },
];

function FlipCard({
  icon,
  title,
  description,
  image,
  className,
  style,
}: Service & { className?: string; style?: CSSProperties }) {
  return (
    <div
      className={cn(
        "group h-32 w-24 rounded-xl [perspective:1000px] transition-transform duration-300 ease-in-out hover:scale-110 md:h-36 md:w-28",
        className
      )}
      style={style}
    >
      <div className="relative h-full w-full rounded-xl shadow-lg transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 overflow-hidden rounded-xl border border-white/10 [backface-visibility:hidden]">
          {/* icon tile always behind — shows if the image is missing/fails */}
          <div className="absolute inset-0 flex items-center justify-center bg-card">
            <i className={`fa-solid ${icon} text-3xl text-brand`} />
          </div>
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 to-transparent p-2 pt-6">
            <p className="text-center text-[10px] font-semibold leading-tight text-white md:text-xs">
              {title}
            </p>
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-brand/40 bg-neutral-900 p-3 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <i className={`fa-solid ${icon} mb-1.5 text-lg text-brand`} />
          <h3 className="mb-1 text-balance text-xs font-bold text-white md:text-sm">
            {title}
          </h3>
          <p className="line-clamp-4 text-pretty text-[10px] leading-snug text-white/60 md:text-xs">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ServicesCircularGallery({
  showHeading = true,
}: {
  showHeading?: boolean;
}) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      if (galleryRef.current) setSize(galleryRef.current.offsetWidth);
    };
    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    if (galleryRef.current) resizeObserver.observe(galleryRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // Skip the per-frame auto-rotation on phones / reduced-motion — it
    // re-renders every card each frame and is janky on mobile.
    if (prefersReduced || window.matchMedia("(max-width: 768px)").matches) return;

    let animationFrameId: number;
    const animate = () => {
      setRotation((prev) => prev + 0.0006);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const radius = size * 0.4;
  const centerX = size / 2;
  const centerY = size / 2;

  return (
    <div className="flex w-full items-center justify-center">
      <div
        ref={galleryRef}
        className="relative flex aspect-square w-full max-w-[340px] items-center justify-center sm:max-w-[520px] md:max-w-[680px]"
      >
        {/* Central text */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
          {showHeading ? (
            <>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7aa2ff]">
                Complete Solutions
              </span>
              <h2 className="mt-2 text-balance text-3xl font-bold leading-tight text-white [text-shadow:0_4px_16px_rgba(0,0,0,0.8)] md:text-5xl">
                Our Services
              </h2>
            </>
          ) : null}
          <p className="mt-3 text-xs font-medium uppercase tracking-widest text-muted">
            Hover to explore
          </p>
        </div>

        {/* Circular arrangement */}
        {size > 0 &&
          services.map((service, index) => {
            const angle =
              (index / services.length) * 2 * Math.PI - Math.PI / 2 + rotation;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            return (
              <FlipCard
                key={service.title}
                {...service}
                className="absolute hover:z-20"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: `translate(-50%, -50%) rotate(${
                    (angle + Math.PI / 2) * (180 / Math.PI)
                  }deg)`,
                }}
              />
            );
          })}
      </div>
    </div>
  );
}
