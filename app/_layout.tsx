import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import "./globals.css";

type Saved = string | null;

export default function RootLayout() {
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    AsyncStorage.getItem("theme").then((saved: Saved) => {
      if (saved === "light" || saved === "dark") {
        setColorScheme(saved as "light" | "dark");
      }
    });
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="sign-in"
        options={{ headerShown: true, title: "Sign In" }}
      />
    </Stack>
  );
}
