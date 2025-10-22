import { ConfigContext, ExpoConfig } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'GotMusic',
  slug: 'gotmusic',
  scheme: 'gotmusic',
  jsEngine: 'hermes',
  plugins: [
    'expo-router',
  ],
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
