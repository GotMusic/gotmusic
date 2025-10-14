/**
 * Mock payment service for development and testing
 * Returns deterministic, consistent results
 */

export interface PaymentIntent {
  id: string;
  assetId: string;
  amount: number;
  currency: string;
  status: "pending" | "processing" | "succeeded" | "failed";
  createdAt: number;
}

export interface PaymentResult {
  success: boolean;
  intentId: string;
  transactionHash?: string;
  receiptId?: string;
  error?: string;
}

/**
 * Generate deterministic payment intent ID
 * Format: pi_mock_<hash>
 */
function generateIntentId(assetId: string, amount: number): string {
  // Simple deterministic hash (same inputs = same output)
  const input = `${assetId}-${amount}`;
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return `pi_mock_${Math.abs(hash).toString(16)}`;
}

/**
 * Generate deterministic transaction hash
 * Format: 0x<64-char-hex>
 */
function generateTxHash(intentId: string): string {
  let hash = 0;
  for (let i = 0; i < intentId.length; i++) {
    const char = intentId.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  // Pad to 64 hex characters
  const hexHash = Math.abs(hash).toString(16).padStart(64, "0");
  return `0x${hexHash}`;
}

/**
 * Create mock payment intent
 * Deterministic: same inputs always produce same intent ID
 */
export function createMockPaymentIntent(
  assetId: string,
  amount: number,
  currency: string,
): PaymentIntent {
  const intentId = generateIntentId(assetId, amount);

  return {
    id: intentId,
    assetId,
    amount,
    currency,
    status: "pending",
    createdAt: Date.now(),
  };
}

/**
 * Process mock payment
 * Deterministic: even-numbered asset IDs succeed, odd-numbered fail
 * This allows testing both success and failure paths predictably
 */
export function processMockPayment(intent: PaymentIntent): PaymentResult {
  const intentId = intent.id;

  // Deterministic success/failure based on asset ID
  // Extract numeric part from asset ID (e.g., "asset-01" -> 1)
  const numericMatch = intent.assetId.match(/\d+/);
  const assetNumber = numericMatch ? Number.parseInt(numericMatch[0], 10) : 0;

  // Even numbers succeed, odd numbers fail (deterministic)
  const shouldSucceed = assetNumber % 2 === 0;

  if (shouldSucceed) {
    return {
      success: true,
      intentId,
      transactionHash: generateTxHash(intentId),
      receiptId: `receipt_mock_${intentId.slice(8)}`, // Use part of intent ID
    };
  }

  return {
    success: false,
    intentId,
    error: "Mock payment failed (odd asset number)",
  };
}

/**
 * Verify mock payment status
 * Deterministic: can check if a payment would succeed without processing
 */
export function verifyMockPayment(intentId: string): {
  verified: boolean;
  status: "succeeded" | "failed";
} {
  // Extract hash from intent ID
  const hash = intentId.replace("pi_mock_", "");
  const hashNum = Number.parseInt(hash, 16);

  // Same deterministic logic
  const shouldSucceed = hashNum % 2 === 0;

  return {
    verified: true,
    status: shouldSucceed ? "succeeded" : "failed",
  };
}
