import { cookies } from "next/headers";

export type Locale = "en" | "hi";

export const LOCALE_COOKIE = "locale";
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALES: Locale[] = ["en", "hi"];

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

/** Read the visitor's chosen locale from cookies (server-side). */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return value && isLocale(value) ? value : DEFAULT_LOCALE;
}
