import { ActivityIndicator, View } from "react-native";

export default function Loading() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-50 dark:bg-gray-900">
      <ActivityIndicator />
    </View>
  );
}
