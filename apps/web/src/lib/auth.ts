import { NextRequest } from 'next/server';
import { db } from '@/server/db';
import { sessions, users } from '@/server/db/schema';
import { eq, and, gt } from 'drizzle-orm';
import { cookies } from 'next/headers';

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
    let sessionToken: string | null = null;
    
    // Check Authorization header first (mobile)
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      sessionToken = authHeader.substring(7);
    }
    
    // Check cookie (web)
    if (!sessionToken) {
      const cookieStore = cookies();
      sessionToken = cookieStore.get('session')?.value || null;
    }

    if (!sessionToken) {
      return null;
    }

    // Hash the token to compare with stored hash
    const tokenHash = await hashToken(sessionToken);
    
    // Find session
    const session = await db.query.sessions.findFirst({
      where: and(
        eq(sessions.tokenHash, tokenHash),
        gt(sessions.expiresAt, new Date())
      ),
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
    console.error('Session read error:', error);
    return null;
  }
}

export async function requireUser(request: NextRequest): Promise<Session> {
  const session = await readSession(request);
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}

export async function requireWallet(userId: string) {
  // This will be implemented in issue #290
  // For now, return a placeholder
  throw new Error('RequiresWallet - not implemented yet');
}

async function hashToken(token: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
