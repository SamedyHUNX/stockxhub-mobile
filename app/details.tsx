import { Text, View } from "react-native";

export default function DetailsScreen() {
  return (
    <View className="flex-1 items-center justify-center p-5 bg-gray-50 dark:bg-gray-900">
      <Text className="text-3xl font-bold mb-5 text-gray-800 dark:text-white">
        Details Screen
      </Text>
      <Text className="text-base text-center text-gray-600 dark:text-gray-300 leading-6">
        This is the details page. The back button in the navigation bar will
        take you back to the home screen.
      </Text>
    </View>
  );
}
