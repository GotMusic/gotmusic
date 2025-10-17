import { describe, expect, it } from "@jest/globals";

const BASE_URL = "http://localhost:3000";

describe("GET /api/studio/sales", () => {
  it("returns 400 when producerId is missing", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/sales`);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("producerId");
  });

  it("returns 400 when producerId is empty", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/sales?producerId=`);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("producerId");
  });

  it("returns 200 with default pagination for valid producerId", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/sales?producerId=producer_123`);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveProperty("sales");
    expect(json).toHaveProperty("summary");
    expect(json).toHaveProperty("pagination");
    expect(json).toHaveProperty("note");
    expect(Array.isArray(json.sales)).toBeTruthy();
    expect(json.note).toContain("stub data");
  });

  it("returns 200 with custom pagination parameters", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/sales?producerId=producer_123&limit=5&offset=0`);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.pagination.limit).toBe(5);
    expect(json.pagination.offset).toBe(0);
  });

  it("returns 400 when limit is too large", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/sales?producerId=producer_123&limit=101`);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("limit");
  });

  it("returns 400 when offset is negative", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/sales?producerId=producer_123&offset=-1`);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Validation failed");
    expect(json.details).toHaveProperty("offset");
  });

  it("returns sales with correct structure", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/sales?producerId=producer_123`);

    expect(res.status).toBe(200);
    const json = await res.json();
    
    if (json.sales.length > 0) {
      const sale = json.sales[0];
      expect(sale).toHaveProperty("id");
      expect(sale).toHaveProperty("assetId");
      expect(sale).toHaveProperty("assetTitle");
      expect(sale).toHaveProperty("assetArtist");
      expect(sale).toHaveProperty("buyerAddress");
      expect(sale).toHaveProperty("easUid");
      expect(sale).toHaveProperty("priceAmount");
      expect(sale).toHaveProperty("priceCurrency");
      expect(sale).toHaveProperty("soldAt");
      expect(sale).toHaveProperty("blockscoutUrl");
      
      // Check that soldAt is a number (milliseconds)
      expect(typeof sale.soldAt).toBe("number");
      
      // Check that buyerAddress looks like an Ethereum address
      expect(sale.buyerAddress).toMatch(/^0x[a-fA-F0-9]{40}$/);
      
      // Check that easUid looks like a hash
      expect(sale.easUid).toMatch(/^0x[a-fA-F0-9]{64}$/);
      
      // Check that blockscoutUrl is a valid URL
      expect(sale.blockscoutUrl).toMatch(/^https:\/\/base-sepolia\.blockscout\.com\/tx\/0x[a-fA-F0-9]{64}$/);
    }
  });

  it("returns summary with correct structure", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/sales?producerId=producer_123`);

    expect(res.status).toBe(200);
    const json = await res.json();
    
    expect(json.summary).toHaveProperty("totalSales");
    expect(json.summary).toHaveProperty("totalRevenue");
    expect(json.summary).toHaveProperty("currency");
    expect(json.summary).toHaveProperty("topAsset");
    
    expect(typeof json.summary.totalSales).toBe("number");
    expect(typeof json.summary.totalRevenue).toBe("string");
    expect(json.summary.currency).toBe("USD");
    
    if (json.summary.topAsset) {
      expect(json.summary.topAsset).toHaveProperty("id");
      expect(json.summary.topAsset).toHaveProperty("title");
      expect(json.summary.topAsset).toHaveProperty("sales");
      expect(json.summary.topAsset).toHaveProperty("revenue");
    }
  });

  it("returns pagination with correct structure", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/sales?producerId=producer_123`);

    expect(res.status).toBe(200);
    const json = await res.json();
    
    expect(json.pagination).toHaveProperty("total");
    expect(json.pagination).toHaveProperty("limit");
    expect(json.pagination).toHaveProperty("offset");
    expect(json.pagination).toHaveProperty("hasMore");
    
    expect(typeof json.pagination.total).toBe("number");
    expect(typeof json.pagination.limit).toBe("number");
    expect(typeof json.pagination.offset).toBe("number");
    expect(typeof json.pagination.hasMore).toBe("boolean");
  });

  it("handles empty results gracefully", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/sales?producerId=nonexistent_producer`);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.sales).toEqual([]);
    expect(json.summary.totalSales).toBe(0);
    expect(json.summary.totalRevenue).toBe("0.00");
    expect(json.summary.topAsset).toBeNull();
    expect(json.pagination.total).toBe(0);
    expect(json.pagination.hasMore).toBe(false);
  });

  it("includes note about stub data", async () => {
    const res = await fetch(`${BASE_URL}/api/studio/sales?producerId=producer_123`);

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.note).toContain("stub data");
    expect(json.note).toContain("demo purposes");
    expect(json.note).toContain("payment system");
  });
});
