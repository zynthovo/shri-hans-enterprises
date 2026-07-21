import { CardStack, type CardStackItem } from "@/components/CardStack";
import type { Dictionary } from "@/lib/i18n/getDictionary";

function Heading({ dict }: { dict: Pick<Dictionary["services"], "eyebrow" | "heading" | "subheading"> }) {
  return (
    <div className="text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e0b84c] sm:text-sm">
        {dict.eyebrow}
      </span>
      <h2 className="mt-2 text-4xl font-bold text-heading sm:text-5xl">
        {dict.heading}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-muted">{dict.subheading}</p>
    </div>
  );
}

export function ServicesView({
  items,
  dict,
}: {
  items: CardStackItem[];
  dict: Dictionary["services"];
}) {
  return (
    <div>
      <Heading dict={dict} />
      <div className="mt-10 overflow-hidden">
        <CardStack items={items} initialIndex={0} maxVisible={5} loop />
      </div>
    </div>
  );
}
