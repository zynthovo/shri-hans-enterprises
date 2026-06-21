import { SectionTitle } from "@/components/SectionTitle";

type Tech = { slug: string; name: string };

const techs: Tech[] = [
  { slug: "react", name: "React" },
  { slug: "nextdotjs", name: "Next.js" },
  { slug: "javascript", name: "JavaScript" },
  { slug: "typescript", name: "TypeScript" },
  { slug: "tailwindcss", name: "Tailwind" },
  { slug: "wordpress", name: "WordPress" },
  { slug: "nodedotjs", name: "Node.js" },
  { slug: "python", name: "Python" },
  { slug: "php", name: "PHP" },
  { slug: "laravel", name: "Laravel" },
  { slug: "django", name: "Django" },
  { slug: "dotnet", name: ".NET" },
  { slug: "flutter", name: "Flutter" },
  { slug: "kotlin", name: "Kotlin" },
  { slug: "swift", name: "Swift" },
  { slug: "android", name: "Android" },
  { slug: "tensorflow", name: "TensorFlow" },
  { slug: "pytorch", name: "PyTorch" },
  { slug: "huggingface", name: "Hugging Face" },
  { slug: "opencv", name: "OpenCV" },
  { slug: "arduino", name: "Arduino" },
  { slug: "raspberrypi", name: "Raspberry Pi" },
  { slug: "mysql", name: "MySQL" },
  { slug: "mongodb", name: "MongoDB" },
  { slug: "postgresql", name: "PostgreSQL" },
  { slug: "firebase", name: "Firebase" },
  { slug: "docker", name: "Docker" },
  { slug: "googlecloud", name: "Google Cloud" },
  { slug: "figma", name: "Figma" },
  { slug: "blender", name: "Blender" },
  { slug: "googleads", name: "Google Ads" },
  { slug: "googleanalytics", name: "Analytics" },
  { slug: "shopify", name: "Shopify" },
  { slug: "woocommerce", name: "WooCommerce" },
];

const half = Math.ceil(techs.length / 2);
const rowA = techs.slice(0, half);
const rowB = techs.slice(half);

function Pill({ slug, name }: Tech) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-full border border-line bg-surface px-5 py-3 shadow-[0_4px_14px_rgba(0,25,70,0.05)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://cdn.simpleicons.org/${slug}`}
        alt={name}
        loading="lazy"
        className="h-6 w-6"
      />
      <span className="whitespace-nowrap text-sm font-medium text-foreground">
        {name}
      </span>
    </div>
  );
}

function MarqueeRow({ items, reverse }: { items: Tech[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="tech-row flex overflow-hidden">
      <div className={`flex gap-4 ${reverse ? "tech-marquee-rev" : "tech-marquee"}`}>
        {loop.map((t, i) => (
          <Pill key={`${t.slug}-${i}`} {...t} />
        ))}
      </div>
    </div>
  );
}

export function Technologies() {
  return (
    <section className="overflow-hidden bg-surface py-20">
      <div className="site-container px-4 sm:px-0">
        <SectionTitle
          eyebrow="Our Tech Stack"
          title="Technologies We Use"
          description="We build with modern, proven, industry-standard tools to deliver fast, scalable, and reliable solutions across every service."
        />
      </div>

      <div
        className="flex flex-col gap-4"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <MarqueeRow items={rowA} />
        <MarqueeRow items={rowB} reverse />
      </div>
    </section>
  );
}
