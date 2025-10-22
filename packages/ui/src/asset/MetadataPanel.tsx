"use client";

import { forwardRef, useState } from "react";
import { Save, X } from "../icons";
import { type VariantProps, cn, cva } from "../utils";

export interface AssetMetadata {
  title: string;
  artist: string;
  bpm: number;
  key: string;
  genre: string;
  mood: string;
  tags: string[];
  description: string;
  duration: number;
  fileSize: number;
  sampleRate: number;
  bitDepth: number;
  channels: number;
  tempo?: number;
  timeSignature?: string;
  energy?: number;
  valence?: number;
}

export interface MetadataPanelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof metadataPanelVariants> {
  metadata: AssetMetadata;
  isEditing?: boolean;
  isSaving?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  validationErrors?: Record<string, string[]>;
  onChange?: (metadata: AssetMetadata) => void;
  onSave?: (metadata: AssetMetadata) => void;
  onCancel?: () => void;
  onEdit?: () => void;
}

const metadataPanelVariants = cva("rounded-lg border transition-all duration-200", {
  variants: {
    variant: {
      default: "bg-bg-elevated border-border-subtle",
      editing: "bg-bg-elevated border-brand-primary ring-2 ring-brand-ring",
      error: "bg-bg-elevated border-semantic-danger ring-2 ring-semantic-danger/20",
    },
    size: {
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const formatFileSize = (bytes: number) => {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
};

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const MetadataPanel = forwardRef<HTMLDivElement, MetadataPanelProps>(
  (
    {
      className,
      metadata,
      isEditing = false,
      isSaving = false,
      hasError = false,
      errorMessage,
      validationErrors = {},
      onChange,
      onSave,
      onCancel,
      onEdit,
      variant,
      size,
      ...props
    },
    ref,
  ) => {
    const [localMetadata, setLocalMetadata] = useState(metadata);

    const handleFieldChange = (field: keyof AssetMetadata, value: string | number | string[]) => {
      const updated = { ...localMetadata, [field]: value };
      setLocalMetadata(updated);
      onChange?.(updated);
    };

    const handleSave = () => {
      onSave?.(localMetadata);
    };

    const handleCancel = () => {
      setLocalMetadata(metadata);
      onCancel?.();
    };

    const getFieldError = (field: string) => {
      return validationErrors[field]?.[0] || null;
    };

    const currentVariant = hasError ? "error" : isEditing ? "editing" : variant;

    return (
      <div
        ref={ref}
        className={cn(metadataPanelVariants({ variant: currentVariant, size }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-fg">Asset Metadata</h3>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md bg-brand-primary text-fg-inverse hover:bg-brand-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md bg-bg-muted text-fg-muted hover:bg-bg-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onEdit}
                className="px-3 py-1.5 text-sm font-medium rounded-md bg-bg-muted text-fg-muted hover:bg-bg-hover transition-colors"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Error Message */}
        {hasError && errorMessage && (
          <div className="mb-4 p-3 rounded-md bg-semantic-danger/10 border border-semantic-danger/20">
            <p className="text-sm text-semantic-danger">{errorMessage}</p>
          </div>
        )}

        {/* Metadata Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-fg mb-1">
                Title
              </label>
              {isEditing ? (
                <input
                  id="title"
                  type="text"
                  value={localMetadata.title}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-md bg-bg-muted border border-border-subtle text-fg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                  placeholder="Enter track title"
                />
              ) : (
                <p className="text-sm text-fg-muted">{metadata.title}</p>
              )}
              {getFieldError("title") && (
                <p className="text-xs text-semantic-danger mt-1">{getFieldError("title")}</p>
              )}
            </div>

            <div>
              <label htmlFor="artist" className="block text-sm font-medium text-fg mb-1">
                Artist
              </label>
              {isEditing ? (
                <input
                  id="artist"
                  type="text"
                  value={localMetadata.artist}
                  onChange={(e) => handleFieldChange("artist", e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-md bg-bg-muted border border-border-subtle text-fg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                  placeholder="Enter artist name"
                />
              ) : (
                <p className="text-sm text-fg-muted">{metadata.artist}</p>
              )}
              {getFieldError("artist") && (
                <p className="text-xs text-semantic-danger mt-1">{getFieldError("artist")}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-fg mb-1">
                Description
              </label>
              {isEditing ? (
                <textarea
                  id="description"
                  value={localMetadata.description}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-sm rounded-md bg-bg-muted border border-border-subtle text-fg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent resize-none"
                  placeholder="Enter track description"
                />
              ) : (
                <p className="text-sm text-fg-muted">{metadata.description || "No description"}</p>
              )}
              {getFieldError("description") && (
                <p className="text-xs text-semantic-danger mt-1">{getFieldError("description")}</p>
              )}
            </div>
          </div>

          {/* Technical Info */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="bpm" className="block text-sm font-medium text-fg mb-1">
                  BPM
                </label>
                {isEditing ? (
                  <input
                    id="bpm"
                    type="number"
                    value={localMetadata.bpm}
                    onChange={(e) => handleFieldChange("bpm", Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-md bg-bg-muted border border-border-subtle text-fg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                    placeholder="120"
                  />
                ) : (
                  <p className="text-sm text-fg-muted">{metadata.bpm || "—"}</p>
                )}
              </div>

              <div>
                <label htmlFor="key" className="block text-sm font-medium text-fg mb-1">
                  Key
                </label>
                {isEditing ? (
                  <input
                    id="key"
                    type="text"
                    value={localMetadata.key}
                    onChange={(e) => handleFieldChange("key", e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-md bg-bg-muted border border-border-subtle text-fg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                    placeholder="C"
                  />
                ) : (
                  <p className="text-sm text-fg-muted">{metadata.key || "—"}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-fg mb-1">
                  Genre
                </label>
                {isEditing ? (
                  <input
                    id="genre"
                    type="text"
                    value={localMetadata.genre}
                    onChange={(e) => handleFieldChange("genre", e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-md bg-bg-muted border border-border-subtle text-fg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                    placeholder="Hip-Hop"
                  />
                ) : (
                  <p className="text-sm text-fg-muted">{metadata.genre || "—"}</p>
                )}
              </div>

              <div>
                <label htmlFor="mood" className="block text-sm font-medium text-fg mb-1">
                  Mood
                </label>
                {isEditing ? (
                  <input
                    id="mood"
                    type="text"
                    value={localMetadata.mood}
                    onChange={(e) => handleFieldChange("mood", e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-md bg-bg-muted border border-border-subtle text-fg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                    placeholder="Dark"
                  />
                ) : (
                  <p className="text-sm text-fg-muted">{metadata.mood || "—"}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-fg mb-1">
                Tags
              </label>
              {isEditing ? (
                <input
                  id="tags"
                  type="text"
                  value={localMetadata.tags.join(", ")}
                  onChange={(e) =>
                    handleFieldChange("tags", e.target.value.split(", ").filter(Boolean))
                  }
                  className="w-full px-3 py-2 text-sm rounded-md bg-bg-muted border border-border-subtle text-fg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                  placeholder="trap, dark, 808"
                />
              ) : (
                <div className="flex flex-wrap gap-1">
                  {metadata.tags.length > 0 ? (
                    metadata.tags.map((tag) => (
                      <span
                        key={`tag-${tag}-${Date.now()}`}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-bg-muted text-fg-muted"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-fg-muted">No tags</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="mt-6 pt-4 border-t border-border-subtle">
          <h4 className="text-sm font-medium text-fg mb-3">Technical Details</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-fg-muted">Duration</span>
              <p className="text-fg">{formatDuration(metadata.duration)}</p>
            </div>
            <div>
              <span className="text-fg-muted">File Size</span>
              <p className="text-fg">{formatFileSize(metadata.fileSize)}</p>
            </div>
            <div>
              <span className="text-fg-muted">Sample Rate</span>
              <p className="text-fg">{metadata.sampleRate} Hz</p>
            </div>
            <div>
              <span className="text-fg-muted">Bit Depth</span>
              <p className="text-fg">{metadata.bitDepth}-bit</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

MetadataPanel.displayName = "MetadataPanel";

export { MetadataPanel };
