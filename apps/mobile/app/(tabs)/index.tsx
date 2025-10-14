import { useAssets } from "@gotmusic/api";
import { Link } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function Discover() {
  const { data, isLoading, error } = useAssets();

  return (
    <View className="flex-1 bg-bg p-4">
      <Text className="text-fg text-2xl font-semibold mb-4">Discover</Text>

      {isLoading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text className="text-fg/70 mt-2">Loading assets...</Text>
        </View>
      )}

      {error && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-500 text-center">Error loading assets</Text>
          <Text className="text-fg/70 text-sm mt-1">{error.message}</Text>
        </View>
      )}

      {data && (
        <FlatList
          data={data.items}
          keyExtractor={(a) => a.id}
          ItemSeparatorComponent={() => <View className="h-3" />}
          renderItem={({ item }) => (
            <View className="rounded-md border border-fg/10 bg-bg p-3">
              <Text className="text-fg font-medium">{item.title}</Text>
              <Text className="text-fg/70 text-sm">
                {item.artist} · {item.bpm ?? "—"} BPM · {item.keySig ?? "—"}
              </Text>
              <Link href={`/purchases/${item.id}`} className="text-brand-primary mt-2">
                Details
              </Link>
            </View>
          )}
        />
      )}
    </View>
  );
}
