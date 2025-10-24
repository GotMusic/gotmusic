import { db } from "@/server/db";
import { sessions, users } from "@/server/db/schema";
import { and, eq, gt } from "drizzle-orm";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { readSessionFromCookies, readSession as readSignedSession } from "./session";

export interface Session {
  user: {
    id: string;
    email: string;
  };
  sessionId: string;
}

export async function readSession(request: NextRequest): Promise<Session | null> {
  try {
    // Try to get session from cookie (web) or Authorization header (mobile)
    let sessionData: { userId: string; sessionId: string; expiresAt: number } | null = null;

    // Check Authorization header first (mobile)
    const authHeader = request.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      // For mobile, we still use the old token-based approach
      const sessionToken = authHeader.substring(7);
      const tokenHash = await hashToken(sessionToken);

      const session = await db.query.sessions.findFirst({
        where: and(eq(sessions.tokenHash, tokenHash), gt(sessions.expiresAt, new Date())),
        with: {
          user: true,
        },
      });

      if (session) {
        return {
          user: {
            id: session.user.id,
            email: session.user.email,
          },
          sessionId: session.id,
        };
      }
    }

    // Check signed cookie (web)
    if (!sessionData) {
      sessionData = readSignedSession(request);
    }

    if (!sessionData) {
      return null;
    }

    // Verify session still exists in database
    const session = await db.query.sessions.findFirst({
      where: and(eq(sessions.id, sessionData.sessionId), gt(sessions.expiresAt, new Date())),
      with: {
        user: true,
      },
    });

    if (!session) {
      return null;
    }

    return {
      user: {
        id: session.user.id,
        email: session.user.email,
      },
      sessionId: session.id,
    };
  } catch (error) {
    console.error("Session read error:", error);
    return null;
  }
}

export async function requireUser(request: NextRequest): Promise<Session> {
  const session = await readSession(request);
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function requireWallet(userId: string) {
  // This will be implemented in issue #290
  // For now, return a placeholder
  throw new Error("RequiresWallet - not implemented yet");
}

async function hashToken(token: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
