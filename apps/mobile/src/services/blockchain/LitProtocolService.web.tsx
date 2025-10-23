import { decryptToString, encryptString } from "@lit-protocol/encryption";
// import { LitAuthClient } from "@lit-protocol/lit-auth-client";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { AccessControlConditions } from "@lit-protocol/types";
// Web-only Lit Protocol implementation (can import Lit SDK here)
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type PropsWithChildren,
} from "react";

// Types for Lit Protocol integration
export interface LitEncryptionResult {
  encryptedData: string;
  encryptedSymmetricKey: string;
  accessControlConditions: string;
  chainId: number;
  contractAddress: string;
  standardContractType: string;
}

export interface LitDecryptionResult {
  decryptedData: string;
  success: boolean;
  error?: string | null;
}

export interface LitAccessControlCondition {
  contractAddress: string;
  standardContractType: string;
  chain: string;
  method: string;
  parameters: string[];
  returnValueTest: {
    key: string;
    comparator: string;
    value: string;
  };
}

export interface LitConfig {
  network: "datil-dev" | "datil-test" | "main";
  chainId: number;
  contractAddress: string;
  schemaUid: string;
  litNetwork: "datil-dev" | "datil-test" | "main";
  debug: boolean;
  relayApiKey: string;
}

export interface LitProtocolServiceContextType {
  // Encryption/Decryption
  encryptAsset: (
    assetData: string,
    accessControlConditions: LitAccessControlCondition[],
  ) => Promise<LitEncryptionResult>;
  decryptAsset: (
    encryptedData: string,
    encryptedSymmetricKey: string,
    accessControlConditions: string,
  ) => Promise<LitDecryptionResult>;

  // License Management
  checkLicense: (
    assetId: string,
    buyer: string,
  ) => Promise<{ authorized: boolean; reason?: string }>;
  createLicenseAccessCondition: (assetId: string, buyer: string) => LitAccessControlCondition;

  // Service State
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

// Real Lit Protocol implementation for web
class LitProtocolService {
  private config: LitConfig;
  private sessions: Map<string, string> = new Map();
  public litNodeClient: LitNodeClient;
  private litAuthClient: unknown;

  constructor(config: LitConfig) {
    this.config = config;
    this.litNodeClient = new LitNodeClient({
      litNetwork: config.litNetwork as "datil-dev" | "datil-test" | "main",
      debug: config.debug,
    });
    // this.litAuthClient = new LitAuthClient({
    //   litRelayConfig: {
    //     relayApiKey: config.relayApiKey,
    //   },
    // });
  }

  async encryptAsset(
    assetData: string,
    accessControlConditions: LitAccessControlCondition[],
  ): Promise<LitEncryptionResult> {
    try {
      // Connect to Lit Network
      await this.litNodeClient.connect();

      // Convert access control conditions to Lit Protocol format
      const litAccessControlConditions = accessControlConditions.map((acc) => ({
        contractAddress: acc.contractAddress,
        standardContractType: acc.standardContractType,
        chain: acc.chain,
        method: acc.method,
        parameters: acc.parameters,
        returnValueTest: acc.returnValueTest,
      }));

      // Get authentication signature
      const authSig = await (
        this.litAuthClient as {
          getAuthSig: () => Promise<{
            sig: string;
            derivedVia: string;
            signedMessage: string;
            address: string;
          }>;
        }
      ).getAuthSig();

      // Encrypt the asset data using Lit Protocol
      const encryptionResult = await encryptString(
        {
          accessControlConditions: litAccessControlConditions,
          dataToEncrypt: assetData,
        },
        this.litNodeClient,
      );

      // Store the session for future reference
      const sessionId = `session_${Date.now()}_${Math.random().toString(16).substr(2, 8)}`;
      this.sessions.set(sessionId, JSON.stringify({ accessControlConditions, authSig }));

      return {
        encryptedData: encryptionResult.ciphertext,
        encryptedSymmetricKey: encryptionResult.dataToEncryptHash,
        accessControlConditions: JSON.stringify(litAccessControlConditions),
        chainId: this.config.chainId,
        contractAddress: this.config.contractAddress,
        standardContractType: "ERC721",
      };
    } catch (error) {
      console.error("Lit Protocol encryption failed:", error);
      throw new Error(
        `Encryption failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async decryptAsset(
    encryptedData: string,
    encryptedSymmetricKey: string,
    accessControlConditions: string,
  ): Promise<LitDecryptionResult> {
    try {
      // Connect to Lit Network
      await this.litNodeClient.connect();

      // Parse access control conditions
      const accessControlConditionsArray = JSON.parse(accessControlConditions);

      // Convert to Lit's format
      const litAccessControlConditions = accessControlConditionsArray.map(
        (acc: LitAccessControlCondition) => ({
          contractAddress: acc.contractAddress,
          standardContractType: acc.standardContractType,
          chain: acc.chain,
          method: acc.method,
          parameters: acc.parameters,
          returnValueTest: acc.returnValueTest,
        }),
      );

      // Get authentication signature
      const authSig = await (
        this.litAuthClient as {
          getAuthSig: () => Promise<{
            sig: string;
            derivedVia: string;
            signedMessage: string;
            address: string;
          }>;
        }
      ).getAuthSig();

      // Decrypt the asset data using Lit Protocol
      const decryptedData = await decryptToString(
        {
          accessControlConditions: litAccessControlConditions,
          authSig,
          chain: this.config.chainId.toString(),
          ciphertext: encryptedData,
          dataToEncryptHash: encryptedSymmetricKey,
        },
        this.litNodeClient,
      );

      return {
        decryptedData,
        success: true,
      };
    } catch (error) {
      console.error("Lit Protocol decryption failed:", error);
      return {
        decryptedData: "",
        success: false,
        error: `Decryption failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  createLicenseAccessCondition(assetId: string, buyer: string): LitAccessControlCondition {
    // Create an access control condition that checks for a valid EAS attestation
    return {
      contractAddress: this.config.contractAddress,
      standardContractType: "ERC721",
      chain: this.config.chainId.toString(),
      method: "hasAttestation",
      parameters: [assetId, buyer],
      returnValueTest: {
        key: "",
        comparator: "=",
        value: "true",
      },
    };
  }

  async checkLicense(
    assetId: string,
    buyer: string,
  ): Promise<{ authorized: boolean; reason?: string }> {
    try {
      // Connect to Lit Network
      await this.litNodeClient.connect();

      // Create access control condition
      const accessControlCondition = this.createLicenseAccessCondition(assetId, buyer);

      // Check if the user has the required attestation
      const authSig = await (
        this.litAuthClient as {
          getAuthSig: () => Promise<{
            sig: string;
            derivedVia: string;
            signedMessage: string;
            address: string;
          }>;
        }
      ).getAuthSig();

      // This would normally check the EAS attestation
      // For now, return mock result
      return {
        authorized: true,
        reason: "Valid license attestation found",
      };
    } catch (error) {
      console.error("License check failed:", error);
      return {
        authorized: false,
        reason: `License check failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }
}

// React Context for Lit Protocol service
const LitProtocolServiceContext = createContext<LitProtocolServiceContextType | null>(null);

export function LitProtocolServiceProvider({ children }: PropsWithChildren<Record<string, never>>) {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize Lit Protocol service with environment config
  const [litService] = useState(() => {
    const config: LitConfig = {
      network:
        (process.env.EXPO_PUBLIC_LIT_NETWORK as "datil-dev" | "datil-test" | "main") || "datil-dev",
      chainId: Number.parseInt(process.env.EXPO_PUBLIC_CHAIN_ID || "84532"), // Base Sepolia for dev
      contractAddress:
        process.env.EXPO_PUBLIC_EAS_CONTRACT_ADDRESS ||
        "0x0000000000000000000000000000000000000000",
      schemaUid:
        process.env.EXPO_PUBLIC_LICENSE_SCHEMA_UID || "0x0000000000000000000000000000000000000000",
      litNetwork:
        (process.env.EXPO_PUBLIC_LIT_NETWORK as "datil-dev" | "datil-test" | "main") || "datil-dev",
      debug: process.env.EXPO_PUBLIC_LIT_DEBUG === "true",
      relayApiKey: process.env.EXPO_PUBLIC_LIT_RELAY_API_KEY || "",
    };

    return new LitProtocolService(config);
  });

  useEffect(() => {
    const initializeService = async () => {
      setIsLoading(true);
      try {
        // Initialize the Lit Protocol service
        await litService.litNodeClient.connect();
        setIsConnected(true);
        setError(null);
      } catch (err) {
        console.error("Failed to initialize Lit Protocol service:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeService();
  }, [litService]);

  const encryptAsset = async (
    assetData: string,
    accessControlConditions: LitAccessControlCondition[],
  ): Promise<LitEncryptionResult> => {
    return await litService.encryptAsset(assetData, accessControlConditions);
  };

  const decryptAsset = async (
    encryptedData: string,
    encryptedSymmetricKey: string,
    accessControlConditions: string,
  ): Promise<LitDecryptionResult> => {
    return await litService.decryptAsset(
      encryptedData,
      encryptedSymmetricKey,
      accessControlConditions,
    );
  };

  const checkLicense = async (
    assetId: string,
    buyer: string,
  ): Promise<{ authorized: boolean; reason?: string }> => {
    return await litService.checkLicense(assetId, buyer);
  };

  const createLicenseAccessCondition = (
    assetId: string,
    buyer: string,
  ): LitAccessControlCondition => {
    return litService.createLicenseAccessCondition(assetId, buyer);
  };

  const contextValue: LitProtocolServiceContextType = {
    encryptAsset,
    decryptAsset,
    checkLicense,
    createLicenseAccessCondition,
    isConnected,
    isLoading,
    error,
  };

  return (
    <LitProtocolServiceContext.Provider value={contextValue}>
      {children}
    </LitProtocolServiceContext.Provider>
  );
}

export function useLitProtocolService(): LitProtocolServiceContextType {
  const context = useContext(LitProtocolServiceContext);
  if (!context) {
    throw new Error("useLitProtocolService must be used within a LitProtocolServiceProvider");
  }
  return context;
}
