import { type NextRequest, NextResponse } from "next/server";

/**
 * Basic Auth Middleware for Admin Routes
 *
 * Protects /admin/* and /api/upload/* routes with Basic Authentication.
 * Only active in development/preview environments.
 *
 * Environment Variables:
 * - ADMIN_USER: Username for basic auth (default: admin)
 * - ADMIN_PASS: Password for basic auth (default: password)
 */

function parseBasicAuth(authHeader: string | null): { username: string; password: string } | null {
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return null;
  }

  try {
    const base64 = authHeader.substring(6);
    const credentials = Buffer.from(base64, "base64").toString("utf-8");
    const [username, password] = credentials.split(":", 2);
    return { username, password };
  } catch {
    return null;
  }
}

function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith("/admin") || pathname.startsWith("/api/upload");
}

function isProtectedRoute(pathname: string): boolean {
  return isAdminRoute(pathname);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect admin and upload routes
  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  // Skip auth in production (for now)
  if (process.env.NODE_ENV === "production") {
    return NextResponse.next();
  }

  // Get credentials from environment
  const adminUser = process.env.ADMIN_USER || "admin";
  const adminPass = process.env.ADMIN_PASS || "password";

  // Parse Basic Auth header
  const authHeader = request.headers.get("authorization");
  const credentials = parseBasicAuth(authHeader);

  if (!credentials) {
    // No auth provided, return 401 with WWW-Authenticate header
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin Area"',
        "Content-Type": "text/plain",
      },
    });
  }

  // Check credentials
  if (credentials.username !== adminUser || credentials.password !== adminPass) {
    return new NextResponse("Invalid credentials", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin Area"',
        "Content-Type": "text/plain",
      },
    });
  }

  // Auth successful, continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/upload/:path*"],
};
