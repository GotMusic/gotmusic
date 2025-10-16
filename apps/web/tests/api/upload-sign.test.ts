/**
 * Tests for /api/upload/sign validation
 *
 * Verifies file size and MIME type validation before signing uploads.
 */

import { describe, expect, it } from "@jest/globals";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

describe("/api/upload/sign validation", () => {
  it("rejects missing filename", async () => {
    const res = await fetch(`${API_BASE}/api/upload/sign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contentType: "audio/mpeg",
        fileSize: 1024,
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details?.filename).toBeDefined();
  });

  it("rejects missing contentType", async () => {
    const res = await fetch(`${API_BASE}/api/upload/sign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: "test.mp3",
        fileSize: 1024,
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details?.contentType).toBeDefined();
  });

  it("rejects missing fileSize", async () => {
    const res = await fetch(`${API_BASE}/api/upload/sign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: "test.mp3",
        contentType: "audio/mpeg",
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details?.fileSize).toBeDefined();
  });

  it("rejects files larger than 100MB", async () => {
    const size101MB = 101 * 1024 * 1024;
    const res = await fetch(`${API_BASE}/api/upload/sign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: "large.mp3",
        contentType: "audio/mpeg",
        fileSize: size101MB,
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain("File too large");
    expect(json.error).toContain("101.00MB");
    expect(json.error).toContain("100MB limit");
  });

  it("rejects non-audio MIME types", async () => {
    const res = await fetch(`${API_BASE}/api/upload/sign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: "test.pdf",
        contentType: "application/pdf",
        fileSize: 1024,
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain("Invalid file type");
    expect(json.error).toContain("application/pdf");
    expect(json.error).toContain("Only audio files are allowed");
    expect(json.allowedTypes).toBeDefined();
    expect(Array.isArray(json.allowedTypes)).toBe(true);
  });

  it("accepts valid audio/mpeg file under 100MB", async () => {
    const res = await fetch(`${API_BASE}/api/upload/sign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: "test.mp3",
        contentType: "audio/mpeg",
        fileSize: 5 * 1024 * 1024, // 5MB
      }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.url).toBeDefined();
    expect(json.key).toBeDefined();
    expect(json.contentType).toBe("audio/mpeg");
  });

  it("accepts valid audio/wav file", async () => {
    const res = await fetch(`${API_BASE}/api/upload/sign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: "test.wav",
        contentType: "audio/wav",
        fileSize: 10 * 1024 * 1024, // 10MB
      }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.url).toBeDefined();
  });

  it("accepts valid audio/flac file", async () => {
    const res = await fetch(`${API_BASE}/api/upload/sign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: "test.flac",
        contentType: "audio/flac",
        fileSize: 20 * 1024 * 1024, // 20MB
      }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.url).toBeDefined();
  });

  it("accepts file exactly at 100MB limit", async () => {
    const size100MB = 100 * 1024 * 1024;
    const res = await fetch(`${API_BASE}/api/upload/sign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: "max-size.mp3",
        contentType: "audio/mpeg",
        fileSize: size100MB,
      }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.url).toBeDefined();
  });

  it("handles case-insensitive MIME type matching", async () => {
    const res = await fetch(`${API_BASE}/api/upload/sign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: "test.mp3",
        contentType: "AUDIO/MPEG", // uppercase
        fileSize: 1024,
      }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.url).toBeDefined();
  });
});

