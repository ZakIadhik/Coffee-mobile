import { layoutTheme } from "@/constant/theme";
import { useTheme } from "@/hooks/use-theme";
import { useCoffeeStore } from "@/store/use-product";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function TabsLayout() {
  const { colorScheme } = useTheme();
  const { getProductCount } = useCoffeeStore();
  const productCount = getProductCount();
  const styles = getStyles(colorScheme);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#8B5A2B",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          headerShown: false,
          title: "Orders",
          tabBarIcon: ({ color, size }) => (
            <>
              <Ionicons name="bag-handle" color={color} size={size} />

              {productCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{productCount}</Text>
                </View>
              )}
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          href: null,
          headerShown: false,
          title: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const getStyles = (colorScheme: string) => StyleSheet.create({
  tabBar: {
    backgroundColor: colorScheme === "dark" ? layoutTheme.colors.primary[500] : layoutTheme.colors.secondary[500],
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
    borderRadius: 10,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    marginHorizontal: 10,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 2,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
  },
});
