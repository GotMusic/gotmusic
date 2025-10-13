import { type NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  // Stub: return a fake signed URL; later wire to S3/R2 getSignedUrl
  const url = `https://httpbin.org/bytes/1024?asset=${encodeURIComponent(params.id)}&sig=fake&ttl=300`;
  return NextResponse.json({ url, ttlSeconds: 300 });
}
