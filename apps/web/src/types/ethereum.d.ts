// Ethereum provider types for EIP-1193 compatibility
interface EthereumProvider {
  request(args: { method: string; params?: readonly unknown[] }): Promise<unknown>;
  isMetaMask?: boolean;
  isConnected(): boolean;
  on(event: string, handler: (...args: unknown[]) => void): void;
  removeListener(event: string, handler: (...args: unknown[]) => void): void;
}

interface Window {
  ethereum?: EthereumProvider;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
