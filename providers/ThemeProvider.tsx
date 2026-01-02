import { useColorScheme } from "nativewind";
import { createContext, ReactNode, useContext } from "react";

const ThemeContext = createContext<{ isDark: boolean }>({ isDark: false });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <ThemeContext.Provider value={{ isDark }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
