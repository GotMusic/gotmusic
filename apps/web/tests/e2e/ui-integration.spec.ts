import { test, expect } from "@playwright/test";

test.describe("UI Integration", () => {
  test("should render pages with @gotmusic/ui components", async ({ page }) => {
    // Test home page with new discovery components
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    
    // Check that the discovery homepage loads with hero
    await expect(page.locator("h1")).toContainText("Sounds that ship");
    
    // Check for search form (key UI component)
    await expect(page.locator('input[type="search"]')).toBeVisible();
  });

  test("should navigate to catalog page", async ({ page }) => {
    await page.goto("/catalog");
    await page.waitForLoadState("domcontentloaded");
    
    // Check that Card components render
    const cards = page.locator('[class*="rounded"]');
    await expect(cards.first()).toBeVisible();
  });

  test("should navigate to studio assets page", async ({ page }) => {
    // Navigate to studio assets with proper authentication
    await page.goto("/studio/assets");
    
    // Wait for the page to fully load and handle any auth redirects
    await page.waitForLoadState("domcontentloaded");
    
    // Debug: Log the page content to see what's actually loaded
    const pageContent = await page.content();
    console.log("Page URL:", page.url());
    console.log("Page title:", await page.title());
    console.log("Page content length:", pageContent.length);
    
    // Check if we're on the right page
    if (page.url().includes("/studio/assets")) {
      console.log("✅ On correct URL");
    } else {
      console.log("❌ Redirected to:", page.url());
    }
    
    // Wait for the main content to be visible (the layout should be there)
    await expect(page.locator("main")).toBeVisible({ timeout: 10000 });
    
    // Wait for the h1 element to be visible (may take time due to auth)
    await expect(page.locator("h1")).toBeVisible({ timeout: 10000 });
    
    // Check that the page loads with correct heading
    await expect(page.locator("h1")).toContainText("My Assets");
  });

  test("should navigate to uploads page", async ({ page }) => {
    await page.goto("/studio/uploads");
    await page.waitForLoadState("domcontentloaded");
    
    // Wait for the h1 element to be visible
    await expect(page.locator("h1")).toBeVisible({ timeout: 10000 });
    
    // Check that the page loads
    await expect(page.locator("h1")).toContainText("Uploads");
  });

  test("should render admin uploads page with Button components", async ({ page }) => {
    await page.goto("/admin/uploads");
    await page.waitForLoadState("domcontentloaded");
    
    // Wait for the h1 element to be visible
    await expect(page.locator("h1")).toBeVisible({ timeout: 10000 });
    
    // Check that the page loads
    await expect(page.locator("h1")).toContainText("Uploads");
    
    // Check that Button components are present
    const uploadButton = page.locator('[data-testid="upload-button"]');
    const resetButton = page.locator('[data-testid="reset-button"]');
    
    await expect(uploadButton).toBeVisible();
    await expect(resetButton).toBeVisible();
  });
});
