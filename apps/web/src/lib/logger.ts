import type { RequestContext } from "./request-id";

/**
 * Structured logging utilities with request correlation
 */

export interface LogEntry {
  timestamp: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  requestId?: string;
  method?: string;
  path?: string;
  userAgent?: string;
  ip?: string;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
  metadata?: Record<string, unknown>;
}

/**
 * Create a structured logger with request context
 */
export function createLogger(context?: RequestContext) {
  return {
    info: (message: string, metadata?: Record<string, unknown>) => {
      log({
        level: "info",
        message,
        timestamp: new Date().toISOString(),
        ...context,
        metadata,
      });
    },

    warn: (message: string, metadata?: Record<string, unknown>) => {
      log({
        level: "warn",
        message,
        timestamp: new Date().toISOString(),
        ...context,
        metadata,
      });
    },

    error: (message: string, error?: Error, metadata?: Record<string, unknown>) => {
      log({
        level: "error",
        message,
        timestamp: new Date().toISOString(),
        ...context,
        error: error
          ? {
              name: error.name,
              message: error.message,
              stack: error.stack,
            }
          : undefined,
        metadata,
      });
    },

    debug: (message: string, metadata?: Record<string, unknown>) => {
      log({
        level: "debug",
        message,
        timestamp: new Date().toISOString(),
        ...context,
        metadata,
      });
    },
  };
}

/**
 * Core logging function
 */
function log(entry: LogEntry): void {
  const logLine = JSON.stringify(entry);

  // Use appropriate console method based on level
  switch (entry.level) {
    case "error":
      console.error(logLine);
      break;
    case "warn":
      console.warn(logLine);
      break;
    case "debug":
      if (process.env.NODE_ENV === "development") {
        console.debug(logLine);
      }
      break;
    default:
      console.log(logLine);
  }
}

/**
 * Global logger for non-request-scoped logging
 */
export const logger = createLogger();
