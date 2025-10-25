import { AudioUploadDropzone } from "@/components/UploadThing/AudioUploadDropzone";
import { ImageUploadDropzone } from "@/components/UploadThing/ImageUploadDropzone";
import { 
  MusicalNoteIcon, 
  PhotoIcon, 
  ChartBarIcon,
  ArrowUpTrayIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

export default function StudioHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-fg" data-testid="studio-home">
          Studio Dashboard
        </h1>
        <p className="text-fg-muted">
          Upload and manage your music assets with modern file handling
        </p>
        
        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a 
            href="/studio/assets" 
            className="glass-neumorphic-button px-4 py-2 text-sm border border-border hover:border-cta-brand/40"
          >
            View All Assets
          </a>
          <a 
            href="/studio/upload/audio" 
            className="glass-neumorphic-button px-4 py-2 text-sm border border-border hover:border-cta-brand/40"
          >
            Upload Audio
          </a>
          <a 
            href="/studio/upload/images" 
            className="glass-neumorphic-button px-4 py-2 text-sm border border-border hover:border-cta-brand/40"
          >
            Upload Images
          </a>
          <a 
            href="/studio/analytics" 
            className="glass-neumorphic-button px-4 py-2 text-sm border border-border hover:border-cta-brand/40"
          >
            View Analytics
          </a>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-neumorphic-card p-4 border border-border hover:border-cta-brand/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-brand flex items-center justify-center">
              <MusicalNoteIcon className="w-5 h-5 text-bg" />
            </div>
            <div>
              <div className="text-2xl font-bold text-fg">3</div>
              <div className="text-sm text-fg-muted">Audio Assets</div>
            </div>
          </div>
        </div>
        <div className="glass-neumorphic-card p-4 border border-border hover:border-cta-premium/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-cta flex items-center justify-center">
              <PhotoIcon className="w-5 h-5 text-bg" />
            </div>
            <div>
              <div className="text-2xl font-bold text-fg">1</div>
              <div className="text-sm text-fg-muted">Images</div>
            </div>
          </div>
        </div>
        <div className="glass-neumorphic-card p-4 border border-border hover:border-cta-premium/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-premium flex items-center justify-center">
              <ChartBarIcon className="w-5 h-5 text-bg" />
            </div>
            <div>
              <div className="text-2xl font-bold text-fg">198</div>
              <div className="text-sm text-fg-muted">Total Plays</div>
            </div>
          </div>
        </div>
        <div className="glass-neumorphic-card p-4 border border-border hover:border-semantic-warning/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-neutral flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-bg" />
            </div>
            <div>
              <div className="text-2xl font-bold text-fg">1</div>
              <div className="text-sm text-fg-muted">Processing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-neumorphic-card p-6 border border-border hover:border-cta-brand/30">
          <div className="flex items-center gap-3 mb-4">
            <ArrowUpTrayIcon className="w-5 h-5 text-cta-brand" />
            <h2 className="text-lg font-semibold text-fg">Upload Audio</h2>
          </div>
          <AudioUploadDropzone />
        </div>
        
        <div className="glass-neumorphic-card p-6 border border-border hover:border-cta-premium/30">
          <div className="flex items-center gap-3 mb-4">
            <ArrowUpTrayIcon className="w-5 h-5 text-cta-premium" />
            <h2 className="text-lg font-semibold text-fg">Upload Images</h2>
          </div>
          <ImageUploadDropzone />
        </div>
      </div>
    </div>
  );
}
