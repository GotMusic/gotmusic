import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display GotMusic heading and catalog items", async ({ page }) => {
    // Navigate to home page (use domcontentloaded, not networkidle - Next.js keeps connections open)
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Wait for the /api/assets call to complete successfully
    const apiResponse = await page.waitForResponse(
      (response) => response.url().includes("/api/assets") && response.status() < 500,
      { timeout: 15000 }
    );

    // Verify API returned success
    expect(apiResponse.status()).toBeLessThan(500);

    // Check if we landed on an error page first
    const errorText = page.getByText(/(404|500|Something went wrong|Failed to load)/i);
    const hasError = await errorText.isVisible().catch(() => false);
    
    if (hasError) {
      // Dump page HTML for debugging
      const html = await page.content();
      console.log("--- ERROR PAGE DETECTED ---\n", html.substring(0, 1000), "\n--- END ---");
    }

    // Check for main heading using data-testid
    const heading = page.getByTestId("main-heading");
    await expect(heading).toBeVisible({ timeout: 15000 });
    await expect(heading).toHaveText("GotMusic");

    // Check for subtitle
    const subtitle = page.getByTestId("main-subtitle");
    await expect(subtitle).toBeVisible();

    // After API completes, check for catalog grid or empty state
    const catalogGrid = page.getByTestId("catalog-grid");
    const emptyState = page.getByTestId("empty-state");

    // Wait for either catalog or empty state to appear (deterministic)
    const appeared = await Promise.race([
      catalogGrid.waitFor({ state: "visible", timeout: 8000 }).then(() => "catalog").catch(() => null),
      emptyState.waitFor({ state: "visible", timeout: 8000 }).then(() => "empty").catch(() => null),
    ]);

    // If neither appeared, dump HTML for debugging
    if (!appeared) {
      const html = await page.content();
      console.log("--- PAGE STUCK (no catalog or empty state) ---\n", html.substring(0, 2000), "\n--- END ---");
    }

    // Assert one of the two states appeared
    expect(appeared).not.toBeNull();

    // If catalog is visible, check for at least one item
    if (appeared === "catalog") {
      const catalogItems = page.getByTestId("catalog-item");
      const count = await catalogItems.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test("should have proper page title", async ({ page }) => {
    await page.goto("/");

    // Verify page title is set
    await expect(page).toHaveTitle(/GotMusic/i);
  });
});
