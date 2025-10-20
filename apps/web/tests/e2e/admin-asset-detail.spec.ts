import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.setExtraHTTPHeaders({ 'x-e2e-auth': 'bypass' });
});

test.describe("@studio Admin Asset Detail Page", () => {
  test("should render asset detail page with form and actions", async ({ page }) => {
    // Use the fixed asset ID from seed
    const assetId = "asset-e2e-fixed-001";

    // Navigate to the asset's detail page
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

  test("should display price and action buttons on detail page", async ({ page }) => {
    // Use the fixed asset ID from seed
    const assetId = "asset-e2e-fixed-001";
    const assetPrice = 12; // From seed data
    const assetCurrency = "PYUSD"; // From seed data

    // Navigate to asset detail page
    await page.goto(`/admin/assets/${assetId}`, { waitUntil: "domcontentloaded" });

    // Wait for page to load
    const heading = page.getByTestId("asset-detail-heading");
    await expect(heading).toBeVisible({ timeout: 10000 });

    // Verify price is in the form (more reliable than display text)
    const editForm = page.getByTestId("asset-edit-form");
    await expect(editForm).toBeVisible({ timeout: 10000 });

    const priceInput = editForm.getByLabel(/price/i);
    await expect(priceInput).toBeVisible();
    await expect(priceInput).toHaveValue(assetPrice.toString());

    // Verify asset actions section exists
    const actions = page.getByTestId("asset-actions");
    await expect(actions).toBeVisible();

    // At least one action button should be present
    const actionButtons = await page.locator('[data-testid="asset-actions"] button').count();
    expect(actionButtons).toBeGreaterThan(0);
  });

  test("should show asset metadata fields in edit form", async ({ page }) => {
    // Use the fixed asset ID from seed
    const assetId = "asset-e2e-fixed-001";
    const asset = {
      id: assetId,
      title: "Night Drive 88", // From seed data
      artist: "KiloWav", // From seed data
      priceAmount: 12 // From seed data
    };

    // Navigate to asset detail page
    await page.goto(`/admin/assets/${assetId}`, { waitUntil: "domcontentloaded" });

    // Wait for form to load
    const editForm = page.getByTestId("asset-edit-form");
    await expect(editForm).toBeVisible({ timeout: 10000 });

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
