import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  verifyCredentials,
  createToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { username?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const username = String(body.username ?? "");
  const password = String(body.password ?? "");

  if (!verifyCredentials(username, password)) {
    // Generic message — no user enumeration.
    return NextResponse.json(
      { success: false, message: "Invalid username or password." },
      { status: 401 }
    );
  }

  const token = createToken(username);
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Admin panel is not configured (missing SESSION_SECRET)." },
      { status: 500 }
    );
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return NextResponse.json({ success: true });
}
