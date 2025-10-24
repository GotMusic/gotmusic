"use client";

// src/utils/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/utils/cva.ts
import { cva } from "class-variance-authority";
export {
  cn,
  cva
};
//# sourceMappingURL=index.js.map