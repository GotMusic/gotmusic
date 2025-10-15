import { expect, test } from "@playwright/test";

test.describe("Admin Asset Detail Page", () => {
  test("should render asset detail page with form and actions", async ({ page }) => {
    // First, fetch the list of assets to get a real ID
    const baseURL = `http://localhost:${process.env.PW_PORT || 4123}`;
    const response = await page.request.get(`${baseURL}/api/assets`);
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    const assets = data.items || [];

    // Skip if no assets (seed may have failed)
    test.skip(assets.length === 0, "No assets in database to test");

    const assetId = assets[0].id;

    // Navigate to the first asset's detail page
    await page.goto(`/admin/assets/${assetId}`, { waitUntil: "domcontentloaded" });

    // Check for page heading (wait for it to appear)
    const heading = page.getByTestId("asset-detail-heading");
    await expect(heading).toBeVisible({ timeout: 10000 });
    await expect(heading).toContainText(`Asset #${assetId}`);

    // Check for subtitle
    const subtitle = page.getByTestId("asset-detail-subtitle");
    await expect(subtitle).toBeVisible();

    // Check for asset edit form
    const editForm = page.getByTestId("asset-edit-form");
    await expect(editForm).toBeVisible();

    // Check for asset actions
    const actions = page.getByTestId("asset-actions");
    await expect(actions).toBeVisible();
  });

  test("should handle 404 for non-existent asset", async ({ page }) => {
    // Navigate to non-existent asset
    const response = await page.goto("/admin/assets/e2e-non-existent-12345", {
      waitUntil: "domcontentloaded",
    });

    // Should get 404 response
    expect(response?.status()).toBe(404);
  });
});
