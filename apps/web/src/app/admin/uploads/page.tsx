"use client";

import { useUpload } from "@/lib/useUpload";
import { useState } from "react";

export default function AdminUploadsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pct, setPct] = useState(0);
  const { state, error, busy, upload, reset } = useUpload({
    onProgress: (p) => setPct(p),
  });

  async function onClick() {
    if (!file) return;
    setPct(0);
    await upload(file);
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold" data-testid="upload-heading">Uploads</h1>
      <div className="mt-4 rounded-md border border-white/10 p-4">
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="block"
          data-testid="file-input"
        />
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={onClick}
            disabled={!file || busy}
            className="inline-flex items-center rounded-md bg-[var(--color-brand-600)] px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
            data-testid="upload-button"
          >
            {busy ? "Uploading…" : "Upload"}
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={busy}
            className="inline-flex items-center rounded-md border border-white/10 bg-bg-elevated px-3 py-2 text-sm"
            data-testid="reset-button"
          >
            Reset
          </button>
          {busy ? <span className="text-sm text-fg/70">{pct}%</span> : null}
        </div>
        <div className="mt-2 text-sm text-fg/70">
          State: {state} {error ? `— ${error}` : ""}
        </div>
      </div>
    </main>
  );
}
