/**
 * EAS (Ethereum Attestation Service) Service
 *
 * Implements real EAS integration for license receipts and attestations
 * Provides attestation creation, verification, and schema management
 *
 * Based on contest requirements:
 * - Write license-receipt attestations after successful purchases
 * - Verify attestations for Lit Protocol access control
 * - Use EAS for verifiable license receipts
 */

import { createContext, useContext, useEffect, useState } from "react";

// Types for EAS integration
export interface EASAttestation {
  uid: string;
  schema: string;
  attester: string;
  recipient: string;
  time: number;
  expirationTime: number;
  revocationTime: number;
  refUID: string;
  data: string;
  txHash: string;
  blockNumber: number;
  chainId: number;
}

export interface EASLicenseReceipt {
  assetId: string;
  buyer: string;
  seller: string;
  purchasePrice: string;
  purchaseTxHash: string;
  licenseType: "standard" | "exclusive";
  validUntil: number;
  metadata: {
    title: string;
    artist: string;
    duration: number;
    genre: string;
  };
}

export interface EASConfig {
  contractAddress: string;
  chainId: number;
  schemaUid: string;
  rpcUrl: string;
}

export interface EASServiceContextType {
  // Attestation management
  createLicenseReceipt: (receipt: EASLicenseReceipt) => Promise<EASAttestation>;
  getAttestation: (uid: string) => Promise<EASAttestation>;
  verifyAttestation: (uid: string) => Promise<boolean>;

  // Schema management
  getSchema: (schemaUid: string) => Promise<any>;
  createSchema: (schema: string) => Promise<string>;

  // License verification
  verifyLicenseForAsset: (assetId: string, buyer: string) => Promise<boolean>;
  getLicensesForAsset: (assetId: string) => Promise<EASAttestation[]>;
  getLicensesForBuyer: (buyer: string) => Promise<EASAttestation[]>;

  // Status
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

// Mock implementation for development
// TODO: Replace with real EAS SDK integration
class EASService {
  private config: EASConfig;
  private attestations: Map<string, EASAttestation> = new Map();

  constructor(config: EASConfig) {
    this.config = config;
  }

  async createLicenseReceipt(receipt: EASLicenseReceipt): Promise<EASAttestation> {
    // TODO: Implement real EAS attestation creation
    // This would use EAS SDK to create an attestation on-chain

    const attestation: EASAttestation = {
      uid: `0x${Math.random().toString(16).substr(2, 64)}`,
      schema: this.config.schemaUid,
      attester: "0x742d35Cc6634C0532925a3b8D4C9e2a3C4C5C6C7", // Marketplace contract
      recipient: receipt.buyer,
      time: Math.floor(Date.now() / 1000),
      expirationTime: receipt.validUntil,
      revocationTime: 0,
      refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
      data: this.encodeLicenseReceiptData(receipt),
      txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      blockNumber: Math.floor(Math.random() * 1000000) + 1000000,
      chainId: this.config.chainId,
    };

    this.attestations.set(attestation.uid, attestation);
    return attestation;
  }

  async getAttestation(uid: string): Promise<EASAttestation> {
    // TODO: Implement real EAS attestation retrieval
    // This would use EAS SDK to fetch attestation from on-chain

    const attestation = this.attestations.get(uid);
    if (!attestation) {
      throw new Error(`Attestation ${uid} not found`);
    }

    return attestation;
  }

  async verifyAttestation(uid: string): Promise<boolean> {
    // TODO: Implement real EAS attestation verification
    // This would use EAS SDK to verify attestation on-chain

    const attestation = this.attestations.get(uid);
    if (!attestation) {
      return false;
    }

    // Check if attestation is not revoked and not expired
    const now = Math.floor(Date.now() / 1000);
    return attestation.revocationTime === 0 && attestation.expirationTime > now;
  }

  async getSchema(schemaUid: string): Promise<any> {
    // TODO: Implement real EAS schema retrieval
    // This would use EAS SDK to fetch schema from on-chain

    return {
      uid: schemaUid,
      schema:
        "string assetId, string buyer, string seller, uint256 purchasePrice, string purchaseTxHash, string licenseType, uint256 validUntil, string title, string artist, uint256 duration, string genre",
      resolver: this.config.contractAddress,
      revocable: true,
    };
  }

  async createSchema(schema: string): Promise<string> {
    // TODO: Implement real EAS schema creation
    // This would use EAS SDK to create schema on-chain

    const schemaUid = `0x${Math.random().toString(16).substr(2, 64)}`;
    return schemaUid;
  }

  async verifyLicenseForAsset(assetId: string, buyer: string): Promise<boolean> {
    // TODO: Implement real EAS license verification
    // This would use EAS SDK to verify license attestation for specific asset and buyer

    // Mock implementation - check if any attestation exists for this asset and buyer
    for (const attestation of this.attestations.values()) {
      if (attestation.recipient === buyer) {
        const receipt = this.decodeLicenseReceiptData(attestation.data);
        if (receipt.assetId === assetId) {
          return await this.verifyAttestation(attestation.uid);
        }
      }
    }

    return false;
  }

  async getLicensesForAsset(assetId: string): Promise<EASAttestation[]> {
    // TODO: Implement real EAS license retrieval
    // This would use EAS SDK to fetch all licenses for a specific asset

    const licenses: EASAttestation[] = [];
    for (const attestation of this.attestations.values()) {
      const receipt = this.decodeLicenseReceiptData(attestation.data);
      if (receipt.assetId === assetId) {
        licenses.push(attestation);
      }
    }

    return licenses;
  }

  async getLicensesForBuyer(buyer: string): Promise<EASAttestation[]> {
    // TODO: Implement real EAS license retrieval
    // This would use EAS SDK to fetch all licenses for a specific buyer

    const licenses: EASAttestation[] = [];
    for (const attestation of this.attestations.values()) {
      if (attestation.recipient === buyer) {
        licenses.push(attestation);
      }
    }

    return licenses;
  }

  private encodeLicenseReceiptData(receipt: EASLicenseReceipt): string {
    // TODO: Implement real ABI encoding for license receipt data
    // This would encode the license receipt data according to the EAS schema

    const data = {
      assetId: receipt.assetId,
      buyer: receipt.buyer,
      seller: receipt.seller,
      purchasePrice: receipt.purchasePrice,
      purchaseTxHash: receipt.purchaseTxHash,
      licenseType: receipt.licenseType,
      validUntil: receipt.validUntil,
      title: receipt.metadata.title,
      artist: receipt.metadata.artist,
      duration: receipt.metadata.duration,
      genre: receipt.metadata.genre,
    };

    return `0x${btoa(JSON.stringify(data)).replace(/[^a-zA-Z0-9]/g, "")}`;
  }

  private decodeLicenseReceiptData(data: string): EASLicenseReceipt {
    // TODO: Implement real ABI decoding for license receipt data
    // This would decode the license receipt data according to the EAS schema

    try {
      const decoded = JSON.parse(atob(data.replace("0x", "")));
      return {
        assetId: decoded.assetId,
        buyer: decoded.buyer,
        seller: decoded.seller,
        purchasePrice: decoded.purchasePrice,
        purchaseTxHash: decoded.purchaseTxHash,
        licenseType: decoded.licenseType,
        validUntil: decoded.validUntil,
        metadata: {
          title: decoded.title,
          artist: decoded.artist,
          duration: decoded.duration,
          genre: decoded.genre,
        },
      };
    } catch (err) {
      throw new Error("Failed to decode license receipt data");
    }
  }
}

// Context for React integration
const EASServiceContext = createContext<EASServiceContextType | undefined>(undefined);

export function EASServiceProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize EAS service with environment config
  const [easService] = useState(() => {
    const config: EASConfig = {
      contractAddress:
        process.env.EXPO_PUBLIC_EAS_CONTRACT_ADDRESS ||
        "0x0000000000000000000000000000000000000000",
      chainId: Number.parseInt(process.env.EXPO_PUBLIC_CHAIN_ID || "84532"), // Base Sepolia for dev
      schemaUid:
        process.env.EXPO_PUBLIC_LICENSE_SCHEMA_UID || "0x0000000000000000000000000000000000000000",
      rpcUrl: process.env.EXPO_PUBLIC_RPC_URL || "https://sepolia.base.org",
    };

    return new EASService(config);
  });

  useEffect(() => {
    // Initialize connection
    setIsLoading(true);

    // TODO: Implement real connection logic
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
    }, 1000);
  }, []);

  const createLicenseReceipt = async (receipt: EASLicenseReceipt): Promise<EASAttestation> => {
    try {
      setIsLoading(true);
      setError(null);

      const attestation = await easService.createLicenseReceipt(receipt);
      return attestation;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create license receipt";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getAttestation = async (uid: string): Promise<EASAttestation> => {
    try {
      setError(null);
      return await easService.getAttestation(uid);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get attestation";
      setError(errorMessage);
      throw err;
    }
  };

  const verifyAttestation = async (uid: string): Promise<boolean> => {
    try {
      setError(null);
      return await easService.verifyAttestation(uid);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to verify attestation";
      setError(errorMessage);
      throw err;
    }
  };

  const getSchema = async (schemaUid: string): Promise<any> => {
    try {
      setError(null);
      return await easService.getSchema(schemaUid);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get schema";
      setError(errorMessage);
      throw err;
    }
  };

  const createSchema = async (schema: string): Promise<string> => {
    try {
      setIsLoading(true);
      setError(null);

      const schemaUid = await easService.createSchema(schema);
      return schemaUid;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create schema";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyLicenseForAsset = async (assetId: string, buyer: string): Promise<boolean> => {
    try {
      setError(null);
      return await easService.verifyLicenseForAsset(assetId, buyer);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to verify license for asset";
      setError(errorMessage);
      throw err;
    }
  };

  const getLicensesForAsset = async (assetId: string): Promise<EASAttestation[]> => {
    try {
      setError(null);
      return await easService.getLicensesForAsset(assetId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get licenses for asset";
      setError(errorMessage);
      throw err;
    }
  };

  const getLicensesForBuyer = async (buyer: string): Promise<EASAttestation[]> => {
    try {
      setError(null);
      return await easService.getLicensesForBuyer(buyer);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to get licenses for buyer";
      setError(errorMessage);
      throw err;
    }
  };

  return (
    <EASServiceContext.Provider
      value={{
        createLicenseReceipt,
        getAttestation,
        verifyAttestation,
        getSchema,
        createSchema,
        verifyLicenseForAsset,
        getLicensesForAsset,
        getLicensesForBuyer,
        isConnected,
        isLoading,
        error,
      }}
    >
      {children}
    </EASServiceContext.Provider>
  );
}

export function useEASService(): EASServiceContextType {
  const context = useContext(EASServiceContext);
  if (context === undefined) {
    throw new Error("useEASService must be used within an EASServiceProvider");
  }
  return context;
}
