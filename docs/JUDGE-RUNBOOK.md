# GotMusic – Judge Runbook (2–3 Minutes)

Welcome! This is a **2–3 minute walkthrough** of GotMusic's core features for ETHOnline 2025 judges.

---

## 🎯 What is GotMusic?

**Producer-grade marketplace** for samples, beats, stems, and presets with:
- 💳 **PYUSD payments** (Ethereum → Avail Nexus → Base)
- 🔒 **Encrypted delivery** (Lighthouse + Lit Protocol)
- 📜 **Verifiable licenses** (EAS attestations on Base)
- 📱 **Cross-platform** (Web + Mobile)

---

## 🚀 Demo Flow (Follow Along)

### **1. Browse Catalog (30 seconds)**

**URL:** `http://localhost:3000` (or deployed URL)

- ✅ View **asset catalog** with pagination
- ✅ See **metadata** (BPM, key, price in PYUSD)
- ✅ Use **search** and **status filters**
- ✅ **Play 30-second preview** (no wallet required)

**What to notice:**
- Clean, producer-focused UX
- Real-time search (debounced)
- Server-side pagination (cursor-based)

---

### **2. Purchase Flow (60 seconds)**

**Steps:**

1. **Click "Buy Now"** on an asset
2. **Connect wallet** (MetaMask, WalletConnect, or Coinbase Wallet)
3. **Approve PYUSD payment** on Ethereum
4. **Avail Nexus intent fires** → executes on Base
5. **EAS license receipt written** to Base blockchain
6. **Blockscout link** appears (view attestation on Base Sepolia)

**What's happening behind the scenes:**
- PYUSD payment on Ethereum mainnet
- Avail Nexus "Bridge & Execute" intent
- Execution on Base (cheaper, faster)
- EAS attestation (immutable license proof)
- Lit Protocol access control enabled

**View attestation:**
- **Blockscout URL:** `https://base-sepolia.blockscout.com/tx/[tx-hash]`
- **EAS Schema:** License receipts (buyer, asset ID, price, CID)

---

### **3. Download & Decrypt (45 seconds)**

**After purchase:**

1. **"Download" button** unlocks
2. **Lit Protocol** checks EAS license
3. If valid → **Lighthouse blob decrypts**
4. **Full track downloads** (original quality, uncompressed)
5. **Play in your DAW** (FL Studio, Ableton, Logic, etc.)

**Privacy/Security:**
- Encrypted storage (only buyers can decrypt)
- No centralized access control (Lit ACC handles it)
- No plaintext audio on-chain or in storage

---

### **4. Mobile Library (30 seconds)**

**Expo app (iOS/Android):**

1. **Open app** → tap "Library" tab
2. **See purchased items** (synced from blockchain)
3. **Tap to play** → 30-second preview → unlock full track
4. **Biometric unlock** (optional passkey integration)

**What to notice:**
- Cross-platform sync (blockchain as source of truth)
- Audio preview in-app
- Native mobile UX (NativeWind + Expo)

---

### **5. Admin Panel (Bonus - 30 seconds)**

**URL:** `http://localhost:3000/admin` (or deployed URL)

**Login:** `admin` / `dev123` (temporary for hackathon MVP)

**Features:**
- ✅ **Asset management** (CRUD)
- ✅ **Upload new assets** (drag & drop → R2/S3)
- ✅ **Server-side pagination** (10/20/50 per page)
- ✅ **Search & filters** (status, title, artist)
- ✅ **Optimistic updates** (instant UI feedback)

**What to notice:**
- Production-ready admin UX
- Pre-signed URL uploads (direct to R2/S3, no server bottleneck)
- Real-time validation (Zod schemas)

---

## 🏗️ Technical Highlights

### **Stack:**
- **Frontend:** Next.js 15 (App Router), Expo 53 (React Native 0.79)
- **Backend:** Drizzle ORM + PostgreSQL, Next.js API Routes
- **Blockchain:** Base (Sepolia testnet for demo)
- **Integrations:** Lit Protocol, Lighthouse, EAS, Avail Nexus

### **Quality:**
- ✅ **27 passing tests** (7 E2E + 15 API integration + 5 contract)
- ✅ **6 CI checks** (build, lint, typecheck, E2E, tokens, hygiene)
- ✅ **100% TypeScript** (strict mode)
- ✅ **OpenAPI 3.0 docs** (Swagger UI at `/api/docs`)

### **Achievements:**
- **PostgreSQL-first** (production-ready database)
- **Cursor-based pagination** (scalable to millions of assets)
- **Deterministic seeding** (reproducible test data)
- **Readiness checks** (`/api/readiness` for health monitoring)
- **Request ID tracing** (structured logging with correlation)

---

## 📊 Demo Script (If Needed)

**If you're presenting live, follow this script:**

### **Intro (15 seconds)**
> "GotMusic is a decentralized marketplace for music producers. It combines PYUSD payments, encrypted delivery via Lighthouse, and immutable license receipts via EAS on Base."

### **Demo (2 minutes)**
1. **Browse catalog** → "Here's our producer-grade catalog with BPM, key, and pricing."
2. **Play preview** → "30-second previews, no wallet required."
3. **Buy asset** → "Connect wallet, pay with PYUSD, Avail Nexus bridges to Base."
4. **View attestation** → "EAS writes an immutable license receipt to Base - here's the Blockscout link."
5. **Download** → "Lit Protocol verifies the license, Lighthouse decrypts the file, full track downloads."
6. **Mobile app** → "Here's the same purchase in our Expo mobile app - cross-platform sync via blockchain."

### **Closing (30 seconds)**
> "Key innovation: combining PYUSD for payments, Avail Nexus for cross-chain execution, Lit for access control, and EAS for verifiable licenses. All open-source, all production-ready."

---

## 🔗 Live Links

- **Web app:** [TBD - deployment URL]
- **API docs:** [TBD - deployment URL]/api/docs
- **Blockscout (Base Sepolia):** https://base-sepolia.blockscout.com
- **EAS Schema:** [TBD - schema UID]
- **GitHub:** https://github.com/gotmusic/gotmusic

---

## 🛠️ Local Setup (If Running Locally)

```bash
# Prerequisites: Node.js 20+, Yarn 4, Docker

# 1. Clone and install
git clone https://github.com/gotmusic/gotmusic.git
cd gotmusic
corepack enable
yarn install --immutable

# 2. Start PostgreSQL
docker run -d --name gotmusic-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gotmusic_dev \
  -p 5433:5432 postgres:16

# 3. Configure environment
cat > apps/web/.env.local << 'EOF'
ADMIN_USER=admin
ADMIN_PASS=dev123
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/gotmusic_dev
EOF

# 4. Initialize database
yarn tokens:build
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/gotmusic_dev yarn workspace @gotmusic/web db:push
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/gotmusic_dev yarn workspace @gotmusic/web db:seed

# 5. Start dev server
yarn workspace @gotmusic/web dev
# Open http://localhost:3000
```

---

## ❓ FAQ

**Q: Is this production-ready?**
A: The infrastructure is production-ready (PostgreSQL, E2E tests, CI/CD). Blockchain integrations (Lit, Avail Nexus) are in final testing phase.

**Q: Why PYUSD?**
A: PYUSD is a regulated stablecoin on Ethereum, ideal for payments. We use Avail Nexus to bridge and execute on Base for lower fees.

**Q: How do you prevent piracy?**
A: Assets are encrypted at rest (Lighthouse). Only buyers with valid EAS licenses can decrypt via Lit Protocol. No centralized access control = no single point of failure.

**Q: Mobile app?**
A: Expo 53 (React Native 0.79) with NativeWind. Same API as web. Audio preview, biometric unlock, cross-platform sync.

**Q: What's next?**
A: Post-MVP: Vendor verification (EAS), layaway/escrow contracts, mobile passkey auth, ZK receipt research.

---

## 📞 Contact

- **Team:** [@grantedwards](https://github.com/grantedwards)
- **Issues:** https://github.com/gotmusic/gotmusic/issues
- **ETHOnline 2025:** Oct 10–31, 2025

---

**Thank you for reviewing GotMusic!** 🎵✨

