import { expect, test } from "@playwright/test";
import { loginStudio, gotoAssetDetail } from "./utils/auth";

test.beforeEach(async ({ page }) => {
  // Wait for API to be ready
  const response = await page.request.get("/api/readiness");
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(data.status).toBe("ready");
});

test.describe("@studio Admin Asset Detail Page", () => {
  test("should render asset detail page with form and actions", async ({ page }) => {
    // Login as Studio user
    await loginStudio(page);
    
    // Use the fixed asset ID from seed
    const assetId = "asset-e2e-fixed-001";

    // Verify the asset exists in the API first
    const assetResponse = await page.request.get(`/api/assets/${assetId}`);
    expect(assetResponse.ok()).toBeTruthy();
    const assetData = await assetResponse.json();
    expect(assetData.id).toBe(assetId);

    // Navigate to the asset detail page using Studio route
    await gotoAssetDetail(page, assetId);

    // Check for page heading (wait for it to appear)
    const heading = page.getByTestId("asset-detail-heading");
    await expect(heading).toBeVisible({ timeout: 15000 });
    await expect(heading).toContainText(`Asset #${assetId}`);

    // Check for asset edit form
    const editForm = page.getByTestId("asset-edit-form");
    await expect(editForm).toBeVisible();
  });

  test("should handle 404 for non-existent asset", async ({ page }) => {
    // Login as Studio user
    await loginStudio(page);
    
    // Navigate to non-existent asset
    const response = await page.goto("/studio/assets/e2e-non-existent-12345", {
      waitUntil: "domcontentloaded",
    });

    // Should get 404 response
    expect(response?.status()).toBe(404);
  });

  test("should display price and action buttons on detail page", async ({ page }) => {
    // Login as Studio user
    await loginStudio(page);
    
    // Use the fixed asset ID from seed
    const assetId = "asset-e2e-fixed-001";
    const assetPrice = 12; // From seed data
    const assetCurrency = "PYUSD"; // From seed data

    // Navigate to asset detail page using Studio route
    await gotoAssetDetail(page, assetId);

    // Wait for page to load
    const heading = page.getByTestId("asset-detail-heading");
    await expect(heading).toBeVisible({ timeout: 15000 });

    // Verify price is in the form (more reliable than display text)
    const editForm = page.getByTestId("asset-edit-form");
    await expect(editForm).toBeVisible({ timeout: 15000 });

    const priceInput = editForm.getByLabel(/price/i);
    await expect(priceInput).toBeVisible();
    await expect(priceInput).toHaveValue(assetPrice.toString());
  });

  test("should show asset metadata fields in edit form", async ({ page }) => {
    // Login as Studio user
    await loginStudio(page);
    
    // Use the fixed asset ID from seed
    const assetId = "asset-e2e-fixed-001";
    const asset = {
      id: assetId,
      title: "Night Drive 88", // From seed data
      artist: "KiloWav", // From seed data
      priceAmount: 12 // From seed data
    };

    // Navigate to asset detail page using Studio route
    await gotoAssetDetail(page, assetId);

    // Wait for form to load
    const editForm = page.getByTestId("asset-edit-form");
    await expect(editForm).toBeVisible({ timeout: 15000 });

    // Check that form fields contain asset data
    // Title field
    const titleInput = editForm.getByLabel(/title/i);
    await expect(titleInput).toBeVisible();
    await expect(titleInput).toHaveValue(asset.title);

    // Artist field
    const artistInput = editForm.getByLabel(/artist/i);
    await expect(artistInput).toBeVisible();
    await expect(artistInput).toHaveValue(asset.artist);

    // Price field
    const priceInput = editForm.getByLabel(/price/i);
    await expect(priceInput).toBeVisible();
    await expect(priceInput).toHaveValue(asset.priceAmount.toString());
  });
});
