import { AudioUploadDropzone } from "@/components/UploadThing/AudioUploadDropzone";
import { ImageUploadDropzone } from "@/components/UploadThing/ImageUploadDropzone";

export default function StudioHome() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-fg-default mb-2" data-testid="studio-home">
          Studio Dashboard
        </h1>
        <p className="text-fg-muted">
          Upload and manage your music assets with modern file handling
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AudioUploadDropzone />
        <ImageUploadDropzone />
      </div>

      <div className="mt-8">
        <a 
          href="/studio/assets/asset-e2e-fixed-001" 
          className="glass-neumorphic-button px-4 py-2 text-sm"
        >
          View Sample Asset
        </a>
      </div>
    </main>
  );
}
