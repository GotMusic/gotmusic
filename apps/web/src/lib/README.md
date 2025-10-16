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

---

## Storage CDN URLs

### `storage.ts`

Provides utilities for converting storage keys into publicly accessible CDN URLs. Supports multiple storage backends (R2, S3, stub) and custom CDN domains.

**Functions:**
- `getPublicStorageUrl(storageKey)` - Convert storage key to public CDN URL
- `isStorageUrl(url)` - Check if URL is a storage URL
- `extractStorageKey(url)` - Extract storage key from full URL

**Environment Variables (Priority Order):**

1. **Custom CDN (Recommended):**
   ```bash
   STORAGE_PUBLIC_BASE=https://cdn.gotmusic.app
   # or for client-side
   NEXT_PUBLIC_STORAGE_PUBLIC_BASE=https://cdn.gotmusic.app
   ```

2. **R2 with Custom Domain:**
   ```bash
   STORAGE_DRIVER=r2
   R2_PUBLIC_DOMAIN=https://pub-abc123.r2.dev
   ```

3. **R2 with Public Bucket:**
   ```bash
   STORAGE_DRIVER=r2
   STORAGE_BUCKET=gotmusic-assets
   R2_ACCOUNT_ID=abc123
   ```

4. **S3 with CloudFront:**
   ```bash
   STORAGE_DRIVER=s3
   AWS_CLOUDFRONT_DOMAIN=https://d123456.cloudfront.net
   ```

5. **S3 with Public Bucket:**
   ```bash
   STORAGE_DRIVER=s3
   STORAGE_BUCKET=my-bucket
   AWS_REGION=us-west-2
   ```

6. **Stub Mode (Development):**
   ```bash
   GM_STORAGE_MODE=stub
   # Returns httpbin placeholder URLs
   ```

**Usage:**
```typescript
import { getPublicStorageUrl } from "@/lib/storage";

// Get public URL from database storage key
const asset = await db.select().from(assets).where(...);
const publicUrl = getPublicStorageUrl(asset.storageKey);
// => "https://cdn.gotmusic.app/assets/12345-abc-song.mp3"

// Use in audio player
<audio src={getPublicStorageUrl(storageKey)} controls />
```

**Testing:**
Unit tests in `__tests__/storage.test.ts` verify:
- All environment variable combinations
- URL generation for R2, S3, and stub modes
- Storage URL detection
- Key extraction from URLs
