## Context
Brief, plain-English summary of what this PR does.

Closes #ISSUE_NUMBER

> ⚠️ **Required:** Use `Closes #X`, `Fixes #X`, or `Resolves #X` to auto-close the linked issue when this PR merges.
> For multiple issues: `Closes #11` and `Closes #12` on separate lines.
> See [docs.d/ISSUE-PR-WORKFLOW.md](../docs.d/ISSUE-PR-WORKFLOW.md) for workflow details.

## Changes
- Bullet point summary of what changed
- Keep it concise but informative
- Focus on the "what" not the "how"

## Testing
- [ ] All acceptance criteria from the linked issue are met
- [ ] Local testing completed (describe steps)
- [ ] Linter passes (`yarn biome check .`)
- [ ] Type check passes (`yarn typecheck`)
- [ ] Build succeeds (`yarn build`)

## Screenshots / Demo
_Add screenshots, GIFs, or Loom video links here_

## Risks / Rollback
What could break? How to revert if needed?

## Judge Notes 📝
Anything you want judges to look at (code, screen, detail).

---

**Checklist:**
- [ ] Branch named properly: `type/scope/description-ISSUE` (e.g., `feat/admin/uploads-stub-11`)
- [ ] Commits follow conventional format: `type(scope): description`
- [ ] PR title follows format: `type(scope): description`
- [ ] Used `Closes #X` keyword in description above
- [ ] Updated relevant documentation if behavior changed
- [ ] No secrets or credentials in code or PR description

**Documentation Updates (if applicable):**
- [ ] `EXECUTION-CHECKLIST.md` (if completing P1/P2 issue or changing CI/testing)
- [ ] `INDEX.md` (if changing tech stack, setup, or env vars)
- [ ] `testing/e2e.md` (if adding/modifying E2E tests)
- [ ] `architecture/*.md` (if changing system design or data model)
- [ ] Created/updated ADR (if making architectural decision)
- [ ] `KNOWLEDGE-UPDATE-SUMMARY.md` (logged significant doc changes)
- [ ] `_manifest.yaml` (if adding new docs)

**Doc IDs referenced:** (e.g., `TEST-E2E`, `ADR-0003`, `EXEC-CHECKLIST` or N/A)
_List the doc IDs you consulted or updated for this PR_
