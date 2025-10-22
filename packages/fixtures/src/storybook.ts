/**
 * Storybook Fixtures for GotMusic UI Components
 *
 * Following e18e performance standards - deterministic, static data
 * for all Storybook stories. No live API calls, no network dependencies.
 */

import { asset } from "./schema";

// ============================================================================
// ASSET FIXTURES
// ============================================================================

export const assetFixtures = {
  // Basic asset
  basic: {
    id: "beat_001",
    kind: "beat" as const,
    title: "Night Drive 88",
    bpm: 88,
    key: "Am",
    tags: ["trap", "dark", "808"],
    artist: "KiloWav",
    previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    coverUrl: "https://picsum.photos/400/400?random=1",
    price: { currency: "PYUSD", amount: 12 },
    duration: 180,
    waveform: Array.from({ length: 64 }, () => Math.random()),
  },

  // Long title asset
  longTitle: {
    id: "beat_002",
    kind: "beat" as const,
    title: "Very Long Track Title That Might Wrap to Multiple Lines and Test Our UI Components",
    bpm: 120,
    key: "C",
    tags: ["hip-hop", "instrumental", "melodic"],
    artist: "ProducerName",
    previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    coverUrl: "https://picsum.photos/400/400?random=2",
    price: { currency: "PYUSD", amount: 8 },
    duration: 240,
    waveform: Array.from({ length: 64 }, () => Math.random()),
  },

  // Expensive asset
  expensive: {
    id: "beat_003",
    kind: "beat" as const,
    title: "Premium Beat",
    bpm: 140,
    key: "F#m",
    tags: ["trap", "dark", "premium"],
    artist: "EliteProducer",
    previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    coverUrl: "https://picsum.photos/400/400?random=3",
    price: { currency: "PYUSD", amount: 50 },
    duration: 200,
    waveform: Array.from({ length: 64 }, () => Math.random()),
  },

  // Free asset
  free: {
    id: "beat_004",
    kind: "beat" as const,
    title: "Free Sample",
    bpm: 100,
    key: "G",
    tags: ["free", "sample", "demo"],
    artist: "DemoArtist",
    previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    coverUrl: "https://picsum.photos/400/400?random=4",
    price: { currency: "PYUSD", amount: 0 },
    duration: 30,
    waveform: Array.from({ length: 64 }, () => Math.random()),
  },
} as const;

// ============================================================================
// USER FIXTURES
// ============================================================================

export const userFixtures = {
  buyer: {
    id: "user_001",
    name: "Music Producer",
    email: "producer@example.com",
    role: "buyer" as const,
    avatar: "https://i.pravatar.cc/150?img=1",
    wallet: "0x1234...5678",
  },

  producer: {
    id: "user_002",
    name: "Beat Maker",
    email: "beatmaker@example.com",
    role: "producer" as const,
    avatar: "https://i.pravatar.cc/150?img=2",
    wallet: "0x8765...4321",
  },

  admin: {
    id: "user_003",
    name: "Admin User",
    email: "admin@gotmusic.io",
    role: "admin" as const,
    avatar: "https://i.pravatar.cc/150?img=3",
    wallet: "0x9999...0000",
  },
} as const;

// ============================================================================
// PLAYER STATE FIXTURES
// ============================================================================

export const playerStateFixtures = {
  idle: {
    isPlaying: false,
    currentTime: 0,
    duration: 180,
    volume: 0.8,
    isMuted: false,
    playbackRate: 1,
  },

  playing: {
    isPlaying: true,
    currentTime: 45,
    duration: 180,
    volume: 0.8,
    isMuted: false,
    playbackRate: 1,
  },

  paused: {
    isPlaying: false,
    currentTime: 45,
    duration: 180,
    volume: 0.8,
    isMuted: false,
    playbackRate: 1,
  },

  loading: {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    isMuted: false,
    playbackRate: 1,
    isLoading: true,
  },

  error: {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    isMuted: false,
    playbackRate: 1,
    error: "Failed to load audio",
  },
} as const;

// ============================================================================
// FORM FIXTURES
// ============================================================================

export const formFixtures = {
  validInput: {
    value: "Valid input text",
    isValid: true,
    error: null,
  },

  invalidInput: {
    value: "invalid@",
    isValid: false,
    error: "Invalid email format",
  },

  loadingInput: {
    value: "Loading...",
    isValid: true,
    error: null,
    isLoading: true,
  },

  disabledInput: {
    value: "Disabled input",
    isValid: true,
    error: null,
    isDisabled: true,
  },
} as const;

// ============================================================================
// NOTIFICATION FIXTURES
// ============================================================================

export const notificationFixtures = {
  success: {
    type: "success" as const,
    title: "Success!",
    message: "Your action was completed successfully.",
    duration: 3000,
  },

  error: {
    type: "error" as const,
    title: "Error",
    message: "Something went wrong. Please try again.",
    duration: 5000,
  },

  warning: {
    type: "warning" as const,
    title: "Warning",
    message: "Please check your input before proceeding.",
    duration: 4000,
  },

  info: {
    type: "info" as const,
    title: "Information",
    message: "Here's some helpful information for you.",
    duration: 3000,
  },
} as const;

// ============================================================================
// WAVEFORM FIXTURES
// ============================================================================

export const waveformFixtures = {
  short: Array.from({ length: 32 }, () => Math.random()),
  medium: Array.from({ length: 64 }, () => Math.random()),
  long: Array.from({ length: 128 }, () => Math.random()),
  empty: [],
  flat: Array.from({ length: 64 }, () => 0.1),
  peak: Array.from({ length: 64 }, (_, i) => (i === 32 ? 1 : 0.1)),
} as const;

// ============================================================================
// THEME FIXTURES
// ============================================================================

export const themeFixtures = {
  light: {
    name: "light",
    colors: {
      background: "#ffffff",
      foreground: "#000000",
      primary: "#6AE6A6",
      secondary: "#5BD0FF",
    },
  },

  dark: {
    name: "dark",
    colors: {
      background: "#0A0C11",
      foreground: "#E6EAF2",
      primary: "#6AE6A6",
      secondary: "#5BD0FF",
    },
  },
} as const;

// ============================================================================
// VALIDATION FIXTURES
// ============================================================================

export const validationFixtures = {
  validAsset: asset.parse(assetFixtures.basic),
  invalidAsset: {
    id: "invalid",
    kind: "beat" as const,
    title: "Invalid Asset",
    bpm: 120,
    key: "C",
    tags: ["invalid"],
    artist: "Invalid Artist",
    previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    coverUrl: "https://picsum.photos/400/400?random=99",
    price: { currency: "PYUSD", amount: 0 },
    duration: 0,
    waveform: [],
  },
} as const;

// ============================================================================
// EXPORT ALL FIXTURES
// ============================================================================

// ============================================================================
// COMMERCE FIXTURES
// ============================================================================

export const pricingFixtures = {
  // Basic pricing
  basic: {
    currency: "PYUSD",
    amount: 12.99,
    originalAmount: null,
    discount: null,
  },

  // With discount
  discounted: {
    currency: "PYUSD",
    amount: 9.99,
    originalAmount: 19.99,
    discount: 0.5, // 50% off
  },

  // Different currency
  usd: {
    currency: "USD",
    amount: 15.99,
    originalAmount: null,
    discount: null,
  },

  // Free
  free: {
    currency: "PYUSD",
    amount: 0,
    originalAmount: null,
    discount: null,
  },

  // High value
  premium: {
    currency: "PYUSD",
    amount: 99.99,
    originalAmount: null,
    discount: null,
  },
} as const;

export const paymentMethodFixtures = {
  // Crypto wallet
  crypto: {
    id: "crypto-wallet",
    type: "crypto" as const,
    name: "MetaMask",
    icon: "wallet",
    isDefault: true,
    isAvailable: true,
  },

  // Credit card
  card: {
    id: "card-visa",
    type: "card" as const,
    name: "Visa •••• 4242",
    icon: "credit-card",
    isDefault: false,
    isAvailable: true,
  },

  // Unavailable method
  unavailable: {
    id: "paypal",
    type: "paypal" as const,
    name: "PayPal",
    icon: "paypal",
    isDefault: false,
    isAvailable: false,
  },
} as const;

export const transactionStateFixtures = {
  // Initial state
  idle: {
    status: "idle" as const,
    message: null,
    progress: 0,
  },

  // Processing
  processing: {
    status: "processing" as const,
    message: "Processing payment...",
    progress: 50,
  },

  // Success
  success: {
    status: "success" as const,
    message: "Payment successful!",
    progress: 100,
  },

  // Error
  error: {
    status: "error" as const,
    message: "Payment failed. Please try again.",
    progress: 0,
  },

  // Disabled
  disabled: {
    status: "disabled" as const,
    message: "Out of stock",
    progress: 0,
  },
} as const;

export const storybookFixtures = {
  assets: assetFixtures,
  users: userFixtures,
  playerStates: playerStateFixtures,
  forms: formFixtures,
  notifications: notificationFixtures,
  waveforms: waveformFixtures,
  themes: themeFixtures,
  validation: validationFixtures,
  pricing: pricingFixtures,
  paymentMethods: paymentMethodFixtures,
  transactionStates: transactionStateFixtures,
} as const;
