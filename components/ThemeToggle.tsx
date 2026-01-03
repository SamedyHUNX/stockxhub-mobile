import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationBar from "expo-navigation-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { Platform, Pressable, Text } from "react-native";

export function ThemeToggle({ isAuthPage = false }: { isAuthPage?: boolean }) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    // Load saved theme
    AsyncStorage.getItem("theme").then((saved) => {
      if (saved && (saved === "dark" || saved === "light")) {
        setColorScheme(saved);
      }
    });
  }, [setColorScheme]);

  const toggleTheme = async () => {
    const newTheme = isDark ? "light" : "dark";
    setColorScheme(newTheme);
    try {
      await AsyncStorage.setItem("theme", newTheme);
    } catch (error) {
      console.warn("Failed to save theme preference:", error);
    }

    // Update Android navigation bar only
    if (Platform.OS === "android" && NavigationBar.setBackgroundColorAsync) {
      try {
        await NavigationBar.setBackgroundColorAsync(
          newTheme === "dark" ? "#111827" : "#ffffff"
        );
      } catch (error) {
        console.warn("Failed to update navigation bar:", error);
      }
    }
  };

  if (isAuthPage) {
    return (
      <Pressable
        onPress={toggleTheme}
        className="absolute top-4 right-4 p-2 z-10"
      >
        <Ionicons
          name={isDark ? "moon" : "sunny"}
          size={24}
          color={isDark ? "#fbbf24" : "#6200ee"}
        />
      </Pressable>
    );
  }

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
        {isDark ? "Dark" : "Light"}
      </Text>
    </Pressable>
  );
}
