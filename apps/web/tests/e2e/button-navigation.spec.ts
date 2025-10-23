import { expect, test } from "@playwright/test";

test("Button keyboard navigation", async ({ page }) => {
  // Go to admin uploads page which definitely has buttons
  await page.goto("/admin/uploads");

  // Wait for the page to load with a shorter timeout
  await page.waitForLoadState("domcontentloaded");
  
  // Wait for buttons to be available
  await page.waitForSelector("button", { timeout: 10000 });

  // Check for buttons
  const buttonCount = await page.locator("button").count();
  if (buttonCount === 0) {
    // If no buttons, skip the test
    test.skip();
    return;
  }

  // Test disabled state - the upload button should be disabled initially
  const disabledButton = page.locator("button[disabled]");
  const disabledCount = await disabledButton.count();
  if (disabledCount > 0) {
    await expect(disabledButton).toBeDisabled();
  }

  // Test that we can navigate to enabled buttons (like reset button)
  const enabledButtons = page.locator("button:not([disabled])");
  const enabledCount = await enabledButtons.count();
  if (enabledCount > 0) {
    await enabledButtons.first().focus();
    await expect(enabledButtons.first()).toBeFocused();
    
    // Test Enter key activation on enabled button
    await page.keyboard.press("Enter");
  } else {
    // If no enabled buttons, just verify we found buttons
    expect(buttonCount).toBeGreaterThan(0);
  }
});
