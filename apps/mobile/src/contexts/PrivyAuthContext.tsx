/**
 * Privy Authentication Context
 *
 * Provides comprehensive authentication for both web and mobile:
 * - Embedded wallets (automatic creation)
 * - Traditional authentication (email, phone, Google, Apple)
 * - External wallet connection (MetaMask, Coinbase, etc.)
 * - Passkey authentication
 *
 * This works for both web and mobile React applications
 */

import { usePrivy, useWallets } from "@privy-io/react-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

interface PrivyUser {
  id: string;
  email?: string;
  wallet?: {
    address: string;
    chainId: string;
  };
}

interface PrivyWallet {
  address: string;
  chainId: string;
  type: string;
}

interface PrivyAuthContextType {
  // Authentication state
  isAuthenticated: boolean;
  isReady: boolean;
  user: PrivyUser | null;
  wallet: PrivyWallet | null;

  // Authentication methods
  login: () => Promise<void>;
  logout: () => Promise<void>;

  // Wallet management
  connectWallet: () => Promise<void>;
  createEmbeddedWallet: () => Promise<void>;

  // User info
  email: string | null;
  phone: string | null;
  walletAddress: string | null;
  walletProvider: string | null;

  // Status
  isLoading: boolean;
  error: string | null;
}

const PrivyAuthContext = createContext<PrivyAuthContextType | undefined>(undefined);

export function PrivyAuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Privy hooks
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { wallets } = useWallets();

  // Get primary wallet
  const primaryWallet = wallets[0];

  // Extract user info
  const email = user?.email?.address || null;
  const phone = user?.phone?.number || null;
  const walletAddress = primaryWallet?.address || null;
  const walletProvider = primaryWallet?.walletClientType || null;

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await login();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await logout();

      // Clear local storage
      await AsyncStorage.removeItem("privy_user");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Logout failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Privy will handle wallet connection through their modal
      await login();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Wallet connection failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createEmbeddedWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Privy automatically creates embedded wallets when users sign up
      // This is configured in the Privy dashboard
      await login();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Embedded wallet creation failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Save user data to local storage
  useEffect(() => {
    if (authenticated && user) {
      AsyncStorage.setItem(
        "privy_user",
        JSON.stringify({
          id: user.id,
          email: email,
          phone: phone,
          walletAddress: walletAddress,
          walletProvider: walletProvider,
          createdAt: new Date().toISOString(),
        }),
      );
    }
  }, [authenticated, user, email, phone, walletAddress, walletProvider]);

  return (
    <PrivyAuthContext.Provider
      value={{
        isAuthenticated: authenticated,
        isReady: ready,
        user,
        wallet: primaryWallet,
        login: handleLogin,
        logout: handleLogout,
        connectWallet,
        createEmbeddedWallet,
        email,
        phone,
        walletAddress,
        walletProvider,
        isLoading,
        error,
      }}
    >
      {children}
    </PrivyAuthContext.Provider>
  );
}

export function usePrivyAuth(): PrivyAuthContextType {
  const context = useContext(PrivyAuthContext);
  if (context === undefined) {
    throw new Error("usePrivyAuth must be used within a PrivyAuthProvider");
  }
  return context;
}
