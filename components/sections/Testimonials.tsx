"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ShaderBackground } from "@/components/ShaderBackground";
import type { Dictionary } from "@/lib/i18n/getDictionary";
import "swiper/css";
import "swiper/css/pagination";

export function Testimonials({ dict }: { dict: Dictionary["testimonials"] }) {
  const testimonials = dict.list;
  return (
    <section
      id="testimonials"
      className="testimonials relative overflow-hidden py-20"
    >
      <ShaderBackground className="absolute inset-0 h-full w-full" />
      {/* Keep this a dark spotlight section in both themes so the animated
          shader stays vivid. A light overlay would wash it out. */}
      <div className="absolute inset-0 bg-black/25" />

      <div className="site-container relative z-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop
          speed={600}
          autoplay={{ delay: 5000 }}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="!pb-4"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.name}>
              <div className="mx-auto max-w-3xl rounded-2xl border border-white/20 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-2xl sm:p-10">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/30 bg-gradient-to-br from-brand to-brand-dark text-2xl font-bold text-black">
                  {t.initials}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {t.name}
                </h3>
                <h4 className="text-sm text-white/70">{t.role}</h4>
                <div className="my-3 flex justify-center gap-1 text-[#ffc107]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className="bi bi-star-fill" />
                  ))}
                </div>
                <p className="leading-relaxed text-white/90">
                  <i className="bi bi-quote mr-1 text-2xl text-white/50" />
                  {t.text}
                  <i className="bi bi-quote ml-1 text-2xl text-white/50" />
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
