"use client";

import { useState } from "react";

interface WalletButtonProps {
  className?: string;
}

export default function WalletButton({ className }: WalletButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    
    try {
      // TODO: Implement actual wallet connection logic
      // This will be replaced with WalletConnect + Privy integration
      
      // Simulate connection for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock connected state
      setIsConnected(true);
      setWalletAddress("0x1234...5678");
      
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress(null);
  };

  if (isConnected && walletAddress) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex items-center gap-2 rounded-md bg-green-500/20 px-3 py-2 text-sm">
          <div className="h-2 w-2 rounded-full bg-green-400"></div>
          <span className="font-mono text-xs">{walletAddress}</span>
        </div>
        <button
          onClick={handleDisconnect}
          className="rounded-md bg-red-500/20 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/30 transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className={`rounded-md bg-brand-primary px-4 py-2 text-bg text-sm font-medium hover:bg-brand-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}
