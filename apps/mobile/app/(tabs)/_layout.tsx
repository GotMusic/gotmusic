import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { tokens } from "@gotmusic/tokens/native";
import { 
  HomeIcon, 
  SearchIcon, 
  StudioIcon, 
  LibraryIcon, 
  DevelopIcon 
} from "@gotmusic/icons";
import FloatingRecordButton from "../components/FloatingRecordButton";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: tokens.color.bg.default,
          borderTopColor: tokens.color.border.subtle,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarActiveTintColor: tokens.color.brand.primary,
        tabBarInactiveTintColor: tokens.color.fg.muted,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
          <Tabs.Screen 
            name="index" 
            options={{ 
              title: "Discover",
              tabBarIcon: ({ focused, color, size }) => (
                <HomeIcon 
                  size={size} 
                  stroke={focused ? "brand" : "muted"}
                  style={{ color }}
                />
              ),
            }} 
          />
          <Tabs.Screen 
            name="browse" 
            options={{ 
              title: "Browse",
              tabBarIcon: ({ focused, color, size }) => (
                <SearchIcon 
                  size={size} 
                  stroke={focused ? "brand" : "muted"}
                  style={{ color }}
                />
              ),
            }} 
          />
          <Tabs.Screen 
            name="studio" 
            options={{ 
              title: "Studio",
              tabBarIcon: ({ focused, color, size }) => (
                <StudioIcon 
                  size={size} 
                  stroke={focused ? "brand" : "muted"}
                  style={{ color }}
                />
              ),
            }} 
          />
      <Tabs.Screen 
        name="record" 
        options={{ 
          title: "Record",
          tabBarIcon: ({ focused, color, size }) => (
            <FloatingRecordButton 
              onPress={() => {
                // This will be handled by the record screen
                console.log('Record button pressed');
              }}
              isRecording={false}
            />
          ),
        }} 
      />
          <Tabs.Screen 
            name="library" 
            options={{ 
              title: "Library",
              tabBarIcon: ({ focused, color, size }) => (
                <LibraryIcon 
                  size={size} 
                  stroke={focused ? "brand" : "muted"}
                  style={{ color }}
                />
              ),
            }} 
          />
          <Tabs.Screen 
            name="develop" 
            options={{ 
              title: "Develop",
              tabBarIcon: ({ focused, color, size }) => (
                <DevelopIcon 
                  size={size} 
                  stroke={focused ? "brand" : "muted"}
                  style={{ color }}
                />
              ),
            }} 
          />
    </Tabs>
  );
}
