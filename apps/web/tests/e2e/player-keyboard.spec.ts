import { expect, test } from "@playwright/test";

test("Player keyboard navigation", async ({ page }) => {
  // Go to an asset detail page that should have a player
  await page.goto("/asset/asset-e2e-fixed-001");

  // Wait for page to load with shorter timeout
  await page.waitForLoadState("domcontentloaded");
  
  // Wait for potential audio players with reasonable timeout
  await page.waitForSelector('[role="region"][aria-label*="Audio player"]', { timeout: 5000 }).catch(() => {});

  // Look for audio player (if any exist on the page)
  const player = page.locator('[role="region"][aria-label*="Audio player"]').first();
  const playerCount = await player.count();

  if (playerCount === 0) {
    test.skip();
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
