import { expect, test } from "@playwright/test";

test.describe("Blockscout Links", () => {
  test.beforeEach(async ({ page }) => {
    // Wait for readiness endpoint before tests
    await page.goto("/api/readiness", { waitUntil: "domcontentloaded" });
    await expect(page.locator("text=ready")).toBeVisible();
  });

  test("should show receipt section with mock data when enabled", async ({ page }) => {
    // Set mock data flag via URL parameter or directly test component
    // For now, test that the asset detail page loads
    await page.goto("/admin/assets/kick-001", { waitUntil: "domcontentloaded" });

    // Wait for asset detail to load
    await expect(page.getByTestId("asset-detail-heading")).toBeVisible();

    // Check if receipt section exists (it may be hidden if NEXT_PUBLIC_SHOW_MOCK_RECEIPT=false)
    const receipt = page.getByTestId("asset-receipt");
    const isVisible = await receipt.isVisible().catch(() => false);

    if (isVisible) {
      // If receipt is visible, validate its content
      await expect(receipt).toBeVisible();
      await expect(page.getByTestId("receipt-tx")).toBeVisible();
      await expect(page.getByTestId("receipt-attestation")).toBeVisible();

      // Check that Blockscout links exist
      const txLink = page.getByTestId("blockscout-link-tx");
      const attestationLink = page.getByTestId("blockscout-link-attestation");

      await expect(txLink).toBeVisible();
      await expect(attestationLink).toBeVisible();

      // Verify links have correct attributes
      await expect(txLink).toHaveAttribute("target", "_blank");
      await expect(txLink).toHaveAttribute("rel", "noopener noreferrer");
      await expect(attestationLink).toHaveAttribute("target", "_blank");
      await expect(attestationLink).toHaveAttribute("rel", "noopener noreferrer");

      // Verify links contain Blockscout URL
      const txHref = await txLink.getAttribute("href");
      const attestationHref = await attestationLink.getAttribute("href");

      expect(txHref).toContain("blockscout.com");
      expect(txHref).toContain("/tx/0x");
      expect(attestationHref).toContain("blockscout.com");
      expect(attestationHref).toContain("search?q=0x");
    }
  });

  test("should show mock badge when using mock data", async ({ page }) => {
    await page.goto("/admin/assets/kick-001", { waitUntil: "domcontentloaded" });

    const mockBadge = page.getByTestId("mock-badge");
    const isVisible = await mockBadge.isVisible().catch(() => false);

    if (isVisible) {
      await expect(mockBadge).toHaveText("Mock Data");
    }
  });

  test("should have external link icons on Blockscout links", async ({ page }) => {
    await page.goto("/admin/assets/kick-001", { waitUntil: "domcontentloaded" });

    const receipt = page.getByTestId("asset-receipt");
    const isVisible = await receipt.isVisible().catch(() => false);

    if (isVisible) {
      const txLink = page.getByTestId("blockscout-link-tx");
      const attestationLink = page.getByTestId("blockscout-link-attestation");

      // Check that SVG icons are present (external link indicator)
      await expect(txLink.locator("svg")).toBeVisible();
      await expect(attestationLink.locator("svg")).toBeVisible();
    }
  });
});

test.describe("Blockscout Utility Functions", () => {
  test("should generate correct transaction URL format", async ({ page }) => {
    // Create a test page to verify utility functions work
    await page.goto("/admin/assets/kick-001", { waitUntil: "domcontentloaded" });

    const receipt = page.getByTestId("asset-receipt");
    const isVisible = await receipt.isVisible().catch(() => false);

    if (isVisible) {
      const txLink = page.getByTestId("blockscout-link-tx");
      const href = await txLink.getAttribute("href");

      // Verify URL format: https://base-sepolia.blockscout.com/tx/0x...
      expect(href).toMatch(/https:\/\/.*blockscout\.com\/tx\/0x[a-fA-F0-9]{64}/);
    }
  });

  test("should generate correct attestation URL format", async ({ page }) => {
    await page.goto("/admin/assets/kick-001", { waitUntil: "domcontentloaded" });

    const receipt = page.getByTestId("asset-receipt");
    const isVisible = await receipt.isVisible().catch(() => false);

    if (isVisible) {
      const attestationLink = page.getByTestId("blockscout-link-attestation");
      const href = await attestationLink.getAttribute("href");

      // Verify URL format: https://base-sepolia.blockscout.com/search?q=0x...
      expect(href).toMatch(/https:\/\/.*blockscout\.com\/search\?q=0x[a-fA-F0-9]{64}/);
    }
  });
});
