import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";
import { Image, Text } from "react-native";

const logoBlack = require("../assets/images/logo-black.png");
const logoLight = require("../assets/images/logo-white.png");

export default function BrandLogo({
  width = 160,
  height = 100,
  resizeMode = "contain",
  className,
  label,
}: BrandLogo) {
  const { isDark } = useTheme();
  return (
    <>
      <Image
        source={isDark ? logoLight : logoBlack}
        style={{ width, height }}
        resizeMode={resizeMode}
        className={cn("self-center mt-20 mb-10", className)}
      />
      <Text className="text-3xl text-center font-medium text-black dark:text-white mb-10 tracking-tighter">
        {label}
      </Text>
    </>
  );
}
