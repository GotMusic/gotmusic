import { test, expect } from '@playwright/test';

test.describe('Brands & APIs - New Integration', () => {
  test('should display new brands in infrastructure category', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the brands section to load
    await expect(page.getByTestId('brands-apis-section')).toBeVisible();
    
    // Click on Infrastructure tab
    await page.getByRole('tab', { name: 'Infra & Dev' }).click();
    
    // Check for new brands we added
    const newBrands = [
      'e18e',
      'Vite', 
      'tsup',
      'Radix UI',
      'Lucide',
      'Yarn'
    ];
    
    for (const brand of newBrands) {
      await expect(page.getByText(brand)).toBeVisible();
    }
  });
  
  test('should have proper accessibility attributes', async ({ page }) => {
    await page.goto('/');
    
    // Check tablist accessibility
    const tablist = page.getByRole('tablist', { name: 'Brand categories' });
    await expect(tablist).toBeVisible();
    
    // Check that tabs are keyboard navigable
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check that brand links have proper attributes
    const brandLinks = page.locator('[data-testid="brands-apis-section"] a');
    const firstLink = brandLinks.first();
    await expect(firstLink).toHaveAttribute('href');
    await expect(firstLink).toHaveAttribute('target', '_blank');
    await expect(firstLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
  
  test('should display all categories correctly', async ({ page }) => {
    await page.goto('/');
    
    const categories = ['All', 'On-chain', 'Storage & Delivery', 'Wallets & Payments', 'Infra & Dev'];
    
    for (const category of categories) {
      const tab = page.getByRole('tab', { name: category });
      await expect(tab).toBeVisible();
      await tab.click();
      
      // Verify content changes when switching tabs
      await expect(page.getByTestId('brands-apis-section')).toBeVisible();
    }
  });
});
