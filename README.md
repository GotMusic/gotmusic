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

## CI & Repo Hygiene (what judges should know)

We run a tight loop so changes are always safe and reviewable.

- Required checks (on every PR to `main`):
  - build-test: installs, builds tokens, lints (Biome), typechecks/builds
  - lint-commits: enforces Conventional Commits (clean history)
- Branch protection on `main`:
  - PR required (1 approval), dismiss stale approvals, latest push must be approved
  - Require status checks: build-test, lint-commits
  - Require branches up to date, conversations resolved, linear history
  - Signed commits recommended
- Workflows (manual or on PR/push):
  - Actions → “ci” (build-test)
  - Actions → “commit-message-lint” (lint-commits)
- Commit style:
  - `feat(scope): user-facing change`
  - `fix(scope): bug fix`
  - `chore(ci): tooling/infra`
- Why this matters
  - Judges can trust every change: consistent CI, small PRs, narrative commits
  - One-click verification: badge at top, Actions are public
