import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Wait for API to be ready
  await page.goto("/");
  await page.waitForLoadState("networkidle");
});

test.describe("Asset Detail Page", () => {
  test("renders asset detail page with all elements", async ({ page }) => {
    // Navigate to catalog first to get a real asset ID
    await page.goto("/catalog");
    await page.waitForLoadState("networkidle");

    // Click on first catalog card's Details button
    const firstCard = page.getByTestId("catalog-card").first();
    await expect(firstCard).toBeVisible();

    // Click the Details button
    await firstCard.getByRole("button", { name: /Details/ }).click();

    // Should navigate to asset detail page
    await expect(page).toHaveURL(/\/asset\/[a-z_0-9]+$/);
    await page.waitForLoadState("networkidle");

    // Check main elements are present
    await expect(page.getByTestId("asset-title")).toBeVisible();
    await expect(page.getByTestId("asset-artist")).toBeVisible();
    await expect(page.getByTestId("asset-price")).toBeVisible();
    await expect(page.getByTestId("asset-artwork")).toBeVisible();
    await expect(page.getByTestId("purchase-card")).toBeVisible();
  });

  test("displays breadcrumb navigation", async ({ page }) => {
    await page.goto("/catalog");
    await page.waitForLoadState("networkidle");

    const firstCard = page.getByTestId("catalog-card").first();
    await firstCard.getByRole("button", { name: /Details/ }).click();
    await page.waitForLoadState("networkidle");

    // Check breadcrumb
    const breadcrumb = page.getByRole("navigation").first();
    await expect(breadcrumb).toContainText("Catalog");
    
    // Breadcrumb link should work
    await breadcrumb.getByRole("link", { name: "Catalog" }).click();
    await expect(page).toHaveURL("/catalog");
  });

  test("shows purchase button for published assets", async ({ page }) => {
    // Mock a published asset
    await page.route("**/api/assets/*", async (route) => {
      const url = route.request().url();
      if (!url.includes("?")) {
        // Single asset request
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            id: "test_published",
            title: "Test Published Track",
            artist: "Test Artist",
            bpm: 120,
            keySig: "C minor",
            priceAmount: 299,
            priceCurrency: "USD",
            status: "published",
            updatedAt: Date.now(),
            createdAt: Date.now(),
          }),
        });
      } else {
        // List request - continue normally
        await route.continue();
      }
    });

    await page.goto("/asset/test_published");
    await page.waitForLoadState("networkidle");

    // Should show purchase button
    const purchaseButton = page.getByTestId("purchase-button");
    await expect(purchaseButton).toBeVisible();
    await expect(purchaseButton).toBeEnabled();
    await expect(purchaseButton).toHaveText("Purchase License");
  });

  test("shows disabled button for non-published assets", async ({ page }) => {
    // Mock a draft asset
    await page.route("**/api/assets/*", async (route) => {
      const url = route.request().url();
      if (!url.includes("?")) {
        // Single asset request
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            id: "test_draft",
            title: "Test Draft Track",
            artist: "Test Artist",
            bpm: 130,
            keySig: "D major",
            priceAmount: 399,
            priceCurrency: "USD",
            status: "draft",
            updatedAt: Date.now(),
            createdAt: Date.now(),
          }),
        });
      } else {
        await route.continue();
      }
    });

    await page.goto("/asset/test_draft");
    await page.waitForLoadState("networkidle");

    // Should show disabled button
    const disabledButton = page.getByRole("button", { name: "Not Available" });
    await expect(disabledButton).toBeVisible();
    await expect(disabledButton).toBeDisabled();
  });

  test("displays asset metadata tags", async ({ page }) => {
    await page.goto("/catalog");
    await page.waitForLoadState("networkidle");

    const firstCard = page.getByTestId("catalog-card").first();
    await firstCard.getByRole("button", { name: /Details/ }).click();
    await page.waitForLoadState("networkidle");

    // Check for metadata tags (BPM, key, status should be visible)
    const tags = page.locator('[class*="Tag"]');
    await expect(tags.first()).toBeVisible();
  });

  test("returns 404 for non-existent asset", async ({ page }) => {
    await page.goto("/asset/nonexistent_asset_id");
    await page.waitForLoadState("networkidle");

    // Should show Next.js 404 page
    await expect(page.locator("h1")).toContainText(/404|Not Found/);
  });

  test("shows player for published assets", async ({ page }) => {
    // Mock a published asset
    await page.route("**/api/assets/*", async (route) => {
      const url = route.request().url();
      if (!url.includes("?")) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            id: "test_published_with_preview",
            title: "Test Track with Preview",
            artist: "Test Artist",
            bpm: 140,
            keySig: "E minor",
            priceAmount: 499,
            priceCurrency: "USD",
            status: "published",
            updatedAt: Date.now(),
            createdAt: Date.now(),
          }),
        });
      } else {
        await route.continue();
      }
    });

    await page.goto("/asset/test_published_with_preview");
    await page.waitForLoadState("networkidle");

    // Should show player component
    const player = page.locator('[role="group"]').filter({ hasText: /Play|Pause/ });
    await expect(player).toBeVisible();
  });
});

