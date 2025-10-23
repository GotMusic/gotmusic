import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/server/db';
import { users, sessions } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { randomBytes } from 'crypto';

const MobileLoginSchema = z.object({
  email: z.string().email(),
  deviceInfo: z.object({
    platform: z.string(),
    version: z.string(),
    model: z.string().optional(),
  }).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, deviceInfo } = MobileLoginSchema.parse(body);

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

    // Generate access token
    const accessToken = randomBytes(32).toString('hex');
    const tokenHash = await hashToken(accessToken);
    
    // Create session
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours for mobile
    await db.insert(sessions).values({
      userId: user.id,
      tokenHash,
      ua: request.headers.get('user-agent') || '',
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      expiresAt,
    });

    return NextResponse.json({
      accessToken,
      expiresIn: 24 * 60 * 60, // 24 hours in seconds
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Mobile login error:', error);
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
