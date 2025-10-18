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

// Create logger function for compatibility with existing code
export function createLogger(module?: string | object) {
  let prefix = "";
  if (typeof module === "string") {
    prefix = `[${module}]`;
  } else if (module && typeof module === "object") {
    // Handle object context for middleware
    const context = module as Record<string, unknown>;
    const parts = [];
    if (context.requestId) parts.push(`req:${context.requestId}`);
    if (context.method) parts.push(context.method);
    if (context.path) parts.push(context.path);
    prefix = parts.length > 0 ? `[${parts.join(" ")}]` : "";
  }

  return {
    debug: (...args: unknown[]) => log.debug(prefix, ...args),
    info: (...args: unknown[]) => log.info(prefix, ...args),
    warn: (...args: unknown[]) => log.warn(prefix, ...args),
    error: (...args: unknown[]) => log.error(prefix, ...args),
  };
}
