import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationBar from "expo-navigation-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { Platform, Pressable, Text } from "react-native";

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    // Load saved theme
    AsyncStorage.getItem("theme").then((saved) => {
      if (saved) setColorScheme(saved as any);
    });
  }, []);

  const toggleTheme = async () => {
    const newTheme = isDark ? "light" : "dark";
    setColorScheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);

    // Optional: Update Android navigation bar only
    if (Platform.OS === "android" && NavigationBar.setBackgroundColorAsync) {
      NavigationBar.setBackgroundColorAsync(newTheme === "dark" ? "#111827" : "#ffffff");
    }
  };

  return (
    <Pressable
      onPress={toggleTheme}
      className="flex-row items-center gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
    >
      <Ionicons
        name={isDark ? "moon" : "sunny"}
        size={24}
        color={isDark ? "#fbbf24" : "#6200ee"}
      />
      <Text className="text-gray-900 dark:text-white font-semibold">
        {isDark ? "Dark Mode" : "Light Mode"}
      </Text>
    </Pressable>
  );
}
