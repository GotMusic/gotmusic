import { test, expect } from "@playwright/test";

test.describe("@public-smoke", () => {
  test("Brands & APIs section renders", async ({ page }) => {
    await page.goto("/");
    
    // Wait for hydration
    await expect(page.getByRole("heading", { name: "Brands & APIs we run on" })).toBeVisible();
    await expect(page.getByTestId("brands-apis-section")).toBeVisible();
    
    // We expect at least 12 logos visible (first slice of 16)
    const links = page.locator('[data-testid="brands-apis-section"] a[role="listitem"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(11);
  });

  test("Brands & APIs tabs work", async ({ page }) => {
    await page.goto("/");
    const section = page.getByTestId("brands-apis-section");
    await expect(section).toBeVisible();

    // Tabs exist
    await expect(page.getByRole("tab", { name: "On-chain" })).toBeVisible();

    // Switch to On-chain and ensure there's at least one logo
    await page.getByRole("tab", { name: "On-chain" }).click();
    const items = section.locator('a[role="listitem"]');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });
});
