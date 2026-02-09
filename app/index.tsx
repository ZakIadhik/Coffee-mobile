import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isAuthenticated = await AsyncStorage.getItem("isAuthenticated");
        if (isAuthenticated === "true") {
          router.replace("/(tabs)/home");
        } else {
          router.replace("/signin/page");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        Alert.alert(
          "Error",
          "An error occurred during authentication. Please try again."
        );
      }
    };

    const timer = setTimeout(() => {
      checkAuthentication();
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Image
            source={{
              uri: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-3402c4f.jpg?quality=90&resize=1200,1090",
            }}
            style={styles.bgImage}
            contentFit="cover"
          />
          <View style={styles.bgOverlay} />

          <View style={styles.content}>
            <View style={styles.heroWrap}>
              <Image
                source={{
                  uri: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-3402c4f.jpg?quality=90&resize=1200,1090",
                }}
                style={styles.heroImage}
                contentFit="cover"
              />
            </View>

            <Text style={styles.title}>
              Enjoy quality brew{"\n"}with the finest of{"\n"}flavours
            </Text>
            <Text style={styles.subtitle}>
              The best gain, the finest roast, the{"\n"}powerful flavor.
            </Text>

            
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0F1720",
  },
  container: {
    flex: 1,
    backgroundColor: "#0F1720",
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
  },
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15,23,32,0.65)",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 26,
    paddingBottom: 22,
    gap: 14,
  },
  heroWrap: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 360,
    height: 360,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 36,
  },
  subtitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 6,
  },
  button: {
    height: 54,
    borderRadius: 12,
    backgroundColor: "#8B5A2B",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
    marginTop: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonDefault: {
    backgroundColor: "#45a323",
  },
  hiddenLink: {
    opacity: 0,
    height: 0,
  },
});
