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

  test("should navigate to studio assets page", async ({ page, context }) => {
    // Set E2E bypass cookie to ensure authentication bypass works
    await context.addCookies([{
      name: 'e2e-bypass',
      value: '1',
      domain: '127.0.0.1',
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
    }]);

    // Navigate to studio assets
    const response = await page.goto("/studio/assets", { waitUntil: 'domcontentloaded' });
    
    // Verify we didn't get redirected (status should be 200, not 30x)
    expect(response?.status()).toBeLessThan(400);
    expect(new URL(page.url()).pathname).toBe('/studio/assets');
    
    // Wait for the page-specific test ID (most reliable)
    await expect(page.getByTestId('studio-assets-page')).toBeVisible({ timeout: 10000 });
    
    // Verify the main landmark is present (accessibility)
    await expect(page.getByRole('main')).toBeVisible();
    
    // Check that the page loads with correct heading
    await expect(page.getByRole('heading', { level: 1, name: /My Assets/i })).toBeVisible();
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
