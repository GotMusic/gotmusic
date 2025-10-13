import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function SuccessModal() {
  const router = useRouter();
  const { assetId } = useLocalSearchParams<{ assetId?: string }>();
  return (
    <>
      <Stack.Screen options={{ presentation: "modal", headerShown: false }} />
      <View className="flex-1 items-center justify-center bg-bg/95 p-6">
        <Text className="text-fg text-2xl mb-3">Purchase complete</Text>
        {assetId ? <Text className="text-fg/80 mb-6">Asset: {assetId}</Text> : null}
        <Pressable onPress={() => router.dismiss()} className="bg-brand-primary rounded-md px-5 py-3">
          <Text className="text-bg font-semibold">Close</Text>
        </Pressable>
      </View>
    </>
  );
}
