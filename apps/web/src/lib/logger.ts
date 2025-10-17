/**
 * Safe logger that respects production environment
 * Use this instead of raw console.* statements
 */

type LogFn = (...args: unknown[]) => void;

const noop: LogFn = () => {};
const isProd = process.env.NODE_ENV === "production";

export const log = {
  debug: isProd ? noop : console.debug.bind(console),
  info: isProd ? noop : console.info.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
} as const;

// Re-export for convenience
export const { debug, info, warn, error } = log;
