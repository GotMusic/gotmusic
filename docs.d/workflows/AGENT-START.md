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

**⚡ PARALLEL-START WORKFLOW (ZERO WAIT TIME):**
- **KEY INSIGHT:** Start working IMMEDIATELY after PR merges—don't wait for automation (~1 min)
- **SYNC BEFORE PR:** Always sync with latest `main` right before creating PR
- **WORKFLOW:**
  1. **PR merges** → START next issue immediately (don't wait!)
  2. **Create branch:** `git fetch origin && git switch -c feat/scope/desc-198 --no-track origin/main`
  3. **Work locally:** Write code, tests, lint, typecheck (~10 mins)
  4. **Sync before PR:** `git fetch origin && git rebase origin/main` (pulls automation changes)
  5. **Push & create PR:** `git push -u origin feat/scope/desc-198 && gh pr create ...`
- **TIMING:** Your work time (10 mins) overlaps with automation time (1 min) = zero dead time!
- **WHY:** Automation updates (EXECUTION-CHECKLIST.md) happen in background; syncing before PR pulls them in
- **BENEFIT:** Complete more issues per session; no idle waiting; automation always in sync
- **Pattern:** "PR #X merged ✅! Starting Issue #Y immediately (will sync before PR)."

### **5. PARALLEL PR MERGE PROTOCOL (CRITICAL)**
- **SITUATION:** Multiple PRs ready to merge simultaneously
- **STRATEGY:** Merge in chronological order to avoid conflicts
- **EXECUTION:**
  1. **Check PR status:** `gh pr view <number> --json mergeable,mergeStateStatus,statusCheckRollup`
  2. **Verify all checks passed:** All statusCheckRollup items show "SUCCESS"
  3. **Merge older PR first:** `gh pr merge <older-pr> --squash --delete-branch`
  4. **Sync main:** `git switch main && git pull origin main`
  5. **Rebase newer PR:** `git switch <newer-branch> && git rebase main`
  6. **Force-push safely:** `git push --force-with-lease`
  7. **Merge newer PR:** `gh pr merge <newer-pr> --squash --delete-branch`
- **CRITICAL:** Always verify `mergeable: "MERGEABLE"` and `mergeStateStatus: "CLEAN"` before merging
- **SAFETY:** Use `--force-with-lease` to prevent overwriting others' work
- **RESULT:** Clean merge history with no red X failures

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

### **9. Start CI Auto-Monitor (AUTOMATIC)**
After PR is created, start background CI monitor:
```bash
# Get PR number
PR_NUM=$(gh pr list --head $(git branch --show-current) --json number --jq '.[0].number')

# Start background monitor (non-blocking)
nohup bash docs.d/workflows/scripts/poll-and-merge.sh $PR_NUM > /tmp/pr-${PR_NUM}-monitor.log 2>&1 &

echo "✅ PR #${PR_NUM} created - CI monitor started (auto-merge when green)"
echo "   View: https://github.com/GotMusic/gotmusic/pull/${PR_NUM}"
echo "   Log: /tmp/pr-${PR_NUM}-monitor.log"
```

**The monitor will:**
- Poll CI status every 30 seconds
- Auto-merge when all checks pass
- Log failures to `/tmp/pr-{num}-failure.txt`
- Run in background (non-blocking)

---

### **10. Next Issue (IMMEDIATE - DON'T WAIT!)**

**Before starting:** Check for any CI failures:
```bash
bash docs.d/workflows/scripts/check-pr-failures.sh
```

**If clean, start immediately:**
- **Read:** `/tmp/open-issues-summary.md` (prioritized issue list)
- **Identify:** Highest priority (P0/P1) issue that's not in-progress
- **Provide:** Copy-paste command for next issue:
```
Read docs.d/AGENT-START.md and follow it verbatim.

ISSUE: #<number>
GOAL: <one sentence from issue>

BEGIN.
```

**Say:** "PR #X monitor running! Started Issue #Y immediately (zero wait time)."

---

## FULL AUTOMATION ENABLED

**The workflow is now:**
1. Create PR → Start CI monitor in background
2. **IMMEDIATELY** start next issue (don't wait!)
3. Work on next issue while previous PR's CI runs
4. Previous PR auto-merges when CI passes
5. Repeat infinitely

**Result:**
- ✅ Zero wait time between issues
- ✅ True parallel development (work on 5+ issues simultaneously)
- ✅ Auto-merge when CI passes
- ✅ Auto-detection of CI failures
- ✅ Fully hands-off workflow

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

