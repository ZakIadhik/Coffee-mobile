import { layoutTheme } from "@/constant/theme";
import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PaymentMethod() {
    const { colorScheme } = useTheme()
    const styles = getStyles(colorScheme)
    const router = useRouter()

    const paymentMethods = [
        { id: 1, name: "Visa", image: require("@/assets/images/visa.png"), method: "visa" },
        { id: 2, name: "Mastercard", image: require("@/assets/images/mastercard.png"), method: "mastercard" },
        { id: 3, name: "Apple Pay", image: require("@/assets/images/a-pay.png"), method: "apple-pay" },
        { id: 4, name: "Google Pay", image: require("@/assets/images/g-pay.png"), method: "google-pay" },
    ]

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
                <Text style={styles.headerTitle}>Payment Method</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Payment Section Header */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Payment</Text>
                    <TouchableOpacity style={styles.addCardButton}>
                        <Ionicons name="add-circle-outline" size={20} color={layoutTheme.colors.neutral.medium} />
                        <Text style={styles.addCardText}>Add your card</Text>
                    </TouchableOpacity>
                </View>

                {/* Payment Methods */}
                <View style={styles.paymentMethods}>
                    {paymentMethods.map((method) => (
                        <TouchableOpacity 
                            key={method.id} 
                            style={styles.paymentCard} 
                            onPress={() => {
                                // Redirect to payment page for visa/mastercard, confirmation for others
                                if (method.method === "visa" || method.method === "mastercard") {
                                    router.push("/payment/page")
                                } else {
                                    router.push("/payment/confirmation/page")
                                }
                            }}
                        >
                            <Image source={method.image} style={styles.paymentLogo} resizeMode="contain" />
                        </TouchableOpacity>
                    ))}
                </View>
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
        paddingVertical: 15,
        paddingTop: 50,
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
        paddingTop: 20,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: layoutTheme.fonts.sora.semiBold,
        color: layoutTheme.colors.neutral.white,
    },
    addCardButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    addCardText: {
        fontSize: 14,
        fontFamily: layoutTheme.fonts.sora.regular,
        color: layoutTheme.colors.neutral.medium,
    },
    paymentMethods: {
        gap: 16,
    },
    paymentCard: {
        backgroundColor: layoutTheme.colors.background.darkBlue,
        borderRadius: 16,
        padding: 24,
        height: 140,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
    },
    paymentLogo: {
        width: 80,
        height: 60,
    },
    bottomSection: {
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    addToCartButton: {
        backgroundColor: layoutTheme.colors.secondary[500],
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: "center",
        marginBottom: 20,
    },
    addToCartText: {
        fontSize: 16,
        fontFamily: layoutTheme.fonts.sora.semiBold,
        color: layoutTheme.colors.neutral.white,
    },
    bottomNav: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingVertical: 10,
    },
    navItem: {
        padding: 8,
    },
})