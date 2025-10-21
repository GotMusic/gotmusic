# GotMusic - Open Issues Summary
**Generated:** 2025-01-21  
**Total Open Issues:** 35  
**Storybook Status:** ✅ **FULLY OPERATIONAL** (v8.6.14 with all addons)

---

## 🎯 **CONSOLIDATED PRIORITY LIST**

### **P0 - CRITICAL (Must Complete First)**
1. **#261** - E2E Studio/Auth Flake Board - Systematic fixing of flaky E2E tests [M]
2. **#251** - ci(e2e): re-enable Playwright tests with authentication and database setup [M]
3. **#249** - feat(web): add middleware development auto-login with health allowlist [M]
4. **#248** - feat(auth): implement HMAC-signed session cookies for security [S]

### **P1 - HIGH PRIORITY (Core Features)**
5. **#250** - feat(web): implement EIP-1193 wallet connection MVP [S]
6. **#252** - feat(mobile): add biometric authentication gate for decrypt flow [M]
7. **#262** - ui(storybook): Shop catalog components (cards, grid, filters) [M]
8. **#263** - ui(storybook): Audio player components (main, mini, controls) [M]
9. **#265** - ui(storybook): Upload components (drag-drop, progress, validation) [M]
10. **#266** - ui(storybook): Asset management components (tiles, metadata, status) [M]
11. **#274** - perf(e18e): Monorepo-wide performance optimization [L]

### **P2 - MEDIUM PRIORITY (Business Features)**
12. **#264** - ui(storybook): Commerce components (buy, checkout, pricing) [M]
13. **#267** - ui(storybook): Pricing components (fields, selectors, validation) [S]
14. **#268** - ui(storybook): Admin dashboard components (flags, audit, health) [S]
15. **#270** - ui(storybook): Core UI components (buttons, cards, inputs) [M]
16. **#271** - ui(storybook): Feedback components (toasts, modals, alerts) [S]
17. **#272** - perf(e18e): Bundle optimization and dependency cleanup [M]
18. **#273** - perf(storybook): Performance monitoring and optimization [S]
19. **#200** - contracts: SubscriptionManager.sol (PYUSD) + CreditBank.sol [M]
20. **#201** - db: subscriptions & creditTransactions tables [S]
21. **#202** - api: POST /api/subscriptions/subscribe → build Nexus intent [S]
22. **#203** - api: POST /api/subscriptions/webhook → mark paid & mint credits [S]
23. **#204** - api: POST /api/credits/spend → buy asset with credits [S]

### **P3 - LOW PRIORITY (Polish & Documentation)**
24. **#269** - ui(storybook): User management components (roles, permissions, status) [S]
25. **#205** - web: Account page (plan picker) + Subscribe button [S]
26. **#206** - web: Buy with Credits button on Asset page/card [S]
27. **#209** - tests: API + E2E for recording & credits [M]
28. **#208** - docs: flows & diagrams update (recording, subscribe→credits, buy with credits) [S]
29. **#207** - ops: Webhook wire-up (explorer/Nexus) + .env docs [S]
30. **#212** - web: Light theme variant + theme toggle [S]
31. **#211** - mobile: Biometric gate before Decrypt & Play (stub) [S]
32. **#69** - feature(storage): preview generator stub + waveform placeholder [M]
33. **#83** - task(mobile): MMKV cache persist (flagged) [S]
34. **#84** - task(mobile): deep link gotmusic://asset/<id> [S]
35. **#127** - feature(mobile): decrypt & play (mock key, happy-path) [M]

---

## 🚨 **CRITICAL PATH ANALYSIS**

### **Phase 1: UI Foundation (P0 - Must Complete First)**
- **#261** → **#251** → **#249** → **#248**
- **Why:** All web/mobile UI depends on these components
- **Blocks:** All UI work and E2E testing

### **Phase 2: Core Application (P1 - Core Features)**
- **#250** (Web wallet connection)
- **#252** (Mobile biometric auth)
- **#262-266** (Storybook UI components)
- **#274** (Performance optimization)
- **Why:** Core user-facing functionality
- **Dependencies:** Requires Phase 1 completion

### **Phase 3: Business Features (P2 - Revenue Features)**
- **#200** → **#201** → **#202** → **#203** → **#204** (Subscriptions)
- **#205** → **#206** (Web features)
- **#267-273** (Additional UI components)
- **Why:** Revenue-generating features
- **Dependencies:** Requires Phase 2 completion

### **Phase 4: Polish (P3 - Documentation & Nice-to-Have)**
- **#269** (User management UI)
- **#177, #185, #208** (Documentation)
- **#184, #207** (Access & Operations)
- **#209, #212** (Testing & Polish)
- **#69, #83, #84, #127, #211** (Nice-to-have features)

---

## 📊 **SUMMARY BY AREA**

| Area | Count | Priority |
|------|-------|----------|
| **UI/Storybook** | 10 | P1-P2 (High-Medium) |
| **Performance** | 3 | P1-P2 (High-Medium) |
| **Web Routes** | 4 | P1 (High) |
| **Subscriptions** | 7 | P2 (Medium) |
| **Mobile** | 4 | P1-P3 (Mixed) |
| **Documentation** | 4 | P3 (Low) |

---

## 📊 **SUMMARY BY SIZE**

| Size | Count | Estimated Effort |
|------|-------|------------------|
| **S (Small)** | 18 | 1-2 hours each |
| **M (Medium)** | 12 | 2-4 hours each |
| **L (Large)** | 2 | 4-8 hours each |
| **XL (Extra Large)** | 1 | 8+ hours |

---

## 🎯 **NEXT IMMEDIATE ACTION**

**#261** - E2E Studio/Auth Flake Board - Systematic fixing of flaky E2E tests [M]

**Priority:** P0 (Critical)  
**Size:** Medium (2-4 hours)  
**Status:** Ready to start  
**Dependencies:** PR #260 ✅ (E2E CI split completed)  
**Blocks:** None (enables stable E2E testing for all future features)

---

## 🎨 **STORYBOOK EPIC STATUS**

### **✅ Storybook Epic: Component Development**
- **Total Issues:** 10 ✅ **CREATED**
- **Epic Labels:** `epic:storybook`, `type:ui`, `area:storybook`
- **Milestone:** [#6 - Storybook Epic: Component Development](https://github.com/GotMusic/gotmusic/milestone/6)
- **Status:** 🟢 **READY FOR DEVELOPMENT**

### **📋 Storybook Issues Breakdown**
1. **#262** - Shop catalog components (cards, grid, filters) [P1, M]
2. **#263** - Audio player components (main, mini, controls) [P1, M]
3. **#264** - Commerce components (buy, checkout, pricing) [P1, M]
4. **#265** - Upload components (drag-drop, progress, validation) [P1, M]
5. **#266** - Asset management components (tiles, metadata, status) [P1, M]
6. **#267** - Pricing components (fields, selectors, validation) [P2, S]
7. **#268** - Admin dashboard components (flags, audit, health) [P2, S]
8. **#269** - User management components (roles, permissions, status) [P3, S]
9. **#270** - Core UI components (buttons, cards, inputs) [P2, M]
10. **#271** - Feedback components (toasts, modals, alerts) [P2, S]

### **🎯 Storybook Development Status**
- **All Issues Created:** ✅ 10/10 issues created with proper labels
- **Milestone Assigned:** ✅ Milestone #6 created and assigned
- **Pathways Covered:** ✅ Shop, Studio, Admin, Foundation
- **E2E Isolation:** ✅ Strategy implemented
- **Ready for Development:** ✅ All issues ready for assignment

---

## ⚡ **PERFORMANCE OPTIMIZATION STATUS**

### **✅ e18e Performance Standards Integration**
- **#272** - perf(e18e): Bundle optimization and dependency cleanup [P2, M]
- **#273** - perf(storybook): Performance monitoring and optimization [P2, S]
- **#274** - perf(e18e): Monorepo-wide performance optimization [P1, L]

### **📊 Performance Goals**
- **Bundle Size**: < 100KB per component
- **Build Time**: < 30 seconds
- **Dependencies**: Within budget limits
- **Tree Shaking**: Enabled for all imports
- **Code Splitting**: Implemented for vendor libraries

---

## 🔗 **Quick Links**

- **Project Board:** https://github.com/GotMusic/gotmusic/projects
- **Milestones:** https://github.com/GotMusic/gotmusic/milestones
- **Storybook Epic:** [#6 - Storybook Epic: Component Development](https://github.com/GotMusic/gotmusic/milestone/6)
- **All Storybook Issues:** [View all Storybook issues](https://github.com/GotMusic/gotmusic/issues?q=is%3Aissue+is%3Aopen+label%3Aepic%3Astorybook)

---

## 📈 **RECENT COMPLETIONS**

### **✅ Recently Closed Issues**
- **#247** - feat(db): add Neon database integration with SSL pooling ✅
- **#245** - feat(web): add Brands & APIs section to homepage ✅
- **#240** - feat(web): unify Zod v4 and eliminate resolver coupling ✅
- **#239** - chore(mobile): upgrade expo to SDK 54 ✅
- **#236** - feat(web): high-energy homepage separate from catalog ✅
- **#235** - fix(web): navigation bugs - studio redirect and missing asset detail route ✅
- **#215** - feat(tokens): comprehensive dark theme design system v0.2.0 ✅
- **#210** - security: deny-by-default ACC + no secrets + rate limits ✅

### **🎯 Storybook Infrastructure Complete**
- **Storybook v9.1.13** - Latest version with full compatibility
- **19 Component Stories** - Comprehensive coverage with all required story types
- **Performance Monitoring** - e18e compliance with real-time dashboard
- **CI/CD Workflow** - Non-blocking Storybook builds
- **Fixtures System** - Comprehensive mock data for all stories
- **Build System** - All packages building successfully

---

**Last Updated:** 2025-01-21 (Storybook Epic created ✅ - 10 issues ready for development)  
**Next Priority:** #261 - E2E Studio/Auth Flake Board - Systematic fixing of flaky E2E tests

---

## 🚀 **DEVELOPMENT RECOMMENDATIONS**

### **Immediate Actions (Next 48h)**
1. **Start with P0 Issues** - Begin with #261 (E2E Flake Board)
2. **Assign Storybook Issues** - Distribute #262-271 to available developers
3. **Set up Performance Monitoring** - Implement #272-274 for e18e compliance
4. **Create Development Branches** - Use `ui/<component>-<issue#>` format

### **Storybook Development Workflow**
1. **Create Branch** - Use `ui/<component>-<issue#>` format
2. **Add Labels** - Include `type:ui`, `area:storybook`, `design:playground`
3. **Build Component** - Follow design system tokens and accessibility standards
4. **Create Stories** - Include Primary, Variants, A11y, EdgeCases
5. **Test Performance** - Ensure bundle size < 100KB per component
6. **Submit PR** - Mark as draft for exploratory work

### **Quality Assurance**
- **Accessibility**: All components must pass A11y testing
- **Performance**: Bundle size and build time within budgets
- **Design**: Consistent with design system tokens
- **Documentation**: Complete API documentation with examples
- **Testing**: Visual regression and responsive testing