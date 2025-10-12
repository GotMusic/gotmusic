# GotMusic

[![CI](https://github.com/GotMusic/gotmusic/actions/workflows/ci.yml/badge.svg)](../../actions)

Producer-grade marketplace for **samples, beats, stems, and presets** with **private delivery** (Lighthouse + Lit Protocol) and **verifiable license receipts** (Ethereum Attestation Service, “EAS”). **Payments** in PYUSD, routed via **Avail Nexus “Bridge & Execute”** to **Base**.

> ETHOnline 2025 (Oct 10–31) — public hackathon build. We ship in small, reviewable slices and document trade-offs.

---

## 1) Problem → Solution (one screen pitch)

**Problem.** Creators need to sell and license digital audio with **real privacy**, **portable licenses**, and **clean settlement**. Typical shops leak files and lack credible receipts.

**Solution.** GotMusic ships **encrypted assets**; decryption is granted by **on-chain license attestations**. We mint a **verifiable receipt** (EAS), route **PYUSD** via **Avail Nexus** to Base, and deliver files privately from **Lighthouse** with **Lit Protocol** access control. Receipts are viewable on **Blockscout**.

**MVP scope:**
- Web (Next.js): browse → preview (30s) → buy → receipt view
- Mobile (Expo): purchase & library; local decrypt + playback
- Storage/AC: Lighthouse (encrypted), Lit ACC → “has license receipt”
- Payments: PYUSD (testnet) → Avail Nexus intent → execute on Base
- Receipts: EAS attestation UID + Blockscout link

---

## 2) Quickstart

```bash
corepack enable
yarn install --immutable
yarn tokens:build          # build design tokens (Style Dictionary)
yarn build                 # verify builds
# dev (once app scripts are wired): yarn dev
```

| Key                              | Description                         |
| -------------------------------- | ----------------------------------- |
| `NEXT_PUBLIC_EAS_CHAIN_ID`       | EAS chain (e.g., Base Sepolia)      |
| `NEXT_PUBLIC_EAS_SCHEMA_LICENSE` | EAS schema UID for license receipts |
| `LIGHTHOUSE_API_KEY`             | Lighthouse upload key (server only) |
| `LIT_NETWORK`                    | Lit network (e.g., `datil-test`)    |
| `AVAIL_NEXUS_RPC`                | Avail Nexus endpoint                |
| `PYUSD_TOKEN_ADDRESS`            | PYUSD test token address            |
| `BLOCKSCOUT_BASE_URL`            | Explorer base URL                   |

---

## 3) Repository layout

```
apps/
  web/      # Next.js (App Router)
  mobile/   # Expo (React Native)
packages/
  tokens/   # Design tokens → web.css / native.ts
  api/      # Axios client + TanStack Query hooks
docs.d/     # Internal docs (gitignored in public clones)
```

---

## 4) Architecture (MVP)

- Delivery & access control
  - Upload encrypted asset → Lighthouse
  - Lit ACC: decrypt if EAS license receipt exists for buyer+asset
  - Client decrypts locally for playback/download
- Payment & settlement
  - PYUSD (Ethereum testnet) → Avail Nexus intent → execute on Base
  - On success: write EAS license attestation (buyer/vendor/asset)
- Observability
  - Blockscout: receipt lookup & tx links
- Mobile security
  - Optional biometrics to gate decrypt; passkeys-first auth posture

---

## 5) UX & design system

- Single source tokens: `packages/tokens/tokens.raw.json` → CSS vars (web) + TS map (native)
- Web: Tailwind + semantic components; Mobile: NativeWind
- A11y: focus outlines, meaningful roles, ≥ 4.5:1 contrast

---

## 6) CI & branch protection (judge‑friendly)

- Required checks on PRs to `main`:
  - **build-test** (ci): install → tokens build → Biome lint → typecheck/build
  - **lint-commits**: Conventional Commits enforcement
- Branch protection on `main`:
  - PR required (1 approval); dismiss stale approvals; latest push approved
  - Require status checks: build-test, lint-commits
  - Require branches up to date; conversations resolved; linear history
  - Signed commits recommended

---

## 7) AI use & security posture

- AI assists with boilerplate and scaffolding; all changes are human‑reviewed and must pass CI
- Secrets never committed; encrypted assets only; on‑chain receipts are public, not files
- Responsible disclosure: see `SECURITY.md`

---

## 8) Roadmap (ETHOnline 2025)

- ✅ Tokens, repo wiring, CI, style guides
- ⏳ E2E: encrypt → pay → attest → decrypt → play
- ⏳ Judge runbook + short demo video
- Stretch: layaway licensing; vendor attestations; Blockscout SDK panel

---

## 9) Judge runbook

1) Catalog → select item → play 30s preview
2) Buy with PYUSD (testnet) → confirm
3) See License Receipt (EAS UID + Blockscout link)
4) Library → biometric unlock → full playback

---

## 10) Contributing

- Conventional Commits: `feat(scope): …`, `fix(scope): …`, `chore(ci): …`
- Small PRs; CI green; squash merge
- Biome + `.editorconfig` are sources of truth

---

MIT © 2025 GotMusic
