import { expect, test } from "@playwright/test";

test.describe("POST /api/recordings/complete", () => {
  test("should complete recording and create draft asset", async ({ request }) => {
    const response = await request.post("/api/recordings/complete", {
      data: {
        userId: "test-user-123",
        fileKey: "recordings/test-recording.wav",
        cid: "QmTestCid123",
        durationSec: 120,
        title: "Test Recording",
      },
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.ok).toBe(true);
    expect(data.assetId).toBeDefined();
  });

  test("should validate required fields", async ({ request }) => {
    const response = await request.post("/api/recordings/complete", {
      data: {
        userId: "",
        fileKey: "",
        cid: "",
        durationSec: -1,
      },
    });

    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.error).toBe("Validation failed");
    expect(data.details).toBeDefined();
  });

  test("should handle missing optional title", async ({ request }) => {
    const response = await request.post("/api/recordings/complete", {
      data: {
        userId: "test-user-123",
        fileKey: "recordings/test-recording.wav",
        cid: "QmTestCid123",
        durationSec: 120,
      },
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.ok).toBe(true);
  });
});
