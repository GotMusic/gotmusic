# GotMusic - Open Issues Summary
**Generated:** 2025-10-17  
**Total Open Issues:** 35 (2 completed today)

---

## 🔥 P0 - Highest Priority (11 issues)

### UI Kit & Design System
- **#186** - feat(ui): set up @gotmusic/ui package with theme provider and token integration [M]
- **#187** - feat(ui): add primitive components (Slot, VisuallyHidden, Announcer) [S]
- **#188** - feat(ui): add form components (Field, Input, Select, Checkbox, Slider) [L]
- ~~**#189** - feat(ui): add feedback components (Toast, Skeleton) [M]~~ ✅ **COMPLETED**
- **#190** - feat(ui): add media components (Waveform, Player) [M]
- **#191** - feat(ui): add layout components (Card, Button, Badge, Tag) [M]
- **#181** - feat(ui): create catalog cards, players, and form components [L]

### Web & API
- **#178** - feat(web): implement (shop) routes - catalog, asset detail, checkout [L]
- **#179** - feat(web): implement (studio) routes - assets, uploads, sales [XL]
- **#180** - feat(audio): implement server-side processing pipeline [L]
- ~~**#183** - feat(api): add Studio endpoints - upload, assets, sales [M]~~ ✅ **COMPLETED**

---

## ⚡ P1 - High Priority (15 issues)

### Recording Pipeline (In Progress)
- **#197** - api: /api/recordings/sign (reuse signer) [S] ← **PR #217 AWAITING CI**
- ~~**#198** - api: /api/recordings/complete (create draft asset) [S]~~ ✅ **COMPLETED**
- ~~**#199** - mobile: Upload pipeline (sign → PUT → complete draft asset) [M]~~ ✅ **COMPLETED**

### Subscriptions & Credits
- **#200** - contracts: SubscriptionManager.sol (PYUSD) + CreditBank.sol [M]
- **#201** - db: subscriptions & creditTransactions tables [S]
- **#202** - api: POST /api/subscriptions/subscribe → build Nexus intent [S]
- **#203** - api: POST /api/subscriptions/webhook → mark paid & mint credits [S]
- **#204** - api: POST /api/credits/spend → buy asset with credits [S]
- **#210** - security: deny-by-default ACC + no secrets + rate limits [S]

### UI & Mobile
- **#192** - feat(web): integrate @gotmusic/ui package and migrate components [L]
- **#193** - feat(ui): set up Storybook with accessibility checks and full component coverage [M]
- **#182** - feat(mobile): implement browse, library, studio tabs and screens [L]

### Docs & Access
- **#177** - docs(design): add catalog card and player patterns [S]
- **#184** - feat(access): wire Lit ACC + Lighthouse to download endpoint [M]
- **#185** - docs(readme): update with new IA, roles, and environment variables [S]

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

## 🔹 P3 - Low Priority (5 issues)

### Mobile Enhancements
- **#83** - task(mobile): MMKV cache persist (flagged) [S]
- **#84** - task(mobile): deep link gotmusic://asset/<id> [S]
- **#127** - feature(mobile): decrypt & play (mock key, happy-path) [M]
- **#211** - mobile: Biometric gate before Decrypt & Play (stub) [S]

### Web Polish
- **#212** - web: Light theme variant + theme toggle [S]

---

## 📊 Summary by Area

| Area | Count | Notes |
|------|-------|-------|
| **UI Kit** | 9 | Most are P0 - critical for design system |
| **Web** | 7 | Mix of routes, features, polish |
| **API** | 6 | Recording pipeline + subscriptions |
| **Mobile** | 5 | Browse, library, studio screens |
| **Docs** | 3 | Design patterns, README, flows |
| **Data/Contracts** | 3 | DB schema + smart contracts |
| **Storage/Security** | 2 | Processing + hardening |
| **Testing/Ops** | 2 | E2E tests + webhooks |

---

## 📊 Summary by Size

| Size | Count | Estimated Effort |
|------|-------|------------------|
| **S (Small)** | 17 | 1-2 hours each |
| **M (Medium)** | 13 | 2-4 hours each |
| **L (Large)** | 6 | 4-8 hours each |
| **XL (Extra Large)** | 1 | 8+ hours |

---

## 🎯 Recommended Execution Order (Based on Dependencies)

### Phase 1: Recording Pipeline (Current)
1. ✅ **#194** - Mobile record screen (COMPLETED - PR #213)
2. ✅ **#196** - DB uploadJobs + priceCredits (COMPLETED - PR #216)
3. ⏳ **#197** - API /api/recordings/sign (IN PROGRESS - PR #217)
4. ⏭️ **#198** - API /api/recordings/complete
5. ⏭️ **#199** - Mobile upload pipeline

### Phase 2: UI Kit Foundation (Parallel Track)
1. **#186** - UI package setup
2. **#187** - Primitive components
3. **#191** - Layout components (Card, Button, Badge, Tag)
4. ~~**#189** - Feedback components (Toast, Skeleton)~~ ✅ **COMPLETED**
5. **#190** - Media components (Waveform, Player)
6. **#188** - Form components
7. **#181** - Catalog cards + players

### Phase 3: Subscriptions & Credits
1. **#200** - Smart contracts (SubscriptionManager + CreditBank)
2. **#201** - DB tables (subscriptions + creditTransactions)
3. **#202** - API subscribe endpoint
4. **#203** - API webhook endpoint
5. **#204** - API spend credits endpoint
6. **#205** - Web account page
7. **#206** - Web buy with credits button

### Phase 4: Web Routes
1. **#178** - Shop routes (catalog, asset detail, checkout)
2. **#179** - Studio routes (assets, uploads, sales)
3. ~~**#183** - Studio API endpoints~~ ✅ **COMPLETED**

### Phase 5: Mobile Features
1. **#182** - Browse, library, studio tabs

### Phase 6: Polish & Documentation
1. **#177** - Design patterns docs
2. **#185** - README update
3. **#208** - Flows & diagrams
4. **#209** - Additional tests
5. **#207** - Webhook setup
6. **#212** - Light theme

---

## 🚨 Critical Path Analysis

**Blocking Other Work:**
- **#186-#191** (UI Kit) → Blocks #178, #179, #181, #192 (all web/mobile UI)
- **#197-#198** (Recording APIs) → Blocks #199 (mobile upload)
- **#200-#201** (Contracts + DB) → Blocks #202-#206 (subscription features)

**Non-Blocking (Can Be Done Anytime):**
- #177, #185, #208 (Documentation)
- #209 (Additional tests)
- #210 (Security hardening)
- #212 (Light theme)
- #69 (Preview generator)

---

## 💡 Parallelization Strategy

**Track A: Recording Pipeline** (Sequential)
- Current: #197 → #198 → #199

**Track B: UI Kit** (Can run parallel to Track A)
- #186 → #187 → #191 → #189 → #190 → #188 → #181

**Track C: Subscriptions** (Can start after Track A completes)
- #200 → #201 → #202 → #203 → #204

**Track D: Documentation** (Can run anytime)
- #177, #185, #208

---

## 📅 Current Status

**Completed Today (2025-10-17):**
- ✅ #194 - Mobile record screen (PR #213)
- ✅ #215 - Token system v0.2.0 (PR #214)
- ✅ #196 - DB schema extensions (PR #216)
- ✅ #189 - feat(ui): add feedback components (Toast, Skeleton) (PR #225)
- ✅ #183 - feat(api): add Studio endpoints - upload, assets, sales (PR #226)

**In Progress:**
- ⏳ #197 - API recordings/sign (PR #217 - CI running)

**Next Up:**
- 🎯 #210 - security: deny-by-default ACC + no secrets + rate limits (P1, Small)

---

## 🔗 Quick Links

- **Current PR:** https://github.com/GotMusic/gotmusic/pull/217
- **Project Board:** https://github.com/GotMusic/gotmusic/projects
- **Milestones:** https://github.com/GotMusic/gotmusic/milestones

---

**Last Updated:** 2025-10-17 18:30 UTC  
**CI Status:** PR #217 running (5/6 checks passed, 1 pending)
**Recent Completions:** PR #225 (Toast/Skeleton) + PR #226 (Studio endpoints) merged successfully

