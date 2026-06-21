import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";

const members = [
  {
    initials: "TK",
    name: "Tarun Kumar Sahani",
    role: "Founder & Director",
    bio: "Drives the company's technology vision — leading product, software, and AI initiatives that power Zynthovo's clients across India.",
  },
  {
    initials: "SY",
    name: "Sandeep Yadav",
    role: "Co-Founder & Director",
    bio: "Heads operations, growth, and client success — ensuring every marketing, compliance, and delivery engagement exceeds expectations.",
  },
];

export function Team() {
  return (
    <section id="team" className="bg-surface-alt py-20">
      <div className="site-container px-4 sm:px-0">
        <SectionTitle
          eyebrow="Leadership"
          title="Meet Our Founders"
          description="The people building Zynthovo Digital into a complete technology, marketing, and compliance partner."
        />
        <Reveal
          stagger={0.15}
          className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2"
        >
          {members.map((m) => (
            <div
              key={m.name}
              className="rounded-2xl bg-surface p-8 text-center shadow-[0_10px_30px_rgba(0,25,70,0.06)] transition hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,93,237,0.12)]"
            >
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand to-[#8965e0] text-2xl font-bold text-white">
                {m.initials}
              </div>
              <h4 className="mt-5 text-xl font-semibold text-heading">{m.name}</h4>
              <span className="text-sm font-medium text-brand">{m.role}</span>
              <p className="mt-3 text-sm text-muted">{m.bio}</p>
              <div className="mt-4 flex justify-center gap-3">
                {["linkedin", "twitter-x", "envelope"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef2f9] text-[#666] transition hover:bg-brand hover:text-white"
                  >
                    <i className={`bi bi-${s}`} />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
