import { createLogger } from "@/lib/logger";
import { checkSensitiveRateLimit, getClientId } from "@/lib/rateLimit";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

// Request validation schema
const DownloadRequestSchema = z.object({
  buyer: z.string().min(1, "Buyer address is required"),
  assetId: z.string().min(1, "Asset ID is required"),
});

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const logger = createLogger();
  const { id: assetId } = await params;

  try {
    // Rate limit check (very strict for downloads)
    const clientId = getClientId(req);
    const rateLimit = checkSensitiveRateLimit(clientId, {
      maxRequests: 5,
      windowSeconds: 60,
      cooldownSeconds: 300, // 5 min cooldown
    });

    if (!rateLimit.allowed) {
      logger.warn("Download rate limit exceeded", {
        assetId,
        clientId,
        count: rateLimit.count,
        cooldownRemaining: rateLimit.cooldownRemaining,
      });

      return NextResponse.json(
        {
          error: "Too many download requests. Please try again later.",
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
        },
      );
    }

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const buyer = searchParams.get("buyer");

    if (!buyer) {
      return NextResponse.json({ error: "Buyer address is required" }, { status: 400 });
    }

    // Validate request
    const parseResult = DownloadRequestSchema.safeParse({
      buyer,
      assetId,
    });

    if (!parseResult.success) {
      const errors = parseResult.error.flatten().fieldErrors;
      return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 });
    }

    // TODO: Implement ACC (Access Control Condition) check
    // This would verify the buyer has a valid EAS license receipt
    // For now, return a placeholder response
    logger.info("Download request authorized", {
      assetId,
      buyer,
      clientId,
    });

    // TODO: Implement actual file download/decryption
    // This would:
    // 1. Check EAS for license receipt
    // 2. Call Lit ACC to verify authorization
    // 3. Fetch encrypted file from Lighthouse
    // 4. Decrypt and stream to client

    return NextResponse.json({
      message: "Download authorized",
      assetId,
      buyer,
      // TODO: Add actual download URL or stream
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Download error";
    const errorObj = error instanceof Error ? error : new Error(message);
    logger.error("Download failed", errorObj);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
