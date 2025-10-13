"use client";

import { useState } from "react";

export default function AssetActions({ assetId }: { assetId: string }) {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function genLink() {
    setBusy(true);
    setErr(null);
    setDownloadUrl(null);
    try {
      const res = await fetch(`/api/assets/${assetId}/download`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data.url) throw new Error(data.message || "No URL returned (stubbed)");
      setDownloadUrl(data.url);
    } catch (e: any) {
      setErr(e?.message ?? "error");
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    if (!downloadUrl) return;
    await navigator.clipboard.writeText(downloadUrl);
  }

  return (
    <div className="mt-2 space-y-2 text-sm">
      <button
        className="inline-flex items-center rounded-md bg-[var(--color-brand-600)] px-3 py-2 text-xs font-medium text-white disabled:opacity-50"
        onClick={genLink}
        disabled={busy}
      >
        {busy ? "Generating…" : "Generate download link"}
      </button>
      {downloadUrl ? (
        <div className="rounded bg-white/5 p-2">
          <div className="truncate">{downloadUrl}</div>
          <button className="mt-1 underline" onClick={copy}>
            Copy
          </button>
        </div>
      ) : null}
      {err ? <div className="text-red-400">{err}</div> : null}
      <p className="text-fg/70">Note: route is stubbed; will return a short-lived signed URL later.</p>
    </div>
  );
}


