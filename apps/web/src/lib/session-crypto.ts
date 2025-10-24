// Edge-safe helpers for HMAC-signed session cookies (matches middleware.ts)

const DEFAULT_COOKIE_NAME = "gm_session";

// Read from env if available; safe in Edge for Next.js runtime-injected env
const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || DEFAULT_COOKIE_NAME;
const HMAC_SECRET = process.env.SESSION_HMAC_SECRET || ""; // base64url or utf-8 text

// ---- public API -------------------------------------------------------------

export type SessionPayload = {
  sub: string; // user id
  roles?: string[]; // optional roles
  iat: number; // issued at (unix seconds)
  exp: number; // expires at (unix seconds)
  [key: string]: unknown; // any other claims
};

export async function createSessionCookieValue(payload: SessionPayload): Promise<string> {
  if (!HMAC_SECRET) {
    // Unsigned dev mode: encode payload only (still base64url)
    return `${bytesToBase64url(new TextEncoder().encode(JSON.stringify(payload)))}.`;
  }

  const payloadBytes = new TextEncoder().encode(JSON.stringify(payload));
  const key = await importHmacKey(HMAC_SECRET);
  const sig = await crypto.subtle.sign("HMAC", key, payloadBytes);
  return `${bytesToBase64url(payloadBytes)}.${bytesToBase64url(new Uint8Array(sig))}`;
}

export function sessionCookieName(): string {
  return COOKIE_NAME;
}

export function sessionMaxAgeFromExp(expUnixSeconds: number): number {
  const ms = expUnixSeconds * 1000 - Date.now();
  // Clamp to at least 0 and at most ~400 days (Chrome cap)
  return Math.max(0, Math.min(Math.floor(ms / 1000), 34560000));
}

// ---- crypto utils -----------------------------------------------------------

async function importHmacKey(secret: string): Promise<CryptoKey> {
  let raw: Uint8Array;
  try {
    raw = base64urlToBytes(secret);
  } catch {
    raw = new TextEncoder().encode(secret);
  }
  return crypto.subtle.importKey("raw", raw, { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

function base64urlToBytes(b64url: string): Uint8Array {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/") + padding(b64url);
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}
function bytesToBase64url(bytes: Uint8Array): string {
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  const b64 = btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  return b64;
}
function padding(b64url: string): string {
  const mod = b64url.length % 4;
  return mod === 2 ? "==" : mod === 3 ? "=" : mod === 1 ? "===" : "";
}
