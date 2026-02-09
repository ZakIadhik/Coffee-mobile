import { sora_font } from "@/constant/sora";

import { useLayoutFonts } from "@/hooks/use-fonts";
import { removeNotificationListeners, setupNotificationListeners } from "@/notification/listeners";
import { configureNotificationHandler, registerForPushNotifications } from "@/notification/register";

import { Stack } from "expo-router";
import { useEffect } from "react";

import { Text } from "react-native";

export default function LayoutContent() {
  const { loaded, error } = useLayoutFonts(sora_font);

  useEffect(() => {
    configureNotificationHandler();
    setupNotificationListeners();
    registerForPushNotifications().catch((err) => {
      console.error('Failed to register for push notifications:', err);
    })

    return () => {
      removeNotificationListeners();
    }
  }, [])

  if (!loaded) {
    return null;
  }
  if (error) {
    return <Text>Error loading fonts</Text>;
  }



  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Welcome",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="contact/page"
        options={{
          title: "Contact",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="coffee/page"
        options={{
          title: "Coffee Details",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signin/page"
        options={{
          title: "Sign In",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[path]/page"
        options={{
          title: "Coffee Details",
          headerShown: false,
          animation: "slide_from_bottom"
        }}
      />
      <Stack.Screen
        name="payment-method/page"
        options={{
          title: "Payment Method",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile/personal-information/page"
        options={{
          title: "Personal Information",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile/cupons/page"
        options={{
          title: "Cupons",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
