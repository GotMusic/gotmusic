import { NextRequest, NextResponse } from "next/server";
import { createDevSession, createSessionCookie } from "@/lib/session";

export async function GET(request: NextRequest) {
  // Allow in test and development environments
  if (process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "development") {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  // Create a development session with HMAC-signed cookie
  const session = createDevSession();
  const cookieString = createSessionCookie(session);
  
  // Get returnTo parameter for redirect
  const returnTo = request.nextUrl.searchParams.get("returnTo") || "/";
  
  // Create response with redirect
  const response = NextResponse.redirect(new URL(returnTo, request.url));
  
  // Set the signed session cookie
  response.headers.set("Set-Cookie", cookieString);
  
  return response;
}

export async function POST() {
  // Allow in test and development environments
  if (process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "development") {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  // Create a development session with HMAC-signed cookie for E2E
  const session = createDevSession();
  const cookieString = createSessionCookie(session);
  
  const response = NextResponse.json({ ok: true, address: session.address });
  response.headers.set("Set-Cookie", cookieString);
  
  return response;
}
