import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Gate studio/console behind wallet/session.
 * Public: homepage (/), catalog (/catalog, /asset/*), API docs, etc.
 * Note: keep this file at apps/web/middleware.ts (not under src/)
 */
export const config = {
  matcher: [
    "/studio",
    "/studio/:path*",
    "/console",
    "/console/:path*",
  ],
};

export function middleware(req: NextRequest) {
  // Edge-safe: do not import server-only crypto/utils here
  // Use a simple cookie presence check as the "wallet gate"
  const hasSession =
    Boolean(req.cookies.get("gm_session")?.value) ||
    Boolean(req.cookies.get("session")?.value);

  if (!hasSession) {
    // Redirect to homepage with next param for post-auth return
    const url = new URL("/", req.url);
    url.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
    const res = NextResponse.redirect(url);
    res.headers.set("x-mw", "on"); // probe header for smoke tests
    return res;
  }

  const res = NextResponse.next();
  res.headers.set("x-mw", "on"); // probe header for smoke tests
  return res;
}