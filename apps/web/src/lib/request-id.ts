/**
 * Request ID utilities for correlation and tracing
 */

export interface RequestContext {
  requestId: string;
  method: string;
  path: string;
  userAgent?: string;
  ip?: string;
}

/**
 * Generate a unique request ID using Web Crypto API (Edge Runtime compatible)
 */
export function generateRequestId(): string {
  // Use Web Crypto API for Edge Runtime compatibility
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for environments without crypto.randomUUID
  return `req_${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`;
}

/**
 * Extract request ID from headers or generate new one
 */
export function getOrCreateRequestId(request: Request): string {
  const existingId = request.headers.get("x-request-id");
  return existingId || generateRequestId();
}

/**
 * Create request context from request object
 */
export function createRequestContext(request: Request, requestId: string): RequestContext {
  const url = new URL(request.url);

  return {
    requestId,
    method: request.method,
    path: url.pathname,
    userAgent: request.headers.get("user-agent") || undefined,
    ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
  };
}

/**
 * Add request ID to response headers
 */
export function addRequestIdHeader(response: Response, requestId: string): Response {
  response.headers.set("x-request-id", requestId);
  return response;
}
