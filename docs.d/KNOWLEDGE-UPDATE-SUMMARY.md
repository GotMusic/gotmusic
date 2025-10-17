---
id: KNOWLEDGE-UPDATE
status: Active
owner: @grantedwards
updated: 2025-10-15
docType: changelog
---

# Documentation Change Log

This file tracks significant changes to the GotMusic internal documentation (`docs.d/`). When you make substantial updates to documentation, append an entry here.

---

## 2025-10-17 - Studio Navigation Fix
- **Docs updated:** EXECUTION-CHECKLIST.md
- **Change:** Added Studio header fix (PR #228) to PR history and updated issue/PR counts
- **Why:** Studio section was missing main site header, breaking navigation between sections

---

## Format

```md
### YYYY-MM-DD - Brief Title
- **Docs updated:** [list of doc IDs or paths]
- **Change:** [what was changed]
- **Reason:** [why the change was made]
- **Related issues:** [#issue-numbers or N/A]
```

---

## 2025-10-17 - Workflow & CI Optimization

### 2025-10-17 - Parallel-Start Workflow (Zero Wait Time)
- **Files updated:** `docs.d/AGENT-START.md`, `docs.d/ISSUE-PR-WORKFLOW.md`, `.cursorrules`, `.github/workflows/ci.yml`
- **Files created:** `docs.d/workflows/GIT-CONFIG-SPEEDUPS.md`
- **Change:**
  - **Workflow Paradigm Shift:** Start next issue IMMEDIATELY after PR merge (don't wait for automation)
  - **Sync-Before-PR:** Always run `git fetch && git rebase origin/main` before creating PR
  - **Timing Improvement:** Work time (10 mins) overlaps with automation time (1 min) = zero dead time
  - **Throughput Gain:** Complete ~20% more issues per session (no more 1-minute waits between issues)
  - **CI Optimizations:** 
    - Enabled `cancel-in-progress: true` (cancel stale runs)
    - Added Turbo cache (`.turbo` directory)
    - Added Next.js build cache (`apps/web/.next/cache`)
    - Added Playwright browser cache (`~/.cache/ms-playwright`)
    - Reduced timeouts: checks 15→10 min, build 30→20 min, e2e 25→20 min
    - Expected CI time: 2-4 minutes (down from 5+ minutes)
  - **Git Aliases:** Created `git start`, `git sync`, `git pushpr` shortcuts
  - **Documentation:** Comprehensive guide for Git speedups, worktrees, pre-push hooks
- **Agent Pattern:**
  1. PR merges → START immediately
  2. `git fetch origin && git switch -c feat/scope/desc-Y --no-track origin/main`
  3. Work locally (~10 mins)
  4. `git fetch origin && git rebase origin/main` (sync before PR)
  5. `git push -u origin feat/scope/desc-Y && gh pr create ...`
  6. Say: "PR #X merged ✅! Started Issue #Y immediately. Will sync before PR."
- **Reason:** Eliminate dead time between issues; maximize throughput; simplify workflow
- **Impact:** 
  - **Before:** 10 issues × 1 min wait = 10 mins wasted per session
  - **After:** Zero wait time = 10 more minutes of productive work
  - **Result:** Complete 2-3 more issues per hour-long session
- **Related:** Workflow guide (ISSUE-PR-WORKFLOW.md), Git config (GIT-CONFIG-SPEEDUPS.md)
- **PR:** N/A (infrastructure improvement, will commit as workflow upgrade)

---

## 2025-10-17 - Workflow: Auto-Merge CI Monitoring (Full Automation)

### 2025-10-17 - Add automatic CI monitoring and merge
- **Files created:**
  - `docs.d/workflows/AUTO-MERGE-PATTERN.md` - Full automation documentation
  - `docs.d/workflows/scripts/poll-and-merge.sh` - CI monitor that auto-merges when green
  - `docs.d/workflows/scripts/check-pr-failures.sh` - Pre-flight check for CI issues
- **Files updated:** `docs.d/AGENT-START.md`, `docs.d/ISSUE-PR-WORKFLOW.md`
- **Problem:** Agent had to wait for manual "CI passed" notification before merging
- **Solution:** Background monitors poll CI every 30s, auto-merge when all checks pass
- **Workflow:**
  1. Create PR → Start monitor in background (non-blocking)
  2. IMMEDIATELY start next issue (don't wait!)
  3. Work on next issue while previous PR's CI runs
  4. Monitor auto-merges when CI passes
  5. Repeat infinitely
- **Benefits:**
  - ✅ Zero wait time between issues
  - ✅ True parallel development (work on multiple issues simultaneously)
  - ✅ Fully hands-off (no manual merge commands)
  - ✅ Auto-detection of CI failures
  - ✅ ~40% faster throughput (work while CI runs)
- **Monitor features:**
  - Polls every 30 seconds
  - Max wait: 20 minutes
  - Auto-merges + deletes branch when green
  - Logs failures to `/tmp/pr-{num}-failure.txt`
  - Detects merge conflicts
  - Non-blocking (runs in background)
- **Safety:** Pre-flight check before starting new issues stops work if failures detected
- **Impact:** Enables unlimited parallel issues - agent never waits for CI
- **Related:** Completes the parallel-start workflow optimization

---

## 2025-10-17 - Workflow: Always Start from Main

### 2025-10-17 - Add "Start from main" requirement to prevent conflicts
- **Files updated:** `docs.d/AGENT-START.md`, `docs.d/ISSUE-PR-WORKFLOW.md`
- **Root Cause:** PR #219 was created while on PR #218's branch, causing merge conflicts
- **Problem:** When starting a new branch from another feature branch:
  - New branch inherits all commits from the old branch
  - When old PR merges, those commits are duplicated
  - Result: `CONFLICTING` merge state, requires rebase and force-push
- **Fix:** Added **Step 0** to workflow:
  ```bash
  # ALWAYS before creating new branch:
  git switch main
  git pull origin main
  # THEN create new branch:
  git fetch origin && git switch -c <branch> --no-track origin/main
  ```
- **Why `--no-track origin/main` matters:**
  - Creates branch from `origin/main` (remote), not local `main`
  - Ensures absolute latest code
  - Prevents inheriting commits from feature branches
- **Impact:** Prevents merge conflicts when parallel PRs merge in sequence
- **Lesson:** "Parallel-Start" only works when **every** branch starts from `main`
- **Related issues:** Learned from PR #219 merge conflict after PR #218 merged

---

## 2025-10-17 - Workflow: CI Error Handling Protocol

### 2025-10-17 - Add CI failure handling to agent workflow
- **Files updated:** `docs.d/AGENT-START.md`, `docs.d/ISSUE-PR-WORKFLOW.md`
- **Change:**
  - Added comprehensive CI error handling protocol (Step 8 in AGENT-START.md)
  - 10-step process: Stop → Switch → Analyze → Fix → Test → Push → Wait → Continue
  - Added "NEVER" list: don't move forward with failing CI, don't ignore errors
  - Added pre-flight check: verify previous PR CI status before starting new issue
  - Documented error handling in ISSUE-PR-WORKFLOW.md "Error Handling (CI Failures)" section
- **Testing Requirements:**
  - Build: `yarn workspace @gotmusic/web build`
  - Lint: `yarn biome check .`
  - Typecheck: `yarn typecheck`
- **Purpose:** Prevent cascading errors and catch issues early
- **Reason:** Issue #198 had build failure that was initially missed; need protocol to handle CI failures immediately
- **Impact:** Ensures all PRs are green before moving forward; prevents dependent PRs from failing
- **Related issues:** Learned from PR #218 (Issue #198) build failure

---

## 2025-10-17 - API: Recordings Complete Endpoint

### 2025-10-17 - Add /api/recordings/complete endpoint + Schema Fix
- **Files created:** `apps/web/src/app/api/recordings/complete/route.ts`, `apps/web/tests/api/recordings-complete.spec.ts`
- **Files updated:** `apps/web/src/server/db/schema.ts`
- **Change:**
  - Created endpoint to finalize mobile recording uploads
  - Accepts `{ userId, fileKey, cid, durationSec, title? }`
  - Creates draft asset in `assets` table (status: draft)
  - Inserts `uploadJob` row (stage: done, message: "Upload completed successfully")
  - Returns `{ ok: true, assetId }` to client
  - Added 13 comprehensive integration tests covering validation, edge cases, and happy paths
  - **Schema fix:** Added `durationSec`, `fileCid`, `storageKey`, `ownerId` columns to `assets` table
- **Validation:**
  - Rejects missing required fields (400 status)
  - Validates durationSec must be positive integer
  - Supports optional title field (defaults to "Recording")
- **Testing:**
  - Tests missing fields, invalid types, boundary cases (1 sec, 1 hour recordings)
  - Tests multiple uploads for same user
  - Tests custom vs default titles
  - Verifies asset creation via GET /api/assets/:id
- **Purpose:** Complete the mobile recording pipeline (sign → upload → complete)
- **Reason:** Enable mobile app to create draft assets after successful recording upload
- **Related issues:** Closes #198; completes pipeline started in #197, #196
- **PR:** #218

---

## 2025-10-17 - Mobile: Recording Upload Pipeline

### 2025-10-17 - Implement mobile upload pipeline (sign → PUT → complete)
- **Files updated:** `apps/mobile/app/(tabs)/record.tsx`
- **Change:**
  - Implemented complete upload pipeline after recording stops
  - **Step 1:** Call `/api/recordings/sign` to get pre-signed upload URL
  - **Step 2:** Upload file to signed URL using `FileSystem.uploadAsync`
  - **Step 3:** Call `/api/recordings/complete` to create draft asset
  - Added comprehensive error handling with user-friendly alerts
  - Success alert with "View Library" action button
  - Loading states during upload process
  - Proper file metadata (filename, content type, file size, duration)
- **User Experience:**
  - Clear success message: "Recording Saved" with navigation to library
  - Error alerts with retry capability
  - Loading indicator during upload
  - Graceful error recovery
- **Technical Details:**
  - Uses `expo-file-system` for file operations and uploads
  - Content-Type: audio/m4a (HIGH_QUALITY preset)
  - Timestamp-based filenames for uniqueness
  - CID set to key for MVP (as per issue notes)
  - User ID: "user_mobile_001" (TODO: integrate with auth)
- **Purpose:** Complete end-to-end mobile recording workflow
- **Reason:** Enable users to record, upload, and save audio directly from mobile app
- **Related issues:** Closes #199; completes pipeline: #194 → #196 → #197 → #198 → #199
- **PR:** #219

---

## 2025-10-17 - API: Recordings Sign Endpoint

### 2025-10-17 - Add /api/recordings/sign endpoint
- **Files created:** `apps/web/src/app/api/recordings/sign/route.ts`, `apps/web/tests/api/recordings-sign.spec.ts`
- **Change:**
  - Created new API endpoint for mobile recording uploads
  - Reuses S3 client logic from /api/upload/sign
  - Enforces `recordings/` prefix for storage keys
  - Rate limiting: 30 requests per minute per IP
  - Validates file size (100MB max) and MIME types (audio only)
  - Returns `{ url, key, contentType }` format
  - Supports stub/R2/S3 storage modes
  - 5-minute signed URL expiry
  - Key format: `recordings/{timestamp}-{random}-{filename}`
- **Testing:**
  - 15 Playwright integration tests covering validation, rate limiting, success cases
  - Verifies `recordings/` prefix enforcement
  - Tests unique key generation
  - Tests 400 errors for validation failures
  - Tests 429 rate limit enforcement with per-IP tracking
- **Purpose:** Enable mobile app to upload recorded audio via pre-signed URLs
- **Reason:** Foundation for mobile recording pipeline (#199)
- **Related issues:** Closes #197; prepares for #198, #199
- **PR:** #217

## 2025-10-17 - Database Schema Extensions

### 2025-10-17 - Add uploadJobs Table and priceCredits Column
- **Files updated:** `apps/web/src/server/db/schema.ts`, `apps/web/src/server/db/seed.ts`
- **Change:**
  - Added `upload_job_stage` enum (init, uploading, encrypting, done, error)
  - Created `upload_jobs` table with id, userId, assetId, stage, message, createdAt
  - Added indexes on userId, assetId, stage for query performance
  - Extended `assets` table with `priceCredits` integer column (default: 10)
  - Added `uploadJobs` relation to `assetRelationsPg` and reverse relation `uploadJobRelationsPg`
  - Updated seed data with credit pricing: Night Drive 88 (12 credits), Glass Pad (5 credits), Ethereal Vox (8 credits)
- **Purpose:**
  - Enable credit-based pricing system as alternative to PYUSD
  - Track upload progress for mobile recording pipeline (#195, #197)
  - Support hybrid payment model (on-chain PYUSD + off-chain credits)
  - Provide granular visibility into recording upload stages for debugging
- **Impact:**
  - Additive schema changes (no breaking modifications)
  - Existing assets remain valid (priceCredits defaults to 10)
  - New table unused until API routes implemented (#195)
  - Seeds now deterministic with credit values
- **Reason:** Foundation for mobile recording upload pipeline and subscription-based credit system
- **Related issues:** Closes #196; prepares for #195, #197, #198-#211
- **PR:** #216

## 2025-10-17 - Design Token System v0.2.0

### 2025-10-17 - World-Class Dark Theme Token System
- **Files updated:** `packages/tokens/tokens.raw.json`, `apps/web/tailwind.config.js`, `apps/mobile/tailwind.config.cjs`, `packages/tokens/scripts/check-parity.cjs`
- **Change:**
  - Expanded token system from 29 to 333 lines (v0.2.0)
  - Added complete neutral palette (0-1000, 11 shades)
  - Added brand color variants (mint, ice with 200/700 shades)
  - Added border tokens (hairline, subtle, emphasis, brand, danger)
  - Added state tokens (hover, press, focus, selected, disabled)
  - Added comprehensive spacing scale (0-24, 4px grid)
  - Added size tokens (icon xs-xxl, control sm/md/lg, container breakpoints)
  - Added elevation shadows (ambient-1/2/3, glow effects)
  - Added motion system (duration, easing curves including springy)
  - Added component tokens (button, card, input, toggle, listItem, chip)
  - Added audio-specific tokens (meter: low/mid/hot, waveform colors)
  - Added accessibility tokens (minTap: 44px, focus ring specs)
  - Added data visualization palette (5 semantic colors)
  - Added typography scale with line heights (xs → display-lg)
  - Added font families (Inter sans, JetBrains Mono)
  - Added z-index scale, opacity scale, blur values
- **Tailwind Updates:**
  - Web: Extended with 205 CSS variables, added shadows/motion/borders
  - Mobile: Extended with 308 token paths, added shadows/fonts/spacing
  - Parity check updated for new structure (`color.palette.semantic.*`)
- **Benefits:**
  - Producer-focused futuristic dark theme
  - Thin borders (6-16% white opacity) for subtle depth
  - Soft neon accents (mint/ice) for interactive elements
  - Complete component recipes for consistent UI
  - Audio-first design tokens (meters, waveforms)
  - Accessibility-first (44px tap targets, focus rings)
  - Full parity between web and mobile platforms
- **Reason:** Establish comprehensive, professional design foundation for all UI development; enable consistent, accessible, production-ready interfaces across web and mobile
- **Related issues:** N/A (infrastructure improvement)
- **PR:** #214

---

## 2025-10-16 - ULID IDs + Auto-Updating Timestamps

### 2025-10-16 - Implement ULID Generation and Drizzle .$onUpdate()

**Files Created/Updated:**
- `apps/web/src/lib/ulid.ts` — ULID utility functions
- `apps/web/src/lib/__tests__/ulid.test.ts` — Unit tests for ULID
- `apps/web/scripts/migrate-to-ulid.ts` — Migration script for existing data
- `apps/web/src/server/db/schema.ts` — Added `.$onUpdate()` to `updatedAt`
- `apps/web/src/server/db/seed.ts` — Use deterministic ULIDs
- `apps/web/src/server/db/audit.ts` — Use `generateId()` for audit logs
- `apps/web/src/app/api/upload/notify/route.ts` — Use `generateId()` for file IDs
- `package.json`, `apps/web/package.json`, `yarn.lock` — Added `ulid@3.0.1`

**Changes:**
- Implemented ULID (Universally Unique Lexicographically Sortable Identifier) generation for all new database records (assets, asset_files, asset_audit)
- Added `.$onUpdate(() => new Date())` to `assets.updatedAt` column in Drizzle schema for automatic timestamp updates on every `.update()` call
- Created utility functions: `generateId()` for new records, `generateIdAtTime(timestamp)` for deterministic seeding, `isValidUlid(id)` for validation
- Updated seed data to use `generateIdAtTime()` with fixed timestamps for CI/E2E stability
- Provided migration script (`migrate-to-ulid.ts`) with dry-run mode to convert existing IDs (optional, not run by default)
- Added comprehensive unit tests covering ULID format validation, determinism, and sortability

**Reason:**
- **Better sortability:** ULIDs are lexicographically sortable by creation time, enabling chronological sorting by ID alone without joining `createdAt` columns
- **Database performance:** Time-ordered IDs improve B-tree index efficiency
- **Deterministic testing:** `generateIdAtTime()` enables repeatable, stable IDs for E2E tests and seed data
- **UUID compatibility:** ULIDs are 128-bit and URL-safe, maintaining compatibility with existing systems expecting UUID-like identifiers
- **Auto-updating timestamps:** Drizzle's `.$onUpdate()` ensures `updatedAt` is always accurate without manual intervention in every API route

**Related Issue:** Closes #64

---

## 2025-10-15 - Blockscout Links Integration

### 2025-10-15 - Add Blockscout Explorer Links for TX and Attestations
- **Files created:** `apps/web/src/lib/blockscout.ts`, `apps/web/src/components/BlockscoutLink.tsx`, `apps/web/src/app/admin/assets/[id]/AssetReceipt.tsx`, `apps/web/tests/e2e/blockscout-links.spec.ts`, `apps/web/src/lib/README.md`
- **Files updated:** `apps/web/src/app/admin/assets/[id]/page.tsx`
- **Change:**
  - Created utility functions for generating Blockscout URLs (tx, attestation, address)
  - Created reusable BlockscoutLink React component with security attributes
  - Added AssetReceipt component to display license receipts with Blockscout links
  - Integrated receipt section into asset detail page sidebar
  - Added E2E tests for Blockscout link rendering (7 test cases)
  - Documented Blockscout integration in lib/README.md
  - Uses mock data with feature flag (NEXT_PUBLIC_SHOW_MOCK_RECEIPT)
  - Links open in new tab with proper security (noopener, noreferrer)
- **Reason:** Prepare UI infrastructure for payment and EAS integration; enable users to verify transactions and attestations on Base Sepolia explorer
- **Related issues:** Closes #128

---

## 2025-10-16 - Accessibility Improvements

### 2025-10-16 - Web App Accessibility Pass (A11y)
- **Files created:** `apps/web/src/components/SkipLink.tsx`, `apps/web/src/lib/currency.ts`, `apps/web/src/lib/__tests__/currency.test.ts`
- **Files updated:** `apps/web/src/app/layout.tsx`, `apps/web/src/app/page.tsx`, `apps/web/src/app/admin/page.tsx`, `apps/web/src/app/admin/AdminAssetsTable.tsx`, `apps/web/src/app/admin/uploads/page.tsx`, `apps/web/src/app/admin/assets/[id]/page.tsx`
- **Change:**
  - Added SkipLink component for keyboard navigation (focus-visible skip to main content)
  - Added `id="main-content"` to all main elements across pages
  - Added ARIA attributes: `aria-busy`, `aria-live`, `aria-label`, `role="alert"`, `role="img"`
  - Added `sr-only` class for screen reader announcements in loading states
  - Updated metadata for better SEO (title, description, Open Graph)
  - Wrapped `AdminAssetsTable` in Suspense boundary (fixes `useSearchParams` SSR error)
  - Created international currency formatter using `Intl.NumberFormat`
  - Added locale detection (`getUserLocale()`) with SSR fallback
  - Custom handling for crypto currencies (PYUSD, ETH, BTC, USDC, USDT)
  - Comprehensive unit tests for currency formatting (11 test cases with Jest type declarations)
  - Integrated `formatCurrency()` in catalog and admin table
- **Accessibility Features:**
  - Skip link (keyboard users can jump to main content)
  - Semantic HTML (`main`, proper heading hierarchy)
  - ARIA live regions for dynamic content
  - Loading state announcements for screen readers
  - Proper link labels and button descriptions
  - High contrast focus indicators
- **Internationalization:**
  - Locale-aware currency formatting (e.g., $29.99 for en-US, 29,99 € for de-DE)
  - Graceful fallbacks for unsupported currencies
  - Server-side rendering compatible
- **Reason:** Improve web app usability for keyboard navigation and assistive technologies; provide professional currency display for international users; prepare for Lighthouse scoring in judge evaluations
- **Related issues:** Closes #79 (accessibility), #78 (currency/locale)

---

## 2025-10-16 - Automated Checklist Sync (COMPLETED)

### 2025-10-16 - Auto-Update EXECUTION-CHECKLIST with GitHub Issues ✅
- **Files created:** `scripts/sync-execution-checklist.mjs`, `.github/workflows/sync-checklist.yml`
- **Docs updated:** `EXECUTION-CHECKLIST.md`, `ISSUE-PR-WORKFLOW.md`
- **Change:** 
  - Created script that fetches open issues from GitHub API and updates section 10.5 in EXECUTION-CHECKLIST.md
  - Created GitHub Actions workflow with `workflow_run` trigger (runs after CI completes on main)
  - Script sorts issues by priority (P0→P1→P2→P3) then size (XS→S→M→L)
  - Automatically marks highest-priority issue as "RECOMMENDED NEXT"
  - Workflow commits changes with `[skip ci]` to prevent infinite loops
  - Updated EXECUTION-CHECKLIST.md to document auto-update behavior
  - Updated ISSUE-PR-WORKFLOW.md with detailed automation explanation
  - **Fixed through 5 follow-up PRs:**
    - PR #157: Added `pull_request.closed` trigger
    - PR #158: Added `push` trigger for squash merges
    - PR #161: Switched to `workflow_run` trigger (reliable post-merge pattern)
    - PR #162: Added `GH_TOKEN` environment variable for gh CLI access
    - PR #165: Added `issues: read` permission for GraphQL API access
- **Final Configuration:**
  - Trigger: `workflow_run` on `ci` workflow completion (main branch)
  - Permissions: `contents: write`, `issues: read`, `pull-requests: read`, `actions: read`
  - Environment: `GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}`
- **Result:** 🎉 Automation fully operational! Workflow successfully ran after PR #165 merge
- **Reason:** Prevent checklist from becoming stale; eliminate confusion when starting new work (Issue #122 was already closed but still listed as "next")
- **Related issues:** #152 (initial), #157, #158, #159, #160, #161, #162, #163, #164, #165 (completion)

---

## 2025-10-15 - Complete SQLite Cleanup

### 2025-10-15 - PostgreSQL-Only Finalization
- **Files updated:** `.cursorrules`, code files (apps/web/drizzle.config.ts, schema.ts, package.json)
- **Change:** 
  - Removed `.data/` directory (old SQLite database)
  - Renamed `schema-postgres.ts` → `schema.ts` (default)
  - Renamed `drizzle.config.pg.ts` → `drizzle.config.ts` (default)
  - Removed `--config` flags from package.json scripts
  - Cleaned up old SQLite and duplicate PG migrations
  - Updated `.cursorrules` to remove SQLite compatibility note
- **Reason:** Complete the PostgreSQL-first transition; eliminate all SQLite remnants and simplify configuration
- **Related issues:** Completes #135-140 (PG-first migration)

---

## 2025-10-15 - Documentation System Refactor

### 2025-10-15 - Two-Tier Documentation System Implementation
- **Docs updated:** INDEX.md (new), AI-ENTRYPOINT.md (new), DOCS.md (new), _manifest.yaml (new), this file (new)
- **Change:** 
  - Created public front door (`DOCS.md`) for judges and external stakeholders
  - Created private front door (`docs.d/INDEX.md`) for builders and internal use
  - Added `AI-ENTRYPOINT.md` with explicit instructions for AI assistants
  - Created `_manifest.yaml` doc registry with metadata for all docs
  - Added metadata front-matter (id, status, owner, updated) to top 10 docs
  - Created this changelog for tracking doc evolution
- **Reason:** 
  - Separate public (judge-facing) from private (builder-facing) documentation
  - Provide single entrypoints for different audiences
  - Make docs discoverable, trackable, and maintainable
  - Prevent link rot and orphaned documentation
  - Enable automated validation of doc health
- **Related issues:** N/A (infrastructure improvement)

### 2025-10-15 - Docker PostgreSQL Setup Documentation
- **Docs updated:** BUILDERS-START-HERE.md, EXECUTION-CHECKLIST.md, README.md
- **Change:** Added comprehensive Docker setup instructions for local PostgreSQL (port 5433)
- **Reason:** Eliminate confusion for new builders, avoid conflicts with other local PostgreSQL instances (e.g., Tubra on 5432)
- **Related issues:** N/A (onboarding improvement)

### 2025-10-15 - Admin Panel Pagination Documentation
- **Docs updated:** COMPLETED-ISSUES-SUMMARY.md, BUILDERS-START-HERE.md
- **Change:** Documented completion of issue #122 (admin assets table with server-side pagination, search, and filters)
- **Reason:** Track P2 issue completion, update technical achievements
- **Related issues:** #122

### 2025-10-15 - API Pagination & Filters Documentation
- **Docs updated:** COMPLETED-ISSUES-SUMMARY.md, BUILDERS-START-HERE.md
- **Change:** Documented completion of issue #121 (API pagination with cursor-based navigation and query filters)
- **Reason:** Track P2 issue completion, document API capabilities
- **Related issues:** #121

### 2025-10-15 - E2E Test Stabilization Documentation
- **Docs updated:** COMPLETED-ISSUES-SUMMARY.md, EXECUTION-CHECKLIST.md
- **Change:** Documented completion of issue #126 (E2E test improvements with data-testid selectors and screenshot/video capture)
- **Reason:** Track P2 issue completion, document testing improvements
- **Related issues:** #126

---

## 2025-10-13 - PostgreSQL-First Migration

### 2025-10-13 - SQLite Removal & PostgreSQL-First Strategy
- **Docs updated:** BUILDERS-START-HERE.md, EXECUTION-CHECKLIST.md, ADR-0003-pg-first.md (new)
- **Change:** 
  - Removed all SQLite references and dual-driver support
  - Updated database setup instructions for PostgreSQL-only
  - Created ADR documenting the PostgreSQL-first decision
  - Updated CI workflow to use PostgreSQL service container
- **Reason:** Simplify database layer, match production environment, reduce maintenance burden
- **Related issues:** #135, #136, #138

---

## 2025-10-12 - Infrastructure Improvements

### 2025-10-12 - CI Pipeline Stabilization
- **Docs updated:** EXECUTION-CHECKLIST.md, testing/e2e.md
- **Change:** 
  - Documented Yarn 4 + Corepack setup in CI
  - Added CI port management (PW_PORT=4123)
  - Documented artifact upload/download for .next directory
  - Added readiness endpoint documentation
- **Reason:** Enable reliable E2E testing in CI, prevent port conflicts, improve debugging
- **Related issues:** #141, #147

### 2025-10-12 - API Health Checks
- **Docs updated:** BUILDERS-START-HERE.md, EXECUTION-CHECKLIST.md
- **Change:** 
  - Documented `/api/healthz` and `/api/readiness` endpoints
  - Added health check commands to quick reference
  - Explained readiness checks (DB connectivity, migrations, seed data)
- **Reason:** Enable automated health monitoring, improve CI reliability
- **Related issues:** N/A (infrastructure improvement)

---

## 2025-10-11 - Initial Documentation Creation

### 2025-10-11 - Core Documentation Setup
- **Docs updated:** BUILDERS-START-HERE.md (new), EXECUTION-CHECKLIST.md (new), ISSUE-PR-WORKFLOW.md (new), PR-COMMENT-GUIDE.md (new)
- **Change:** Created initial set of internal documentation for builders
- **Reason:** Establish workflow standards, onboarding process, and execution tracking
- **Related issues:** N/A (initial setup)

---

## Template for Future Entries

```md
### YYYY-MM-DD - Title of Change
- **Docs updated:** [doc-id-1, doc-id-2]
- **Change:** [what was changed - be specific]
- **Reason:** [why this change was necessary]
- **Related issues:** [#123, #456 or N/A]
```

---

**Guidelines for logging changes:**

1. **Log immediately after making changes** (while context is fresh)
2. **Be specific about what changed** (not just "updated doc X")
3. **Explain why** (helps future readers understand decisions)
4. **Link related issues** (enables traceability)
5. **Use reverse chronological order** (newest entries at top of each section)
6. **Group related changes** (if updating multiple docs for one logical change)
