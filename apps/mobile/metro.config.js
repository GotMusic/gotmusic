const { getDefaultConfig } = require("@expo/metro-config");
const path = require("path");

const projectRoot = __dirname; // <-- the app folder

module.exports = (() => {
  const config = getDefaultConfig(projectRoot);

  // Make sure Metro resolves from THIS app first
  // and then from the repo root as a fallback.
  config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, "node_modules"),
    path.resolve(projectRoot, "../../node_modules"), // monorepo root (fallback)
  ];

  // If you have local packages with source files, list them here so Metro watches them:
  config.watchFolders = [
    path.resolve(projectRoot, "../../packages"), // optional
  ];

  // Keep transforms sane & fast
  config.transformer.unstable_allowRequireContext = true;

  // Only if you see explicit "cannot resolve …" for these:
  config.resolver.extraNodeModules = {
    buffer: require.resolve("buffer/"), // trailing slash matters
    process: require.resolve("process/browser"),
    stream: require.resolve("readable-stream"),
    events: require.resolve("events/"),
    util: require.resolve("util/"),
  };

  return config;
})();
