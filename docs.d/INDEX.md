---
id: INDEX
status: Active
owner: @grantedwards
updated: 2025-10-25
---

# GotMusic — Documentation Index

**This is the single source of truth for all documentation. Everything starts here.**

> **Navigation:** Use this index to find any documentation file in the repository  
> **Last Updated:** 2025-10-25  
> **Color Coding:** 🔴 CRITICAL | 🟠 HIGH | 🟡 MEDIUM | 🟢 LOW | 🔵 INFO | 🟣 DECISION | ⚫ LEGACY  
> **🆕 CODEX Integration:** Enhanced with AI-assisted development workflow and automated PR management

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
- **[`core/EXECUTION-CHECKLIST.md`](core/EXECUTION-CHECKLIST.md)** 🔴 CRITICAL - Current status, priorities, CI rules

### **Essential Workflows**
- **[`workflows/AGENT-START.md`](workflows/AGENT-START.md)** 🔴 CRITICAL ⭐ Kickoff template (2 fields: ISSUE + GOAL)
- **[`workflows/AUTO-MERGE-PATTERN.md`](workflows/AUTO-MERGE-PATTERN.md)** 🟠 HIGH - Safe multi-PR merge process
- **[`workflows/CODEX-INTEGRATION.md`](workflows/CODEX-INTEGRATION.md)** 🔴 CRITICAL - 🆕 CODEX AI-assisted development workflow and PR management
- **[`DUAL-BUILD.md`](DUAL-BUILD.md)** 🔴 CRITICAL - 🆕 Parallel development strategy while CI runs, conflict-free work areas, and CODEX integration

### **Development Guides**
- **[`guides/DOCS.md`](guides/DOCS.md)** 🟠 HIGH - Documentation guide

---

## 🏗️ **ARCHITECTURE & DESIGN**

### **System Architecture**
- **[`architecture/overview.md`](architecture/overview.md)** 🔴 CRITICAL - System design and components
- **[`architecture/data-model.md`](architecture/data-model.md)** 🔴 CRITICAL - Database schema and relationships
- **[`architecture/flows.md`](architecture/flows.md)** 🔴 CRITICAL - Purchase, upload, access flows
- **[`architecture/ia.md`](architecture/ia.md)** 🟠 HIGH - Information architecture
- **[`architecture/storage.md`](architecture/storage.md)** 🟠 HIGH - Hybrid storage architecture (R2/S3 + IPFS)
- **[`architecture/audio-player-system.md`](architecture/audio-player-system.md)** 🔴 CRITICAL - 🆕 Complete audio player architecture
- **[`architecture/audio-quality-pipeline.md`](architecture/audio-quality-pipeline.md)** 🟠 HIGH - 🆕 Audio quality and streaming pipeline
- **[`architecture/storage-cdn-strategy.md`](architecture/storage-cdn-strategy.md)** 🟠 HIGH - 🆕 Storage and CDN architecture
- **[`architecture/hackathon-audio-player.md`](architecture/hackathon-audio-player.md)** 🔴 CRITICAL - 🆕 Hackathon-focused audio player implementation
- **[`architecture/web-audio-enhancement.md`](architecture/web-audio-enhancement.md)** 🔴 CRITICAL - 🆕 Web Audio API enhancement with Canvas waveforms
- **[`architecture/mobile-waveform-player.md`](architecture/mobile-waveform-player.md)** 🔴 CRITICAL - 🆕 Mobile SVG waveform player implementation
- **[`architecture/30s-preview-logic.md`](architecture/30s-preview-logic.md)** 🔴 CRITICAL - 🆕 30-second preview logic across platforms
- **[`architecture/hackathon-implementation-plan.md`](architecture/hackathon-implementation-plan.md)** 🔴 CRITICAL - 🆕 Complete 3-week implementation plan

### **Design System**
- **[`design-system/README.md`](design-system/README.md)** 🔴 CRITICAL - Design system overview with token build requirements, CI integration, and CODEX workflow
- **[`design-system/2025-GUI-UPGRADE-STRATEGY.md`](design-system/2025-GUI-UPGRADE-STRATEGY.md)** 🔴 CRITICAL - 🆕 2025 GUI upgrade strategy for top-tier component library
- **[`design-system/COMPONENT-UPGRADE-PLAN.md`](design-system/COMPONENT-UPGRADE-PLAN.md)** 🔴 CRITICAL - 🆕 Detailed component upgrade plan with implementation timeline
- **[`design-system/GLASS-NEUMORPHIC-HYBRID.md`](design-system/GLASS-NEUMORPHIC-HYBRID.md)** 🔴 CRITICAL - 🆕 Unified Glass-Neumorphic hybrid design system - the perfect fusion of frosted glass effects and tactile neumorphic depth
- **[`design-system/GLASS-NEUMORPHIC-IMPLEMENTATION.md`](design-system/GLASS-NEUMORPHIC-IMPLEMENTATION.md)** 🔴 CRITICAL - 🆕 Practical implementation guide for unified glass-neumorphic hybrid components
- **`design-system/components/`**
  - [`app.md`](design-system/components/app.md) 🟠 HIGH - App-level components
  - [`core.md`](design-system/components/core.md) 🟠 HIGH - Core UI components
  - [`how-it-works-upgrade.md`](design-system/components/how-it-works-upgrade.md) 🟡 MEDIUM - How it works component upgrade
- **`design-system/patterns/`**
  - [`cards.md`](design-system/patterns/cards.md) 🟠 HIGH - Card patterns
  - [`players.md`](design-system/patterns/players.md) 🟠 HIGH - Player patterns
  - **[`waveform-visualization.md`](design-system/patterns/waveform-visualization.md)** 🟠 HIGH - 🆕 Waveform visualization patterns
- **`design-system/audio/`** - 🆕 NEW AUDIO DESIGN SYSTEM
  - **[`audio-quality-standards.md`](design-system/audio/audio-quality-standards.md)** 🟡 MEDIUM - 🆕 Audio quality standards and LUFS
  - **[`player-controls.md`](design-system/audio/player-controls.md)** 🟠 HIGH - 🆕 Player control design patterns
  - **[`visualization-design.md`](design-system/audio/visualization-design.md)** 🟠 HIGH - 🆕 Audio visualization design
- **`design-system/consistency/`**
  - [`accessibility.md`](design-system/consistency/accessibility.md) 🟠 HIGH - Accessibility standards
  - [`ci.md`](design-system/consistency/ci.md) 🟠 HIGH - CI consistency rules
- **`design-system/mobile/`**
  - [`nativewind.md`](design-system/mobile/nativewind.md) 🟠 HIGH - NativeWind configuration
- **`design-system/web/`**
  - [`tailwind.md`](design-system/web/tailwind.md) 🟠 HIGH - Tailwind CSS configuration
- **`design-system/theming/`**
  - [`platforms.md`](design-system/theming/platforms.md) 🟡 MEDIUM - Platform theming
- **`design-system/pipeline/`**
  - [`style-dictionary.md`](design-system/pipeline/style-dictionary.md) 🟠 HIGH - Style Dictionary pipeline
- **[`design-system/figma-workflow.md`](design-system/figma-workflow.md)** 🟡 MEDIUM - Figma workflow
- **[`design-system/ui-package.md`](design-system/ui-package.md)** 🟠 HIGH - UI package documentation

### **Architecture Decision Records (ADRs)**
- **[`adr/ADR-0001-pyusd-path.md`](adr/ADR-0001-pyusd-path.md)** 🟣 DECISION - PyUSD path decision
- **[`adr/ADR-0002-lit-networks.md`](adr/ADR-0002-lit-networks.md)** 🟣 DECISION - Lit networks decision

---

## 🔧 **TECHNICAL INTEGRATION**

### **Performance & Standards**
- **[`reports/.e18e-recommendations.md`](reports/.e18e-recommendations.md)** 🟠 HIGH - e18e recommendations and performance guidelines

### **API & Environment**
- **[`api/env.md`](api/env.md)** 🔴 CRITICAL - API environment configuration

### **Integrations**
- **[`integrations/UPLOADTHING-INTEGRATION.md`](integrations/UPLOADTHING-INTEGRATION.md)** 🔴 CRITICAL - 🆕 UploadThing file upload system integration
> **⚠️ OTHER INTEGRATION FILES MISSING** - See Missing Documentation section below

### **Payments & Contracts**
> **⚠️ ALL PAYMENT & CONTRACT FILES MISSING** - See Missing Documentation section below

### **Attestations & Operations**
- **[`contracts-deployment.md`](contracts-deployment.md)** 🔴 CRITICAL - 🆕 EAS resolver contracts deployment documentation
> **⚠️ OTHER ATTESTATION & OPERATION FILES MISSING** - See Missing Documentation section below

### **Studio & Testing**
- **[`testing/e2e.md`](testing/e2e.md)** 🟠 HIGH - End-to-end testing guide
- **[`STUDIO-CONSOLE-REFACTOR.md`](STUDIO-CONSOLE-REFACTOR.md)** 🔴 CRITICAL - 🆕 Studio/Console refactoring & local CI setup

### **CI/CD Pipeline** - 🆕 CONSOLIDATED SECTION
- **[`ci-cd/README.md`](ci-cd/README.md)** 🔴 CRITICAL - 🆕 CI/CD documentation navigation hub
- **[`ci-cd/CI-CD-GUIDE.md`](ci-cd/CI-CD-GUIDE.md)** 🔴 CRITICAL - 🆕 Complete CI/CD guide with architecture, setup, troubleshooting, and operations
- **[`ci-cd/BUILD-STATUS.md`](ci-cd/BUILD-STATUS.md)** 🟠 HIGH - 🆕 Build status monitoring and CI/CD health checks

---

## 📱 **APPLICATION DOCUMENTATION**


### **Web Application**
- **[`apps/web/README.md`](../apps/web/README.md)** 🔴 CRITICAL - Web app documentation
- **[`apps/web/src/app/(shop)/README.md`](../apps/web/src/app/(shop)/README.md)** 🟠 HIGH - Shop section
- **[`apps/web/src/app/(studio)/README.md`](../apps/web/src/app/(studio)/README.md)** 🟠 HIGH - Studio section
- **[`apps/web/src/app/(superadmin)/README.md`](../apps/web/src/app/(superadmin)/README.md)** 🟠 HIGH - Super admin section
- **[`apps/web/src/lib/README.md`](../apps/web/src/lib/README.md)** 🟠 HIGH - Web lib documentation
- **[`apps/web/src/server/payments/README.md`](../apps/web/src/server/payments/README.md)** 🟠 HIGH - Payment server
- **[`apps/web/audio-player-enhancement.md`](../apps/web/audio-player-enhancement.md)** 🟠 HIGH - 🆕 Web audio player enhancements
- **[`apps/web/CODEX-INTEGRATION.md`](../apps/web/CODEX-INTEGRATION.md)** 🔴 CRITICAL - 🆕 CODEX AI integration with web app development and automated fixes


### **UI Package**
- **[`packages/ui/`](../packages/ui/)** 🟠 HIGH - UI package (see design-system/ for details)

---

## 🛠️ **MAINTENANCE & TROUBLESHOOTING**

### **Problem Reports**
- **[`reports/STORYBOOK-CSS-PROBLEM-SOLUTION-REPORT.md`](reports/STORYBOOK-CSS-PROBLEM-SOLUTION-REPORT.md)** 🟡 MEDIUM - Storybook CSS issues and solutions
- **[`reports/GOTMUSIC_DEBUGGING_TIMELINE.md`](reports/GOTMUSIC_DEBUGGING_TIMELINE.md)** 🟠 HIGH - Debugging history and solutions
- **[`reports/MOBILE-DEBUGGING-TIMELINE.md`](reports/MOBILE-DEBUGGING-TIMELINE.md)** 🟠 HIGH - Mobile app debugging history and solutions
- **[`reports/BLOCKCHAIN-INTEGRATION-ISSUES.md`](reports/BLOCKCHAIN-INTEGRATION-ISSUES.md)** 🟠 HIGH - Blockchain integration issues and solutions
- **[`reports/POLYFILL-COMPATIBILITY-REPORT.md`](reports/POLYFILL-COMPATIBILITY-REPORT.md)** 🟠 HIGH - Node.js polyfill compatibility report

### **Maintenance Guides**
> **⚠️ ALL MAINTENANCE FILES MISSING** - See Missing Documentation section below

### **Public Documentation**
> **⚠️ ALL PUBLIC DOCUMENTATION FILES MISSING** - See Missing Documentation section below

---

## 🚫 **MISSING DOCUMENTATION**

> **⚠️ CRITICAL DATA LOSS:** The following files were lost during git resets and need to be recovered or recreated.

### **🔴 CRITICAL MISSING FILES**
- **[`AUTH-MASTER.md`](AUTH-MASTER.md)** 🔴 CRITICAL 🚫 **MISSING** - Authentication & Wallet Linking epic documentation
- **[`core/GOTMUSIC_PROJECT_SUMMARY.md`](core/GOTMUSIC_PROJECT_SUMMARY.md)** 🔴 CRITICAL 🚫 **MISSING** - Complete project overview and changelog
- **[`workflows/ISSUE-PR-WORKFLOW.md`](workflows/ISSUE-PR-WORKFLOW.md)** 🔴 CRITICAL 🚫 **MISSING** - Branch naming, commits, PRs, closes
- **[`workflows/CODEX-PROMPT.md`](workflows/CODEX-PROMPT.md)** 🔴 CRITICAL 🚫 **MISSING** - 🆕 CODEX AI prompt template for development workflow
- **[`workflows/CODEX-RULES.md`](workflows/CODEX-RULES.md)** 🔴 CRITICAL 🚫 **MISSING** - 🆕 CODEX AI rules and guidelines for development
- **[`design-system/PREMIER-CROSS-PLATFORM-STRATEGY.md`](design-system/PREMIER-CROSS-PLATFORM-STRATEGY.md)** 🔴 CRITICAL 🚫 **MISSING** - 🆕 Premier cross-platform design system strategy for web, mobile, desktop, DAW
- **[`design-system/pathways/USER-PATHWAYS.md`](design-system/pathways/USER-PATHWAYS.md)** 🔴 CRITICAL 🚫 **MISSING** - Complete user journey specifications
- **[`ci-cd/CODEX-WORKFLOW.md`](ci-cd/CODEX-WORKFLOW.md)** 🔴 CRITICAL 🚫 **MISSING** - 🆕 CODEX AI integration with CI/CD pipeline and automated PR management
- **[`studio/CODEX-STUDIO-ENHANCEMENTS.md`](studio/CODEX-STUDIO-ENHANCEMENTS.md)** 🔴 CRITICAL 🚫 **MISSING** - 🆕 CODEX-enhanced studio pages with fallback data and professional UX

### **🟠 HIGH PRIORITY MISSING FILES**
- **[`core/OPEN-ISSUES-SUMMARY.md`](core/OPEN-ISSUES-SUMMARY.md)** 🟠 HIGH 🚫 **MISSING** - All GitHub issues organized by priority
- **[`guides/STORYBOOK-GUIDE.md`](guides/STORYBOOK-GUIDE.md)** 🟠 HIGH 🚫 **MISSING** - Complete Storybook development guide
- **[`guides/SAFE-WORK-CHECKLIST.md`](guides/SAFE-WORK-CHECKLIST.md)** 🟠 HIGH 🚫 **MISSING** - Safety checklist for development
- **[`guides/NEXTJS-COMPLIANCE-2025.md`](guides/NEXTJS-COMPLIANCE-2025.md)** 🟠 HIGH 🚫 **MISSING** - Next.js App Router best practices and compliance guide
- **[`architecture/mobile-authentication.md`](architecture/mobile-authentication.md)** 🟠 HIGH 🚫 **MISSING** - Mobile authentication architecture
- **[`architecture/blockchain-services.md`](architecture/blockchain-services.md)** 🟠 HIGH 🚫 **MISSING** - Blockchain service architecture
- **[`architecture/cross-chain-payments.md`](architecture/cross-chain-payments.md)** 🟠 HIGH 🚫 **MISSING** - Cross-chain payment architecture
- **[`design-system/specifications/ui-package.md`](design-system/specifications/ui-package.md)** 🟠 HIGH 🚫 **MISSING** - UI package specification
- **[`design-system/foundations/color.md`](design-system/foundations/color.md)** 🟠 HIGH 🚫 **MISSING** - Color system and tokens
- **[`design-system/foundations/typography.md`](design-system/foundations/typography.md)** 🟠 HIGH 🚫 **MISSING** - Typography system
- **[`design-system/foundations/tokens.md`](design-system/foundations/tokens.md)** 🟠 HIGH 🚫 **MISSING** - Design tokens
- **[`api/mobile-env.md`](api/mobile-env.md)** 🟠 HIGH 🚫 **MISSING** - Mobile app environment configuration
- **[`api/blockchain-apis.md`](api/blockchain-apis.md)** 🟠 HIGH 🚫 **MISSING** - Blockchain API integrations
- **[`reports/E18E-INTEGRATION.md`](reports/E18E-INTEGRATION.md)** 🟠 HIGH 🚫 **MISSING** - e18e performance standards integration
- **[`reports/E18E-RECOMMENDATIONS.md`](reports/E18E-RECOMMENDATIONS.md)** 🟠 HIGH 🚫 **MISSING** - e18e recommendations and performance guidelines
- **[`studio/README.md`](studio/README.md)** 🟠 HIGH 🚫 **MISSING** - Studio documentation

### **🟡 MEDIUM PRIORITY MISSING FILES**
- **[`core/KNOWLEDGE-UPDATE-SUMMARY.md`](core/KNOWLEDGE-UPDATE-SUMMARY.md)** 🟡 MEDIUM 🚫 **MISSING** - Documentation changelog and updates
- **[`workflows/GIT-CONFIG-SPEEDUPS.md`](workflows/GIT-CONFIG-SPEEDUPS.md)** 🟡 MEDIUM 🚫 **MISSING** - Git configuration optimizations
- **[`workflows/PAT-SETUP.md`](workflows/PAT-SETUP.md)** 🟡 MEDIUM 🚫 **MISSING** - Personal Access Token setup
- **[`workflows/STORYBOOK-WORKFLOW.md`](workflows/STORYBOOK-WORKFLOW.md)** 🟡 MEDIUM 🚫 **MISSING** - Storybook development workflow
- **[`design-system/foundations/mapping.md`](design-system/foundations/mapping.md)** 🟡 MEDIUM 🚫 **MISSING** - Token mapping
- **[`adr/ADR-0003-audio-player-architecture.md`](adr/ADR-0003-audio-player-architecture.md)** 🟣 DECISION 🚫 **MISSING** - 🆕 Audio player architecture decision
- **[`adr/ADR-0004-desktop-technology-stack.md`](adr/ADR-0004-desktop-technology-stack.md)** 🟣 DECISION 🚫 **MISSING** - 🆕 Desktop technology stack decision
- **[`adr/ADR-0005-storage-cdn-strategy.md`](adr/ADR-0005-storage-cdn-strategy.md)** 🟣 DECISION 🚫 **MISSING** - 🆕 Storage and CDN strategy decision
- **[`adr/ADR-0006-apple-policy-compliance.md`](adr/ADR-0006-apple-policy-compliance.md)** 🟣 DECISION 🚫 **MISSING** - 🆕 Apple policy compliance strategy
- **[`maintenance/tailwind-nativewind-strategy.md`](maintenance/tailwind-nativewind-strategy.md)** 🟡 MEDIUM 🚫 **MISSING** - Tailwind/NativeWind strategy
- **[`maintenance/upgrade-storybook.md`](maintenance/upgrade-storybook.md)** 🟡 MEDIUM 🚫 **MISSING** - Storybook upgrade guide
- **[`maintenance/mobile-polyfills.md`](maintenance/mobile-polyfills.md)** 🟡 MEDIUM 🚫 **MISSING** - Mobile app polyfill maintenance
- **[`maintenance/blockchain-dependencies.md`](maintenance/blockchain-dependencies.md)** 🟡 MEDIUM 🚫 **MISSING** - Blockchain dependency management
- **[`maintenance/expo-upgrades.md`](maintenance/expo-upgrades.md)** 🟡 MEDIUM 🚫 **MISSING** - Expo SDK upgrade procedures

### **🔵 INTEGRATION FILES (ALL MISSING)**
- **[`integrations/daw-bridge.md`](integrations/daw-bridge.md)** 🟠 HIGH 🚫 **MISSING** - DAW bridge integration
- **[`integrations/lit/spec.md`](integrations/lit/spec.md)** 🟠 HIGH 🚫 **MISSING** - Lit integration specification
- **[`integrations/avail-nexus.md`](integrations/avail-nexus.md)** 🟠 HIGH 🚫 **MISSING** - Avail Nexus cross-chain integration
- **[`integrations/blockscout.md`](integrations/blockscout.md)** 🟠 HIGH 🚫 **MISSING** - Blockscout blockchain explorer integration
- **[`integrations/pyusd.md`](integrations/pyusd.md)** 🟠 HIGH 🚫 **MISSING** - PayPal USD stablecoin integration
- **[`integrations/passkey-wallets.md`](integrations/passkey-wallets.md)** 🟠 HIGH 🚫 **MISSING** - Passkey wallet integration
- **[`integrations/biometric-signing.md`](integrations/biometric-signing.md)** 🟠 HIGH 🚫 **MISSING** - Biometric transaction signing
- **[`integrations/juce-framework.md`](integrations/juce-framework.md)** 🟠 HIGH 🚫 **MISSING** - 🆕 JUCE C++ framework integration
- **[`integrations/spotify-architecture.md`](integrations/spotify-architecture.md)** 🟡 MEDIUM 🚫 **MISSING** - 🆕 Spotify technical architecture analysis
- **[`integrations/field-plugin-analysis.md`](integrations/field-plugin-analysis.md)** 🟡 MEDIUM 🚫 **MISSING** - 🆕 Field plugin architecture analysis
- **[`integrations/apple-policy-compliance.md`](integrations/apple-policy-compliance.md)** 🟠 HIGH 🚫 **MISSING** - 🆕 Apple App Store policy compliance

### **🔵 PAYMENTS & CONTRACTS (ALL MISSING)**
- **[`payments/pyusd-avail.md`](payments/pyusd-avail.md)** 🟠 HIGH 🚫 **MISSING** - PyUSD availability
- **[`contracts/layaway-escrow.md`](contracts/layaway-escrow.md)** 🟠 HIGH 🚫 **MISSING** - Layaway escrow contract

### **🔵 ATTESTATIONS & OPERATIONS (ALL MISSING)**
- **[`attestations/eas-schemas.md`](attestations/eas-schemas.md)** 🟠 HIGH 🚫 **MISSING** - EAS schemas
- **[`operations/audio.md`](operations/audio.md)** 🟠 HIGH 🚫 **MISSING** - Audio operations
- **[`operations/blockscout.md`](operations/blockscout.md)** 🟡 MEDIUM 🚫 **MISSING** - Blockscout operations

### **🟢 LOW PRIORITY MISSING FILES**
- **[`JUDGE-RUNBOOK.md`](JUDGE-RUNBOOK.md)** 🟢 LOW 🚫 **MISSING** - Judge evaluation runbook

---

## 📋 **QUICK REFERENCE**

### **Task-Based Navigation**

| Task | Read These Files |
|------|------------------|
| **🔴 Start new feature** | [`workflows/AGENT-START.md`](workflows/AGENT-START.md) → [`core/EXECUTION-CHECKLIST.md`](core/EXECUTION-CHECKLIST.md) → [`workflows/ISSUE-PR-WORKFLOW.md`](workflows/ISSUE-PR-WORKFLOW.md) |
| **🔴 Fix bug** | [`architecture/data-model.md`](architecture/data-model.md) → [`testing/e2e.md`](testing/e2e.md) |
| **🔴 CI failure** | [`core/EXECUTION-CHECKLIST.md`](core/EXECUTION-CHECKLIST.md) (Section 8) → [`testing/e2e.md`](testing/e2e.md) |
| **🔴 API change** | [`architecture/data-model.md`](architecture/data-model.md) → [`architecture/flows.md`](architecture/flows.md) |
| **🟠 Merge multiple PRs** | [`workflows/AUTO-MERGE-PATTERN.md`](workflows/AUTO-MERGE-PATTERN.md) → [`workflows/ISSUE-PR-WORKFLOW.md`](workflows/ISSUE-PR-WORKFLOW.md) |
| **🟣 Decision needed** | [`adr/`](adr/) (read existing, add new if needed) |
| **🟠 UI component** | [`guides/STORYBOOK-GUIDE.md`](guides/STORYBOOK-GUIDE.md) → [`design-system/pathways/USER-PATHWAYS.md`](design-system/pathways/USER-PATHWAYS.md) → [`design-system/README.md`](design-system/README.md) |
| **🟠 Performance issue** | [`reports/E18E-INTEGRATION.md`](reports/E18E-INTEGRATION.md) → [`.e18e-recommendations.md`](../.e18e-recommendations.md) |
| **🟠 Design system** | [`design-system/README.md`](design-system/README.md) → [`design-system/foundations/`](design-system/foundations/) → [`design-system/consistency/ci.md`](design-system/consistency/ci.md) |
| **🔴 Premier cross-platform design** | [`design-system/PREMIER-CROSS-PLATFORM-STRATEGY.md`](design-system/PREMIER-CROSS-PLATFORM-STRATEGY.md) → [`design-system/GLASS-NEUMORPHIC-HYBRID.md`](design-system/GLASS-NEUMORPHIC-HYBRID.md) → [`design-system/README.md`](design-system/README.md) → [`design-system/foundations/`](design-system/foundations/) |
| **🟠 Mobile feature** | [`apps/mobile/features/`](../apps/mobile/features/) → [`architecture/mobile-authentication.md`](architecture/mobile-authentication.md) → [`integrations/`](integrations/) |
| **🔴 Mobile implementation** | [`mobile/MOBILE-IMPLEMENTATION-ROADMAP.md`](mobile/MOBILE-IMPLEMENTATION-ROADMAP.md) → [`apps/mobile/README.md`](../apps/mobile/README.md) → [`workflows/CODEX-INTEGRATION.md`](workflows/CODEX-INTEGRATION.md) |
| **🟠 Blockchain integration** | [`integrations/`](integrations/) → [`architecture/blockchain-services.md`](architecture/blockchain-services.md) → [`api/blockchain-apis.md`](api/blockchain-apis.md) |
| **🟠 Authentication issue** | [`apps/mobile/features/authentication.md`](../apps/mobile/features/authentication.md) → [`integrations/passkey-wallets.md`](integrations/passkey-wallets.md) → [`integrations/biometric-signing.md`](integrations/biometric-signing.md) |
| **🟠 Polyfill issue** | [`reports/POLYFILL-COMPATIBILITY-REPORT.md`](reports/POLYFILL-COMPATIBILITY-REPORT.md) → [`maintenance/mobile-polyfills.md`](maintenance/mobile-polyfills.md) |
| **🟠 Component protection** | [`components/HOW-IT-WORKS-CURRENT-STATE.md`](components/HOW-IT-WORKS-CURRENT-STATE.md) → [`components/BRANDS-APIS-CURRENT-STATE.md`](components/BRANDS-APIS-CURRENT-STATE.md) |
| **🔴 Audio player development** | [`architecture/audio-player-system.md`](architecture/audio-player-system.md) → [`architecture/desktop-standalone.md`](architecture/desktop-standalone.md) → [`integrations/juce-framework.md`](integrations/juce-framework.md) |
| **🔴 Hackathon audio player** | [`architecture/hackathon-audio-player.md`](architecture/hackathon-audio-player.md) → [`architecture/hackathon-implementation-plan.md`](architecture/hackathon-implementation-plan.md) → [`architecture/web-audio-enhancement.md`](architecture/web-audio-enhancement.md) |
| **🔴 Web waveform player** | [`architecture/web-audio-enhancement.md`](architecture/web-audio-enhancement.md) → [`architecture/30s-preview-logic.md`](architecture/30s-preview-logic.md) → [`design-system/audio/audio-quality-standards.md`](design-system/audio/audio-quality-standards.md) |
| **🔴 Mobile waveform player** | [`architecture/mobile-waveform-player.md`](architecture/mobile-waveform-player.md) → [`architecture/30s-preview-logic.md`](architecture/30s-preview-logic.md) → [`design-system/audio/audio-quality-standards.md`](design-system/audio/audio-quality-standards.md) |
| **🟠 Desktop development** | [`apps/desktop/README.md`](../apps/desktop/README.md) → [`integrations/juce-framework.md`](integrations/juce-framework.md) → [`architecture/desktop-standalone.md`](architecture/desktop-standalone.md) |
| **🟠 Audio quality** | [`architecture/audio-quality-pipeline.md`](architecture/audio-quality-pipeline.md) → [`design-system/audio/audio-quality-standards.md`](design-system/audio/audio-quality-standards.md) |
| **🟠 Storage & CDN** | [`architecture/storage-cdn-strategy.md`](architecture/storage-cdn-strategy.md) → [`integrations/spotify-architecture.md`](integrations/spotify-architecture.md) |
| **🔴 CODEX integration** | [`workflows/CODEX-INTEGRATION.md`](workflows/CODEX-INTEGRATION.md) → [`ci-cd/CODEX-WORKFLOW.md`](ci-cd/CODEX-WORKFLOW.md) → [`studio/CODEX-STUDIO-ENHANCEMENTS.md`](studio/CODEX-STUDIO-ENHANCEMENTS.md) |
| **🔴 CODEX PR management** | [`ci-cd/CODEX-WORKFLOW.md`](ci-cd/CODEX-WORKFLOW.md) → [`workflows/AUTO-MERGE-PATTERN.md`](workflows/AUTO-MERGE-PATTERN.md) → [`workflows/ISSUE-PR-WORKFLOW.md`](workflows/ISSUE-PR-WORKFLOW.md) |
| **🔴 Parallel development** | [`DUAL-BUILD.md`](DUAL-BUILD.md) → [`workflows/CODEX-INTEGRATION.md`](workflows/CODEX-INTEGRATION.md) → [`workflows/AUTO-MERGE-PATTERN.md`](workflows/AUTO-MERGE-PATTERN.md) |

### **File Categories**

| Category | Count | Location | Priority |
|----------|-------|----------|----------|
| **🔴 Core Docs** | 4 | `docs.d/core/` | CRITICAL |
| **🔴 Workflows** | 8 | `docs.d/workflows/` | CRITICAL |
| **🔴 Architecture** | 16 | `docs.d/architecture/` | CRITICAL |
| **🟠 Design System** | 26 | `docs.d/design-system/` | HIGH |
| **🟠 Guides** | 2 | `docs.d/guides/` | HIGH |
| **🟠 Reports** | 5 | `docs.d/reports/` | HIGH |
| **🟠 Technical** | 8 | `docs.d/` (various subdirs) | HIGH |
| **🟠 Components** | 2 | `docs.d/components/` | HIGH |
| **🟠 App Docs** | 15 | `apps/` (various) | HIGH |
| **🟡 Maintenance** | 5 | `docs.d/maintenance/` | MEDIUM |
| **🟢 Public Docs** | 1 | `docs.d/` (root) | LOW |
| **🟣 ADRs** | 6 | `docs.d/adr/` | DECISION |
| **🔴 CI/CD** | 3 | `docs.d/ci-cd/` | CRITICAL |
| **🔴 Studio** | 2 | `docs.d/studio/` | CRITICAL |
| **Total** | **98** | **All organized** | **Color-coded** |

---

## 🎯 **USAGE INSTRUCTIONS**

1. **🔴 For new development:** Start with [`workflows/AGENT-START.md`](workflows/AGENT-START.md)
2. **🔴 For debugging:** Check [`reports/GOTMUSIC_DEBUGGING_TIMELINE.md`](reports/GOTMUSIC_DEBUGGING_TIMELINE.md)
3. **🔴 For architecture:** Review [`architecture/overview.md`](architecture/overview.md)
4. **🟠 For UI work:** Use [`guides/STORYBOOK-GUIDE.md`](guides/STORYBOOK-GUIDE.md)
5. **🟠 For performance:** Check [`reports/E18E-INTEGRATION.md`](reports/E18E-INTEGRATION.md)
6. **🔴 For mobile development:** Start with [`apps/mobile/README.md`](../apps/mobile/README.md)
7. **🟠 For blockchain integration:** Review [`integrations/`](integrations/) directory
8. **🟠 For authentication:** Check [`apps/mobile/features/authentication.md`](../apps/mobile/features/authentication.md)
9. **🟠 For polyfill issues:** See [`reports/POLYFILL-COMPATIBILITY-REPORT.md`](reports/POLYFILL-COMPATIBILITY-REPORT.md)
10. **🔴 For audio player development:** Start with [`architecture/audio-player-system.md`](architecture/audio-player-system.md)
11. **🟠 For desktop development:** Start with [`apps/desktop/README.md`](../apps/desktop/README.md)
12. **🟠 For audio quality:** Review [`architecture/audio-quality-pipeline.md`](architecture/audio-quality-pipeline.md)
13. **🟠 For storage & CDN:** Check [`architecture/storage-cdn-strategy.md`](architecture/storage-cdn-strategy.md)
14. **🔴 For Studio/Console refactor:** Start with [`STUDIO-CONSOLE-REFACTOR.md`](STUDIO-CONSOLE-REFACTOR.md)
15. **🔴 For local CI setup:** Check [`scripts/README.md`](../scripts/README.md)
16. **🔴 For CI/CD pipeline:** Start with [`ci-cd/README.md`](ci-cd/README.md)
17. **🔴 For CI/CD operations:** Check [`ci-cd/CI-CD-GUIDE.md`](ci-cd/CI-CD-GUIDE.md)
18. **🔴 For parallel development:** Start with [`DUAL-BUILD.md`](DUAL-BUILD.md)
19. **🔴 For mobile implementation:** Start with [`mobile/MOBILE-IMPLEMENTATION-ROADMAP.md`](mobile/MOBILE-IMPLEMENTATION-ROADMAP.md)

---

## 🌈 **COLOR CODING LEGEND**

| Color | Priority | Description | Usage |
|-------|----------|-------------|-------|
| 🔴 **CRITICAL** | P0 | Must-read, core functionality | Core docs, workflows, architecture |
| 🟠 **HIGH** | P1 | Important implementation details | Technical specs, integrations |
| 🟡 **MEDIUM** | P2 | Technical specifications | Guides, maintenance |
| 🟢 **LOW** | P3 | Reference materials | Public docs, legacy |
| 🔵 **INFO** | P4 | Background information | Context, explanations |
| 🟣 **DECISION** | P5 | Architecture decisions | ADRs, strategic choices |
| ⚫ **LEGACY** | P6 | Deprecated/old information | Historical, outdated |

---

**Last Updated:** 2025-10-25  
**Total Files Indexed:** 49 markdown files (52 missing)  
**Status:** 🟡 **PARTIAL** - Many critical files missing  
**Mobile Features:** ✅ **COMPREHENSIVE**  
**Blockchain Integration:** 🚫 **MISSING** - All integration docs lost  
**Audio Player System:** ✅ **COMPREHENSIVE**  
**Desktop Application:** ✅ **COMPLETE**  
**Storage & CDN:** ✅ **COMPLETE**  
**CI/CD Pipeline:** 🟡 **PARTIAL** - Some files missing  
**CODEX AI Integration:** 🟡 **PARTIAL** - Some files missing  
**Documentation Organization:** 🚫 **CRITICAL DATA LOSS** - Many files lost during git resets

---

*This index is the single source of truth for all documentation navigation with comprehensive color coding for easy identification.*