/**
 * Application constants to avoid hard-coded values
 */

// Default asset metadata
export const DEFAULT_ASSET_METADATA = {
  tags: ["Electronic", "Techno"] as string[],
  duration: "3:45",
  quality: "24-bit/48kHz", 
  genre: "Electronic",
  mood: "Dark",
  energy: 8,
} as const;

// Placeholder content
export const PLACEHOLDER_CONTENT = {
  artwork: {
    emoji: "🎵",
    alt: "Music track artwork",
  },
  preview: {
    title: "Preview Coming Soon",
    description: "Audio preview will be available once the asset is fully processed.",
  },
  unavailable: {
    message: "This asset is not yet available for preview",
  },
} as const;

// Default artwork URL generator
export const getDefaultArtworkUrl = (assetId: string): string => 
  `https://picsum.photos/300/300?random=${assetId}`;

// Asset status labels
export const ASSET_STATUS_LABELS = {
  draft: "Draft",
  published: "Published", 
  archived: "Archived",
  processing: "Processing",
  ready: "Ready",
  error: "Error",
} as const;

// Purchase button text
export const PURCHASE_BUTTON_TEXT = "🎵 Get This Track Now";

// Dynamic CTA system based on brand voice hierarchy
export type CTAMode =
  | "neutral"      // "Get This"
  | "track"        // "Get the Track" 
  | "loop"         // "Get the Loop"
  | "kit"          // "Get the Kit"
  | "pack"         // "Get the Pack"
  | "license"      // "Get License"
  | "brand"        // "Get the Sound"
  | "premium"      // "Get Yours"
  | "access"       // "Get Access"
  | "marketing";   // "Get Into It"

export const CTA_TEXT: Record<CTAMode, string> = {
  neutral: "Get This",
  track: "Get the Track",
  loop: "Get the Loop", 
  kit: "Get the Kit",
  pack: "Get the Pack",
  license: "Get License",
  brand: "Get the Sound",
  premium: "Get Yours",
  access: "Get Access",
  marketing: "Get Into It",
} as const;

// Legacy CTA text for backward compatibility
export const LEGACY_CTA_TEXT = {
  catalogCard: "Get This Track",
  assetDetail: "🎵 Get This Track Now",
} as const;
