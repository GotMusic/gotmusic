import { expect, test } from "@playwright/test";

test.describe("Security Rate Limiting", () => {
  test("should rate limit upload endpoints", async ({ request }) => {
    // Test normal rate limit
    const responses = [];
    for (let i = 0; i < 5; i++) {
      const response = await request.post("/api/upload/sign", {
        data: {
          filename: "test.wav",
          contentType: "audio/wav",
          fileSize: 1024,
        },
      });
      responses.push(response.status());
    }

    // First few requests should succeed
    expect(responses.slice(0, 3)).toContain(200);

    // Test rate limit exceeded
    const rateLimitResponse = await request.post("/api/upload/sign", {
      data: {
        filename: "test.wav",
        contentType: "audio/wav",
        fileSize: 1024,
      },
    });

    expect(rateLimitResponse.status()).toBe(429);
    const rateLimitData = await rateLimitResponse.json();
    expect(rateLimitData.error).toContain("Too many requests");
    expect(rateLimitData.retryAfter).toBeDefined();
  });

  test("should rate limit download endpoints", async ({ request }) => {
    // Test download rate limiting (stricter limits)
    const responses = [];
    for (let i = 0; i < 3; i++) {
      const response = await request.get("/api/assets/test-asset/download?buyer=0x123");
      responses.push(response.status());
    }

    // Should hit rate limit faster for downloads
    const rateLimitResponse = await request.get("/api/assets/test-asset/download?buyer=0x123");
    expect(rateLimitResponse.status()).toBe(429);
  });

  test("should rate limit credit operations", async ({ request }) => {
    // Test credit spend rate limiting
    const responses = [];
    for (let i = 0; i < 8; i++) {
      const response = await request.post("/api/credits/spend", {
        data: {
          userId: "test-user",
          assetId: "test-asset",
          amount: 10,
        },
      });
      responses.push(response.status());
    }

    // Should hit rate limit
    const rateLimitResponse = await request.post("/api/credits/spend", {
      data: {
        userId: "test-user",
        assetId: "test-asset",
        amount: 10,
      },
    });

    expect(rateLimitResponse.status()).toBe(429);
    const rateLimitData = await rateLimitResponse.json();
    expect(rateLimitData.cooldownRemaining).toBeDefined();
  });

  test("should include proper rate limit headers", async ({ request }) => {
    const response = await request.post("/api/upload/sign", {
      data: {
        filename: "test.wav",
        contentType: "audio/wav",
        fileSize: 1024,
      },
    });

    expect(response.headers()["x-ratelimit-limit"]).toBeDefined();
    expect(response.headers()["x-ratelimit-remaining"]).toBeDefined();
    expect(response.headers()["x-ratelimit-reset"]).toBeDefined();
  });
});
