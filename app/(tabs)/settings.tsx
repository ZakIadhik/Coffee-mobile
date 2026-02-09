import { layoutTheme } from "@/constant/theme";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";
import { StatusBar, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const { colorScheme, toggleTheme } = useTheme();
  const styles = getStyles(colorScheme);

  const handleThemeChange = () => {
    toggleTheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <>
    <StatusBar barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} />
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingsContainer}>
        <View style={styles.settingItem}>
          <Text style={styles.settingItemTitle}> Theme</Text>
          <Switch
            value={colorScheme === "dark"}
            onValueChange={handleThemeChange}
            trackColor={{
              true: layoutTheme.colors.secondary[700],
              false: layoutTheme.colors.primary[500],
            }}
            thumbColor={colorScheme === "dark" ? layoutTheme.colors.background.white : layoutTheme.colors.secondary[700]}
          />
        </View>
      </View>
    </SafeAreaView>
    </>
  );
}

const getStyles = (colorSchema: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:
        colorSchema === "dark"
          ? layoutTheme.colors.primary[700]
          : layoutTheme.colors.background.white,
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 10,
      color:
        colorSchema === "light"
          ? layoutTheme.colors.text.primary
          : layoutTheme.colors.text.inverse,
    },
    text: {
      fontSize: 16,
      color:
        colorSchema === "light"
          ? layoutTheme.colors.text.primary
          : layoutTheme.colors.text.tertiary,
    },
    settingsContainer: {
      flex: 1,
    },
    settingItem: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    settingItemTitle: {
      fontFamily: layoutTheme.fonts.sora.bold,
      fontSize: 16,
      color:
        colorSchema === "light"
          ? layoutTheme.colors.text.primary
          : layoutTheme.colors.text.inverse,
    },
  });
