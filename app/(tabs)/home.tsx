import CoffeeCard from "@/components/screen/coffee/coffee-card";
import { layoutTheme } from "@/constant/theme";
import { coffeeData } from "@/data/coffee";
import { useTheme } from "@/hooks/use-theme";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { FlatList, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { colorScheme } = useTheme();
  const router = useRouter();
  return (
    <>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <LinearGradient
        colors={
          colorScheme === "dark"
            ? layoutTheme.colors.gradients.primary as any
            : layoutTheme.colors.gradients.secondary as any
        }
        style={styles.background}
      />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={coffeeData}
          renderItem={({ item }) => <CoffeeCard coffee={item} onPress={() => router.push(`/${item.path}/page`)}/>}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
    background: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: "100%",
      zIndex: -1,
    },
  container: {
    flex: 1,
    zIndex: 1,
  },
  listContainer: {
    padding: 10,
  },
});
