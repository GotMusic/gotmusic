import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display GotMusic heading and catalog items", async ({ page }) => {
    // Navigate to home page
    await page.goto("/", { waitUntil: "networkidle" });

    // Wait for the /api/assets call to complete successfully
    const apiResponse = await page.waitForResponse(
      (response) => response.url().includes("/api/assets") && response.status() < 400,
      { timeout: 30000 }
    );

    // Verify API returned success
    expect(apiResponse.status()).toBeLessThan(400);

    // Check if we landed on an error page first
    const errorText = page.getByText(/(404|500|Something went wrong|Failed to load)/i);
    const hasError = await errorText.isVisible().catch(() => false);
    
    if (hasError) {
      // Dump page HTML for debugging
      const html = await page.content();
      console.log("--- ERROR PAGE DETECTED ---\n", html.substring(0, 1000), "\n--- END ---");
    }

    // Check for main heading using data-testid
    const heading = page.getByTestId("main-heading");
    await expect(heading).toBeVisible({ timeout: 15000 });
    await expect(heading).toHaveText("GotMusic");

    // Check for subtitle
    const subtitle = page.getByTestId("main-subtitle");
    await expect(subtitle).toBeVisible();

    // After API completes, check for catalog grid or empty state
    const catalogGrid = page.getByTestId("catalog-grid");
    const emptyState = page.getByTestId("empty-state");

    // Wait for either catalog or empty state to appear
    await Promise.race([
      catalogGrid.waitFor({ state: "visible", timeout: 10000 }).catch(() => {}),
      emptyState.waitFor({ state: "visible", timeout: 10000 }).catch(() => {}),
    ]);

    // Either we have a catalog with items or an empty state
    const hasCatalog = await catalogGrid.isVisible().catch(() => false);
    const hasEmptyState = await emptyState.isVisible().catch(() => false);

    if (!hasCatalog && !hasEmptyState) {
      // Page is stuck - dump HTML for debugging
      const html = await page.content();
      console.log("--- PAGE STUCK (no catalog or empty state) ---\n", html.substring(0, 2000), "\n--- END ---");
    }

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
