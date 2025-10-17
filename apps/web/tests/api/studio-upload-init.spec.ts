import { describe, expect, it } from "@jest/globals";

const BASE_URL = "http://localhost:3000";

describe("POST /api/studio/upload/init", () => {
  it("returns 400 when producerId is missing", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/upload/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: "track.wav",
        contentType: "audio/wav",
        fileSize: 1024,
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("producerId");
  });

  it("returns 400 when filename is missing", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/upload/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        producerId: "producer_123",
        contentType: "audio/wav",
        fileSize: 1024,
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("filename");
  });

  it("returns 400 when contentType is missing", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/upload/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        producerId: "producer_123",
        filename: "track.wav",
        fileSize: 1024,
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("contentType");
  });

  it("returns 400 when fileSize is missing", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/upload/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        producerId: "producer_123",
        filename: "track.wav",
        contentType: "audio/wav",
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("fileSize");
  });

  it("returns 400 when fileSize is not positive", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/upload/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        producerId: "producer_123",
        filename: "track.wav",
        contentType: "audio/wav",
        fileSize: 0,
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details.fileSize).toBeTruthy();
  });

  it("returns 400 when file is too large (over 500MB)", async () => {
    const size501MB = 501 * 1024 * 1024;
    const res = await fetch(`${BASE_URL}/api/studio/upload/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        producerId: "producer_123",
        filename: "large-track.wav",
        contentType: "audio/wav",
        fileSize: size501MB,
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain("File too large");
    expect(json.error).toContain("501.00MB");
    expect(json.error).toContain("500MB limit");
  });

  it("returns 400 when contentType is not a high-quality audio format", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/upload/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        producerId: "producer_123",
        filename: "track.mp3",
        contentType: "audio/mpeg",
        fileSize: 1024,
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain("Invalid file type");
    expect(json.error).toContain("audio/mpeg");
    expect(json.error).toContain("high-quality audio files");
    expect(json.allowedTypes).toBeDefined();
    expect(Array.isArray(json.allowedTypes)).toBeTruthy();
  });

  it("returns 200 and creates upload job for valid WAV file", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/upload/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        producerId: "producer_123",
        filename: "track.wav",
        contentType: "audio/wav",
        fileSize: 10 * 1024 * 1024, // 10MB
      }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty("fileId");
    expect(json).toHaveProperty("uploadUrl");
    expect(json).toHaveProperty("storageKey");
    expect(json).toHaveProperty("contentType", "audio/wav");
    expect(typeof json.fileId).toBe("string");
    expect(json.fileId.length).toBeGreaterThan(0);
    expect(json.storageKey).toMatch(/^studio\/producer_123\//);
  });

  it("returns 200 for valid AIFF file", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/upload/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        producerId: "producer_456",
        filename: "track.aiff",
        contentType: "audio/aiff",
        fileSize: 5 * 1024 * 1024, // 5MB
      }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.contentType).toBe("audio/aiff");
    expect(json.storageKey).toMatch(/^studio\/producer_456\//);
  });

  it("returns 200 for valid FLAC file", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/upload/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        producerId: "producer_789",
        filename: "track.flac",
        contentType: "audio/flac",
        fileSize: 8 * 1024 * 1024, // 8MB
      }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.contentType).toBe("audio/flac");
    expect(json.storageKey).toMatch(/^studio\/producer_789\//);
  });

  it("handles case-insensitive MIME type matching", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/upload/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        producerId: "producer_123",
        filename: "track.wav",
        contentType: "AUDIO/WAV", // uppercase
        fileSize: 1024,
      }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.contentType).toBe("AUDIO/WAV");
  });

  it("generates unique file IDs for multiple requests", async () => {
    const res1 = await fetch(`${BASE_URL}/api/studio/upload/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        producerId: "producer_123",
        filename: "track1.wav",
        contentType: "audio/wav",
        fileSize: 1024,
      }),
    });

    const res2 = await fetch(`${BASE_URL}/api/studio/upload/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        producerId: "producer_123",
        filename: "track2.wav",
        contentType: "audio/wav",
        fileSize: 1024,
      }),
    });

    expect(res1.status).toBe(200);
    expect(res2.status).toBe(200);

    const json1 = await res1.json();
    const json2 = await res2.json();

    expect(json1.fileId).not.toBe(json2.fileId);
    expect(json1.storageKey).not.toBe(json2.storageKey);
  });
});
