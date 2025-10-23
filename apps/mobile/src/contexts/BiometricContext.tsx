import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

interface BiometricContextType {
  isBiometricAvailable: boolean;
  isBiometricEnabled: boolean;
  biometricType: LocalAuthentication.AuthenticationType[];
  authenticateWithBiometric: () => Promise<boolean>;
  enableBiometric: () => Promise<boolean>;
  disableBiometric: () => Promise<void>;
  checkBiometricStatus: () => Promise<void>;
}

const BiometricContext = createContext<BiometricContextType | undefined>(undefined);

export function BiometricProvider({ children }: { children: React.ReactNode }) {
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [biometricType, setBiometricType] = useState<LocalAuthentication.AuthenticationType[]>([]);

  const checkBiometricStatus = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
      const enabled = await SecureStore.getItemAsync("biometricEnabled");

      setIsBiometricAvailable(hasHardware && isEnrolled);
      setBiometricType(types);
      setIsBiometricEnabled(enabled === "true");
    } catch (error) {
      console.error("Biometric status check failed:", error);
    }
  };

  const authenticateWithBiometric = async (): Promise<boolean> => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to access GotMusic",
        fallbackLabel: "Use Passkey",
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });
      return result.success;
    } catch (error) {
      console.error("Biometric auth failed:", error);
      return false;
    }
  };

  const enableBiometric = async (): Promise<boolean> => {
    try {
      // Test biometric first
      const testResult = await LocalAuthentication.authenticateAsync({
        promptMessage: "Enable biometric authentication",
        fallbackLabel: "Cancel",
        cancelLabel: "Cancel",
      });

      if (testResult.success) {
        await SecureStore.setItemAsync("biometricEnabled", "true");
        setIsBiometricEnabled(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to enable biometric:", error);
      return false;
    }
  };

  const disableBiometric = async () => {
    try {
      await SecureStore.deleteItemAsync("biometricEnabled");
      setIsBiometricEnabled(false);
    } catch (error) {
      console.error("Failed to disable biometric:", error);
    }
  };

  useEffect(() => {
    checkBiometricStatus();
  }, []);

  return (
    <BiometricContext.Provider
      value={{
        isBiometricAvailable,
        isBiometricEnabled,
        biometricType,
        authenticateWithBiometric,
        enableBiometric,
        disableBiometric,
        checkBiometricStatus,
      }}
    >
      {children}
    </BiometricContext.Provider>
  );
}

export function useBiometric() {
  const context = useContext(BiometricContext);
  if (context === undefined) {
    throw new Error("useBiometric must be used within a BiometricProvider");
  }
  return context;
}
