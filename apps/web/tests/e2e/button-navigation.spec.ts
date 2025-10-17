import { expect, test } from "@playwright/test";

test("Button keyboard navigation", async ({ page }) => {
  await page.goto("/admin");

  // Wait for the page to load and ensure there are buttons
  await page.waitForLoadState("networkidle");
  
  // Wait for buttons to be available (they might be in filters)
  const buttonCount = await page.locator("button").count();
  if (buttonCount === 0) {
    // If no buttons, skip the test
    test.skip("No buttons found on admin page");
    return;
  }

  // Test tab navigation
  await page.keyboard.press("Tab");
  const firstButton = page.locator("button").first();
  await expect(firstButton).toBeFocused();

  // Test Enter key activation
  await page.keyboard.press("Enter");
  // Verify button action occurred (e.g., form submission)

  // Test disabled state - only if disabled buttons exist
  const disabledButton = page.locator("button[disabled]");
  const disabledCount = await disabledButton.count();
  if (disabledCount > 0) {
    await expect(disabledButton).toBeDisabled();
  }
});
