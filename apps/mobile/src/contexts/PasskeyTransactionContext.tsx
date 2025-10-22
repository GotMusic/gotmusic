/**
 * PasskeyTransactionContext - Context for passkey-based transaction signing
 * 
 * This context provides a seamless experience where users can:
 * 1. Connect wallet once (get address)
 * 2. Use passkeys/biometrics for all transaction signing
 * 3. Complete purchases without external wallet apps
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PasskeyWalletService, PasskeyWallet, TransactionRequest, SignedTransaction } from '../services/blockchain/PasskeyWalletService';
import * as SecureStore from 'expo-secure-store';

interface PasskeyTransactionContextType {
  // Wallet state
  wallet: PasskeyWallet | null;
  isWalletLoaded: boolean;
  isLoading: boolean;
  
  // Authentication state
  isBiometricEnabled: boolean;
  isPasskeyEnabled: boolean;
  
  // Actions
  createWallet: () => Promise<boolean>;
  loadWallet: () => Promise<boolean>;
  enableBiometric: () => Promise<boolean>;
  enablePasskey: () => Promise<boolean>;
  
  // Transaction signing
  signTransaction: (transaction: TransactionRequest, reason?: string) => Promise<SignedTransaction>;
  signMessage: (message: string, reason?: string) => Promise<string>;
  
  // Utility
  getAddress: () => string | null;
  clearWallet: () => Promise<void>;
}

const PasskeyTransactionContext = createContext<PasskeyTransactionContextType | undefined>(undefined);

export function PasskeyTransactionProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<PasskeyWallet | null>(null);
  const [isWalletLoaded, setIsWalletLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isPasskeyEnabled, setIsPasskeyEnabled] = useState(false);

  const passkeyService = PasskeyWalletService.getInstance();

  // Load wallet on mount
  useEffect(() => {
    loadWallet();
  }, []);

  const createWallet = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const newWallet = await passkeyService.createPasskeyWallet();
      setWallet(newWallet);
      setIsWalletLoaded(true);
      setIsBiometricEnabled(newWallet.isBiometricEnabled);
      setIsPasskeyEnabled(newWallet.isPasskeyEnabled);
      return true;
    } catch (error) {
      console.error('Failed to create wallet:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loadWallet = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const loadedWallet = await passkeyService.loadPasskeyWallet();
      
      if (loadedWallet) {
        setWallet(loadedWallet);
        setIsWalletLoaded(true);
        setIsBiometricEnabled(loadedWallet.isBiometricEnabled);
        setIsPasskeyEnabled(loadedWallet.isPasskeyEnabled);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Failed to load wallet:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const enableBiometric = async (): Promise<boolean> => {
    try {
      const success = await passkeyService.enableBiometricAuth();
      if (success) {
        setIsBiometricEnabled(true);
        // Reload wallet to get updated state
        await loadWallet();
      }
      return success;
    } catch (error) {
      console.error('Failed to enable biometric:', error);
      return false;
    }
  };

  const enablePasskey = async (): Promise<boolean> => {
    try {
      const success = await passkeyService.enablePasskeyAuth();
      if (success) {
        setIsPasskeyEnabled(true);
        // Reload wallet to get updated state
        await loadWallet();
      }
      return success;
    } catch (error) {
      console.error('Failed to enable passkey:', error);
      return false;
    }
  };

  const signTransaction = async (
    transaction: TransactionRequest, 
    reason: string = 'Sign transaction'
  ): Promise<SignedTransaction> => {
    if (!wallet) {
      throw new Error('No wallet loaded');
    }

    try {
      return await passkeyService.signTransactionWithPasskey(transaction, reason);
    } catch (error) {
      console.error('Failed to sign transaction:', error);
      throw error;
    }
  };

  const signMessage = async (
    message: string, 
    reason: string = 'Sign message'
  ): Promise<string> => {
    if (!wallet) {
      throw new Error('No wallet loaded');
    }

    try {
      return await passkeyService.signMessageWithPasskey(message, reason);
    } catch (error) {
      console.error('Failed to sign message:', error);
      throw error;
    }
  };

  const getAddress = (): string | null => {
    return passkeyService.getCurrentAddress();
  };

  const clearWallet = async (): Promise<void> => {
    try {
      await passkeyService.clearWallet();
      setWallet(null);
      setIsWalletLoaded(false);
      setIsBiometricEnabled(false);
      setIsPasskeyEnabled(false);
    } catch (error) {
      console.error('Failed to clear wallet:', error);
    }
  };

  const value: PasskeyTransactionContextType = {
    wallet,
    isWalletLoaded,
    isLoading,
    isBiometricEnabled,
    isPasskeyEnabled,
    createWallet,
    loadWallet,
    enableBiometric,
    enablePasskey,
    signTransaction,
    signMessage,
    getAddress,
    clearWallet,
  };

  return (
    <PasskeyTransactionContext.Provider value={value}>
      {children}
    </PasskeyTransactionContext.Provider>
  );
}

export function usePasskeyTransaction() {
  const context = useContext(PasskeyTransactionContext);
  if (context === undefined) {
    throw new Error('usePasskeyTransaction must be used within a PasskeyTransactionProvider');
  }
  return context;
}
