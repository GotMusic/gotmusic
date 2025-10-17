import { NextRequest, NextResponse } from "next/server";
import { createLogger } from "@/lib/logger";
import { checkSensitiveRateLimit, getClientId } from "@/lib/rateLimit";
import { z } from "zod";

export const runtime = "nodejs";

// Request validation schema
const SpendCreditsSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  assetId: z.string().min(1, "Asset ID is required"),
  amount: z.number().positive("Amount must be positive"),
});

export async function POST(req: NextRequest) {
  const logger = createLogger();

  try {
    // Rate limit check (strict for credit operations)
    const clientId = getClientId(req);
    const rateLimit = checkSensitiveRateLimit(clientId, {
      maxRequests: 10,
      windowSeconds: 60,
      cooldownSeconds: 180, // 3 min cooldown
    });

    if (!rateLimit.allowed) {
      logger.warn("Credit spend rate limit exceeded", {
        clientId,
        count: rateLimit.count,
        cooldownRemaining: rateLimit.cooldownRemaining,
      });

      return NextResponse.json(
        {
          error: "Too many credit operations. Please try again later.",
          retryAfter: rateLimit.resetIn,
          cooldownRemaining: rateLimit.cooldownRemaining,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.resetIn.toString(),
            "X-RateLimit-Limit": rateLimit.limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimit.resetTime.toString(),
          },
        }
      );
    }

    const body = await req.json().catch(() => ({}));

    // Validate request body
    const parseResult = SpendCreditsSchema.safeParse(body);
    if (!parseResult.success) {
      const errors = parseResult.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    const { userId, assetId, amount } = parseResult.data;

    // TODO: Implement actual credit spending logic
    logger.info("Credit spend request", {
      userId,
      assetId,
      amount,
      clientId,
    });

    return NextResponse.json({
      success: true,
      transactionId: `tx_${Date.now()}`,
      remainingCredits: 100, // TODO: Calculate actual remaining credits
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : "Credit spend error";
    const errorObj = error instanceof Error ? error : new Error(message);
    logger.error("Credit spend failed", errorObj);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
