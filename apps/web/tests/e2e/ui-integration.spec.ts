import { test, expect } from "@playwright/test";

test.describe("UI Integration", () => {
  test("should render pages with @gotmusic/ui components", async ({ page }) => {
    // Test home page with new components
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    
    // Check that the page loads without errors
    await expect(page.locator("h1")).toContainText("GotMusic");
    
    // Check that loading skeletons appear
    const skeletons = page.locator('[aria-busy="true"]');
    await expect(skeletons).toBeVisible();
  });

  test("should navigate to catalog page", async ({ page }) => {
    await page.goto("/catalog");
    await page.waitForLoadState("domcontentloaded");
    
    // Check that Card components render
    const cards = page.locator('[class*="rounded"]');
    await expect(cards.first()).toBeVisible();
  });

  test("should navigate to studio assets page", async ({ page }) => {
    await page.goto("/studio/assets");
    await page.waitForLoadState("domcontentloaded");
    
    // Check that the page loads
    await expect(page.locator("h1")).toContainText("My Assets");
  });

  test("should navigate to uploads page", async ({ page }) => {
    await page.goto("/studio/uploads");
    await page.waitForLoadState("domcontentloaded");
    
    // Check that the page loads
    await expect(page.locator("h1")).toContainText("Uploads");
  });

  test("should render admin uploads page with Button components", async ({ page }) => {
    await page.goto("/admin/uploads");
    await page.waitForLoadState("domcontentloaded");
    
    // Check that the page loads
    await expect(page.locator("h1")).toContainText("Uploads");
    
    // Check that Button components are present
    const uploadButton = page.locator('[data-testid="upload-button"]');
    const resetButton = page.locator('[data-testid="reset-button"]');
    
    await expect(uploadButton).toBeVisible();
    await expect(resetButton).toBeVisible();
  });
});
