# Architecture Overview

## Goals
- Private delivery of audio assets with verifiable purchases and licenses.
- Clear separation: on-chain receipts, off-chain encrypted content.
- Production-grade: idempotent flows, observable events, clean roll-forward/back.

## Components (Current State)

### **Implemented (All P1 Complete):**

- **Web (Next.js 15)**: Marketing catalog + admin dashboard
  - App Router with React 19
  - TailwindCSS + Design Tokens
  - Drizzle ORM + SQLite + Postgres (dual driver)
  - TanStack Query for data fetching
  - Playwright E2E testing
  - OpenAPI 3.0 documentation + Swagger UI

- **Mobile (Expo 53)**: Buyer app with playback
  - React Native 0.79 with Expo Router
  - NativeWind for styling
  - QueryClient provider with proper configuration
  - Audio preview with 30-second playback limit
  - Library screen with owned assets and pull-to-refresh
  - Asset detail screens with playback controls

- **Database (Drizzle + SQLite + Postgres)**:
  - `assets` table: catalog items with status lifecycle
  - `asset_files` table: original + preview + artwork tracking
  - `asset_audit` table: append-only change tracking
  - Relations: asset → many files, asset → many audit logs
  - Dual driver support (DB_DRIVER=sqlite|pg)

- **API (REST via Next.js API Routes)**:
  - `GET /api/assets` - Paginated asset list with filtering
  - `GET /api/assets/:id` - Single asset detail
  - `PATCH /api/assets/:id` - Update asset with idempotency
  - `GET /api/assets/:id/audit` - Asset audit log
  - `GET /api/assets/:id/download` - Download URL generation
  - `POST /api/upload/sign` - Pre-signed upload URLs (R2/S3)
  - `POST /api/upload/notify` - Track uploads + set processing status
  - `POST /api/upload/complete` - Complete asset processing
  - All endpoints: Zod validation + proper error handling

- **Admin Panel**:
  - Asset management with optimistic updates
  - Asset detail forms with validation
  - Processing lifecycle management
  - Download link generation

- **Storage (Hybrid Architecture)**:
  - **Previews**: R2/S3 (fast browsing) - 30s clips, artwork, waveforms
  - **Master Files**: IPFS via Lighthouse (cheap storage) - encrypted full files
  - **Cached Playback**: R2/S3 (fast streaming) - decrypted files for purchased content
  - **Development**: Stub mode (httpbin) for testing
  - **Production**: R2/S3 + Lighthouse + IPFS integration

- **Payment System**:
  - Feature flag system (GM_FEATURE_PAYMENTS)
  - Deterministic mock payment service
  - Payment intent creation and processing
  - Ready for real payment integration

- **UI Components (`@gotmusic/ui`)**:
  - Token-based Button + Card components
  - Shared between web & mobile

- **Design System (`@gotmusic/tokens`)**:
  - Style Dictionary pipeline
  - Outputs: `web.css`, `native.ts`, `native.cjs`
  - Token parity checks

- **API Documentation**:
  - OpenAPI 3.0 specification generation
  - Swagger UI for interactive testing
  - Development-only access controls

### **Planned/In Progress:**
- Mobile (Expo 53): buyer app and playback
- Smart contracts (Base): marketplace + layaway escrow
- EAS (Base): attestations (vendor, status, license, payment)
- Storage: Hybrid R2/S3 + Lighthouse + IPFS integration
- Access control: Lit Protocol (MPC-TSS, Actions, ACCs)
- Payments: PYUSD on Ethereum via Avail Nexus Bridge & Execute to Base
- Explorer: Blockscout (Base + Base Sepolia)

## High-level flow (purchase)
1) Buyer selects listing on Base.
2) Payment intent: user pays PYUSD on Ethereum.
3) Avail Nexus executes a call on Base marketplace to record purchase.
4) Marketplace emits `PurchaseRecorded`.
5) App writes `license-receipt` (EAS) referencing asset + buyer.
6) Lit Action evaluates ACC (license exists) and returns symmetric key shares.
7) Client decrypts from Lighthouse and plays/downloads.

## High-level flow (layaway)
1) Buyer reserves exclusive listing with deposit.
2) Pays installments per schedule (PYUSD on Ethereum) → Nexus executes on Base.
3) Contract tracks progress; emits `PaymentReceived` per installment.
4) On completion, emits `Completed` → app writes `license-receipt`.
5) Lit ACC evaluates true → full decryption enabled.

## Privacy model
- **Master files**: encrypted in IPFS via Lighthouse; keys held by Lit; ACC based on license attestation
- **Previews**: separate, 30s low-bitrate assets on R2/S3; public access for browsing
- **Cached playback**: decrypted files temporarily cached on R2/S3 for smooth streaming

## Reliability
- Listen to on-chain events (Base) and Avail execution statuses.
- Idempotent writers for EAS + Lit grants.
- Observability: structured logs + Blockscout links.
