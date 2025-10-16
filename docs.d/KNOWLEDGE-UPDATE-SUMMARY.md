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

## Format

```md
### YYYY-MM-DD - Brief Title
- **Docs updated:** [list of doc IDs or paths]
- **Change:** [what was changed]
- **Reason:** [why the change was made]
- **Related issues:** [#issue-numbers or N/A]
```

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
