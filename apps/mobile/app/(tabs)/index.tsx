import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function Discover() {
  return (
    <View className="flex-1 bg-bg p-4">
      <Text className="text-fg text-2xl font-semibold mb-4">Discover</Text>
      <Link href="/purchases/abc123" className="text-brand-primary">Open Purchase</Link>
    </View>
  );
}
