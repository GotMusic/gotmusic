/**
 * Blockscout Explorer utilities for Base Sepolia
 *
 * Provides helper functions to generate Blockscout URLs for:
 * - Transaction hashes
 * - EAS attestation UIDs
 * - Addresses
 *
 * @see https://base-sepolia.blockscout.com
 */

const BLOCKSCOUT_BASE_URL =
  process.env.NEXT_PUBLIC_BLOCKSCOUT_URL || "https://base-sepolia.blockscout.com";

/**
 * Get Blockscout URL for a transaction hash
 * @param txHash - Transaction hash (0x...)
 * @returns Full Blockscout URL
 */
export function getBlockscoutTxUrl(txHash: string): string {
  if (!txHash) return "";
  const cleanHash = txHash.startsWith("0x") ? txHash : `0x${txHash}`;
  return `${BLOCKSCOUT_BASE_URL}/tx/${cleanHash}`;
}

/**
 * Get Blockscout URL for an EAS attestation UID
 * EAS attestations can be viewed on Blockscout by searching the UID
 * @param attestationUid - EAS attestation UID (0x...)
 * @returns Full Blockscout URL
 */
export function getBlockscoutAttestationUrl(attestationUid: string): string {
  if (!attestationUid) return "";
  const cleanUid = attestationUid.startsWith("0x") ? attestationUid : `0x${attestationUid}`;
  // Attestations can be searched on Blockscout
  return `${BLOCKSCOUT_BASE_URL}/search?q=${cleanUid}`;
}

/**
 * Get Blockscout URL for an address
 * @param address - Ethereum address (0x...)
 * @returns Full Blockscout URL
 */
export function getBlockscoutAddressUrl(address: string): string {
  if (!address) return "";
  const cleanAddress = address.startsWith("0x") ? address : `0x${address}`;
  return `${BLOCKSCOUT_BASE_URL}/address/${cleanAddress}`;
}

/**
 * Truncate an address/hash for display (0x1234...5678)
 * @param hash - Full hash string
 * @param prefixLength - Number of chars after 0x to show (default: 4)
 * @param suffixLength - Number of chars at end to show (default: 4)
 * @returns Truncated string
 */
export function truncateHash(hash: string, prefixLength = 4, suffixLength = 4): string {
  if (!hash) return "";
  if (hash.length <= prefixLength + suffixLength + 2) return hash; // Too short to truncate

  const prefix = hash.slice(0, 2 + prefixLength); // 0x + prefix
  const suffix = hash.slice(-suffixLength);
  return `${prefix}...${suffix}`;
}
