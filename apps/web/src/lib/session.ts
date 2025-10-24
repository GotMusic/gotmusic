import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "session";
const SESSION_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET environment variable is required");
  }
  return secret;
}

export interface SessionData {
  userId: string;
  sessionId: string;
  expiresAt: number;
}

/**
 * Sign session data with HMAC-SHA256
 */
export function signSession(data: SessionData): string {
  const payload = JSON.stringify(data);
  const signature = createHmac("sha256", getSessionSecret()).update(payload).digest("hex");

  // Combine payload and signature
  const combined = `${Buffer.from(payload).toString("base64")}.${signature}`;
  return Buffer.from(combined).toString("base64");
}

/**
 * Verify and parse signed session data
 */
export function verifySession(signedData: string): SessionData | null {
  try {
    // Decode the base64
    const decoded = Buffer.from(signedData, "base64").toString("utf-8");
    const [payload, signature] = decoded.split(".");

    if (!payload || !signature) {
      return null;
    }

    // Decode the payload
    const data = JSON.parse(Buffer.from(payload, "base64").toString("utf-8"));

    // Verify signature
    const expectedSignature = createHmac("sha256", getSessionSecret())
      .update(Buffer.from(payload, "base64").toString("utf-8"))
      .digest("hex");

    // Use timing-safe comparison to prevent timing attacks
    const signatureBuffer = Buffer.from(signature, "hex");
    const expectedBuffer = Buffer.from(expectedSignature, "hex");

    if (
      signatureBuffer.length !== expectedBuffer.length ||
      !timingSafeEqual(signatureBuffer, expectedBuffer)
    ) {
      return null;
    }

    // Check expiration
    if (data.expiresAt && Date.now() > data.expiresAt) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Session verification error:", error);
    return null;
  }
}

/**
 * Create a signed session cookie
 */
export function createSessionCookie(data: SessionData): string {
  const signedData = signSession(data);

  return `${SESSION_COOKIE_NAME}=${signedData}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_MAX_AGE}${
    process.env.NODE_ENV === "production" ? "; Secure" : ""
  }`;
}

/**
 * Set session cookie in NextResponse
 */
export function setSessionCookie(response: NextResponse, data: SessionData): void {
  const signedData = signSession(data);

  response.cookies.set(SESSION_COOKIE_NAME, signedData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

/**
 * Read and verify session from request
 */
export function readSession(request: NextRequest): SessionData | null {
  const cookieValue = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!cookieValue) {
    return null;
  }

  return verifySession(cookieValue);
}

/**
 * Read and verify session from server-side cookies
 */
export async function readSessionFromCookies(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!cookieValue) {
    return null;
  }

  return verifySession(cookieValue);
}

/**
 * Clear session cookie
 */
export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
