import { ChevronRight } from "lucide-react-native";
import { ComponentType } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type ProfileItemProps = {
  icon: ComponentType<{ size: number; color: string }>;
  label: string;
  value: string | undefined;
  showBadge?: boolean;
  badgeText?: string;
  badgeColor?: string;
  onPress: () => void;
};

export default function ProfileItem({
  icon: Icon,
  label,
  value,
  showBadge,
  badgeText,
  badgeColor,
  onPress,
}: ProfileItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between bg-white dark:bg-gray-800 p-4 mb-2 rounded-xl border border-gray-200 dark:border-gray-700"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center flex-1">
        <View className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg mr-3">
          <Icon size={20} color="#3b82f6" />
        </View>
        <View className="flex-1">
          <Text className="text-gray-500 dark:text-gray-400 text-xs mb-1">
            {label}
          </Text>
          <Text className="text-gray-900 dark:text-white text-base font-medium">
            {value}
          </Text>
        </View>
      </View>
      {showBadge && (
        <View className={`px-3 py-1 rounded-md ${badgeColor}`}>
          <Text className="text-xs font-medium text-gray-700 dark:text-gray-200">
            {badgeText}
          </Text>
        </View>
      )}
      <ChevronRight size={20} color="#9ca3af" className="ml-2" />
    </TouchableOpacity>
  );
}
