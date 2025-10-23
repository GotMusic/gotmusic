import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

interface PasskeyContextType {
  isPasskeyAvailable: boolean;
  isPasskeyEnabled: boolean;
  createPasskey: (walletAddress: string) => Promise<boolean>;
  authenticateWithPasskey: () => Promise<boolean>;
  enablePasskey: () => Promise<boolean>;
  disablePasskey: () => Promise<void>;
  checkPasskeyStatus: () => Promise<void>;
}

const PasskeyContext = createContext<PasskeyContextType | undefined>(undefined);

export function PasskeyProvider({ children }: { children: React.ReactNode }) {
  const [isPasskeyAvailable, setIsPasskeyAvailable] = useState(false);
  const [isPasskeyEnabled, setIsPasskeyEnabled] = useState(false);

  const checkPasskeyStatus = async () => {
    try {
      // Check if passkey is available (simplified for now)
      // In a real implementation, this would check WebAuthn support
      const hasPasskey = await SecureStore.getItemAsync("passkeyId");
      const enabled = await SecureStore.getItemAsync("passkeyEnabled");

      setIsPasskeyAvailable(true); // Assume available for now
      setIsPasskeyEnabled(enabled === "true" && hasPasskey !== null);
    } catch (error) {
      console.error("Passkey status check failed:", error);
    }
  };

  const createPasskey = async (walletAddress: string): Promise<boolean> => {
    try {
      // TODO: Integrate with actual passkey creation
      // This would use WebAuthn API or native passkey libraries
      const passkeyId = `passkey_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      await SecureStore.setItemAsync("passkeyId", passkeyId);
      await SecureStore.setItemAsync("passkeyWallet", walletAddress);
      await SecureStore.setItemAsync("passkeyEnabled", "true");

      setIsPasskeyEnabled(true);
      return true;
    } catch (error) {
      console.error("Passkey creation failed:", error);
      return false;
    }
  };

  const authenticateWithPasskey = async (): Promise<boolean> => {
    try {
      // TODO: Integrate with actual passkey authentication
      // This would use WebAuthn API or native passkey libraries
      const passkeyId = await SecureStore.getItemAsync("passkeyId");

      if (passkeyId) {
        // Simulate passkey authentication
        return new Promise((resolve) => {
          setTimeout(() => resolve(true), 1000);
        });
      }
      return false;
    } catch (error) {
      console.error("Passkey auth failed:", error);
      return false;
    }
  };

  const enablePasskey = async (): Promise<boolean> => {
    try {
      await SecureStore.setItemAsync("passkeyEnabled", "true");
      setIsPasskeyEnabled(true);
      return true;
    } catch (error) {
      console.error("Failed to enable passkey:", error);
      return false;
    }
  };

  const disablePasskey = async () => {
    try {
      await SecureStore.deleteItemAsync("passkeyEnabled");
      await SecureStore.deleteItemAsync("passkeyId");
      await SecureStore.deleteItemAsync("passkeyWallet");
      setIsPasskeyEnabled(false);
    } catch (error) {
      console.error("Failed to disable passkey:", error);
    }
  };

  useEffect(() => {
    checkPasskeyStatus();
  });

  return (
    <PasskeyContext.Provider
      value={{
        isPasskeyAvailable,
        isPasskeyEnabled,
        createPasskey,
        authenticateWithPasskey,
        enablePasskey,
        disablePasskey,
        checkPasskeyStatus,
      }}
    >
      {children}
    </PasskeyContext.Provider>
  );
}

export function usePasskey() {
  const context = useContext(PasskeyContext);
  if (context === undefined) {
    throw new Error("usePasskey must be used within a PasskeyProvider");
  }
  return context;
}
