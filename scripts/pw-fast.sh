#!/usr/bin/env bash
set -euo pipefail
cd apps/web
PW_PORT="${PW_PORT:-4123}"
PW_BASE_URL="${PW_BASE_URL:-http://127.0.0.1:$PW_PORT}"
TAGS="${1:-@public}"

PW_BASE_URL="$PW_BASE_URL" yarn playwright test -g "$TAGS" --workers=1 --reporter=list
