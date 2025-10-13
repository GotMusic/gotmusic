import clsx from "clsx";
import type React from "react";

export function Card({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={clsx(
        "rounded-md border border-white/10 bg-bg-elevated p-4 shadow-elev-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children }: React.PropsWithChildren) {
  return <h3 className="mb-1 text-lg font-semibold text-fg">{children}</h3>;
}

export function CardMeta({ children }: React.PropsWithChildren) {
  return <p className="text-sm text-fg/70">{children}</p>;
}
