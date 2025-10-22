import type { Preview } from "@storybook/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Create QueryClient for Storybook
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 2,
    },
  },
});

// Storybook decorators
export const decorators = [
  (Story: any) => (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  ),
];

export const parameters = {
  // Controls configuration
  controls: {
    hideNoControlsWarning: true,
    expanded: true,
  },
  // Backgrounds
  backgrounds: {
    default: "dark",
    values: [
      { name: "dark", value: "#0B0D12" },
      { name: "light", value: "#FFFFFF" },
    ],
  },
  // Viewport
  viewport: {
    viewports: {
      mobile: {
        name: "Mobile",
        styles: {
          width: "375px",
          height: "667px",
        },
      },
      tablet: {
        name: "Tablet", 
        styles: {
          width: "768px",
          height: "1024px",
        },
      },
    },
  },
};

const preview: Preview = {
  parameters,
  decorators,
};

export default preview;
