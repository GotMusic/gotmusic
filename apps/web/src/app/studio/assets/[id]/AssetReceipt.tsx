"use client";

import { BlockscoutAttestationLink, BlockscoutTxLink } from "@/components/BlockscoutLink";

interface AssetReceiptProps {
  assetId: string;
}

/**
 * Asset Receipt Component
 *
 * Displays purchase receipt information including:
 * - Transaction hash with Blockscout link
 * - EAS attestation UID with Blockscout link
 *
 * Currently uses mock data until payment/EAS integration is complete.
 *
 * TODO: Replace with real data from database when:
 * - Payment system stores txHash in asset or separate purchases table
 * - EAS writer creates attestations and stores UID
 *
 * @see docs.d/EXECUTION-CHECKLIST.md sections 2, 5 for EAS/payment integration
 */
export default function AssetReceipt({ assetId }: AssetReceiptProps) {
  // Feature flag: Show receipt section when mock data enabled
  // Set to true to demo the UI, false to hide until real data exists
  const SHOW_MOCK_RECEIPT = process.env.NEXT_PUBLIC_SHOW_MOCK_RECEIPT === "true";

  // Mock data for demonstration
  // TODO: Replace with real data from database
  const mockTxHash = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
  const mockAttestationUid = "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890";

  // Don't show receipt if no mock data and no real data
  if (!SHOW_MOCK_RECEIPT) {
    return null;
  }

  return (
    <div className="rounded-md border border-fg/10 bg-bg p-4" data-testid="asset-receipt">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">License Receipt</h2>
        {SHOW_MOCK_RECEIPT && (
          <span
            className="rounded bg-brand-500/10 px-2 py-0.5 text-xs text-brand-500"
            data-testid="mock-badge"
          >
            Mock Data
          </span>
        )}
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <dt className="mb-1 text-fg/70">Transaction</dt>
          <dd className="font-mono text-xs" data-testid="receipt-tx">
            <BlockscoutTxLink txHash={mockTxHash} />
          </dd>
        </div>

        <div>
          <dt className="mb-1 text-fg/70">Attestation (EAS)</dt>
          <dd className="font-mono text-xs" data-testid="receipt-attestation">
            <BlockscoutAttestationLink uid={mockAttestationUid} />
          </dd>
        </div>

        <div className="mt-4 rounded bg-fg/5 p-3 text-xs text-fg/70">
          <p>
            <strong>Note:</strong> License receipts are immutable attestations stored on Base
            Sepolia via Ethereum Attestation Service (EAS). Click the links above to verify on
            Blockscout.
          </p>
        </div>
      </div>
    </div>
  );
}
