import { Reveal } from "@/components/Reveal";

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description?: string;
  dark?: boolean;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  dark = false,
}: SectionTitleProps) {
  return (
    <Reveal animation="fade-up" className="section-title">
      <span>{eyebrow}</span>
      <h2 className={dark ? "!text-white" : ""}>{title}</h2>
      {description && <p className={dark ? "!text-white/70" : ""}>{description}</p>}
    </Reveal>
  );
}
