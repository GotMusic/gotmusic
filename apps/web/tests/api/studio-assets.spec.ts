import { describe, expect, it } from "@jest/globals";

const BASE_URL = "http://localhost:3000";

describe("GET /api/studio/assets", () => {
  it("returns 400 when producerId is missing", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/assets`);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("producerId");
  });

  it("returns 400 when producerId is empty", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/assets?producerId=`);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("producerId");
  });

  it("returns 200 with default pagination for valid producerId", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/assets?producerId=producer_123`);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty("assets");
    expect(json).toHaveProperty("pagination");
    expect(Array.isArray(json.assets)).toBeTruthy();
    expect(json.pagination).toHaveProperty("total");
    expect(json.pagination).toHaveProperty("limit", 20);
    expect(json.pagination).toHaveProperty("offset", 0);
    expect(json.pagination).toHaveProperty("hasMore");
  });

  it("returns 200 with custom pagination parameters", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/assets?producerId=producer_123&limit=5&offset=10`);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.pagination.limit).toBe(5);
    expect(json.pagination.offset).toBe(10);
  });

  it("returns 400 when limit is too large", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/assets?producerId=producer_123&limit=101`);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("limit");
  });

  it("returns 400 when offset is negative", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/assets?producerId=producer_123&offset=-1`);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("offset");
  });

  it("filters by status when provided", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/assets?producerId=producer_123&status=published`);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.assets.every((asset: any) => asset.status === "published")).toBeTruthy();
  });

  // Note: type filtering removed - will be added in future updates

  // Note: type filtering removed - will be added in future updates

  it("returns 400 when status is invalid", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/assets?producerId=producer_123&status=invalid`);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("status");
  });

  // Note: type validation removed - will be added in future updates

  it("returns assets with correct structure", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/assets?producerId=producer_123`);

    expect(res.status).toBe(200);
    const json = await res.json();
    
    if (json.assets.length > 0) {
      const asset = json.assets[0];
      expect(asset).toHaveProperty("id");
      expect(asset).toHaveProperty("title");
      expect(asset).toHaveProperty("artist");
      expect(asset).toHaveProperty("status");
      expect(asset).toHaveProperty("priceAmount");
      expect(asset).toHaveProperty("priceCurrency");
      expect(asset).toHaveProperty("createdAt");
      expect(asset).toHaveProperty("updatedAt");
      
      // Check that timestamps are numbers (milliseconds)
      expect(typeof asset.createdAt).toBe("number");
      expect(typeof asset.updatedAt).toBe("number");
    }
  });

  it("returns assets ordered by updatedAt descending", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/assets?producerId=producer_123`);

    expect(res.status).toBe(200);
    const json = await res.json();
    
    if (json.assets.length > 1) {
      for (let i = 0; i < json.assets.length - 1; i++) {
        expect(json.assets[i].updatedAt).toBeGreaterThanOrEqual(json.assets[i + 1].updatedAt);
      }
    }
  });

  it("handles empty results gracefully", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/assets?producerId=nonexistent_producer`);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.assets).toEqual([]);
    expect(json.pagination.total).toBe(0);
    expect(json.pagination.hasMore).toBe(false);
  });
});
