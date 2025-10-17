/**
 * In-memory rate limiter for API endpoints
 *
 * Implements sliding window rate limiting based on client IP address.
 * Uses Map for storage - resets on server restart (acceptable for hackathon/demo).
 *
 * For production, consider:
 * - Redis-backed storage for distributed rate limiting
 * - Upstash Rate Limit or similar edge-compatible solution
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
  cooldownUntil?: number;
}

// In-memory store: Map<clientId, RateLimitEntry>
const limitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
setInterval(
  () => {
    const now = Date.now();
    for (const [key, entry] of limitStore.entries()) {
      if (now > entry.resetTime) {
        limitStore.delete(key);
      }
    }
  },
  5 * 60 * 1000,
);

export interface RateLimitConfig {
  /**
   * Maximum number of requests allowed in the window
   * @default 30
   */
  maxRequests?: number;

  /**
   * Time window in seconds
   * @default 60 (1 minute)
   */
  windowSeconds?: number;
}

export interface RateLimitResult {
  /**
   * Whether the request is allowed
   */
  allowed: boolean;

  /**
   * Current count of requests in window
   */
  count: number;

  /**
   * Maximum requests allowed
   */
  limit: number;

  /**
   * Time remaining until reset (seconds)
   */
  resetIn: number;

  /**
   * Timestamp when limit resets (Unix ms)
   */
  resetTime: number;

  /**
   * Cooldown remaining (seconds) - for sensitive operations
   */
  cooldownRemaining?: number;
}

/**
 * Check if a request is within rate limits
 *
 * @param clientId - Unique identifier for the client (e.g., IP address)
 * @param config - Rate limit configuration
 * @returns Rate limit result with allowed status and metadata
 *
 * @example
 * const clientIp = request.headers.get("x-forwarded-for") || "unknown";
 * const result = checkRateLimit(clientIp, { maxRequests: 30, windowSeconds: 60 });
 *
 * if (!result.allowed) {
 *   return new Response("Too many requests", {
 *     status: 429,
 *     headers: {
 *       "Retry-After": result.resetIn.toString(),
 *       "X-RateLimit-Limit": result.limit.toString(),
 *       "X-RateLimit-Remaining": "0",
 *       "X-RateLimit-Reset": result.resetTime.toString(),
 *     },
 *   });
 * }
 */
export function checkRateLimit(clientId: string, config: RateLimitConfig = {}): RateLimitResult {
  const maxRequests = config.maxRequests ?? 30;
  const windowMs = (config.windowSeconds ?? 60) * 1000;
  const now = Date.now();

  // Get or create entry
  let entry = limitStore.get(clientId);

  // If no entry or window expired, create new entry
  if (!entry || now > entry.resetTime) {
    entry = {
      count: 1,
      resetTime: now + windowMs,
    };
    limitStore.set(clientId, entry);

    return {
      allowed: true,
      count: 1,
      limit: maxRequests,
      resetIn: Math.ceil(windowMs / 1000),
      resetTime: entry.resetTime,
    };
  }

  // Increment count
  entry.count += 1;

  const resetIn = Math.ceil((entry.resetTime - now) / 1000);
  const allowed = entry.count <= maxRequests;

  return {
    allowed,
    count: entry.count,
    limit: maxRequests,
    resetIn,
    resetTime: entry.resetTime,
  };
}

/**
 * Get the client identifier from a request
 *
 * Priority order:
 * 1. X-Forwarded-For (first IP in list)
 * 2. X-Real-IP
 * 3. "unknown" fallback
 *
 * @param request - Next.js request object
 * @returns Client identifier (IP address or "unknown")
 */
export function getClientId(request: Request): string {
  const headers = new Headers(request.headers);

  // Try X-Forwarded-For (can be comma-separated list)
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  // Try X-Real-IP
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp;

  // Fallback
  return "unknown";
}

/**
 * Enhanced rate limiting for sensitive operations
 */
export interface SensitiveRateLimitConfig {
  maxRequests: number;
  windowSeconds: number;
  burstLimit?: number; // Allow short bursts
  cooldownSeconds?: number; // Cooldown after limit exceeded
}

/**
 * Check rate limit with enhanced security for sensitive operations
 */
export function checkSensitiveRateLimit(
  clientId: string,
  config: SensitiveRateLimitConfig,
): RateLimitResult & { cooldownRemaining?: number } {
  const maxRequests = config.maxRequests;
  const windowMs = config.windowSeconds * 1000;
  const burstLimit = config.burstLimit ?? Math.floor(maxRequests * 0.3);
  const cooldownMs = (config.cooldownSeconds ?? 300) * 1000; // 5 min default cooldown
  const now = Date.now();

  // Get or create entry
  let entry = limitStore.get(clientId);

  // Check if in cooldown period
  if (entry?.cooldownUntil && now < entry.cooldownUntil) {
    return {
      allowed: false,
      count: entry.count,
      limit: maxRequests,
      resetIn: Math.ceil((entry.cooldownUntil - now) / 1000),
      resetTime: entry.cooldownUntil,
      cooldownRemaining: Math.ceil((entry.cooldownUntil - now) / 1000),
    };
  }

  // If no entry or window expired, create new entry
  if (!entry || now > entry.resetTime) {
    entry = {
      count: 1,
      resetTime: now + windowMs,
    };
    limitStore.set(clientId, entry);

    return {
      allowed: true,
      count: 1,
      limit: maxRequests,
      resetIn: Math.ceil(windowMs / 1000),
      resetTime: entry.resetTime,
    };
  }

  // Increment count
  entry.count += 1;

  const resetIn = Math.ceil((entry.resetTime - now) / 1000);
  const allowed = entry.count <= maxRequests;

  // If limit exceeded, set cooldown
  if (!allowed && !entry.cooldownUntil) {
    entry.cooldownUntil = now + cooldownMs;
  }

  return {
    allowed,
    count: entry.count,
    limit: maxRequests,
    resetIn,
    resetTime: entry.resetTime,
    cooldownRemaining: entry.cooldownUntil
      ? Math.ceil((entry.cooldownUntil - now) / 1000)
      : undefined,
  };
}
