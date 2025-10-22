---
id: INDEX
status: Active
owner: @grantedwards
updated: 2025-10-22
---

# GotMusic — Documentation Index

**This is the single source of truth for all documentation. Everything starts here.**

> **Navigation:** Use this index to find any documentation file in the repository
> **Last Updated:** 2025-10-22

---

## 🚀 **QUICK START**

### **New Chat? Start Here**
1. **Copy `workflows/AGENT-START.md`** into new chat
2. Fill `ISSUE: #` and `GOAL: <one sentence>`
3. Send

**Agent auto-reads:** INDEX, EXECUTION-CHECKLIST, ISSUE-PR-WORKFLOW

---

## 📚 **CORE DOCUMENTATION**

### **Project Status & Progress**
- **`core/EXECUTION-CHECKLIST.md`** - Current status, priorities, CI rules
- **`core/GOTMUSIC_PROJECT_SUMMARY.md`** - Complete project overview and changelog
- **`core/OPEN-ISSUES-SUMMARY.md`** - All GitHub issues organized by priority
- **`core/KNOWLEDGE-UPDATE-SUMMARY.md`** - Documentation changelog and updates

### **Essential Workflows**
- **`workflows/AGENT-START.md`** ⭐ Kickoff template (2 fields: ISSUE + GOAL)
- **`workflows/ISSUE-PR-WORKFLOW.md`** - Branch naming, commits, PRs, closes
- **`workflows/AUTO-MERGE-PATTERN.md`** - Safe multi-PR merge process
- **`workflows/GIT-CONFIG-SPEEDUPS.md`** - Git configuration optimizations
- **`workflows/PAT-SETUP.md`** - Personal Access Token setup
- **`workflows/STORYBOOK-WORKFLOW.md`** - Storybook development workflow

### **Development Guides**
- **`guides/STORYBOOK-GUIDE.md`** - Complete Storybook development guide
- **`guides/SAFE-WORK-CHECKLIST.md`** - Safety checklist for development

---

## 🏗️ **ARCHITECTURE & DESIGN**

### **System Architecture**
- **`architecture/overview.md`** - System design and components
- **`architecture/data-model.md`** - Database schema and relationships
- **`architecture/flows.md`** - Purchase, upload, access flows
- **`architecture/ia.md`** - Information architecture

### **Design System**
- **`design-system/README.md`** - Design system overview
- **`design-system/pathways/USER-PATHWAYS.md`** - Complete user journey specifications
- **`design-system/specifications/ui-package.md`** - UI package specification
- **`design-system/foundations/`**
  - `color.md` - Color system and tokens
  - `typography.md` - Typography system
  - `tokens.md` - Design tokens
  - `mapping.md` - Token mapping
- **`design-system/components/`**
  - `app.md` - App-level components
  - `core.md` - Core UI components
  - `how-it-works-upgrade.md` - How it works component upgrade
- **`design-system/patterns/`**
  - `cards.md` - Card patterns
  - `players.md` - Player patterns
- **`design-system/consistency/`**
  - `accessibility.md` - Accessibility standards
  - `ci.md` - CI consistency rules
- **`design-system/content/`**
  - `guidelines.md` - Content guidelines
- **`design-system/contribution/`**
  - `status.md` - Contribution status
- **`design-system/mobile/`**
  - `nativewind.md` - NativeWind configuration
- **`design-system/web/`**
  - `tailwind.md` - Tailwind CSS configuration
- **`design-system/theming/`**
  - `platforms.md` - Platform theming
- **`design-system/pipeline/`**
  - `style-dictionary.md` - Style Dictionary pipeline
- **`design-system/figma-workflow.md`** - Figma workflow
- **`design-system/ui-package.md`** - UI package documentation

### **Architecture Decision Records (ADRs)**
- **`adr/ADR-0001-pyusd-path.md`** - PyUSD path decision
- **`adr/ADR-0002-lit-networks.md`** - Lit networks decision

---

## 🔧 **TECHNICAL INTEGRATION**

### **Performance & Standards**
- **`reports/E18E-INTEGRATION.md`** - e18e performance standards integration
- **`.e18e-recommendations.md`** - e18e recommendations (root level)

### **API & Environment**
- **`api/env.md`** - API environment configuration

### **Integrations**
- **`integrations/daw-bridge.md`** - DAW bridge integration
- **`integrations/lit/spec.md`** - Lit integration specification

### **Payments & Contracts**
- **`payments/pyusd-avail.md`** - PyUSD availability
- **`contracts/layaway-escrow.md`** - Layaway escrow contract

### **Attestations & Operations**
- **`attestations/eas-schemas.md`** - EAS schemas
- **`operations/audio.md`** - Audio operations
- **`operations/blockscout.md`** - Blockscout operations

### **Studio & Testing**
- **`studio/README.md`** - Studio documentation
- **`testing/e2e.md`** - End-to-end testing guide

---

## 📱 **APPLICATION DOCUMENTATION**

### **Web Application**
- **`apps/web/README.md`** - Web app documentation
- **`apps/web/src/app/(shop)/README.md`** - Shop section
- **`apps/web/src/app/(studio)/README.md`** - Studio section
- **`apps/web/src/app/(superadmin)/README.md`** - Super admin section
- **`apps/web/src/lib/README.md`** - Web lib documentation
- **`apps/web/src/server/payments/README.md`** - Payment server

### **Mobile Application**
- **`apps/mobile/.expo/README.md`** - Expo configuration

### **UI Package**
- **`packages/ui/`** - UI package (see design-system/ for details)

---

## 🛠️ **MAINTENANCE & TROUBLESHOOTING**

### **Problem Reports**
- **`reports/STORYBOOK-CSS-PROBLEM-SOLUTION-REPORT.md`** - Storybook CSS issues and solutions
- **`reports/GOTMUSIC_DEBUGGING_TIMELINE.md`** - Debugging history and solutions

### **Maintenance Guides**
- **`maintenance/tailwind-nativewind-strategy.md`** - Tailwind/NativeWind strategy
- **`maintenance/upgrade-storybook.md`** - Storybook upgrade guide

### **Public Documentation**
- **`JUDGE-RUNBOOK.md`** - Judge evaluation runbook

---

## 📋 **QUICK REFERENCE**

### **Task-Based Navigation**

| Task | Read These Files |
|------|------------------|
| **Start new feature** | `workflows/AGENT-START.md` → `core/EXECUTION-CHECKLIST.md` → `workflows/ISSUE-PR-WORKFLOW.md` |
| **Fix bug** | `architecture/data-model.md` → `testing/e2e.md` |
| **CI failure** | `core/EXECUTION-CHECKLIST.md` (Section 8) → `testing/e2e.md` |
| **API change** | `architecture/data-model.md` → `architecture/flows.md` |
| **Merge multiple PRs** | `workflows/AUTO-MERGE-PATTERN.md` → `workflows/ISSUE-PR-WORKFLOW.md` |
| **Decision needed** | `adr/` (read existing, add new if needed) |
| **UI component** | `guides/STORYBOOK-GUIDE.md` → `design-system/pathways/USER-PATHWAYS.md` → `design-system/README.md` |
| **Performance issue** | `reports/E18E-INTEGRATION.md` → `.e18e-recommendations.md` |
| **Design system** | `design-system/README.md` → `design-system/foundations/` |

### **File Categories**

| Category | Count | Location |
|----------|-------|----------|
| **Core Docs** | 4 | `docs.d/core/` |
| **Workflows** | 6 | `docs.d/workflows/` |
| **Architecture** | 4 | `docs.d/architecture/` |
| **Design System** | 16 | `docs.d/design-system/` |
| **Guides** | 2 | `docs.d/guides/` |
| **Reports** | 3 | `docs.d/reports/` |
| **Technical** | 5 | `docs.d/` (various subdirs) |
| **App Docs** | 6 | `apps/` (various) |
| **Maintenance** | 2 | `docs.d/maintenance/` |
| **Public Docs** | 1 | `docs.d/` (root) |
| **Total** | **47** | **All organized** |

---

## 🎯 **USAGE INSTRUCTIONS**

1. **For new development:** Start with `workflows/AGENT-START.md`
2. **For debugging:** Check `reports/GOTMUSIC_DEBUGGING_TIMELINE.md`
3. **For architecture:** Review `architecture/overview.md`
4. **For UI work:** Use `guides/STORYBOOK-GUIDE.md`
5. **For performance:** Check `reports/E18E-INTEGRATION.md`

---

**Last Updated:** 2025-10-22  
**Total Files Indexed:** 47 markdown files  
**Status:** 🟢 **FULLY OPERATIONAL**

---

*This index is the single source of truth for all documentation navigation.*