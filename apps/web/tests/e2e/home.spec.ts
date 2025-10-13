import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display GotMusic heading and catalog items", async ({ page }) => {
    // Navigate to home page
    await page.goto("/");

    // Check for main heading
    const heading = page.getByRole("heading", { name: /GotMusic/i });
    await expect(heading).toBeVisible();

    // Check for at least one catalog item (list item or card)
    // This ensures the fixtures/data is loading
    const catalogItems = page.locator('[data-testid="catalog-item"]').or(page.locator("li"));

    const count = await catalogItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should have proper page title", async ({ page }) => {
    await page.goto("/");

    // Verify page title is set
    await expect(page).toHaveTitle(/GotMusic/i);
  });
});
