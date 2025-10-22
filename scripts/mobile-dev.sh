#!/bin/bash
# Mobile Development Script
# This script starts the mobile app and provides better logging

echo "🚀 Starting GotMusic Mobile App..."
echo "📱 This will show the QR code for your phone"
echo "🔧 I can monitor the logs while you develop"
echo ""

# Kill any existing processes
pkill -f "expo start" 2>/dev/null || true
pkill -f "Metro Bundler" 2>/dev/null || true

# Start the mobile app with tunnel
cd /Users/grantedwards/Desktop/GotMusic
yarn workspace @gotmusic/mobile dev --tunnel
