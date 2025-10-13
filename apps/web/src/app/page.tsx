import React from "react";
import { VALIDATED as ASSETS } from "@gotmusic/fixtures";

export default function Home() {
  return (
    <main className="min-h-dvh p-6">
      <h1 className="text-2xl font-semibold">GotMusic</h1>
      <p className="mt-1 text-fg/70">Fixtures wired — sample catalog</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ASSETS.map((a) => (
          <li key={a.id} className="rounded-md border border-white/10 bg-bg-elevated p-4">
            <div className="mb-1 text-lg font-medium text-fg">{a.title}</div>
            <div className="text-sm text-fg/70">
              {a.artist} · {a.bpm ?? "—"} BPM · {a.key ?? "—"}
            </div>
            <div className="mt-2 text-sm">
              ${a.price.amount} {a.price.currency}
            </div>
            {/* biome-ignore lint/a11y/useMediaCaption: 30s instrumental preview only; no speech to caption */}
            <audio
              className="mt-3 w-full"
              src={a.previewUrl}
              controls
              preload="none"
              aria-label={`30-second preview for ${a.title} by ${a.artist}`}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
