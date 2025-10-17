# Auto-Merge Pattern: Full Automation

## Overview

The agent should **continuously monitor CI status** and auto-merge PRs when all checks pass, enabling **true hands-off parallel development**.

---

## The Pattern

### **After Creating PR:**

```bash
# 1. Create PR
gh pr create --title "..." --body-file /tmp/pr-body.md

# 2. Get PR number
PR_NUM=$(gh pr list --head $(git branch --show-current) --json number --jq '.[0].number')

# 3. Start polling CI status (non-blocking)
# Poll every 30 seconds, max 20 minutes (CI typically takes 5-10 mins)
```

### **Polling Script:**

```bash
#!/bin/bash
# poll-and-merge.sh
PR_NUM=$1
MAX_ATTEMPTS=40  # 40 × 30s = 20 minutes
ATTEMPT=0

echo "⏳ Monitoring PR #${PR_NUM} CI status..."

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
  # Get CI status
  STATUS=$(gh pr view $PR_NUM --json statusCheckRollup --jq '
    .statusCheckRollup | 
    map(select(.conclusion != null)) |
    if length == 0 then "pending"
    elif all(.conclusion == "SUCCESS") then "success"
    elif any(.conclusion == "FAILURE") then "failure"
    else "pending"
    end
  ')
  
  MERGEABLE=$(gh pr view $PR_NUM --json mergeable --jq '.mergeable')
  
  echo "  [Attempt $((ATTEMPT+1))/$MAX_ATTEMPTS] Status: $STATUS, Mergeable: $MERGEABLE"
  
  if [ "$STATUS" = "success" ] && [ "$MERGEABLE" = "MERGEABLE" ]; then
    echo "✅ All checks passed! Merging PR #${PR_NUM}..."
    gh pr merge $PR_NUM --squash --delete-branch
    if [ $? -eq 0 ]; then
      echo "✅ PR #${PR_NUM} merged successfully!"
      exit 0
    else
      echo "❌ Merge failed!"
      exit 1
    fi
  elif [ "$STATUS" = "failure" ]; then
    echo "❌ CI checks failed on PR #${PR_NUM}"
    exit 1
  fi
  
  ATTEMPT=$((ATTEMPT+1))
  sleep 30
done

echo "⏰ Timeout: PR #${PR_NUM} CI did not complete in 20 minutes"
exit 1
```

---

## Agent Workflow Integration

### **Step 7: Push & Auto-Merge (NEW)**

After pushing PR:

```bash
# 1. Create PR
gh pr create --title "feat(scope): description" --body-file /tmp/pr-body.md

# 2. Get PR number
PR_NUM=$(gh pr list --head $(git branch --show-current) --json number --jq '.[0].number')
echo "PR #${PR_NUM} created: https://github.com/GotMusic/gotmusic/pull/${PR_NUM}"

# 3. Start background CI monitor
nohup bash docs.d/workflows/scripts/poll-and-merge.sh $PR_NUM > /tmp/pr-${PR_NUM}-monitor.log 2>&1 &
MONITOR_PID=$!
echo "⏳ CI monitor started (PID: $MONITOR_PID) - will auto-merge when green"

# 4. Return control immediately
echo "✅ PR #${PR_NUM} submitted. Moving to next issue while CI runs in background."
```

### **Step 8: Start Next Issue (IMMEDIATE)**

```bash
# Don't wait for CI! Start next issue immediately:
git switch main && git pull origin main
git switch -c feat/scope/desc-NEXT --no-track origin/main

# CI monitors run in background across all PRs
# Each auto-merges when ready
# Zero wait time!
```

---

## Agent Pattern (Updated)

```
1. PR #X created → Start CI monitor in background
2. IMMEDIATELY start Issue #Y (from main)
3. Work on #Y while #X's CI runs
4. PR #Y created → Start CI monitor in background
5. IMMEDIATELY start Issue #Z (from main)
6. Work on #Z while #X and #Y's CI run
7. ... continue indefinitely

Background monitors:
- PR #X CI passes → Auto-merge → main updated
- PR #Y CI passes → Auto-merge → main updated  
- PR #Z CI passes → Auto-merge → main updated
```

---

## Handling CI Failures

**If CI monitor detects failure:**

```bash
# In poll-and-merge.sh:
if [ "$STATUS" = "failure" ]; then
  echo "❌ CI checks failed on PR #${PR_NUM}" | tee /tmp/pr-${PR_NUM}-failure.txt
  
  # Get failure details
  gh pr checks $PR_NUM --json name,conclusion,detailsUrl \
    --jq '.[] | select(.conclusion == "FAILURE") | "❌ \(.name): \(.detailsUrl)"' \
    >> /tmp/pr-${PR_NUM}-failure.txt
  
  exit 1
fi
```

**Agent checks for failures:**

Before starting each new issue:
```bash
# Check for any CI failures
FAILURES=$(ls /tmp/pr-*-failure.txt 2>/dev/null)
if [ -n "$FAILURES" ]; then
  echo "🚨 STOP: CI failures detected!"
  cat $FAILURES
  echo "Fix failures before proceeding."
  exit 1
fi
```

---

## Benefits

### **Zero Wait Time:**
```
Traditional workflow:
- Create PR #1 → wait 10 mins for CI → merge → start #2
- Create PR #2 → wait 10 mins for CI → merge → start #3
- Total: 20 minutes, 2 issues

Auto-merge workflow:
- Create PR #1 → start #2 → start #3 (all in 2 mins)
- CI runs in parallel in background
- All auto-merge when ready
- Total: ~10 minutes, 3 issues (CI runs in parallel)
```

### **True Parallel Development:**
- Work on Issue #2 while #1's CI runs
- Work on Issue #3 while #1 and #2's CI run
- Work on Issue #4 while #1, #2, #3's CI run
- No blocking, no waiting!

### **Full Automation:**
- No manual "check if CI passed"
- No manual merge commands
- No manual branch cleanup
- Agent + CI monitors = hands-off

---

## Implementation Steps

### **1. Create polling script:**

```bash
# Create script directory
mkdir -p docs.d/workflows/scripts

# Create poll-and-merge.sh
cat > docs.d/workflows/scripts/poll-and-merge.sh << 'EOF'
[script contents from above]
EOF

chmod +x docs.d/workflows/scripts/poll-and-merge.sh
```

### **2. Update AGENT-START.md:**

Add Step 7.5:
```markdown
### **7.5 Start CI Monitor (AUTOMATIC)**

After PR created, start background monitor:
- Polls CI status every 30 seconds
- Auto-merges when all checks pass
- Logs to /tmp/pr-{num}-monitor.log
- Exits with error if CI fails
```

### **3. Update ISSUE-PR-WORKFLOW.md:**

Update Agent Pattern:
```markdown
5. Push & create PR
6. Start CI monitor in background (non-blocking)
7. IMMEDIATELY start next issue (don't wait!)
8. Check for CI failures before starting each issue
```

---

## Edge Cases

### **Merge Conflict After CI Passes:**

```bash
# In poll-and-merge.sh, if merge fails:
if [ $? -ne 0 ]; then
  echo "❌ Merge failed (possible conflict). Requires manual intervention."
  # Could trigger rebase + retry here
fi
```

### **Multiple PRs Ready Simultaneously:**

- Each monitor runs independently
- GitHub handles merge order
- Squash merges are atomic
- Later PRs may need rebase if conflict (rare)

### **Monitor Process Management:**

```bash
# List all running monitors:
ps aux | grep poll-and-merge.sh

# View monitor logs:
tail -f /tmp/pr-*-monitor.log

# Kill all monitors (emergency):
pkill -f poll-and-merge.sh
```

---

## Full Example

```bash
# Issue #200
git switch main && git pull origin main
git switch -c feat/a/feature-200 --no-track origin/main
# ... work on code ...
git add . && git commit -m "feat: implement feature 200"
git push -u origin feat/a/feature-200
gh pr create --title "feat: feature 200" --body "..."
# → Monitor starts in background

# Issue #201 (IMMEDIATELY, don't wait!)
git switch main && git pull origin main
git switch -c feat/b/feature-201 --no-track origin/main
# ... work on code ...
git add . && git commit -m "feat: implement feature 201"
git push -u origin feat/b/feature-201
gh pr create --title "feat: feature 201" --body "..."
# → Another monitor starts in background

# Issue #202 (IMMEDIATELY!)
git switch main && git pull origin main
git switch -c feat/c/feature-202 --no-track origin/main
# ... work on code ...

# Meanwhile, in background:
# ⏳ PR #200 CI running... (monitor polling)
# ⏳ PR #201 CI running... (monitor polling)
# ✅ PR #200 CI passed → Auto-merged!
# ✅ PR #201 CI passed → Auto-merged!
```

**Result: 3 issues in progress, 2 auto-merged, zero manual intervention!** 🚀

---

## Status Dashboard (Optional)

```bash
#!/bin/bash
# pr-dashboard.sh - Show status of all in-flight PRs

echo "📊 PR Dashboard"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Open PRs
gh pr list --json number,title,statusCheckRollup --jq '.[] | 
  "PR #\(.number): \(.title)\n  Checks: \(
    .statusCheckRollup | 
    map(select(.conclusion != null)) |
    if length == 0 then "⏳ Pending"
    elif all(.conclusion == "SUCCESS") then "✅ All passed"
    elif any(.conclusion == "FAILURE") then "❌ Failed"
    else "⏳ In progress"
    end
  )\n"'

# Monitor logs
echo "\n📋 Monitor Logs:"
ls /tmp/pr-*-monitor.log 2>/dev/null | while read log; do
  PR=$(echo $log | grep -oP 'pr-\K[0-9]+')
  STATUS=$(tail -1 $log)
  echo "  PR #${PR}: ${STATUS}"
done

# Failures
FAILURES=$(ls /tmp/pr-*-failure.txt 2>/dev/null)
if [ -n "$FAILURES" ]; then
  echo "\n🚨 Failures:"
  cat $FAILURES
fi
```

---

## Next Steps

1. ✅ Create `poll-and-merge.sh` script
2. ✅ Test with a sample PR
3. ✅ Update agent workflow docs
4. ✅ Add failure detection before starting issues
5. ✅ Document the pattern

**Ready to implement?**

