import type { Locale } from "./locale";
import type { Dictionary } from "./dictionaries/en";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((m) => m.default),
  hi: () => import("./dictionaries/hi").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

export type { Dictionary };
