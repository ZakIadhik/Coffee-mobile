import PaymentForm from "@/components/screen/payment/payment-form";
import { layoutTheme } from "@/constant/theme";
import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Payment() {
    const { colorScheme } = useTheme()
    const styles = getStyles(colorScheme)
    const router = useRouter()

    const handlePay = () => {
        router.push("/payment/confirmation/page");
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={
                    colorScheme === "dark"
                        ? (layoutTheme.colors.gradients.primary as any)
                        : (layoutTheme.colors.gradients.secondary as any)
                }
                style={styles.background}
            />
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={layoutTheme.colors.neutral.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <PaymentForm />
            </ScrollView>

           
        </View>
    )
}

const getStyles = (colorScheme: string) => StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "100%",
        zIndex: -1,
    },
    header: {

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 15,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: layoutTheme.colors.neutral.darker,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: layoutTheme.fonts.sora.semiBold,
        color: layoutTheme.colors.neutral.white,
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    formGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontFamily: layoutTheme.fonts.sora.regular,
        color: layoutTheme.colors.neutral.white,
        marginBottom: 12,
    },
    inputContainer: {
        backgroundColor: layoutTheme.colors.background.darkBlue,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
    },
    input: {
        fontSize: 16,
        fontFamily: layoutTheme.fonts.sora.regular,
        color: layoutTheme.colors.neutral.white,
    },
    rowGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },
    halfWidth: {
        flex: 1,
    },
    messageContainer: {
        marginTop: 40,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    message: {
        fontSize: 14,
        fontFamily: layoutTheme.fonts.sora.regular,
        color: layoutTheme.colors.neutral.medium,
        textAlign: "center",
        lineHeight: 22,
    },
    bottomSection: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    payButton: {
        backgroundColor: layoutTheme.colors.secondary[500],
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    payButtonText: {
        fontSize: 18,
        fontFamily: layoutTheme.fonts.sora.semiBold,
        color: layoutTheme.colors.neutral.white,
    },
})