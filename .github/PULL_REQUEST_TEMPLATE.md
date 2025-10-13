## Context
Brief, plain-English summary of what this PR does.

Closes #ISSUE_NUMBER

> ⚠️ **Required:** Use `Closes #X`, `Fixes #X`, or `Resolves #X` to auto-close the linked issue when this PR merges.
> For multiple issues: `Closes #11` and `Closes #12` on separate lines.
> See [docs.d/BUILDERS-START-HERE.md](../docs.d/BUILDERS-START-HERE.md) for workflow details.

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
