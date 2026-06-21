import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSettings, saveSettings, type SiteSettings } from "@/lib/settings";

export const runtime = "nodejs";

const str = (v: unknown, max = 500) =>
  typeof v === "string" ? v.slice(0, max) : "";

export async function POST(request: Request) {
  // Only an authenticated admin may change settings.
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const current = await getSettings();
  const contact = (body.contact ?? {}) as Record<string, unknown>;
  const socials = (body.socials ?? {}) as Record<string, unknown>;

  const next: SiteSettings = {
    contact: {
      address: str(contact.address, 400) || current.contact.address,
      phone: str(contact.phone, 40),
      whatsapp: str(contact.whatsapp, 40).replace(/[^\d]/g, ""),
      emails: Array.isArray(contact.emails)
        ? contact.emails
            .map((e) => str(e, 120).trim())
            .filter(Boolean)
            .slice(0, 10)
        : current.contact.emails,
    },
    socials: {
      facebook: str(socials.facebook, 300).trim(),
      instagram: str(socials.instagram, 300).trim(),
      twitter: str(socials.twitter, 300).trim(),
      linkedin: str(socials.linkedin, 300).trim(),
      youtube: str(socials.youtube, 300).trim(),
      github: str(socials.github, 300).trim(),
    },
  };

  await saveSettings(next);
  return NextResponse.json({ success: true, settings: next });
}
