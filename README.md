# GotMusic

![ci](https://github.com/GotMusic/gotmusic/actions/workflows/ci.yml/badge.svg)

Producer-grade marketplace for **samples, beats, stems, and presets** — with **private delivery** (Lighthouse + Lit) and **verifiable license receipts** (EAS). **Payments in PYUSD** via **Avail Nexus “Bridge & Execute”** to **Base**.

> **ETHOnline 2025** — public hackathon build (**Oct 10–31, 2025**). We ship small, reviewable commits and document trade-offs.

## Stack (MVP)

* **Web:** Next.js (App Router) + Tailwind CSS
* **Mobile:** Expo (React Native) + NativeWind
* **Access / Storage:** Lit Protocol (ACC/Actions) + Lighthouse (encrypted blobs)
* **Receipts:** EAS attestations (viewable in Blockscout)
* **Payments:** PYUSD (Ethereum) → Avail Nexus intent → execute on Base
* **Monorepo & DX:** Yarn 4 (PnP) + Turbo + TypeScript (strict) + **Biome** (format/lint)

## Quickstart (local)

```bash
corepack enable
yarn install --immutable
yarn tokens:build
yarn dev        # turbo runs each app's dev script when available
```

## Repository layout

* `apps/web` — Next.js site (includes `/style-guide` route)
* `apps/mobile` — Expo app (includes Style Guide screen)
* `packages/tokens` — Style Dictionary → `web.css` + `native.ts`
* `packages/api` — API client + TanStack Query hooks (scaffold)
* `packages/crypto` — Pure utilities (placeholder)
* `docs.d/` — Architecture notes & ADRs (developer docs)

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

## Contributing (hackathon mode)

* 1 task = 1 issue with acceptance criteria.
* 1 issue = 1 focused PR (keep diffs small).
* PR template asks for scope, screenshots, and “done when…”.
* Merge only on green CI.

## Transparency about AI assistance

We use **AI-assisted coding** (Cursor/GPT-5) for boilerplate and docs. Humans review/own all design decisions, security gates, and contracts. Prompts and rationale appear in ADRs when relevant.

## License

MIT © 2025 GotMusic