#!/usr/bin/env bash
set -euo pipefail

# ====== CONFIG (EDIT PROJECT_NUM) ======
ORG="GotMusic"
REPO="gotmusic"
PROJECT_NUM="REPLACE_WITH_YOUR_PROJECT_NUMBER"  # ⚠️ REQUIRED: Run `gh project list --owner GotMusic` to find your project number
M1_TITLE="VC/CTO Bar (Core)"
M1_DUE="2025-10-21T23:59:59Z"
M2_TITLE="VC/CTO Bar (Polish)"
M2_DUE="2025-10-28T23:59:59Z"
TARGET_TODAY="$(date -u +%F)"
TARGET_TOMORROW="$(date -u -d '+1 day' +%F 2>/dev/null || date -v+1d +%F)"

# ====== helpers ======
ensure_ms () {  # $1: title, $2: due
  local t="$1" d="$2"
  if ! gh api "repos/$ORG/$REPO/milestones" --jq ".[] | select(.title == \"$t\") | .number" 2>/dev/null | grep -q .; then
    gh api "repos/$ORG/$REPO/milestones" -f title="$t" -f due_on="$d" >/dev/null
    echo "✅ Created milestone: $t (due $d)"
  else
    echo "ℹ️  Milestone exists: $t"
  fi
}

add_issue () {  # $1 title, $2 labels CSV, $3 milestone, $4 area, $5 priority, $6 size, $7 targetDate, $8 body
  local TITLE="$1" LABELS="$2" MS="$3" AREA="$4" PRIO="$5" SIZE="$6" TDATE="$7" BODY="$8"

  local URL NUM
  URL=$(gh issue create --repo "$ORG/$REPO" \
    --title "$TITLE" \
    --label "$LABELS" \
    --milestone "$MS" \
    --body "$BODY" 2>&1)
  
  NUM=$(echo "$URL" | grep -oE '[0-9]+$')

  if [ "$PROJECT_NUM" != "REPLACE_WITH_YOUR_PROJECT_NUMBER" ]; then
    local ITEM_ID
    ITEM_ID=$(gh project item-add "$PROJECT_NUM" --owner "$ORG" \
                --url "https://github.com/$ORG/$REPO/issues/$NUM" 2>&1 | grep -oE 'ProjectV2Item[^"]*' || echo "")

    if [ -n "$ITEM_ID" ]; then
      # Fill project fields
      gh project item-edit --owner "$ORG" --number "$PROJECT_NUM" --id "$ITEM_ID" --field "Status" --value "Todo" 2>/dev/null || true
      gh project item-edit --owner "$ORG" --number "$PROJECT_NUM" --id "$ITEM_ID" --field "Area"   --value "$AREA"  2>/dev/null || true
      gh project item-edit --owner "$ORG" --number "$PROJECT_NUM" --id "$ITEM_ID" --field "Priority" --value "$PRIO" 2>/dev/null || true
      gh project item-edit --owner "$ORG" --number "$PROJECT_NUM" --id "$ITEM_ID" --field "Size"   --value "$SIZE"  2>/dev/null || true
      gh project item-edit --owner "$ORG" --number "$PROJECT_NUM" --id "$ITEM_ID" --field "Target Date" --value "$TDATE" 2>/dev/null || true
    fi
  fi

  printf "✅ #%-3s %s\n" "$NUM" "$TITLE"
}

echo "🚀 Creating 50 issues for GotMusic..."
echo ""

echo "📅 Ensuring milestones…"
ensure_ms "$M1_TITLE" "$M1_DUE"
ensure_ms "$M2_TITLE" "$M2_DUE"
echo ""

if [ "$PROJECT_NUM" = "REPLACE_WITH_YOUR_PROJECT_NUMBER" ]; then
  echo "⚠️  WARNING: PROJECT_NUM not set. Issues will be created but NOT added to project board."
  echo "   To fix: Edit this script and set PROJECT_NUM (run 'gh project list --owner GotMusic' to find it)"
  echo ""
fi

echo "📝 Creating issues and adding to project…"
echo ""

# ====== EPIC A — API/DB & Data Model (8) ======
echo "🔷 EPIC A — API/DB & Data Model"

add_issue "task(api): normalize API routes naming (/api/upload/sign)" \
"type:task,area:api,priority:P1,size:S" "$M1_TITLE" "api" "P1" "S" "$TARGET_TODAY" \
"## Context
Rename sign-upload folder to upload/sign for consistency.

## Acceptance
- [ ] sign-upload → upload/sign
- [ ] All imports updated
- [ ] E2E tests pass"

add_issue "feature(api): GET /api/assets with pagination & filters" \
"type:feature,area:api,priority:P1,size:M" "$M1_TITLE" "api" "P1" "M" "$TARGET_TODAY" \
"## Context
List assets with pagination and filtering support.

## Acceptance
- [ ] Support ?cursor=&limit=&q=&status=
- [ ] Return {items, nextCursor}
- [ ] Include X-Total-Count header
- [ ] 200 response with proper typing"

add_issue "feature(api): GET /api/assets/:id" \
"type:feature,area:api,priority:P1,size:S" "$M1_TITLE" "api" "P1" "S" "$TARGET_TODAY" \
"## Context
Fetch single asset by ID.

## Acceptance
- [ ] Fetch by id
- [ ] 404 if missing
- [ ] Zod-validated response"

add_issue "feature(api): PATCH /api/assets/:id (zod + idempotency)" \
"type:feature,area:api,priority:P1,size:M" "$M1_TITLE" "api" "P1" "M" "$TARGET_TODAY" \
"## Context
Update asset fields with validation and idempotency.

## Acceptance
- [ ] Fields: title, price, status
- [ ] Require Idempotency-Key header
- [ ] 422 on validation errors
- [ ] Zod schema validation"

add_issue "feature(api): asset audit log (append-only)" \
"type:feature,area:api,priority:P1,size:M" "$M1_TITLE" "api" "P1" "M" "$TARGET_TOMORROW" \
"## Context
Track all asset changes for audit trail.

## Acceptance
- [ ] Table asset_audit (who, when, op, before, after)
- [ ] PATCH writes audit entry
- [ ] GET /api/assets/:id/audit endpoint
- [ ] Append-only constraint"

add_issue "feature(data): ULID IDs + updatedAt auto" \
"type:feature,area:api,priority:P2,size:S" "$M2_TITLE" "api" "P2" "S" "$TARGET_TOMORROW" \
"## Context
Use ULIDs for better sortability and time-awareness.

## Acceptance
- [ ] ULID generation for new assets
- [ ] updatedAt auto-updated on write
- [ ] Migration script provided"

add_issue "feature(data): Postgres client side-by-side (env switch)" \
"type:feature,area:api,priority:P1,size:M" "$M1_TITLE" "api" "P1" "M" "$TARGET_TOMORROW" \
"## Context
Support Postgres alongside SQLite for production readiness.

## Acceptance
- [ ] Drizzle pg client
- [ ] DB_DRIVER=sqlite|pg env var
- [ ] Seed script works on both
- [ ] List/edit operations pass on pg"

add_issue "task(api): OpenAPI 3 from zod + /api/docs (dev)" \
"type:task,area:api,priority:P1,size:M" "$M1_TITLE" "api" "P1" "M" "$TARGET_TOMORROW" \
"## Context
Generate API documentation from Zod schemas.

## Acceptance
- [ ] openapi.json generated from schemas
- [ ] /api/docs serves Swagger UI (dev only)
- [ ] All endpoints documented"

echo ""

# ====== EPIC B — Storage, Previews & CDN (6) ======
echo "🔷 EPIC B — Storage, Previews & CDN"

add_issue "feature(storage): signer returns {url,key,contentType}" \
"type:feature,area:storage,priority:P1,size:S" "$M1_TITLE" "storage" "P1" "S" "$TARGET_TODAY" \
"## Context
Enhance signed URL response with content type.

## Acceptance
- [ ] PUT from UI works
- [ ] Content-Type header respected
- [ ] E2E upload test passes"

add_issue "feature(storage): /api/upload/notify writes asset_files + processing" \
"type:feature,area:storage,priority:P1,size:S" "$M1_TITLE" "storage" "P1" "S" "$TARGET_TODAY" \
"## Context
Track uploaded files and set processing status.

## Acceptance
- [ ] Insert asset_files row (original)
- [ ] Set asset.status = processing
- [ ] Admin table shows processing status < 2s"

add_issue "feature(storage): preview generator stub + waveform placeholder" \
"type:feature,area:storage,priority:P2,size:M" "$M2_TITLE" "storage" "P2" "M" "$TARGET_TOMORROW" \
"## Context
Generate 30s preview audio files.

## Acceptance
- [ ] 30s mp3 preview created
- [ ] asset_files row for preview
- [ ] Status flips to ready after generation"

add_issue "task(storage): CDN public URL helper (STORAGE_PUBLIC_BASE)" \
"type:task,area:storage,priority:P2,size:S" "$M2_TITLE" "storage" "P2" "S" "$TARGET_TOMORROW" \
"## Context
Helper function for public CDN URLs.

## Acceptance
- [ ] Compute URL from storage key
- [ ] UI uses helper exclusively
- [ ] Env var STORAGE_PUBLIC_BASE supported"

add_issue "task(storage): rate-limit /api/upload/sign" \
"type:task,area:storage,priority:P2,size:S" "$M2_TITLE" "storage" "P2" "S" "$TARGET_TOMORROW" \
"## Context
Prevent abuse of upload signing endpoint.

## Acceptance
- [ ] IP-based window (30/min)
- [ ] 429 with Retry-After header
- [ ] Test verifies rate limit"

add_issue "task(storage): size/type validation on sign" \
"type:task,area:storage,priority:P2,size:S" "$M2_TITLE" "storage" "P2" "S" "$TARGET_TOMORROW" \
"## Context
Validate upload size and file type before signing.

## Acceptance
- [ ] Reject files >100MB
- [ ] Reject non-audio MIME types
- [ ] 400 with clear error message"

echo ""

# ====== EPIC C — Web App UX (7) ======
echo "🔷 EPIC C — Web App UX (Next + TanStack Query)"

add_issue "feature(web): TanStack Query provider + devtools" \
"type:feature,area:web,priority:P1,size:S" "$M1_TITLE" "web" "P1" "S" "$TARGET_TODAY" \
"## Context
Set up TanStack Query for data fetching.

## Acceptance
- [ ] Provider in layout.tsx
- [ ] staleTime default = 30s
- [ ] Devtools enabled in dev only"

add_issue "feature(web): useAssets()/useAsset(id) (typed hooks)" \
"type:feature,area:web,priority:P1,size:S" "$M1_TITLE" "web" "P1" "S" "$TARGET_TODAY" \
"## Context
Type-safe hooks for asset queries.

## Acceptance
- [ ] Hooks in packages/api
- [ ] Zero 'any' types
- [ ] Zod-validated responses
- [ ] Proper TypeScript inference"

add_issue "feature(admin): assets index uses API + sort + status chips" \
"type:feature,area:admin,priority:P1,size:S" "$M1_TITLE" "admin" "P1" "S" "$TARGET_TOMORROW" \
"## Context
Admin table fetches from real API.

## Acceptance
- [ ] Fetch from /api/assets
- [ ] Sort by updatedAt
- [ ] Status chips use token colors
- [ ] Loading/error states"

add_issue "feature(admin): asset detail form (edit + optimistic)" \
"type:feature,area:admin,priority:P1,size:M" "$M1_TITLE" "admin" "P1" "M" "$TARGET_TOMORROW" \
"## Context
Editable asset detail form with optimistic updates.

## Acceptance
- [ ] Controlled inputs (title, price, status)
- [ ] Optimistic UI update
- [ ] Toast + rollback on server error
- [ ] Form validation"

add_issue "feature(web): catalog uses API + skeleton + errors" \
"type:feature,area:web,priority:P1,size:M" "$M1_TITLE" "web" "P1" "M" "$TARGET_TOMORROW" \
"## Context
Public catalog page with proper loading states.

## Acceptance
- [ ] / page fetches from /api/assets
- [ ] Skeleton loading states
- [ ] Error boundary with retry
- [ ] Toast on network failure"

add_issue "task(web): Intl currency + locale" \
"type:task,area:web,priority:P2,size:S" "$M2_TITLE" "web" "P2" "S" "$TARGET_TOMORROW" \
"## Context
Format prices using browser Intl API.

## Acceptance
- [ ] Prices via Intl.NumberFormat
- [ ] Locale from navigator.language
- [ ] Test verifies formatting"

add_issue "task(web): accessibility pass (≥90 a11y)" \
"type:task,area:web,priority:P2,size:S" "$M2_TITLE" "web" "P2" "S" "$TARGET_TOMORROW" \
"## Context
Ensure high accessibility scores.

## Acceptance
- [ ] Lighthouse a11y score ≥ 90
- [ ] Keyboard navigation verified
- [ ] Screen reader tested"

echo ""

# ====== EPIC D — Mobile (5) ======
echo "🔷 EPIC D — Mobile (Expo)"

add_issue "feature(mobile): QueryClient provider + shared hooks" \
"type:feature,area:mobile,priority:P1,size:S" "$M1_TITLE" "mobile" "P1" "S" "$TARGET_TODAY" \
"## Context
Set up TanStack Query in mobile app.

## Acceptance
- [ ] Provider in App.tsx
- [ ] Reuse packages/api hooks
- [ ] Test query works"

add_issue "feature(mobile): Preview screen from API (30s playback)" \
"type:feature,area:mobile,priority:P1,size:M" "$M1_TITLE" "mobile" "P1" "M" "$TARGET_TOMORROW" \
"## Context
Asset preview with audio playback.

## Acceptance
- [ ] List assets from API
- [ ] 30s preview playback
- [ ] Respects device mute/vibrate
- [ ] Loading/error states"

add_issue "feature(mobile): Library screen (owned stub + refresh)" \
"type:feature,area:mobile,priority:P2,size:M" "$M2_TITLE" "mobile" "P2" "M" "$TARGET_TOMORROW" \
"## Context
User library with owned assets.

## Acceptance
- [ ] Display owned assets (mock data)
- [ ] Pull-to-refresh control
- [ ] Empty state UI"

add_issue "task(mobile): MMKV cache persist (flagged)" \
"type:task,area:mobile,priority:P3,size:S" "$M2_TITLE" "mobile" "P3" "S" "$TARGET_TOMORROW" \
"## Context
Persist query cache across app restarts.

## Acceptance
- [ ] MMKV integration
- [ ] Behind feature flag
- [ ] Cache survives restart"

add_issue "task(mobile): deep link gotmusic://asset/<id>" \
"type:task,area:mobile,priority:P3,size:S" "$M2_TITLE" "mobile" "P3" "S" "$TARGET_TOMORROW" \
"## Context
Handle deep links to assets.

## Acceptance
- [ ] gotmusic://asset/<id> works
- [ ] Opens purchases screen
- [ ] Uses expo-linking"

echo ""

# ====== EPIC E — Payments, EAS, Lit (7) ======
echo "🔷 EPIC E — Payments, EAS, Lit"

add_issue "feature(payments): feature flag + local mock" \
"type:feature,area:payments,priority:P1,size:S" "$M1_TITLE" "payments" "P1" "S" "$TARGET_TODAY" \
"## Context
Toggle between real and mock payments.

## Acceptance
- [ ] GM_FEATURE_PAYMENTS env var
- [ ] false = deterministic mock
- [ ] Mock returns consistent results"

add_issue "feature(eas): createLicenseReceipt() mock + test" \
"type:feature,area:attestations,priority:P1,size:M" "$M1_TITLE" "eas" "P1" "M" "$TARGET_TOMORROW" \
"## Context
Mock EAS attestation creation.

## Acceptance
- [ ] Function createLicenseReceipt()
- [ ] Returns UID-like string
- [ ] Unit test passes"

add_issue "feature(lit): ACC wrapper checkLicense(buyer,assetId)" \
"type:feature,area:integrations,priority:P1,size:S" "$M1_TITLE" "lit" "P1" "S" "$TARGET_TOMORROW" \
"## Context
Lit Protocol access control check wrapper.

## Acceptance
- [ ] checkLicense(buyer, assetId) function
- [ ] Returns authorized/unauthorized
- [ ] Typed result interface"

add_issue "feature(web): Receipt UI with EAS UID + explorer link" \
"type:feature,area:web,priority:P1,size:S" "$M1_TITLE" "web" "P1" "S" "$TARGET_TOMORROW" \
"## Context
Show receipt after purchase.

## Acceptance
- [ ] Post-purchase screen shows UID
- [ ] Blockscout link to attestation
- [ ] Copy UID button"

add_issue "feature(web): gated download via Lit with unauthorized UX" \
"type:feature,area:web,priority:P1,size:M" "$M1_TITLE" "web" "P1" "M" "$TARGET_TOMORROW" \
"## Context
Download requires Lit authorization.

## Acceptance
- [ ] Download button triggers ACC check
- [ ] Unauthorized shows clear message
- [ ] Authorized initiates download"

add_issue "task(api): include terms-of-use SHA256 in receipt" \
"type:task,area:api,priority:P2,size:S" "$M2_TITLE" "api" "P2" "S" "$TARGET_TOMORROW" \
"## Context
Include terms hash in attestations.

## Acceptance
- [ ] termsHash field in receipt
- [ ] Computed from terms doc
- [ ] Stored in DB"

add_issue "task(api): idempotent POST /api/purchase" \
"type:task,area:api,priority:P2,size:M" "$M2_TITLE" "api" "P2" "M" "$TARGET_TOMORROW" \
"## Context
Prevent duplicate purchases.

## Acceptance
- [ ] Requires Idempotency-Key header
- [ ] Cached response on replay
- [ ] Test verifies idempotency"

echo ""

# ====== EPIC F — Observability, Security, CI/CD (8) ======
echo "🔷 EPIC F — Observability, Security, CI/CD"

add_issue "feature(obs): request-id middleware + structured logs" \
"type:feature,area:ci,priority:P1,size:S" "$M1_TITLE" "ci" "P1" "S" "$TARGET_TODAY" \
"## Context
Track requests with unique IDs.

## Acceptance
- [ ] reqId per API request
- [ ] JSON structured logs
- [ ] Errors include reqId"

add_issue "feature(obs): /api/healthz (db+storage probes)" \
"type:feature,area:ci,priority:P1,size:S" "$M1_TITLE" "ci" "P1" "S" "$TARGET_TODAY" \
"## Context
Health check endpoint for monitoring.

## Acceptance
- [ ] Check DB connection
- [ ] Check storage connection
- [ ] 200 when healthy, 500 otherwise"

add_issue "feature(obs): Sentry wiring (dsn optional)" \
"type:feature,area:ci,priority:P1,size:S" "$M1_TITLE" "ci" "P1" "S" "$TARGET_TOMORROW" \
"## Context
Error tracking with Sentry.

## Acceptance
- [ ] Sentry init in API
- [ ] Reports when DSN present
- [ ] No-op when DSN missing"

add_issue "task(ci): Storybook build on PR + artifact" \
"type:task,area:ui-kit,priority:P2,size:S" "$M2_TITLE" "ui-kit" "P2" "S" "$TARGET_TOMORROW" \
"## Context
Build Storybook in CI for review.

## Acceptance
- [ ] build-storybook runs in CI
- [ ] Artifact uploaded
- [ ] No build errors"

add_issue "task(ci): secret scanning (gitleaks) enforced" \
"type:task,area:ci,priority:P2,size:S" "$M2_TITLE" "ci" "P2" "S" "$TARGET_TOMORROW" \
"## Context
Scan for leaked secrets.

## Acceptance
- [ ] Gitleaks job in CI
- [ ] Fails on findings
- [ ] Doc override label for emergencies"

add_issue "task(ci): bundle stats report / size-limit warn" \
"type:task,area:web,priority:P3,size:S" "$M2_TITLE" "web" "P3" "S" "$TARGET_TOMORROW" \
"## Context
Monitor bundle size growth.

## Acceptance
- [ ] Build prints bundle stats
- [ ] Warn on >10% growth
- [ ] Report in CI output"

add_issue "task(security): middleware auth gate for /admin/*" \
"type:task,area:web,priority:P1,size:S" "$M1_TITLE" "web" "P1" "S" "$TARGET_TOMORROW" \
"## Context
Protect admin routes.

## Acceptance
- [ ] Basic auth or allowlist (dev)
- [ ] Env-based configuration
- [ ] 401 on unauthorized"

add_issue "task(docs): .env.example + README env table complete" \
"type:task,area:docs,priority:P1,size:S" "$M1_TITLE" "docs" "P1" "S" "$TARGET_TOMORROW" \
"## Context
Document all environment variables.

## Acceptance
- [ ] .env.example has all keys
- [ ] README has env table
- [ ] Descriptions for each var"

echo ""

# ====== EPIC G — Testing & Quality (5) ======
echo "🔷 EPIC G — Testing & Quality"

add_issue "test(web): Playwright mutation path (edit asset saves)" \
"type:test,area:testing,priority:P1,size:S" "$M1_TITLE" "testing" "P1" "S" "$TARGET_TODAY" \
"## Context
E2E test for asset editing.

## Acceptance
- [ ] Edit title in detail form
- [ ] List shows updated value
- [ ] Test passes in CI"

add_issue "test(api): zod contract parse on fixtures" \
"type:test,area:testing,priority:P2,size:S" "$M2_TITLE" "testing" "P2" "S" "$TARGET_TOMORROW" \
"## Context
Validate API contracts with Zod.

## Acceptance
- [ ] JSON fixtures parse against schemas
- [ ] Test runs in CI
- [ ] Fails on schema mismatch"

add_issue "test(web): a11y smoke (axe) on / and /admin/assets" \
"type:test,area:testing,priority:P2,size:S" "$M2_TITLE" "testing" "P2" "S" "$TARGET_TOMORROW" \
"## Context
Automated accessibility testing.

## Acceptance
- [ ] Axe checks on key pages
- [ ] No critical violations
- [ ] Test runs in CI"

add_issue "test(api): rate-limit /api/upload/sign returns 429" \
"type:test,area:testing,priority:P2,size:S" "$M2_TITLE" "testing" "P2" "S" "$TARGET_TOMORROW" \
"## Context
Verify rate limiting works.

## Acceptance
- [ ] Hammer endpoint > limit
- [ ] Expect 429 status
- [ ] Retry-After header present"

add_issue "test(ui-kit): Storybook sanity build" \
"type:test,area:ui-kit,priority:P3,size:S" "$M2_TITLE" "ui-kit" "P3" "S" "$TARGET_TOMORROW" \
"## Context
Ensure stories compile without errors.

## Acceptance
- [ ] Stories build successfully
- [ ] Artifacts generated
- [ ] No TypeScript errors"

echo ""

# ====== EPIC H — Docs, DX & Governance (5) ======
echo "🔷 EPIC H — Docs, DX & Governance"

add_issue "docs: SECURITY.md + ROTATE.md" \
"type:docs,area:docs,priority:P1,size:S" "$M1_TITLE" "docs" "P1" "S" "$TARGET_TODAY" \
"## Context
Document security policies and key rotation.

## Acceptance
- [ ] SECURITY.md with disclosure policy
- [ ] ROTATE.md with rotation steps
- [ ] Committed to repo root"

add_issue "docs: /api/docs link + judge runbook" \
"type:docs,area:docs,priority:P2,size:S" "$M2_TITLE" "docs" "P2" "S" "$TARGET_TOMORROW" \
"## Context
Documentation for judges.

## Acceptance
- [ ] README links to /api/docs
- [ ] Judge runbook section
- [ ] Screenshots included"

add_issue "chore: tool guards (Yarn only)" \
"type:chore,area:tooling,priority:P3,size:S" "$M2_TITLE" "tooling" "P3" "S" "$TARGET_TOMORROW" \
"## Context
Prevent use of wrong package manager.

## Acceptance
- [ ] Warn on pnpm/npm use
- [ ] CI checks for yarn.lock
- [ ] Postinstall script guard"

add_issue "chore: dependabot monthly + lockfile maintenance" \
"type:chore,area:ci,priority:P3,size:S" "$M2_TITLE" "ci" "P3" "S" "$TARGET_TOMORROW" \
"## Context
Automated dependency updates.

## Acceptance
- [ ] .github/dependabot.yml added
- [ ] Monthly update schedule
- [ ] Lockfile maintenance enabled"

add_issue "docs: CONTRIBUTING quickstart + PR checklist" \
"type:docs,area:docs,priority:P2,size:S" "$M2_TITLE" "docs" "P2" "S" "$TARGET_TOMORROW" \
"## Context
Guide for contributors.

## Acceptance
- [ ] CONTRIBUTING.md created
- [ ] References issue templates
- [ ] PR checklist included"

echo ""
echo "✅ Done! Created 50 issues across 8 epics."
echo ""
if [ "$PROJECT_NUM" != "REPLACE_WITH_YOUR_PROJECT_NUMBER" ]; then
  echo "📊 Open your Project #$PROJECT_NUM to verify cards & fields."
else
  echo "⚠️  Remember to manually add issues to your project board!"
  echo "   Run: gh project list --owner GotMusic"
  echo "   Then update PROJECT_NUM in this script and re-run."
fi
echo ""
echo "🎯 Milestones created:"
echo "   M1: $M1_TITLE (due $M1_DUE)"
echo "   M2: $M2_TITLE (due $M2_DUE)"

