// React Native side: no Lit imports at all (avoids Node crypto issues)
import React, { createContext, useContext, useMemo, type PropsWithChildren } from "react";

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

// React Context for Lit Protocol service
const LitProtocolServiceContext = createContext<LitProtocolServiceContextType | null>(null);

export function LitProtocolServiceProvider({ children }: PropsWithChildren<{}>) {
  const value = useMemo<LitProtocolServiceContextType>(
    () => ({
      // TODO: Call server endpoints instead of on-device Lit
      async encryptAsset(
        assetData: string,
        accessControlConditions: LitAccessControlCondition[],
      ): Promise<LitEncryptionResult> {
        console.log("Lit Protocol encryption (mobile stub):", {
          assetDataLength: assetData.length,
          accessControlConditions: accessControlConditions.length,
        });

        // Mock implementation for mobile - TODO: call server endpoint
        const encryptedData = `mobile_encrypted_${Buffer.from(assetData).toString("base64")}`;
        const encryptedSymmetricKey = `mobile_key_${Math.random().toString(16).substr(2, 32)}`;
        const accessControlConditionsJson = JSON.stringify(accessControlConditions);

        return {
          encryptedData,
          encryptedSymmetricKey,
          accessControlConditions: accessControlConditionsJson,
          chainId: 84532, // Base Sepolia
          contractAddress: "0x0000000000000000000000000000000000000000",
          standardContractType: "ERC721",
        };
      },

      async decryptAsset(
        encryptedData: string,
        encryptedSymmetricKey: string,
        accessControlConditions: string,
      ): Promise<LitDecryptionResult> {
        console.log("Lit Protocol decryption (mobile stub):", {
          encryptedDataLength: encryptedData.length,
          encryptedSymmetricKeyLength: encryptedSymmetricKey.length,
          accessControlConditionsLength: accessControlConditions.length,
        });

        // Mock implementation for mobile - TODO: call server endpoint
        const decryptedData = Buffer.from(
          encryptedData.replace("mobile_encrypted_", ""),
          "base64",
        ).toString("utf8");

        return {
          decryptedData,
          success: true,
        };
      },

      async checkLicense(
        assetId: string,
        buyer: string,
      ): Promise<{ authorized: boolean; reason?: string }> {
        console.log("License check (mobile stub):", { assetId, buyer });

        // TODO: Call server endpoint to check EAS attestation
        return {
          authorized: false,
          reason: "Mobile stub – route via server endpoint",
        };
      },

      createLicenseAccessCondition(assetId: string, buyer: string): LitAccessControlCondition {
        return {
          contractAddress: "0x0000000000000000000000000000000000000000",
          standardContractType: "ERC721",
          chain: "84532",
          method: "hasAttestation",
          parameters: [assetId, buyer],
          returnValueTest: {
            key: "",
            comparator: "=",
            value: "true",
          },
        };
      },

      // Service state
      isConnected: true,
      isLoading: false,
      error: null,
    }),
    [],
  );

  return (
    <LitProtocolServiceContext.Provider value={value}>
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
