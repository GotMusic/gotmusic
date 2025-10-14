import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { setBackgroundColorAsync } from "expo-system-ui";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Create QueryClient with proper defaults (per .cursorrules)
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000, // 30 seconds (from .cursorrules)
        retry: 2, // Retry failed queries twice (from .cursorrules)
      },
    },
  });
}

export default function RootLayout() {
  // Create QueryClient instance with useState to ensure stable reference
  const [queryClient] = useState(createQueryClient);

  useEffect(() => {
    setBackgroundColorAsync("#0B0D12");
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Stack
            screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "transparent" } }}
          />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
