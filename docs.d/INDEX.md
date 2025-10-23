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
- **`AUTH-MASTER.md`** - Authentication & Wallet Linking epic documentation

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
- **`architecture/storage.md`** - Hybrid storage architecture (R2/S3 + IPFS)
- **`architecture/mobile-sdk54.md`** - Expo SDK 54 upgrade documentation
- **`architecture/mobile-authentication.md`** - Mobile authentication architecture
- **`architecture/blockchain-services.md`** - Blockchain service architecture
- **`architecture/cross-chain-payments.md`** - Cross-chain payment architecture

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
- **`api/mobile-env.md`** - Mobile app environment configuration
- **`api/blockchain-apis.md`** - Blockchain API integrations

### **Integrations**
- **`integrations/daw-bridge.md`** - DAW bridge integration
- **`integrations/lit/spec.md`** - Lit integration specification
- **`integrations/avail-nexus.md`** - Avail Nexus cross-chain integration
- **`integrations/blockscout.md`** - Blockscout blockchain explorer integration
- **`integrations/pyusd.md`** - PayPal USD stablecoin integration
- **`integrations/passkey-wallets.md`** - Passkey wallet integration
- **`integrations/biometric-signing.md`** - Biometric transaction signing

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
- **`apps/web/src/app/(studio)/README.md`** - Studio sectiongive me command to start mobile

- **`apps/web/src/app/(superadmin)/README.md`** - Super admin section
- **`apps/web/src/lib/README.md`** - Web lib documentation
- **`apps/web/src/server/payments/README.md`** - Payment server

### **Mobile Application**
- **`apps/mobile/.expo/README.md`** - Expo configuration
- **`apps/mobile/README.md`** - Mobile app comprehensive documentation
- **`apps/mobile/features/`** - Mobile app feature documentation
  - `authentication.md` - Biometric, passkey, and wallet authentication
  - `blockchain-integration.md` - Avail Nexus, Blockscout, PYUSD integration
  - `passkey-transactions.md` - Passkey transaction signing system
  - `wallet-connect.md` - Traditional wallet connection system
  - `lit-protocol.md` - Lit Protocol encryption and access control
  - `audio-recording.md` - Audio recording and processing
  - `ui-components.md` - Mobile UI components and design system

### **UI Package**
- **`packages/ui/`** - UI package (see design-system/ for details)

---

## 🛠️ **MAINTENANCE & TROUBLESHOOTING**

### **Problem Reports**
- **`reports/STORYBOOK-CSS-PROBLEM-SOLUTION-REPORT.md`** - Storybook CSS issues and solutions
- **`reports/GOTMUSIC_DEBUGGING_TIMELINE.md`** - Debugging history and solutions
- **`reports/MOBILE-DEBUGGING-TIMELINE.md`** - Mobile app debugging history and solutions
- **`reports/BLOCKCHAIN-INTEGRATION-ISSUES.md`** - Blockchain integration issues and solutions
- **`reports/POLYFILL-COMPATIBILITY-REPORT.md`** - Node.js polyfill compatibility report

### **Maintenance Guides**
- **`maintenance/tailwind-nativewind-strategy.md`** - Tailwind/NativeWind strategy
- **`maintenance/upgrade-storybook.md`** - Storybook upgrade guide
- **`maintenance/mobile-polyfills.md`** - Mobile app polyfill maintenance
- **`maintenance/blockchain-dependencies.md`** - Blockchain dependency management
- **`maintenance/expo-upgrades.md`** - Expo SDK upgrade procedures

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
| **Mobile feature** | `apps/mobile/features/` → `architecture/mobile-authentication.md` → `integrations/` |
| **Blockchain integration** | `integrations/` → `architecture/blockchain-services.md` → `api/blockchain-apis.md` |
| **Authentication issue** | `apps/mobile/features/authentication.md` → `integrations/passkey-wallets.md` → `integrations/biometric-signing.md` |
| **Polyfill issue** | `reports/POLYFILL-COMPATIBILITY-REPORT.md` → `maintenance/mobile-polyfills.md` |

### **File Categories**

| Category | Count | Location |
|----------|-------|----------|
| **Core Docs** | 4 | `docs.d/core/` |
| **Workflows** | 6 | `docs.d/workflows/` |
| **Architecture** | 7 | `docs.d/architecture/` |
| **Design System** | 16 | `docs.d/design-system/` |
| **Guides** | 2 | `docs.d/guides/` |
| **Reports** | 5 | `docs.d/reports/` |
| **Technical** | 8 | `docs.d/` (various subdirs) |
| **App Docs** | 13 | `apps/` (various) |
| **Maintenance** | 5 | `docs.d/maintenance/` |
| **Public Docs** | 1 | `docs.d/` (root) |
| **Total** | **67** | **All organized** |

---

## 🎯 **USAGE INSTRUCTIONS**

1. **For new development:** Start with `workflows/AGENT-START.md`
2. **For debugging:** Check `reports/GOTMUSIC_DEBUGGING_TIMELINE.md`
3. **For architecture:** Review `architecture/overview.md`
4. **For UI work:** Use `guides/STORYBOOK-GUIDE.md`
5. **For performance:** Check `reports/E18E-INTEGRATION.md`
6. **For mobile development:** Start with `apps/mobile/README.md`
7. **For blockchain integration:** Review `integrations/` directory
8. **For authentication:** Check `apps/mobile/features/authentication.md`
9. **For polyfill issues:** See `reports/POLYFILL-COMPATIBILITY-REPORT.md`

---

**Last Updated:** 2025-10-22  
**Total Files Indexed:** 67 markdown files  
**Status:** 🟢 **FULLY OPERATIONAL**  
**Mobile Features:** ✅ **COMPREHENSIVE**  
**Blockchain Integration:** ✅ **COMPLETE**

---

*This index is the single source of truth for all documentation navigation.*