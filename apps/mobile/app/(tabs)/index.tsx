import { VALIDATED as ASSETS } from "@gotmusic/fixtures";
import { Link } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function Discover() {
  return (
    <View className="flex-1 bg-bg p-4">
      <Text className="text-fg text-2xl font-semibold mb-4">Discover</Text>
      <FlatList
        data={ASSETS}
        keyExtractor={(a) => a.id}
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => (
          <View className="rounded-md border border-fg/10 bg-bg p-3">
            <Text className="text-fg font-medium">{item.title}</Text>
            <Text className="text-fg/70 text-sm">
              {item.artist} · {item.bpm ?? "—"} BPM · {item.key ?? "—"}
            </Text>
            <Link href={`/purchases/${item.id}`} className="text-brand-primary mt-2">
              Details
            </Link>
          </View>
        )}
      />
    </View>
  );
}
