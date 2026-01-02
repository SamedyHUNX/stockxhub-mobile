import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter, useSegments } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { SessionProvider, useSession } from "../ctx";
import "./globals.css";

type Saved = string | null;

function RootLayoutNav() {
  const { setColorScheme } = useColorScheme();
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
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SessionProvider>
      <RootLayoutNav />
    </SessionProvider>
  );
}
