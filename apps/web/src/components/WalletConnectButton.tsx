"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@gotmusic/ui";

interface WalletState {
  address: string | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

export function WalletConnectButton() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    isLoading: false,
    error: null,
  });
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    // Session management removed - component now works without backend session
    // This is a placeholder for future session management
  };

  const connect = async () => {
    setWallet((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Check if ethereum provider is available
      if (!window.ethereum) {
        throw new Error("No Ethereum provider found. Please install MetaMask or another wallet.");
      }

      // Request accounts using EIP-1193
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts returned from wallet");
      }

      const address = accounts[0];

      // Set wallet state directly (no backend session management)
      setWallet({
        address,
        isConnected: true,
        isLoading: false,
        error: null,
      });

      // Refresh the page to update the UI
      router.refresh();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to connect wallet";
      setWallet((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  };

  const disconnect = async () => {
    // Clear wallet state directly (no backend session management)
    setWallet({
      address: null,
      isConnected: false,
      isLoading: false,
      error: null,
    });

    router.refresh();
  };

  if (wallet.isConnected && wallet.address) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={disconnect}
          disabled={wallet.isLoading}
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={connect}
        disabled={wallet.isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        {wallet.isLoading ? "Connecting..." : "Connect Wallet"}
      </Button>
      {wallet.error && (
        <p className="text-sm text-red-600">{wallet.error}</p>
      )}
    </div>
  );
}