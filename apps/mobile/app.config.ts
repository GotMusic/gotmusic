import type { ConfigContext, ExpoConfig } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "GotMusic",
  slug: "gotmusic",
  scheme: "gotmusic",
  jsEngine: "hermes",
  extra: {
    GM_FEATURE_LIT: process.env.GM_FEATURE_LIT ?? "false",
  },
  plugins: [
    "expo-router",
    "expo-av",
    [
      "expo-local-authentication",
      {
        faceIDPermission: "Allow $(PRODUCT_NAME) to use Face ID.",
      },
    ],
  ],
  web: {
    bundler: "metro",
  },
  splash: {
    resizeMode: "contain",
    backgroundColor: "#0B0D12",
    image: undefined, // Use custom splash screen
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.gotmusic.app",
  },
  android: {
    package: "com.gotmusic.app",
  },
});
