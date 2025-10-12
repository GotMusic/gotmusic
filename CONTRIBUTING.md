# Contributing

- Branches: `feat/*`, `fix/*`, `chore/*`, `docs/*`, `refactor/*`
- Commits: Conventional Commits
  - `feat(scope): user-facing change`
  - `fix(scope): bug fix`
  - `chore(scope): tooling/infra/no user impact`
  - `docs(scope): docs changes`
  - `refactor(scope): internal change, no behavior change`
- PRs: small and focused
  - Description: What/Why/Risks/Judge Notes
  - CI must pass: lint, typecheck, tokens parity
  - Prefer squash merge; keep history clean
- Style & tokens
  - Biome formats/lints; do not fight it
  - Use design tokens only; no raw hexes/sizes
