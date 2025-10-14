"use client";

import { useCallback, useMemo, useRef, useState } from "react";

type SignResponse = {
  url: string;
  key: string;
  contentType: string;
};

export type UploadState = "idle" | "signing" | "uploading" | "done" | "error";

export type UseUploadOpts = {
  onProgress?: (pct: number) => void; // 0..100
  onDone?: (res: { ok: true; location?: string }) => void;
  onError?: (err: Error) => void;
};

export function useUpload(opts: UseUploadOpts = {}) {
  const [state, setState] = useState<UploadState>("idle");
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setState("idle");
    setError(null);
  }, []);

  const upload = useCallback(
    async (file: File) => {
      try {
        setError(null);
        setState("signing");

        const signRes = await fetch("/api/upload/sign", {
          method: "POST",
          body: JSON.stringify({ filename: file.name, contentType: file.type }),
        });
        if (!signRes.ok) throw new Error(`sign failed: ${signRes.status}`);
        const { url, key, contentType } = (await signRes.json()) as SignResponse;

        setState("uploading");

        // Use XHR to get progress events
        const controller = new AbortController();
        abortRef.current = controller;

        const xhr = new XMLHttpRequest();
        const doneP = new Promise<{ ok: true; location?: string }>((resolve, reject) => {
          xhr.upload.onprogress = (evt) => {
            if (!evt.lengthComputable) return;
            const pct = Math.floor((evt.loaded / evt.total) * 100);
            opts.onProgress?.(pct);
          };
          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              setState("done");
              resolve({ ok: true });
              opts.onDone?.({ ok: true });
            } else {
              const err = new Error(`upload failed: HTTP ${xhr.status}`);
              setState("error");
              setError(err.message);
              reject(err);
              opts.onError?.(err);
            }
          };
          xhr.onerror = () => {
            const err = new Error("network error during upload");
            setState("error");
            setError(err.message);
            reject(err);
            opts.onError?.(err);
          };
          xhr.onabort = () => {
            const err = new Error("upload aborted");
            setState("error");
            setError(err.message);
            reject(err);
            opts.onError?.(err);
          };
        });

        // Simple PUT (no more fields-based uploads)
        xhr.open("PUT", url, true);
        xhr.setRequestHeader("Content-Type", contentType);
        xhr.send(file);

        return await doneP;
      } catch (e: unknown) {
        setState("error");
        const error = e instanceof Error ? e : new Error("upload error");
        setError(error.message);
        opts.onError?.(error);
        throw error;
      } finally {
        abortRef.current = null;
      }
    },
    [opts],
  );

  const busy = state === "signing" || state === "uploading";

  return useMemo(
    () => ({ state, error, busy, upload, reset }),
    [state, error, busy, upload, reset],
  );
}
