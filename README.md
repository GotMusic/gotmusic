# GotMusic
![ci](https://github.com/GotMusic/gotmusic/actions/workflows/ci.yml/badge.svg)

Producer-grade marketplace for samples, beats, stems, and presets — with private delivery (Lighthouse + Lit) and verifiable license receipts (EAS). Payments in PYUSD with Avail Nexus “Bridge & Execute” to Base.

> ETHOnline 2025 — public hackathon build (Oct 10–31). Small, reviewable commits; transparent tradeoffs.

## Stack (MVP)
- Web: Next.js (App Router) + Tailwind
- Mobile: Expo (React Native) + NativeWind
- Access/Storage: Lit Protocol + Lighthouse
- Receipts: EAS attestations; view via Blockscout
- Payments: PYUSD on Ethereum → Avail Nexus → execute on Base
- Monorepo: Yarn 4 + Turbo + TypeScript + Biome

## Run locally
```bash
corepack enable && yarn install --immutable
yarn tokens:build
yarn dev    # turbo run dev (once apps add dev scripts)
```

## Repo layout
- apps/web — Next.js site (+ style-guide route)
- apps/mobile — Expo app (+ style guide screen)
- packages/tokens — Style Dictionary → web.css + native.ts
- packages/api — Axios client + React Query hooks
- packages/crypto — Pure utilities (placeholder)

## CI
- GitHub Actions: tokens build, Biome lint, typecheck, parity check

—
MIT © 2025 GotMusic
