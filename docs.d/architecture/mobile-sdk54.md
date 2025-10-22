---
id: MOBILE-SDK54
status: Active
owner: @grantedwards
updated: 2025-10-22
docType: architecture
---

# Mobile App - Expo SDK 54 Upgrade

## Overview

This document details the successful upgrade of the GotMusic mobile app from Expo SDK 53 to SDK 54, including the monorepo-safe Babel configuration solution and troubleshooting steps.

## Upgrade Summary

**Date:** 2025-10-22  
**Status:** ✅ **COMPLETED**  
**Duration:** ~2 hours  
**Result:** Mobile app fully operational on Expo SDK 54

## Technical Changes

### 1. Package Updates

**`apps/mobile/package.json`**
- **Expo SDK:** `~53.0.0` → `~54.0.0`
- **React Native:** `0.79.0` → `0.81.5`
- **React:** `19.1.0` (aligned across monorepo)
- **expo-av** → **expo-audio** (`~1.0.0`)
- **react-native-reanimated:** `~4.1.1` → `~3.10.0` (downgraded to avoid worklets)
- **Other Expo packages:** Updated to SDK 54 compatible versions

### 2. Babel Configuration

**Root `babel.config.js` (NEW)**
```javascript
module.exports = function (api) {
  api.cache(true);
  const caller = api.caller((c) => c && c.name);
  const isMetro = caller && /metro|expo/.test(caller);
  
  const config = {
    babelrcRoots: ['.', './apps/mobile'],
  };

  if (isMetro) {
    return {
      ...config,
      presets: ['babel-preset-expo'],
      plugins: [
        'nativewind/babel',
        'react-native-reanimated/plugin', // MUST be last
      ],
    };
  }

  return {
    ...config,
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  };
};
```

**Removed:** `apps/mobile/babel.config.js` (to avoid conflicts)

### 3. Metro Configuration

**`apps/mobile/metro.config.js`**
```javascript
const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const projectRoot = __dirname;

module.exports = (() => {
  const config = getDefaultConfig(projectRoot);

  config.resolver.nodeModulesPaths = [
    path.join(projectRoot, 'node_modules'),
    path.join(projectRoot, '../../node_modules'),
  ];

  config.transformer.unstable_allowRequireContext = true;
  return config;
})();
```

### 4. App Configuration

**`apps/mobile/app.config.ts`**
```typescript
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'GotMusic',
  slug: 'gotmusic',
  scheme: 'gotmusic',
  jsEngine: 'hermes', // Required for JSI/worklets
  plugins: ['expo-router'],
  splash: {
    resizeMode: 'contain',
    backgroundColor: '#0B0D12',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.gotmusic.app',
  },
  android: {
    package: 'com.gotmusic.app',
  },
});
```

### 5. Entry Point Configuration

**`apps/mobile/package.json`**
```json
{
  "main": "App.tsx" // Required for Metro entry resolution
}
```

**`apps/mobile/app/_layout.tsx`**
```typescript
import 'react-native-reanimated';      // MUST be first import
import 'react-native-gesture-handler'; // then GH
// ... rest of imports
```

## Troubleshooting Process

### Error 1: `react-native-worklets/plugin` Not Found
**Problem:** Reanimated v4+ requires worklets plugin
**Solution:** Downgraded to Reanimated 3.10.0 (no worklets needed)

### Error 2: Duplicate Plugin/Preset Detected
**Problem:** Babel config conflicts between root and app
**Solution:** Removed app-specific babel.config.js, created root config with babelrcRoots

### Error 3: `.plugins is not a valid Plugin property`
**Problem:** Babel config syntax errors
**Solution:** Fixed syntax and conditional processing for Metro vs other callers

### Error 4: `Unable to resolve "../../App" from "node_modules/expo/AppEntry.js"`
**Problem:** Metro couldn't find entry point
**Solution:** Added `"main": "App.tsx"` to package.json

### Error 5: AppEntry.js Processing Issues
**Problem:** Root Babel config was processing Expo's internal files
**Solution:** Used babelrcRoots to scope Babel processing to mobile app only

## Key Learnings

### 1. Monorepo Babel Configuration
- Use `babelrcRoots` to scope Babel processing
- Conditional presets/plugins based on caller (Metro vs other)
- Reanimated plugin MUST be last in Metro builds

### 2. Expo SDK 54 Changes
- expo-av → expo-audio migration required
- Hermes engine required for JSI features
- React Native 0.81.5 compatibility

### 3. Worklets Package Issues
- Reanimated v4+ requires react-native-worklets
- Reanimated 3.x works without worklets
- Downgrade was simpler than adding worklets support

### 4. Metro Resolution
- Proper node_modules resolution for monorepo
- Entry point configuration critical
- Watch folders for shared packages (if needed)

## Commands

### Development
```bash
# Start mobile app
yarn workspace @gotmusic/mobile dev

# Start with cache clear
npx expo start -c

# Clean rebuild
rm -rf node_modules .expo ios android
yarn install
npx expo install
npx expo doctor --fix-dependencies
npx expo prebuild --clean
```

### Troubleshooting
```bash
# Check Expo doctor
npx expo doctor

# Fix dependencies
npx expo doctor --fix-dependencies

# Clean prebuild
npx expo prebuild --clean

# Install iOS pods
npx pod-install
```

## Verification

### ✅ Success Criteria
- [x] Mobile app starts without errors
- [x] No Babel plugin conflicts
- [x] Reanimated animations work
- [x] Audio playback functional
- [x] Navigation working
- [x] All imports resolve correctly

### ✅ Bundle Status
- App bundles successfully
- No missing dependencies
- All Metro transforms working
- Hermes engine active

## Future Considerations

### 1. Reanimated Upgrade Path
When ready to upgrade to Reanimated v4+:
- Add react-native-worklets packages
- Update Babel config for worklets plugin
- Test animations thoroughly

### 2. Shared Package Integration
If adding shared packages to Metro:
- Add to `config.watchFolders`
- Ensure proper Babel processing
- Test hot reload functionality

### 3. Performance Monitoring
- Monitor bundle size with SDK 54
- Check animation performance
- Verify audio playback quality

## Related Documentation

- [Expo SDK 54 Migration Guide](https://docs.expo.dev/versions/latest/)
- [React Native 0.81.5 Release Notes](https://github.com/facebook/react-native/releases)
- [Reanimated 3.x Documentation](https://docs.swmansion.com/react-native-reanimated/)
- [Metro Configuration](https://facebook.github.io/metro/docs/configuration)

---

**Last Updated:** 2025-10-22  
**Status:** ✅ **FULLY OPERATIONAL**  
**Next Review:** When upgrading to Reanimated v4+ or adding shared packages
