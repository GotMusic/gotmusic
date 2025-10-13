import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function PurchaseDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View className="flex-1 bg-bg p-4">
      <Text className="text-fg text-xl font-medium">Receipt #{id}</Text>
    </View>
  );
}
