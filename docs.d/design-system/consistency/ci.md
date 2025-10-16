# CI: Token Parity & Builds

## Checks

### Code Quality
- Build tokens with Style Dictionary; fail if `dist/*` changed but not committed.
- RN Tailwind palette parity script compares values to `native.ts`; fail on mismatch.
- Web Tailwind config must only reference CSS vars for colors/radii.

### Security
- **Secret Scanning (Gitleaks):** Scans all commits for exposed secrets, API keys, tokens, and credentials
  - Runs automatically on every PR and push to main
  - Fails CI if secrets are detected
  - Configuration: `.gitleaks.toml` (allowlists test fixtures and placeholders)
  
### Override Label: `override:hygiene`

**Purpose:** Emergency bypass for CI hygiene checks (secret scanning, label validation, etc.) when absolutely necessary.

**When to use:**
- ✅ Gitleaks false positive that can't be allowlisted easily
- ✅ Time-sensitive hotfix where hygiene checks are blocking
- ✅ Temporary workaround while investigating a check failure

**When NOT to use:**
- ❌ Real secrets in code (remove them instead!)
- ❌ Skipping checks out of convenience
- ❌ Working around legitimate security issues

**How to use:**
```bash
# Add label to PR
gh pr edit 123 --add-label "override:hygiene"

# Remove after merge
gh pr edit 123 --remove-label "override:hygiene"
```

**Warning:** Use of `override:hygiene` should be rare and documented in the PR description. If you find yourself using it often, the underlying check may need adjustment.

## Scripts (planned)
- `tokens:build` — generate web.css + native.ts
- `tokens:check` — verify parity
- `tokens:diff` — show JSON diff for PR review
