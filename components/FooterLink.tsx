import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function FooterLink({ text, linkText, href }: FooterLinkProps) {
  return (
    <View className="text-center pt-4 flex items-center">
      <Text className="text-md text-gray-500">
        {text}
        {` `}
        <Link href={href} className="font-bold transition-colors">
          {linkText}
        </Link>
      </Text>
    </View>
  );
}
