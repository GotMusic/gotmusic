import { Suspense } from "react";
import { MusicalNoteIcon, PhotoIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { 
  LibraryIcon, 
  MicrophoneIcon, 
  WaveformIcon, 
  PlayIcon,
  RecordIcon,
  HeadphonesIcon
} from "@gotmusic/icons";

// Mock data for now - will be replaced with real database queries
const mockAssets = [
  {
    id: "asset-001",
    title: "Deep House Beat",
    artist: "Producer Name",
    type: "audio",
    duration: "3:24",
    bpm: 128,
    key: "Am",
    status: "published",
    uploadDate: "2025-10-25",
    plays: 42,
    downloads: 8,
  },
  {
    id: "asset-002", 
    title: "Synth Lead",
    artist: "Producer Name",
    type: "audio",
    duration: "2:15",
    bpm: 140,
    key: "C",
    status: "processing",
    uploadDate: "2025-10-24",
    plays: 0,
    downloads: 0,
  },
  {
    id: "asset-003",
    title: "Cover Art",
    artist: "Producer Name", 
    type: "image",
    duration: null,
    bpm: null,
    key: null,
    status: "published",
    uploadDate: "2025-10-23",
    plays: 156,
    downloads: 23,
  },
];

function AssetsTable() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-fg">Your Assets</h2>
        <div className="flex gap-2">
          <button className="glass-neumorphic-button px-3 py-1 text-sm">
            Filter
          </button>
          <button className="glass-neumorphic-button px-3 py-1 text-sm">
            Sort
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-border-subtle bg-bg-elevated">
        <table className="min-w-full divide-y divide-border-subtle">
          <thead className="bg-bg-elevated">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-fg-muted uppercase tracking-wider">
                Asset
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-fg-muted uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-fg-muted uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-fg-muted uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-fg-muted uppercase tracking-wider">
                Stats
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-fg-muted uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {mockAssets.map((asset) => (
              <tr key={asset.id} className="hover:bg-bg-elevated/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {asset.type === "audio" ? (
                        <div className="h-10 w-10 rounded-lg bg-gradient-brand flex items-center justify-center">
                          <MusicalNoteIcon className="h-5 w-5 text-bg" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-gradient-cta flex items-center justify-center">
                          <PhotoIcon className="h-5 w-5 text-bg" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-fg">{asset.title}</div>
                      <div className="text-sm text-fg-muted">{asset.artist}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cta-brand/10 text-cta-brand">
                    {asset.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-fg-muted">
                  {asset.type === "audio" ? (
                    <div>
                      <div>{asset.duration} • {asset.bpm} BPM</div>
                      <div>Key: {asset.key}</div>
                    </div>
                  ) : (
                    <div>Image Asset</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    asset.status === "published" 
                      ? "bg-semantic-success/10 text-semantic-success"
                      : "bg-semantic-warning/10 text-semantic-warning"
                  }`}>
                    {asset.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-fg-muted">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <ChartBarIcon className="h-4 w-4" />
                      {asset.plays}
                    </div>
                    <div>{asset.downloads} downloads</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button className="text-cta-brand hover:text-cta-brand/80">
                      Edit
                    </button>
                    <button className="text-fg-muted hover:text-fg">
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function StudioAssetsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-fg">Asset Management</h1>
        <p className="text-fg-muted">
          Manage your uploaded audio files, images, and other assets
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-neumorphic-card p-4 border border-border hover:border-cta-brand/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-brand flex items-center justify-center">
              <LibraryIcon className="w-5 h-5 text-bg" />
            </div>
            <div>
              <div className="text-2xl font-bold text-fg">3</div>
              <div className="text-sm text-fg-muted">Total Assets</div>
            </div>
          </div>
        </div>
        <div className="glass-neumorphic-card p-4 border border-border hover:border-semantic-success/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-semantic-success flex items-center justify-center">
              <MicrophoneIcon className="w-5 h-5 text-bg" />
            </div>
            <div>
              <div className="text-2xl font-bold text-semantic-success">2</div>
              <div className="text-sm text-fg-muted">Published</div>
            </div>
          </div>
        </div>
        <div className="glass-neumorphic-card p-4 border border-border hover:border-semantic-warning/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-semantic-warning flex items-center justify-center">
              <RecordIcon className="w-5 h-5 text-bg" />
            </div>
            <div>
              <div className="text-2xl font-bold text-semantic-warning">1</div>
              <div className="text-sm text-fg-muted">Processing</div>
            </div>
          </div>
        </div>
        <div className="glass-neumorphic-card p-4 border border-border hover:border-cta-brand/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-cta flex items-center justify-center">
              <PlayIcon className="w-5 h-5 text-bg" />
            </div>
            <div>
              <div className="text-2xl font-bold text-cta-brand">198</div>
              <div className="text-sm text-fg-muted">Total Plays</div>
            </div>
          </div>
        </div>
        <div className="glass-neumorphic-card p-4 border border-border hover:border-cta-premium/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-premium flex items-center justify-center">
              <HeadphonesIcon className="w-5 h-5 text-bg" />
            </div>
            <div>
              <div className="text-2xl font-bold text-cta-premium">31</div>
              <div className="text-sm text-fg-muted">Downloads</div>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="text-fg-muted">Loading assets...</div>}>
        <AssetsTable />
      </Suspense>
    </div>
  );
}