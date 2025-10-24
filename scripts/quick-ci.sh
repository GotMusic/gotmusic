#!/bin/bash
set -e

echo "🚀 Quick local CI (no database required)..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the repo root"
    exit 1
fi

# Step 1: Clean and install dependencies
print_status "Step 1: Installing dependencies..."
yarn install --immutable

# Step 2: Build packages
print_status "Step 2: Building packages..."
yarn workspace @gotmusic/tokens build
yarn workspace @gotmusic/api build  
yarn workspace @gotmusic/ui build

# Step 3: Build web app
print_status "Step 3: Building web app..."
export NEXT_PUBLIC_SHOW_MOCK_RECEIPT="true"
yarn workspace @gotmusic/web build

# Step 4: Start the web server (without database)
print_status "Step 4: Starting web server..."
export GM_STORAGE_MODE="stub"
export NEXT_TELEMETRY_DISABLED="1"
export NEXT_PUBLIC_SHOW_MOCK_RECEIPT="true"
export NEXT_PUBLIC_BASE_URL="http://127.0.0.1:4123"
export NEXT_PUBLIC_API_URL="http://127.0.0.1:4123"

# Kill any existing server on port 4123
lsof -ti:4123 | xargs kill -9 2>/dev/null || true

# Start server in background
yarn workspace @gotmusic/web start -p 4123 &
SERVER_PID=$!

# Step 5: Wait for health
print_status "Step 5: Waiting for server health..."
for i in {1..30}; do
    if curl -s http://127.0.0.1:4123/api/healthz >/dev/null 2>&1; then
        print_status "Server is healthy"
        break
    fi
    sleep 2
done

# Step 6: Smoke tests
print_status "Step 6: Running smoke tests..."

# Test /api/assets
code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4123/api/assets)
echo "GET /api/assets -> $code"
if [ "$code" != "200" ]; then
    print_error "/api/assets is not 200"
    curl -i http://127.0.0.1:4123/api/assets || true
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi

# Test /catalog
code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4123/catalog)
echo "GET /catalog -> $code"
if [ "$code" != "200" ]; then
    print_error "/catalog is not 200"
    curl -i http://127.0.0.1:4123/catalog || true
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi

# Test /studio (should be 200)
code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4123/studio)
echo "GET /studio -> $code"
if [ "$code" != "200" ]; then
    print_error "/studio is not 200"
    curl -i http://127.0.0.1:4123/studio || true
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi

# Test /console (should be 307 redirect)
code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4123/console)
echo "GET /console -> $code"
if [ "$code" != "307" ]; then
    print_error "/console should redirect (307) but got $code"
    curl -i http://127.0.0.1:4123/console || true
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi

print_status "🎉 Quick CI completed successfully!"
print_status "All smoke tests passed - Studio/Console routing is working correctly"

# Cleanup
print_status "Cleaning up..."
kill $SERVER_PID 2>/dev/null || true
