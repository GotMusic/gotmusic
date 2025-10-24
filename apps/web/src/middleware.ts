import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// ✅ Only run on /console/*
export const config = { matcher: ["/console/:path*"] };

export function middleware(req: NextRequest) {
  // 🔒 your real session check can go here
  const hasSession = Boolean(req.cookies.get("session")?.value);

  if (!hasSession) {
    const url = new URL("/shop", req.url);
    url.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
