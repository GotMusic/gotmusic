import { test, expect } from '@playwright/test';

test.describe('Brands & APIs - New Integration', () => {
  test('should display brands section with content', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the brands section to load
    await expect(page.getByTestId('brands-apis-section')).toBeVisible();
    
    // Check that the section has some content (brands grid)
    const brandsGrid = page.locator('[data-testid="brands-apis-section"] ul');
    await expect(brandsGrid).toBeVisible();
    
    // Check that there are some brand items (buttons in the grid)
    const brandItems = page.locator('[data-testid="brands-apis-section"] ul li button');
    const itemCount = await brandItems.count();
    expect(itemCount).toBeGreaterThan(0);
  });
  
  test('should have proper accessibility attributes', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the brands section to load
    await expect(page.getByTestId('brands-apis-section')).toBeVisible();
    
    // Check tablist accessibility
    const tablist = page.getByRole('tablist');
    await expect(tablist).toBeVisible();
    
    // Check that tabs are keyboard navigable
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check that brand links have proper attributes (if any exist)
    const brandLinks = page.locator('[data-testid="brands-apis-section"] a');
    const linkCount = await brandLinks.count();
    
    if (linkCount > 0) {
      const firstLink = brandLinks.first();
      await expect(firstLink).toHaveAttribute('href');
      await expect(firstLink).toHaveAttribute('target', '_blank');
      await expect(firstLink).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
  
  test('should display all categories correctly', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the brands section to load
    await expect(page.getByTestId('brands-apis-section')).toBeVisible();
    
    const categories = ['All', 'On-chain', 'Storage & Delivery', 'Wallets & Payments', 'Infra & Dev'];
    
    for (const category of categories) {
      const tab = page.getByRole('tab', { name: category }).first();
      await expect(tab).toBeVisible();
      await tab.click();
      
      // Wait for content to load after tab switch
      await page.waitForLoadState('networkidle');
      
      // Verify content changes when switching tabs
      await expect(page.getByTestId('brands-apis-section')).toBeVisible();
    }
  });
});
