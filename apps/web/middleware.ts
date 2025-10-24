// apps/web/middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Gated areas
export const config = {
  matcher: ["/studio", "/studio/:path*", "/console", "/console/:path*"],
};

export function middleware(req: NextRequest) {
  // PROBE HEADER: proves the middleware executed
  const res = NextResponse.next();
  res.headers.set("x-mw", "on");

  // TEMP: cookie-only check; no imports
  const has = Boolean(req.cookies.get("gm_session")?.value);
  if (!has) {
    const url = new URL("/", req.url);
    url.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(url);
  }
  return res;
}