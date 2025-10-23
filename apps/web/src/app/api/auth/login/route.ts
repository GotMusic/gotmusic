import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/server/db';
import { users, sessions } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';

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
      const [newUser] = await db.insert(users).values({
        email,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning();
      user = newUser;
    }

    // Generate session token
    const sessionToken = randomBytes(32).toString('hex');
    const tokenHash = await hashToken(sessionToken);
    
    // Create session
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await db.insert(sessions).values({
      userId: user.id,
      tokenHash,
      ua: request.headers.get('user-agent') || '',
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      expiresAt,
    });

    // Set HTTP-only cookie
    const response = NextResponse.json({ ok: true });
    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}

async function hashToken(token: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
