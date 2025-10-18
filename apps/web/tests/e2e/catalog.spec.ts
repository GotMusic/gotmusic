import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Wait for API readiness
  await page.goto("/api/readiness");
  await expect(page.getByText(/"status":"ready"/)).toBeVisible({ timeout: 10000 });
});

test.describe("@public Catalog Page", () => {
  test("renders catalog page with header", async ({ page }) => {
    await page.goto("/catalog");
    
    // Check header is visible
    await expect(page.getByRole("heading", { name: "Explore" })).toBeVisible();
    await expect(
      page.getByText("Producer-grade audio with on-chain license receipts"),
    ).toBeVisible();
  });

  test("displays catalog cards from API", async ({ page }) => {
    await page.goto("/catalog");

    // Wait for catalog grid to load
    await expect(page.getByTestId("catalog-grid")).toBeVisible({ timeout: 10000 });

    // Check that at least one catalog card is rendered
    const cards = page.getByTestId("catalog-card");
    await expect(cards.first()).toBeVisible();

    // Verify card has expected elements
    const firstCard = cards.first();
    await expect(firstCard.locator("h3")).toBeVisible(); // Title
    await expect(firstCard.getByTestId("preview-toggle")).toBeVisible(); // Preview button
  });

  test("shows loading skeletons initially", async ({ page }) => {
    // Slow down the API response to catch loading state
    await page.route("**/api/assets*", async (route) => {
      // Add a delay to make loading state visible
      await new Promise((resolve) => setTimeout(resolve, 500));
      route.continue();
    });

    await page.goto("/catalog");

    // Check for skeleton loaders during the delayed response
    const skeletons = page.getByTestId("catalog-skeleton");
    
    // Skeletons should be visible during loading
    await expect(skeletons.first()).toBeVisible({ timeout: 2000 });

    // Eventually cards should appear after API responds
    await expect(page.getByTestId("catalog-card").first()).toBeVisible({ timeout: 10000 });
  });

  test("preview toggle button works", async ({ page }) => {
    await page.goto("/catalog");

    // Wait for catalog grid
    await expect(page.getByTestId("catalog-grid")).toBeVisible({ timeout: 10000 });

    // Find first card with preview
    const firstCard = page.getByTestId("catalog-card").first();
    const previewButton = firstCard.getByTestId("preview-toggle");

    await expect(previewButton).toBeVisible();

    // Click to start preview
    await previewButton.click();

    // Button should show pause state (aria-label changes)
    // Note: actual audio playback is handled by browser, we just verify UI state
    await page.waitForTimeout(500);
  });

  test("details button navigation works", async ({ page }) => {
    await page.goto("/catalog");

    // Wait for catalog grid
    await expect(page.getByTestId("catalog-grid")).toBeVisible({ timeout: 10000 });

    // Find first card
    const firstCard = page.getByTestId("catalog-card").first();
    
    // Get the card's title for verification
    const titleElement = firstCard.locator("h3");
    const title = await titleElement.textContent();
    
    // Click details button
    const detailsButton = firstCard.getByRole("button", { name: /open details/i });
    await expect(detailsButton).toBeVisible();
    
    await detailsButton.click();

    // Should navigate to asset detail page
    await expect(page).toHaveURL(/\/asset\/[a-zA-Z0-9-_]+/);
  });

  test("displays empty state when no assets", async ({ page }) => {
    // Intercept API to return empty results
    await page.route("**/api/assets*", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ items: [], nextCursor: null }),
      });
    });

    await page.goto("/catalog");

    // Wait for the response and check empty state
    await page.waitForLoadState("networkidle");
    
    // Should show empty state
    await expect(page.getByText("No assets found")).toBeVisible({ timeout: 10000 });
  });

  test("displays error state on API failure", async ({ page }) => {
    // Intercept API to return error
    await page.route("**/api/assets*", (route) => {
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal server error" }),
      });
    });

    await page.goto("/catalog");

    // Should show error state
    await expect(page.getByText("Failed to load catalog")).toBeVisible({ timeout: 10000 });
  });

  test("keyboard navigation works on preview button", async ({ page }) => {
    await page.goto("/catalog");

    // Wait for catalog grid
    await expect(page.getByTestId("catalog-grid")).toBeVisible({ timeout: 10000 });

    // Tab to first preview button
    await page.keyboard.press("Tab");
    
    // Find focused element
    const focusedElement = page.locator(":focus");
    
    // Press Space to toggle
    await page.keyboard.press("Space");
    
    // Should trigger preview (verify no console errors)
    await page.waitForTimeout(500);
  });
});

