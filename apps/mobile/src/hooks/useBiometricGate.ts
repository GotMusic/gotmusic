import * as LocalAuthentication from "expo-local-authentication";
import { useCallback, useState } from "react";
import * as Keychain from "react-native-keychain";

export interface BiometricGateResult {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useBiometricGate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authenticate = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if biometric authentication is available
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        // Fallback to PIN-based authentication for development
        return await authenticateWithPIN();
      }

      // Attempt biometric authentication
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to access your music",
        fallbackLabel: "Use PIN",
        cancelLabel: "Cancel",
      });

      if (result.success) {
        // Store authentication state in keychain for session persistence
        await Keychain.setInternetCredentials(
          "gotmusic_biometric_session",
          "authenticated",
          "true",
          {
            accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
            authenticationType: Keychain.AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
          },
        );
      }

      return result.success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Authentication failed";
      setError(errorMessage);
      console.error("Biometric authentication error:", errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const authenticateWithPIN = useCallback(async (): Promise<boolean> => {
    // For development/stub mode, simulate PIN authentication
    // In production, this would integrate with a proper PIN input screen
    return true;
  }, []);

  const checkBiometricAvailability = useCallback(async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

      return {
        hasHardware,
        isEnrolled,
        supportedTypes,
        isAvailable: hasHardware && isEnrolled,
      };
    } catch (err) {
      console.error("Error checking biometric availability:", err);
      return {
        hasHardware: false,
        isEnrolled: false,
        supportedTypes: [],
        isAvailable: false,
      };
    }
  }, []);

  const clearBiometricSession = useCallback(async () => {
    try {
      await Keychain.resetInternetCredentials("gotmusic_biometric_session");
    } catch (err) {
      console.error("Error clearing biometric session:", err);
    }
  }, []);

  return {
    authenticate,
    checkBiometricAvailability,
    clearBiometricSession,
    isLoading,
    error,
  };
}
