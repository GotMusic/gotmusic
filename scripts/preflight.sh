#!/usr/bin/env bash
set -euo pipefail

# 0) Env
export NEXT_TELEMETRY_DISABLED=1
export NEXT_TURBOPACK=0
export PW_PORT="${PW_PORT:-4123}"
export PW_BASE_URL="http://127.0.0.1:${PW_PORT}"
export DATABASE_URL="${DATABASE_URL:-postgresql://postgres:postgres@localhost:5432/gotmusic_test}"
export READINESS_REQUIRE_SEED="${READINESS_REQUIRE_SEED:-true}"
export GM_STORAGE_MODE="${GM_STORAGE_MODE:-stub}"

# 1) DB up-to-date (if you use Docker for local DB, start it before this script)
echo "▶️  DB migrate & seed"
( cd apps/web && yarn db:push && yarn db:seed )

# 2) Start server (FAST mode)
echo "▶️  Starting dev server on :${PW_PORT}"
( cd apps/web && yarn dev -p "${PW_PORT}" ) > .preflight-web.log 2>&1 &
SERVER_PID=$!

cleanup() { kill $SERVER_PID 2>/dev/null || true; }
trap cleanup EXIT

# 3) Wait for healthz + readiness
echo "▶️  Waiting for /api/healthz"
for i in {1..60}; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$PW_BASE_URL/api/healthz" || true)
  [ "$code" = "200" ] && break
  sleep 1
done
[ "$code" = "200" ] || { echo "❌ healthz never returned 200"; tail -n 100 apps/web/.preflight-web.log || true; exit 1; }

echo "▶️  Waiting for /api/readiness"
for i in {1..60}; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$PW_BASE_URL/api/readiness" || true)
  [ "$code" = "200" ] && break
  sleep 1
done
[ "$code" = "200" ] || { echo "❌ readiness never returned 200"; tail -n 200 apps/web/.preflight-web.log || true; exit 1; }

# 4) Middleware smoke
echo "▶️  Probing public and protected routes"
curl -s -I "$PW_BASE_URL/catalog" | head -n 1
curl -s -I "$PW_BASE_URL/console" | head -n 1

# 5) One tiny Playwright smoke (fast failure)
echo "▶️  Running Playwright @public smoke"
( cd apps/web && PW_BASE_URL="$PW_BASE_URL" yarn playwright test -g "@public" --workers=1 --timeout=90000 --reporter=list )

echo "✅ Preflight passed"
