import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { setBackgroundColorAsync } from "expo-system-ui";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { tokens } from "@gotmusic/tokens/native";
import { AuthProvider } from "../src/contexts/AuthContext";
import { BiometricProvider } from "../src/contexts/BiometricContext";
import { PasskeyProvider } from "../src/contexts/PasskeyContext";

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
        <AuthProvider>
          <BiometricProvider>
            <PasskeyProvider>
              <StatusBar 
                style="light" 
                backgroundColor={tokens.color.bg.default}
                translucent={false}
              />
              <Stack
                screenOptions={{ 
                  headerShown: false, 
                  contentStyle: { backgroundColor: tokens.color.bg.default } 
                }}
              />
            </PasskeyProvider>
          </BiometricProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
