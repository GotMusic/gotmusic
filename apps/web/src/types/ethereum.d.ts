// Ethereum provider types for EIP-1193 compatibility
interface EthereumProvider {
  request(args: { method: string; params?: any[] }): Promise<any>;
  isMetaMask?: boolean;
  isConnected(): boolean;
  on(event: string, handler: (...args: any[]) => void): void;
  removeListener(event: string, handler: (...args: any[]) => void): void;
}

interface Window {
  ethereum?: EthereumProvider;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
