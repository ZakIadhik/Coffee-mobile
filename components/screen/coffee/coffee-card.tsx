import { layoutTheme } from "@/constant/theme";
import { useTheme } from "@/hooks/use-theme";
import { Coffee } from "@/types/coffee-data-types";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface CoffeeCardProps {
  coffee: Coffee;
  onPress: () => void;
}

export default function CoffeeCard({ coffee, onPress }: CoffeeCardProps) {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.wrapper} />
      {isLoading ? <Text>Loading...</Text> : ""}
      <View style={styles.cardContainer}>
        <Image source={{ uri: coffee.image }} style={styles.image} />
        <Text style={styles.title}>{coffee.title}</Text>
        <Text style={styles.price}>$ {coffee.price}</Text>
      </View>
    </Pressable>
  );
}

const getStyles = (colorScheme: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: "50%",
      justifyContent: "center",
      alignItems: "center",
      
      padding: 10,
      margin: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
    },
    wrapper: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
      backgroundColor:
        colorScheme === "dark"
          ? layoutTheme.colors.background.black
          : layoutTheme.colors.background.secondary,
      opacity: 0.1,
      borderRadius: 10,

    },
    cardContainer: {
      gap: 10,
      width: "100%",
    },
    image: {
      height: 200,
      resizeMode: "cover",
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      alignSelf: "flex-start",
      color:
        colorScheme === "dark"
          ? layoutTheme.colors.text.inverse
          : layoutTheme.colors.text.primary,
    },
    description: {
      fontSize: 10,
      color: "gray",
    },
    price: {
      fontSize: 16,
      fontWeight: "bold",
      alignSelf: "flex-end",
      color:
        colorScheme === "dark"
          ? layoutTheme.colors.text.inverse
          : layoutTheme.colors.text.primary,
    },
    button: {
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "gray",
      flexDirection: "row",
      gap: 10,
    },
    buttonContainer: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 10,
    },
  });
