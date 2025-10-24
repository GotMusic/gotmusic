// apps/web/middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Test middleware - should run on ALL routes to see if middleware works at all
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export async function middleware(req: NextRequest) {
  console.log("🔍 MIDDLEWARE RUNNING FOR:", req.nextUrl.pathname);
  
  // For /console routes, always redirect to test
  if (req.nextUrl.pathname.startsWith("/console")) {
    console.log("🔍 REDIRECTING /console to /shop");
    const url = new URL("/shop", req.url);
    url.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}