export type ClassValue = string | number | null | false | undefined;

/** Minimal className joiner (no external deps). */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}
