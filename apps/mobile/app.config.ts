import { ConfigContext, ExpoConfig } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'GotMusic',
  slug: 'gotmusic',
  scheme: 'gotmusic',
  jsEngine: 'hermes',
  plugins: [
    'expo-router',
    'expo-av',
  ],
  splash: {
    resizeMode: 'contain',
    backgroundColor: '#0B0D12',
    image: undefined, // Use custom splash screen
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.gotmusic.app',
  },
  android: {
    package: 'com.gotmusic.app',
  },
});
