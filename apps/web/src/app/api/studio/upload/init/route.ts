import { generateId } from "@/lib/ulid";
import { createLogger } from "@/lib/logger";
import { db } from "@/server/db";
import { uploadJobsPg } from "@/server/db/schema";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

// Request validation schema
const InitUploadSchema = z.object({
  filename: z.string().min(1, "Filename is required"),
  contentType: z.string().min(1, "Content type is required"),
  fileSize: z.number().int().positive("File size must be positive"),
  producerId: z.string().min(1, "Producer ID is required"),
});

// Validation constants
const MAX_FILE_SIZE_BYTES = 500 * 1024 * 1024; // 500MB for studio uploads
const ALLOWED_AUDIO_MIMES = [
  "audio/wav",
  "audio/wave",
  "audio/x-wav",
  "audio/aiff",
  "audio/x-aiff",
  "audio/flac",
  "audio/x-flac",
];

export async function POST(req: NextRequest) {
  const logger = createLogger();

  try {
    const body = await req.json().catch(() => ({}));

    // Validate request body
    const parseResult = InitUploadSchema.safeParse(body);
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

    const { filename, contentType, fileSize, producerId } = parseResult.data;

    // Validate file size (500MB limit for studio uploads)
    if (fileSize > MAX_FILE_SIZE_BYTES) {
      const maxMB = MAX_FILE_SIZE_BYTES / 1024 / 1024;
      const fileMB = (fileSize / 1024 / 1024).toFixed(2);
      return NextResponse.json(
        {
          error: `File too large: ${fileMB}MB exceeds ${maxMB}MB limit`,
        },
        { status: 400 },
      );
    }

    // Validate MIME type (high-quality audio only for studio)
    if (!ALLOWED_AUDIO_MIMES.includes(contentType.toLowerCase())) {
      return NextResponse.json(
        {
          error: `Invalid file type: ${contentType}. Only high-quality audio files (WAV, AIFF, FLAC) are allowed for studio uploads.`,
          allowedTypes: ALLOWED_AUDIO_MIMES,
        },
        { status: 400 },
      );
    }

    // Generate unique file ID and storage key
    const fileId = generateId();
    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 10);
    const storageKey = `studio/${producerId}/${timestamp}-${random}-${filename}`;

    // Create upload job record
    await db.insert(uploadJobsPg).values({
      id: generateId(),
      userId: producerId,
      assetId: fileId, // Use fileId as assetId for now
      stage: "init",
      message: "Upload initialized",
      createdAt: new Date(),
    });

    // For now, return stub upload URL (will be replaced with real S3/R2)
    const uploadUrl = `https://httpbin.org/put?studio=true&fileId=${fileId}`;

    logger.info("Studio upload initialized", {
      fileId,
      producerId,
      filename,
      fileSize,
      contentType,
    });

    return NextResponse.json({
      fileId,
      uploadUrl,
      storageKey,
      contentType,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "init upload error";
    logger.error("[studio/upload/init] Error:", e instanceof Error ? e : new Error(message));
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
