// apps/web/middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Simple middleware to test if it works at all
export const config = {
  matcher: ["/console/:path*"],
};

export function middleware(req: NextRequest) {
  console.log("🔍 MIDDLEWARE EXECUTING FOR:", req.nextUrl.pathname);
  
  // Always redirect /console to home for now
  const url = new URL("/", req.url);
  url.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
  return NextResponse.redirect(url);
}