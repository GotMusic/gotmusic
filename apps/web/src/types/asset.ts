export type AssetMedia = {
  cover3000: string; // "/media/covers/midnight-glass-3000.jpg"
  hero1024: string; // "/media/heroes/midnight-glass-1024.jpg"
  thumb512: string; // "/media/thumbnails/midnight-glass-512.jpg"
  wave1024x256: string; // "/media/waveforms/midnight-glass-wave-1024x256.png"
};

export type Asset = {
  id: string;
  title: string;
  artist: string;
  status: "draft" | "published" | "archived" | "processing" | "ready" | "error";
  createdAt: string;
  updatedAt: string;
  media: AssetMedia;
  bpm?: number;
  keySig?: string;
  priceAmount: number;
  priceCurrency: "USD" | "PYUSD" | "ETH";
  duration?: number;
  fileSize?: number;
  producerId: string;
};
