// Icon System Exports
export * from './types';
export * from './tokens/icon-tokens';
export { Icon } from './components/Icon';
export { AnimatedIcon } from './components/AnimatedIcon';

// Music Icons
export { MicrophoneIcon } from './icons/music/microphone';
export { HeadphonesIcon } from './icons/music/headphones';
export { WaveformIcon } from './icons/music/waveform';
export { PlayIcon } from './icons/music/play';
export { PauseIcon } from './icons/music/pause';
export { RecordIcon } from './icons/music/record';

// Navigation Icons
export { HomeIcon } from './icons/navigation/home';
export { SearchIcon } from './icons/navigation/search';
export { StudioIcon } from './icons/navigation/studio';
export { LibraryIcon } from './icons/navigation/library';
export { DevelopIcon } from './icons/navigation/develop';

// Brand Icons
export { GotMusicLogoIcon } from './icons/brand/gotmusic-logo';
export { BlockchainIcon } from './icons/brand/blockchain';

// Icon Collections
export const MusicIcons = {
  Microphone: 'MicrophoneIcon',
  Headphones: 'HeadphonesIcon',
  Waveform: 'WaveformIcon',
  Play: 'PlayIcon',
  Pause: 'PauseIcon',
  Record: 'RecordIcon',
} as const;

export const NavigationIcons = {
  Home: 'HomeIcon',
  Search: 'SearchIcon',
  Studio: 'StudioIcon',
  Library: 'LibraryIcon',
  Develop: 'DevelopIcon',
} as const;

export const BrandIcons = {
  GotMusicLogo: 'GotMusicLogoIcon',
  Blockchain: 'BlockchainIcon',
} as const;
