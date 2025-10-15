/**
 * Tests for currency formatting utilities
 */

import { formatCurrency, formatNumber, getUserLocale } from "../currency";

describe("currency utilities", () => {
  describe("getUserLocale", () => {
    it("returns en-US on server-side (no window)", () => {
      const locale = getUserLocale();
      expect(locale).toBe("en-US");
    });

    it("returns navigator.language when available", () => {
      // Mock navigator.language
      Object.defineProperty(window.navigator, "language", {
        value: "fr-FR",
        configurable: true,
      });

      const locale = getUserLocale();
      expect(locale).toBe("fr-FR");
    });

    it("falls back to en-US when navigator.language is empty", () => {
      Object.defineProperty(window.navigator, "language", {
        value: "",
        configurable: true,
      });

      const locale = getUserLocale();
      expect(locale).toBe("en-US");
    });
  });

  describe("formatCurrency", () => {
    it("formats USD currency in en-US locale", () => {
      const formatted = formatCurrency(29.99, "USD", "en-US");
      expect(formatted).toBe("$29.99");
    });

    it("formats EUR currency in de-DE locale", () => {
      const formatted = formatCurrency(29.99, "EUR", "de-DE");
      // German locale uses comma as decimal separator
      expect(formatted).toMatch(/29,99/);
      expect(formatted).toMatch(/€/);
    });

    it("formats GBP currency in en-GB locale", () => {
      const formatted = formatCurrency(100, "GBP", "en-GB");
      expect(formatted).toMatch(/£100\.00/);
    });

    it("handles crypto currencies (PYUSD)", () => {
      const formatted = formatCurrency(100.5, "PYUSD", "en-US");
      expect(formatted).toBe("PYUSD 100.50");
    });

    it("handles crypto currencies (ETH)", () => {
      const formatted = formatCurrency(0.05, "ETH", "en-US");
      expect(formatted).toBe("ETH 0.05");
    });

    it("handles crypto currencies (BTC)", () => {
      const formatted = formatCurrency(0.001, "BTC", "en-US");
      expect(formatted).toBe("BTC 0.00");
    });

    it("formats crypto with correct decimal places", () => {
      const formatted = formatCurrency(1234.567, "USDC", "en-US");
      expect(formatted).toBe("USDC 1,234.57");
    });

    it("handles zero amounts", () => {
      const formatted = formatCurrency(0, "USD", "en-US");
      expect(formatted).toBe("$0.00");
    });

    it("handles negative amounts", () => {
      const formatted = formatCurrency(-10.5, "USD", "en-US");
      expect(formatted).toBe("-$10.50");
    });

    it("handles large amounts", () => {
      const formatted = formatCurrency(1_000_000, "USD", "en-US");
      expect(formatted).toBe("$1,000,000.00");
    });

    it("falls back gracefully for invalid currency codes", () => {
      const formatted = formatCurrency(100, "INVALID", "en-US");
      // Should still return a formatted string without crashing
      expect(formatted).toContain("100");
      expect(formatted).toContain("INVALID");
    });

    it("respects locale-specific formatting", () => {
      const formatted = formatCurrency(1234.56, "USD", "fr-FR");
      // French locale uses space as thousands separator
      expect(formatted).toMatch(/1\s?234,56/);
    });
  });

  describe("formatNumber", () => {
    it("formats numbers in en-US locale", () => {
      const formatted = formatNumber(1234.567, "en-US");
      expect(formatted).toBe("1,234.567");
    });

    it("formats numbers in de-DE locale", () => {
      const formatted = formatNumber(1234.567, "de-DE");
      // German uses period for thousands, comma for decimals
      expect(formatted).toBe("1.234,567");
    });

    it("formats numbers in fr-FR locale", () => {
      const formatted = formatNumber(1234.567, "fr-FR");
      // French uses space for thousands, comma for decimals
      expect(formatted).toMatch(/1\s234,567/);
    });

    it("handles integers", () => {
      const formatted = formatNumber(1000, "en-US");
      expect(formatted).toBe("1,000");
    });

    it("handles zero", () => {
      const formatted = formatNumber(0, "en-US");
      expect(formatted).toBe("0");
    });
  });
});
