import { createHmac, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";

const SESSION_SECRET = process.env.SESSION_SECRET || "dev-secret-change-in-production";

export interface SessionPayload {
  address: string;
  timestamp: number;
  nonce: string;
}

/**
 * Sign a session payload with HMAC-SHA256
 */
export function signSession(payload: SessionPayload): string {
  const json = JSON.stringify(payload);
  const base64 = Buffer.from(json).toString("base64url");
  const hmac = createHmac("sha256", SESSION_SECRET).update(base64).digest("base64url");
  return `${base64}.${hmac}`;
}

/**
 * Verify and parse a signed session cookie
 */
export function verifySession(cookieValue: string): SessionPayload | null {
  try {
    const [base64, hmac] = cookieValue.split(".");
    if (!base64 || !hmac) return null;

    // Verify HMAC
    const expectedHmac = createHmac("sha256", SESSION_SECRET).update(base64).digest("base64url");
    if (hmac !== expectedHmac) return null;

    // Parse payload
    const json = Buffer.from(base64, "base64url").toString("utf-8");
    const payload = JSON.parse(json) as SessionPayload;

    // Check expiration (7 days)
    const now = Date.now();
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
    if (now - payload.timestamp > maxAge) return null;

    return payload;
  } catch {
    return null;
  }
}

/**
 * Create a session cookie with proper security flags
 */
export function createSessionCookie(payload: SessionPayload): string {
  const signedValue = signSession(payload);
  
  const isProduction = process.env.NODE_ENV === "production";
  const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds
  
  return `gm_session=${signedValue}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${
    isProduction ? "; Secure" : ""
  }`;
}

/**
 * Create a session cookie for clearing
 */
export function clearSessionCookie(): string {
  return "gm_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0";
}

/**
 * Generate a development session payload
 */
export function createDevSession(): SessionPayload {
  return {
    address: "0x" + randomBytes(20).toString("hex"),
    timestamp: Date.now(),
    nonce: randomBytes(16).toString("hex"),
  };
}
