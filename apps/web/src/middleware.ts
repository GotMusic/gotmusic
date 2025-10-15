import { createLogger } from "@/lib/logger";
import { addRequestIdHeader, getOrCreateRequestId } from "@/lib/request-id";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Request ID and Basic Auth Middleware
 *
 * Features:
 * - Generates unique request IDs for all requests
 * - Accepts inbound X-Request-ID headers
 * - Adds X-Request-ID to response headers
 * - Protects /admin/* and /api/upload/* routes with Basic Authentication
 * - Structured logging with request correlation
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

  // Generate or extract request ID
  const requestId = getOrCreateRequestId(request);

  // Create logger with request context
  const logger = createLogger({
    requestId,
    method: request.method,
    path: pathname,
    userAgent: request.headers.get("user-agent") || undefined,
    ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
  });

  // Log request start
  logger.info("Request started", {
    method: request.method,
    path: pathname,
  });

  // Allow e2e to access admin routes without real auth
  if (process.env.E2E_AUTH_BYPASS === "1" && isAdminRoute(pathname)) {
    const response = NextResponse.next();
    return addRequestIdHeader(response, requestId);
  }

  // Only protect admin and upload routes
  if (!isProtectedRoute(pathname)) {
    const response = NextResponse.next();
    return addRequestIdHeader(response, requestId);
  }

  // Skip auth in production (for now)
  if (process.env.NODE_ENV === "production") {
    const response = NextResponse.next();
    return addRequestIdHeader(response, requestId);
  }

  // Get credentials from environment
  const adminUser = process.env.ADMIN_USER || "admin";
  const adminPass = process.env.ADMIN_PASS || "password";

  // Parse Basic Auth header
  const authHeader = request.headers.get("authorization");
  const credentials = parseBasicAuth(authHeader);

  if (!credentials) {
    // No auth provided, return 401 with WWW-Authenticate header
    logger.warn("Authentication required", {
      path: pathname,
      method: request.method,
    });

    const response = new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin Area"',
        "Content-Type": "text/plain",
      },
    });
    return addRequestIdHeader(response, requestId);
  }

  // Check credentials
  if (credentials.username !== adminUser || credentials.password !== adminPass) {
    logger.warn("Invalid credentials", {
      path: pathname,
      method: request.method,
      username: credentials.username,
    });

    const response = new NextResponse("Invalid credentials", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin Area"',
        "Content-Type": "text/plain",
      },
    });
    return addRequestIdHeader(response, requestId);
  }

  // Auth successful, continue
  logger.info("Authentication successful", {
    path: pathname,
    method: request.method,
    username: credentials.username,
  });

  const response = NextResponse.next();
  return addRequestIdHeader(response, requestId);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/:path*", // All API routes for request ID
  ],
};
