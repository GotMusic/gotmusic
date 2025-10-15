/**
 * Currency formatting utilities using Intl.NumberFormat
 *
 * Provides locale-aware currency formatting for prices.
 * Falls back to 'en-US' if locale detection fails.
 */

/**
 * Get the user's preferred locale from the browser
 * Falls back to 'en-US' if unavailable
 */
export function getUserLocale(): string {
  if (typeof window === "undefined") {
    return "en-US"; // SSR fallback
  }

  // Try navigator.language first, then fall back to en-US
  return navigator.language || "en-US";
}

/**
 * Format a price amount with currency using Intl.NumberFormat
 *
 * @param amount - The numeric price amount
 * @param currency - The ISO 4217 currency code (e.g., 'USD', 'EUR', 'PYUSD')
 * @param locale - Optional locale override, defaults to user's browser locale
 * @returns Formatted price string (e.g., '$29.99', '€29,99')
 *
 * @example
 * formatCurrency(29.99, 'USD') // '$29.99' (in en-US locale)
 * formatCurrency(29.99, 'EUR', 'de-DE') // '29,99 €'
 * formatCurrency(100, 'PYUSD') // 'PYUSD 100.00' (custom handling for crypto)
 */
export function formatCurrency(amount: number, currency: string, locale?: string): string {
  const userLocale = locale || getUserLocale();

  // Handle crypto currencies that Intl doesn't recognize
  // PYUSD, ETH, etc. don't have standard currency symbols
  const cryptoCurrencies = ["PYUSD", "ETH", "BTC", "USDC", "USDT"];

  if (cryptoCurrencies.includes(currency.toUpperCase())) {
    // For crypto, format the number with 2 decimals and append currency code
    const formatter = new Intl.NumberFormat(userLocale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${currency.toUpperCase()} ${formatter.format(amount)}`;
  }

  // For standard fiat currencies, use Intl.NumberFormat with currency style
  try {
    const formatter = new Intl.NumberFormat(userLocale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(amount);
  } catch (error) {
    // Fallback if currency code is invalid
    console.warn(`Invalid currency code: ${currency}, falling back to plain format`);
    const formatter = new Intl.NumberFormat(userLocale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${formatter.format(amount)} ${currency}`;
  }
}

/**
 * Format a number using the user's locale
 *
 * @param value - The number to format
 * @param locale - Optional locale override
 * @returns Formatted number string
 */
export function formatNumber(value: number, locale?: string): string {
  const userLocale = locale || getUserLocale();
  return new Intl.NumberFormat(userLocale).format(value);
}
