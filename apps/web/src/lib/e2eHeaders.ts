/**
 * E2E testing headers helper
 *
 * Provides consistent headers for client-side fetches during E2E tests.
 * Set NEXT_PUBLIC_E2E_BYPASS="bypass" in CI for client fetches.
 */
export function e2eHeaders(): Record<string, string> {
  // Set NEXT_PUBLIC_E2E_BYPASS="bypass" in CI for client fetches
  return process.env.NEXT_PUBLIC_E2E_BYPASS ? { "x-e2e-auth": "bypass" } : {};
}
