import { tokens } from "@gotmusic/tokens/native";
import { Link } from "expo-router";
import { useState } from "react";
import { 
  ActivityIndicator, 
  Alert, 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  View, 
  Switch,
  TextInput,
  Pressable,
  Vibration
} from "react-native";

// Component showcase for mobile development
export default function ComponentShowcase() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("primary");
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = () => {
    Vibration.vibrate(50); // Haptic feedback
    Alert.alert("Component Pressed", "This demonstrates interactive feedback!");
  };

  const handleLoadingPress = async () => {
    setIsLoading(true);
    Vibration.vibrate(100);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    Alert.alert("Loading Complete", "Async operation finished!");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: tokens.color.bg.default }}>
      <View style={{ padding: tokens.space["4"] }}>
        <Text
          style={{
            color: tokens.color.fg.default,
            fontSize: tokens.text["display-sm"].size,
            fontWeight: "bold",
            marginBottom: tokens.space["6"],
          }}
        >
          🎨 Enhanced Mobile Component Showcase
        </Text>

        {/* Status Cards */}
        <View className="mb-6">
          <Text className="text-fg text-xl font-semibold mb-3">System Status</Text>
          <View className="flex-row gap-3">
            <View className="flex-1 rounded-lg border border-green-500/20 bg-green-500/10 p-3">
              <Text className="text-green-400 font-medium">QueryClient</Text>
              <Text className="text-green-400/70 text-sm">Connected</Text>
            </View>
            <View className="flex-1 rounded-lg border border-blue-500/20 bg-blue-500/10 p-3">
              <Text className="text-blue-400 font-medium">API</Text>
              <Text className="text-blue-400/70 text-sm">Ready</Text>
            </View>
            <View className="flex-1 rounded-lg border border-purple-500/20 bg-purple-500/10 p-3">
              <Text className="text-purple-400 font-medium">NativeWind</Text>
              <Text className="text-purple-400/70 text-sm">Active</Text>
            </View>
          </View>
        </View>

        {/* Interactive Component Examples */}
        <View className="mb-6">
          <Text className="text-fg text-xl font-semibold mb-3">Interactive Component Examples</Text>

          {/* Enhanced Button Variants with Haptic Feedback */}
          <View className="mb-6">
            <Text className="text-fg/70 text-sm mb-3">Button Variants with Haptic Feedback</Text>
            <View className="flex-row gap-2 flex-wrap">
              <Pressable 
                onPress={handlePress}
                className="bg-brand-primary px-4 py-3 rounded-lg active:scale-95"
                style={({ pressed }) => [
                  { transform: [{ scale: pressed ? 0.95 : 1 }] }
                ]}
              >
                <Text className="text-white font-medium">Primary</Text>
              </Pressable>
              <TouchableOpacity className="border border-fg/20 px-4 py-2 rounded-md">
                <Text className="text-fg font-medium">Secondary</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-red-500/20 border border-red-500/30 px-4 py-2 rounded-md">
                <Text className="text-red-400 font-medium">Destructive</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Card Examples */}
          <View className="mb-4">
            <Text className="text-fg/70 text-sm mb-2">Card Components</Text>
            <View className="rounded-lg border border-fg/10 bg-bg p-4">
              <Text className="text-fg font-semibold mb-1">Sample Card</Text>
              <Text className="text-fg/70 text-sm mb-3">
                This is a sample card component with proper spacing and styling.
              </Text>
              <View className="flex-row gap-2">
                <TouchableOpacity className="bg-brand-primary/20 px-3 py-1 rounded">
                  <Text className="text-brand-primary text-xs">Action</Text>
                </TouchableOpacity>
                <TouchableOpacity className="border border-fg/20 px-3 py-1 rounded">
                  <Text className="text-fg/70 text-xs">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Loading States */}
          <View className="mb-4">
            <Text className="text-fg/70 text-sm mb-2">Loading States</Text>
            <View className="flex-row items-center gap-4">
              <ActivityIndicator size="small" color="#FF6B35" />
              <Text className="text-fg/70">Small loader</Text>
              <ActivityIndicator size="large" color="#FF6B35" />
              <Text className="text-fg/70">Large loader</Text>
            </View>
          </View>
        </View>

        {/* Sample Data Display */}
        <View className="mb-6">
          <Text className="text-fg text-xl font-semibold mb-3">Sample Data</Text>
          <View className="rounded-lg border border-fg/10 bg-bg p-4">
            <Text className="text-fg font-medium mb-1">Sample Asset</Text>
            <Text className="text-fg/70 text-sm mb-2">
              Midnight Glass · Luna Echo · 128 BPM · C minor
            </Text>
            <Text className="text-brand-primary text-sm">View Details</Text>
          </View>
        </View>

        {/* Navigation Links */}
        <View className="mb-6">
          <Text className="text-fg text-xl font-semibold mb-3">Navigation</Text>
          <View className="flex-row gap-3 flex-wrap">
            <Link href="/" className="bg-fg/10 px-4 py-2 rounded-md">
              <Text className="text-fg">Home</Text>
            </Link>
            <Link href="/record" className="bg-fg/10 px-4 py-2 rounded-md">
              <Text className="text-fg">Record</Text>
            </Link>
            <Link href="/library" className="bg-fg/10 px-4 py-2 rounded-md">
              <Text className="text-fg">Library</Text>
            </Link>
          </View>
        </View>

        {/* Design Tokens Preview */}
        <View className="mb-6">
          <Text className="text-fg text-xl font-semibold mb-3">Design Tokens</Text>
          <View className="grid grid-cols-2 gap-3">
            <View className="rounded-lg border border-fg/10 bg-bg p-3">
              <Text className="text-fg font-medium mb-1">Colors</Text>
              <View className="flex-row gap-1">
                <View className="w-4 h-4 bg-brand-primary rounded" />
                <View className="w-4 h-4 bg-fg rounded" />
                <View className="w-4 h-4 bg-fg/70 rounded" />
              </View>
            </View>
            <View className="rounded-lg border border-fg/10 bg-bg p-3">
              <Text className="text-fg font-medium mb-1">Spacing</Text>
              <View className="flex-row gap-1">
                <View className="w-1 h-4 bg-fg/30 rounded" />
                <View className="w-2 h-4 bg-fg/50 rounded" />
                <View className="w-3 h-4 bg-fg/70 rounded" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
