import { expect, test } from "@playwright/test";

const BASE_URL = `http://localhost:${process.env.PW_PORT || 4123}`;

/**
 * Contract test for GET /api/assets
 *
 * Validates the JSON shape, types, defaults, and enum values.
 * This catches breaking changes in the API contract (e.g., type coercion issues,
 * missing normalization, enum mismatches).
 */
test.describe("GET /api/assets - Contract", () => {
  test("should return valid JSON with correct types and structure", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/assets`);

    // Should return 200
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // Should have correct content type
    expect(response.headers()["content-type"]).toContain("application/json");

    const data = await response.json();

    // Top-level structure
    expect(data).toHaveProperty("items");
    expect(data).toHaveProperty("nextCursor");
    expect(Array.isArray(data.items)).toBeTruthy();
    expect(data.nextCursor === null || typeof data.nextCursor === "string").toBeTruthy();

    // Should have at least 1 asset (from seed)
    expect(data.items.length).toBeGreaterThanOrEqual(1);

    // Validate first asset structure and types
    const asset = data.items[0];

    // Required string fields
    expect(typeof asset.id).toBe("string");
    expect(asset.id.length).toBeGreaterThan(0);
    expect(typeof asset.title).toBe("string");
    expect(typeof asset.artist).toBe("string");
    expect(typeof asset.priceCurrency).toBe("string");

    // Nullable number fields
    expect(asset.bpm === null || typeof asset.bpm === "number").toBeTruthy();
    expect(asset.keySig === null || typeof asset.keySig === "string").toBeTruthy();

    // Price amount must be a number (not string!)
    expect(typeof asset.priceAmount).toBe("number");
    expect(asset.priceAmount).toBeGreaterThanOrEqual(0);

    // Status must be one of the valid enum values
    const validStatuses = ["draft", "published", "archived", "processing", "ready", "error"];
    expect(validStatuses).toContain(asset.status);

    // Timestamps must be numbers (epoch milliseconds, not Date objects!)
    expect(typeof asset.createdAt).toBe("number");
    expect(typeof asset.updatedAt).toBe("number");
    expect(asset.createdAt).toBeGreaterThan(0);
    expect(asset.updatedAt).toBeGreaterThan(0);

    // Timestamps should be valid dates
    const createdDate = new Date(asset.createdAt);
    const updatedDate = new Date(asset.updatedAt);
    expect(createdDate.toString()).not.toBe("Invalid Date");
    expect(updatedDate.toString()).not.toBe("Invalid Date");
  });

  test("should apply default values for query parameters", async ({ request }) => {
    // No query params - should use defaults (limit=20)
    const response = await request.get(`${BASE_URL}/api/assets`);
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(Array.isArray(data.items)).toBeTruthy();
    expect(data.items.length).toBeLessThanOrEqual(20);
  });

  test("should validate query parameters and return 400 for invalid input", async ({ request }) => {
    // Invalid limit (above max)
    const response1 = await request.get(`${BASE_URL}/api/assets?limit=200`);
    expect(response1.status()).toBe(400);
    const error1 = await response1.json();
    expect(error1.error).toBe("Invalid query parameters");

    // Invalid status enum
    const response2 = await request.get(`${BASE_URL}/api/assets?status=invalid`);
    expect(response2.status()).toBe(400);
    const error2 = await response2.json();
    expect(error2.error).toBe("Invalid query parameters");

    // Invalid limit (non-number)
    const response3 = await request.get(`${BASE_URL}/api/assets?limit=abc`);
    expect(response3.status()).toBe(400);
    const error3 = await response3.json();
    expect(error3.error).toBe("Invalid query parameters");
  });

  test("should include X-Total-Count header when no filters applied", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/assets`);
    expect(response.ok()).toBeTruthy();

    const totalCount = response.headers()["x-total-count"];
    expect(totalCount).toBeDefined();
    expect(Number.parseInt(totalCount as string, 10)).toBeGreaterThanOrEqual(1);
  });

  test("should handle empty results gracefully", async ({ request }) => {
    // Search for something that doesn't exist
    const response = await request.get(`${BASE_URL}/api/assets?q=nonexistent-xyz-12345`);
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.items).toEqual([]);
    expect(data.nextCursor).toBeNull();
  });
});
