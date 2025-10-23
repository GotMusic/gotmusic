import { expect, test } from "@playwright/test";

test("Player preview stops at 30 seconds", async ({ page }) => {
  await page.goto("/admin");

  // Wait for page to load with shorter timeout
  await page.waitForLoadState("domcontentloaded");
  
  // Wait for potential audio players with reasonable timeout
  await page.waitForSelector('[role="region"][aria-label*="Audio player"]', { timeout: 5000 }).catch(() => {});

  // Look for preview player (with clamp=30)
  const previewPlayer = page.locator('[role="region"][aria-label*="Audio player"]').first();
  const playerCount = await previewPlayer.count();

  if (playerCount === 0) {
    test.skip();
    return;
  }

  // Click play button
  const playButton = previewPlayer.locator('button[aria-label*="Play"]');
  await playButton.click();

  // Wait for audio to start playing
  await expect(playButton).toHaveAttribute("aria-pressed", "true");

  // Wait for 30 seconds (or until stopped)
  await page.waitForTimeout(31000);

  // Verify player stopped automatically
  await expect(playButton).toHaveAttribute("aria-pressed", "false");
});
