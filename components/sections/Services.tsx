import Link from "next/link";
import { ServicesView } from "@/components/ServicesView";
import { type CardStackItem } from "@/components/CardStack";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/getDictionary";

export async function Services() {
  const dict = await getDictionary(await getLocale());
  const items: CardStackItem[] = dict.services.list;

  return (
    <section id="services" className="bg-background py-20">
      <div className="site-container">
        <ServicesView items={items} dict={dict.services} />

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-block rounded-lg bg-brand px-8 py-3.5 font-semibold text-black shadow-lg transition hover:bg-brand-dark"
          >
            {dict.services.exploreAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
