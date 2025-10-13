import React from "react";

type Kind = "success" | "error" | "info";

export function Toast({
  kind = "success",
  title,
  message,
}: { kind?: Kind; title: string; message?: string }) {
  const color =
    kind === "error"
      ? "bg-red-500/10 text-red-300 border-red-500/30"
      : kind === "info"
        ? "bg-blue-500/10 text-blue-300 border-blue-500/30"
        : "bg-green-500/10 text-green-300 border-green-500/30";
  return (
    <output aria-live="polite" className={`rounded-md border p-3 ${color}`}>
      <div className="font-semibold">{title}</div>
      {message ? <div className="text-sm opacity-90">{message}</div> : null}
    </output>
  );
}
