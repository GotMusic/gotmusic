/**
 * Payment service
 * Automatically switches between mock and real implementations based on GM_FEATURE_PAYMENTS
 */

import { isPaymentEnabled } from "./config";
import {
  type PaymentIntent,
  type PaymentResult,
  createMockPaymentIntent,
  processMockPayment,
  verifyMockPayment,
} from "./mock";

/**
 * Create payment intent for an asset purchase
 * @param assetId - Asset ID to purchase
 * @param amount - Payment amount
 * @param currency - Payment currency (e.g., "PYUSD")
 * @returns Payment intent object
 */
export function createPaymentIntent(
  assetId: string,
  amount: number,
  currency: string,
): PaymentIntent {
  if (isPaymentEnabled()) {
    // TODO: Implement real PYUSD payment via Avail Nexus
    throw new Error("Real payments not yet implemented");
  }

  // Use mock for development
  return createMockPaymentIntent(assetId, amount, currency);
}

/**
 * Process payment intent
 * @param intent - Payment intent to process
 * @returns Payment result with transaction details
 */
export function processPayment(intent: PaymentIntent): PaymentResult {
  if (isPaymentEnabled()) {
    // TODO: Implement real PYUSD payment processing
    throw new Error("Real payments not yet implemented");
  }

  // Use mock for development
  return processMockPayment(intent);
}

/**
 * Verify payment status
 * @param intentId - Payment intent ID to verify
 * @returns Verification result
 */
export function verifyPayment(intentId: string): {
  verified: boolean;
  status: "succeeded" | "failed";
} {
  if (isPaymentEnabled()) {
    // TODO: Implement real payment verification
    throw new Error("Real payments not yet implemented");
  }

  // Use mock for development
  return verifyMockPayment(intentId);
}

// Re-export types
export type { PaymentIntent, PaymentResult } from "./mock";
