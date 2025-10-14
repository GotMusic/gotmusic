# GotMusic

![ci](https://github.com/GotMusic/gotmusic/actions/workflows/ci.yml/badge.svg)

Producer-grade marketplace for **samples, beats, stems, and presets** — with **private delivery** (Lighthouse + Lit) and **verifiable license receipts** (EAS). **Payments in PYUSD** via **Avail Nexus “Bridge & Execute”** to **Base**.

> **ETHOnline 2025** — public hackathon build (**Oct 10–31, 2025**). We ship small, reviewable commits and document trade-offs.

## Stack (Current Implementation)

### **Frontend:**
* **Web:** Next.js 15 (App Router) + React 19 + Tailwind CSS + TanStack Query
* **Mobile:** Expo 53 + React Native 0.79 + NativeWind (in progress)
* **UI Kit:** `@gotmusic/ui` - Shared components with design tokens
* **Design Tokens:** Style Dictionary → `web.css` + `native.ts/cjs`

### **Backend:**
* **API:** Next.js API Routes (REST) + Zod validation
* **Database:** Drizzle ORM + SQLite (Postgres-ready)
* **Storage:** Pre-signed URLs (R2/S3 via AWS SDK v3)
* **File Uploads:** Direct PUT to cloud storage

### **Integrations (Planned):**
* **Access / Storage:** Lit Protocol (ACC/Actions) + Lighthouse (encrypted blobs)
* **Receipts:** EAS attestations (viewable in Blockscout)
* **Payments:** PYUSD (Ethereum) → Avail Nexus intent → execute on Base

### **Tooling:**
* **Monorepo:** Yarn 4 (PnP) + Turborepo
* **TypeScript:** Strict mode, composite projects
* **Linting:** Biome (format + lint + import sorting)
* **Testing:** Playwright (E2E), Jest (planned for units)
* **CI/CD:** GitHub Actions

## Quickstart (Local Development)

```bash
# Prerequisites: Node.js 20+, Yarn 4

# 1. Enable Corepack (for Yarn 4)
corepack enable

# 2. Install dependencies
yarn install --immutable

# 3. Build design tokens
yarn tokens:build

# 4. Set up database (web app)
yarn workspace @gotmusic/web db:push    # Create tables
yarn workspace @gotmusic/web db:seed    # Load sample data

# 5. Start development servers
yarn dev        # Runs all workspace dev scripts via Turbo

# Or run individually:
yarn workspace @gotmusic/web dev        # Web: http://localhost:3000
yarn workspace @gotmusic/mobile dev     # Mobile: Expo dev server

# 6. Run tests
yarn workspace @gotmusic/web test:e2e   # Playwright E2E tests
```

### **Available Routes (Web):**
- `/` - Public catalog (TanStack Query + React Suspense)
- `/admin` - Asset management dashboard
- `/admin/uploads` - Upload new assets
- `/admin/assets/:id` - Asset detail + actions
- `/api/assets` - REST API endpoints
- `/api/upload/*` - Upload management

## Repository Layout

* **`apps/web`** — Next.js 15 app
  * `src/app/` — Pages & API routes
  * `src/server/db/` — Drizzle ORM + schema
  * `src/components/` — React components
  * `src/stories/` — Storybook stories
  * `tests/e2e/` — Playwright tests
  
* **`apps/mobile`** — Expo 53 app (React Native 0.79)
  * `app/` — Expo Router screens
  * `app/(tabs)/` — Tab navigation
  
* **`packages/tokens`** — Design tokens (Style Dictionary)
  * `tokens.raw.json` — Source of truth
  * `dist/` — Generated outputs (web.css, native.ts, native.cjs)
  * `scripts/` — Build & validation scripts
  
* **`packages/ui`** — Shared UI components
  * `src/` — Button, Card, etc. (token-based)
  
* **`packages/api`** — API client + TanStack Query hooks
  * `src/` — Client, hooks, schemas, types
  
* **`packages/fixtures`** — Test data & samples
  * `src/` — Sample catalog data
  
* **`docs.d/`** — Internal documentation (gitignored)
  * `BUILDERS-START-HERE.md` — Primary onboarding guide
  * `ISSUE-PR-WORKFLOW.md` — Complete workflow guide
  * `PR-COMMENT-GUIDE.md` — PR comment templates
  * `architecture/` — System design docs
  * `design-system/` — Design system docs
  * `testing/` — Testing guides

## Environment (examples)

Create `.env.local` in each app as needed; global placeholders in `.env.example`.

| Key                          | Where      | Notes                            |
| ---------------------------- | ---------- | -------------------------------- |
| `NEXT_PUBLIC_BLOCKSCOUT_URL` | web        | For linking tx/attestations      |
| `NEXT_PUBLIC_BASE_RPC`       | web/mobile | Public RPC for Base (testnet ok) |
| `LIGHTHOUSE_API_KEY`         | web/mobile | For encrypted upload/download    |
| `LIT_NETWORK`                | web/mobile | e.g., `datil-test`               |
| `EAS_CHAIN_ID`               | web/mobile | Base Sepolia / Base mainnet      |
| `EAS_SCHEMA_VENDOR`          | web/mobile | UID of schema                    |
| `EAS_SCHEMA_LICENSE`         | web/mobile | UID of schema                    |
| `AVAIL_NEXUS_CONFIG`         | web/mobile | JSON or URL to config            |

*No secrets in the repo. Use local `.env*` files or GitHub Secrets for CI.*

## CI / Quality Gates

* **CI pipeline:** tokens build → Biome format/lint → TS typecheck → app builds
* **Branch protection:** PRs to `main` must be green (CI) with clean commit messages
* **Conventional Commits:** `feat(scope): …`, `fix(scope): …`, `chore(ci): …`

## Judge Runbook (2–3 minutes)

1. **Browse catalog** on the web app → open an item page → play **30-sec preview**.
2. **Buy** with PYUSD → Avail Nexus intent fires → executes on **Base**.
3. On success, app writes an **EAS license receipt**; show **Blockscout link**.
4. **Download & decrypt**: Lit ACC verifies license → Lighthouse blob decrypts → full track plays.
5. (Optional) Open the **Expo app** → library shows the purchased item → play.

## Security & Privacy (MVP)

* Encrypted assets only; keys gated via **Lit** (policy = “has EAS license for assetId”).
* No private keys or access tokens committed; `.env*` files are local.
* Attestations store only minimal metadata and content CID (no plaintext audio).

## Roadmap (post-MVP, stretch)

* Layaway/escrow contract (on-chain installments)
* EAS-backed **vendor verification** (Base)
* Mobile passkey + biometric gate for “Unlock & Play”
* ZK receipt research track (prove fair split without revealing details)

## Contributing (Hackathon Mode)

### **Workflow:**
1. **Create an issue** using templates (`.github/ISSUE_TEMPLATE/`)
   - Always include: type, area, priority, size labels
   - Define clear acceptance criteria
   
2. **Branch naming:** `type/scope/description-ISSUE` (e.g., `feat/storage/upload-notify-68`)

3. **Commit format:** Conventional commits + `--no-gpg-sign`
   ```
   feat(storage): add upload notify endpoint
   
   - Creates asset_files row
   - Updates asset status
   
   Closes #68
   ```

4. **PR Requirements:**
   - Must include `Closes #X` keyword
   - Follow PR template (Context, Changes, Testing, Risks)
   - Post closing comment before merge (see `docs.d/PR-COMMENT-GUIDE.md`)
   
5. **Merge:** Squash merge only (auto-deletes branch)

### **Documentation:**
* **Start here:** `docs.d/BUILDERS-START-HERE.md` - Complete onboarding guide
* **Workflow:** `docs.d/ISSUE-PR-WORKFLOW.md` - Detailed workflow guide
* **PR Comments:** `docs.d/PR-COMMENT-GUIDE.md` - PR comment templates
* **Rules:** `.cursorrules` - Coding standards & CI requirements

### **Quality Gates:**
* ✅ CI passes (build, lint, typecheck)
* ✅ PR hygiene (title format, Closes keyword)
* ✅ Issue hygiene (required labels)
* ✅ Conventional commits
* ✅ Closing comment posted
* ✅ No secrets committed

## Transparency about AI assistance

We use **AI-assisted coding** (Cursor/GPT-5) for boilerplate and docs. Humans review/own all design decisions, security gates, and contracts. Prompts and rationale appear in ADRs when relevant.

## License

MIT © 2025 GotMusic