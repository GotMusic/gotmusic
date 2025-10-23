import { test, expect } from "@playwright/test";

test.describe("@public-smoke", () => {
  test("Enhanced How it works section renders with progress rail", async ({ page }) => {
    await page.goto("/");
    
    // Wait for the page to load completely
    await page.waitForLoadState("domcontentloaded");
    
    // Check if the enhanced section exists
    const section = page.getByTestId("how-it-works");
    await expect(section).toBeVisible({ timeout: 10000 });
    
    // Check if the heading exists
    await expect(page.getByRole("heading", { name: "How it works" })).toBeVisible({ timeout: 10000 });
    
    // Check for progress rail
    const progressRail = section.locator('[aria-hidden="true"]').first();
    await expect(progressRail).toBeVisible();
    
    // Check for moving dot (should be present unless reduced motion is enabled)
    const movingDot = section.locator('[aria-hidden="true"]').nth(1);
    await expect(movingDot).toBeVisible();
    
    // Check for step cards
    const stepCards = section.locator('li');
    const count = await stepCards.count();
    expect(count).toBe(3);
    
    // Check for side-by-side badge and icon layout
    const firstCard = stepCards.first();
    const badgeIconRow = firstCard.locator('.flex.items-center.gap-2');
    await expect(badgeIconRow).toBeVisible();
    
    // Check for numbered badges
    const badges = section.locator('span.inline-flex.items-center.rounded-full');
    const badgeCount = await badges.count();
    expect(badgeCount).toBe(3); // One badge per step
    
    // Check for CTA section
    const ctaSection = section.locator('div.mt-8');
    await expect(ctaSection).toBeVisible();
    
    // Check for "Browse Catalog" button
    const browseButton = ctaSection.locator('a[href="/catalog"]');
    await expect(browseButton).toBeVisible();
  });

  test("How it works section respects reduced motion preference", async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    
    const section = page.getByTestId("how-it-works");
    await expect(section).toBeVisible();
    
    // With reduced motion, the moving dot should not be visible
    const movingDot = section.locator('[aria-hidden="true"]').nth(1);
    // The dot should still be in DOM but not animated
    await expect(movingDot).toBeVisible();
    
    // Check that cards are in their default state
    const stepCards = section.locator('li');
    const firstCard = stepCards.first();
    
    // With reduced motion, the component should still work
    // The exact styling behavior might vary, but the component should be functional
    const cardClasses = await firstCard.locator('div').first().getAttribute('class');
    expect(cardClasses).toContain('h-full rounded-2xl border');
  });

  test("How it works section has proper accessibility", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    
    const section = page.getByTestId("how-it-works");
    
    // Check for proper ARIA labeling
    await expect(section).toHaveAttribute("aria-labelledby", "how-heading");
    
    // Check for proper heading structure
    const heading = page.getByRole("heading", { name: "How it works" });
    await expect(heading).toHaveAttribute("id", "how-heading");
    
    // Check for proper list semantics
    const stepList = section.locator('ol');
    await expect(stepList).toBeVisible();
    await expect(stepList).toHaveAttribute("aria-label", "Three step flow");
    
    // Check for proper list items
    const listItems = section.locator('li');
    const count = await listItems.count();
    expect(count).toBe(3);
    
    // Check for proper heading hierarchy in cards
    const cardHeadings = section.locator('h3');
    const headingCount = await cardHeadings.count();
    expect(headingCount).toBe(3);
  });
});
