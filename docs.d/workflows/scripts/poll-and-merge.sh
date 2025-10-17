#!/bin/bash
# poll-and-merge.sh - Monitor PR CI status and auto-merge when green
# Usage: ./poll-and-merge.sh <PR_NUMBER>

set -e

PR_NUM=$1
MAX_ATTEMPTS=40  # 40 × 30s = 20 minutes
ATTEMPT=0

if [ -z "$PR_NUM" ]; then
  echo "Usage: $0 <PR_NUMBER>"
  exit 1
fi

echo "⏳ Monitoring PR #${PR_NUM} CI status..."
echo "   Max wait: 20 minutes (checks every 30s)"

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
  # Get CI status from all checks
  STATUS=$(gh pr view $PR_NUM --json statusCheckRollup --jq '
    .statusCheckRollup | 
    map(select(.conclusion != null)) |
    if length == 0 then "pending"
    elif all(.conclusion == "SUCCESS") then "success"
    elif any(.conclusion == "FAILURE") then "failure"
    else "pending"
    end
  ')
  
  # Get mergeable state
  MERGEABLE=$(gh pr view $PR_NUM --json mergeable --jq '.mergeable')
  
  # Get check count for progress
  TOTAL_CHECKS=$(gh pr view $PR_NUM --json statusCheckRollup --jq '.statusCheckRollup | length')
  COMPLETED_CHECKS=$(gh pr view $PR_NUM --json statusCheckRollup --jq '[.statusCheckRollup[] | select(.conclusion != null)] | length')
  
  echo "  [$(date +%H:%M:%S)] Attempt $((ATTEMPT+1))/$MAX_ATTEMPTS - Checks: $COMPLETED_CHECKS/$TOTAL_CHECKS complete - Status: $STATUS - Mergeable: $MERGEABLE"
  
  # Check if ready to merge
  if [ "$STATUS" = "success" ] && [ "$MERGEABLE" = "MERGEABLE" ]; then
    echo ""
    echo "✅ All checks passed! Merging PR #${PR_NUM}..."
    
    gh pr merge $PR_NUM --squash --delete-branch
    
    if [ $? -eq 0 ]; then
      echo "✅ PR #${PR_NUM} merged successfully!"
      echo "🎉 Branch deleted, main updated"
      exit 0
    else
      echo "❌ Merge failed! Manual intervention required."
      echo "   PR: https://github.com/GotMusic/gotmusic/pull/${PR_NUM}"
      exit 1
    fi
  fi
  
  # Check for CI failure
  if [ "$STATUS" = "failure" ]; then
    echo ""
    echo "❌ CI checks FAILED on PR #${PR_NUM}"
    echo ""
    echo "Failed checks:"
    gh pr checks $PR_NUM --json name,conclusion,detailsUrl \
      --jq '.[] | select(.conclusion == "FAILURE") | "  ❌ \(.name): \(.detailsUrl)"'
    echo ""
    echo "🛠️  Fix the failures and push updates to re-trigger CI"
    echo "   PR: https://github.com/GotMusic/gotmusic/pull/${PR_NUM}"
    
    # Write failure marker
    echo "PR #${PR_NUM} CI FAILED at $(date)" > /tmp/pr-${PR_NUM}-failure.txt
    gh pr checks $PR_NUM --json name,conclusion,detailsUrl \
      --jq '.[] | select(.conclusion == "FAILURE") | "  ❌ \(.name): \(.detailsUrl)"' \
      >> /tmp/pr-${PR_NUM}-failure.txt
    
    exit 1
  fi
  
  # Check for merge conflicts
  if [ "$MERGEABLE" = "CONFLICTING" ]; then
    echo ""
    echo "⚠️  PR #${PR_NUM} has merge conflicts!"
    echo "   This usually means another PR merged while this was in CI."
    echo "   Need to rebase on latest main and force-push."
    echo ""
    
    # Write conflict marker
    echo "PR #${PR_NUM} has MERGE CONFLICTS at $(date)" > /tmp/pr-${PR_NUM}-conflict.txt
    
    exit 1
  fi
  
  ATTEMPT=$((ATTEMPT+1))
  sleep 30
done

echo ""
echo "⏰ Timeout: PR #${PR_NUM} CI did not complete in 20 minutes"
echo "   Check status manually: https://github.com/GotMusic/gotmusic/pull/${PR_NUM}"
echo ""

# Write timeout marker
echo "PR #${PR_NUM} TIMEOUT at $(date)" > /tmp/pr-${PR_NUM}-timeout.txt

exit 1

