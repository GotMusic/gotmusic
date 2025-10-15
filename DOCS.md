# GotMusic – Public Documentation

This page is the public entrypoint for judges, new contributors, and external stakeholders. For internal build docs, see the *private* `docs.d/` (gitignored).

## What this repo contains

- **Web app:** Next.js 15 + React 19 + TanStack Query
- **Mobile app:** Expo 53 + React Native 0.79 + NativeWind
- **API:** PostgreSQL-backed REST API with OpenAPI 3.0 documentation
- **Infrastructure:** CI/CD with automated testing, deployment-ready
- **MVP demo:** Full purchase flow with PYUSD payments, EAS attestations, and encrypted delivery

## Start here (public)

- **[README](./README.md)** – Project overview, stack, quick start
- **[CONTRIBUTING](./CONTRIBUTING.md)** – How to contribute (workflow, standards, PR process)
- **[SECURITY](./SECURITY.md)** – Security policy and disclosure process
- **[Judge Runbook](./docs/JUDGE-RUNBOOK.md)** – 2-3 minute demo script for hackathon judges
- **API Docs (dev):** Visit `/api/docs` when running locally (Swagger UI)

## Live deployments

- **Web app:** TBD (deployment in progress)
- **API docs:** TBD (deployment in progress)
- **Blockscout (Base Sepolia):** For viewing attestations and transactions

## Key features (demo-ready)

### ✅ **Completed (MVP)**
- 🎵 **Asset catalog** with search, filters, pagination
- 🔐 **Admin panel** with asset management (CRUD, optimistic updates)
- 📱 **Mobile app** with audio preview (30s) and library screen
- 💳 **Payment system** (mock mode for demo, PYUSD integration ready)
- 🔒 **Encrypted storage** (Lighthouse + Lit Protocol - integration in progress)
- 📜 **License attestations** (EAS schema deployed to Base Sepolia)
- 🧪 **27 passing tests** (7 E2E + 15 API integration + 5 contract tests)

### 🚧 **In Progress**
- 💰 PYUSD payments via Avail Nexus → Base
- 🔐 Lit Protocol access control (ACC/Actions)
- 🌐 Production deployment (Vercel/Railway)

## For judges (quick tour)

1. **Browse catalog** → View assets with metadata (BPM, key, price)
2. **Play preview** → 30-second audio preview
3. **Purchase flow** → Connect wallet → Pay with PYUSD → Avail Nexus intent → Execute on Base
4. **License receipt** → EAS attestation written to Base (view in Blockscout)
5. **Download & decrypt** → Lit ACC verifies license → Lighthouse blob decrypts → Full track
6. **Mobile library** → Open Expo app → See purchased items → Play full tracks

See [**JUDGE-RUNBOOK.md**](./docs/JUDGE-RUNBOOK.md) for the full demo script.

## Architecture (high-level)

```
┌─────────────────────────────────────────────────────────────┐
│                    User (Web/Mobile)                        │
└───────────────────┬─────────────────────────────────────────┘
                    │
         ┌──────────┴──────────┐
         │                     │
    ┌────▼────┐          ┌─────▼─────┐
    │  Web    │          │  Mobile   │
    │ Next.js │          │   Expo    │
    └────┬────┘          └─────┬─────┘
         │                     │
         └──────────┬──────────┘
                    │
              ┌─────▼─────┐
              │    API    │
              │ (REST +   │
              │  OpenAPI) │
              └─────┬─────┘
                    │
         ┌──────────┼──────────┐
         │          │          │
    ┌────▼───┐  ┌──▼───┐  ┌───▼────┐
    │ Postgres│  │ R2/S3│  │ Base   │
    │  (Data) │  │(Files)│  │(Chain) │
    └─────────┘  └──────┘  └────────┘
                                │
                    ┌───────────┼───────────┐
                    │           │           │
              ┌─────▼────┐ ┌────▼────┐ ┌───▼────┐
              │   EAS    │ │   Lit   │ │Avail   │
              │(Receipts)│ │ (Access)│ │Nexus   │
              └──────────┘ └─────────┘ └────────┘
```

## Tech stack summary

- **Frontend:** Next.js 15, React 19, Expo 53, TanStack Query, NativeWind
- **Backend:** Drizzle ORM, PostgreSQL, Next.js API Routes
- **Blockchain:** Base (Sepolia testnet), EAS, Lit Protocol, Avail Nexus
- **Storage:** Cloudflare R2 / AWS S3, Lighthouse (encrypted)
- **Payments:** PYUSD (Ethereum) → Avail Nexus → Base
- **DevOps:** GitHub Actions, Docker, Yarn 4, Turborepo, Biome

## Community & support

- **GitHub Issues:** [Report bugs or request features](https://github.com/gotmusic/gotmusic/issues)
- **ETHOnline 2025:** This is a hackathon project (Oct 10–31, 2025)
- **Team:** [@grantedwards](https://github.com/grantedwards) + contributors

## Internal docs (for team)

> **Note for maintainers:** Internal build documentation, architecture deep-dives, ADRs, runbooks, and execution checklists live in `docs.d/` (gitignored). Start with `docs.d/INDEX.md`.

---

**License:** MIT © 2025 GotMusic

