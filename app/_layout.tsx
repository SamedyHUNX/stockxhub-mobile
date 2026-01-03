import { SessionProvider, useSession } from "@/providers/AuthProvider";
import { FinntechProvider } from "@/providers/FinntechProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import "./globals.css";

const MyLight: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
    text: "#111827",
  },
};

const MyDark: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#111827",
    text: "#FFFFFF",
  },
};

function RootLayoutNav() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const { session, isLoading } = useSession();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.getItem("theme").then((saved: Saved) => {
      if (saved === "light" || saved === "dark") {
        setColorScheme(saved as "light" | "dark");
      }
    });
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)" || segments[0] === "sign-in";

    if (!session && !inAuthGroup) {
      // Redirect to the sign-in page.
      router.replace("/sign-in");
    } else if (session && inAuthGroup) {
      // Redirect back to the home page.
      router.replace("/");
    }
  }, [session, segments, isLoading]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? MyDark : MyLight}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="sign-in"
          options={{ headerShown: false, title: "Sign In" }}
        />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <SessionProvider>
      <FinntechProvider>
        <RootLayoutNav />
      </FinntechProvider>
    </SessionProvider>
  );
}
