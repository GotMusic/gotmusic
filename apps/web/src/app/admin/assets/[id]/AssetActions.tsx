"use client";

import { useCompleteAssetProcessing } from "@gotmusic/api";
import { useState } from "react";

export default function AssetActions({ assetId, status }: { assetId: string; status: string }) {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const completeProcessing = useCompleteAssetProcessing({
    onSuccess: (data) => {
      console.log(`✅ Asset marked as ${data.status}`);
    },
    onError: (error) => {
      setErr(error.message);
    },
  });

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
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "error");
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    if (!downloadUrl) return;
    await navigator.clipboard.writeText(downloadUrl);
  }

  function markAsReady() {
    setErr(null);
    completeProcessing.mutate({ assetId, status: "ready" });
  }

  function markAsError() {
    setErr(null);
    completeProcessing.mutate({ assetId, status: "error", errorMessage: "Manual error trigger" });
  }

  return (
    <div className="mt-2 space-y-2 text-sm">
      {/* Processing Actions */}
      {status === "processing" && (
        <div className="space-y-2 rounded-md border border-warning/20 bg-warning/10 p-3">
          <div className="text-warning font-medium">Asset is processing</div>
          <p className="text-fg/70 text-xs">
            Simulate processing completion (in production, this would be automatic):
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-md bg-success px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
              onClick={markAsReady}
              disabled={completeProcessing.isPending}
            >
              {completeProcessing.isPending ? "Marking..." : "Mark as Ready"}
            </button>
            <button
              type="button"
              className="rounded-md bg-danger px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
              onClick={markAsError}
              disabled={completeProcessing.isPending}
            >
              Mark as Error
            </button>
          </div>
        </div>
      )}

      {/* Download Link */}
      <button
        type="button"
        className="inline-flex items-center rounded-md bg-[var(--color-brand-600)] px-3 py-2 text-xs font-medium text-white disabled:opacity-50"
        onClick={genLink}
        disabled={busy || status === "processing"}
      >
        {busy ? "Generating…" : "Generate download link"}
      </button>
      {downloadUrl ? (
        <div className="rounded bg-white/5 p-2">
          <div className="truncate">{downloadUrl}</div>
          <button type="button" className="mt-1 underline" onClick={copy}>
            Copy
          </button>
        </div>
      ) : null}
      {err ? <div className="text-red-400">{err}</div> : null}
      <p className="text-fg/70">
        Note: route is stubbed; will return a short-lived signed URL later.
      </p>
    </div>
  );
}
