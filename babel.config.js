// <repo-root>/babel.config.js
module.exports = function (api) {
  api.cache(true);

  const caller = api.caller((c) => c && c.name);
  const isMetro = caller && /metro|expo/.test(caller);

  // Monorepo-aware: we'll allow Babel to look into the mobile app + (optionally) shared packages.
  // IMPORTANT: babelrcRoots is allowed here (root config), not in .babelrc.
  const config = {
    babelrcRoots: [
      '.',                 // root
      './apps/mobile',     // the Expo app
      // add shared packages only if they ship source that Metro must transpile:
      // './packages/ui',
      // './packages/utils',
    ],
  };

  if (isMetro) {
    // We're in an Expo/Metro build → use Expo preset + RN plugins
    return {
      ...config,
      presets: ['babel-preset-expo'],
      plugins: [
        'nativewind/babel',
        // Reanimated plugin MUST be last
        'react-native-reanimated/plugin',
      ],
    };
  }

  // Non-Expo callers (e.g., web build / Node tasks) get a plain preset set
  return {
    ...config,
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  };
};
