import { ulid } from "@/lib/ulid";
import { db } from "@/server/db";
import { assetsPg, uploadJobsPg } from "@/server/db/schema";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

// Request validation schema
const CompleteRequestSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  fileKey: z.string().min(1, "File key is required"),
  cid: z.string().min(1, "CID is required"),
  durationSec: z.number().int().positive("Duration must be positive"),
  title: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    // Validate request body
    const parseResult = CompleteRequestSchema.safeParse(body);
    if (!parseResult.success) {
      const errors = parseResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          error: "Validation failed",
          details: errors,
        },
        { status: 400 },
      );
    }

    const { userId, fileKey, cid, durationSec, title } = parseResult.data;

    // Generate asset ID
    const assetId = ulid();

    // Create draft asset
    await db.insert(assetsPg).values({
      id: assetId,
      ownerId: userId,
      title: title ?? "Recording",
      durationSec,
      status: "draft",
      fileCid: cid,
      storageKey: fileKey,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create upload job record (stage: done)
    await db.insert(uploadJobsPg).values({
      id: ulid(),
      userId,
      assetId,
      stage: "done",
      message: "Upload completed successfully",
      createdAt: new Date(),
    });

    return NextResponse.json({
      ok: true,
      assetId,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "complete error";
    console.error("[recordings/complete] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
