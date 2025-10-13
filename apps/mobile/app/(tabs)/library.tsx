import { View, Text } from "react-native";

export default function Library() {
  return (
    <View className="flex-1 bg-bg p-4">
      <Text className="text-fg text-2xl font-semibold mb-4">Library</Text>
      <Text className="text-fg/70">Your purchased items will appear here.</Text>
    </View>
  );
}
