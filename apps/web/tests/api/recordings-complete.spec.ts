import { describe, expect, it } from "@jest/globals";

const BASE_URL = "http://localhost:3000";

describe("POST /api/recordings/complete", () => {
  it("returns 400 when body is missing", async () => {
    const res = await fetch(`${BASE_URL}/api/recordings/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("userId");
    expect(json.details).toHaveProperty("fileKey");
    expect(json.details).toHaveProperty("cid");
    expect(json.details).toHaveProperty("durationSec");
  });

  it("returns 400 when userId is missing", async () => {
    const res = await fetch(`${BASE_URL}/api/recordings/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileKey: "recordings/test.m4a",
        cid: "QmTest123",
        durationSec: 120,
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("userId");
  });

  it("returns 400 when fileKey is missing", async () => {
    const res = await fetch(`${BASE_URL}/api/recordings/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "user_test123",
        cid: "QmTest123",
        durationSec: 120,
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("fileKey");
  });

  it("returns 400 when cid is missing", async () => {
    const res = await fetch(`${BASE_URL}/api/recordings/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "user_test123",
        fileKey: "recordings/test.m4a",
        durationSec: 120,
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("cid");
  });

  it("returns 400 when durationSec is missing", async () => {
    const res = await fetch(`${BASE_URL}/api/recordings/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "user_test123",
        fileKey: "recordings/test.m4a",
        cid: "QmTest123",
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("durationSec");
  });

  it("returns 400 when durationSec is not positive", async () => {
    const res = await fetch(`${BASE_URL}/api/recordings/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "user_test123",
        fileKey: "recordings/test.m4a",
        cid: "QmTest123",
        durationSec: 0,
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details.durationSec).toBeTruthy();
  });

  it("returns 400 when durationSec is not an integer", async () => {
    const res = await fetch(`${BASE_URL}/api/recordings/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "user_test123",
        fileKey: "recordings/test.m4a",
        cid: "QmTest123",
        durationSec: 120.5,
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details.durationSec).toBeTruthy();
  });

  it("returns 200 and creates draft asset with default title", async () => {
    const res = await fetch(`${BASE_URL}/api/recordings/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "user_test123",
        fileKey: "recordings/test-recording.m4a",
        cid: "QmTestCID123456",
        durationSec: 180,
      }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty("ok", true);
    expect(json).toHaveProperty("assetId");
    expect(typeof json.assetId).toBe("string");
    expect(json.assetId.length).toBeGreaterThan(0);

    // Verify asset was created by fetching it
    const assetRes = await fetch(`${BASE_URL}/api/assets/${json.assetId}`);
    expect(assetRes.status).toBe(200);
    const asset = await assetRes.json();
    expect(asset.id).toBe(json.assetId);
    expect(asset.ownerId).toBe("user_test123");
    expect(asset.title).toBe("Recording"); // Default title
    expect(asset.durationSec).toBe(180);
    expect(asset.status).toBe("draft");
    expect(asset.fileCid).toBe("QmTestCID123456");
    expect(asset.storageKey).toBe("recordings/test-recording.m4a");
  });

  it("returns 200 and creates draft asset with custom title", async () => {
    const res = await fetch(`${BASE_URL}/api/recordings/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "user_test123",
        fileKey: "recordings/my-song.m4a",
        cid: "QmCustomCID789",
        durationSec: 240,
        title: "My Amazing Song",
      }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty("ok", true);
    expect(json).toHaveProperty("assetId");

    // Verify asset was created with custom title
    const assetRes = await fetch(`${BASE_URL}/api/assets/${json.assetId}`);
    expect(assetRes.status).toBe(200);
    const asset = await assetRes.json();
    expect(asset.title).toBe("My Amazing Song");
  });

  it("creates upload job record with done stage", async () => {
    const res = await fetch(`${BASE_URL}/api/recordings/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "user_test456",
        fileKey: "recordings/job-test.m4a",
        cid: "QmJobTestCID",
        durationSec: 90,
      }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.assetId).toBeTruthy();

    // Note: We can't directly query upload_jobs from the API yet,
    // but we verify the endpoint succeeded and asset was created.
    // Upload job creation is verified through database inspection in E2E tests.
  });

  it("handles multiple uploads for same user", async () => {
    const userId = "user_multi123";

    // First upload
    const res1 = await fetch(`${BASE_URL}/api/recordings/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        fileKey: "recordings/song1.m4a",
        cid: "QmSong1",
        durationSec: 120,
        title: "Song 1",
      }),
    });
    expect(res1.status).toBe(200);
    const json1 = await res1.json();

    // Second upload
    const res2 = await fetch(`${BASE_URL}/api/recordings/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        fileKey: "recordings/song2.m4a",
        cid: "QmSong2",
        durationSec: 150,
        title: "Song 2",
      }),
    });
    expect(res2.status).toBe(200);
    const json2 = await res2.json();

    // Verify both assets exist and have different IDs
    expect(json1.assetId).not.toBe(json2.assetId);

    const asset1 = await fetch(`${BASE_URL}/api/assets/${json1.assetId}`);
    const asset2 = await fetch(`${BASE_URL}/api/assets/${json2.assetId}`);

    expect(asset1.status).toBe(200);
    expect(asset2.status).toBe(200);

    const data1 = await asset1.json();
    const data2 = await asset2.json();

    expect(data1.ownerId).toBe(userId);
    expect(data2.ownerId).toBe(userId);
    expect(data1.title).toBe("Song 1");
    expect(data2.title).toBe("Song 2");
  });

  it("handles very short recordings (1 second)", async () => {
    const res = await fetch(`${BASE_URL}/api/recordings/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "user_short",
        fileKey: "recordings/short.m4a",
        cid: "QmShortCID",
        durationSec: 1,
        title: "Very Short",
      }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);

    const assetRes = await fetch(`${BASE_URL}/api/assets/${json.assetId}`);
    const asset = await assetRes.json();
    expect(asset.durationSec).toBe(1);
  });

  it("handles long recordings (1 hour)", async () => {
    const res = await fetch(`${BASE_URL}/api/recordings/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "user_long",
        fileKey: "recordings/long.m4a",
        cid: "QmLongCID",
        durationSec: 3600, // 1 hour
        title: "Long Recording",
      }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);

    const assetRes = await fetch(`${BASE_URL}/api/assets/${json.assetId}`);
    const asset = await assetRes.json();
    expect(asset.durationSec).toBe(3600);
  });
});
