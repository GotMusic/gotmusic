import { expect, test } from "@playwright/test";

const BASE_URL = `http://localhost:${process.env.PW_PORT || 4123}`;

test.describe("@studio Admin Assets Table - Pagination & Filters", () => {
  test("should load assets table with pagination", async ({ page }) => {
    await page.goto("/admin", { waitUntil: "domcontentloaded" });

    // Wait for assets API call
    await page.waitForResponse(
      (response) => response.url().includes("/api/assets") && response.status() < 500,
      { timeout: 15000 },
    );

    // Check table heading
    const heading = page.getByRole("heading", { name: "Assets", level: 1 });
    await expect(heading).toBeVisible({ timeout: 10000 });

    // Check table is present
    const table = page.getByLabel("Assets table");
    await expect(table).toBeVisible();

    // Check table has rows (at least 1 asset from seeds)
    const rows = page.locator("tbody tr");
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);

    // Check table headers
    await expect(page.getByRole("columnheader", { name: "Title" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Artist" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Status" })).toBeVisible();
  });

  test("should filter assets by search query", async ({ page }) => {
    await page.goto("/admin", { waitUntil: "domcontentloaded" });

    // Wait for initial load
    await page.waitForResponse((r) => r.url().includes("/api/assets") && r.status() < 500);

    // Type in search box
    const searchInput = page.getByLabel("Search assets");
    await searchInput.fill("Midnight");

    // Wait for debounced search (300ms + request time)
    await page.waitForResponse(
      (response) =>
        response.url().includes("/api/assets") &&
        response.url().includes("q=Midnight") &&
        response.status() < 500,
      { timeout: 2000 },
    );

    // Check that results are filtered
    const rows = page.locator("tbody tr");
    const count = await rows.count();

    // Should have at least one row (or empty state)
    expect(count).toBeGreaterThan(0);

    // If we have results, check they contain the search term
    if (count > 0) {
      const firstRow = rows.first();
      const text = await firstRow.textContent();
      expect(text?.toLowerCase()).toContain("midnight");
    }
  });

  test("should filter assets by status", async ({ page }) => {
    await page.goto("/admin", { waitUntil: "domcontentloaded" });

    // Wait for initial load
    await page.waitForResponse((r) => r.url().includes("/api/assets") && r.status() < 500);

    // Select status filter
    const statusFilter = page.getByLabel("Filter assets by status");
    await statusFilter.selectOption("published");

    // Wait for filtered results
    await page.waitForResponse(
      (response) =>
        response.url().includes("/api/assets") &&
        response.url().includes("status=published") &&
        response.status() < 500,
      { timeout: 2000 },
    );

    // Check that all visible rows have "published" status
    const statusChips = page.locator("tbody tr td:nth-child(5) span");
    const chipCount = await statusChips.count();

    if (chipCount > 0) {
      for (let i = 0; i < chipCount; i++) {
        const chip = statusChips.nth(i);
        const text = await chip.textContent();
        expect(text?.toLowerCase()).toBe("published");
      }
    }
  });

  test("should clear filters when clicking Clear Filters button", async ({ page }) => {
    await page.goto("/admin", { waitUntil: "domcontentloaded" });

    // Wait for initial load
    await page.waitForResponse((r) => r.url().includes("/api/assets") && r.status() < 500);

    // Apply search filter
    const searchInput = page.getByLabel("Search assets");
    await searchInput.fill("test");

    // Wait for filtered results
    await page.waitForResponse(
      (response) => response.url().includes("q=test") && response.status() < 500,
      { timeout: 2000 },
    );

    // Clear filters button should be visible
    const clearButton = page.getByRole("button", { name: "Clear all filters" });
    await expect(clearButton).toBeVisible();

    // Click clear filters
    await clearButton.click();

    // Wait for URL to update (no query params)
    await page.waitForURL(/\/admin\/?$/, { timeout: 2000 });

    // Search input should be cleared
    await expect(searchInput).toHaveValue("");

    // Clear button should be hidden
    await expect(clearButton).not.toBeVisible();
  });

  test("should show empty state when no assets match filters", async ({ page }) => {
    await page.goto("/admin", { waitUntil: "domcontentloaded" });

    // Wait for initial load
    await page.waitForResponse((r) => r.url().includes("/api/assets") && r.status() < 500);

    // Search for something that doesn't exist
    const searchInput = page.getByLabel("Search assets");
    await searchInput.fill("nonexistent-xyz-12345");

    // Wait for empty results
    await page.waitForResponse(
      (response) => response.url().includes("q=nonexistent") && response.status() < 500,
      { timeout: 2000 },
    );

    // Check for filtered empty state message
    const emptyMessage = page.getByText(/No assets match your filters/i);
    await expect(emptyMessage).toBeVisible({ timeout: 5000 });
  });

  test("should have accessible form controls", async ({ page }) => {
    await page.goto("/admin", { waitUntil: "domcontentloaded" });

    // Wait for page load
    await page.waitForResponse((r) => r.url().includes("/api/assets") && r.status() < 500);

    // Check search input has proper label
    const searchInput = page.getByLabel("Search assets");
    await expect(searchInput).toBeVisible();
    expect(await searchInput.getAttribute("type")).toBe("search");

    // Check status filter has proper label
    const statusFilter = page.getByLabel("Filter assets by status");
    await expect(statusFilter).toBeVisible();
    expect(await statusFilter.evaluate((el) => el.tagName.toLowerCase())).toBe("select");

    // Check table has aria-label
    const table = page.getByLabel("Assets table");
    await expect(table).toBeVisible();
  });
});

test.describe("Admin Assets Table - Navigation & Smoke Tests", () => {
  test("should show rows from API and navigate to detail on View click", async ({ page }) => {
    await page.goto("/admin", { waitUntil: "domcontentloaded" });

    // Wait for API call and capture response
    const apiResponse = await page.waitForResponse(
      (response) => response.url().includes("/api/assets") && response.status() === 200,
      { timeout: 15000 },
    );

    // Verify API returned data
    const data = await apiResponse.json();
    expect(data.items).toBeDefined();
    expect(Array.isArray(data.items)).toBe(true);
    expect(data.items.length).toBeGreaterThan(0);

    // Verify table shows rows from API
    const rows = page.locator("tbody tr");
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
    expect(rowCount).toBeLessThanOrEqual(data.items.length);

    // Get first asset ID from API response
    const firstAssetId = data.items[0].id;

    // Click "View" button on first row
    const firstRowViewButton = rows.first().getByRole("link", { name: /view/i });
    await expect(firstRowViewButton).toBeVisible();
    await firstRowViewButton.click();

    // Should navigate to asset detail page
    await page.waitForURL(`**/admin/assets/${firstAssetId}/**`, { timeout: 5000 });

    // Verify we're on the detail page
    const detailHeading = page.getByTestId("asset-detail-heading");
    await expect(detailHeading).toBeVisible({ timeout: 10000 });
    await expect(detailHeading).toContainText(`Asset #${firstAssetId}`);
  });

  test("should verify table data matches API response", async ({ page }) => {
    await page.goto("/admin", { waitUntil: "domcontentloaded" });

    // Capture API response
    const apiResponse = await page.waitForResponse(
      (response) => response.url().includes("/api/assets") && response.status() === 200,
      { timeout: 15000 },
    );

    const data = await apiResponse.json();
    const apiAssets = data.items;

    // Verify we have assets from API
    expect(apiAssets.length).toBeGreaterThan(0);

    // Check first row matches first API item
    const firstRow = page.locator("tbody tr").first();
    await expect(firstRow).toBeVisible();

    const firstAsset = apiAssets[0];

    // Verify title appears in row
    await expect(firstRow).toContainText(firstAsset.title);

    // Verify artist appears in row
    await expect(firstRow).toContainText(firstAsset.artist);

    // Verify status appears in row
    await expect(firstRow).toContainText(firstAsset.status);
  });
});
