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

// ============================================================================
// UPLOAD FIXTURES
// ============================================================================

// File types
const audioFile = {
  name: "beat_upload.wav",
  size: 15728640, // 15MB
  type: "audio/wav",
  lastModified: Date.now() - 3600000, // 1 hour ago
};

const largeAudioFile = {
  name: "full_track_mixdown.wav",
  size: 104857600, // 100MB
  type: "audio/wav",
  lastModified: Date.now() - 7200000, // 2 hours ago
};

const invalidFile = {
  name: "document.pdf",
  size: 2048000, // 2MB
  type: "application/pdf",
  lastModified: Date.now() - 1800000, // 30 minutes ago
};

export const uploadFixtures = {
  // File types
  audioFile,
  largeAudioFile,
  invalidFile,

  // Upload states
  idle: {
    status: "idle" as const,
    progress: 0,
    message: "Ready to upload",
    files: [],
  },

  uploading: {
    status: "uploading" as const,
    progress: 45,
    message: "Uploading... 45%",
    files: [audioFile],
  },

  processing: {
    status: "processing" as const,
    progress: 100,
    message: "Processing audio...",
    files: [audioFile],
  },

  success: {
    status: "success" as const,
    progress: 100,
    message: "Upload complete!",
    files: [audioFile],
  },

  error: {
    status: "error" as const,
    progress: 0,
    message: "Upload failed. Please try again.",
    files: [],
  },

  // Validation states
  valid: {
    isValid: true,
    errors: [],
    warnings: [],
  },

  invalid: {
    isValid: false,
    errors: ["File type not supported", "File size too large"],
    warnings: ["Consider compressing audio"],
  },

  warning: {
    isValid: true,
    errors: [],
    warnings: ["Large file size may take longer to upload"],
  },
} as const;

// ============================================================================
// ASSET MANAGEMENT FIXTURES
// ============================================================================

export const assetStatusFixtures = {
  // Asset states
  draft: {
    status: "draft" as const,
    label: "Draft",
    color: "muted",
    icon: "edit",
  },
  processing: {
    status: "processing" as const,
    label: "Processing",
    color: "warning",
    icon: "clock",
  },
  ready: {
    status: "ready" as const,
    label: "Ready",
    color: "success",
    icon: "check",
  },
  error: {
    status: "error" as const,
    label: "Error",
    color: "destructive",
    icon: "x",
  },
  archived: {
    status: "archived" as const,
    label: "Archived",
    color: "muted",
    icon: "archive",
  },
  published: {
    status: "published" as const,
    label: "Published",
    color: "success",
    icon: "globe",
  },
} as const;

export const assetMetadataFixtures = {
  // Basic metadata
  basic: {
    title: "Night Drive 88",
    artist: "KiloWav",
    bpm: 88,
    key: "Am",
    genre: "Trap",
    mood: "Dark",
    tags: ["trap", "dark", "808"],
    description: "A dark trap beat with heavy 808s and atmospheric pads.",
    duration: 180,
    fileSize: 15728640, // 15MB
    sampleRate: 44100,
    bitDepth: 24,
    channels: 2,
  },
  // Complete metadata
  complete: {
    title: "Very Long Track Title That Might Wrap to Multiple Lines",
    artist: "ProducerName",
    bpm: 120,
    key: "C",
    genre: "Hip-Hop",
    mood: "Melodic",
    tags: ["hip-hop", "instrumental", "melodic", "chill", "beats"],
    description:
      "A melodic hip-hop instrumental with smooth chords and crisp drums. Perfect for rap vocals or as background music.",
    duration: 240,
    fileSize: 25165824, // 24MB
    sampleRate: 48000,
    bitDepth: 32,
    channels: 2,
    tempo: 120,
    timeSignature: "4/4",
    energy: 7,
    valence: 6,
  },
  // Minimal metadata
  minimal: {
    title: "Untitled Beat",
    artist: "Unknown",
    bpm: 0,
    key: "",
    genre: "",
    mood: "",
    tags: [],
    description: "",
    duration: 0,
    fileSize: 0,
    sampleRate: 0,
    bitDepth: 0,
    channels: 0,
  },
} as const;

export const assetTileFixtures = {
  // Draft asset
  draft: {
    id: "asset_draft_001",
    title: "Work in Progress",
    artist: "Producer",
    coverUrl: "https://picsum.photos/300/300?random=1",
    status: "draft" as const,
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    updatedAt: new Date(Date.now() - 3600000), // 1 hour ago
    isProcessing: false,
    hasError: false,
  },
  // Processing asset
  processing: {
    id: "asset_processing_001",
    title: "Uploading Track",
    artist: "Producer",
    coverUrl: "https://picsum.photos/300/300?random=2",
    status: "processing" as const,
    createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
    updatedAt: new Date(Date.now() - 300000), // 5 minutes ago
    isProcessing: true,
    hasError: false,
    progress: 65,
  },
  // Ready asset
  ready: {
    id: "asset_ready_001",
    title: "Midnight Glass",
    artist: "Kairo",
    coverUrl: "https://picsum.photos/300/300?random=3",
    status: "ready" as const,
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
    updatedAt: new Date(Date.now() - 86400000), // 1 day ago
    isProcessing: false,
    hasError: false,
    price: { currency: "PYUSD", amount: 29.99 },
    duration: 198,
    bpm: 122,
    key: "F#m",
  },
  // Error asset
  error: {
    id: "asset_error_001",
    title: "Failed Upload",
    artist: "Producer",
    coverUrl: "https://picsum.photos/300/300?random=4",
    status: "error" as const,
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    updatedAt: new Date(Date.now() - 1800000), // 30 minutes ago
    isProcessing: false,
    hasError: true,
    errorMessage: "Upload failed: File format not supported",
  },
  // Archived asset
  archived: {
    id: "asset_archived_001",
    title: "Old Beat",
    artist: "Producer",
    coverUrl: "https://picsum.photos/300/300?random=5",
    status: "archived" as const,
    createdAt: new Date(Date.now() - 2592000000), // 30 days ago
    updatedAt: new Date(Date.now() - 86400000), // 1 day ago
    isProcessing: false,
    hasError: false,
    archivedAt: new Date(Date.now() - 86400000),
  },
  // Published asset
  published: {
    id: "asset_published_001",
    title: "Hit Track",
    artist: "Producer",
    coverUrl: "https://picsum.photos/300/300?random=6",
    status: "published" as const,
    createdAt: new Date(Date.now() - 604800000), // 7 days ago
    updatedAt: new Date(Date.now() - 3600000), // 1 hour ago
    isProcessing: false,
    hasError: false,
    price: { currency: "PYUSD", amount: 49.99 },
    duration: 180,
    bpm: 140,
    key: "C",
    publishedAt: new Date(Date.now() - 3600000),
    sales: 12,
    views: 156,
  },
} as const;

export const assetActionFixtures = {
  // Available actions for different states
  draft: {
    canEdit: true,
    canDelete: true,
    canPublish: false,
    canArchive: false,
    canUnarchive: false,
    canDuplicate: true,
  },
  processing: {
    canEdit: false,
    canDelete: true,
    canPublish: false,
    canArchive: false,
    canUnarchive: false,
    canDuplicate: false,
  },
  ready: {
    canEdit: true,
    canDelete: true,
    canPublish: true,
    canArchive: true,
    canUnarchive: false,
    canDuplicate: true,
  },
  error: {
    canEdit: true,
    canDelete: true,
    canPublish: false,
    canArchive: true,
    canUnarchive: false,
    canDuplicate: true,
  },
  archived: {
    canEdit: false,
    canDelete: true,
    canPublish: false,
    canArchive: false,
    canUnarchive: true,
    canDuplicate: true,
  },
  published: {
    canEdit: true,
    canDelete: false,
    canPublish: false,
    canArchive: true,
    canUnarchive: false,
    canDuplicate: true,
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
  uploads: uploadFixtures,
  assetStatuses: assetStatusFixtures,
  assetMetadata: assetMetadataFixtures,
  assetTiles: assetTileFixtures,
  assetActions: assetActionFixtures,
} as const;
