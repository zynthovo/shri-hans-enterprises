"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ShaderBackground } from "@/components/ShaderBackground";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Rohit Verma",
    role: "Founder, Retail Startup",
    img: "https://images.unsplash.com/photo-1638368349569-e49499196d9f?w=200&h=200&fit=crop&crop=faces&q=70&auto=format",
    text: "Zynthovo built our website and handled our GST and company registration together. Getting tech and compliance from one team saved us so much time and back-and-forth.",
  },
  {
    name: "Priya Sharma",
    role: "Marketing Head, D2C Brand",
    img: "https://images.unsplash.com/photo-1557296387-5358ad7997bb?w=200&h=200&fit=crop&crop=faces&q=70&auto=format",
    text: "We ran our first influencer campaign through Creators Flow and the reach was incredible. The team handled creator matching, content and reporting end to end.",
  },
  {
    name: "Aman Gupta",
    role: "Director, EdTech",
    img: "https://images.unsplash.com/photo-1522724709546-19901cb1818a?w=200&h=200&fit=crop&crop=faces&q=70&auto=format",
    text: "Their AI-powered School Management Software transformed how we manage admissions, fees and attendance. Genuinely well-built and easy for our staff to use.",
  },
  {
    name: "Neha Singh",
    role: "Proprietor, Local Business",
    img: "https://images.unsplash.com/photo-1536766768598-e09213fdcf22?w=200&h=200&fit=crop&crop=faces&q=70&auto=format",
    text: "From logo and video editing to social media marketing, Zynthovo gave our brand a complete makeover. Professional, responsive and affordable.",
  },
  {
    name: "Vikas Yadav",
    role: "CEO, Manufacturing",
    img: "https://images.unsplash.com/photo-1580471260026-2a8acbc7c7a7?w=200&h=200&fit=crop&crop=faces&q=70&auto=format",
    text: "They delivered a custom ERP that streamlined our entire operation, and they also manage our income tax and accounting. A true one-stop partner.",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="testimonials relative overflow-hidden py-20"
    >
      <ShaderBackground className="absolute inset-0 h-full w-full" />
      {/* Keep this a dark "cosmic clouds" spotlight section in both themes so
          the animated shader stays vivid. A light overlay would wash it out. */}
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.img}
                  alt={t.name}
                  className="mx-auto h-24 w-24 rounded-full border-4 border-white/30 object-cover"
                />
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
