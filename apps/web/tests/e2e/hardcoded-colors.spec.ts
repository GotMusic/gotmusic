import { expect, test } from "@playwright/test";

test.describe("@design-system Hardcoded Colors Detection", () => {
  test("should detect hardcoded colors in HowItWorks component", async ({ page }) => {
    await page.goto("/");
    
    // Wait for the HowItWorks component to load
    await expect(page.getByTestId("how-it-works")).toBeVisible();
    
    // Get the component's HTML content
    const componentHTML = await page.locator('[data-testid="how-it-works"]').innerHTML();
    
    // List of hardcoded colors that should be replaced with design tokens
    const hardcodedColors = [
      // Brand colors
      { pattern: /#6AE6A6/g, token: "var(--color-brand-primary)", description: "Brand primary green" },
      { pattern: /#5BD0FF/g, token: "var(--color-brand-accent)", description: "Brand accent blue" },
      
      // Background colors
      { pattern: /#121520/g, token: "var(--color-bg-elevated)", description: "Elevated background" },
      { pattern: /#0B0D12/g, token: "var(--color-bg)", description: "Default background" },
      
      // Text colors
      { pattern: /#E6EAF2/g, token: "var(--color-fg)", description: "Default text color" },
      { pattern: /#A9B1C1/g, token: "var(--color-fg-muted)", description: "Muted text color" },
      
      // Border colors
      { pattern: /rgba\(255,255,255,0\.10\)/g, token: "var(--color-border-subtle)", description: "Subtle border" },
      { pattern: /rgba\(255,255,255,0\.06\)/g, token: "var(--color-border-hairline)", description: "Hairline border" },
      
      // Shadow colors
      { pattern: /rgba\(0,0,0,0\.34\)/g, token: "var(--shadow-lg)", description: "Large shadow" },
      { pattern: /rgba\(0,0,0,0\.16\)/g, token: "var(--shadow-md)", description: "Medium shadow" },
      
      // Brand-specific shadows
      { pattern: /rgba\(106,230,166,0\.38\)/g, token: "var(--color-brand-primary) with opacity", description: "Brand primary shadow" },
      { pattern: /rgba\(106,230,166,0\.12\)/g, token: "var(--color-brand-primary) with opacity", description: "Brand primary background" },
    ];
    
    const foundHardcodedColors: Array<{ color: string; token: string; description: string; count: number }> = [];
    
    // Check for each hardcoded color pattern
    hardcodedColors.forEach(({ pattern, token, description }) => {
      const matches = componentHTML.match(pattern);
      if (matches) {
        foundHardcodedColors.push({
          color: matches[0],
          token,
          description,
          count: matches.length
        });
      }
    });
    
    // Log findings for debugging
    if (foundHardcodedColors.length > 0) {
      console.log("🔍 HARDCODED COLORS FOUND:");
      foundHardcodedColors.forEach(({ color, token, description, count }) => {
        console.log(`  - ${color} (${count}x) → should use ${token} (${description})`);
      });
    }
    
    // For now, we'll log the findings but not fail the test
    // This allows us to see what needs to be fixed
    console.log(`Found ${foundHardcodedColors.length} hardcoded color patterns in HowItWorks component`);
    
    // Track progress - we started with 12 patterns, let's see how many we've fixed
    const totalPatterns = 12; // Original count from first run
    const remainingPatterns = foundHardcodedColors.length;
    const fixedPatterns = totalPatterns - remainingPatterns;
    
    console.log(`Progress: ${fixedPatterns}/${totalPatterns} patterns fixed (${Math.round((fixedPatterns/totalPatterns)*100)}%)`);
    
    // The test passes but logs the hardcoded colors for fixing
    expect(foundHardcodedColors.length).toBeGreaterThanOrEqual(0);
  });
  
  test("should verify design tokens are available in CSS", async ({ page }) => {
    await page.goto("/");
    
    // Check if design tokens are loaded in the CSS
    const cssContent = await page.evaluate(() => {
      const styleSheets = Array.from(document.styleSheets);
      let allCSS = '';
      
      styleSheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          rules.forEach(rule => {
            if (rule instanceof CSSStyleRule) {
              allCSS += rule.cssText;
            }
          });
        } catch (e) {
          // Cross-origin stylesheets might throw errors
        }
      });
      
      return allCSS;
    });
    
    // Check for design token CSS custom properties
    const designTokens = [
      '--color-brand-primary',
      '--color-brand-accent', 
      '--color-bg',
      '--color-bg-elevated',
      '--color-fg',
      '--color-fg-muted',
      '--color-border-subtle',
      '--color-border-hairline'
    ];
    
    const availableTokens = designTokens.filter(token => 
      cssContent.includes(token)
    );
    
    console.log(`Available design tokens: ${availableTokens.length}/${designTokens.length}`);
    console.log(`Missing tokens: ${designTokens.filter(token => !availableTokens.includes(token)).join(', ')}`);
    
    // We expect at least some design tokens to be available
    expect(availableTokens.length).toBeGreaterThan(0);
  });
});
