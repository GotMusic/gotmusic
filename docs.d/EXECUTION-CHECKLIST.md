---
id: EXEC-CHECKLIST
status: Active
owner: @grantedwards
updated: 2025-10-15
docType: checklist
---

# GotMusic — ETHOnline 2025 MVP Execution Checklist
> Dates: Oct 10–31, 2025 • Today: Oct 15 • Goal: Judge-ready web demo + mobile happy path
> Policies: See `.cursorrules` at repo root for coding standards, CI gates, and dependencies.
> **Status: 13 issues complete (8 P1 + 5 P2) | 27 tests passing | PostgreSQL-first + readiness guards**

## 🎯 Quick Status Overview

### ✅ Completed (as of Oct 15, 2025 - Post Infrastructure Upgrade)
- **13 Issues Complete:** 8 P1 + 5 P2
- **27 Tests Passing:** 7 Playwright E2E + 15 API integration + 5 contract tests
- **6 CI Checks:** All green (checks, build, e2e, lint-commits, label, check)
- **Database:** PostgreSQL-first (removed SQLite) with deterministic seeds
- **API:** 10 REST endpoints with Zod validation + OpenAPI 3.0.3
- **Admin Panel:** Asset management with optimistic updates
- **Mobile App:** QueryClient + 30s audio preview + Library screen
- **Infrastructure:** Readiness endpoint, contract tests, idempotent seeds, ci:local script

### 🔄 In Progress
- None currently - ready for next issue

### 📋 Next Recommended
- **#122** - feature(admin): assets table with server pagination [M]

---

## 0) Repo Hygiene (once)
- [x] `corepack enable && yarn --version` shows Yarn ≥ 4
- [x] `yarn install` once after dependency bumps (refresh lockfile), then `yarn install --immutable` for CI/local
- [x] `yarn tokens:build` generates web/native artifacts
- [x] `yarn biome check .` passes
- [x] `yarn typecheck` passes
- [x] `yarn build` passes
- [x] CI badge in README is green
- [x] Branch protection on `main` (PR required, required checks, linear history)
- [x] Labels created: `type:*`, `area:*`, `priority:*`, `size:*`
- [x] Milestone created: **This Week: Admin + UI Kit** (Oct 17, 2025)
- [x] Issues created for milestone work (#11-14)
- [x] Issue/PR workflow documented (`docs.d/ISSUE-PR-WORKFLOW.md`)
- [x] PR template enforces `Closes #X` requirement

## 0.5) Issue & PR Workflow
- [x] **All team members have read** `docs.d/ISSUE-PR-WORKFLOW.md`
- [x] **All team members have read** `docs.d/PR-COMMENT-GUIDE.md`
- [x] **Issue templates** configured (`.github/ISSUE_TEMPLATE/`)
  - [x] `feature_request.yml` - New features
  - [x] `task.yml` - Engineering tasks
  - [x] `bug_report.yml` - Bug reports
  - [x] `config.yml` - Disables blank issues
- [x] **All issues** created using templates (never blank)
- [x] **All issues** properly labeled: `type:*`, `area:*`, `priority:*`, `size:*`
- [x] **All issues** assigned to milestones when applicable
- [x] **Branch naming** follows format: `type/scope/description-ISSUE` (e.g., `feat/api/pagination-filters-121`)
- [x] **Commits** use conventional format + `--no-gpg-sign` flag
- [x] **PRs** always include `Closes #X` to auto-link issues
- [x] **PR closing comments** use standardized format (see `docs.d/PR-COMMENT-GUIDE.md`)
- [x] **Manual closes** use: `gh issue close X --comment "✅ Completed in PR #Y ..."`
- [x] **Stale branches** deleted after merge (GitHub auto-delete enabled)
- [x] **PR body handling** uses `--body-file` for complex content (code blocks, emoji)
- [x] **Issue close comments** automated via `.github/workflows/issue-close-comment.yml`

## 1) Environment & Secrets
- [ ] `.env.example` contains *all* required variables (no secrets)
- [ ] Root README includes an **Env Table** explaining each variable
- [ ] `SECURITY.md` added with **Secrets policy** and **No-Secrets-in-Commits** rule
- [ ] Optional: gitleaks/secretlint CI job enabled

**Required variables (examples)**
- [ ] `NEXT_PUBLIC_CHAIN_ID` (Base Sepolia)
- [ ] `EAS_RPC_URL`, `EAS_SCHEMA_UID_LICENSE`
- [ ] `LIGHTHOUSE_API_KEY`
- [ ] `LIT_NETWORK` (`datil-test`) and `LIT_ACTION_ID_LICENSE_CHECK`
- [ ] `NEXUS_API_URL` (Avail Nexus), `NEXUS_API_KEY` (if issued)
- [ ] `BLOCKSCOUT_BASE_URL` (Base testnet)

## 2) EAS — License Receipt Path (Day 1)
- [ ] Write schema **LicenseReceipt** (buyer, seller, assetId, price, currency, txHash, cid, termsHash)
- [ ] Register schema on **Base Sepolia** → capture `SCHEMA_UID`
- [ ] Implement `packages/api/easWriter.ts`:
  - [ ] `createLicenseReceipt(params): Promise<{ uid }>`
  - [ ] Network/provider config pulled from env
- [ ] CLI sample: `yarn demo:attest:license ...` returns UID
- [ ] Docs: update `docs.d/attestations/eas-schemas.md` with fields + UID
- [ ] README: add the **Blockscout** link format for attestation UIDs
- [ ] Tests: mock provider + verify field mapping

## 3) Lighthouse + Encryption (Day 2)
- [ ] `packages/crypto/encrypt.ts` (AES-GCM) with:
  - [ ] Random 256-bit key generated per asset
  - [ ] IV per-file (not reused), auth tag handling
  - [ ] KDF for envelope if needed
- [ ] `packages/api/lighthouse.ts`:
  - [ ] `encryptAndUpload(filePath): Promise<{ cid, keyEnvelope }>`
  - [ ] Return CID and *do not* log raw keys
- [ ] CLI: `yarn demo:encrypt-upload ./samples/kick.wav` → CID prints
- [ ] Docs: `docs.d/operations/lighthouse.md` (limits, retries, pinning behavior)
- [ ] Tests: encrypt→decrypt roundtrip on small buffer

## 4) Lit Protocol ACC (Day 2)
- [ ] Lit Action `license-check.js` (network: `datil-test`)
  - [ ] Inputs: buyer, assetId
  - [ ] On-chain check: LicenseReceipt exists for (buyer, assetId)
  - [ ] Output: `{ authorized: boolean }`
- [ ] Client wrapper: `packages/api/lit.ts`:
  - [ ] `checkLicense(buyer, assetId)` calls Lit Action & parses result
- [ ] Unit test: authorized path (mock EAS ok), unauthorized path
- [ ] Fallback flag: `GM_FEATURE_LIT=false` → deterministic local policy used

## 5) Payments — Avail Nexus Bridge & Execute (Days 3–4)
- [ ] Deploy a **dummy receiver contract** on Base Sepolia (no-op function)
  - [ ] Contract address recorded in README
- [ ] Implement `packages/api/avail.ts`:
  - [ ] `createIntentPYUSD({ amount, buyer, destContract, data })`
  - [ ] `submitIntent(...)` returns **tracking id** + eventual **txHash**
- [ ] Web hook/polling or event stream to capture **tx success**
- [ ] Fallback A: If Nexus credits pending → do **same-chain** PYUSD (or USDTEST) transfer on Base Sepolia
- [ ] Fallback B: If PYUSD not deployed on testnet → deploy ERC-20 mock `USDTEST` with 6 decimals
- [ ] On success: call EAS writer to mint LicenseReceipt (with `txHash`)
- [ ] UI: show **tx hash**, **Open in Blockscout** link

## 5.5) Infrastructure Complete ✅
- [x] **Database:** PostgreSQL-only (removed SQLite dual-driver)
- [x] **API Endpoints:** 10 REST endpoints with Zod validation
  - [x] GET `/api/assets` - Paginated list with filters (cursor, status, search)
  - [x] GET `/api/assets/[id]` - Single asset details
  - [x] PATCH `/api/assets/[id]` - Update asset (idempotent with idempotency-key)
  - [x] GET `/api/assets/[id]/audit` - Audit log (append-only)
  - [x] POST `/api/upload/sign` - Pre-signed upload URL
  - [x] POST `/api/upload/notify` - Upload completion notification
  - [x] GET `/api/healthz` - Health check
  - [x] GET `/api/readiness` - Readiness probe
  - [x] GET `/api/docs` - OpenAPI JSON spec (dev only)
  - [x] GET `/docs` - Swagger UI (dev only)
- [x] **API Validation:** Comprehensive Zod schemas with 400 error responses
- [x] **API Documentation:** OpenAPI 3.0.3 spec with complete examples
- [x] **Type Safety:** PostgreSQL type normalization (Date → ms, DECIMAL → number)
- [x] **Admin Panel:** Asset management with optimistic updates (React Query)
- [x] **Audit Logging:** Append-only change tracking
- [x] **Storage:** Pre-signed URL uploads (stub mode, R2/S3 ready)
- [x] **Asset Processing:** Lifecycle management (processing → ready/error)
- [x] **Payment System:** Feature flag + deterministic mock service
- [x] **Mobile App:** QueryClient + 30s audio preview + Library screen

## 6) Web UX — Judge Path (Days 4–5)
**/ (Catalog)**
- [x] Dynamic list from `/api/assets` with pagination + filters
- [x] React Query data fetching with loading states
- [x] Empty state UI with call-to-action
- [x] Error toasts and boundaries
- [ ] Cards with play/pause for **30s preview** (no seek)
- [ ] Skeletons during loading

**/admin/assets/[id]**
- [x] Show metadata + edit form (React Hook Form + Zod)
- [x] Optimistic updates with React Query
- [x] Asset status management (draft/published/archived/processing/ready/error)
- [x] Price editing with currency (priceAmount, priceCurrency)
- [ ] **Buy with PYUSD** button → triggers Nexus intent
- [ ] On success → **Receipt** section:
  - [ ] EAS UID visible
  - [ ] **Open in Blockscout** for tx + attestation
- [ ] **Download & Decrypt** button:
  - [ ] Calls Lit ACC
  - [ ] If authorized → fetch encrypted file from Lighthouse → decrypt → play
  - [ ] If unauthorized → clear UX message + retry

**Common**
- [x] Dark theme (Tailwind + design tokens)
- [ ] Light theme variant
- [ ] Keyboard/Focus states accessible
- [ ] Error boundaries/logging (Sentry-ready hook, even if DSN unset)

## 7) Mobile UX — Happy Path (Days 5–7)
**Preview**
- [x] Screen: simple list from `/api/assets`
- [x] 30s preview plays with expo-av
- [x] Audio mode configuration for mobile
- [x] Respects platform audio settings

**Library**
- [x] Library screen with owned assets (stub data)
- [x] Asset cards with purchase details and metadata
- [x] Navigation with expo-router
- [ ] Manual "Sync Purchases" (enter or scan buyer address)
- [ ] Shows owned asset(s) if attested (EAS integration)
- [ ] **Decrypt & Play**:
  - [ ] Biometric prompt (or PIN fallback)
  - [ ] Secure-store for wrapped key envelope
  - [ ] Full track playback

**Polish**
- [x] Pull-to-refresh functionality
- [x] Empty state UI with call-to-action
- [x] Loading states
- [ ] Toasts for errors
- [ ] Link-out: **Open in Blockscout** from receipt row

## 8) CI & Tooling
- [x] Workflows:
  - [x] `ci.yml` → install (immutable), tokens build, lint (Biome), typecheck, build, e2e
  - [x] Yarn 4.3.1 + Corepack setup in all jobs
  - [x] PostgreSQL service container for E2E tests
  - [x] `commitlint.yml` → Conventional commits (lint-commits workflow)
  - [x] `label.yml` → Auto-label PRs based on changed files
  - [x] `issue-close-comment.yml` → Auto-comment on closed issues
  - [x] Cache: Yarn (.yarn/cache), Turbo, Build artifacts
- [x] Required checks on PR: `checks`, `build`, `e2e`, `lint-commits`, `label`
- [x] `yarn ci:local` script mirrors CI steps
- [x] Biome auto-format before check in CI
- [x] E2E tests: 7 Playwright tests + 15 API integration tests + 5 contract tests
- [x] **Readiness endpoint:** `/api/readiness` validates DB + migrations + seed data
- [x] **Playwright waits on readiness:** Prevents "page stuck" timeouts
- [x] **Deterministic seeds:** Fixed IDs/timestamps for stable assertions
- [x] **Contract tests:** Validate API JSON shape, types, enum values
- [x] **db:reset:ci script:** `yarn db:push && yarn db:seed`
- [ ] Size guard (optional): warn on bundle increases in apps/web

## 9) Security Baseline
- [ ] No secrets in repo (scan passes)
- [ ] Encrypted assets only (no raw samples committed)
- [ ] ACC is **deny by default**
- [ ] EAS writes record price & currency used
- [ ] Terms-of-use hash present in attestation (link terms PDF via Lighthouse)
- [ ] Console logs scrubbed (no keys, no CIDs where not needed)

## 10) Accessibility (A11y) Essentials
- [ ] Keyboard-only nav (web)
- [ ] Contrast ≥ WCAG AA for primary/secondary text
- [ ] Focus visible on interactive elements
- [ ] Icons have `aria-label` or are `aria-hidden`
- [ ] Player controls reachable/tappable on mobile

## 10.5) Next Sprint — P2 Issues (Priority Order)
- [ ] **#122** - feature(admin): assets table with server pagination [M] ← **RECOMMENDED NEXT**
- [ ] **#128** - feature(web): Blockscout links for tx + attestation [S]
- [ ] **#79** - task(web): accessibility pass (≥90 a11y) [S]
- [ ] **#78** - task(web): Intl currency + locale [S]
- [ ] **#72** - task(storage): size/type validation on sign [S]
- [ ] **#71** - task(storage): rate-limit /api/upload/sign [S]
- [ ] **#70** - task(storage): CDN public URL helper [S]
- [ ] **#69** - feature(storage): preview generator + waveform [M]
- [ ] **#64** - feature(data): ULID IDs + updatedAt auto [S]
- [ ] **#127** - feature(mobile): decrypt & play (mock key) [M]
- [ ] **#84** - task(mobile): deep link gotmusic://asset/<id> [S]
- [ ] **#83** - task(mobile): MMKV cache persist [S]
- [ ] **#29** - chore(storybook): static build in CI [S]
- [ ] **#28** - test(web): extend smokes for assets table/detail [S]
- [ ] **#27** - chore(deploy): Vercel preview + envs [S]
- [ ] **#26** - docs: env table + .env.example [S]
- [ ] **#25** - chore(ci): add secret scanning (gitleaks) [S]

## 11) Docs & Evidence
- [ ] `docs.d/README.md` updated with latest run steps
- [ ] **Judge Runbook**: step-by-step with screenshots
- [ ] Links gathered:
  - [ ] Deployed web (Vercel)
  - [ ] Two asset examples (preview + purchase)
  - [ ] Blockscout links for 1–2 successful tx + attestations
- [ ] 2–3 minute **demo script** drafted (who says what, click path, recovery plan)

## 12) Demo Freeze & Stretch
- [ ] **Freeze date set:** Sat Oct 25 (bugs only after)
- [ ] Stretch (optional, post-freeze):
  - [ ] VendorProfile / VendorStatus EAS schemas + badges
  - [ ] LayawayEscrow interface/events (no business logic)
  - [ ] Blockscout MCP mini panel (balances/tx tab)

## 13) Submission Day (Oct 31)
- [ ] Tag release `v0.1.0-ethonline`
- [ ] README top links verified (web, schemas, explorer)
- [ ] Demo video recorded and linked
- [ ] Repo public & CI badge green

---

## Command Quick Reference
```bash
# Install
corepack enable
yarn install --immutable

# Development
yarn dev                            # All workspaces (Turbo)
yarn workspace @gotmusic/web dev    # Web only
yarn workspace @gotmusic/mobile dev # Mobile only

# Tokens
yarn tokens:build                   # Build design tokens

# Quality Checks
yarn biome check .                  # Lint + format check
yarn biome check . --write          # Auto-fix
yarn typecheck                      # TypeScript check
yarn build                          # Build all workspaces

# Testing
yarn test                           # Unit tests
yarn workspace @gotmusic/web test:e2e  # Playwright E2E (7 tests)
yarn workspace @gotmusic/web test:e2e:ui  # Playwright UI mode
PWDEBUG=1 yarn workspace @gotmusic/web test:e2e -g "Home Page"  # Debug specific test

# Database (Docker PostgreSQL)
# 1. Start container (one-time setup)
docker run -d --name gotmusic-postgres \
  -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gotmusic_dev -p 5433:5432 postgres:16

# 2. Setup .env.local
echo 'ADMIN_USER=admin
ADMIN_PASS=dev123
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/gotmusic_dev' > apps/web/.env.local

# 3. Initialize database
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/gotmusic_dev yarn workspace @gotmusic/web db:push
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/gotmusic_dev yarn workspace @gotmusic/web db:seed

# Database management
docker start gotmusic-postgres          # Start DB
docker stop gotmusic-postgres           # Stop DB
docker logs gotmusic-postgres           # View logs
yarn workspace @gotmusic/web db:push    # Push schema (reads DATABASE_URL from .env.local in dev)
yarn workspace @gotmusic/web db:seed    # Seed test data (idempotent, 3 assets)
yarn workspace @gotmusic/web db:reset:ci  # Reset for CI (push + seed)
yarn workspace @gotmusic/web db:studio  # Drizzle Studio

# Health Checks
curl http://localhost:3000/api/healthz    # Basic health
curl http://localhost:3000/api/readiness  # DB + migrations + seed check

# CI Mirror
yarn ci:local                       # Run CI checks locally (install → tokens → biome → typecheck → build)

# Demo helpers (to implement)
yarn demo:encrypt-upload ./samples/kick.wav
yarn demo:attest:license --buyer 0x... --assetId "kick-001" --price 5 --cid Qm...
```

---

## 💡 Key Learnings & Patterns

### CI/CD Best Practices
1. **Yarn 4 + Corepack:** Must setup in every job:
   ```yaml
   - run: corepack enable && corepack prepare yarn@4.3.1 --activate
   - run: test "$(yarn -v)" = "4.3.1"
   ```
2. **Biome:** Auto-format before check to prevent false positives
3. **Artifact Upload:** Copy `.next` to non-gitignored location before upload
4. **PostgreSQL SSL:** Disable in CI/test environments (`E2E_AUTH_BYPASS=1`)
5. **Readiness Checks:** Wait on `/api/readiness` (not just base URL) to validate full stack

### API Development
1. **Zod + Query Params:** Convert `null → undefined` for `.default()` to work:
   ```typescript
   limit: searchParams.get("limit") ?? undefined
   ```
2. **PostgreSQL Types:** Normalize at API boundary (Date → ms, DECIMAL → number)
3. **Cursor Pagination:** Use `updatedAt.toString()` as cursor value
4. **Status Enum:** Include all DB + API states in Zod schema
5. **Contract Tests:** Validate JSON shape, types, defaults to catch coercion breaks early

### Testing Patterns
1. **Playwright:** Use `domcontentloaded` not `networkidle`
2. **API Waits:** Explicit `page.waitForResponse()` for deterministic tests
3. **Test IDs:** Add `data-testid` to loading/error states too
4. **CI Database:** PostgreSQL service container + auto-seed in E2E job
5. **Deterministic Seeds:** Fixed IDs/timestamps for stable screenshots/assertions
6. **Readiness Endpoint:** Validates DB + migrations + seed data before tests run
7. **Contract Tests:** Separate from E2E - validate API contract independently

### Database Patterns
1. **Idempotent Seeds:** Check if data exists before inserting
2. **Fixed Timestamps:** Use `new Date("2025-01-01T00:00:00Z")` for determinism
3. **db:reset:ci:** Single command for push + seed (`yarn db:push && yarn db:seed`)
4. **Small Seed Data:** 3 assets sufficient for testing (faster, more predictable)

### PR/Issue Workflow
1. **Complex PR Bodies:** Always use `--body-file /tmp/pr.md`
2. **Closing Keywords:** Must be `Closes #X`, `Fixes #X`, or `Resolves #X`
3. **Branch Naming:** `type/scope/description-ISSUE` (e.g., `feat/api/pagination-121`)
4. **Never Merge:** With failing checks (violates `.cursorrules`)
5. **yarn ci:local:** Run locally to catch CI failures before pushing

---

## Risk Table (with fallbacks)

| Risk                        | Symptom                    | Action                                                   | Flag                     |
| --------------------------- | -------------------------- | -------------------------------------------------------- | ------------------------ |
| Avail Nexus credits delayed | No intent execution        | Use **same-chain** ERC-20 on Base Sepolia; identical API | `GM_FEATURE_NEXUS=false` |
| Lit Action deploy blocked   | ACC never resolves         | Use deterministic local policy simulator                 | `GM_FEATURE_LIT=false`   |
| EAS intermittent            | Attest fails/retries       | Add retry with backoff + manual **Retry attest** button  | n/a                      |
| PYUSD missing               | Token not deployed         | Deploy `USDTEST` mock; keep symbol “USD” in UI           | `GM_TOKEN=USDTEST`       |
| Mobile biometrics           | Device lacks Face/Touch ID | PIN fallback & secure-store envelope                     | n/a                      |

---

## PR Template (Paste into GitHub)

**Title:** `feat(scope): <what>`
**Why:** (1–2 sentences)
**Done when:**

* [ ] Criteria 1
* [ ] Criteria 2
  **Tests:**
* [ ] Unit/CLI
* [ ] Manual repro steps
  **Docs:**
* [ ] README/docs updated
  **Risk/rollback:**
* [ ] Feature flag or revert plan

---

## Visual PRs Progress
- [x] PR-01 Web Storybook + UI atoms + Tokens Gallery (merged)
- [ ] PR-02 Mobile Style Guide screen + Dev Panel toggles
- [ ] PR-03 Shared fixtures (catalog, receipts)
- [ ] PR-04 Dev overlays (web grid, mobile touch targets)
