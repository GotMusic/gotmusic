import { expect, test } from "@playwright/test";

test.describe("Access Control", () => {
  test("should require authentication for admin routes", async ({ request }) => {
    const response = await request.get("/admin/assets");
    expect(response.status()).toBe(401);

    const authHeader = response.headers()["www-authenticate"];
    expect(authHeader).toContain("Basic realm");
  });

  test("should require authentication for studio routes", async ({ request }) => {
    const response = await request.get("/studio/assets");
    expect(response.status()).toBe(401);
  });

  test("should require authentication for upload routes", async ({ request }) => {
    const response = await request.post("/api/upload/sign", {
      data: { filename: "test.wav", contentType: "audio/wav", fileSize: 1024 },
    });
    expect(response.status()).toBe(401);
  });

  test("should require authentication for download routes", async ({ request }) => {
    const response = await request.get("/api/assets/test/download?buyer=0x123");
    expect(response.status()).toBe(401);
  });

  test("should allow public routes without authentication", async ({ request }) => {
    const response = await request.get("/api/assets");
    expect(response.status()).toBe(200);
  });

  test("should allow catalog routes without authentication", async ({ request }) => {
    const response = await request.get("/catalog");
    expect(response.status()).toBe(200);
  });
});
