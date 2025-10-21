import { expect, test } from "@playwright/test";

test.describe("@public Home Page", () => {
  test("@smoke should display discovery homepage with hero and search", async ({ page }) => {
    // Navigate to home page
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Check for hero heading
    const heading = page.locator("h1");
    await expect(heading).toBeVisible({ timeout: 10000 });
    await expect(heading).toContainText("Sounds that ship");

    // Check for search form
    const searchInput = page.locator('input[type="search"]');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute("placeholder", /Search by/i);

    // Check for Browse button
    const browseButton = page.getByRole("button", { name: "Browse" });
    await expect(browseButton).toBeVisible();

    // Check for "How It Works" section
    const howItWorksHeading = page.getByRole("heading", { name: "How It Works" });
    await expect(howItWorksHeading).toBeVisible();

    // Check for CTA to catalog
    const catalogLink = page.getByRole("link", { name: /Browse Catalog/i });
    await expect(catalogLink).toBeVisible();
    await expect(catalogLink).toHaveAttribute("href", "/catalog");
  });

  test("should have proper page title", async ({ page }) => {
    await page.goto("/");

    // Verify page title is set
    await expect(page).toHaveTitle(/GotMusic/i);
  });
});
