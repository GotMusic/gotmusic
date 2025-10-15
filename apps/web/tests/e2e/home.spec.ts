import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display GotMusic heading and catalog items", async ({ page }) => {
    // Navigate to home page
    await page.goto("/");

    // Check for main heading using data-testid
    const heading = page.getByTestId("main-heading");
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText("GotMusic");

    // Check for subtitle
    const subtitle = page.getByTestId("main-subtitle");
    await expect(subtitle).toBeVisible();

    // Check for catalog grid or empty state
    const catalogGrid = page.getByTestId("catalog-grid");
    const emptyState = page.getByTestId("empty-state");
    
    // Either we have a catalog with items or an empty state
    const hasCatalog = await catalogGrid.isVisible();
    const hasEmptyState = await emptyState.isVisible();
    
    expect(hasCatalog || hasEmptyState).toBe(true);

    // If catalog is visible, check for at least one item
    if (hasCatalog) {
      const catalogItems = page.getByTestId("catalog-item");
      const count = await catalogItems.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test("should have proper page title", async ({ page }) => {
    await page.goto("/");

    // Verify page title is set
    await expect(page).toHaveTitle(/GotMusic/i);
  });
});
