#!/bin/bash
set -e

echo "🚀 Local CI with Docker PostgreSQL..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the repo root"
    exit 1
fi

# Function to cleanup on exit
cleanup() {
    print_status "Cleaning up..."
    kill $SERVER_PID 2>/dev/null || true
    docker stop gotmusic-postgres 2>/dev/null || true
    docker rm gotmusic-postgres 2>/dev/null || true
}
trap cleanup EXIT

# Step 1: Start PostgreSQL with Docker
print_status "Step 1: Starting PostgreSQL with Docker..."
docker run -d \
  --name gotmusic-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gotmusic_test \
  -p 5432:5432 \
  public.ecr.aws/docker/library/postgres:17

# Wait for PostgreSQL to be ready
print_status "Waiting for PostgreSQL to be ready..."
for i in {1..30}; do
    if docker exec gotmusic-postgres pg_isready -U postgres >/dev/null 2>&1; then
        print_status "PostgreSQL is ready"
        break
    fi
    sleep 2
done

# Step 2: Clean and install dependencies
print_status "Step 2: Installing dependencies..."
yarn install --immutable

# Step 3: Build packages
print_status "Step 3: Building packages..."
yarn workspace @gotmusic/tokens build
yarn workspace @gotmusic/api build  
yarn workspace @gotmusic/ui build

# Step 4: Build web app
print_status "Step 4: Building web app..."
export NEXT_PUBLIC_SHOW_MOCK_RECEIPT="true"
yarn workspace @gotmusic/web build

# Step 5: Setup database
print_status "Step 5: Setting up database..."
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gotmusic_test"
export NODE_ENV="test"
export SEED_RESET="1"
export E2E_OWNER_ID="mock-producer-123"

# Setup schema and seed
cd apps/web
yarn db:push
yarn db:seed
cd ../..

print_status "Database setup complete"

# Step 6: Start the web server
print_status "Step 6: Starting web server..."
export GM_STORAGE_MODE="stub"
export NEXT_TELEMETRY_DISABLED="1"
export NEXT_PUBLIC_SHOW_MOCK_RECEIPT="true"
export NEXT_PUBLIC_BASE_URL="http://127.0.0.1:4123"
export NEXT_PUBLIC_API_URL="http://127.0.0.1:4123"
export READINESS_REQUIRE_SEED="true"

# Kill any existing server on port 4123
lsof -ti:4123 | xargs kill -9 2>/dev/null || true

# Start server in background
yarn workspace @gotmusic/web start -p 4123 &
SERVER_PID=$!

# Step 7: Wait for health
print_status "Step 7: Waiting for server health..."
for i in {1..30}; do
    if curl -s http://127.0.0.1:4123/api/healthz >/dev/null 2>&1; then
        print_status "Server is healthy"
        break
    fi
    sleep 2
done

# Step 8: Smoke tests
print_status "Step 8: Running smoke tests..."

# Test /api/assets
code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4123/api/assets)
echo "GET /api/assets -> $code"
if [ "$code" != "200" ]; then
    print_error "/api/assets is not 200"
    curl -i http://127.0.0.1:4123/api/assets || true
    exit 1
fi

# Test /catalog
code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4123/catalog)
echo "GET /catalog -> $code"
if [ "$code" != "200" ]; then
    print_error "/catalog is not 200"
    curl -i http://127.0.0.1:4123/catalog || true
    exit 1
fi

# Test /studio (should be 200)
code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4123/studio)
echo "GET /studio -> $code"
if [ "$code" != "200" ]; then
    print_error "/studio is not 200"
    curl -i http://127.0.0.1:4123/studio || true
    exit 1
fi

# Test /console (should be 307 redirect)
code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4123/console)
echo "GET /console -> $code"
if [ "$code" != "307" ]; then
    print_error "/console should redirect (307) but got $code"
    curl -i http://127.0.0.1:4123/console || true
    exit 1
fi

# Step 9: Wait for readiness
print_status "Step 9: Waiting for readiness..."
for i in {1..60}; do
    code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4123/api/readiness || true)
    if [ "$code" = "200" ]; then
        print_status "Server is ready"
        break
    fi
    sleep 2
done

if [ "$code" != "200" ]; then
    print_error "/api/readiness never returned 200"
    curl -i http://127.0.0.1:4123/api/readiness || true
    exit 1
fi

# Step 10: Run Playwright tests
print_status "Step 10: Running Playwright tests..."

# Set environment variables for tests
export PW_PORT="4123"
export PW_BASE_URL="http://127.0.0.1:4123"
export NODE_ENV="test"
export NEXT_TELEMETRY_DISABLED="1"
export GM_STORAGE_MODE="stub"
export NEXT_PUBLIC_SHOW_MOCK_RECEIPT="true"

cd apps/web

# Run public tests
print_status "Running @public tests..."
yarn playwright test --reporter=html -g "@public" || {
    print_error "@public tests failed"
    exit 1
}

# Run studio/auth tests
print_status "Running @studio|@auth tests..."
yarn playwright test --reporter=html -g "@studio|@auth" || {
    print_error "@studio|@auth tests failed"
    exit 1
}

cd ../..

print_status "🎉 Local CI with Docker completed successfully!"
print_status "Check apps/web/playwright-report/index.html for test results"
