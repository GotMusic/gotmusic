import { useAssets } from "@gotmusic/api";
import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";

// Mock owned assets data (in real app, this would come from user's purchase history)
const MOCK_OWNED_ASSETS = [
  {
    id: "beat_001",
    title: "Night Drive 88",
    artist: "KiloWav",
    bpm: 88,
    keySig: "Am",
    priceAmount: 12.0,
    priceCurrency: "PYUSD",
    status: "ready",
    purchasedAt: 1234567890,
    downloadUrl: "https://cdn.example.com/downloads/beat_001.mp3",
  },
  {
    id: "loop_009",
    title: "Glass Pad",
    artist: "Nova",
    bpm: 120,
    keySig: "Cmaj",
    priceAmount: 4.0,
    priceCurrency: "PYUSD",
    status: "ready",
    purchasedAt: 1234567890,
    downloadUrl: "https://cdn.example.com/downloads/loop_009.mp3",
  },
] as const;

export default function Library() {
  const [refreshing, setRefreshing] = useState(false);
  const [ownedAssets, setOwnedAssets] = useState(MOCK_OWNED_ASSETS);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // In real app, this would fetch user's purchased assets
    setRefreshing(false);
  };

  const renderAsset = ({ item }: { item: (typeof MOCK_OWNED_ASSETS)[0] }) => (
    <View className="rounded-md border border-fg/10 bg-bg p-4 mb-3">
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-fg font-semibold text-lg">{item.title}</Text>
          <Text className="text-fg/70 text-sm">{item.artist}</Text>
        </View>
        <View className="items-end">
          <Text className="text-brand-primary font-semibold">
            ${item.priceAmount} {item.priceCurrency}
          </Text>
          <Text className="text-fg/50 text-xs">
            Purchased {new Date(item.purchasedAt * 1000).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <View className="flex-row gap-4 mb-3">
        <Text className="text-fg/70 text-sm">BPM: {item.bpm ?? "—"}</Text>
        <Text className="text-fg/70 text-sm">Key: {item.keySig ?? "—"}</Text>
      </View>

      <View className="flex-row gap-2">
        <Link
          href={`/purchases/${item.id}`}
          className="flex-1 bg-brand-primary py-2 px-4 rounded-md items-center"
        >
          <Text className="text-white font-medium">Play</Text>
        </Link>
        <View className="bg-fg/10 py-2 px-4 rounded-md items-center">
          <Text className="text-fg font-medium">Download</Text>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center p-8">
      <View className="items-center">
        <Text className="text-6xl mb-4">🎵</Text>
        <Text className="text-fg text-xl font-semibold mb-2">Your Library is Empty</Text>
        <Text className="text-fg/70 text-center mb-6">
          Purchase your first track to start building your music library
        </Text>
        <Link href="/" className="bg-brand-primary py-3 px-6 rounded-md">
          <Text className="text-white font-semibold">Browse Music</Text>
        </Link>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-bg">
      <View className="p-4 border-b border-fg/10">
        <Text className="text-fg text-2xl font-semibold">Library</Text>
        <Text className="text-fg/70 text-sm mt-1">
          {ownedAssets.length} {ownedAssets.length === 1 ? "track" : "tracks"} owned
        </Text>
      </View>

      {ownedAssets.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={ownedAssets}
          keyExtractor={(item) => item.id}
          renderItem={renderAsset}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#FF6B35"
              colors={["#FF6B35"]}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
