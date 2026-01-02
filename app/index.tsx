import { ScrollView, Text, View } from "react-native";

export default function Index() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-3xl font-bold mb-3 text-gray-800">
          Home Screen
        </Text>
      </View>
    </ScrollView>
  );
}
