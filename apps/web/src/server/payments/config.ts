/**
 * Payment configuration and feature flags
 */

export const PAYMENT_CONFIG = {
  /**
   * Enable real payment processing (PYUSD via Avail Nexus)
   * Set to "false" to use deterministic mock payments
   * @default "false"
   */
  enabled: process.env.GM_FEATURE_PAYMENTS === "true",
} as const;

/**
 * Check if payment features are enabled
 */
export function isPaymentEnabled(): boolean {
  return PAYMENT_CONFIG.enabled;
}
