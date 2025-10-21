import { expect, test } from "@playwright/test";

const BASE_URL = `http://localhost:${process.env.PW_PORT || 4123}`;

test.describe("GET /api/assets - Pagination & Filters", () => {
  test("@smoke should return paginated results with default limit", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/assets`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const data = await response.json();

    // Should have items array and nextCursor field
    expect(data).toHaveProperty("items");
    expect(data).toHaveProperty("nextCursor");
    expect(Array.isArray(data.items)).toBeTruthy();

    // Default limit is 20
    expect(data.items.length).toBeLessThanOrEqual(20);
  });

  test("should respect custom limit parameter", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/assets?limit=5`);

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.items.length).toBeLessThanOrEqual(5);
  });

  test("should reject limit above maximum", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/assets?limit=200`);

    expect(response.status()).toBe(400);
    const data = await response.json();

    expect(data.error).toBe("Invalid query parameters");
    expect(data.details).toBeDefined();
  });

  test("should reject invalid limit (non-integer)", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/assets?limit=abc`);

    expect(response.status()).toBe(400);
    const data = await response.json();

    expect(data.error).toBe("Invalid query parameters");
  });

  test("should reject invalid status enum", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/assets?status=invalid`);

    expect(response.status()).toBe(400);
    const data = await response.json();

    expect(data.error).toBe("Invalid query parameters");
  });

  test("should filter by valid status", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/assets?status=ready`);

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    // All returned items should have status "ready"
    for (const item of data.items) {
      expect(item.status).toBe("ready");
    }
  });

  test("should support search query parameter", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/assets?q=test`);

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(Array.isArray(data.items)).toBeTruthy();
    // Items should match search query (title or artist contains "test")
  });

  test("should reject search query that is too long", async ({ request }) => {
    const longQuery = "a".repeat(201);
    const response = await request.get(`${BASE_URL}/api/assets?q=${longQuery}`);

    expect(response.status()).toBe(400);
    const data = await response.json();

    expect(data.error).toBe("Invalid query parameters");
  });

  test("should handle cursor-based pagination", async ({ request }) => {
    // Get first page
    const firstPage = await request.get(`${BASE_URL}/api/assets?limit=3`);
    expect(firstPage.ok()).toBeTruthy();

    const firstData = await firstPage.json();

    // If there's a nextCursor, fetch second page
    if (firstData.nextCursor) {
      const secondPage = await request.get(
        `${BASE_URL}/api/assets?limit=3&cursor=${firstData.nextCursor}`,
      );
      expect(secondPage.ok()).toBeTruthy();

      const secondData = await secondPage.json();

      // Second page should have different items
      expect(secondData.items.length).toBeGreaterThan(0);

      // Items should not overlap
      const firstIds = new Set(firstData.items.map((item: { id: string }) => item.id));
      for (const item of secondData.items) {
        expect(firstIds.has(item.id)).toBe(false);
      }
    }
  });

  test("should return null nextCursor when no more results", async ({ request }) => {
    // Request a very large limit
    const response = await request.get(`${BASE_URL}/api/assets?limit=100`);
    expect(response.ok()).toBeTruthy();

    const data = await response.json();

    // If items < limit, nextCursor should be null
    if (data.items.length < 100) {
      expect(data.nextCursor).toBeNull();
    }
  });

  test("should return X-Total-Count header when no filters applied", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/assets`);

    expect(response.ok()).toBeTruthy();

    // X-Total-Count header should be present
    const totalCount = response.headers()["x-total-count"];
    expect(totalCount).toBeDefined();
    if (totalCount) {
      expect(Number.parseInt(totalCount, 10)).toBeGreaterThanOrEqual(0);
    }
  });

  test("should combine multiple filters", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/assets?status=ready&limit=5&q=loop`);

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.items.length).toBeLessThanOrEqual(5);

    // All items should match both filters
    for (const item of data.items) {
      expect(item.status).toBe("ready");
    }
  });

  test("should handle empty result set gracefully", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/assets?q=nonexistent-xyz-12345`);

    expect(response.ok()).toBeTruthy();
    const data = await response.json();

    expect(data.items).toEqual([]);
    expect(data.nextCursor).toBeNull();
  });
});
