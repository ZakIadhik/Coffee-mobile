import CuponsForm from "@/components/screen/profile/cupons/cupons";
import Gradient from "@/components/ui/gradient";
import { layoutTheme } from "@/constant/theme";
import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Cupons() {
    const { colorScheme } = useTheme();
    const router = useRouter();
    const styles = getStyles(colorScheme)
    return (
        <View style={styles.container}>
            <Gradient />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={layoutTheme.colors.neutral.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Cupons</Text>
            </View>
            <CuponsForm />
        </View>
    )
}

const getStyles = (colorScheme: string) => StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        paddingVertical: 15,
        paddingTop: 80,
        gap: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        fontFamily: layoutTheme.fonts.sora.bold,
        color: layoutTheme.colors.neutral.white,
    },
});