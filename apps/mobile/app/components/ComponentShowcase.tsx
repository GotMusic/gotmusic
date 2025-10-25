import { tokens } from "@gotmusic/tokens/native";
import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Component showcase for mobile development
const typographyTokens = ["xs", "sm", "md", "lg", "xl", "display-sm"] as const;

const paletteSwatches = [
  {
    label: "Brand Mint",
    value: tokens.color.palette.brand.mint,
  },
  {
    label: "Brand Ice",
    value: tokens.color.palette.brand.ice,
  },
  {
    label: "Semantic Success",
    value: tokens.color.palette.semantic.success,
  },
  {
    label: "Semantic Danger",
    value: tokens.color.palette.semantic.danger,
  },
];

export default function ComponentShowcase() {
  const [toggleEnabled, setToggleEnabled] = useState(true);
  const [activeSegment, setActiveSegment] = useState("mixes");

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
          🎨 Mobile Component Showcase
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

        {/* Component Examples */}
        <View className="mb-6">
          <Text className="text-fg text-xl font-semibold mb-3">Component Examples</Text>

          {/* Button Variants */}
          <View className="mb-4">
            <Text className="text-fg/70 text-sm mb-2">Button Variants</Text>
            <View className="flex-row gap-2 flex-wrap">
              <TouchableOpacity className="bg-brand-primary px-4 py-2 rounded-md">
                <Text className="text-white font-medium">Primary</Text>
              </TouchableOpacity>
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

          {/* Feedback Banners */}
          <View className="mb-4">
            <Text className="text-fg/70 text-sm mb-2">Feedback Banners</Text>
            <View className="gap-3">
              <View className="rounded-lg border border-green-500/20 bg-green-500/10 p-4">
                <Text className="text-green-400 font-semibold mb-1">Upload Complete</Text>
                <Text className="text-green-400/70 text-xs">
                  Your latest stem bundle synced successfully to the cloud.
                </Text>
              </View>
              <View className="rounded-lg border border-yellow-400/20 bg-yellow-400/10 p-4">
                <Text className="text-yellow-300 font-semibold mb-1">Review Settings</Text>
                <Text className="text-yellow-300/70 text-xs">
                  We detected a high noise floor on the last take—consider adjusting input gain.
                </Text>
              </View>
              <View className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
                <Text className="text-red-400 font-semibold mb-1">Export Failed</Text>
                <Text className="text-red-400/70 text-xs">
                  Something interrupted the export. Try again once you reconnect to the network.
                </Text>
              </View>
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

        {/* Interactive Controls */}
        <View className="mb-6">
          <Text className="text-fg text-xl font-semibold mb-3">Interactive Controls</Text>
          <View className="rounded-lg border border-fg/10 bg-bg p-4 gap-4">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-fg font-medium">Background Sync</Text>
                <Text className="text-fg/60 text-xs">Keep mixes synced automatically</Text>
              </View>
              <Switch
                thumbColor={toggleEnabled ? tokens.color.brand.primary : tokens.color.bg.elevated}
                trackColor={{ false: "rgba(255,255,255,0.12)", true: "rgba(106,230,166,0.35)" }}
                value={toggleEnabled}
                onValueChange={setToggleEnabled}
              />
            </View>

            <View>
              <Text className="text-fg/60 text-xs mb-2">Project View</Text>
              <View className="flex-row rounded-full bg-fg/10 p-1">
                {["mixes", "masters", "drafts"].map((segment) => {
                  const isActive = activeSegment === segment;
                  return (
                    <Pressable
                      key={segment}
                      accessibilityRole="button"
                      onPress={() => setActiveSegment(segment)}
                      className={`flex-1 rounded-full px-3 py-2 items-center ${
                        isActive ? "bg-brand-primary" : ""
                      }`}
                    >
                      <Text
                        className={`text-xs font-medium ${isActive ? "text-fg" : "text-fg/70"}`}
                        style={{ color: isActive ? tokens.color.bg.default : undefined }}
                      >
                        {segment.charAt(0).toUpperCase() + segment.slice(1)}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        </View>

        {/* Typography Scale */}
        <View className="mb-6">
          <Text className="text-fg text-xl font-semibold mb-3">Typography Scale</Text>
          <View className="rounded-lg border border-fg/10 bg-bg p-4 gap-3">
            {typographyTokens.map((tokenKey) => {
              const token = tokens.text[tokenKey];
              return (
                <View key={tokenKey} className="flex-row justify-between gap-4">
                  <View className="flex-1">
                    <Text
                      style={{
                        color: tokens.color.fg.default,
                        fontSize: token.size,
                        lineHeight: token.line,
                        fontWeight: token.weight ?? tokens.font.weight.medium,
                      }}
                    >
                      {`The quick brown fox — ${tokenKey}`}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-fg/60 text-xs">{token.size}px</Text>
                    <Text className="text-fg/40 text-[10px]">Line: {token.line}px</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Color Palette */}
        <View className="mb-10">
          <Text className="text-fg text-xl font-semibold mb-3">Palette Highlights</Text>
          <View className="flex-row flex-wrap gap-3">
            {paletteSwatches.map((swatch) => (
              <View
                key={swatch.label}
                className="rounded-xl border border-fg/10"
                style={{ backgroundColor: tokens.color.bg.elevated, width: 150 }}
              >
                <View className="h-16 rounded-t-xl" style={{ backgroundColor: swatch.value }} />
                <View className="p-3 gap-1">
                  <Text className="text-fg text-sm font-medium">{swatch.label}</Text>
                  <Text className="text-fg/60 text-[11px] tracking-wide">{swatch.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
