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

    // Click the Details button (it has aria-label "Open details for [title]")
    await firstCard.getByRole("button", { name: /Open details/ }).click();

    // Should navigate to asset detail page (ULID format: 0-9A-Z)
    await expect(page).toHaveURL(/\/asset\/[A-Z0-9]+$/);
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
    await firstCard.getByRole("button", { name: /Open details/ }).click();
    await page.waitForLoadState("networkidle");

    // Check breadcrumb
    const breadcrumb = page.getByRole("navigation").first();
    await expect(breadcrumb).toContainText("Catalog");
    
    // Breadcrumb link should work
    await breadcrumb.getByRole("link", { name: "Catalog" }).click();
    await expect(page).toHaveURL("/catalog");
  });

  test.skip("shows purchase button for published assets", async ({ page }) => {
    // TODO: This test requires seeded published assets in test DB
    // Skipping for now as route mocking is too complex for asset detail pages
  });

  test.skip("shows disabled button for non-published assets", async ({ page }) => {
    // TODO: This test requires seeded draft assets in test DB
    // Skipping for now as route mocking is too complex for asset detail pages
  });

  test("displays asset metadata tags", async ({ page }) => {
    await page.goto("/catalog");
    await page.waitForLoadState("networkidle");

    const firstCard = page.getByTestId("catalog-card").first();
    await firstCard.getByRole("button", { name: /Open details/ }).click();
    await page.waitForLoadState("networkidle");

    // Check that the page has loaded with title
    await expect(page.getByTestId("asset-title")).toBeVisible();
    
    // Check for BPM or status text (metadata should be present)
    const pageContent = await page.content();
    const hasMetadata = pageContent.includes("BPM") || pageContent.includes("published") || pageContent.includes("draft");
    expect(hasMetadata).toBeTruthy();
  });

  test("returns 404 for non-existent asset", async ({ page }) => {
    await page.goto("/asset/nonexistent_asset_id");
    await page.waitForLoadState("networkidle");

    // Should show Next.js 404 page
    await expect(page.locator("h1")).toContainText(/404|Not Found/);
  });

  test.skip("shows player for published assets", async ({ page }) => {
    // TODO: This test requires seeded published assets with preview URLs in test DB
    // Skipping for now as route mocking is too complex for asset detail pages
  });
});

