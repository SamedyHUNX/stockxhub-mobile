import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? "#1f2937" : "#FFFFFF",
        },
        headerTintColor: isDark ? "#ffffff" : "#000000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarActiveTintColor: "#ECC94B",
        tabBarInactiveTintColor: isDark ? "#9ca3af" : "#6b7280",
        tabBarStyle: {
          backgroundColor: isDark ? "#111827" : "#ffffff",
          borderTopWidth: 1,
          borderTopColor: isDark ? "#374151" : "#e5e7eb",
          height: 80,
          paddingBottom: 16,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="details"
        options={{
          title: "Details",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
