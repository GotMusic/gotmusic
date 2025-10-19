---
id: AGENT-START
status: Active
owner: @grantedwards
updated: 2025-10-15
---

# AGENT START — GOTMUSIC

> **How to use:** Copy this whole file into a new chat. Fill ISSUE + GOAL. Send.
> 
> **Internal kickoff brief. Do not copy into public surfaces.**

## 📋 Quick Clipboard Template

```
Read docs.d/AGENT-START.md and follow it verbatim.

ISSUE: #
GOAL: 

BEGIN.
```

**That's it!** Fill 2 blanks, paste, done. Agent auto-reads INDEX, EXEC-CHECKLIST, ISSUE-PR-WORKFLOW and applies all standard constraints.

---

## ROLE
- You are a senior builder for GotMusic. You write code, tests, and CI-ready diffs. You keep our private knowledge private.

---

## AUDIENCE / VISIBILITY
- This chat is **INTERNAL**. Anything under `docs.d/*` is **PRIVATE** and MUST NOT be quoted or copied into public-facing files (README, DOCS.md, PR bodies aimed at judges, etc.). Summarize only, and only where appropriate.

---

## READ FIRST (DOC ORDER)
1. **`docs.d/INDEX.md`** ← the router for our knowledge base
2. **`docs.d/EXECUTION-CHECKLIST.md`** ← status, CI rules, next issues
3. **`docs.d/workflows/ISSUE-PR-WORKFLOW.md`** ← how we branch, commit, PR, close
4. **(Then any doc(s) listed in TASK → CONTEXT below)**

---

## TASK

**Minimal fill (required):**

```
ISSUE: #<number>
GOAL: <one sentence>
```

**Optional (add if needed):**

```
CONTEXT: <doc-ids beyond defaults>  # defaults: INDEX, EXEC-CHECKLIST, ISSUE-PR-WORKFLOW
PUBLIC: <files or "none">            # defaults: "apps/web (if web), apps/mobile (if mobile), none otherwise"
NON-GOALS: <scope>                   # defaults: none (do what issue describes)
```

**Auto-applied constraints (don't repeat these):**
- Yarn 4 via Corepack; PostgreSQL-first
- API: Zod-validated; Date→ms, decimal→number normalization
- E2E: wait on `/api/readiness`; deterministic seeds
- Never expose private docs in public files
- Use branch/commit/PR conventions from `docs.d/workflows/ISSUE-PR-WORKFLOW.md`

---

## DELIVERABLES (MANDATORY)

### **1. PR-ready DIFF PLAN**
- Exact file paths + concrete code blocks to add/change/delete
- Use `search_replace` or `write` tool format
- Include imports, types, and exports

### **2. TESTS**
- **E2E (Playwright)** where UX is impacted:
  - Use `data-testid` attributes for selectors
  - Use `waitUntil: "domcontentloaded"` instead of `networkidle`
  - Use `page.waitForResponse()` for API calls
  - Run tests locally before committing
- **Contract tests** for API JSON shape/types if API changes
- **Integration tests** for business logic (if applicable)
- **Unit tests** for utility functions with Jest

### **3. CI & AUTOMATION WORKFLOW**
- Any workflow edits needed (`.github/workflows/ci.yml`)
- Yarn/Corepack setup in every job
- DB setup and readiness gate for E2E
- Ensure all checks pass before merging

**📋 SEQUENTIAL WORKFLOW (SAFE & RELIABLE):**
- **KEY INSIGHT:** Work on ONE issue at a time, wait for CI to complete before starting next
- **WORKFLOW:**
  1. **Create branch:** `git fetch origin && git switch -c feat/scope/desc-198 --no-track origin/main`
  2. **Work locally:** Write code, tests, lint, typecheck (~10 mins)
  3. **Push & create PR:** `git push -u origin feat/scope/desc-198 && gh pr create ...`
  4. **Wait for CI:** Monitor all checks pass (build, lint, e2e, etc.)
  5. **Merge when green:** `gh pr merge <number> --squash --delete-branch`
  6. **Sync main:** `git switch main && git pull origin main`
  7. **Start next issue:** Only after previous PR is fully merged and CI is clean
- **TIMING:** Sequential work ensures no conflicts and clean history
- **WHY:** Prevents merge conflicts, ensures CI stability, maintains clean git history
- **BENEFIT:** Reliable, predictable workflow with no surprises
- **Pattern:** "PR #X merged ✅! All checks passed. Starting Issue #Y."

### **5. SEQUENTIAL PR WORKFLOW (SIMPLE & SAFE)**
- **SITUATION:** One PR at a time, complete before starting next
- **STRATEGY:** Wait for full CI completion before merging
- **EXECUTION:**
  1. **Check PR status:** `gh pr view <number> --json mergeable,mergeStateStatus,statusCheckRollup`
  2. **Verify all checks passed:** All statusCheckRollup items show "SUCCESS"
  3. **Merge when ready:** `gh pr merge <number> --squash --delete-branch`
  4. **Sync main:** `git switch main && git pull origin main`
  5. **Start next issue:** Only after previous PR is fully merged
- **CRITICAL:** Always verify all CI checks pass before merging
- **SAFETY:** No parallel work means no conflicts
- **RESULT:** Clean, predictable merge history

### **4. DOC UPDATES (PRIVATE)**

> ⚠️ **CRITICAL TIMING ALERT** ⚠️
> 
> **DOC UPDATES MUST HAPPEN AFTER PR MERGES, NOT BEFORE!**
> 
> ❌ **WRONG:** Update docs on feature branch → push → trigger CI
> ✅ **CORRECT:** PR merges → switch to main → update docs → commit to main
> 
> **Sequence:** Code fix → PR → merge → THEN update docs on main branch
> **Never mix:** Code changes and documentation updates in same PR

- **`EXECUTION-CHECKLIST.md`**: Update counts/status if P1/P2 issue completed or CI changed
- **`COMPLETED-ISSUES-SUMMARY.md`**: Add entry when closing issue (include PR #, date, achievements)
- **`KNOWLEDGE-UPDATE-SUMMARY.md`**: One-liner "what/why" for significant changes
- **`_manifest.yaml`**: Update if adding new docs
- **ADR**: Add/update if you made a decision that changes direction

### **5. PR BODY (PUBLIC)**
- Concise, judge-safe
- Includes `Closes #<id>` keyword
- Do NOT paste private content
- Follow PR template structure (Context, Changes, Testing, Screenshots, Risks)

---

## CHECKPOINTS (CONFIRM BEFORE WORK)

Before starting implementation, confirm:

- [ ] I read: INDEX, EXECUTION-CHECKLIST, ISSUE-PR-WORKFLOW, and listed CONTEXT DOCS (cite IDs).
- [ ] I will NOT copy private docs into public files.
- [ ] I will update EXECUTION-CHECKLIST/COMPLETED-ISSUES/KNOWLEDGE-UPDATE and ADRs if I change behavior or make decisions.
- [ ] I will produce exact diffs and runnable tests.
- [ ] I will run linter (`yarn biome check .`) and typecheck (`yarn typecheck`) before committing.

---

## EXECUTION RULES

### **General:**
- If a referenced doc is unavailable, proceed using best assumptions consistent with INDEX.md and EXECUTION-CHECKLIST.md; call out assumptions at top of output.
- Prefer minimal, reversible changes; feature-flag risky paths.
- Keep seed data deterministic; prefer small, fixed fixtures.
- Use our branch/commit/PR conventions from ISSUE-PR-WORKFLOW.md.

### **Code Quality:**
- TypeScript strict mode; no `any` without justification
- Biome formatting/linting must pass
- Follow conventional commits: `type(scope): description`
- Use Zod for all API validation
- Normalize database types at API boundaries (Date→ms, DECIMAL→number)

### **Testing:**
- E2E tests wait on `/api/readiness` endpoint
- Use `data-testid` for stable selectors
- Avoid `networkidle` (use `domcontentloaded` + `waitForResponse`)
- Deterministic seeds (fixed timestamps, IDs)

### **CI/CD:**
- Every job needs Yarn 4 setup: `corepack enable` + `corepack prepare yarn@4.3.1 --activate`
- Cache `.yarn/cache` with lockfile hash
- Run `yarn install --immutable`
- Verify Yarn version: `test "$(yarn -v)" = "4.3.1"`

### **Database:**
- PostgreSQL-only (port 5433 for local Docker)
- All schema changes via `db:push` (no migrations during hackathon)
- Idempotent seeds (check before inserting)

---

## OUTPUT FORMAT (STRICT)

Provide output in this exact order:

### **1. Assumptions** *(only if docs missing or ambiguous)*
- List any assumptions made due to missing context
- Cite which docs you consulted

### **2. Impact Summary** *(what changes and why)*
- 3–5 bullets summarizing the change
- Include affected areas (web, mobile, API, DB, CI)

### **3. Diff Plan** *(file-by-file code blocks ready to paste)*
```typescript
// File: apps/web/src/app/api/example/route.ts
// Action: Add new endpoint

export async function GET(req: Request) {
  // ... implementation
}
```

### **4. Tests** *(new/updated files with code blocks)*
```typescript
// File: apps/web/tests/e2e/example.spec.ts
// Action: Add E2E test

test("should...", async ({ page }) => {
  // ... test implementation
});
```

### **5. CI/Workflow changes** *(if any)*
```yaml
# File: .github/workflows/ci.yml
# Action: Update job

- name: New step
  run: yarn example:command
```

### **6. Docs (PRIVATE) updates**
- **EXECUTION-CHECKLIST.md**: Add entry in Section X
- **COMPLETED-ISSUES-SUMMARY.md**: Add to P1/P2 list
- **KNOWLEDGE-UPDATE-SUMMARY.md**: Log change
- List the exact lines/sections to append/modify

### **7. PR Body (PUBLIC, judge-safe)**
```md
## Context
Brief, plain-English summary of what this PR does.

Closes #123

## Changes
- Bullet point summary of what changed

## Testing
- [ ] All acceptance criteria met
- [ ] Local testing completed
- [ ] Linter passes
- [ ] Build succeeds

## Screenshots / Demo
_Add screenshots here_

## Risks / Rollback
What could break? How to revert if needed?
```

### **8. Error Handling (CI FAILURES)**
**IF BUILD OR CI FAILS:**
1. ⏸️ **STOP** all work immediately
2. 🔄 **Switch** to failing branch: `git switch <failing-branch>`
3. 🔍 **Analyze** error carefully (read full error output)
4. 🔧 **Fix** the issue locally
5. ✅ **Test build:** `yarn workspace @gotmusic/web build`
6. ✅ **Test lint:** `yarn biome check .`
7. ✅ **Test typecheck:** `yarn typecheck`
8. ⬆️ **Commit & push** fix
9. ⏰ **Wait** for CI to pass (check GitHub Actions)
10. ✅ **Then continue** with next issue

**NEVER:**
- ❌ Move to next issue while previous PR has failing CI
- ❌ Ignore build errors
- ❌ Push without local verification
- ❌ Create new PR that depends on failing PR

**Before starting any new issue:**
- Check if previous PR has CI failures
- If yes: fix first, then proceed

---

### **9. Manual CI Monitoring (SEQUENTIAL)**
After PR is created, monitor CI manually:
```bash
# Get PR number
PR_NUM=$(gh pr list --head $(git branch --show-current) --json number --jq '.[0].number')

echo "✅ PR #${PR_NUM} created - Monitor CI manually"
echo "   View: https://github.com/GotMusic/gotmusic/pull/${PR_NUM}"
echo "   Wait for all checks to pass before merging"
```

**Manual monitoring:**
- Check CI status regularly
- Wait for all checks to show "SUCCESS"
- Only merge when everything is green
- No background automation

---

### **10. Next Issue (AFTER CI COMPLETES)**

**Before starting:** Check that previous PR is fully merged and CI is clean:
```bash
# Verify previous PR is merged
gh pr list --state merged --limit 1

# Check main branch is clean
git switch main && git pull origin main
```

**Only start next issue after:**
- Previous PR is fully merged
- All CI checks passed
- Main branch is up to date
- No failing CI runs

**Then start next issue:**
- **Read:** `/tmp/open-issues-summary.md` (prioritized issue list)
- **Identify:** Highest priority (P0/P1) issue that's not in-progress
- **Provide:** Copy-paste command for next issue:
```
Read docs.d/AGENT-START.md and follow it verbatim.

ISSUE: #<number>
GOAL: <one sentence from issue>

BEGIN.
```

**Say:** "PR #X merged ✅! All checks passed. Starting Issue #Y."

---

## SEQUENTIAL WORKFLOW ENABLED

**The workflow is now:**
1. Create PR → Monitor CI manually
2. **WAIT** for all CI checks to pass
3. Merge when green
4. Sync main branch
5. **THEN** start next issue
6. Repeat sequentially

**Result:**
- ✅ No merge conflicts
- ✅ Clean git history
- ✅ Reliable CI passes
- ✅ Predictable workflow
- ✅ One issue at a time

---

## PROHIBITED

**Never do these:**
- ❌ Quoting private docs verbatim into public surfaces
- ❌ Hand-wavy steps ("update CI") without exact YAML/code
- ❌ Introducing SQLite paths or bypassing validation
- ❌ Changing Yarn/Node versions ad hoc
- ❌ Using `networkidle` in E2E tests
- ❌ Skipping CI checks or merging with failing tests
- ❌ Creating PRs without `Closes #X` keyword
- ❌ Committing without conventional commit format

---

## EXAMPLE PROMPT FILL

### **Minimal (90% of cases):**

```
Read docs.d/AGENT-START.md and follow it verbatim.

ISSUE: #122
GOAL: Add server pagination + filters to /admin/assets table

BEGIN.
```

### **With extra context (10% of cases):**

```
Read docs.d/AGENT-START.md and follow it verbatim.

ISSUE: #122
GOAL: Add server pagination + filters to /admin/assets table
CONTEXT: ARCH-DATA-MODEL, TEST-E2E
NON-GOALS: Storybook polish, mobile parity

BEGIN.
```

---

## TIPS FOR EFFECTIVE USE

### **Starting a new chat:**
1. Paste this entire file
2. Fill in the TASK section with your specific goal/issue/context
3. Send and let the agent confirm checkpoints
4. Review the output and approve/iterate

### **Mid-session updates:**
- Reference doc IDs when asking questions (e.g., "Check TEST-E2E for the pattern")
- Ask for specific sections if output is long (e.g., "Show me just the tests")

### **Quality control:**
- Always review the "Docs (PRIVATE) updates" section to ensure knowledge is logged
- Verify CI changes are complete (not just "update CI")
- Check that public PR body has no private doc content

---

## QUICK REFERENCE

| Topic | Read This |
|-------|-----------|
| **Start new task** | INDEX.md → EXECUTION-CHECKLIST.md → ISSUE-PR-WORKFLOW.md |
| **Architecture/DB** | ARCH-OVERVIEW, ARCH-DATA-MODEL, ADR-0003 |
| **Testing/CI** | TEST-E2E, EXECUTION-CHECKLIST (Section 8) |
| **API changes** | ARCH-DATA-MODEL, API integration tests pattern |
| **Design system** | DS-README, DS-TOKENS, DS-WEB/DS-MOBILE |
| **Payments/blockchain** | INT-EAS, INT-LIT, PAY-PYUSD, ADR-0001 |

---

**Last updated:** 2025-10-15 (Documentation refactor - AGENT-START kickoff brief)

