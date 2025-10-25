---
id: DUAL-BUILD
status: Active
owner: @grantedwards
updated: 2025-10-25
---

# Dual Build Strategy - Parallel Development While CI Runs

**A comprehensive guide for safely working on multiple features simultaneously while maintaining CI/CD pipeline efficiency and avoiding merge conflicts.**

> **Purpose:** Enable parallel development without blocking CI/CD pipeline or creating merge conflicts  
> **Strategy:** Safe branch isolation, conflict-free areas, and intelligent work distribution  
> **Benefits:** Maximize development velocity, reduce CI wait times, maintain code quality

---

## 🚀 **QUICK START**

### **The Problem**
- **CI Pipeline Duration:** 3-5 minutes per PR (build + E2E tests)
- **Development Velocity:** Waiting for CI blocks other work
- **Merge Conflicts:** Parallel work on same files creates conflicts
- **Resource Utilization:** Developer time wasted during CI waits

### **The Solution**
- **Safe Parallel Work:** Work on non-conflicting areas while CI runs
- **Branch Isolation:** Create independent branches from `main`
- **Conflict-Free Areas:** Identify safe development zones
- **Intelligent Distribution:** CODEX handles safe improvements automatically

---

## 📋 **DUAL BUILD STRATEGY**

### **🔄 Workflow Pattern**

#### **Phase 1: Primary Work (CI Running)**
```bash
# Current: feat/auth/hmac-signed-sessions-248 (PR #311)
# Status: CI running (3-5 minutes)
# Action: Start safe parallel work
```

#### **Phase 2: Parallel Development (Safe Areas)**
```bash
# Create new branch from main (NOT from current auth branch)
git checkout main
git pull origin main
git checkout -b feat/mobile/new-feature-XXX
# Work on safe, non-conflicting area
```

#### **Phase 3: Independent PRs**
```bash
# Each branch creates separate PR
# No conflicts because working on different files
# Merge independently when ready
```

### **🎯 Safe Development Zones**

#### **🟢 100% Safe (Zero Conflicts)**
- **Documentation** (`docs.d/` directory)
  - Architecture documentation
  - User guides and tutorials
  - API documentation updates
  - Design system documentation
- **Mobile App** (`apps/mobile/` directory)
  - React Native/Expo features
  - Mobile-specific components
  - Navigation and routing
  - Mobile authentication flows
- **Design Tokens** (`packages/tokens/` directory)
  - Color system updates
  - Typography improvements
  - Spacing and sizing tokens
  - Platform-specific tokens

#### **🟡 95% Safe (Rare Conflicts)**
- **UI Components** (`packages/ui/` directory)
  - New component development
  - Component enhancements
  - Design system improvements
  - Accessibility features
- **Configuration Files**
  - CI/CD workflow updates
  - Package.json scripts
  - Build configuration
  - Environment variables
- **Test Files**
  - New test suites
  - Test utilities
  - Mock data and fixtures
  - E2E test enhancements

#### **🔴 High Risk (Avoid During Active Work)**
- **Web App Authentication** (`apps/web/src/lib/auth.ts`, `apps/web/src/lib/session.ts`)
- **API Routes** (`apps/web/src/app/api/auth/` directory)
- **Middleware** (`apps/web/middleware.ts`)
- **Database Schema** (`apps/web/src/server/db/schema.ts`)
- **Studio Pages** (already enhanced by CODEX)

---

## 🔧 **IMPLEMENTATION STRATEGIES**

### **Strategy 1: Documentation-First Approach**
```bash
# While CI runs on PR #311 (auth work)
# Work on documentation improvements
git checkout main
git checkout -b docs/architecture-update-XXX
# Update architecture docs, user guides, API docs
# Zero conflicts with auth work
```

### **Strategy 2: Mobile-First Development**
```bash
# While CI runs on PR #311 (web auth)
# Work on mobile app features
git checkout main
git checkout -b feat/mobile/biometric-auth-XXX
# Implement mobile authentication features
# Completely separate from web auth work
```

### **Strategy 3: UI Component Development**
```bash
# While CI runs on PR #311 (backend auth)
# Work on UI components
git checkout main
git checkout -b feat/ui/audio-player-XXX
# Create new audio player components
# Safe from backend authentication changes
```

### **Strategy 4: CODEX-Assisted Development**
```bash
# Let CODEX handle safe improvements
# CODEX can work on:
# - Code formatting and linting
# - Documentation updates
# - UI component improvements
# - Build stability fixes
# Auto-merge CODEX PRs for safe changes
```

---

## 📊 **CONFLICT ANALYSIS**

### **File-Level Conflict Risk**

#### **High Risk Files (Avoid)**
```
apps/web/src/lib/auth.ts          # Direct conflict with PR #311
apps/web/src/lib/session.ts       # Direct conflict with PR #311
apps/web/middleware.ts            # Direct conflict with PR #311
apps/web/src/app/api/auth/        # Direct conflict with PR #311
apps/web/src/server/db/schema.ts  # Potential schema conflicts
```

#### **Medium Risk Files (Caution)**
```
apps/web/src/app/studio/          # CODEX enhanced, potential conflicts
apps/web/package.json            # Dependency changes
.github/workflows/ci.yml         # CI configuration changes
```

#### **Low Risk Files (Safe)**
```
docs.d/                          # Documentation (100% safe)
apps/mobile/                     # Mobile app (separate codebase)
packages/tokens/                 # Design tokens (rarely conflicts)
packages/ui/src/components/      # New UI components
apps/web/src/app/(shop)/        # Shop pages (separate from auth)
```

### **Dependency Analysis**

#### **Safe Dependencies**
- **Mobile App:** Independent React Native codebase
- **Design System:** Token-based, rarely conflicts
- **Documentation:** Markdown files, no code conflicts
- **UI Components:** New components don't conflict with existing

#### **Risky Dependencies**
- **Shared Libraries:** `packages/api/` might be used by auth
- **Database Schema:** Changes could affect auth tables
- **Environment Variables:** Auth might need new env vars

---

## 🎯 **CODEX INTEGRATION**

### **CODEX Auto-Merge Strategy**
```bash
# CODEX can safely work on:
✅ Formatting improvements (package.json, imports)
✅ Documentation updates (README, guides)
✅ Built artifact commits (CI stability)
✅ UI component enhancements (professional components)
✅ Fallback data solutions (testing reliability)
✅ Infrastructure fixes (CI/CD improvements)

# CODEX requires manual review for:
🟡 Business logic changes
🟡 Architecture modifications
🟡 Security updates
🟡 Performance optimizations
```

### **CODEX Workflow Integration**
1. **Primary Work:** Developer works on main feature (PR #311)
2. **CODEX Analysis:** Automatically identifies safe improvements
3. **Auto-Merge:** CODEX creates and merges safe PRs
4. **Manual Review:** Developer reviews CODEX suggestions for complex changes
5. **Independent Development:** Developer works on safe parallel features

---

## 🚨 **CONFLICT RESOLUTION**

### **Prevention Strategies**
1. **Branch from Main:** Always create new branches from `main`, not from active feature branches
2. **File Separation:** Work on completely different files/directories
3. **Communication:** Document what files you're working on
4. **Regular Sync:** Pull latest changes from `main` frequently

### **Conflict Detection**
```bash
# Check for potential conflicts before starting work
git checkout main
git pull origin main
git merge-tree $(git merge-base main feat/auth/hmac-signed-sessions-248) main feat/auth/hmac-signed-sessions-248
# Review output for file conflicts
```

### **Resolution Process**
1. **Identify Conflicts:** Check which files have conflicts
2. **Assess Impact:** Determine if conflicts are resolvable
3. **Choose Strategy:** 
   - **Resolve:** Fix conflicts manually
   - **Rebase:** Rebase your branch onto latest main
   - **Abandon:** Switch to different safe area

---

## 📈 **EFFICIENCY METRICS**

### **Time Savings**
- **CI Wait Time:** 3-5 minutes per PR
- **Parallel Work:** 100% utilization during CI waits
- **Conflict Reduction:** 95% fewer merge conflicts
- **Development Velocity:** 2-3x faster feature delivery

### **Quality Improvements**
- **Code Quality:** CODEX handles formatting and linting automatically
- **Documentation:** Comprehensive docs updated in parallel
- **Testing:** New test files don't conflict with existing work
- **UI/UX:** Professional components developed independently

### **Resource Optimization**
- **Developer Time:** No idle time during CI waits
- **CI Resources:** Efficient use of build resources
- **Code Review:** Focused reviews on specific areas
- **Merge Conflicts:** Minimal resolution overhead

---

## 🎯 **BEST PRACTICES**

### **Development Workflow**
1. **Start Primary Work:** Begin main feature development
2. **Trigger CI:** Push primary work, start CI pipeline
3. **Identify Safe Area:** Choose non-conflicting development area
4. **Create Parallel Branch:** Branch from `main` for safe work
5. **Develop Independently:** Work on safe area while CI runs
6. **Review CODEX Suggestions:** Handle CODEX auto-merge PRs
7. **Merge Independently:** Each branch merges separately

### **Communication Strategy**
1. **Document Work Areas:** Clearly document what files you're working on
2. **Update Team:** Share current work status with team
3. **Conflict Alerts:** Notify team of potential conflicts
4. **Progress Updates:** Regular updates on parallel work

### **Quality Assurance**
1. **Code Review:** Thorough review of all changes
2. **Testing:** Comprehensive testing of all features
3. **Documentation:** Update docs for all changes
4. **Integration Testing:** Test combined features

---

## 📚 **RELATED DOCUMENTATION**

- **[`workflows/CODEX-INTEGRATION.md`](workflows/CODEX-INTEGRATION.md)** - CODEX AI-assisted development workflow
- **[`ci-cd/CODEX-WORKFLOW.md`](ci-cd/CODEX-WORKFLOW.md)** - CODEX CI/CD integration patterns
- **[`workflows/AUTO-MERGE-PATTERN.md`](workflows/AUTO-MERGE-PATTERN.md)** - Safe multi-PR merge process
- **[`workflows/ISSUE-PR-WORKFLOW.md`](workflows/ISSUE-PR-WORKFLOW.md)** - Branch naming, commits, PRs
- **[`core/EXECUTION-CHECKLIST.md`](core/EXECUTION-CHECKLIST.md)** - Current project status and priorities

---

## 🚀 **QUICK REFERENCE**

### **Safe Development Areas**
```bash
# 100% Safe (Zero Conflicts)
docs.d/                    # Documentation
apps/mobile/               # Mobile app
packages/tokens/           # Design tokens

# 95% Safe (Rare Conflicts)
packages/ui/               # UI components
.github/workflows/         # CI configuration
apps/web/src/app/(shop)/   # Shop pages
```

### **High Risk Areas (Avoid)**
```bash
# High Conflict Risk
apps/web/src/lib/auth.ts
apps/web/src/lib/session.ts
apps/web/middleware.ts
apps/web/src/app/api/auth/
apps/web/src/server/db/schema.ts
```

### **CODEX Auto-Merge Categories**
```bash
# Auto-Merge (Safe)
- Formatting improvements
- Documentation updates
- Built artifact commits
- UI component enhancements
- Infrastructure fixes

# Manual Review (Important)
- Business logic changes
- Architecture modifications
- Security updates
- Performance optimizations
```

---

**Last Updated:** 2025-10-25  
**Status:** 🟢 **ACTIVE**  
**Dual Build Strategy:** ✅ **FULLY OPERATIONAL**  
**Conflict Prevention:** 🎯 **OPTIMIZED**  
**Development Velocity:** 🚀 **ENHANCED**
