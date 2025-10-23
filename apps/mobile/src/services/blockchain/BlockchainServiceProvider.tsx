/**
 * Blockchain Service Provider
 *
 * Orchestrates all blockchain services for the complete GotMusic ecosystem
 * Provides unified interface for multi-currency payments, asset access, and licensing
 *
 * Services Integrated:
 * - MultiCurrencyService: PYUSD anchor pricing system
 * - AvailNexusService: Cross-chain payment bridging
 * - WalletService: Wallet connection and transaction signing
 * - BlockscoutService: Transaction tracking and explorer integration
 * - EASService: License receipt attestations
 * - LitProtocolService: Asset encryption and access control
 * - PurchaseService: Complete purchase flow orchestration
 */

import type React from "react";
import { NexusServiceProvider } from "./AvailNexusService";
import { BlockscoutServiceProvider } from "./BlockscoutService";
import { EASServiceProvider } from "./EASService";
import { LitProtocolServiceProvider } from "./LitProtocolService";
import { MultiCurrencyServiceProvider } from "./MultiCurrencyService";
import { PurchaseServiceProvider } from "./PurchaseService";
import { WalletServiceProvider } from "./WalletService";

export function BlockchainServiceProvider({ children }: { children: React.ReactNode }) {
  return (
    <MultiCurrencyServiceProvider>
      <NexusServiceProvider>
        <WalletServiceProvider>
          <BlockscoutServiceProvider>
            <EASServiceProvider>
              <LitProtocolServiceProvider>
                <PurchaseServiceProvider>{children}</PurchaseServiceProvider>
              </LitProtocolServiceProvider>
            </EASServiceProvider>
          </BlockscoutServiceProvider>
        </WalletServiceProvider>
      </NexusServiceProvider>
    </MultiCurrencyServiceProvider>
  );
}

// Re-export all hooks for easy access
export { useMultiCurrencyService } from "./MultiCurrencyService";
export { useNexusService } from "./AvailNexusService";
export { useWalletService } from "./WalletService";
export { useBlockscoutService } from "./BlockscoutService";
export { useEASService } from "./EASService";
export { useLitProtocolService } from "./LitProtocolService";
export { usePurchaseService } from "./PurchaseService";
