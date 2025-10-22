/**
 * Enhanced Authentication Context
 * 
 * Combines wallet connection with passkeys and biometrics for maximum security
 * and convenience. Wallet provides identity, passkeys provide cryptographic proof,
 * and biometrics provide convenient access.
 * 
 * Flow:
 * 1. User connects wallet (primary identity)
 * 2. System prompts to create passkey (cryptographic proof)
 * 3. User can optionally enable biometrics (convenience)
 * 4. Future logins use smart authentication based on context
 */

import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

interface EnhancedAuthContextType {
  // Authentication state
  isAuthenticated: boolean;
  walletAddress: string | null;
  walletProvider: string | null;
  isFirstTime: boolean;
  isLoading: boolean;
  
  // Security features
  hasPasskey: boolean;
  hasBiometric: boolean;
  isBiometricAvailable: boolean;
  
  // Authentication methods
  loginWithWallet: (address: string, provider: string) => Promise<void>;
  createPasskey: (walletAddress: string) => Promise<boolean>;
  enableBiometric: () => Promise<boolean>;
  authenticateWithBiometric: () => Promise<boolean>;
  authenticateWithPasskey: () => Promise<boolean>;
  
  // Session management
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  
  // Smart authentication
  smartLogin: () => Promise<boolean>;
  checkAuthStatus: () => Promise<void>;
  setFirstTimeComplete: () => Promise<void>;
}

const EnhancedAuthContext = createContext<EnhancedAuthContextType | undefined>(undefined);

export function EnhancedAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletProvider, setWalletProvider] = useState<string | null>(null);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPasskey, setHasPasskey] = useState(false);
  const [hasBiometric, setHasBiometric] = useState(false);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  useEffect(() => {
    checkAuthStatus();
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      setIsBiometricAvailable(hasHardware && isEnrolled);
    } catch (error) {
      console.error('Failed to check biometric availability:', error);
    }
  };

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      
      const address = await AsyncStorage.getItem('walletAddress');
      const provider = await AsyncStorage.getItem('walletProvider');
      const firstTime = await AsyncStorage.getItem('isFirstTime');
      const passkeyId = await SecureStore.getItemAsync('passkeyId');
      const biometricEnabled = await SecureStore.getItemAsync('biometricEnabled');
      
      if (address) {
        setWalletAddress(address);
        setWalletProvider(provider);
        setIsAuthenticated(true);
        setHasPasskey(!!passkeyId);
        setHasBiometric(biometricEnabled === 'true');
      }
      
      if (firstTime === null) {
        setIsFirstTime(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithWallet = async (address: string, provider: string) => {
    try {
      await AsyncStorage.setItem('walletAddress', address);
      await AsyncStorage.setItem('walletProvider', provider);
      setWalletAddress(address);
      setWalletProvider(provider);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Wallet login failed:', error);
      throw error;
    }
  };

  const createPasskey = async (walletAddress: string): Promise<boolean> => {
    try {
      // TODO: Implement real passkey creation
      // This would use WebAuthn API or native passkey libraries
      
      const passkeyId = `passkey_${Date.now()}_${Math.random().toString(16).substr(2, 8)}`;
      await SecureStore.setItemAsync('passkeyId', passkeyId);
      await SecureStore.setItemAsync('passkeyWallet', walletAddress);
      
      setHasPasskey(true);
      return true;
    } catch (error) {
      console.error('Passkey creation failed:', error);
      return false;
    }
  };

  const enableBiometric = async (): Promise<boolean> => {
    try {
      if (!isBiometricAvailable) {
        throw new Error('Biometric authentication not available');
      }

      // Test biometric authentication
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Enable biometric authentication for GotMusic',
        fallbackLabel: 'Use Passkey',
        cancelLabel: 'Cancel',
      });

      if (result.success) {
        await SecureStore.setItemAsync('biometricEnabled', 'true');
        setHasBiometric(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Failed to enable biometric:', error);
      return false;
    }
  };

  const authenticateWithBiometric = async (): Promise<boolean> => {
    try {
      if (!hasBiometric || !isBiometricAvailable) {
        return false;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access GotMusic',
        fallbackLabel: 'Use Passkey',
        cancelLabel: 'Cancel',
      });

      return result.success;
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      return false;
    }
  };

  const authenticateWithPasskey = async (): Promise<boolean> => {
    try {
      if (!hasPasskey) {
        return false;
      }

      // TODO: Implement real passkey authentication
      // This would use WebAuthn API or native passkey libraries
      
      const passkeyId = await SecureStore.getItemAsync('passkeyId');
      return passkeyId !== null;
    } catch (error) {
      console.error('Passkey authentication failed:', error);
      return false;
    }
  };

  const smartLogin = async (): Promise<boolean> => {
    try {
      // Try biometric first (most convenient)
      if (hasBiometric && isBiometricAvailable) {
        const biometricSuccess = await authenticateWithBiometric();
        if (biometricSuccess) {
          return true;
        }
      }

      // Fallback to passkey (secure but less convenient)
      if (hasPasskey) {
        const passkeySuccess = await authenticateWithPasskey();
        if (passkeySuccess) {
          return true;
        }
      }

      // If no secondary auth is available, user needs to reconnect wallet
      return false;
    } catch (error) {
      console.error('Smart login failed:', error);
      return false;
    }
  };

  const refreshSession = async () => {
    try {
      // Check if wallet is still connected
      const address = await AsyncStorage.getItem('walletAddress');
      if (!address) {
        await logout();
        return;
      }

      // Verify secondary authentication if available
      if (hasPasskey || hasBiometric) {
        const authSuccess = await smartLogin();
        if (!authSuccess) {
          await logout();
        }
      }
    } catch (error) {
      console.error('Session refresh failed:', error);
      await logout();
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('walletAddress');
      await AsyncStorage.removeItem('walletProvider');
      await SecureStore.deleteItemAsync('passkeyId');
      await SecureStore.deleteItemAsync('passkeyWallet');
      await SecureStore.deleteItemAsync('biometricEnabled');
      
      setWalletAddress(null);
      setWalletProvider(null);
      setIsAuthenticated(false);
      setHasPasskey(false);
      setHasBiometric(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const setFirstTimeComplete = async () => {
    try {
      await AsyncStorage.setItem('isFirstTime', 'false');
      setIsFirstTime(false);
    } catch (error) {
      console.error('Failed to set first time complete:', error);
    }
  };

  return (
    <EnhancedAuthContext.Provider value={{
      isAuthenticated,
      walletAddress,
      walletProvider,
      isFirstTime,
      isLoading,
      hasPasskey,
      hasBiometric,
      isBiometricAvailable,
      loginWithWallet,
      createPasskey,
      enableBiometric,
      authenticateWithBiometric,
      authenticateWithPasskey,
      smartLogin,
      logout,
      refreshSession,
      checkAuthStatus,
      setFirstTimeComplete,
    }}>
      {children}
    </EnhancedAuthContext.Provider>
  );
}

export function useEnhancedAuth(): EnhancedAuthContextType {
  const context = useContext(EnhancedAuthContext);
  if (context === undefined) {
    throw new Error('useEnhancedAuth must be used within an EnhancedAuthProvider');
  }
  return context;
}
