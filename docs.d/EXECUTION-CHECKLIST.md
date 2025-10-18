---
id: EXEC-CHECKLIST
status: Active
owner: @grantedwards
updated: 2025-10-18 03:28:56
docType: checklist
---

# GotMusic — ETHOnline 2025 MVP Execution Checklist
> **Dates:** Oct 10–31, 2025 • **Today:** Oct 17 • **Goal:** Judge-ready web demo + mobile happy path  
> **Policies:** See `.cursorrules` at repo root for coding standards, CI gates, and dependencies.  
> **Status:** 32 issues complete | 71 PRs merged | 97 tests passing | PostgreSQL-first + automation active

## 🤖 Auto-Update Status

This checklist's "Next Sprint" section (10.5) is **automatically updated** via GitHub Actions when issues are closed, reopened, or labeled. The workflow runs `scripts/sync-execution-checklist.mjs` which syncs with actual GitHub Issues state.

**Manual sync:** `node scripts/sync-execution-checklist.mjs`

### ⚡ Workflow Timing (Modified Sequential)
- **CI Duration:** 3-5 minutes (build + E2E tests)
- **Automation Duration:** ~1 minute after merge (sync-checklist workflow)
- **Recommended Pattern:**
  1. Work on ONE issue fully (branch → commit → PR → push)
  2. While CI runs (~5 mins), READ and PLAN the next issue (but don't create branch yet)
  3. Once PR merges + automation completes (~2-3 mins), START the next issue
  4. **Why?** Parallel branches create merge conflicts. Sequential work with planning during CI = no conflicts + minimal dead time.

---

## 🎯 Quick Status Overview

### ✅ Completed (as of Oct 18, 2025 02:53)
- **35 Issues Complete** - See [Closed Issues](#closed-issues-history) below
- **75 PRs Merged** - See [PR History](#pr-history-all-merged-prs) below
- **97 Tests Passing:** 22 Playwright E2E + 32 API integration + 43 unit tests
- **9 CI Checks:** All green (checks, build, e2e, lint-commits, label, secret-scan, security-checks, storybook)
- **Database:** PostgreSQL-first (removed SQLite) with deterministic seeds
- **API:** 10 REST endpoints with Zod validation + OpenAPI 3.0.3
  - File upload validation (size/type/rate limiting)
  - Pagination, filtering, search
  - Audit logging, health checks, readiness probes
  - CDN public URL helper with custom domain support
- **Admin Panel:** Asset management with optimistic updates, Blockscout links
- **Web Features:** Accessibility (WCAG AA), Intl currency formatting, skip links
- **Mobile App:** QueryClient + 30s audio preview + Library screen
- **Infrastructure:** Readiness endpoint, unit tests for utilities, idempotent seeds, ci:local script
- **Automation:** ✅ EXECUTION-CHECKLIST.md auto-syncs with GitHub Issues via workflow_run
- **Security:** Production-safe console.log detection, route protection, rate limiting, secret scanning
- **UI Components:** Form components (Field, Input, Select, Checkbox, Slider) with design tokens
- **Deployment:** Vercel preview + production with comprehensive env docs

### 🔄 In Progress
- None currently - ready for next issue

### 📋 Next Recommended
- **#69** - feature(storage): preview generator stub + waveform placeholder [M]

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

---

## 0.6) PR History (All Merged PRs)

**Total: 75 merged PRs** (Oct 12-18, 2025)

### Recent (Oct 18, 2025 - Latest)
- [x] **PR #231** - feat(ui): add form components (Field, Input, Select, Checkbox, Slider) (Issue #188)
- [x] **PR #228** - fix(web): add main site header to Studio layout (Issue #68)
- [x] **PR #227** - fix(web): resolve Studio navigation 404 issues (Issue #227)
- [x] **PR #226** - feat(api): add Studio endpoints - upload, assets, sales (Issue #183)
- [x] **PR #225** - feat(ui): add feedback components (Toast, Skeleton) (Issue #189)
- [x] **PR #174** - test(web): extend admin smoke tests for table and detail pages
- [x] **PR #173** - chore(deploy): configure Vercel preview deployments with environment variables
- [x] **PR #172** - docs: add comprehensive environment variables documentation
- [x] **PR #171** - chore(ci): add gitleaks secret scanning with override support
- [x] **PR #170** - docs: add parallel workflow guidance for CI and automation
- [x] **PR #168** - feat(storage): add CDN public URL helper with STORAGE_PUBLIC_BASE support
- [x] **PR #167** - feat(storage): add IP-based rate limiting to upload sign endpoint
- [x] **PR #166** - feat(storage): add size/type validation to upload sign endpoint
- [x] **PR #165** - fix(ci): add issues:read permission to sync workflow

### Oct 15 (Automation & Accessibility Sprint)
- [x] **PR #162** - fix(ci): add GH_TOKEN env to sync script step
- [x] **PR #161** - fix(ci): use workflow_run trigger for reliable checklist sync
- [x] **PR #158** - fix(ci): add push trigger to sync-checklist workflow
- [x] **PR #157** - fix(ci): handle PR merge events in sync-checklist workflow
- [x] **PR #156** - feat(web): add Intl currency and locale formatting
- [x] **PR #155** - feat(web): comprehensive accessibility improvements for WCAG AA
- [x] **PR #154** - feat(web): add Blockscout links for tx + attestation
- [x] **PR #153** - chore(automation): auto-sync EXECUTION-CHECKLIST.md with GitHub Issues
- [x] **PR #151** - feat(admin): server-side pagination + filters for assets table
- [x] **PR #150** - feat(api): add pagination + filter validation and comprehensive tests
- [x] **PR #149** - fix(ci): implement proper Yarn 4.3.1 setup with Corepack
- [x] **PR #148** - test(e2e): stabilize selectors + improve failure reporting
- [x] **PR #147** - ci: add Playwright test execution to CI

### Oct 14 (PostgreSQL & Infrastructure Sprint)
- [x] **PR #146** - task(docs): update .env.example + README for PG
- [x] **PR #145** - feature(api): PG schema harden (indexes + constraints)
- [x] **PR #144** - chore(ci): drizzle migrate + seed in CI (PG-only)
- [x] **PR #143** - chore(data): remove SQLite remnants (PG-first)
- [x] **PR #142** - chore(data): PostgreSQL-first transition
- [x] **PR #134** - feat(api): enhance audit entries on PATCH /api/assets/:id
- [x] **PR #133** - feat(ops): add request ID middleware + structured logs
- [x] **PR #132** - feat(api-docs): add /api/openapi runtime endpoint and /docs UI
- [x] **PR #131** - feat(api): add /api/healthz and /api/readiness endpoints
- [x] **PR #130** - ci(db): add Postgres job matrix alongside SQLite
- [x] **PR #129** - ci(test): upload Playwright HTML report as artifact
- [x] **PR #113** - feat(mobile): add Library screen with owned assets and pull-to-refresh
- [x] **PR #112** - feat(data): add Postgres client side-by-side (env switch)
- [x] **PR #111** - task(api): add OpenAPI 3 from zod + /api/docs (dev)
- [x] **PR #110** - feature(api): add asset audit log (append-only)
- [x] **PR #109** - task(storage): add processing marker + manual completion
- [x] **PR #108** - feat(admin): add asset detail form with optimistic updates
- [x] **PR #107** - feat(api): add PATCH /api/assets/:id with zod + idempotency
- [x] **PR #106** - feat(payments): add feature flag + deterministic mock service
- [x] **PR #105** - feat(mobile): add preview screen with 30s audio playback
- [x] **PR #104** - feat(mobile): add QueryClient provider + shared hooks
- [x] **PR #103** - task(api): normalize upload routes to /api/upload/sign
- [x] **PR #102** - feat(storage): add upload notify endpoint for asset tracking
- [x] **PR #101** - feat(storage): signer returns {url,key,contentType}
- [x] **PR #100** - feat(web): transform catalog to use API with loading states
- [x] **PR #99** - feat(admin): add assets index with API integration
- [x] **PR #98** - test(ci): verify complete workflow success
- [x] **PR #94** - feat(ci): add auto-comment on issue close + PAT support
- [x] **PR #92** - feat(api): add Zod validation to GET /api/assets/:id
- [x] **PR #91** - feat(web): add typed React Query hooks for assets
- [x] **PR #90** - feat(web): add TanStack Query provider with devtools

### Oct 13 (Foundation Sprint)
- [x] **PR #86** - feat(api): implement GET /api/assets endpoint with pagination
- [x] **PR #31** - feat(data): add SQLite + Drizzle dev database
- [x] **PR #30** - feat(storage): implement R2/S3 signed upload URLs
- [x] **PR #19** - feat(ui-kit): extract Button + Card to @gotmusic/ui and use in web
- [x] **PR #18** - chore(tokens): import Style Dictionary outputs in web + mobile
- [x] **PR #16** - test(web): add Playwright smoke tests for home and admin/uploads
- [x] **PR #15** - feat(web): upload hook + assets detail + stub APIs
- [x] **PR #10** - feat(web): scaffold admin uploads + rules onboarding
- [x] **PR #9** - feat(tooling)!: React 19 alignment (Expo SDK 53/RN 0.79), NativeWind typings
- [x] **PR #8** - chore(mobile): commit tsconfig and .gitignore; ignore Expo .expo cache
- [x] **PR #7** - feat(mobile): wire expo-router (entry, tabs, modal)
- [x] **PR #6** - chore(framework): bring up Next.js + Expo shells; pin versions
- [x] **PR #5** - feat(web): add Storybook + UI atoms + tokens gallery
- [x] **PR #4** - docs(process): add Issue Forms + auto-labeler
- [x] **PR #3** - docs(readme): judge-ready intro + links

### Oct 12 (Initial Setup)
- [x] **PR #2** - ci(biome): ignore generated artifacts (dist/.next/.turbo)
- [x] **PR #1** - Initial docs/readme/ci section

---

## 0.7) Closed Issues History

**Total: 22 closed issues**

### Infrastructure & Automation (Oct 15-16)
- [x] **#164** - fix(ci): sync workflow missing issues:read permission
- [x] **#163** - fix(ci): sync script missing GH_TOKEN environment variable
- [x] **#160** - fix(ci): sync-checklist workflow fails with push triggers
- [x] **#159** - fix(ci): sync-checklist workflow not triggering on PR merges
- [x] **#152** - chore(automation): auto-sync EXECUTION-CHECKLIST.md with GitHub Issues

### Features & Testing (Oct 14-15)
- [x] **#141** - task(ci): publish Playwright report & videos
- [x] **#140** - task(docs): update .env.example + README for PG
- [x] **#139** - chore(web): enforce runtime=nodejs on API routes
- [x] **#138** - feature(api): PG schema harden (indexes + constraints)
- [x] **#137** - fix(test): replace .all()/.get() with await (PG)
- [x] **#136** - chore(ci): drizzle migrate + seed in CI
- [x] **#135** - chore(data): remove SQLite remnants (PG-first)
- [x] **#128** - feature(web): show Blockscout links for tx + attestation
- [x] **#126** - test(e2e): stabilize selectors + attach screenshot/video on fail
- [x] **#125** - feature(api): /api/healthz and /api/readiness endpoints
- [x] **#124** - chore(ops): request-id middleware + structured logs
- [x] **#123** - feature(api): write audit entries on PATCH /api/assets/:id
- [x] **#122** - feature(admin): assets table uses server pagination + filters
- [x] **#121** - feature(api): pagination + filters for GET /api/assets
- [x] **#120** - ci(db): add Postgres job matrix alongside SQLite
- [x] **#119** - ci(test): upload Playwright HTML report as artifact
- [x] **#72** - task(storage): size/type validation on sign

---

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
- [x] No secrets in repo (scan passes)
- [ ] Encrypted assets only (no raw samples committed)
- [x] ACC is **deny by default**
- [ ] EAS writes record price & currency used
- [ ] Terms-of-use hash present in attestation (link terms PDF via Lighthouse)
- [x] Console logs scrubbed (no keys, no CIDs where not needed)

## 10) Accessibility (A11y) Essentials
- [ ] Keyboard-only nav (web)
- [ ] Contrast ≥ WCAG AA for primary/secondary text
- [ ] Focus visible on interactive elements
- [ ] Icons have `aria-label` or are `aria-hidden`
- [ ] Player controls reachable/tappable on mobile

## 10.4) Current Sprint Focus (Visual-First)

### **Web Development:**
- **Storybook** for component development and demos
- **Button/Card/Toast** components + Tokens Gallery
- **UI PRs must include:** Storybook screenshots

### **Mobile Development:**
- **Style Guide** screen with **Dev Panel** toggles
- **UI PRs must include:** Short screen recordings

### **Shared Infrastructure:**
- **Fixtures:** catalog items + receipts
- **Dev overlays:** 8‑pt grid (web) + touch targets (mobile)
- **Design tokens:** Never hardcode colors/spacing/typography

---

## 10.5) Next Sprint — P2 Issues (Priority Order)

### 🔥 HIGH PRIORITY (P0/P1)
- [ ] **#181** - feat(ui): create catalog cards, players, and form components [L] ← **RECOMMENDED NEXT**
- [ ] **#180** - feat(audio): implement server-side processing pipeline [L] ← **RECOMMENDED NEXT**
- [ ] **#178** - feat(web): implement (shop) routes - catalog, asset detail, checkout [L] ← **RECOMMENDED NEXT**
- [ ] **#179** - feat(web): implement (studio) routes - assets, uploads, sales [XL] ← **RECOMMENDED NEXT**
- [ ] **#204** - api: POST /api/credits/spend → buy asset with credits [S] ← **RECOMMENDED NEXT**
- [ ] **#203** - api: POST /api/subscriptions/webhook → mark paid & mint credits (off-chain mirror) [S] ← **RECOMMENDED NEXT**
- [ ] **#202** - api: POST /api/subscriptions/subscribe → build Nexus intent [S] ← **RECOMMENDED NEXT**
- [ ] **#201** - db: subscriptions & creditTransactions tables [S] ← **RECOMMENDED NEXT**
- [ ] **#185** - docs(readme): update with new IA, roles, and environment variables [S] ← **RECOMMENDED NEXT**
- [ ] **#177** - docs(design): add catalog card and player patterns [S] ← **RECOMMENDED NEXT**
- [ ] **#200** - contracts: SubscriptionManager.sol (PYUSD) + CreditBank.sol [M] ← **RECOMMENDED NEXT**
- [ ] **#193** - feat(ui): set up Storybook with accessibility checks and full component coverage [M] ← **RECOMMENDED NEXT**
- [ ] **#184** - feat(access): wire Lit ACC + Lighthouse to download endpoint [M] ← **RECOMMENDED NEXT**
- [ ] **#192** - feat(web): integrate @gotmusic/ui package and migrate components [L] ← **RECOMMENDED NEXT**
- [ ] **#182** - feat(mobile): implement browse, library, studio tabs and screens [L] ← **RECOMMENDED NEXT**
- [ ] **#208** - docs: flows & diagrams update (recording, subscribe→credits, buy with credits) [S]
- [ ] **#207** - ops: Webhook wire-up (explorer/Nexus) + .env docs [S]
- [ ] **#206** - web: Buy with Credits button on Asset page/card [S]
- [ ] **#205** - web: Account page (plan picker) + Subscribe button [S]
- [ ] **#209** - tests: API + E2E for recording & credits [M]
- [ ] **#69** - feature(storage): preview generator stub + waveform placeholder [M]

### P3 (Low Priority)
- [ ] **#212** - web: Light theme variant + theme toggle [S]
- [ ] **#211** - mobile: Biometric gate before Decrypt & Play (stub) [S]
- [ ] **#84** - task(mobile): deep link gotmusic://asset/<id> [S]
- [ ] **#83** - task(mobile): MMKV cache persist (flagged) [S]
- [ ] **#127** - feature(mobile): decrypt & play (mock key, happy-path) [M]

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
