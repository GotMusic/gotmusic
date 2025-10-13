import type { ExpoConfig } from "expo/config";
const config: ExpoConfig = {
  name: "GotMusic",
  slug: "gotmusic",
  scheme: "gotmusic",
  platforms: ["ios", "android"],
  orientation: "portrait",
  runtimeVersion: { policy: "sdkVersion" },
  splash: { image: "./assets/splash.png", resizeMode: "contain", backgroundColor: "#0B0D12" },
  ios: { supportsTablet: false },
  android: {
    adaptiveIcon: { foregroundImage: "./assets/adaptive-icon.png", backgroundColor: "#0B0D12" },
  },
  experiments: { typedRoutes: true },
  plugins: ["expo-router"],
};
export default config;
