import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sessionCookieName } from "../../../../lib/session-crypto";

export const runtime = "edge";

export async function POST(_req: NextRequest) {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookieName(), "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
