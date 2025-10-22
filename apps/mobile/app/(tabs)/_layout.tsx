import { Tabs } from "expo-router";
import { tokens } from "@gotmusic/tokens/native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: tokens.color.bg.default,
          borderTopColor: tokens.color.border.subtle,
        },
        tabBarActiveTintColor: tokens.color.fg.default,
        tabBarInactiveTintColor: tokens.color.fg.muted,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Discover" }} />
      <Tabs.Screen name="browse" options={{ title: "Browse" }} />
      <Tabs.Screen name="studio" options={{ title: "Studio" }} />
      <Tabs.Screen name="record" options={{ title: "Record" }} />
      <Tabs.Screen name="library" options={{ title: "Library" }} />
      <Tabs.Screen name="develop" options={{ title: "Develop" }} />
    </Tabs>
  );
}
