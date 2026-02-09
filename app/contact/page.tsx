import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

export default function Contact() {
  const handleBack = () => {
    router.push("/signin/page");
  };
  return (
    <View>
      <Text>Contact Page</Text>
      <Pressable onPress={handleBack}>
        <Text>Signin Page</Text>
      </Pressable>
    </View>
  );
}
