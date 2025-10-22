---
id: EXEC-CHECKLIST
status: Active
owner: @grantedwards
updated: 2025-10-22 10:21:35
docType: checklist
---

# GotMusic — ETHOnline 2025 MVP Execution Checklist
> **Dates:** Oct 10–31, 2025 • **Today:** Oct 17 • **Goal:** Judge-ready web demo + mobile happy path  
> **Policies:** See `.cursorrules` at repo root for coding standards, CI gates, and dependencies.  
> **Status:** 35 issues complete | 79 PRs merged | 23 E2E tests passing (100% success) | PostgreSQL-first + automation active | E2E CI split implemented

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

### ✅ Completed (as of Oct 21, 2025)
- **35 Issues Complete** - See [Closed Issues](#closed-issues-history) below
- **79 PRs Merged** - See [PR History](#pr-history-all-merged-prs) below
- **23 E2E Tests Passing (100% success rate)** - All Playwright tests stable with cookie-based auth bypass
- **CI Pipeline:** Split into fast-gate (required) + e2e-studio-auth (non-blocking) with concurrency control
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
- **E2E Testing:** Cookie-based authentication bypass, error boundaries, modern Next.js 15 + React Suspense patterns
- **Database:** UPSERT operations for idempotent seeding, deterministic test data, case-insensitive search
- **CI Stabilization:** Fast-gate job (build + typecheck + lint + @smoke tests) + non-blocking E2E with artifacts

### 🔄 In Progress
- None currently - ready for next issue

### 📋 Next Recommended
- **#251** - ci(e2e): re-enable Playwright tests with authentication and database setup [M]
- **#249** - feat(web): add middleware development auto-login with health allowlist [M]
- **#248** - feat(auth): implement HMAC-signed session cookies for security [S]

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

**Total: 79 merged PRs** (Oct 12-21, 2025) + 1 closed PR (#259 superseded by #260)

### Recent (Oct 21, 2025 - Latest)
- [x] **PR #260** - fix(ci): stabilize workspace resolution + yarn pin + deterministic builds (E2E CI split)
- [x] **PR #259** - ci: stabilize Yarn 4.3.1, immutable installs, and E2E reliability (closed - superseded by #260)
- [x] **PR #246** - feat(web): add Brands & APIs section to homepage (Issue #245)
- [x] **PR #244** - test(ci): verify issue-close-comment workflow permissions fix (Issue #244)
- [x] **PR #232** - feat(ci): unify Zod v4 across monorepo + local resolver (Issue #238)
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

**Total: 23 closed issues**

### Homepage Enhancement (Oct 18)
- [x] **#245** - feat(web): add Brands & APIs section to homepage

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

### 6.1) Home — **Brands & APIs** Section ✅ **COMPLETED**
> Add a showcase section **below "How It Works"** that lists our core brands/integrations (onchain, storage, wallets, infra). Pure presentation; safe while E2E is bypassed.

**Acceptance criteria**
- [x] Section renders on `/` **below How It Works**
- [x] Uses accessible **tabs** (role="tablist") for categories: `On-chain`, `Storage`, `Wallets`, `Infrastructure`
- [x] Responsive grid: 2 cols (sm), 3 (md), 4 (lg+)
- [x] Each logo has meaningful `alt`, parent has `aria-labelledby`
- [x] Reduced motion respected; no marquee/animations required
- [x] Falls back to text tiles if logo asset missing
- [x] No external network calls (static data only)

**Implementation tasks**
- [x] `apps/web/src/data/brands.ts` — static catalog:
  - `{ name, category, href, logo: '/brands/<slug>.svg', description }`
- [x] `apps/web/src/components/home/BrandsAndApis.tsx`
  - Accessible tabs + grid; keyboard nav; focus states
  - Optional badge tinting by category via tokens
- [x] Wire to page: `apps/web/src/app/(shop)/page.tsx` (render after How It Works)
- [x] Assets: add temporary SVGs to `apps/web/public/brands/` (placeholders OK)
- [x] Optional Storybook: `BrandsAndApis.stories.tsx` (visual diff aid)
- [x] Optional smoke test (non-blocking while E2E disabled):
  - Assert section heading visible + tab switch renders items

**Out of scope (follow-ups)**
- Replace placeholders with licensed official SVGs
- Auto-hide entries behind feature flags (e.g., `GM_FEATURE_LIT`, `GM_FEATURE_NEXUS`)
- Dynamic availability badges (online/offline ping)

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
- **Dev overlays:** 8-pt grid (web) + touch targets (mobile)
- **Design tokens:** Never hardcode colors/spacing/typography

---

## 10.5) Next Sprint — P2 Issues (Priority Order)

### 🔥 HIGH PRIORITY (P0/P1)
- [ ] **#248** - feat(auth): implement HMAC-signed session cookies for security [S] ← **RECOMMENDED NEXT**
- [ ] **#251** - ci(e2e): re-enable Playwright tests with authentication and database setup [M] ← **RECOMMENDED NEXT**
- [ ] **#249** - feat(web): add middleware development auto-login with health allowlist [M] ← **RECOMMENDED NEXT**
- [ ] **#180** - feat(audio): implement server-side processing pipeline [L] ← **RECOMMENDED NEXT**
- [ ] **#178** - feat(web): implement (shop) routes - catalog, asset detail, checkout [L] ← **RECOMMENDED NEXT**
- [ ] **#179** - feat(web): implement (studio) routes - assets, uploads, sales [XL] ← **RECOMMENDED NEXT**
- [ ] **#250** - feat(web): implement EIP-1193 wallet connection MVP [S] ← **RECOMMENDED NEXT**
- [ ] **#204** - api: POST /api/credits/spend → buy asset with credits [S] ← **RECOMMENDED NEXT**
- [ ] **#203** - api: POST /api/subscriptions/webhook → mark paid & mint credits (off-chain mirror) [S] ← **RECOMMENDED NEXT**
- [ ] **#202** - api: POST /api/subscriptions/subscribe → build Nexus intent [S] ← **RECOMMENDED NEXT**
- [ ] **#201** - db: subscriptions & creditTransactions tables [S] ← **RECOMMENDED NEXT**
- [ ] **#185** - docs(readme): update with new IA, roles, and environment variables [S] ← **RECOMMENDED NEXT**
- [ ] **#177** - docs(design): add catalog card and player patterns [S] ← **RECOMMENDED NEXT**
- [ ] **#264** - ui(storybook): Commerce components (buy, checkout, pricing) [M] ← **RECOMMENDED NEXT**
- [ ] **#200** - contracts: SubscriptionManager.sol (PYUSD) + CreditBank.sol [M] ← **RECOMMENDED NEXT**
- [ ] **#193** - feat(ui): set up Storybook with accessibility checks and full component coverage [M] ← **RECOMMENDED NEXT**
- [ ] **#184** - feat(access): wire Lit ACC + Lighthouse to download endpoint [M] ← **RECOMMENDED NEXT**
- [ ] **#274** - perf(e18e): Monorepo-wide performance optimization [L] ← **RECOMMENDED NEXT**
- [ ] **#182** - feat(mobile): implement browse, library, studio tabs and screens [L] ← **RECOMMENDED NEXT**
- [ ] **#273** - perf(storybook): Performance monitoring and optimization [S]
- [ ] **#271** - ui(storybook): Feedback components (toasts, modals, alerts) [S]
- [ ] **#208** - docs: flows & diagrams update (recording, subscribe→credits, buy with credits) [S]
- [ ] **#207** - ops: Webhook wire-up (explorer/Nexus) + .env docs [S]
- [ ] **#206** - web: Buy with Credits button on Asset page/card [S]
- [ ] **#205** - web: Account page (plan picker) + Subscribe button [S]
- [ ] **#272** - perf(e18e): Bundle optimization and dependency cleanup [M]
- [ ] **#270** - ui(storybook): Core UI components (buttons, cards, inputs) [M]
- [ ] **#209** - tests: API + E2E for recording & credits [M]
- [ ] **#69** - feature(storage): preview generator stub + waveform placeholder [M]

### P3 (Low Priority)
- [ ] **#269** - ui(storybook): User management components (roles, permissions, status) [S]
- [ ] **#212** - web: Light theme variant + theme toggle [S]
- [ ] **#211** - mobile: Biometric gate before Decrypt & Play (stub) [S]
- [ ] **#84** - task(mobile): deep link gotmusic://asset/<id> [S]
- [ ] **#83** - task(mobile): MMKV cache persist (flagged) [S]
- [ ] **#277** - Re-enable e2e-studio tests after auth-bypass + seed alignment [M]
- [ ] **#261** - E2E Studio/Auth Flake Board [M]
- [ ] **#252** - feat(mobile): add biometric authentication gate for decrypt flow [M]
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
