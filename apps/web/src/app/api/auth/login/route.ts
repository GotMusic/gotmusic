import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  createSessionCookieValue,
  sessionCookieName,
  sessionMaxAgeFromExp,
  type SessionPayload,
} from "../../../../lib/session-crypto";

// Run on Edge to match middleware environment
export const runtime = "edge";

export async function POST(req: NextRequest) {
  // Expect JSON { userId: string, roles?: string[], ttlSeconds?: number }
  const body = await req.json().catch(() => ({}));
  const userId: string = body.userId;
  const roles: string[] | undefined = body.roles;
  const ttl = Number.isFinite(body.ttlSeconds) ? Math.max(60, Math.min(60 * 60 * 24 * 7, body.ttlSeconds)) : 60 * 60 * 24; // default 24h

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    sub: userId,
    roles,
    iat: now,
    exp: now + ttl,
  };

  const cookieValue = await createSessionCookieValue(payload);

  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookieName(), cookieValue, {
    httpOnly: true,
    secure: true,       // true in CI/Prod; ok on localhost over http in most browsers
    sameSite: "lax",    // or 'strict' if you prefer
    path: "/",
    maxAge: sessionMaxAgeFromExp(payload.exp),
  });

  return res;
}