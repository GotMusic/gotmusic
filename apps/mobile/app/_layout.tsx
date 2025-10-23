// Import polyfills first - must be VERY first
import "../polyfills";
import "react-native-gesture-handler";
import "react-native-reanimated";

import { tokens } from "@gotmusic/tokens/native";
import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { setBackgroundColorAsync } from "expo-system-ui";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PasskeyTransactionProvider } from "../src/contexts/PasskeyTransactionContext";
import { PrivyAuthProvider } from "../src/contexts/PrivyAuthContext";
import { BlockchainServiceProvider } from "../src/services/blockchain/BlockchainServiceProvider";

// Create QueryClient outside component to ensure it's stable
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000, // 30 seconds (from .cursorrules)
      retry: 2, // Retry failed queries twice (from .cursorrules)
    },
  },
});

export default function RootLayout() {
  useEffect(() => {
    setBackgroundColorAsync(tokens.color.bg.default);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <PrivyProvider
          appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID || "your-privy-app-id"}
          config={{
            embeddedWallets: {
              ethereum: {
                createOnLogin: "users-without-wallets",
              },
            },
            appearance: {
              theme: "dark",
              accentColor: tokens.color.brand.primary,
            },
            loginMethods: ["email", "sms", "google", "apple", "wallet"],
          }}
        >
          <PrivyAuthProvider>
            <BlockchainServiceProvider>
              <PasskeyTransactionProvider>
                <StatusBar
                  style="light"
                  backgroundColor={tokens.color.bg.default}
                  translucent={false}
                />
                <Stack
                  screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: tokens.color.bg.default },
                  }}
                />
              </PasskeyTransactionProvider>
            </BlockchainServiceProvider>
          </PrivyAuthProvider>
        </PrivyProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
