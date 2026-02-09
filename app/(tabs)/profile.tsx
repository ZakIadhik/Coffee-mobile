import Button from "@/components/ui/button";
import { layoutTheme } from "@/constant/theme";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";
import { Ionicons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function Profile() {
  const router = useRouter();
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);

  const { width } = useWindowDimensions();

  const profileItems = [
    {
      title: "Personal Information",
      icon: "person-outline",
      href: "/profile/personal-information/page",
    },
    {
      title: "Cupons",
      icon: "gift-outline",
      href: "/profile/cupons/page",
    },
  ]

  if (Platform.OS === "ios") {
    console.log("ios");
  } else {
    console.log("android");
  }

  const handleLogout = () => {
    AsyncStorage.removeItem("isAuthenticated");
    router.push("/signin/page");
  };

  return (
    <>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={{ ...styles.container, width: width }}>
        <View style={styles.header}>

          <Text style={styles.title}>Profile</Text>
          <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => router.push("/(tabs)/notifications")}>
            <Ionicons name="notifications-outline" size={24} color={colorScheme === "dark" ? layoutTheme.colors.neutral.white : layoutTheme.colors.primary[900]} />
          </TouchableOpacity>
          <Button onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color={layoutTheme.colors.neutral.white} />
          </Button>
          </View>
        </View>

        <View style={styles.profileItems}>
        
          {profileItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.profileItem} onPress={() => router.push(item.href as any)}>
              <Ionicons name={item.icon as any} size={24} color={layoutTheme.colors.neutral.white} />
              <Text style={styles.profileItemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
}

const getStyles = (colorSchema: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      height: "50%",
      paddingTop: 80,
      backgroundColor:
        Platform.OS === "ios"
          ? colorSchema === "dark"
            ? layoutTheme.colors.primary[700]
            : layoutTheme.colors.background.white
          : colorSchema === "dark"
            ? layoutTheme.colors.secondary[700]
            : layoutTheme.colors.background.white,
      padding: 20,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      marginBottom: 40,
    },
    headerButtons: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },

    title: {
      fontSize: 32,
      fontWeight: "bold",
      fontFamily: layoutTheme.fonts.sora.bold,
      marginBottom: 10,
      color:
        colorSchema === "light"
          ? layoutTheme.colors.text.primary
          : layoutTheme.colors.text.inverse,
    },
    logoutButton: {
      paddingHorizontal: 10,
    },

    profileItems: {
      width: "100%",
      gap: 10,

    },
    profileItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
      backgroundColor: colorSchema === "dark" ? layoutTheme.colors.primary[900] : layoutTheme.colors.background.white,
      padding: 20,
      borderRadius: 10,
    },
    profileItemTitle: {
      fontSize: 20,
      fontFamily: layoutTheme.fonts.sora.regular,
      color: colorSchema === "dark" ? layoutTheme.colors.neutral.white : layoutTheme.colors.text.primary,
    },
  });
