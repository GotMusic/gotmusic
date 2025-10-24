# 🚀 GotMusic CI/CD Guide (2025 Edition)

This unified guide explains how to build, test, and ship the GotMusic web and mobile apps using our modern change-aware CI/CD pipeline.

---

## 🧭 Overview

GotMusic uses a **modular CI pipeline** built on **GitHub Actions** and **Yarn workspaces**.

### Core Principles

* **Speed:** Run only what changed.
* **Safety:** Every merge to `main` passes a full production-parity build.
* **Transparency:** Build logs are streamed and artifacts are tared for reproducibility.
* **Flexibility:** One workflow supports both **FAST (dev)** and **STRICT (prod)** modes.

### Pipeline Stages

| Stage                   | Purpose                        | Mode                         |
| ----------------------- | ------------------------------ | ---------------------------- |
| Security & Quality      | Secrets, linting, typecheck    | Always                       |
| Build & Unit            | Build shared packages, Next.js | FAST/STRICT                  |
| E2E                     | Playwright smoke + full tests  | FAST on PRs / STRICT on main |
| Performance & Storybook | Optional analysis              | Non-blocking                 |

---

## ⚙️ Modes: FAST vs STRICT

| Mode       | When          | Command                    | Server                     | Use case       |
| ---------- | ------------- | -------------------------- | -------------------------- | -------------- |
| **FAST**   | Pull requests | `yarn dev`                 | Dev server (`next dev`)    | Quick feedback |
| **STRICT** | Main/tags     | `yarn build && yarn start` | Prod server (`next start`) | Release-ready  |

### Environment Variable

```yaml
env:
  CI_E2E_MODE: ${{ (github.ref == 'refs/heads/main' || startsWith(github.ref, 'refs/tags/')) && 'STRICT' || 'FAST' }}
```

### Artifact Behavior

* **FAST mode** → skips `.next` artifact download/unpack (runs `yarn dev`).
* **STRICT mode** → downloads the `.next` tar artifact and starts server with `yarn start` **without rebuilding**.

---

## 🧩 Pipeline Breakdown

### 1️⃣ Security & Quality

Runs instantly on every PR:

* **Secret scanning:** `gitleaks`
* **Linting & format:** `yarn biome format --write .`
* **Type checking:** `yarn typecheck`

Fails fast — if this job fails, no builds continue.

---

### 2️⃣ Build & Unit

* Builds shared packages: `@gotmusic/ui`, `@gotmusic/api`
* Runs Next.js build (only if web files changed)
* Verifies `.next/BUILD_ID` and middleware placement
* Uploads `.next` tar artifact for STRICT reuse

**Middleware validation**

> CI asserts **exactly one** `apps/web/middleware.ts`.
> Any `apps/web/src/middleware.ts` will be ignored by Next.js and cause a failure.

---

### 3️⃣ E2E (Mode-Aware)

* Starts **dev server (FAST)** or **prod server (STRICT)**
* Waits for `/api/healthz` and `/api/readiness`
* Runs Playwright tests filtered by file-change context:

  * `@public`, `@studio`, `@auth`, `@console`, `@slow`

#### Middleware Smoke Probe

```bash
curl -i http://127.0.0.1:4123/catalog   # expect 200
curl -i http://127.0.0.1:4123/console   # expect 307
```

#### Example Tags

```bash
yarn playwright test -g "@public"
yarn playwright test -g "@studio|@auth"
yarn playwright test -g "@console"
yarn playwright test -g "@slow"
```

---

### 4️⃣ Performance & Storybook

* Runs bundle analysis, Lighthouse checks, and Storybook build.
* **Non-blocking** — failures don't stop merges.
* Use the `run-perf` or `run-storybook` PR label to force rerun.

---

## 🧠 Testing Strategy

| Type        | Tool       | Runs In            |
| ----------- | ---------- | ------------------ |
| Unit        | Vitest     | FAST & STRICT      |
| Integration | API + DB   | STRICT             |
| E2E         | Playwright | Both               |
| Visual      | Storybook  | Optional / Nightly |

### Playwright Config

Our config is **ESM** (`apps/web/playwright.config.ts`).
If you see `require is not defined in ES module scope`, convert that file to ESM syntax or rename it to `.cjs` and use CommonJS consistently.

---

## 🧱 Caching & Change Detection

### Cached Paths

```
~/.yarn/berry/cache
~/.cache/ms-playwright
.yarn/cache
.turbo
apps/web/.next/cache
```

### Smart Build Keys

Include DB + Next config to prevent stale builds:

```yaml
key: cideps-${{ runner.os }}-${{ hashFiles('yarn.lock') }}-${{ hashFiles('turbo.json') }}-${{ hashFiles('apps/web/next.config.js', 'apps/web/drizzle.config.ts', 'apps/web/src/server/db/schema.ts') }}
```

### File Groups

```yaml
files_yaml:
  web:
    - apps/web/**
    - packages/ui/**
    - packages/api/**
    - turbo.json
    - yarn.lock
    - apps/web/middleware.ts
  docs:
    - docs/**
    - docs.d/**
    - "**/*.md"
```

---

## 🧰 Local Development

### Preflight (2-minute validation)

```bash
./scripts/preflight.sh
```
- ✅ **Fastest validation** (2-3 minutes)
- ✅ Database setup and seeding
- ✅ Server health and readiness checks
- ✅ Middleware smoke tests
- ✅ One @public Playwright test
- ✅ Catches 80-90% of issues before CI

### Targeted Testing

```bash
# Start server once
cd apps/web && yarn dev -p 4123

# Run specific test tags
./scripts/pw-fast.sh "@public"           # Homepage/catalog tests
./scripts/pw-fast.sh "@studio|@auth"     # Studio/auth tests  
./scripts/pw-fast.sh "@console"          # Console tests
```

### Quick CI (no DB)

```bash
./scripts/quick-ci.sh
```

### Full CI (Docker PostgreSQL)

```bash
./scripts/local-ci-docker.sh
```

### Manual Smoke Tests

```bash
cd apps/web && yarn dev -p 4123
curl -I http://127.0.0.1:4123/catalog   # 200
curl -I http://127.0.0.1:4123/console   # 307
```

### Local STRICT E2E

```bash
cd apps/web
yarn build && yarn start -p 4123
PW_BASE_URL=http://127.0.0.1:4123 yarn playwright test -g "@public|@studio"
```

---

## 🩺 Troubleshooting

| Issue                    | Fix                                                                 |
| ------------------------ | ------------------------------------------------------------------- |
| Middleware not running   | Ensure only `apps/web/middleware.ts` exists; set `NEXT_TURBOPACK=0` |
| Missing `.next/BUILD_ID` | Run `yarn build` before `yarn start`                                |
| Health check returns 308 | Remove trailing slash; verify not behind middleware                 |
| DB fails                 | `yarn db:push && yarn db:seed`                                      |
| E2E flakes               | `--repeat-each=2 --workers=1`                                       |
| "require is not defined" | Convert config to ESM or rename `.cjs`                              |
| Unexpected 307s          | Check auth wall and matcher rules                                   |

**Always check CI artifacts first**:

* `apps/web/build.log`
* `apps/web/playwright-report/` (HTML test report)

---

## 🧭 Best Practices

* Run `@public` and `@auth` tags locally before pushing.
* Keep middleware minimal and Edge-safe.
* Use **FAST** mode for iteration, **STRICT** before merge.
* Add a `run-perf` or `run-storybook` label to force heavy jobs.
* Probe `/api/healthz` before E2E to avoid wasted runs.
* Document flaky tests with `@slow` and quarantine if needed.
* Use Node 20+ and `"type": "module"` consistently in all packages.

---

## 📱 Mobile Context

Mobile (Expo) CI is out of scope in this guide.
See `apps/mobile/README.md` for setup and local testing instructions.
A future workflow will handle EAS builds and releases separately.

---

## 🏁 Command Summary

| Task          | Command                             |
| ------------- | ----------------------------------- |
| **Preflight** | `./scripts/preflight.sh`            |
| **Targeted** | `./scripts/pw-fast.sh "@public"`    |
| Local dev     | `yarn dev -p 4123`                  |
| Prod test     | `yarn build && yarn start -p 4123`  |
| Typecheck     | `yarn typecheck`                    |
| Lint          | `yarn biome check .`                |
| Unit tests    | `yarn workspace @gotmusic/ui test`  |
| DB migrate    | `yarn db:push`                      |
| E2E           | `yarn playwright test -g "@public"` |
| Full CI local | `./scripts/local-ci-docker.sh`      |

---

**Last Updated:** October 2025  
**Maintainer:** GotMusic DevOps / Grant Edwards  
**Status:** ✅ Production Ready