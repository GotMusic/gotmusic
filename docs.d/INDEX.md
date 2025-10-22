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
- **`EXECUTION-CHECKLIST.md`** - Current status, priorities, CI rules
- **`GOTMUSIC_PROJECT_SUMMARY.md`** - Complete project overview and changelog
- **`OPEN-ISSUES-SUMMARY.md`** - All GitHub issues organized by priority
- **`KNOWLEDGE-UPDATE-SUMMARY.md`** - Documentation changelog and updates

### **Essential Workflows**
- **`workflows/AGENT-START.md`** ⭐ Kickoff template (2 fields: ISSUE + GOAL)
- **`workflows/ISSUE-PR-WORKFLOW.md`** - Branch naming, commits, PRs, closes
- **`workflows/AUTO-MERGE-PATTERN.md`** - Safe multi-PR merge process
- **`workflows/GIT-CONFIG-SPEEDUPS.md`** - Git configuration optimizations
- **`workflows/PAT-SETUP.md`** - Personal Access Token setup
- **`workflows/STORYBOOK-WORKFLOW.md`** - Storybook development workflow

### **Development Guides**
- **`STORYBOOK-GUIDE.md`** - Complete Storybook development guide
- **`SAFE-WORK-CHECKLIST.md`** - Safety checklist for development
- **`GOTMUSIC_DEBUGGING_TIMELINE.md`** - Debugging history and solutions

---

## 🏗️ **ARCHITECTURE & DESIGN**

### **System Architecture**
- **`architecture/overview.md`** - System design and components
- **`architecture/data-model.md`** - Database schema and relationships
- **`architecture/flows.md`** - Purchase, upload, access flows
- **`architecture/ia.md`** - Information architecture

### **Design System**
- **`design-system/README.md`** - Design system overview
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
- **`E18E-INTEGRATION.md`** - e18e performance standards integration
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
- **`STORYBOOK-CSS-PROBLEM-SOLUTION-REPORT.md`** - Storybook CSS issues and solutions

### **Maintenance Guides**
- **`docs/maintenance/tailwind-nativewind-strategy.md`** - Tailwind/NativeWind strategy
- **`docs/maintenance/upgrade-storybook.md`** - Storybook upgrade guide

---

## 📋 **QUICK REFERENCE**

### **Task-Based Navigation**

| Task | Read These Files |
|------|------------------|
| **Start new feature** | `workflows/AGENT-START.md` → `EXECUTION-CHECKLIST.md` → `workflows/ISSUE-PR-WORKFLOW.md` |
| **Fix bug** | `architecture/data-model.md` → `testing/e2e.md` |
| **CI failure** | `EXECUTION-CHECKLIST.md` (Section 8) → `testing/e2e.md` |
| **API change** | `architecture/data-model.md` → `architecture/flows.md` |
| **Merge multiple PRs** | `workflows/AUTO-MERGE-PATTERN.md` → `workflows/ISSUE-PR-WORKFLOW.md` |
| **Decision needed** | `adr/` (read existing, add new if needed) |
| **UI component** | `STORYBOOK-GUIDE.md` → `design-system/README.md` |
| **Performance issue** | `E18E-INTEGRATION.md` → `.e18e-recommendations.md` |
| **Design system** | `design-system/README.md` → `design-system/foundations/` |

### **File Categories**

| Category | Count | Location |
|----------|-------|----------|
| **Core Docs** | 4 | `docs.d/` (root) |
| **Workflows** | 6 | `docs.d/workflows/` |
| **Architecture** | 4 | `docs.d/architecture/` |
| **Design System** | 15 | `docs.d/design-system/` |
| **Technical** | 8 | `docs.d/` (various subdirs) |
| **App Docs** | 6 | `apps/` (various) |
| **Maintenance** | 2 | `docs/maintenance/` |
| **Total** | **45** | **All organized** |

---

## 🎯 **USAGE INSTRUCTIONS**

1. **For new development:** Start with `workflows/AGENT-START.md`
2. **For debugging:** Check `GOTMUSIC_DEBUGGING_TIMELINE.md`
3. **For architecture:** Review `architecture/overview.md`
4. **For UI work:** Use `STORYBOOK-GUIDE.md`
5. **For performance:** Check `E18E-INTEGRATION.md`

---

**Last Updated:** 2025-10-22  
**Total Files Indexed:** 45 markdown files  
**Status:** 🟢 **FULLY OPERATIONAL**

---

*This index is the single source of truth for all documentation navigation.*