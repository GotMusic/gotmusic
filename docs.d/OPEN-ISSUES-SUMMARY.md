# GotMusic - Open Issues Summary
**Generated:** 2025-10-18  
**Total Open Issues:** 25

---

## 🎯 **CONSOLIDATED PRIORITY LIST**

### **P0 - CRITICAL (Must Complete First)**
1. **#192** - feat(web): integrate @gotmusic/ui package and migrate components [L]
2. **#181** - feat(ui): create catalog cards, players, and form components [L]
3. **#193** - feat(ui): set up Storybook with accessibility checks and full component coverage [M]

### **P1 - HIGH PRIORITY (Core Features)**
4. **#178** - feat(web): implement (shop) routes - catalog, asset detail, checkout [L]
5. **#179** - feat(web): implement (studio) routes - assets, uploads, sales [XL]
6. **#180** - feat(audio): implement server-side processing pipeline [L]
7. **#182** - feat(mobile): implement browse, library, studio tabs and screens [L]

### **P2 - MEDIUM PRIORITY (Business Features)**
8. **#200** - contracts: SubscriptionManager.sol (PYUSD) + CreditBank.sol [M]
9. **#201** - db: subscriptions & creditTransactions tables [S]
10. **#202** - api: POST /api/subscriptions/subscribe → build Nexus intent [S]
11. **#203** - api: POST /api/subscriptions/webhook → mark paid & mint credits [S]
12. **#204** - api: POST /api/credits/spend → buy asset with credits [S]
13. **#205** - web: Account page (plan picker) + Subscribe button [S]
14. **#206** - web: Buy with Credits button on Asset page/card [S]

### **P3 - LOW PRIORITY (Polish & Documentation)**
15. **#177** - docs(design): add catalog card and player patterns [S]
16. **#184** - feat(access): wire Lit ACC + Lighthouse to download endpoint [M]
17. **#185** - docs(readme): update with new IA, roles, and environment variables [S]
18. **#207** - ops: Webhook wire-up (explorer/Nexus) + .env docs [S]
19. **#208** - docs: flows & diagrams update (recording, subscribe→credits, buy with credits) [S]
20. **#209** - tests: API + E2E for recording & credits [M]
21. **#212** - web: Light theme variant + theme toggle [S]

### **P4 - LOWEST PRIORITY (Nice to Have)**
22. **#69** - feature(storage): preview generator stub + waveform placeholder [M]
23. **#83** - task(mobile): MMKV cache persist (flagged) [S]
24. **#84** - task(mobile): deep link gotmusic://asset/<id> [S]
25. **#127** - feature(mobile): decrypt & play (mock key, happy-path) [M]
26. **#211** - mobile: Biometric gate before Decrypt & Play (stub) [S]

---

## 🚨 **CRITICAL PATH ANALYSIS**

### **Phase 1: UI Foundation (P0 - Must Complete First)**
- **#192** → **#181** → **#193**
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
| **UI/UX** | 6 | P0-P1 (Critical) |
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
| **L (Large)** | 4 | 4-8 hours each |
| **XL (Extra Large)** | 1 | 8+ hours |

---

## 🎯 **NEXT IMMEDIATE ACTION**

**#192** - feat(web): integrate @gotmusic/ui package and migrate components [L]

**Priority:** P0 (Critical)  
**Size:** Large (4-8 hours)  
**Status:** Ready to start  
**Dependencies:** None (can start immediately)  
**Blocks:** #178, #179, #181 (all web UI work)

---

## 🔗 **Quick Links**

- **Project Board:** https://github.com/GotMusic/gotmusic/projects
- **Milestones:** https://github.com/GotMusic/gotmusic/milestones

---

**Last Updated:** 2025-10-18 03:30 UTC  
**Next Priority:** #192 - Integrate @gotmusic/ui package