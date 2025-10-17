"use client";
import type { Metadata } from "next";
import { useState } from "react";

// Note: metadata export doesn't work in client components
// Move to separate layout or handle differently

export default function UploadsPage() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-fg">Uploads</h1>
        <p className="text-fg/70">Upload audio files to your catalog</p>
      </header>

      {/* Drag-drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (!file) return;
          // TODO: Handle file upload
          console.log("File dropped:", file.name);
        }}
        className={`rounded-2xl border-2 border-dashed p-12 text-center transition ${
          isDragging ? "border-brand-primary bg-brand-primary/5" : "border-fg/20"
        }`}
      >
        <div className="mb-4 text-6xl">🎵</div>
        <p className="mb-2 text-lg text-fg">Drag & drop your audio file here</p>
        <p className="text-sm text-fg/60">WAV, AIFF, or FLAC • Max 100MB</p>
        <p className="mt-4 text-xs text-fg/50">
          We'll automatically generate a 30s preview + waveform
        </p>
      </div>

      {/* Upload queue (future) */}
      <div className="mt-6">
        <h2 className="mb-3 text-lg font-semibold text-fg">Recent Uploads</h2>
        <div className="rounded-lg border border-fg/10 bg-fg/5 p-4">
          <p className="text-sm text-fg/60 text-center">
            No uploads yet. Drop a file above to get started!
          </p>
        </div>
      </div>
    </div>
  );
}
