import { createLogger } from "@/lib/logger";
import { generateId } from "@/lib/ulid";
import { db } from "@/server/db";
import { assetsPg, uploadJobsPg } from "@/server/db/schema";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

// Request validation schema
const CompleteUploadSchema = z.object({
  fileId: z.string().min(1, "File ID is required"),
  producerId: z.string().min(1, "Producer ID is required"),
  storageKey: z.string().min(1, "Storage key is required"),
  title: z.string().min(1, "Title is required").max(200),
  // Note: type, genre, mood fields will be added to schema in future updates
  // For now, we'll store them in the artist field or as JSON in a future field
  bpm: z.number().int().positive().optional(),
  keySig: z.string().max(10).optional(),
});

export async function POST(req: NextRequest) {
  const logger = createLogger();

  try {
    const body = await req.json().catch(() => ({}));

    // Validate request body
    const parseResult = CompleteUploadSchema.safeParse(body);
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

    const { fileId, producerId, storageKey, title, bpm, keySig } = parseResult.data;

    // Create asset record
    const assetId = generateId();
    await db.insert(assetsPg).values({
      id: assetId,
      title,
      artist: producerId, // Producer is the artist
      ownerId: producerId,
      bpm: bpm || null,
      keySig: keySig || null,
      status: "draft", // Start as draft, producer can publish later
      fileCid: storageKey, // Use storage key as CID for now
      storageKey,
      priceAmount: "0", // Free by default, producer can set price later
      priceCurrency: "USD",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Update upload job record
    await db.insert(uploadJobsPg).values({
      id: generateId(),
      userId: producerId,
      assetId,
      stage: "done",
      message: "Upload completed, asset created",
      createdAt: new Date(),
    });

    logger.info("Studio upload completed", {
      fileId,
      assetId,
      producerId,
      title,
    });

    return NextResponse.json({
      ok: true,
      assetId,
      message: "Upload completed successfully. Asset is now in draft status.",
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "complete upload error";
    logger.error("[studio/upload/complete] Error:", e instanceof Error ? e : new Error(message));
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
