import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { LOCALE_COOKIE, isLocale } from "@/lib/i18n/locale";

export async function POST(request: Request) {
  let body: { locale?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const locale = String(body.locale ?? "");
  if (!isLocale(locale)) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const store = await cookies();
  store.set(LOCALE_COOKIE, locale, {
    sameSite: "lax",
    // No `secure` flag: this is a non-sensitive display preference, and this
    // site may be reached over plain HTTP (e.g. an IP:port deployment with
    // no TLS in front of it yet) — a Secure cookie would be silently
    // dropped by the browser there, and NODE_ENV alone can't tell us
    // whether the connection is actually HTTPS.
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  return NextResponse.json({ success: true });
}
