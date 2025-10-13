import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#0B0D12", borderTopColor: "#1C1F26" },
        tabBarActiveTintColor: "#E6EAF2",
        tabBarInactiveTintColor: "#7E8A99",
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Discover" }} />
      <Tabs.Screen name="library" options={{ title: "Library" }} />
    </Tabs>
  );
}
