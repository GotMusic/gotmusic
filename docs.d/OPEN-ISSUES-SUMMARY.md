# GotMusic - Open Issues Summary
**Generated:** 2025-10-20  
**Total Open Issues:** 29

---

## 🎯 **CONSOLIDATED PRIORITY LIST**

### **P0 - CRITICAL (Must Complete First)**
1. **#251** - ci(e2e): re-enable Playwright tests with authentication and database setup [M]
2. **#249** - feat(web): add middleware development auto-login with health allowlist [M]
3. **#248** - feat(auth): implement HMAC-signed session cookies for security [S]

### **P1 - HIGH PRIORITY (Core Features)**
4. **#250** - feat(web): implement EIP-1193 wallet connection MVP [S]
5. **#252** - feat(mobile): add biometric authentication gate for decrypt flow [M]
6. **#200** - contracts: SubscriptionManager.sol (PYUSD) + CreditBank.sol [M]
7. **#201** - db: subscriptions & creditTransactions tables [S]
8. **#202** - api: POST /api/subscriptions/subscribe → build Nexus intent [S]
9. **#203** - api: POST /api/subscriptions/webhook → mark paid & mint credits [S]
10. **#204** - api: POST /api/credits/spend → buy asset with credits [S]

### **P2 - MEDIUM PRIORITY (Business Features)**
11. **#205** - web: Account page (plan picker) + Subscribe button [S]
12. **#206** - web: Buy with Credits button on Asset page/card [S]
13. **#209** - tests: API + E2E for recording & credits [M]
14. **#208** - docs: flows & diagrams update (recording, subscribe→credits, buy with credits) [S]
15. **#207** - ops: Webhook wire-up (explorer/Nexus) + .env docs [S]

### **P3 - LOW PRIORITY (Polish & Documentation)**
16. **#212** - web: Light theme variant + theme toggle [S]
17. **#211** - mobile: Biometric gate before Decrypt & Play (stub) [S]
18. **#69** - feature(storage): preview generator stub + waveform placeholder [M]
19. **#83** - task(mobile): MMKV cache persist (flagged) [S]
20. **#84** - task(mobile): deep link gotmusic://asset/<id> [S]
21. **#127** - feature(mobile): decrypt & play (mock key, happy-path) [M]

---

## 🚨 **CRITICAL PATH ANALYSIS**

### **Phase 1: UI Foundation (P0 - Must Complete First)**
- ~~**#192**~~ ✅ → ~~**#181**~~ ✅ → **#193**
- **Why:** All web/mobile UI depends on these components
- **Blocks:** #178, #179, #182 (all UI work)

### **Phase 2: Core Application (P1 - Core Features)**
- **#178** → **#179** → **#180** (Web routes)
- **#182** (Mobile - can run parallel)
- **Why:** Core user-facing functionality
- **Dependencies:** Requires Phase 1 completion

### **Phase 3: Business Features (P2 - Revenue Features)**
- **#200** → **#201** → **#202** → **#203** → **#204** (Subscriptions)
- **#205** → **#206** (Web features)
- **Why:** Revenue-generating features
- **Dependencies:** Requires Phase 2 completion

### **Phase 4: Polish (P3-P4 - Documentation & Nice-to-Have)**
- **#177, #185, #208** (Documentation)
- **#184, #207** (Access & Operations)
- **#209, #212** (Testing & Polish)
- **#69, #83, #84, #127, #211** (Nice-to-have features)

---

## 📊 **SUMMARY BY AREA**

| Area | Count | Priority |
|------|-------|----------|
| **UI/UX** | 4 | P0-P1 (Critical) |
| **Web Routes** | 4 | P1 (High) |
| **Subscriptions** | 7 | P2 (Medium) |
| **Mobile** | 4 | P1-P4 (Mixed) |
| **Documentation** | 4 | P3 (Low) |

---

## 📊 **SUMMARY BY SIZE**

| Size | Count | Estimated Effort |
|------|-------|------------------|
| **S (Small)** | 12 | 1-2 hours each |
| **M (Medium)** | 8 | 2-4 hours each |
| **L (Large)** | 2 | 4-8 hours each |
| **XL (Extra Large)** | 1 | 8+ hours |

---

## 🎯 **NEXT IMMEDIATE ACTION**

**#193** - feat(ui): set up Storybook with accessibility checks and full component coverage [M]

**Priority:** P0 (Critical)  
**Size:** Medium (2-4 hours)  
**Status:** Ready to start  
**Dependencies:** ~~#192~~ ✅, ~~#181~~ ✅ (completed)  
**Blocks:** None (enables better component development workflow)

---

## 🔗 **Quick Links**

- **Project Board:** https://github.com/GotMusic/gotmusic/projects
- **Milestones:** https://github.com/GotMusic/gotmusic/milestones

---

**Last Updated:** 2025-10-18 (Homepage discovery redesign completed ✅ via PR #237 - separated discovery from catalog)  
**Next Priority:** #193 - Set up Storybook with accessibility checks