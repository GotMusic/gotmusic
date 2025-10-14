# Payment Service

Feature-flagged payment processing for GotMusic.

## Environment Variables

### `GM_FEATURE_PAYMENTS`

Controls payment processing mode.

- **`"false"`** (default): Use deterministic mock payments
- **`"true"`**: Use real PYUSD payments via Avail Nexus (not yet implemented)

```bash
# .env.local (development - mock payments)
GM_FEATURE_PAYMENTS=false

# .env.production (production - real payments when ready)
GM_FEATURE_PAYMENTS=true
```

## Mock Payment Behavior

The mock payment service provides **deterministic, consistent results** for testing and development.

### Deterministic Rules

1. **Intent IDs**: Same inputs (assetId + amount) always generate the same intent ID
   - Format: `pi_mock_<hex_hash>`
   - Example: `pi_mock_1a2b3c4d`

2. **Success/Failure**: Based on asset ID number
   - **Even-numbered assets** (e.g., `asset-02`, `asset-04`) → ✅ **Success**
   - **Odd-numbered assets** (e.g., `asset-01`, `asset-03`) → ❌ **Failure**

3. **Transaction Hashes**: Generated deterministically from intent ID
   - Format: `0x<64-hex-chars>`
   - Same intent ID always produces same transaction hash

4. **Receipt IDs**: Derived from intent ID
   - Format: `receipt_mock_<hash>`

### Examples

```typescript
import { createPaymentIntent, processPayment } from "@/server/payments";

// Even asset number → will succeed
const intent1 = createPaymentIntent("asset-02", 10, "PYUSD");
const result1 = processPayment(intent1);
// result1.success === true
// result1.transactionHash === "0x..."
// result1.receiptId === "receipt_mock_..."

// Odd asset number → will fail
const intent2 = createPaymentIntent("asset-01", 10, "PYUSD");
const result2 = processPayment(intent2);
// result2.success === false
// result2.error === "Mock payment failed (odd asset number)"

// Same inputs → same results (deterministic)
const intent3 = createPaymentIntent("asset-02", 10, "PYUSD");
// intent3.id === intent1.id (deterministic!)
```

## Usage

```typescript
import {
  createPaymentIntent,
  processPayment,
  verifyPayment,
  type PaymentIntent,
  type PaymentResult,
} from "@/server/payments";

// 1. Create payment intent
const intent: PaymentIntent = createPaymentIntent(
  "asset-01",  // Asset ID
  25.00,       // Amount
  "PYUSD"      // Currency
);

// 2. Process payment
const result: PaymentResult = processPayment(intent);

if (result.success) {
  console.log("Payment succeeded!");
  console.log("Transaction:", result.transactionHash);
  console.log("Receipt:", result.receiptId);
} else {
  console.log("Payment failed:", result.error);
}

// 3. Verify payment (optional)
const verification = verifyPayment(intent.id);
console.log("Status:", verification.status);
```

## Future: Real Payments

When `GM_FEATURE_PAYMENTS=true`, the service will use:
- **PYUSD** on Ethereum
- **Avail Nexus** "Bridge & Execute" intent
- **Base** for final settlement
- **EAS** attestations for receipts

Implementation tracked in separate issues.

## File Structure

```
apps/web/src/server/payments/
├── index.ts        # Main payment service (switches mock/real)
├── config.ts       # Feature flag configuration
├── mock.ts         # Mock payment implementation
└── README.md       # This file
```

