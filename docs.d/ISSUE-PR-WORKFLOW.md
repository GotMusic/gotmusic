---
id: ISSUE-PR-WORKFLOW
status: Active
owner: @grantedwards
updated: 2025-10-15
docType: guide
---

# Issue & PR Workflow Guide

## 📋 GitHub Numbering System

**Key Concept:** Issues and Pull Requests share the same sequential counter.

```
#1  → Could be an Issue OR a PR
#2  → Could be an Issue OR a PR
#3  → Could be an Issue OR a PR
...and so on
```

**What DOESN'T use this numbering:**
- ❌ Milestones (separate IDs)
- ❌ Projects (separate IDs)
- ❌ Discussions (separate numbering)
- ❌ Releases (use version tags)

---

## 📝 Creating Issues (Using Templates)

GotMusic uses structured issue templates to ensure consistency. **Never create blank issues.**

### **Available Templates:**

1. **✨ Feature Request** (`.github/ISSUE_TEMPLATE/feature_request.yml`)
   - Use for: New capabilities, improvements, user-facing features
   - Auto-labels: `feature`
   - Fields: Title, Problem/User Story, Proposal, Acceptance Criteria, Scope, Notes

2. **🧩 Task** (`.github/ISSUE_TEMPLATE/task.yml`)
   - Use for: Engineering tasks, refactors, CI improvements, infrastructure
   - Auto-labels: `task`
   - Fields: Area, Task Description, Done When, Size (XS/S/M/L)

3. **🐞 Bug Report** (`.github/ISSUE_TEMPLATE/bug_report.yml`)
   - Use for: Something isn't working correctly
   - Auto-labels: `bug`, `needs-triage`
   - Fields: Pre-flight checks, Area, What Happened, Repro Steps, Environment, Impact, Logs

### **How to Create an Issue:**

**Using GitHub Web:**
```
1. Go to https://github.com/GotMusic/gotmusic/issues/new/choose
2. Select appropriate template
3. Fill out all required fields
4. Add labels (type:*, area:*, priority:*, size:*)
5. Assign to milestone if applicable
6. Create issue → Note the issue number (e.g., #16)
```

**Using GitHub CLI:**
```bash
# Create a feature issue
gh issue create \
  --title "feat(ui-kit): extract Button + Card to shared package" \
  --body "## Problem
We're duplicating Button and Card across apps.

## Proposal  
Create @gotmusic/ui package with shared components.

## Acceptance Criteria
- [ ] Package builds and exports components
- [ ] Web imports from @gotmusic/ui
- [ ] Storybook stories added
- [ ] Uses design tokens only" \
  --label "type:feature,area:ui-kit,priority:P1,size:S" \
  --milestone "This Week: Admin + UI Kit"

# Create a task issue
gh issue create \
  --title "task(tokens): import SD outputs in web + mobile" \
  --body "Import Style Dictionary build outputs.

Done when:
- [ ] Web imports tokens.css
- [ ] Mobile extends NativeWind theme
- [ ] Parity script passes" \
  --label "type:task,area:tokens,priority:P1,size:S"

# Create a bug report
gh issue create \
  --title "fix(web): upload button not enabling after file selection" \
  --body "## What Happened
Upload button stays disabled after selecting a file.

## Steps to Reproduce
1. yarn workspace @gotmusic/web dev
2. Visit /admin/uploads
3. Select audio file
4. Button remains disabled

## Expected
Button should enable after file selection." \
  --label "type:bug,area:admin,priority:P1"
```

### **Issue Labeling Convention:**

Always add these label categories:

| Category | Options | Required? |
|----------|---------|-----------|
| **Type** | `type:feature`, `type:task`, `type:bug`, `type:test`, `type:docs` | ✅ Yes |
| **Area** | `area:admin`, `area:ui-kit`, `area:tokens`, `area:mobile`, `area:web`, `area:testing` | ✅ Yes |
| **Priority** | `priority:P0` (critical), `priority:P1` (high), `priority:P2` (normal), `priority:P3` (low) | ✅ Yes |
| **Size** | `size:XS`, `size:S`, `size:M`, `size:L`, `size:XL` | ✅ Yes |

**Example Issue with Labels:**
```
Issue #12
Title: feat(ui-kit): extract Button + Card to @gotmusic/ui
Labels: type:feature, area:ui-kit, priority:P1, size:S
Milestone: This Week: Admin + UI Kit
```

---

## 🔄 Complete Workflow (Start to Finish)

### **Step 1: Understand the Issue**

```bash
# View issue details
gh issue view 12

# List all open issues in a milestone
gh issue list --milestone "This Week: Admin + UI Kit"
```

### **Step 2: Create Properly-Named Branch**

**Format:** `type/scope/description-ISSUE`

```bash
# Make sure you're on main and up-to-date
git checkout main
git pull

# Create feature branch with issue number
git checkout -b feat/ui-kit/extract-button-card-12
```

**Branch Type Prefixes:**
- `feat/` - New features
- `fix/` - Bug fixes
- `task/` - Chores, refactors, maintenance
- `test/` - Test additions
- `docs/` - Documentation updates
- `chore/` - Build, CI, tooling changes

### **Step 3: Do Your Work**

```bash
# Make changes...
# Test locally: yarn dev, yarn typecheck, yarn biome check .

# Stage changes
git add -A

# Commit with conventional commit format
git commit --no-gpg-sign -m "feat(ui-kit): extract Button and Card to @gotmusic/ui

- Create packages/ui with Button and Card components
- Export components from @gotmusic/ui
- Replace imports in apps/web
- Add Storybook stories for both components
- Use design tokens (no hard-coded colors)

Relates to #12"
```

**Commit Message Format:**
```
type(scope): short description (max 72 chars)

- Bullet point details
- Keep bullets focused
- List major changes

Relates to #12
```

**Commit Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting (no code change)
- `refactor` - Code restructure
- `perf` - Performance improvement
- `test` - Adding tests
- `build` - Build system changes
- `ci` - CI configuration
- `chore` - Maintenance
- `revert` - Revert previous commit

### **Step 4: Push Branch**

```bash
# Push with upstream tracking
git push -u origin feat/ui-kit/extract-button-card-12
```

### **Step 5: Create PR with Proper Keywords**

**CRITICAL:** Use closing keywords to auto-link and auto-close issues.

#### **Best Practice: Use Files for Complex PR Bodies**

For PR bodies with code blocks, backticks, variables ($), curly braces ({}), or emoji, **write to a file** to avoid shell escaping issues.

```bash
# Write PR body to file (avoids all shell escaping problems)
cat > /tmp/pr-body-12.md << 'EOF'
## Context
This PR extracts Button and Card components into a shared @gotmusic/ui package.

Closes #12

## Changes
- ✅ Created `packages/ui` with Button and Card components
- ✅ Added TypeScript exports and package.json
- ✅ Replaced all imports in `apps/web` to use `@gotmusic/ui`
- ✅ Added Storybook stories for both components
- ✅ All styling uses design tokens (no hard-coded colors)

## Testing
- [x] All acceptance criteria from Issue #12 met
- [x] Storybook renders Button and Card stories
- [x] Web app imports and renders correctly
- [x] TypeScript builds without errors
- [x] Linter passes
- [x] No hard-coded colors (tokens only)

## Testing Instructions
```bash
yarn workspace @gotmusic/web storybook
# Navigate to Button and Card stories
# Verify all variants render correctly
```

## Screenshots
_Screenshots of Storybook here_

## Risks / Rollback
Low risk. Can revert by removing package and restoring local components.

All checks passing ✅ Ready to merge.
EOF

# Create PR using the file
gh pr create \
  --title "feat(ui-kit): extract Button + Card to @gotmusic/ui" \
  --body-file /tmp/pr-body-12.md
```

**When to use `--body-file`:**
- ✅ Code blocks (triple backticks)
- ✅ Inline code with backticks
- ✅ Variables or curly braces ($var, {})
- ✅ Emoji or unicode (✅, 🎉, etc.)
- ✅ Multi-line formatting
- ✅ **Always for PR closing comments** (they have emoji)

**When inline `--body` is OK:**
- Simple, single-line descriptions
- No special characters
- Plain text only

---

## 🔗 Linking Keywords

### **Auto-Close Keywords** ✅

These will **automatically close** the issue when the PR is merged:

| Keyword | Example | Use Case |
|---------|---------|----------|
| `Closes` | `Closes #12` | Fully resolves the issue |
| `Fixes` | `Fixes #12` | Bug fixes |
| `Resolves` | `Resolves #12` | General resolution |

**Multiple Issues:**
```markdown
Closes #12
Closes #13
```

### **Reference-Only Keywords** ℹ️

These will **link but NOT auto-close**:

| Keyword | Example | When to Use |
|---------|---------|-------------|
| `Relates to` | `Relates to #12` | Related work |
| `Part of` | `Part of #12` | Partial implementation |
| `Addresses` | `Addresses #12` | Partial fix |
| `See` | `See #12` | Reference for context |

### **What DOESN'T Work** ❌

These will NOT create links or auto-close:
- ❌ `Linked_Issues: #12`
- ❌ `Issue: #12`
- ❌ `Related: #12`
- ❌ `#12` (without keyword)

---

## ✅ PR Checklist

Before creating a PR, verify:

- [ ] **Branch name** follows format: `type/scope/description-ISSUE`
- [ ] **Commits** use conventional format
- [ ] **PR title** follows format: `type(scope): description`
- [ ] **PR body** includes `Closes #X` keyword
- [ ] **All acceptance criteria** from issue are met
- [ ] **Tests pass**: `yarn biome check . && yarn typecheck && yarn build`
- [ ] **Documentation updated** if behavior changed
- [ ] **Screenshots** included for UI changes
- [ ] **No secrets** in code or PR text

---

## 🎯 After PR is Merged

**Automatically happens:**
- ✅ Issue closes (if you used `Closes #X`)
- ✅ PR merged into main
- ✅ Milestone progress updates

**Manual cleanup:**
```bash
# Switch to main and update
git checkout main
git pull

# Delete local branch (optional)
git branch -D feat/ui-kit/extract-button-card-12

# Remote branch is usually auto-deleted by GitHub
```

---

## 📝 Manual Issue Closing

If a PR was merged without `Closes #X`, close manually:

```bash
gh issue close 12 --comment "✅ Completed in PR #16

This issue was fully addressed by the merged PR which added:
- Bullet point 1
- Bullet point 2

All acceptance criteria met. 🎉"
```

---

## 🚨 Common Mistakes

### ❌ **Mistake 1: Wrong keyword format**
```markdown
Linked_Issues: #12 #13 #14
```
**Problem:** GitHub doesn't recognize this format.

**Fix:** ✅
```markdown
Closes #12
Closes #13
Closes #14
```

### ❌ **Mistake 2: No issue link**
PR body doesn't mention the issue at all.

**Fix:** ✅ Always reference the issue with proper keyword.

### ❌ **Mistake 3: Wrong branch name**
```bash
feat/new-ui-components
```
**Problem:** No issue number for traceability.

**Fix:** ✅
```bash
feat/ui-kit/extract-button-card-12
```

### ❌ **Mistake 4: Forgetting to push upstream**
```bash
git push  # ❌ Won't track properly
```

**Fix:** ✅
```bash
git push -u origin feat/ui-kit/extract-button-card-12
```

---

## 📊 Viewing Progress

```bash
# List all issues in a milestone
gh issue list --milestone "This Week: Admin + UI Kit"

# View specific issue
gh issue view 12

# View specific PR
gh pr view 16

# Check which PRs are linked to an issue
gh issue view 12 --json body,comments
```

---

## 🔄 Example End-to-End

```bash
# 1. Check issue
gh issue view 12

# 2. Create branch
git checkout main && git pull
git checkout -b feat/ui-kit/extract-button-card-12

# 3. Do work
# ... make changes ...

# 4. Commit
git add -A
git commit --no-gpg-sign -m "feat(ui-kit): extract Button and Card to @gotmusic/ui

- Create packages/ui package
- Add Button and Card components
- Update web imports
- Add Storybook stories

Relates to #12"

# 5. Push
git push -u origin feat/ui-kit/extract-button-card-12

# 6. Create PR
gh pr create --title "feat(ui-kit): extract Button + Card to @gotmusic/ui" --body "Closes #12
..."

# 7. After merge - cleanup
git checkout main && git pull
git branch -D feat/ui-kit/extract-button-card-12
```

---

## 📚 Additional Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Linking Issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)
- [GitHub CLI](https://cli.github.com/manual/)

