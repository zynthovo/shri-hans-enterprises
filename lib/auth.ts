import crypto from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours (seconds)

function secret(): string | null {
  const s = process.env.SESSION_SECRET;
  return s && s.length >= 16 ? s : null;
}

function sign(data: string, s: string): string {
  return crypto.createHmac("sha256", s).update(data).digest("base64url");
}

/** Constant-time, length-independent string comparison (hashes first). */
function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function verifyCredentials(username: string, password: string): boolean {
  const u = process.env.ADMIN_USERNAME;
  const p = process.env.ADMIN_PASSWORD;
  if (!u || !p) return false;
  // Evaluate both to avoid early-exit timing differences.
  const okU = safeEqual(username, u);
  const okP = safeEqual(password, p);
  return okU && okP;
}

export function createToken(username: string): string | null {
  const s = secret();
  if (!s) return null;
  const payload = Buffer.from(
    JSON.stringify({ u: username, exp: Date.now() + SESSION_MAX_AGE * 1000 })
  ).toString("base64url");
  return `${payload}.${sign(payload, s)}`;
}

export function verifyToken(token: string | undefined): { u: string } | null {
  const s = secret();
  if (!s || !token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;

  const expected = sign(payload, s);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof data.exp !== "number" || data.exp < Date.now()) return null;
    return { u: String(data.u) };
  } catch {
    return null;
  }
}

/** Read & verify the current admin session from cookies (server-side). */
export async function getSession(): Promise<{ u: string } | null> {
  const store = await cookies();
  return verifyToken(store.get(SESSION_COOKIE)?.value);
}
