import { getBlockscoutAttestationUrl, getBlockscoutTxUrl, truncateHash } from "@/lib/blockscout";
import type { ReactNode } from "react";

interface BlockscoutLinkProps {
  /** Transaction hash or attestation UID */
  hash: string;
  /** Type of link */
  type: "tx" | "attestation";
  /** Optional children (if provided, will render instead of truncated hash) */
  children?: ReactNode;
  /** Show full hash instead of truncated version */
  showFullHash?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Blockscout Link Component
 *
 * Renders a link to Blockscout explorer for viewing transactions or attestations.
 * Opens in a new tab with rel="noopener noreferrer" for security.
 *
 * @example
 * ```tsx
 * <BlockscoutLink hash="0x123..." type="tx" />
 * <BlockscoutLink hash="0xabc..." type="attestation">
 *   View Attestation
 * </BlockscoutLink>
 * ```
 */
export function BlockscoutLink({
  hash,
  type,
  children,
  showFullHash = false,
  className = "",
}: BlockscoutLinkProps) {
  if (!hash) return null;

  const url = type === "tx" ? getBlockscoutTxUrl(hash) : getBlockscoutAttestationUrl(hash);
  const displayText = children || (showFullHash ? hash : truncateHash(hash));

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-brand-500 hover:text-brand-600 hover:underline ${className}`}
      data-testid={`blockscout-link-${type}`}
    >
      {displayText}
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
      <span className="sr-only">(opens in new tab)</span>
    </a>
  );
}

/**
 * Blockscout Transaction Link
 * Convenience wrapper for transaction links
 */
export function BlockscoutTxLink({
  txHash,
  children,
  ...props
}: Omit<BlockscoutLinkProps, "hash" | "type"> & { txHash: string }) {
  return (
    <BlockscoutLink hash={txHash} type="tx" {...props}>
      {children || "View Transaction"}
    </BlockscoutLink>
  );
}

/**
 * Blockscout Attestation Link
 * Convenience wrapper for attestation links
 */
export function BlockscoutAttestationLink({
  uid,
  children,
  ...props
}: Omit<BlockscoutLinkProps, "hash" | "type"> & { uid: string }) {
  return (
    <BlockscoutLink hash={uid} type="attestation" {...props}>
      {children || "View Attestation"}
    </BlockscoutLink>
  );
}
