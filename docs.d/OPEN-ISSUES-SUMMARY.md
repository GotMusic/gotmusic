# GotMusic - Open Issues Summary
**Generated:** 2025-10-18  
**Total Open Issues:** 25

---

## 🔥 P0 - Highest Priority (4 issues)

### UI Kit & Design System
- **#181** - feat(ui): create catalog cards, players, and form components [L]

### Web & API
- **#178** - feat(web): implement (shop) routes - catalog, asset detail, checkout [L]
- **#179** - feat(web): implement (studio) routes - assets, uploads, sales [XL]
- **#180** - feat(audio): implement server-side processing pipeline [L]

---

## ⚡ P1 - High Priority (9 issues)

### Subscriptions & Credits
- **#200** - contracts: SubscriptionManager.sol (PYUSD) + CreditBank.sol [M]
- **#201** - db: subscriptions & creditTransactions tables [S]
- **#202** - api: POST /api/subscriptions/subscribe → build Nexus intent [S]
- **#203** - api: POST /api/subscriptions/webhook → mark paid & mint credits [S]
- **#204** - api: POST /api/credits/spend → buy asset with credits [S]

### UI & Mobile
- **#192** - feat(web): integrate @gotmusic/ui package and migrate components [L]
- **#193** - feat(ui): set up Storybook with accessibility checks and full component coverage [M]
- **#182** - feat(mobile): implement browse, library, studio tabs and screens [L]

### Docs & Access
- **#177** - docs(design): add catalog card and player patterns [S]

---

## 📝 P2 - Normal Priority (6 issues)

### Web Features
- **#205** - web: Account page (plan picker) + Subscribe button [S]
- **#206** - web: Buy with Credits button on Asset page/card [S]

### Operations & Testing
- **#207** - ops: Webhook wire-up (explorer/Nexus) + .env docs [S]
- **#208** - docs: flows & diagrams update (recording, subscribe→credits, buy with credits) [S]
- **#209** - tests: API + E2E for recording & credits [M]
- **#69** - feature(storage): preview generator stub + waveform placeholder [M]

---

## 🔹 P3 - Low Priority (6 issues)

### Mobile Enhancements
- **#83** - task(mobile): MMKV cache persist (flagged) [S]
- **#84** - task(mobile): deep link gotmusic://asset/<id> [S]
- **#127** - feature(mobile): decrypt & play (mock key, happy-path) [M]
- **#211** - mobile: Biometric gate before Decrypt & Play (stub) [S]

### Web Polish
- **#212** - web: Light theme variant + theme toggle [S]

### Access & Security
- **#184** - feat(access): wire Lit ACC + Lighthouse to download endpoint [M]
- **#185** - docs(readme): update with new IA, roles, and environment variables [S]

---

## 📊 Summary by Area

| Area | Count | Notes |
|------|-------|-------|
| **Web** | 7 | Mix of routes, features, polish |
| **API** | 5 | Subscriptions + processing |
| **Mobile** | 5 | Browse, library, studio screens |
| **UI Kit** | 2 | Catalog components + Storybook |
| **Docs** | 3 | Design patterns, README, flows |
| **Data/Contracts** | 2 | DB schema + smart contracts |
| **Storage/Security** | 2 | Processing + access control |
| **Testing/Ops** | 1 | E2E tests + webhooks |

---

## 📊 Summary by Size

| Size | Count | Estimated Effort |
|------|-------|------------------|
| **S (Small)** | 12 | 1-2 hours each |
| **M (Medium)** | 8 | 2-4 hours each |
| **L (Large)** | 4 | 4-8 hours each |
| **XL (Extra Large)** | 1 | 8+ hours |

---

## 🎯 Recommended Execution Order (Based on Dependencies)

### Phase 1: UI Integration (Current Priority)
1. **#192** - Integrate @gotmusic/ui package and migrate components
2. **#181** - Create catalog cards, players, and form components
3. **#193** - Set up Storybook with accessibility checks

### Phase 2: Web Routes
1. **#178** - Shop routes (catalog, asset detail, checkout)
2. **#179** - Studio routes (assets, uploads, sales)
3. **#180** - Audio processing pipeline

### Phase 3: Subscriptions & Credits
1. **#200** - Smart contracts (SubscriptionManager + CreditBank)
2. **#201** - DB tables (subscriptions + creditTransactions)
3. **#202** - API subscribe endpoint
4. **#203** - API webhook endpoint
5. **#204** - API spend credits endpoint
6. **#205** - Web account page
7. **#206** - Web buy with credits button

### Phase 4: Mobile Features
1. **#182** - Browse, library, studio tabs

### Phase 5: Polish & Documentation
1. **#177** - Design patterns docs
2. **#185** - README update
3. **#208** - Flows & diagrams
4. **#209** - Additional tests
5. **#207** - Webhook setup
6. **#212** - Light theme

---

## 🚨 Critical Path Analysis

**Blocking Other Work:**
- **#192** (UI Integration) → Blocks #178, #179, #181 (all web UI)
- **#200-#201** (Contracts + DB) → Blocks #202-#206 (subscription features)

**Non-Blocking (Can Be Done Anytime):**
- #177, #185, #208 (Documentation)
- #209 (Additional tests)
- #212 (Light theme)
- #69 (Preview generator)

---

## 💡 Parallelization Strategy

**Track A: UI Integration** (Sequential)
- Current: #192 → #181 → #193

**Track B: Web Routes** (Can run parallel to Track A)
- #178 → #179 → #180

**Track C: Subscriptions** (Can start after Track A completes)
- #200 → #201 → #202 → #203 → #204

**Track D: Documentation** (Can run anytime)
- #177, #185, #208

---

## 📅 Current Status

**In Progress:**
- None currently

**Next Up:**
- 🎯 #192 - feat(web): integrate @gotmusic/ui package and migrate components (P1, Large)

---

## 🔗 Quick Links

- **Project Board:** https://github.com/GotMusic/gotmusic/projects
- **Milestones:** https://github.com/GotMusic/gotmusic/milestones

---

**Last Updated:** 2025-10-18 03:15 UTC  
**Recent Completions:** 12 issues completed today (UI components, security hardening, recording pipeline)