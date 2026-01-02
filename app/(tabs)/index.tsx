import { ScrollView, Text, View } from "react-native";

export default function Index() {
  return (
    <ScrollView className="flex-1">
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-3xl font-bold mb-3 text-gray-800 dark:text-white">
          Home Screen
        </Text>
      </View>
    </ScrollView>
  );
}
