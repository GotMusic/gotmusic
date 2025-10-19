import { useState, useCallback } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Keychain from 'react-native-keychain';

export interface BiometricGateResult {
  authorized: boolean;
  prompt: () => Promise<boolean>;
  isAvailable: boolean;
  isEnrolled: boolean;
}

export function useBiometricGate(): BiometricGateResult {
  const [authorized, setAuthorized] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const checkBiometricAvailability = useCallback(async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
      
      setIsAvailable(hasHardware && supportedTypes.length > 0);
      setIsEnrolled(isEnrolled);
      
      return hasHardware && isEnrolled;
    } catch (error) {
      console.error('Biometric availability check failed:', error);
      return false;
    }
  }, []);

  const prompt = useCallback(async (): Promise<boolean> => {
    try {
      const isAvailable = await checkBiometricAvailability();
      
      if (!isAvailable) {
        // Fallback to PIN or other authentication method
        return false;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access secure content',
        fallbackLabel: 'Use PIN',
        disableDeviceFallback: false,
      });

      if (result.success) {
        setAuthorized(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      return false;
    }
  }, [checkBiometricAvailability]);

  return {
    authorized,
    prompt,
    isAvailable,
    isEnrolled,
  };
}
