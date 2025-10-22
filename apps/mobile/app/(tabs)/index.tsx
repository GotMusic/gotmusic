import { Text, View } from "react-native";

export default function Discover() {
  return (
    <View className="flex-1 bg-bg p-4">
      <Text className="text-fg text-2xl font-semibold mb-4">Discover</Text>
      <Text className="text-fg/70">Welcome to GotMusic!</Text>
      <Text className="text-fg/70 mt-2">This is the Discover tab.</Text>
    </View>
  );
}
