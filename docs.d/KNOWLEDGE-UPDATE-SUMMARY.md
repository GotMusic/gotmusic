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

## 2025-10-15 - Automated Checklist Sync

### 2025-10-15 - Auto-Update EXECUTION-CHECKLIST with GitHub Issues
- **Files created:** `scripts/sync-execution-checklist.mjs`, `.github/workflows/sync-checklist.yml`
- **Docs updated:** `EXECUTION-CHECKLIST.md`, `ISSUE-PR-WORKFLOW.md`
- **Change:** 
  - Created script that fetches open issues from GitHub API and updates section 10.5 in EXECUTION-CHECKLIST.md
  - Created GitHub Actions workflow that runs on issue close/reopen/label events
  - Script sorts issues by priority (P0→P1→P2→P3) then size (XS→S→M→L)
  - Automatically marks highest-priority issue as "RECOMMENDED NEXT"
  - Workflow commits changes and posts confirmation comment on issues
  - Updated EXECUTION-CHECKLIST.md to document auto-update behavior
  - Updated ISSUE-PR-WORKFLOW.md with detailed automation explanation
- **Reason:** Prevent checklist from becoming stale; eliminate confusion when starting new work (Issue #122 was already closed but still listed as "next")
- **Related issues:** Resolves stale checklist problem discovered when attempting to work on #122

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
