import { test, expect } from "@playwright/test";

test.describe("@public", () => {
  test("home SSR smoke", async ({ request }) => {
    const res = await request.get("/");
    expect(res.status(), "SSR must render HTML").toBe(200);
    const html = await res.text();
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("GotMusic");
  });
});
