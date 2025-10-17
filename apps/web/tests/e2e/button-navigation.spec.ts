import { expect, test } from "@playwright/test";

test("Button keyboard navigation", async ({ page }) => {
  await page.goto("/admin/assets");

  // Test tab navigation
  await page.keyboard.press("Tab");
  const firstButton = page.locator("button").first();
  await expect(firstButton).toBeFocused();

  // Test Enter key activation
  await page.keyboard.press("Enter");
  // Verify button action occurred (e.g., form submission)

  // Test disabled state
  const disabledButton = page.locator("button[disabled]");
  await expect(disabledButton).toBeDisabled();
});
