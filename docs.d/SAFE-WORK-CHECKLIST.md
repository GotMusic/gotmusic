# GotMusic - Safe Work Checklist
**Generated:** 2025-10-21  
**Purpose:** Ensure we can work confidently on safer items without getting blocked by E2E issues

---

## 🎯 **CURRENT STATUS VERIFICATION**

### **✅ CI Pipeline Status**
- [ ] **Fast-gate job** is required in branch protection (build + typecheck + lint + @smoke)
- [ ] **E2E studio/auth job** is non-blocking (`continue-on-error: true`)
- [ ] **Concurrency control** prevents CI pileups (`cancel-in-progress: true`)
- [ ] **Artifact uploads** working (Playwright reports + traces, 7-day retention)
- [ ] **Feature flags default OFF** in CI (`GM_FEATURE_* = false`)

### **✅ Repository State**
- [ ] **On main branch** with clean working tree
- [ ] **No stale branches** (all merged/closed PRs cleaned up)
- [ ] **Documentation updated** (EXECUTION-CHECKLIST.md, OPEN-ISSUES-SUMMARY.md, etc.)
- [ ] **All 79 PRs merged** successfully
- [ ] **35 issues complete** with critical infrastructure in place

### **✅ E2E Safety Measures**
- [ ] **Cookie-based auth bypass** working (`E2E_AUTH_BYPASS=1`)
- [ ] **Error boundaries** with proper test IDs
- [ ] **Database seeding** idempotent and deterministic
- [ ] **@smoke tags** on reliable tests for fast-gate
- [ ] **@quarantine tags** on flaky tests (if any)

---

## 🚦 **SAFE WORK AREAS (Green Light)**

### **Tier 1: Very Safe (No E2E Risk)**
- [ ] **UI/UX polish** in Storybook (`packages/ui`, static components)
- [ ] **Documentation** (`docs.d/`, `README`, runbooks)
- [ ] **Read-only API improvements** (pagination, search tuning)
- [ ] **Mobile UI flows** using stubbed APIs (no login required)
- [ ] **Dev tooling/automation scripts**
- [ ] **Catalog polish** (skeletons, empty states, a11y passes, price formatting)

### **Tier 2: Medium Risk (Toggle-Guarded)**
- [ ] **Buy with Credits (UI stub)** - Button + optimistic UI; call mock `/api/credits/spend` in stub mode (flagged)
- [ ] **Admin: Receipt panel shell** - Show "pending/success/view in Blockscout" with placeholders
- [ ] **Credits/Subscriptions DB & APIs** (#201–#206) behind flags, CI keeps flags off
- [ ] **Case-insensitive search & pagination tuning** (already stabilized, safe to adjust)
- [ ] **Admin sales table** (read-only) — pure GETs

### **Tier 3: Risky (Isolate Behind Flags)**
- [ ] **Lit ACC + Lighthouse** (#184) - Put whole download/decrypt path behind `GM_FEATURE_LIT`
- [ ] **Avail Nexus payments path** (#202–#205) - Wrap end-to-end "intent → tx → attestation" behind `GM_FEATURE_NEXUS`
- [ ] **Auth/middleware changes** (`apps/web/src/middleware.ts`)
- [ ] **Admin Studio routes** (assets/uploads/sales) render/selector changes
- [ ] **DB schema or seed shape changes** used by E2E assertions

---

## 🛡️ **PROTECTION MECHANISMS**

### **Feature Flags (Default OFF in CI)**
- [ ] `GM_FEATURE_LIT: 'false'` - Lit Protocol integration
- [ ] `GM_FEATURE_NEXUS: 'false'` - Nexus payments
- [ ] `GM_FEATURE_BUY_WITH_CREDITS: 'false'` - Credits system
- [ ] Add new flags for risky features; set them `'false'` in E2E job env until stabilized

### **Playwright Tagging Strategy**
- [ ] **@smoke** - Fast, deterministic tests for fast-gate
- [ ] **@quarantine** - Flaky tests that still run but don't block
- [ ] **@studio|@auth** - Full E2E tests (non-blocking)

### **CI Configuration**
- [ ] **Fast-gate required** - build + typecheck + lint + @smoke tests
- [ ] **E2E non-blocking** - runs with `continue-on-error: true`
- [ ] **Artifact retention** - 7 days for Playwright reports and traces
- [ ] **Concurrency control** - prevents CI pileups

---

## 📋 **DAILY WORK PROCESS**

### **Branching Strategy**
- [ ] **New branch per issue** → small PR → merge to `main`
- [ ] **No long-lived working branches**
- [ ] **Linear commits off main**

### **Local Development**
- [ ] **Fast checks locally**: `yarn ci:local` (mirrors fast-gate)
- [ ] **Dev server**: `yarn workspace @gotmusic/web dev`
- [ ] **E2E only when needed**: `yarn workspace @gotmusic/web test:e2e -g "@smoke"`

### **PR Guidelines**
- [ ] **≤200 lines** per PR
- [ ] **1 area per PR** (fast to review and revert)
- [ ] **PR template** includes risk control statement
- [ ] **Feature flag status** documented in PR

---

## 🚨 **RISK CONTROL CHECKLIST**

### **Before Starting Work**
- [ ] **Confirm current branch** (should be `main`)
- [ ] **Verify CI status** (fast-gate passing, E2E non-blocking)
- [ ] **Check feature flags** (risky features OFF in CI)
- [ ] **Review E2E test status** (any new @quarantine tags needed?)

### **During Development**
- [ ] **Keep changes small** (≤200 LOC per PR)
- [ ] **Test locally** with `yarn ci:local`
- [ ] **Avoid hot zones** (auth/middleware, studio routes, DB schema)
- [ ] **Use feature flags** for risky work

### **Before Merging**
- [ ] **Fast-gate passing** (required)
- [ ] **E2E running** (non-blocking, for signal)
- [ ] **No new flaky tests** introduced
- [ ] **Feature flags** properly configured

---

## 🎯 **NEXT SAFE WORK ITEMS**

### **Immediate (Tier 1 - Very Safe)**
1. **Catalog polish** - skeletons, empty states, a11y passes, price formatting
2. **Mobile Library UI** - polish + Blockscout link outs (pure UI)
3. **Documentation updates** - runbooks, architecture docs
4. **Storybook improvements** - component documentation

### **Short-term (Tier 2 - Medium Risk)**
1. **Buy with Credits (UI stub)** - Button + optimistic UI with feature flag
2. **Admin Receipt panel** - Shell with placeholders, no chain calls
3. **Credits/Subscriptions APIs** - Behind flags, CI keeps flags off
4. **Search improvements** - Case-insensitive, deterministic ordering

### **Long-term (Tier 3 - Risky)**
1. **Lit Protocol integration** - Behind `GM_FEATURE_LIT` flag
2. **Nexus payments** - Behind `GM_FEATURE_NEXUS` flag
3. **Auth/middleware changes** - Small, targeted PRs
4. **Studio route improvements** - Careful, incremental changes

---

## 🔧 **TROUBLESHOOTING**

### **If E2E Fails (Non-blocking)**
- [ ] **Check Playwright artifacts** (HTML report + traces)
- [ ] **Tag flaky tests** with `@quarantine`
- [ ] **Create tracking issue** for systematic fixes
- [ ] **Keep E2E running** for visibility

### **If Fast-gate Fails (Blocking)**
- [ ] **Fix immediately** (build, typecheck, lint, @smoke tests)
- [ ] **Test locally** with `yarn ci:local`
- [ ] **Small, focused PRs** to fix issues

### **If Feature Flag Issues**
- [ ] **Verify flags OFF in CI** (`.env.ci` or workflow env)
- [ ] **Test locally** with flags ON
- [ ] **Document flag usage** in PR

---

## 📊 **SUCCESS METRICS**

### **Daily Goals**
- [ ] **Fast-gate always green** (required)
- [ ] **E2E providing signal** (non-blocking)
- [ ] **No CI pileups** (concurrency control working)
- [ ] **Small PRs merging** (≤200 LOC each)

### **Weekly Goals**
- [ ] **Feature flags working** (risky work isolated)
- [ ] **@quarantine tags** on any new flaky tests
- [ ] **Documentation current** (reflects actual state)
- [ ] **Clean repository** (no stale branches)

### **Hackathon Goals**
- [ ] **Stable E2E** (remove `continue-on-error`)
- [ ] **De-quarantine fixed tests**
- [ ] **Promote feature flags** (or remove them)
- [ ] **Full CI confidence** (all checks required)

---

**Last Updated:** 2025-10-21  
**Next Review:** After each major work session  
**Status:** Ready for safe development work 🚀
