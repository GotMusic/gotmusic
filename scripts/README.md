# Local CI Scripts

These scripts replicate the GitHub Actions CI pipeline locally for faster development and debugging.

## Available Scripts

### 1. Quick CI (No Database)
```bash
./scripts/quick-ci.sh
```
- ✅ Fastest option
- ✅ No database required
- ✅ Tests basic routing (Studio/Console)
- ✅ Smoke tests for API endpoints
- ❌ No Playwright E2E tests

### 2. Full CI with Docker PostgreSQL
```bash
./scripts/local-ci-docker.sh
```
- ✅ Complete CI simulation
- ✅ Uses Docker for PostgreSQL (like GitHub Actions)
- ✅ Full Playwright E2E test suite
- ✅ Database setup and seeding
- ❌ Requires Docker

### 3. Full CI (Manual PostgreSQL)
```bash
./scripts/local-ci.sh
```
- ✅ Complete CI simulation
- ✅ Full Playwright E2E test suite
- ❌ Requires local PostgreSQL installation

## Prerequisites

### For Quick CI
- Node.js and Yarn
- No additional requirements

### For Full CI with Docker
- Node.js and Yarn
- Docker
- Port 5432 available for PostgreSQL

### For Full CI (Manual)
- Node.js and Yarn
- PostgreSQL running locally
- Database `gotmusic_test` accessible

## What Each Script Does

1. **Install dependencies** (`yarn install --immutable`)
2. **Build packages** (tokens, api, ui)
3. **Build web app** (production build)
4. **Setup database** (schema + seed) - Full CI only
5. **Start web server** (port 4123)
6. **Health checks** (wait for server to be ready)
7. **Smoke tests** (API endpoints, routing)
8. **Playwright tests** - Full CI only
9. **Cleanup** (kill server, stop containers)

## Environment Variables

The scripts automatically set these environment variables:

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/gotmusic_test
NODE_ENV=test
SEED_RESET=1
E2E_OWNER_ID=mock-producer-123
GM_STORAGE_MODE=stub
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_SHOW_MOCK_RECEIPT=true
NEXT_PUBLIC_BASE_URL=http://127.0.0.1:4123
NEXT_PUBLIC_API_URL=http://127.0.0.1:4123
READINESS_REQUIRE_SEED=true
```

## Test Results

After running the full CI scripts, check:
- `apps/web/playwright-report/index.html` - Playwright test results
- Console output for smoke test results
- Server logs for any errors

## Troubleshooting

### Port 4123 already in use
```bash
lsof -ti:4123 | xargs kill -9
```

### Docker PostgreSQL issues
```bash
docker stop gotmusic-postgres
docker rm gotmusic-postgres
```

### Database connection issues
- Check if PostgreSQL is running
- Verify DATABASE_URL is correct
- Ensure database `gotmusic_test` exists

## GitHub Actions vs Local CI

| Feature | GitHub Actions | Local CI |
|---------|----------------|----------|
| PostgreSQL | Docker service | Docker container |
| Node.js | actions/setup-node | Local installation |
| Yarn | Corepack | Local yarn |
| Caching | actions/cache | No caching |
| Parallel jobs | Yes | No |
| Timeout | 25 minutes | No timeout |
