import { asset } from "./schema";

export const ASSETS = [
  {
    id: "beat_001",
    kind: "beat",
    title: "Night Drive 88",
    bpm: 88,
    key: "Am",
    tags: ["trap", "dark", "808"],
    artist: "KiloWav",
    previewUrl: "https://cdn.example.com/previews/beat_001.mp3",
    coverUrl: "https://cdn.example.com/covers/beat_001.jpg",
    price: { currency: "PYUSD", amount: 12 },
  },
  {
    id: "loop_009",
    kind: "loop",
    title: "Glass Pad",
    bpm: 120,
    key: "Cmaj",
    tags: ["ambient", "pad"],
    artist: "Nova",
    previewUrl: "https://cdn.example.com/previews/loop_009.mp3",
    coverUrl: "https://cdn.example.com/covers/loop_009.jpg",
    price: { currency: "PYUSD", amount: 4 },
  },
] as const;

export const VALIDATED = ASSETS.map((a) => asset.parse(a));
