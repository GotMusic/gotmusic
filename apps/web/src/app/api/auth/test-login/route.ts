import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  // Create a fake user session for E2E testing
  const userId = `e2e-${randomUUID()}`;

  // Set a simple session cookie that middleware can check
  const response = NextResponse.json({ ok: true, userId });
  response.cookies.set("gm_session", userId, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return response;
}

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  // Create a fake user session for E2E testing
  const userId = `e2e-${randomUUID()}`;

  // Set a simple session cookie that middleware can check
  const response = NextResponse.json({ ok: true, userId });
  response.cookies.set("gm_session", userId, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return response;
}
