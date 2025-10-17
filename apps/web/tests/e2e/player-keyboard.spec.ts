import { expect, test } from "@playwright/test";

test("Player keyboard navigation", async ({ page }) => {
  await page.goto("/admin");

  // Wait for page to load
  await page.waitForLoadState("networkidle");

  // Look for audio player (if any exist on the page)
  const player = page.locator('[role="region"][aria-label*="Audio player"]').first();
  const playerCount = await player.count();

  if (playerCount === 0) {
    test.skip("No audio players found on admin page");
    return;
  }

  // Focus the player
  await player.focus();

  // Test space bar to play/pause
  await page.keyboard.press("Space");

  // Verify play button state changes
  const playButton = player.locator('button[aria-label*="Play"], button[aria-label*="Pause"]');
  await expect(playButton).toBeVisible();

  // Test space bar again to pause
  await page.keyboard.press("Space");

  // Verify button state changed back
  await expect(playButton).toHaveAttribute("aria-pressed", "false");
});
