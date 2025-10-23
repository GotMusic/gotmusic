/**
 * PasskeyWalletService - Transaction signing with passkeys
 *
 * This service enables users to sign transactions using passkeys/biometrics
 * instead of external wallet apps. The flow:
 * 1. User connects wallet once (gets address)
 * 2. Passkeys are used for all transaction signing
 * 3. No wallet popups or external apps needed
 */

import { ethers } from "ethers";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";

export interface PasskeyWallet {
  address: string;
  publicKey: string;
  privateKey: string; // Encrypted with passkey
  isBiometricEnabled: boolean;
  isPasskeyEnabled: boolean;
}

export interface TransactionRequest {
  to: string;
  value: string;
  data?: string;
  gasLimit?: string;
  gasPrice?: string;
  nonce?: number;
}

export interface SignedTransaction {
  rawTransaction: string;
  transactionHash: string;
  signature: {
    r: string;
    s: string;
    v: number;
  };
}

export class PasskeyWalletService {
  private static instance: PasskeyWalletService;
  private currentWallet: PasskeyWallet | null = null;

  static getInstance(): PasskeyWalletService {
    if (!PasskeyWalletService.instance) {
      PasskeyWalletService.instance = new PasskeyWalletService();
    }
    return PasskeyWalletService.instance;
  }

  /**
   * Create a new passkey wallet
   */
  async createPasskeyWallet(): Promise<PasskeyWallet> {
    try {
      // Generate new wallet
      const wallet = ethers.Wallet.createRandom();
      const address = wallet.address;
      const publicKey = wallet.publicKey;
      const privateKey = wallet.privateKey;

      // Encrypt private key with passkey/biometric
      const encryptedPrivateKey = await this.encryptWithPasskey(privateKey);

      const passkeyWallet: PasskeyWallet = {
        address,
        publicKey,
        privateKey: encryptedPrivateKey,
        isBiometricEnabled: false,
        isPasskeyEnabled: false,
      };

      // Store encrypted wallet
      await SecureStore.setItemAsync("passkey_wallet", JSON.stringify(passkeyWallet));

      this.currentWallet = passkeyWallet;
      return passkeyWallet;
    } catch (error) {
      console.error("Failed to create passkey wallet:", error);
      throw new Error("Failed to create passkey wallet");
    }
  }

  /**
   * Load existing passkey wallet
   */
  async loadPasskeyWallet(): Promise<PasskeyWallet | null> {
    try {
      const stored = await SecureStore.getItemAsync("passkey_wallet");
      if (!stored) return null;

      const wallet = JSON.parse(stored) as PasskeyWallet;
      this.currentWallet = wallet;
      return wallet;
    } catch (error) {
      console.error("Failed to load passkey wallet:", error);
      return null;
    }
  }

  /**
   * Enable biometric authentication for transactions
   */
  async enableBiometricAuth(): Promise<boolean> {
    try {
      const isAvailable = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isAvailable || !isEnrolled) {
        throw new Error("Biometric authentication not available");
      }

      // Test biometric authentication
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Enable biometric authentication for secure transactions",
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });

      if (result.success && this.currentWallet) {
        this.currentWallet.isBiometricEnabled = true;
        await this.saveWallet();
        return true;
      }

      return false;
    } catch (error) {
      console.error("Failed to enable biometric auth:", error);
      return false;
    }
  }

  /**
   * Enable passkey authentication for transactions
   */
  async enablePasskeyAuth(): Promise<boolean> {
    try {
      // For now, we'll use biometric as passkey equivalent
      // In a real implementation, this would use WebAuthn/FIDO2
      const isAvailable = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isAvailable || !isEnrolled) {
        throw new Error("Passkey authentication not available");
      }

      // Test passkey authentication
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Enable passkey authentication for secure transactions",
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });

      if (result.success && this.currentWallet) {
        this.currentWallet.isPasskeyEnabled = true;
        await this.saveWallet();
        return true;
      }

      return false;
    } catch (error) {
      console.error("Failed to enable passkey auth:", error);
      return false;
    }
  }

  /**
   * Sign transaction using passkey/biometric
   */
  async signTransactionWithPasskey(
    transaction: TransactionRequest,
    reason = "Sign transaction",
  ): Promise<SignedTransaction> {
    if (!this.currentWallet) {
      throw new Error("No wallet loaded");
    }

    try {
      // Authenticate with passkey/biometric
      const authResult = await this.authenticateForTransaction(reason);
      if (!authResult) {
        throw new Error("Authentication failed");
      }

      // Decrypt private key
      const privateKey = await this.decryptWithPasskey(this.currentWallet.privateKey);

      // Create wallet instance
      const wallet = new ethers.Wallet(privateKey);

      // Sign transaction
      const signedTx = await wallet.signTransaction({
        to: transaction.to,
        value: transaction.value,
        data: transaction.data || "0x",
        gasLimit: transaction.gasLimit,
        gasPrice: transaction.gasPrice,
        nonce: transaction.nonce,
      });

      // Parse signature
      const tx = ethers.utils.parseTransaction(signedTx);

      return {
        rawTransaction: signedTx,
        transactionHash: tx.hash,
        signature: {
          r: tx.r,
          s: tx.s,
          v: tx.v,
        },
      };
    } catch (error) {
      console.error("Failed to sign transaction with passkey:", error);
      throw new Error("Transaction signing failed");
    }
  }

  /**
   * Sign message using passkey/biometric
   */
  async signMessageWithPasskey(message: string, reason = "Sign message"): Promise<string> {
    if (!this.currentWallet) {
      throw new Error("No wallet loaded");
    }

    try {
      // Authenticate with passkey/biometric
      const authResult = await this.authenticateForTransaction(reason);
      if (!authResult) {
        throw new Error("Authentication failed");
      }

      // Decrypt private key
      const privateKey = await this.decryptWithPasskey(this.currentWallet.privateKey);

      // Create wallet instance and sign
      const wallet = new ethers.Wallet(privateKey);
      const signature = await wallet.signMessage(message);

      return signature;
    } catch (error) {
      console.error("Failed to sign message with passkey:", error);
      throw new Error("Message signing failed");
    }
  }

  /**
   * Get current wallet address
   */
  getCurrentAddress(): string | null {
    return this.currentWallet?.address || null;
  }

  /**
   * Check if biometric auth is enabled
   */
  isBiometricEnabled(): boolean {
    return this.currentWallet?.isBiometricEnabled || false;
  }

  /**
   * Check if passkey auth is enabled
   */
  isPasskeyEnabled(): boolean {
    return this.currentWallet?.isPasskeyEnabled || false;
  }

  /**
   * Clear wallet data
   */
  async clearWallet(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync("passkey_wallet");
      this.currentWallet = null;
    } catch (error) {
      console.error("Failed to clear wallet:", error);
    }
  }

  /**
   * Private: Authenticate for transaction
   */
  private async authenticateForTransaction(reason: string): Promise<boolean> {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: reason,
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });

      return result.success;
    } catch (error) {
      console.error("Authentication failed:", error);
      return false;
    }
  }

  /**
   * Private: Encrypt private key with passkey
   */
  private async encryptWithPasskey(privateKey: string): Promise<string> {
    try {
      // In a real implementation, this would use WebAuthn/FIDO2
      // For now, we'll use a simple encryption with biometric key
      const key = await SecureStore.getItemAsync("biometric_key");
      if (!key) {
        // Generate and store biometric key
        const newKey = ethers.utils.randomBytes(32).toString("hex");
        await SecureStore.setItemAsync("biometric_key", newKey);
        return this.simpleEncrypt(privateKey, newKey);
      }

      return this.simpleEncrypt(privateKey, key);
    } catch (error) {
      console.error("Failed to encrypt with passkey:", error);
      throw error;
    }
  }

  /**
   * Private: Decrypt private key with passkey
   */
  private async decryptWithPasskey(encryptedPrivateKey: string): Promise<string> {
    try {
      const key = await SecureStore.getItemAsync("biometric_key");
      if (!key) {
        throw new Error("No biometric key found");
      }

      return this.simpleDecrypt(encryptedPrivateKey, key);
    } catch (error) {
      console.error("Failed to decrypt with passkey:", error);
      throw error;
    }
  }

  /**
   * Private: Simple encryption (replace with proper WebAuthn in production)
   */
  private simpleEncrypt(text: string, key: string): string {
    // Simple XOR encryption - replace with proper encryption in production
    let result = "";
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return Buffer.from(result).toString("base64");
  }

  /**
   * Private: Simple decryption (replace with proper WebAuthn in production)
   */
  private simpleDecrypt(encryptedText: string, key: string): string {
    const text = Buffer.from(encryptedText, "base64").toString();
    let result = "";
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  }

  /**
   * Private: Save wallet to secure storage
   */
  private async saveWallet(): Promise<void> {
    if (this.currentWallet) {
      await SecureStore.setItemAsync("passkey_wallet", JSON.stringify(this.currentWallet));
    }
  }
}
