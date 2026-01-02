import { Text, View } from "react-native";

export default function SettingsPage() {
  return (
    <View className="flex-1 items-center justify-center p-5 bg-gray-50">
      <Text className="text-3xl font-bold mb-5 text-gray-800">
        Settings Screen
      </Text>
      <Text className="text-base text-center text-gray-600">
        Configure your app settings here.
      </Text>
    </View>
  );
}
