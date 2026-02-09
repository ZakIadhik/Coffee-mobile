import { Image } from "expo-image";

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { singInSchema, SingInSchemaType } from "./sign-in.schema";
import Button from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";

export default function SignInScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SingInSchemaType>({
    resolver: zodResolver(singInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SingInSchemaType) => {
    console.log("Login submit");
    console.log(data);
    try {
      const user = await AsyncStorage.getItem("user");

      if (!user) {
        Alert.alert("Error", "No user found. Please sign up first.");
        return;
      }

      const userData = JSON.parse(user);

      if (
        userData.email === data.email &&
        userData.password === data.password
      ) {
        console.log("User logged in", userData);
        AsyncStorage.setItem("isAuthenticated", "true");

        router.replace("/(tabs)/home");
      } else {
        Alert.alert("Error", "Invalid email or password");
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    router.replace("/");
  };

  return (
    <>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Pressable onPress={handleBack}>
            <Ionicons name="chevron-back" size={22} color="white" />
          </Pressable>
          <ScrollView>
            <View style={styles.header}>
              <Image
                source={require("@/assets/images/cup.png")}
                style={styles.logo}
                contentFit="contain"
              />
              <View style={styles.brandRow}>
                <Text style={styles.brandCoffee}>Coffee</Text>
                <Text style={styles.brandShop}>Shop</Text>
              </View>
            </View>

            <View style={styles.form}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="admin@gmail.com"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={styles.input}
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.error}>{errors.email.message}</Text>
              )}

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="***********"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    autoCapitalize="none"
                    secureTextEntry
                    style={styles.input}
                  />
                )}
              />
              {errors.password && (
                <Text style={styles.error}>{errors.password.message}</Text>
              )}
              <Button onPress={handleSubmit(onSubmit)}>Signin</Button>
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>{`Don't have an account?`}</Text>
                <Link href="/signup/page" style={styles.signupLink}>Sign up</Link>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  header: {
    alignItems: "center",
    marginTop: 12,
    marginBottom: 24,
    gap: 10,
  },
  logo: {
    width: 110,
    height: 110,
    opacity: 0.9,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  brandCoffee: {
    fontSize: 30,
    letterSpacing: 0.5,
    color: "#9A6A3A",
    fontWeight: "600",
  },
  brandShop: {
    fontSize: 30,
    letterSpacing: 0.5,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  form: {
    gap: 16,
    marginTop: 10,
  },
  input: {
    height: 54,
    borderRadius: 10,
    paddingHorizontal: 16,
    color: "#FFFFFF",
    backgroundColor: "rgba(255,255,255,0.07)",
  },
  error: {
    color: "#FF6B6B",
    fontSize: 13,
    marginTop: -12,
    marginBottom: 4,
  },
  button: {
    height: 54,
    borderRadius: 10,
    backgroundColor: "#8B5A2B",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#8B5A2B",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    marginTop: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },
  signupText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  signupLink: {
    color: "#8B5A2B",
    fontSize: 14,
    fontWeight: "600",
  },
});
