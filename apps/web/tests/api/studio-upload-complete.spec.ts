import { describe, expect, it } from "@jest/globals";

const BASE_URL = "http://localhost:3000";

describe("POST /api/studio/upload/complete", () => {
  it("returns 400 when fileId is missing", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/upload/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        producerId: "producer_123",
        storageKey: "studio/producer_123/test.wav",
        title: "My Track",
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("fileId");
  });

  it("returns 400 when producerId is missing", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/upload/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileId: "file_123",
        storageKey: "studio/producer_123/test.wav",
        title: "My Track",
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("producerId");
  });

  it("returns 400 when storageKey is missing", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/upload/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileId: "file_123",
        producerId: "producer_123",
        title: "My Track",
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("storageKey");
  });

  it("returns 400 when title is missing", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/upload/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileId: "file_123",
        producerId: "producer_123",
        storageKey: "studio/producer_123/test.wav",
        type: "beat",
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("title");
  });

  // Note: type field removed from schema - will be added in future updates

  it("returns 400 when title is too long", async () => {
    const longTitle = "a".repeat(201);
    const res = await fetch(`${BASE_URL}/api/studio/upload/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileId: "file_123",
        producerId: "producer_123",
        storageKey: "studio/producer_123/test.wav",
        title: longTitle,
        type: "beat",
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details.title).toBeTruthy();
  });

  // Note: type validation removed - will be added in future updates

  it("returns 200 and creates asset with minimal required fields", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/upload/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileId: "file_123",
        producerId: "producer_123",
        storageKey: "studio/producer_123/test.wav",
        title: "My Track",
      }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty("ok", true);
    expect(json).toHaveProperty("assetId");
    expect(json).toHaveProperty("message");
    expect(typeof json.assetId).toBe("string");
    expect(json.assetId.length).toBeGreaterThan(0);
    expect(json.message).toContain("Upload completed successfully");
  });

  it("returns 200 and creates asset with all optional fields", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/upload/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileId: "file_456",
        producerId: "producer_456",
        storageKey: "studio/producer_456/track.wav",
        title: "Amazing Track",
        bpm: 128,
        keySig: "C major",
      }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty("ok", true);
    expect(json).toHaveProperty("assetId");
    expect(json.assetId.length).toBeGreaterThan(0);
  });

  // Note: asset type validation removed - will be added in future updates

  it("validates BPM is positive integer", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/upload/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileId: "file_123",
        producerId: "producer_123",
        storageKey: "studio/producer_123/test.wav",
        title: "My Track",
        bpm: -1,
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details.bpm).toBeTruthy();
  });

  it("validates keySig length", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/upload/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileId: "file_123",
        producerId: "producer_123",
        storageKey: "studio/producer_123/test.wav",
        title: "My Track",
        keySig: "This key signature is way too long",
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details.keySig).toBeTruthy();
  });
});
