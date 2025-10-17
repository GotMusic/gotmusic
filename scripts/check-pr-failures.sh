#!/bin/bash
# check-pr-failures.sh - Check for any CI failures or issues before starting new work
# Usage: ./check-pr-failures.sh

set -e

HAS_ISSUES=false

# Check for CI failures
FAILURES=$(ls /tmp/pr-*-failure.txt 2>/dev/null || true)
if [ -n "$FAILURES" ]; then
  echo "🚨 CI FAILURES DETECTED:"
  echo ""
  for failure in $FAILURES; do
    cat "$failure"
    echo ""
  done
  HAS_ISSUES=true
fi

# Check for merge conflicts
CONFLICTS=$(ls /tmp/pr-*-conflict.txt 2>/dev/null || true)
if [ -n "$CONFLICTS" ]; then
  echo "⚠️  MERGE CONFLICTS DETECTED:"
  echo ""
  for conflict in $CONFLICTS; do
    cat "$conflict"
    echo ""
  done
  HAS_ISSUES=true
fi

# Check for timeouts
TIMEOUTS=$(ls /tmp/pr-*-timeout.txt 2>/dev/null || true)
if [ -n "$TIMEOUTS" ]; then
  echo "⏰ CI TIMEOUTS DETECTED:"
  echo ""
  for timeout in $TIMEOUTS; do
    cat "$timeout"
    echo ""
  done
  HAS_ISSUES=true
fi

if [ "$HAS_ISSUES" = true ]; then
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "⛔ STOP: Fix the issues above before starting new work!"
  echo ""
  echo "After fixing:"
  echo "  1. Push fixes to the PR branches"
  echo "  2. CI will re-run automatically"
  echo "  3. Clean up markers: rm /tmp/pr-*-{failure,conflict,timeout}.txt"
  echo "  4. Resume normal workflow"
  exit 1
fi

echo "✅ No PR issues detected. Safe to proceed!"
exit 0

