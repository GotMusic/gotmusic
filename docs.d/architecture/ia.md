---
id: arch-ia
status: Active
owner: @grantedwards
updated: 2025-10-16
docType: architecture
---

# Information Architecture & Role Flows

> **Purpose:** Define roles, routes, screens, and primary user flows for GotMusic's Splice-class marketplace.

---

## Roles

### **Visitor / Listener**
- **Access:** Browse catalog, preview 30s clips
- **Authentication:** None required
- **Features:** Search/filter, listen to previews, view asset details

### **Buyer**
- **Access:** Purchase, download, decrypt
- **Authentication:** Wallet connection required
- **Features:** All Visitor features + purchase with PYUSD, receive EAS license receipts, download/decrypt from Lighthouse

### **Producer / Artist (Studio)**
- **Access:** Upload, manage, price, publish assets
- **Authentication:** Wallet connection required
- **Features:** Upload WAV/AIFF, set metadata (title, tags, BPM, key), price assets, monitor sales/receipts, revenue dashboard

### **SuperAdmin**
- **Access:** Feature flags, takedowns, schema ops, audit
- **Authentication:** Admin credentials + elevated permissions
- **Features:** Feature toggles, abuse management, schema/key operations, audit trail access

---

## Web Routes (Next.js App Router)

### **(shop)** - Public Marketplace

```
apps/web/src/app/(shop)/
├── layout.tsx                    # Shop shell with nav (Catalog, Studio)
├── page.tsx                      # Redirect to /catalog
├── catalog/
│   └── page.tsx                  # /catalog - Asset list with filters
├── asset/
│   └── [id]/
│       └── page.tsx              # /asset/:id - Detail, preview, buy, receipt
└── checkout/
    └── page.tsx                  # /checkout - Payment intent, tx tracking, attestation
```

**Features:**
- Search/filter by: type (sample/loop/kit/beat/stems/preset), genre, BPM, key, mood, price
- 30s preview with waveform visualization
- Purchase flow: PYUSD → Avail Nexus → Base execution → EAS attestation
- Receipt display with Blockscout links

### **(studio)** - Producer Dashboard

```
apps/web/src/app/(studio)/
├── layout.tsx                    # Studio shell with sidebar navigation
├── page.tsx                      # Redirect to /studio/assets
├── assets/
│   └── page.tsx                  # /studio/assets - Grid/table of producer's assets
├── uploads/
│   └── page.tsx                  # /studio/uploads - Drag-drop upload + metadata
└── sales/
    └── page.tsx                  # /studio/sales - Receipts, revenue, charts
```

**Features:**
- Upload: Drag-drop or file picker → signed URL → processing queue
- Metadata: Title, tags, BPM (auto-detected), key (auto-detected), genre, price
- Processing: Transcode 30s preview, generate waveform, hash original
- Status: draft → processing → ready → published
- Sales dashboard: Receipt UIDs, buyer addresses, revenue totals (stub)

### **(superadmin)** - Administrative Interface

```
apps/web/src/app/(superadmin)/
├── layout.tsx                    # SuperAdmin shell
├── page.tsx                      # Feature flags, health checks, queue status
└── audit/
    └── page.tsx                  # Append-only audit log viewer
```

**Features:**
- Feature flag toggles (studio, preview, payments)
- Takedown management
- Schema UID management
- Audit trail viewer (all asset changes)

---

## Mobile Routes (Expo Router)

### **Tabs**

```
apps/mobile/app/(tabs)/
├── _layout.tsx                   # Tab navigation
├── browse.tsx                    # Browse/search catalog
├── library.tsx                   # Owned assets (receipts)
└── studio.tsx                    # Producer overview
```

### **Screens**

```
apps/mobile/app/
├── asset/
│   └── [id].tsx                  # Asset detail, preview, buy
├── upload/
│   └── index.tsx                 # Upload + metadata entry
└── receipts/
    └── [uid].tsx                 # Receipt detail (EAS UID, Blockscout)
```

---

## Core Flow: Browse → Purchase → Access

### **1. Browse & Preview**

**Web:**
1. User lands on `/catalog`
2. Filters by type, genre, BPM, price
3. Clicks asset card → `/asset/:id`
4. Views waveform, tags, metadata
5. Clicks "Preview" → plays 30s clip (no wallet required)

**Mobile:**
1. User opens "Browse" tab
2. Scrolls/filters list
3. Taps asset → `asset/[id]`
4. Plays 30s preview

### **2. Purchase → Receipt**

**Prerequisites:** Wallet connected, sufficient PYUSD balance

**Flow:**
1. User clicks "Buy" on asset detail page
2. Redirects to `/checkout` with `assetId` param
3. Frontend creates **Avail Nexus intent**:
   - Source: PYUSD on Ethereum (user's wallet)
   - Destination: Base marketplace contract
   - Action: `purchase(listingId)`
4. User signs intent via wallet
5. Intent submitted → UI shows status:
   - `initiated` → "Payment submitted..."
   - `bridging` → "Bridging to Base..."
   - `executed` → "Executing purchase..."
   - `confirmed` → "Purchase complete!"
6. Backend receives `PurchaseRecorded` event from Base
7. Backend calls EAS: `createLicenseReceipt({ buyer, assetId, txHash })`
8. EAS returns `attestationUID`
9. UI displays:
   - ✅ Purchase complete
   - EAS UID (with Blockscout link)
   - "Download & Decrypt" button enabled

### **3. Download & Decrypt**

**Prerequisites:** Valid EAS license receipt exists

**Flow:**
1. User clicks "Download & Decrypt"
2. Frontend calls `GET /api/assets/:id/download`
3. Backend:
   - Queries EAS for license receipt (buyer + assetId)
   - Calls **Lit ACC** (Access Control Condition):
     - Input: `buyer`, `assetId`, `licenseSchemaUID`
     - Output: `{ authorized: boolean }`
   - If `authorized === false` → 403 error
   - If `authorized === true`:
     - Fetches encrypted blob from **Lighthouse + IPFS** (CID)
     - Decrypts with Lit Protocol keys
     - **Caches decrypted file on R2/S3** for fast streaming
     - Streams decrypted content to client
4. Client saves file or plays in app

---

## Studio Flow: Upload → Publish → Sales

### **1. Upload**

**Web:**
1. Producer visits `/studio/uploads`
2. Drags WAV/AIFF file onto drop zone
3. Frontend calls `POST /api/studio/upload/init`
   - Response: `{ uploadUrl, fileId }`
4. Frontend uploads file via signed URL (PUT)
5. Frontend calls `POST /api/studio/upload/complete`
   - Backend queues processing job
   - Asset status: `draft` → `processing`

**Mobile:**
1. Producer taps "Studio" tab → "Upload" button
2. Opens file picker (iOS/Android)
3. Selects audio file
4. Same API flow as web

### **2. Processing**

**Backend queue job:**
1. **Probe**: Extract BPM/key from audio tags (if present)
2. **Transcode**: Generate 30s preview (mp3/ogg), loudness normalize (-14 LUFS) → **R2/S3**
3. **Waveform**: Generate 64-bin normalized array (0..1) → **R2/S3**
4. **Encrypt**: Master file encrypted with AES-GCM → **Lighthouse + IPFS**
5. **Hash**: SHA256 of original for integrity
6. Update asset:
   - Status: `processing` → `ready`
   - Fields: `bpm`, `key`, `duration`, `previewUrl`, `waveform`, `encryptedCid`, `fileHash`

### **3. Metadata & Pricing**

1. Producer visits `/studio/assets` → clicks asset
2. Fills form:
   - Title (required)
   - Type: sample / loop / kit / beat / stems / preset
   - Genre, mood (tags)
   - BPM (pre-filled if detected, editable)
   - Key (pre-filled if detected, editable)
   - Price (USD amount, displayed as PYUSD)
3. Clicks "Save"
   - Backend: `PATCH /api/assets/:id` with idempotency key

### **4. Publish**

1. Producer toggles "Published" switch
2. Asset becomes visible in public catalog
3. Status: `ready` → `published`

### **5. Sales Dashboard**

1. Producer visits `/studio/sales`
2. Views table:
   - EAS UID (link to Blockscout)
   - Buyer address (truncated)
   - Asset title
   - Price
   - Timestamp
3. Summary cards:
   - Total sales (count)
   - Total revenue (sum)
   - Top asset (by sales)

---

## SuperAdmin Flow: Feature Flags & Audit

### **1. Feature Flags**

1. SuperAdmin visits `/superadmin`
2. Views/toggles flags:
   - `GM_FEATURE_STUDIO` - Enable Studio routes
   - `GM_FEATURE_PREVIEW` - Enable preview generation
   - `GM_FEATURE_PAYMENTS` - Enable real PYUSD payments
   - `GM_FEATURE_LIT` - Enable Lit Protocol ACC
3. Changes persist to database or config file

### **2. Audit Trail**

1. SuperAdmin visits `/superadmin/audit`
2. Views append-only log:
   - Timestamp
   - Action (created, updated, deleted, published, unpublished)
   - Asset ID
   - User (wallet address or admin)
   - Changes (JSON diff)
3. Filters by asset, user, action type, date range

---

## Key Differences from Current Implementation

### **Route Organization:**
- **Before:** `/admin/*` for everything
- **After:** 
  - `(shop)` - Public catalog and checkout
  - `(studio)` - Producer-specific features
  - `(superadmin)` - Admin-only operations

### **Role Clarity:**
- **Before:** Single "admin" role
- **After:** 4 distinct roles with clear permissions

### **Mobile Parity:**
- **Before:** Basic library screen
- **After:** Full browse/buy/upload flows

### **Audio Processing:**
- **Before:** Manual preview upload
- **After:** Automatic transcode + waveform generation

---

## Navigation Hierarchy

### **Web Top Nav**

```
[GotMusic Logo] | Catalog | Studio | [Wallet] | [Profile]
                           ↓
                    (if producer)
```

### **Studio Sidebar**

```
Studio
├── Assets         (/studio/assets)
├── Uploads        (/studio/uploads)
└── Sales          (/studio/sales)
```

### **Mobile Tabs**

```
[Browse] [Library] [Studio] [Profile]
    ↓        ↓         ↓         ↓
  Catalog  Owned   Producer   Settings
          Assets   Dashboard
```

---

## Access Control Matrix

| Route                | Visitor | Buyer | Producer | SuperAdmin |
|----------------------|---------|-------|----------|------------|
| `/catalog`           | ✅      | ✅    | ✅       | ✅         |
| `/asset/:id`         | ✅      | ✅    | ✅       | ✅         |
| `/checkout`          | ❌      | ✅    | ✅       | ✅         |
| `/studio/*`          | ❌      | ❌    | ✅       | ✅         |
| `/superadmin/*`      | ❌      | ❌    | ❌       | ✅         |
| `GET /api/assets/:id/download` | ❌ | ✅ (if license) | ✅ (own) | ✅ |

---

## Related Documentation

- **Flows:** `docs.d/architecture/flows.md` - Purchase, upload, access flows
- **Data Model:** `docs.d/architecture/data-model.md` - Database schema
- **Studio Handbook:** `docs.d/studio/README.md` - Producer guide
- **Audio Pipeline:** `docs.d/operations/audio.md` - Processing details

---

**Last Updated:** 2025-10-16 (Splice-class expansion)  
**Owner:** @grantedwards

