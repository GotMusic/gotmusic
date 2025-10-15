import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

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
    const filename = body.filename ?? "untitled";
    const contentType = body.contentType ?? "application/octet-stream";

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
