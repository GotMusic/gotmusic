import { NextRequest, NextResponse } from "next/server";
import { createLogger } from "@/lib/logger";
import { createSessionCookie, clearSessionCookie, verifySession } from "@/lib/session";

const logger = createLogger();

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("gm_session")?.value;
    
    if (!sessionCookie) {
      return NextResponse.json({ address: null, isConnected: false });
    }

    const session = verifySession(sessionCookie);
    
    if (!session) {
      return NextResponse.json({ address: null, isConnected: false });
    }

    return NextResponse.json({ 
      address: session.address, 
      isConnected: true 
    });
  } catch (error) {
    logger.error("Session check failed", { error });
    return NextResponse.json({ address: null, isConnected: false });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();
    
    if (!address || typeof address !== "string") {
      return NextResponse.json(
        { error: "Invalid wallet address" },
        { status: 400 }
      );
    }

    // Validate Ethereum address format (basic check)
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return NextResponse.json(
        { error: "Invalid Ethereum address format" },
        { status: 400 }
      );
    }

    logger.info("Wallet session created", { address });

    // Create HMAC-signed session with wallet address
    const session = {
      address,
      timestamp: Date.now(),
      nonce: Math.random().toString(36).substring(2, 15),
    };
    
    const cookieString = createSessionCookie(session);
    
    const response = NextResponse.json({ 
      ok: true, 
      address,
      message: "Wallet connected successfully" 
    });
    
    response.headers.set("Set-Cookie", cookieString);
    
    return response;
  } catch (error) {
    logger.error("Wallet session creation failed", { error });
    return NextResponse.json(
      { error: "Failed to create wallet session" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    logger.info("Wallet session cleared");

    const response = NextResponse.json({ 
      ok: true, 
      message: "Wallet session cleared" 
    });
    
    // Clear the session cookie using helper
    const cookieString = clearSessionCookie();
    response.headers.set("Set-Cookie", cookieString);
    
    return response;
  } catch (error) {
    logger.error("Wallet session clear failed", { error });
    return NextResponse.json(
      { error: "Failed to clear wallet session" },
      { status: 500 }
    );
  }
}
