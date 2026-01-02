import SignOutButton from "@/components/SignOutButton";
import { Text, View } from "react-native";
import { ThemeToggle } from "../../components/ThemeToggle";

export default function SettingsScreen() {
  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Settings
      </Text>
      <ThemeToggle />
      <SignOutButton />
    </View>
  );
}
