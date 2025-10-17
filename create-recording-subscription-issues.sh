#!/bin/bash
# Creates issues for Mobile Recording + Blockchain Subscriptions + Credits
# Run from repo root after: gh auth login

set -e

echo "Creating issues for Recording + Subscription features..."

# ===== Group: Mobile Recording (Issues #194-#198) ============================

gh issue create \
  --title "mobile: Record screen (expo-av) with start/stop + duration" \
  --label "type:feature,area:mobile,size:S,priority:P1" \
  --body '## Goal
Add a dedicated **Record** tab/screen in Expo with start/stop recording and live duration.

## Deliverables
- New route: `apps/mobile/app/(tabs)/record.tsx`
- Uses `expo-av` RecordingOptionsPresets.HIGH_QUALITY
- Start/Stop buttons; live timer; basic permission flow (mic)
- Navigates back to Library after stop (temp behavior)

## Acceptance Criteria
- [ ] iOS + Android both record 10s+ successfully
- [ ] Timer updates while recording
- [ ] Permissions requested only once and gracefully handled
- [ ] No crashes if user denies mic permission

## Notes
Wire minimal UI using NativeWind classes.'

gh issue create \
  --title "db: add uploadJobs and asset.priceCredits" \
  --label "type:task,area:data,size:S,priority:P1" \
  --body '## Goal
Extend schema for recording pipeline & credits pricing.

## Changes
- `upload_jobs(id, userId, assetId, stage, message, createdAt)`
- Add `priceCredits int default 10` to `assets`
- Migrations + seeds updated

## Acceptance Criteria
- [ ] `yarn db:push` succeeds
- [ ] Seeds compile + deterministic'

gh issue create \
  --title "api: /api/recordings/sign (reuse signer)" \
  --label "type:feature,area:api,size:S,priority:P1" \
  --body '## Goal
Create a signing endpoint returning pre-signed upload URL for **recordings/** prefix.

## Deliverables
- Route: `apps/web/src/app/api/recordings/sign/route.ts`
- Reuse existing storage signer; returns `{ url, key, contentType }`

## Acceptance Criteria
- [ ] Returns 200 with valid URL
- [ ] Key prefix `recordings/` enforced
- [ ] Rate-limited (reuse existing middleware if present)'

gh issue create \
  --title "api: /api/recordings/complete (create draft asset)" \
  --label "type:feature,area:api,size:S,priority:P1" \
  --body '## Goal
On successful upload, create a **draft asset** row linked to the uploader.

## Deliverables
- Route: `apps/web/src/app/api/recordings/complete/route.ts`
- Body: `{ userId, fileKey, cid, durationSec, title? }`
- Inserts into `assets` (status draft) and `upload_jobs` (stage done)

## Acceptance Criteria
- [ ] 200 response with `{ assetId }`
- [ ] DB row visible; ownerId set; durationSec set
- [ ] Reject if missing required fields'

gh issue create \
  --title "mobile: Upload pipeline (sign → PUT → complete draft asset)" \
  --label "type:feature,area:mobile,size:M,priority:P1" \
  --body '## Goal
After recording, upload the audio to storage via signed URL and mark a **draft asset**.

## Deliverables
- Use `POST /api/recordings/sign` to obtain `{ url, key, contentType }`
- Upload recorded file via `PUT` to `url`
- Notify server: `POST /api/recordings/complete` with `{ userId, fileKey, cid?, durationSec, title }`
- On success → Toast + Navigate to Library

## Dependencies
- Requires #196 (sign endpoint)
- Requires #197 (complete endpoint)

## Acceptance Criteria
- [ ] Successful upload of 1–2 minute recordings
- [ ] Draft asset row appears in DB with status `draft`
- [ ] Error toast on upload failures; retry is possible

## Notes
For MVP, set `cid := key` until CID resolution is wired.'

# ===== Group: Subscriptions + Credits (Issues #199-#208) =====================

gh issue create \
  --title "contracts: SubscriptionManager.sol (PYUSD) + CreditBank.sol" \
  --label "type:feature,area:contracts,size:M,priority:P1" \
  --body '## Goal
Deploy minimal on-chain rails: subscription charging in PYUSD (or mock) and on-chain credit ledger.

## Deliverables
- `SubscriptionManager.sol` with plans (1: $20→200 credits, 2: $40→450 credits)
- `CreditBank.sol` with manager-only `mint/spend`
- Hardhat 3 config + deploy scripts for Base Sepolia
- Addresses recorded in README + env template

## Acceptance Criteria
- [ ] Contracts verified on explorer
- [ ] Events: `Charged`, `CreditMint`, `CreditSpend` emitted as expected
- [ ] README updated with addresses'

gh issue create \
  --title "db: subscriptions & creditTransactions tables" \
  --label "type:task,area:data,size:S,priority:P1" \
  --body '## Goal
Add tables to mirror on-chain subscription + credits state.

## Schema
- `subscriptions(id ULID, userId, planId, nextRenewal, onchainTx, status)`
- `credit_transactions(id ULID, userId, type mint|spend, amount, planId?, assetId?, onchainTx?, offchainRef?)`

## Acceptance Criteria
- [ ] Drizzle migration pushed; tests green
- [ ] Seeds (optional) for local dev visual verification'

gh issue create \
  --title "api: POST /api/subscriptions/subscribe → build Nexus intent" \
  --label "type:feature,area:api,size:S,priority:P1" \
  --body '## Goal
Create a server endpoint to start a subscription and return a Nexus intent payload.

## Deliverables
- Route: `apps/web/src/app/api/subscriptions/subscribe/route.ts`
- Body: `{ userId, planId }`
- Creates local subscription row (provisional), returns `{ subscriptionId, intent }`

## Dependencies
- Requires #199 (contracts deployed)
- Requires #200 (db tables)

## Acceptance Criteria
- [ ] For plan 1 returns amount 20e6; plan 2 returns 40e6 (6 decimals)
- [ ] Uses `NEXT_PUBLIC_SUBSCRIPTION_MANAGER` for dest
- [ ] Validates planId'

gh issue create \
  --title "api: POST /api/subscriptions/webhook → mark paid & mint credits (off-chain mirror)" \
  --label "type:feature,area:api,size:S,priority:P1" \
  --body '## Goal
Webhook to finalize subscription after Nexus/explorer confirms payment.

## Deliverables
- Route: `apps/web/src/app/api/subscriptions/webhook/route.ts`
- Body: `{ userId, planId, txHash, subscriptionId }`
- Updates subscription (onchainTx, nextRenewal), inserts `credit_transactions`(mint)

## Dependencies
- Requires #199 (contracts)
- Requires #200 (db tables)

## Acceptance Criteria
- [ ] Idempotent on duplicate webhook
- [ ] Returns minted credits (200/450)
- [ ] Unit test covers double-delivery'

gh issue create \
  --title "api: POST /api/credits/spend → buy asset with credits" \
  --label "type:feature,area:api,size:S,priority:P1" \
  --body '## Goal
Endpoint to spend credits for an asset priced in credits.

## Deliverables
- Route: `apps/web/src/app/api/credits/spend/route.ts`
- Body: `{ userId, assetId }`
- Computes balance (sum mints - sum spends), rejects insufficient balance, records spend

## Dependencies
- Requires #200 (db: creditTransactions table)

## Acceptance Criteria
- [ ] 402 when balance < price
- [ ] 200 with new balance when success
- [ ] Contract test verifies JSON schema'

gh issue create \
  --title "web: Account page (plan picker) + Subscribe button" \
  --label "type:feature,area:web,size:S,priority:P2" \
  --body '## Goal
UI to choose a plan and kick off the Nexus payment (client-side SDK later).

## Deliverables
- `apps/web/src/app/account/page.tsx`
- Plan selector (Plan 1/Plan 2), Subscribe CTA
- Calls `/api/subscriptions/subscribe`, displays returned intent (dev log OK)

## Dependencies
- Requires #201 (subscribe endpoint)

## Acceptance Criteria
- [ ] Visual selection with focus states (a11y)
- [ ] Success and error toasts
- [ ] Copy intent JSON to clipboard button (dev helper)'

gh issue create \
  --title "web: Buy with Credits button on Asset page/card" \
  --label "type:feature,area:web,size:S,priority:P2" \
  --body '## Goal
Allow purchasing assets using credits directly from catalog or detail.

## Deliverables
- Button that calls `/api/credits/spend`
- Success toast with new balance; error toast on insufficient

## Dependencies
- Requires #203 (spend endpoint)

## Acceptance Criteria
- [ ] Button disabled while pending
- [ ] A11y: aria-live for toast
- [ ] E2E: buys seeded asset with mock user balance'

gh issue create \
  --title "ops: Webhook wire-up (explorer/Nexus) + .env docs" \
  --label "type:task,area:ops,size:S,priority:P2" \
  --body '## Goal
Wire webhook to explorer/Nexus and document required environment variables.

## Deliverables
- Public endpoint URL registered in provider dashboard (manual step)
- `env.template` entries for: `NEXT_PUBLIC_PYUSD_ADDRESS`, `NEXT_PUBLIC_SUBSCRIPTION_MANAGER`, `WEBHOOK_SHARED_SECRET`
- README Env Table updated

## Acceptance Criteria
- [ ] Test POST (secret OK) changes subscription + mints credits
- [ ] Docs: cut/paste setup steps'

gh issue create \
  --title "docs: flows & diagrams update (recording, subscribe→credits, buy with credits)" \
  --label "type:docs,area:architecture,size:S,priority:P2" \
  --body '## Goal
Document new flows in `docs.d/architecture/flows.md` and link from README.

## Deliverables
- Three ASCII/mermaid diagrams
- Sequence of API calls + on-chain events
- Risks & fallbacks section updated

## Acceptance Criteria
- [ ] Lint passes on docs (`scripts/check-docs.mjs`)
- [ ] Links render in GitHub'

gh issue create \
  --title "tests: API + E2E for recording & credits" \
  --label "type:test,area:testing,size:M,priority:P2" \
  --body '## Goal
Cover the new endpoints and a happy-path E2E.

## Deliverables
- Unit/integration: `/api/recordings/sign`, `/api/recordings/complete`, `/api/credits/spend`
- E2E: record stub (mock file), spend credits on seeded asset

## Acceptance Criteria
- [ ] CI green with new tests
- [ ] Deterministic seeds for credit balance & asset price'

gh issue create \
  --title "security: deny-by-default ACC + no secrets + rate limits" \
  --label "type:task,area:security,size:S,priority:P1" \
  --body '## Goal
Harden baseline: keep decryption gated; ensure no secrets leak; rate limit sensitive routes.

## Deliverables
- ACC remains deny-by-default without EAS receipt
- Secret scanning (gitleaks) keeps passing
- Rate limits on `/api/recordings/sign` and subscription webhook

## Acceptance Criteria
- [ ] E2E proves unauthorized cannot decrypt
- [ ] Logs contain no keys/CIDs'

# ===== Nice-to-have polish ===================================================

gh issue create \
  --title "mobile: Biometric gate before Decrypt & Play (stub)" \
  --label "type:feature,area:mobile,size:S,priority:P3" \
  --body 'Biometric prompt (or PIN fallback) before decrypting purchased asset.
- Integrate expo-local-authentication
- Graceful fallback path'

gh issue create \
  --title "web: Light theme variant + theme toggle" \
  --label "type:feature,area:web,size:S,priority:P3" \
  --body 'Add a light theme variant using design tokens; persist preference.
- Toggle in header
- Meets WCAG AA contrast'

echo ""
echo "✅ Created issues #194-#210 (Recording + Subscriptions + Credits)"
echo ""
echo "Recommended execution order:"
echo "  #194 → #195 → #196 → #197 → #198 (Recording pipeline)"
echo "  #199 → #200 → #201 → #202 → #203 (Subscriptions + Credits)"
echo "  #204 → #205 → #206 → #207 → #208 (UI + Docs + Tests)"
echo ""

