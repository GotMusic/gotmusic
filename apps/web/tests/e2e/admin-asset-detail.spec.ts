import { expect, test } from "@playwright/test";

test.describe("Admin Asset Detail Page", () => {
  test("should render asset detail page with form and actions", async ({ page }) => {
    // Navigate to a specific asset detail page
    // Note: This assumes we have at least one asset in the database
    await page.goto("/admin/assets/test_001");

    // Check for page heading
    const heading = page.getByTestId("asset-detail-heading");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Asset #test_001");

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
    const response = await page.goto("/admin/assets/non-existent");
    
    // Should get 404 response
    expect(response?.status()).toBe(404);
  });
});
