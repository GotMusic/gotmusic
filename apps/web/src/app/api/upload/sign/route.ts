import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

// Validation constants
const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024; // 100MB
const ALLOWED_AUDIO_MIMES = [
  "audio/mpeg", // .mp3
  "audio/mp3",
  "audio/wav",
  "audio/wave",
  "audio/x-wav",
  "audio/flac",
  "audio/x-flac",
  "audio/aac",
  "audio/aiff",
  "audio/x-aiff",
  "audio/ogg",
  "audio/opus",
  "audio/webm",
  "audio/mp4",
  "audio/m4a",
  "audio/x-m4a",
];

// Request validation schema
const SignRequestSchema = z.object({
  filename: z.string().min(1, "Filename is required"),
  contentType: z.string().min(1, "Content type is required"),
  fileSize: z.number().int().positive("File size must be positive"),
});

const DRIVER =
  process.env.GM_STORAGE_MODE === "stub" ? "stub" : (process.env.STORAGE_DRIVER ?? "stub");
const BUCKET = process.env.STORAGE_BUCKET ?? "";

function createS3Client(): S3Client | null {
  if (DRIVER === "stub") {
    return null;
  }

  if (DRIVER === "r2") {
    // Cloudflare R2 is S3-compatible. Endpoint uses the account ID.
    const account = process.env.R2_ACCOUNT_ID ?? "";
    const accessKeyId = process.env.R2_ACCESS_KEY_ID ?? "";
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY ?? "";

    if (!account || !accessKeyId || !secretAccessKey) {
      console.warn("[upload/sign] R2 credentials missing, falling back to stub");
      return null;
    }

    return new S3Client({
      region: "auto",
      endpoint: `https://${account}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId, secretAccessKey },
      forcePathStyle: true,
    });
  }

  // AWS S3
  const region = process.env.AWS_REGION ?? "us-east-1";
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID ?? "";
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY ?? "";

  if (!accessKeyId || !secretAccessKey) {
    console.warn("[upload/sign] AWS S3 credentials missing, falling back to stub");
    return null;
  }

  return new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    // Validate request body
    const parseResult = SignRequestSchema.safeParse(body);
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

    const { filename, contentType, fileSize } = parseResult.data;

    // Validate file size (100MB limit)
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

    // Validate MIME type (audio only)
    if (!ALLOWED_AUDIO_MIMES.includes(contentType.toLowerCase())) {
      return NextResponse.json(
        {
          error: `Invalid file type: ${contentType}. Only audio files are allowed.`,
          allowedTypes: ALLOWED_AUDIO_MIMES,
        },
        { status: 400 },
      );
    }

    const client = createS3Client();

    // Fallback to stub if credentials not configured
    if (!client || !BUCKET) {
      console.warn("[upload/sign] Using stub mode (httpbin)");
      return NextResponse.json({
        url: "https://httpbin.org/put",
        key: `stub/${filename}`,
        contentType,
      });
    }

    // Generate unique key: assets/{timestamp}-{random}-{filename}
    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 10);
    const key = `assets/${timestamp}-${random}-${filename}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: contentType,
    });

    // Generate pre-signed PUT URL (5 minutes expiry)
    const url = await getSignedUrl(client, command, { expiresIn: 60 * 5 });

    return NextResponse.json({ url, key, contentType });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "sign error";
    console.error("[upload/sign] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
