import { NextResponse } from "next/server";

export async function POST() {
  // Align to { url, fields } shape expected by useUpload
  return NextResponse.json({
    url: "https://httpbin.org/put", // simple PUT target for stub
    fields: null,
  });
}


