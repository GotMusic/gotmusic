import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  walletAddress: string | null;
  walletProvider: string | null;
  isFirstTime: boolean;
  isLoading: boolean;
  login: (address: string, provider: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  setFirstTimeComplete: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletProvider, setWalletProvider] = useState<string | null>(null);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const address = await AsyncStorage.getItem("walletAddress");
      const firstTime = await AsyncStorage.getItem("isFirstTime");

      if (address) {
        setWalletAddress(address);
        setIsAuthenticated(true);
      }

      if (firstTime === null) {
        setIsFirstTime(true);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (address: string) => {
    try {
      await AsyncStorage.setItem("walletAddress", address);
      setWalletAddress(address);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("walletAddress");
      await AsyncStorage.removeItem("biometricEnabled");
      await AsyncStorage.removeItem("passkeyEnabled");
      setWalletAddress(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const setFirstTimeComplete = async () => {
    try {
      await AsyncStorage.setItem("isFirstTime", "false");
      setIsFirstTime(false);
    } catch (error) {
      console.error("Failed to set first time complete:", error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        walletAddress,
        isFirstTime,
        isLoading,
        login,
        logout,
        checkAuthStatus,
        setFirstTimeComplete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
