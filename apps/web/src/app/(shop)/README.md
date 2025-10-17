# (shop) Route Group

**Purpose:** Public marketplace for buyers and visitors

**Routes:**
- `/` → Redirect to `/catalog`
- `/catalog` → Asset listing with filters
- `/asset/:id` → Asset detail with preview and purchase
- `/checkout` → Payment flow (PYUSD → Avail Nexus → EAS)

**Shared Layout:** `layout.tsx`
- Top navigation (Catalog, Studio, Wallet)
- Footer
- No authentication required for browsing

**Authentication:**
- Not required for catalog browsing
- Required for checkout/purchase (wallet connection)

**Related Docs:**
- `docs.d/architecture/ia.md` - Full IA specification
- `docs.d/design-system/patterns/cards.md` - Catalog card patterns
- `docs.d/design-system/patterns/players.md` - Player patterns

