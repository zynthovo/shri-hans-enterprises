import Link from "next/link";
import { Reveal } from "@/components/Reveal";

interface PageHeaderProps {
  title: string;
  crumb: string;
  description?: string;
  homeLabel?: string;
}

const DEFAULT_DESC =
  "Precision steel fabrication and laser cutting — railings, gates, structures, and custom metal work built to last.";

export function PageHeader({ title, crumb, description, homeLabel = "Home" }: PageHeaderProps) {
  return (
    <section
      className="relative bg-ink pb-16 pt-36 text-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10,9,8,0.85), rgba(10,9,8,0.92)), url(/assets/img/page-title-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="site-container px-4 sm:px-0">
        <Reveal animation="fade-up">
          <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-white/70">
            {description ?? DEFAULT_DESC}
          </p>
          <nav className="mt-4">
            <ol className="flex items-center justify-center gap-2 text-sm text-white/60">
              <li>
                <Link href="/" className="hover:text-white">
                  {homeLabel}
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">{crumb}</li>
            </ol>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
