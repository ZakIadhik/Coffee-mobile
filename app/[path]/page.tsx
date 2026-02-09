import { layoutTheme } from "@/constant/theme";
import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { coffeeData } from "@/data/coffee";
import { Image } from "expo-image";
import Button from "@/components/ui/button";
import { useCoffeeStore } from "@/store/use-product";
import { Coffee } from "@/types/coffee-data-types";

export default function CoffeeDetail() {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);

  const router = useRouter();

  const { path } = useLocalSearchParams();
  const coffee = coffeeData.find((coffee) => coffee.path === path);
  const { addProduct } = useCoffeeStore();

  const handleFavorite = () => {
    console.log("Favorite");
  };
  const handleAddToCart = () => {
    addProduct(coffee as Coffee)
    Alert.alert("Product added to cart");
    router.back();
  };

  const handleSize = () => {
    console.log("Size");
  };
  return (
    <>
      <LinearGradient
        colors={
          colorScheme === "dark"
            ? (layoutTheme.colors.gradients.primary as any)
            : (layoutTheme.colors.gradients.secondary as any)
        }
        style={styles.background}
      />

      <SafeAreaView style={styles.safe}>
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name="chevron-back"
                size={24}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
            <View style={styles.headerTitle}>
              <Text style={styles.headerTitleText}>{coffee?.title}</Text>
            </View>
            <TouchableOpacity onPress={() => handleFavorite()}>
              <Ionicons
                name="heart-outline"
                size={24}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <Image source={{ uri: coffee?.image }} style={styles.image} />
          </View>
          <View style={styles.content}>
            <Text style={styles.contentHeader}>Description</Text>
            <Text style={styles.contentText}>{coffee?.description}</Text>
          </View>
          <View style={styles.sizeContainer}>
            <Pressable onPress={() => handleSize()} style={styles.sizeButton}>
              <Text style={styles.sizeButtonText}>S</Text>
            </Pressable>
            <Pressable onPress={() => handleSize()} style={styles.sizeButton}>
              <Text style={styles.sizeButtonText}>M</Text>
            </Pressable>
            <Pressable onPress={() => handleSize()} style={styles.sizeButton}>
              <Text style={styles.sizeButtonText}>L</Text>
            </Pressable>
          </View>
        </View>
        <Button onPress={() => handleAddToCart()}>Add to cart</Button>
      </SafeAreaView>
    </>
  );
}

const getStyles = (colorSchema: string) =>
  StyleSheet.create({
    background: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: "100%",
      zIndex: -1,
    },
    safe: {
      marginHorizontal: 9,
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",

      marginVertical: 12,
    },
    headerTitle: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    headerTitleText: {
      color:
        colorSchema === "dark"
          ? layoutTheme.colors.text.inverse
          : layoutTheme.colors.text.primary,
      fontFamily: layoutTheme.fonts.sora.bold,
      fontSize: 20,
    },
    container: {
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
      flexDirection: "column",
    },
    image: {
      width: "100%",
      height: 220,
      resizeMode: "cover",
    },
    content: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 12,
      marginVertical: 21,
    },
    contentHeader: {
      fontFamily: layoutTheme.fonts.sora.regular,
      fontSize: 20,
      color:
        colorSchema === "dark"
          ? layoutTheme.colors.text.inverse
          : layoutTheme.colors.text.primary,
    },
    contentText: {
      textAlign: "center",
      fontFamily: layoutTheme.fonts.sora.regular,
      fontSize: 14,
      color:
        colorSchema === "dark"
          ? layoutTheme.colors.text.inverse
          : layoutTheme.colors.text.primary,
    },
    sizeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 22,
      marginVertical: 21,
      maxWidth: "50%",
      alignSelf: "center",
    },
    sizeButton: {
      width: 56,
      height: 22,
      borderRadius: 10,
      backgroundColor: "rgba(255, 255, 255, 0.3)",

      alignItems: "center",
      justifyContent: "center",
    },
    sizeButtonText: {
      fontFamily: layoutTheme.fonts.sora.regular,
      fontSize: 14,
      color: layoutTheme.colors.text.inverse,

    }
  });
