import Link from "next/link";

const socials = [
  { icon: "instagram", href: "#", delay: "400ms" },
  { icon: "twitter-x", href: "#", delay: "600ms" },
  { icon: "facebook", href: "#", delay: "700ms" },
  { icon: "linkedin", href: "#", delay: "800ms" },
];

const circles = [
  { size: "170px", pos: "8px", z: "20px", delay: "0s" },
  { size: "140px", pos: "10px", z: "40px", delay: "0.4s" },
  { size: "110px", pos: "17px", z: "60px", delay: "0.8s" },
  { size: "80px", pos: "23px", z: "80px", delay: "1.2s" },
];

export function FooterGlassCard() {
  return (
    <div className="group h-[300px] w-[290px] [perspective:1000px]">
      <div className="relative h-full rounded-[50px] bg-gradient-to-br from-zinc-900 to-black shadow-2xl transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.3)_30px_50px_25px_-40px,rgba(0,0,0,0.1)_0px_25px_30px_0px] group-hover:[transform:rotate3d(1,1,0,30deg)]">
        <div className="absolute inset-2 rounded-[55px] border-b border-l border-white/20 bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,25px)]" />

        <div className="absolute [transform:translate3d(0,0,26px)]">
          <div className="px-7 pb-0 pt-[100px]">
            <span className="block text-xl font-black text-white">
              Zynthovo Digital
            </span>
            <span className="mt-4 block text-[14px] leading-relaxed text-zinc-300">
              Technology, marketing &amp; compliance — all under one roof.
            </span>
          </div>
        </div>

        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between [transform-style:preserve-3d] [transform:translate3d(0,0,26px)]">
          <div className="flex gap-2.5 [transform-style:preserve-3d]">
            {socials.map((s) => (
              <a
                key={s.icon}
                href={s.href}
                aria-label={s.icon}
                className="grid h-[30px] w-[30px] place-content-center rounded-full border-none bg-white text-black shadow-[rgba(0,0,0,0.5)_0px_7px_5px_-5px] transition-all duration-200 ease-in-out hover:bg-brand hover:text-white group-hover:[box-shadow:rgba(0,0,0,0.2)_-5px_20px_10px_0px] group-hover:[transform:translate3d(0,0,50px)]"
                style={{ transitionDelay: s.delay }}
              >
                <i className={`bi bi-${s.icon} text-sm`} />
              </a>
            ))}
          </div>
          <Link
            href="/about"
            className="flex w-2/5 cursor-pointer items-center justify-end gap-1 text-white transition-all duration-200 ease-in-out hover:[transform:translate3d(0,0,10px)]"
          >
            <span className="text-xs font-bold">View more</span>
            <i className="bi bi-chevron-down text-xs font-bold" />
          </Link>
        </div>

        <div className="absolute right-0 top-0 [transform-style:preserve-3d]">
          {circles.map((circle, index) => (
            <div
              key={index}
              className="absolute aspect-square rounded-full bg-white/10 shadow-[rgba(100,100,111,0.2)_-10px_10px_20px_0px] transition-all duration-500 ease-in-out"
              style={{
                width: circle.size,
                top: circle.pos,
                right: circle.pos,
                transform: `translate3d(0, 0, ${circle.z})`,
                transitionDelay: circle.delay,
              }}
            />
          ))}
          <div
            className="absolute grid aspect-square w-[50px] place-content-center rounded-full bg-white shadow-[rgba(100,100,111,0.2)_-10px_10px_20px_0px] transition-all duration-500 ease-in-out [transform:translate3d(0,0,100px)] [transition-delay:1.6s] group-hover:[transform:translate3d(0,0,120px)]"
            style={{ top: "30px", right: "30px" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/icon.png"
              alt="Zynthovo"
              className="h-7 w-7 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
