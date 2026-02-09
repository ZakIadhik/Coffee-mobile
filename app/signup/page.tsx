import { Image } from "expo-image";

import {
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
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { singUpSchema, SingUpSchemaType } from "./sign-up.schema";
import Button from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SingUpSchemaType>({
    resolver: zodResolver(singUpSchema),
    defaultValues: {
      name: "",
      surname:"",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SingUpSchemaType) => {
    console.log("submit sign up");
    console.log(data);
    try {
      router.push("/");
      AsyncStorage.setItem("user", JSON.stringify(data));
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
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Your name"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    autoCapitalize="none"
                    keyboardType="default"
                    style={styles.input}
                  />
                )}
              />
              {errors.name && (
                <Text style={styles.error}>{errors.name.message}</Text>
              )}
              <Controller
                control={control}
                name="surname"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Your surname"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    autoCapitalize="none"
                    keyboardType="default"
                    style={styles.input}
                  />
                )}
              />
              {errors.surname && (
                <Text style={styles.error}>{errors.surname.message}</Text>
              )}

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
              <Button onPress={handleSubmit(onSubmit)}>Sign up</Button>
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
});
