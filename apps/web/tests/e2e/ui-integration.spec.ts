import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.setExtraHTTPHeaders({ 'x-e2e-auth': 'bypass' });
});

test.describe("@studio UI Integration", () => {
  test("should render pages with @gotmusic/ui components", async ({ page }) => {
    // Test home page with new discovery components
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    
    // Check that the discovery homepage loads with hero
    await expect(page.locator("h1")).toBeVisible();
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
    // Create a real session for E2E testing
    await page.request.post("/api/auth/test-login");
    
    // Navigate to studio assets
    const response = await page.goto("/studio/assets", { waitUntil: 'domcontentloaded' });
    
    // Debug: Log the response status and URL
    console.log('Response status:', response?.status());
    console.log('Current URL:', page.url());
    
    // Verify we didn't get redirected (status should be 200, not 30x)
    expect(response?.status()).toBeLessThan(400);
    expect(new URL(page.url()).pathname).toMatch(/^\/studio\/assets\/?$/);
    
    // Wait for the page-specific test ID (most reliable)
    await expect(page.getByTestId('studio-assets-page')).toBeVisible({ timeout: 15000 });
    
    // Verify the main landmark is present (accessibility)
    await expect(page.getByRole('main')).toBeVisible();
    
    // Check that the page loads with correct heading
    await expect(page.getByRole('heading', { level: 1, name: /My Assets/i })).toBeVisible();
  });

  test("should navigate to uploads page", async ({ page }) => {
    // Create a real session for E2E testing
    await page.request.post("/api/auth/test-login");
    
    await page.goto("/studio/uploads");
    await page.waitForLoadState("domcontentloaded");
    
    // Wait for the h1 element to be visible
    await expect(page.locator("h1")).toBeVisible({ timeout: 10000 });
    
    // Check that the page loads
    await expect(page.locator("h1")).toContainText("Uploads");
  });

  test("should render admin uploads page with Button components", async ({ page }) => {
    // Create a real session for E2E testing
    await page.request.post("/api/auth/test-login");
    
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
