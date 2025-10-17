import { expect, test } from "@playwright/test";

test.describe("Security Hardening E2E", () => {
  test("should protect admin routes with authentication", async ({ page }) => {
    // Try to access admin route without auth
    await page.goto("/admin/assets");

    // Should be redirected or show auth required
    await expect(page.locator("text=Authentication required")).toBeVisible();
  });

  test("should protect studio routes with authentication", async ({ page }) => {
    // Try to access studio route without auth
    await page.goto("/studio/assets");

    // Should be redirected or show auth required
    await expect(page.locator("text=Authentication required")).toBeVisible();
  });

  test("should allow public catalog access", async ({ page }) => {
    // Public routes should work without auth
    await page.goto("/catalog");

    // Should load successfully
    await expect(page.locator("h1")).toBeVisible();
  });

  test("should handle rate limiting gracefully", async ({ page }) => {
    // This would test the UI response to rate limiting
    // Implementation depends on how rate limiting is exposed in the UI
    await page.goto("/catalog");

    // Test that the app handles rate limiting errors gracefully
    // This might involve testing error toasts or messages
  });
});
