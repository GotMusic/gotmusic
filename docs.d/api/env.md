# API Environment Variables

> **Audience:** Internal documentation for GotMusic builders  
> **Status:** Active  
> **Updated:** 2025-10-16

## Overview

This document provides detailed information about all environment variables used in the GotMusic API and web application. For a quick reference, see the main `README.md`. For example values, see `.env.example` at the project root.

---

## Database

### `DATABASE_URL` (Required)

**Purpose:** PostgreSQL connection string for Drizzle ORM.

**Format:**
```
postgresql://[user]:[password]@[host]:[port]/[database]?[options]
```

**Examples:**
```bash
# Local development (Docker)
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/gotmusic_dev

# Neon (serverless)
DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require

# Supabase
DATABASE_URL=postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres

# Railway
DATABASE_URL=postgresql://postgres:pass@containers-us-west-xxx.railway.app:5432/railway
```

**Notes:**
- Must be PostgreSQL (no SQLite support)
- Connection pooling supported via query parameters
- SSL mode recommended for production: `?sslmode=require`
- Used by: Drizzle ORM, database migrations, seeds

**Related Files:**
- `apps/web/src/server/db/config.ts` - Database configuration
- `apps/web/drizzle.config.ts` - Drizzle configuration
- `apps/web/src/server/db/schema.ts` - Database schema

---

## Storage

### Storage Mode

#### `GM_STORAGE_MODE`

**Purpose:** High-level storage mode selector.

**Values:**
- `stub` - Development mode (httpbin placeholders)
- `s3` - AWS S3
- `r2` - Cloudflare R2

**Default:** `stub`

**Notes:**
- Overrides `STORAGE_DRIVER` if set
- Used in: `apps/web/src/app/api/upload/sign/route.ts`

#### `STORAGE_DRIVER`

**Purpose:** Legacy storage driver selector (fallback for `GM_STORAGE_MODE`).

**Values:** Same as `GM_STORAGE_MODE`

**Default:** `stub`

### Public CDN URLs

#### `STORAGE_PUBLIC_BASE` (Recommended for Production)

**Purpose:** Base URL for public CDN serving uploaded files.

**Format:** `https://[your-cdn-domain]`

**Priority:** **Highest** (overrides all driver-specific URLs)

**Example:**
```bash
STORAGE_PUBLIC_BASE=https://cdn.gotmusic.app
```

**Usage:**
```typescript
import { getPublicStorageUrl } from "@/lib/storage";

const publicUrl = getPublicStorageUrl("assets/file.mp3");
// => "https://cdn.gotmusic.app/assets/file.mp3"
```

#### `NEXT_PUBLIC_STORAGE_PUBLIC_BASE`

**Purpose:** Client-side variant of `STORAGE_PUBLIC_BASE`.

**Notes:**
- Falls back to server-side `STORAGE_PUBLIC_BASE`
- Use when generating URLs in client components
- Exposed to browser (prefixed with `NEXT_PUBLIC_`)

### AWS S3 Configuration

#### `STORAGE_BUCKET`

**Purpose:** S3 bucket name for asset storage.

**Example:** `gotmusic-production-assets`

**Notes:**
- Must exist before use
- Requires appropriate bucket policies for public access (if serving directly)

#### `AWS_REGION`

**Purpose:** AWS region for S3 bucket.

**Default:** `us-east-1`

**Examples:** `us-west-2`, `eu-west-1`, `ap-southeast-1`

#### `AWS_ACCESS_KEY_ID`

**Purpose:** AWS IAM access key for S3 operations.

**Security:** **CRITICAL** - Never commit to git!

**Permissions Required:**
- `s3:PutObject` - Upload files
- `s3:GetObject` - Download files (if using signed URLs)

#### `AWS_SECRET_ACCESS_KEY`

**Purpose:** AWS IAM secret key for S3 operations.

**Security:** **CRITICAL** - Never commit to git!

#### `AWS_CLOUDFRONT_DOMAIN`

**Purpose:** CloudFront distribution domain for public file access.

**Format:** `https://d[id].cloudfront.net`

**Example:** `https://d123456789abcd.cloudfront.net`

**Notes:**
- Optional (can use direct S3 URLs)
- Recommended for production (CDN caching, DDoS protection)
- Falls back to `STORAGE_PUBLIC_BASE` if not set

### Cloudflare R2 Configuration

#### `R2_ACCOUNT_ID`

**Purpose:** Cloudflare R2 account ID.

**Example:** `abc123def456ghi789`

**Where to Find:** Cloudflare Dashboard → R2 → Overview

#### `R2_ACCESS_KEY_ID`

**Purpose:** R2 API token access key.

**Security:** **CRITICAL** - Never commit to git!

**How to Create:** Cloudflare Dashboard → R2 → Manage R2 API Tokens

#### `R2_SECRET_ACCESS_KEY`

**Purpose:** R2 API token secret key.

**Security:** **CRITICAL** - Never commit to git!

#### `R2_PUBLIC_DOMAIN`

**Purpose:** R2 public bucket domain (if using R2 public buckets or custom domain).

**Format:** `https://pub-[id].r2.dev` or custom domain

**Example:** `https://pub-abc123.r2.dev`

**Notes:**
- Optional (only if bucket is public)
- Can use custom domain via Cloudflare DNS
- Falls back to `STORAGE_PUBLIC_BASE` if not set

---

## Admin Authentication

### `ADMIN_USER`

**Purpose:** Basic auth username for admin panel and upload endpoints.

**Default:** `admin`

**Scope:** Development only (production should use proper auth)

**Protected Routes:**
- `/admin/*`
- `/api/upload/*`

### `ADMIN_PASS`

**Purpose:** Basic auth password for admin panel and upload endpoints.

**Default:** `password` (from `env.template`)

**Security:** Change in production! Use strong passwords.

**Implementation:** `apps/web/src/middleware.ts`

---

## Blockchain / Web3 (Planned)

### Base Network

#### `NEXT_PUBLIC_BASE_RPC`

**Purpose:** Base network RPC endpoint.

**Examples:**
- Testnet (Sepolia): `https://sepolia.base.org`
- Mainnet: `https://mainnet.base.org`

**Notes:**
- Public RPC (no authentication required)
- Can use alternative providers (Alchemy, Infura, etc.)

#### `NEXT_PUBLIC_BASE_CHAIN_ID`

**Purpose:** Base network chain ID.

**Values:**
- `84532` - Base Sepolia (testnet)
- `8453` - Base Mainnet

### Ethereum Attestation Service (EAS)

#### `EAS_CHAIN_ID`

**Purpose:** Chain ID for EAS contracts.

**Values:** Same as `NEXT_PUBLIC_BASE_CHAIN_ID`

#### `EAS_SCHEMA_VENDOR`

**Purpose:** UID of EAS schema for vendor verification.

**Format:** `0x[64 hex characters]`

**Example:** `0x1234567890abcdef...`

**Where to Find:** After deploying schema to EAS

#### `EAS_SCHEMA_LICENSE`

**Purpose:** UID of EAS schema for license receipts.

**Format:** `0x[64 hex characters]`

**Example:** `0xabcdef1234567890...`

**Where to Find:** After deploying schema to EAS

### Lit Protocol

#### `LIT_NETWORK`

**Purpose:** Lit Protocol network name.

**Values:**
- `datil-test` - Testnet
- `datil` - Mainnet

**Default:** `datil-test`

#### `NEXT_PUBLIC_LIT_NETWORK`

**Purpose:** Client-side variant of `LIT_NETWORK`.

**Notes:** Exposed to browser (prefixed with `NEXT_PUBLIC_`)

### Lighthouse

#### `LIGHTHOUSE_API_KEY`

**Purpose:** API key for Lighthouse encrypted storage.

**Security:** **CRITICAL** - Never commit to git!

**How to Get:** Register at https://lighthouse.storage

### Avail Nexus

#### `AVAIL_NEXUS_CONFIG`

**Purpose:** Avail Nexus configuration (URL or JSON).

**Format:** URL to config JSON or inline JSON string

**Example:** `https://nexus.avail.com/config.json`

### PYUSD

#### `PYUSD_CONTRACT_ADDRESS`

**Purpose:** PYUSD token contract address.

**Format:** `0x[40 hex characters]`

**Example:** `0x6c3ea9036406852006290770BEdFcAbA0e23A0e8` (Ethereum Sepolia)

#### `PYUSD_DECIMALS`

**Purpose:** PYUSD token decimals.

**Value:** `6` (PYUSD uses 6 decimals, not 18 like ETH)

### Blockscout

#### `NEXT_PUBLIC_BLOCKSCOUT_URL`

**Purpose:** Base URL for Blockscout block explorer.

**Default:** `https://base-sepolia.blockscout.com`

**Examples:**
- Sepolia: `https://base-sepolia.blockscout.com`
- Mainnet: `https://base.blockscout.com`

**Usage:**
```typescript
import { getBlockscoutTxUrl } from "@/lib/blockscout";

const url = getBlockscoutTxUrl("0x123...");
// => "https://base-sepolia.blockscout.com/tx/0x123..."
```

---

## Feature Flags

### `NEXT_PUBLIC_SHOW_MOCK_RECEIPT`

**Purpose:** Show mock receipt data in development.

**Values:** `true` / `false` / (unset)

**Default:** `false`

**Usage:** Displays mock blockchain receipts before real integration is complete.

### `NEXT_PUBLIC_ENABLE_ADMIN`

**Purpose:** Enable/disable admin panel.

**Values:** `true` / `false` / (unset)

**Default:** `true` in development, `false` in production

**Notes:** Can be used to disable admin routes in production.

---

## Development / Debugging

### `NEXT_TELEMETRY_DISABLED`

**Purpose:** Disable Next.js telemetry collection.

**Values:** `1` to disable

**Default:** (unset, telemetry enabled)

**Privacy:** Recommended to disable for internal projects.

### `NODE_ENV`

**Purpose:** Node.js environment mode.

**Values:**
- `development` - Development mode (hot reload, verbose errors)
- `production` - Production mode (optimized builds, minimal logging)
- `test` - Testing mode

**Default:** Auto-detected by Next.js

**Notes:**
- Usually auto-set, manual override rarely needed
- Affects Next.js behavior, logging, and error handling

---

## CI/CD (GitHub Actions)

### `GITHUB_TOKEN`

**Purpose:** GitHub Actions authentication token.

**Scope:** Automatically provided in CI environment

**Usage:**
- Access GitHub API
- Create comments, labels, releases
- Trigger other workflows

**Permissions:** Defined in workflow YAML files

### `GITLEAKS_LICENSE`

**Purpose:** Gitleaks license key for Organizations.

**Required:** Only for GitHub Organizations (not personal accounts)

**Where to Get:** Purchase from Gitleaks

**Usage:** Secret scanning in CI (`.github/workflows/ci.yml`)

---

## Environment Variable Priority

When multiple variables define the same thing, this is the priority order:

### Storage Public URLs:
1. `STORAGE_PUBLIC_BASE` (highest priority)
2. Driver-specific domains (`AWS_CLOUDFRONT_DOMAIN`, `R2_PUBLIC_DOMAIN`)
3. Computed URLs (from bucket + region/account)
4. Stub mode (httpbin fallback)

### Storage Driver:
1. `GM_STORAGE_MODE` (if set)
2. `STORAGE_DRIVER` (fallback)
3. `stub` (default)

---

## Security Best Practices

1. **Never commit secrets:**
   - Use `.env.local` for local development (gitignored)
   - Use GitHub Secrets for CI/CD
   - Use cloud provider secret managers for production

2. **Rotate exposed secrets immediately:**
   - If accidentally committed, rotate the secret
   - Use `git filter-branch` or BFG Repo-Cleaner to remove from history
   - Force push to update remote

3. **Use least-privilege IAM policies:**
   - Only grant necessary permissions
   - Use separate keys for dev/staging/prod

4. **Validate in code:**
   - Check for required variables at startup
   - Use Zod or similar for schema validation
   - Fail fast with clear error messages

5. **Audit regularly:**
   - Review `.env.local` files
   - Check GitHub Secrets usage
   - Monitor access logs

---

## Troubleshooting

### "Missing DATABASE_URL"

**Cause:** `DATABASE_URL` not set in `.env.local`

**Fix:**
```bash
echo "DATABASE_URL=postgresql://postgres:postgres@localhost:5433/gotmusic_dev" >> apps/web/.env.local
```

### "Storage credentials missing, falling back to stub"

**Cause:** Missing AWS/R2 credentials when `STORAGE_DRIVER` is not `stub`

**Fix:**
- Check that all required variables are set (see AWS S3 or R2 sections above)
- Verify credentials are correct
- Or set `GM_STORAGE_MODE=stub` for development

### "NEXT_PUBLIC_* not available in server components"

**Cause:** Using client-side env vars in server components

**Fix:**
- Use server-side variants (without `NEXT_PUBLIC_` prefix) in server components
- Or convert component to client component with `'use client'` directive

---

## Related Documentation

- **README.md** - Quick reference table
- **env.template** - Commented template for all variables
- **.env.example** - Complete example with all variables
- **apps/web/src/lib/storage.ts** - Storage URL generation
- **apps/web/src/middleware.ts** - Admin authentication
- **apps/web/src/server/db/config.ts** - Database configuration

---

**Last Updated:** 2025-10-16 • **Owner:** @grantedwards

