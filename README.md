# GotMusic

![ci](https://github.com/GotMusic/gotmusic/actions/workflows/ci.yml/badge.svg)

Producer-grade marketplace for **samples, beats, stems, and presets** — with **private delivery** (Lighthouse + Lit) and **verifiable license receipts** (EAS). **Payments in PYUSD** via **Avail Nexus “Bridge & Execute”** to **Base**.

> **ETHOnline 2025** — public hackathon build (**Oct 10–31, 2025**). We ship small, reviewable commits and document trade-offs.

## Stack (Current Implementation)

### **Frontend:**
* **Web:** Next.js 15 (App Router) + React 19 + Tailwind CSS + TanStack Query
* **Mobile:** Expo 53 + React Native 0.79 + NativeWind + QueryClient + Audio Preview + Library Screen
* **UI Kit:** `@gotmusic/ui` - Shared components with design tokens
* **Design Tokens:** Style Dictionary → `web.css` + `native.ts/cjs`

### **Backend:**
* **API:** Next.js API Routes (REST) + Zod validation + OpenAPI 3.0 docs
* **Database:** Drizzle ORM + PostgreSQL (production-ready)
* **Storage:** Pre-signed URLs (R2/S3 via AWS SDK v3)
* **File Uploads:** Direct PUT to cloud storage
* **Admin Panel:** Asset management with optimistic updates
* **Audit Logging:** Append-only change tracking
* **Payment System:** Feature flag + deterministic mock service

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
# Prerequisites: Node.js 20+, Yarn 4, Docker

# 1. Enable Corepack (for Yarn 4)
corepack enable

# 2. Install dependencies
yarn install --immutable

# 3. Build design tokens
yarn tokens:build

# 4. Set up PostgreSQL (Docker)
docker run -d \
  --name gotmusic-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gotmusic_dev \
  -p 5433:5432 \
  postgres:16

# 5. Configure environment
cat > apps/web/.env.local << 'EOF'
ADMIN_USER=admin
ADMIN_PASS=dev123
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/gotmusic_dev
EOF

# 6. Initialize database
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/gotmusic_dev yarn workspace @gotmusic/web db:push
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/gotmusic_dev yarn workspace @gotmusic/web db:seed

# 7. Start development servers
yarn dev        # Runs all workspace dev scripts via Turbo

# Or run individually:
yarn workspace @gotmusic/web dev        # Web: http://localhost:3000
yarn workspace @gotmusic/mobile dev     # Mobile: Expo dev server

# 8. Run tests
yarn workspace @gotmusic/web test:e2e   # Playwright E2E tests (7 tests)
```

**Note:** The Docker container uses port **5433** to avoid conflicts with other PostgreSQL instances.

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

## Environment Variables

Create `.env.local` in your app directories. See `.env.example` for complete listing with comments.

### Database (Required)

| Variable | Where | Description | Example |
|----------|-------|-------------|---------|
| `DATABASE_URL` | web | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |

### Storage (Optional - defaults to stub)

| Variable | Where | Description | Example |
|----------|-------|-------------|---------|
| `GM_STORAGE_MODE` | web | Storage mode | `stub` / `s3` / `r2` |
| `STORAGE_DRIVER` | web | Storage driver | `stub` / `s3` / `r2` |
| `STORAGE_PUBLIC_BASE` | web | Public CDN base URL | `https://cdn.gotmusic.app` |
| `NEXT_PUBLIC_STORAGE_PUBLIC_BASE` | web | Public CDN (client-side) | `https://cdn.gotmusic.app` |
| `STORAGE_BUCKET` | web | S3/R2 bucket name | `gotmusic-assets` |
| `AWS_REGION` | web | AWS region | `us-east-1` |
| `AWS_ACCESS_KEY_ID` | web | AWS access key | *(secret)* |
| `AWS_SECRET_ACCESS_KEY` | web | AWS secret key | *(secret)* |
| `AWS_CLOUDFRONT_DOMAIN` | web | CloudFront distribution | `https://d123.cloudfront.net` |
| `R2_ACCOUNT_ID` | web | Cloudflare R2 account ID | *(your account ID)* |
| `R2_ACCESS_KEY_ID` | web | R2 access key | *(secret)* |
| `R2_SECRET_ACCESS_KEY` | web | R2 secret key | *(secret)* |
| `R2_PUBLIC_DOMAIN` | web | R2 public domain | `https://pub-abc.r2.dev` |

### Admin (Development Only)

| Variable | Where | Description | Example |
|----------|-------|-------------|---------|
| `ADMIN_USER` | web | Basic auth username | `admin` |
| `ADMIN_PASS` | web | Basic auth password | `dev_password_changeme` |

### Blockchain / Web3 (Planned)

| Variable | Where | Description | Example |
|----------|-------|-------------|---------|
| `NEXT_PUBLIC_BASE_RPC` | web/mobile | Base network RPC | `https://sepolia.base.org` |
| `NEXT_PUBLIC_BASE_CHAIN_ID` | web/mobile | Base chain ID | `84532` (Sepolia) |
| `NEXT_PUBLIC_BLOCKSCOUT_URL` | web/mobile | Block explorer URL | `https://base-sepolia.blockscout.com` |
| `EAS_CHAIN_ID` | web/mobile | EAS chain ID | `84532` |
| `EAS_SCHEMA_VENDOR` | web/mobile | Vendor schema UID | `0x...` |
| `EAS_SCHEMA_LICENSE` | web/mobile | License schema UID | `0x...` |
| `LIT_NETWORK` | web/mobile | Lit Protocol network | `datil-test` |
| `NEXT_PUBLIC_LIT_NETWORK` | web/mobile | Lit network (client) | `datil-test` |
| `LIGHTHOUSE_API_KEY` | web/mobile | Lighthouse API key | *(secret)* |
| `AVAIL_NEXUS_CONFIG` | web/mobile | Avail Nexus config | *(URL or JSON)* |
| `PYUSD_CONTRACT_ADDRESS` | web/mobile | PYUSD token address | `0x...` |
| `PYUSD_DECIMALS` | web/mobile | PYUSD decimals | `6` |

### Feature Flags (Optional)

| Variable | Where | Description | Default |
|----------|-------|-------------|---------|
| `NEXT_PUBLIC_SHOW_MOCK_RECEIPT` | web | Show mock receipts | `false` |
| `NEXT_PUBLIC_ENABLE_ADMIN` | web | Enable admin panel | `true` (dev) |
| `NEXT_TELEMETRY_DISABLED` | web | Disable Next.js telemetry | `1` |

**Security:** Never commit secrets. Use `.env.local` (gitignored) or GitHub Secrets for CI. See `.env.example` for setup instructions.

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