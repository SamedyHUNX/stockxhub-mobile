import { Text, View } from "react-native";

export default function DetailsPage() {
  return (
    <View className="flex-1 items-center justify-center p-5 bg-gray-50">
      <Text className="text-3xl font-bold mb-5 text-gray-800">
        Details Screen
      </Text>
      <Text className="text-base text-center text-gray-600 leading-6">
        This is the details page. The back button in the navigation bar will
        take you back to the home screen.
      </Text>
    </View>
  );
}
