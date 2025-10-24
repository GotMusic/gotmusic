// apps/web/middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Trigger CI testing for PR 311

// Gate Studio + Console (public: /, /catalog, assets, etc.)
export const config = {
  matcher: ["/studio", "/studio/:path*", "/console", "/console/:path*"],
};

export function middleware(req: NextRequest) {
  // Canary header so we can assert middleware is running
  const res = NextResponse.next();
  res.headers.set("x-mw", "on");

  // Simple wallet/session presence check.
  // You'll swap this for your signed cookie/session verify later.
  const hasSession = Boolean(req.cookies.get("gm_session")?.value);

  if (!hasSession) {
    const url = new URL("/", req.url); // homepage, not /shop
    url.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(url);
  }

  return res;
}
