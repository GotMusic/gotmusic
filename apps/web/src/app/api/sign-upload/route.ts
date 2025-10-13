import { NextResponse } from "next/server";

export async function POST() {
  // Stubbed response for local dev & tests
  return NextResponse.json({
    signedUrl: "https://example.com/upload-stub",
    fields: { key: "uploads/test-tone.mp3" },
  });
}


