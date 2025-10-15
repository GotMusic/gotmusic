# Web App Utilities

This directory contains shared utility functions and helpers for the GotMusic web app.

## Blockscout Integration

### `blockscout.ts`

Provides utilities for generating Blockscout explorer URLs for Base Sepolia testnet.

**Functions:**
- `getBlockscoutTxUrl(txHash)` - Generate URL for transaction hash
- `getBlockscoutAttestationUrl(uid)` - Generate URL for EAS attestation UID  
- `getBlockscoutAddressUrl(address)` - Generate URL for address
- `truncateHash(hash, prefixLen, suffixLen)` - Truncate hash for display (0x1234...5678)

**Environment Variables:**
- `NEXT_PUBLIC_BLOCKSCOUT_URL` - Base URL for Blockscout (defaults to `https://base-sepolia.blockscout.com`)

**Usage:**
```typescript
import { getBlockscoutTxUrl, truncateHash } from "@/lib/blockscout";

const url = getBlockscoutTxUrl("0x123...");
const short = truncateHash("0x123...");
```

### Components

See `components/BlockscoutLink.tsx` for React components that use these utilities.

## Integration Status

**Current:** Mock data with feature flag (`NEXT_PUBLIC_SHOW_MOCK_RECEIPT`)  
**Future:** Replace with real txHash and attestation UID from database when:
- Payment system stores transaction data (see `docs.d/EXECUTION-CHECKLIST.md` section 5)
- EAS writer creates attestations (see section 2)

## Testing

E2E tests in `tests/e2e/blockscout-links.spec.ts` verify:
- Links render correctly
- URLs have proper format
- External link behavior (new tab, noopener)
- Mock badge displays when using test data

