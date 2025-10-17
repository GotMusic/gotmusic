# (studio) Route Group

**Purpose:** Producer dashboard for uploading and managing assets

**Routes:**
- `/studio` → Redirect to `/studio/assets`
- `/studio/assets` → Producer's asset grid/table
- `/studio/uploads` → Upload screen with drag-drop
- `/studio/sales` → Sales dashboard (receipts, revenue)

**Shared Layout:** `layout.tsx`
- Sidebar navigation (Assets, Uploads, Sales)
- Producer context (wallet address, balance)
- Authentication required

**Authentication:**
- Wallet connection required
- Producer role (any connected wallet can upload)

**Related Docs:**
- `docs.d/studio/README.md` - Producer handbook
- `docs.d/operations/audio.md` - Audio processing pipeline

