"use client";

import { useUpload } from "@/lib/useUpload";
import { Button } from "@gotmusic/ui";
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
    <main id="main-content" className="p-6">
      <h1 className="text-2xl font-semibold" data-testid="upload-heading">
        Uploads
      </h1>
      <div className="mt-4 rounded-md border border-white/10 p-4">
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="block"
          data-testid="file-input"
        />
        <div className="mt-3 flex items-center gap-2">
          <Button
            type="button"
            onClick={onClick}
            disabled={!file || busy}
            data-testid="upload-button"
          >
            {busy ? "Uploading…" : "Upload"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={reset}
            disabled={busy}
            data-testid="reset-button"
          >
            Reset
          </Button>
          {busy ? <span className="text-sm text-fg/70">{pct}%</span> : null}
        </div>
        <div className="mt-2 text-sm text-fg/70">
          State: {state} {error ? `— ${error}` : ""}
        </div>
      </div>
    </main>
  );
}
