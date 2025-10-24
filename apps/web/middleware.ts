import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { readSession } from "./src/lib/session";

// ✅ Only run on /console and /console/*
export const config = { matcher: ["/console", "/console/:path*"] };

export function middleware(req: NextRequest) {
  // 🔒 Session check for Console routes using signed cookies
  console.log("🔍 Middleware running for:", req.nextUrl.pathname);
  
  try {
    const sessionData = readSession(req);
    console.log("🔍 Session data:", sessionData ? "exists" : "null");

    if (!sessionData) {
      console.log("🔍 No session, redirecting to /shop");
      const url = new URL("/shop", req.url);
      url.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(url);
    }

    console.log("🔍 Session exists, allowing access");
    return NextResponse.next();
  } catch (error) {
    console.error("🔍 Middleware error:", error);
    // If middleware fails, redirect to shop for safety
    const url = new URL("/shop", req.url);
    url.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(url);
  }
}
