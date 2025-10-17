/**
 * Tests for /api/recordings/sign validation and rate limiting
 *
 * Verifies recordings-specific signing endpoint with recordings/ prefix enforcement.
 * Tests file size, MIME type validation, and rate limiting (30 requests/min per IP).
 */

import { expect, test } from "@playwright/test";

const BASE_URL = `http://localhost:${process.env.PW_PORT || 4123}`;

test.describe("/api/recordings/sign validation", () => {
  test("rejects missing filename", async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/recordings/sign`, {
      data: {
        contentType: "audio/m4a",
        fileSize: 1024,
      },
    });

    expect(res.status()).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details?.filename).toBeDefined();
  });

  test("rejects missing contentType", async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/recordings/sign`, {
      data: {
        filename: "recording.m4a",
        fileSize: 1024,
      },
    });

    expect(res.status()).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details?.contentType).toBeDefined();
  });

  test("rejects missing fileSize", async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/recordings/sign`, {
      data: {
        filename: "recording.m4a",
        contentType: "audio/m4a",
      },
    });

    expect(res.status()).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details?.fileSize).toBeDefined();
  });

  test("rejects files larger than 100MB", async ({ request }) => {
    const size101MB = 101 * 1024 * 1024;
    const res = await request.post(`${BASE_URL}/api/recordings/sign`, {
      data: {
        filename: "large-recording.wav",
        contentType: "audio/wav",
        fileSize: size101MB,
      },
    });

    expect(res.status()).toBe(400);
    const json = await res.json();
    expect(json.error).toContain("File too large");
    expect(json.error).toContain("101.00MB");
    expect(json.error).toContain("100MB limit");
  });

  test("rejects non-audio MIME types", async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/recordings/sign`, {
      data: {
        filename: "document.pdf",
        contentType: "application/pdf",
        fileSize: 1024,
      },
    });

    expect(res.status()).toBe(400);
    const json = await res.json();
    expect(json.error).toContain("Invalid file type");
    expect(json.error).toContain("application/pdf");
    expect(json.error).toContain("Only audio files are allowed");
    expect(json.allowedTypes).toBeDefined();
    expect(Array.isArray(json.allowedTypes)).toBeTruthy();
  });

  test("accepts valid audio/m4a file under 100MB", async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/recordings/sign`, {
      data: {
        filename: "recording.m4a",
        contentType: "audio/m4a",
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    });

    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json.url).toBeDefined();
    expect(json.key).toBeDefined();
    expect(json.contentType).toBe("audio/m4a");
    
    // Verify recordings/ prefix
    expect(json.key).toMatch(/^recordings\//);
  });

  test("accepts valid audio/wav file", async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/recordings/sign`, {
      data: {
        filename: "voice-memo.wav",
        contentType: "audio/wav",
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    });

    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json.url).toBeDefined();
    expect(json.key).toMatch(/^recordings\//);
  });

  test("accepts valid audio/mpeg file", async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/recordings/sign`, {
      data: {
        filename: "recording.mp3",
        contentType: "audio/mpeg",
        fileSize: 8 * 1024 * 1024, // 8MB
      },
    });

    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json.url).toBeDefined();
    expect(json.key).toMatch(/^recordings\//);
  });

  test("accepts file exactly at 100MB limit", async ({ request }) => {
    const size100MB = 100 * 1024 * 1024;
    const res = await request.post(`${BASE_URL}/api/recordings/sign`, {
      data: {
        filename: "max-size-recording.wav",
        contentType: "audio/wav",
        fileSize: size100MB,
      },
    });

    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json.url).toBeDefined();
    expect(json.key).toMatch(/^recordings\//);
  });

  test("handles case-insensitive MIME type matching", async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/recordings/sign`, {
      data: {
        filename: "recording.m4a",
        contentType: "AUDIO/M4A", // uppercase
        fileSize: 1024,
      },
    });

    expect(res.status()).toBe(200);
    const json = await res.json();
    expect(json.url).toBeDefined();
    expect(json.key).toMatch(/^recordings\//);
  });

  test("key includes timestamp and random component", async ({ request }) => {
    const res1 = await request.post(`${BASE_URL}/api/recordings/sign`, {
      data: {
        filename: "test.m4a",
        contentType: "audio/m4a",
        fileSize: 1024,
      },
    });

    const res2 = await request.post(`${BASE_URL}/api/recordings/sign`, {
      data: {
        filename: "test.m4a",
        contentType: "audio/m4a",
        fileSize: 1024,
      },
    });

    expect(res1.status()).toBe(200);
    expect(res2.status()).toBe(200);

    const json1 = await res1.json();
    const json2 = await res2.json();

    // Keys should be different (unique)
    expect(json1.key).not.toBe(json2.key);
    
    // Both should have recordings/ prefix
    expect(json1.key).toMatch(/^recordings\//);
    expect(json2.key).toMatch(/^recordings\//);
  });
});

test.describe("/api/recordings/sign rate limiting", () => {
  test("allows requests within rate limit and includes rate limit headers", async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/recordings/sign`, {
      data: {
        filename: "test-recording.m4a",
        contentType: "audio/m4a",
        fileSize: 1024,
      },
    });

    expect(res.status()).toBe(200);
    expect(res.headers()["x-ratelimit-limit"]).toBe("30");
    expect(res.headers()["x-ratelimit-remaining"]).toBeDefined();
    expect(res.headers()["x-ratelimit-reset"]).toBeDefined();

    const remaining = Number.parseInt(res.headers()["x-ratelimit-remaining"] || "0", 10);
    expect(remaining).toBeGreaterThanOrEqual(0);
    expect(remaining).toBeLessThanOrEqual(30);
  });

  test("returns 429 after exceeding rate limit (30 requests/min)", async ({ request }) => {
    // Make 31 requests rapidly to exceed the limit
    const requests = Array.from({ length: 31 }, () =>
      request.post(`${BASE_URL}/api/recordings/sign`, {
        data: {
          filename: "test.m4a",
          contentType: "audio/m4a",
          fileSize: 1024,
        },
        headers: {
          // Use a unique test IP to avoid interfering with other tests
          "X-Forwarded-For": "203.0.113.150",
        },
      }),
    );

    const responses = await Promise.all(requests);

    // First 30 should succeed
    const successful = responses.filter((r) => r.status() === 200);
    const rateLimited = responses.filter((r) => r.status() === 429);

    expect(successful.length).toBe(30);
    expect(rateLimited.length).toBe(1);

    // Check the 429 response
    const limitedResponse = rateLimited[0];
    if (!limitedResponse) throw new Error("No 429 response found");

    expect(limitedResponse.headers()["retry-after"]).toBeDefined();
    expect(limitedResponse.headers()["x-ratelimit-limit"]).toBe("30");
    expect(limitedResponse.headers()["x-ratelimit-remaining"]).toBe("0");
    expect(limitedResponse.headers()["x-ratelimit-reset"]).toBeDefined();

    const json = await limitedResponse.json();
    expect(json.error).toContain("Too many requests");
    expect(json.retryAfter).toBeGreaterThan(0);
  });

  test("rate limit applies per IP address", async ({ request }) => {
    // Make requests from two different IPs
    const ip1Requests = Array.from({ length: 5 }, () =>
      request.post(`${BASE_URL}/api/recordings/sign`, {
        data: {
          filename: "recording1.m4a",
          contentType: "audio/m4a",
          fileSize: 1024,
        },
        headers: {
          "X-Forwarded-For": "203.0.113.151",
        },
      }),
    );

    const ip2Requests = Array.from({ length: 5 }, () =>
      request.post(`${BASE_URL}/api/recordings/sign`, {
        data: {
          filename: "recording2.m4a",
          contentType: "audio/m4a",
          fileSize: 1024,
        },
        headers: {
          "X-Forwarded-For": "203.0.113.152",
        },
      }),
    );

    const ip1Responses = await Promise.all(ip1Requests);
    const ip2Responses = await Promise.all(ip2Requests);

    // Both IPs should have all requests succeed (within their own limits)
    expect(ip1Responses.every((r) => r.status() === 200)).toBe(true);
    expect(ip2Responses.every((r) => r.status() === 200)).toBe(true);
  });

  test("rate limit remaining count decrements correctly", async ({ request }) => {
    const ip = "203.0.113.153";

    // Make 3 requests and check remaining count
    for (let i = 0; i < 3; i++) {
      const res = await request.post(`${BASE_URL}/api/recordings/sign`, {
        data: {
          filename: `recording${i}.m4a`,
          contentType: "audio/m4a",
          fileSize: 1024,
        },
        headers: {
          "X-Forwarded-For": ip,
        },
      });

      expect(res.status()).toBe(200);

      const remaining = Number.parseInt(res.headers()["x-ratelimit-remaining"] || "0", 10);
      expect(remaining).toBeLessThanOrEqual(30 - (i + 1));
    }
  });
});

