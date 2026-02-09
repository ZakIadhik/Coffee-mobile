import { ThemeContext } from "@/hooks/use-theme-context";
import { ThemeType } from "@/types/theme-types";
import { useState } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";

// === ThemeProvider component ===
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [appTheme, setAppTheme] = useState<ThemeType>("system");
  const systemColorScheme = useSystemColorScheme();

  const toggleTheme = (theme: ThemeType) => {
    setAppTheme(theme);
  };

  // Resolve the actual color scheme based on theme preference
  const getColorScheme = (): "light" | "dark" => {
    if (appTheme === "light") return "light";
    if (appTheme === "dark") return "dark";
    // For "system" or "auto", use the system color scheme
    return systemColorScheme === "dark" ? "dark" : "light";
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: appTheme,
        colorScheme: getColorScheme(),
        toggleTheme: toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
