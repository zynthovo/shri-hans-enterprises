import { NextResponse } from "next/server";
import { addSubmission } from "@/lib/submissions";

export const runtime = "nodejs";

// Only these field names are stored (anything else is ignored).
const ALLOWED = new Set([
  "name",
  "email",
  "phone",
  "company",
  "service",
  "budget",
  "subject",
  "message",
]);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // Honeypot — bots fill this; silently accept without storing.
  if (body.botcheck) return NextResponse.json({ success: true });

  const type =
    typeof body._type === "string" ? body._type.slice(0, 80) : "contact";

  const fields: Record<string, string> = {};
  for (const [k, v] of Object.entries(body)) {
    if (!ALLOWED.has(k)) continue;
    if (typeof v === "string" && v.trim()) fields[k] = v.slice(0, 5000);
  }

  if (!fields.name && !fields.email && !fields.message) {
    return NextResponse.json(
      { success: false, message: "Empty submission" },
      { status: 400 }
    );
  }

  await addSubmission(type, fields);
  return NextResponse.json({ success: true });
}
