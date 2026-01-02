import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function FooterLink({ text, linkText, href }: FooterLinkProps) {
  return (
    <View className="text-center pt-4 flex items-center">
      <Text className="text-sm text-gray-500">
        {text}
        {` `}
        <Link
          href={href}
          className="text-black font-bold hover:text-yellow-400 hover:underline transition-colors"
        >
          {linkText}
        </Link>
      </Text>
    </View>
  );
}
