import { randomBytes } from "node:crypto";
import { setSessionCookie } from "@/lib/session";
import { db } from "@/server/db";
import { sessions, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = LoginSchema.parse(body);

    // Find or create user
    let user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      // Create new user
      const [newUser] = await db
        .insert(users)
        .values({
          email,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();
      user = newUser;
    }

    // Generate session token
    const sessionToken = randomBytes(32).toString("hex");
    const tokenHash = await hashToken(sessionToken);

    // Create session
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const [session] = await db
      .insert(sessions)
      .values({
        userId: user.id,
        tokenHash,
        ua: request.headers.get("user-agent") || "",
        ip: request.headers.get("x-forwarded-for") || "unknown",
        expiresAt,
      })
      .returning();

    // Create signed session cookie
    const response = NextResponse.json({ ok: true });
    setSessionCookie(response, {
      userId: user.id,
      sessionId: session.id,
      expiresAt: expiresAt.getTime(),
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

async function hashToken(token: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
