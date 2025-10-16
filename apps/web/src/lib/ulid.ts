import { ulid } from "ulid";

/**
 * Generate a new ULID (Universally Unique Lexicographically Sortable Identifier)
 *
 * ULIDs are:
 * - 128-bit compatibility with UUID
 * - 1.21e+24 unique ULIDs per millisecond
 * - Lexicographically sortable
 * - Canonically encoded as a 26 character string
 * - Case insensitive
 * - No special characters (URL safe)
 *
 * @returns A new ULID string (26 characters)
 *
 * @example
 * const id = generateId(); // "01ARYZ6S41TSV4RRFFQ69G5FAV"
 */
export function generateId(): string {
  return ulid();
}

/**
 * Generate a ULID at a specific timestamp (for deterministic seeding/testing)
 *
 * @param timestamp - Unix timestamp in milliseconds
 * @returns A ULID string based on the provided timestamp
 *
 * @example
 * const seedTime = new Date("2025-01-01").getTime();
 * const id = generateIdAtTime(seedTime); // Deterministic for CI/E2E
 */
export function generateIdAtTime(timestamp: number): string {
  return ulid(timestamp);
}

/**
 * Check if a string is a valid ULID format
 *
 * @param id - String to validate
 * @returns True if valid ULID format
 *
 * @example
 * isValidUlid("01ARYZ6S41TSV4RRFFQ69G5FAV"); // true
 * isValidUlid("invalid"); // false
 */
export function isValidUlid(id: string): boolean {
  // ULID regex: 26 characters, Crockford's base32
  return /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/i.test(id);
}
