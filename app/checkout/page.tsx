import Button from "@/components/ui/button";
import { layoutTheme } from "@/constant/theme";
import { useTheme } from "@/hooks/use-theme";
import { useCoffeeStore } from "@/store/use-product";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Checkout() {
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme);
    const router = useRouter();
    const { products, addProduct, decreaseQuantity, totalPrice } = useCoffeeStore();

    // Calculate price, discount, and total
    const subtotal = totalPrice;
    const discount = subtotal * 0.05; // 5% discount
    const total = subtotal - discount;

    const handleIncrement = (product: any) => {
        addProduct(product);
    };

    const handleDecrement = (productId: number) => {
        decreaseQuantity(productId);
    };

    return (
        <>
            <LinearGradient
                colors={layoutTheme.colors.gradients.primary as any}
                style={styles.background}
            />

            <SafeAreaView style={styles.safe}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons
                                name="chevron-back"
                                size={24}
                                color={layoutTheme.colors.text.inverse}
                            />
                        </TouchableOpacity>
                        <View style={styles.headerTitle}>
                            <Text style={styles.headerTitleText}>My cart</Text>
                        </View>
                        <View style={{ width: 24 }} />
                    </View>

                    {/* Cart Items */}
                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        {products.map((product) => (
                            <View key={product.id} style={styles.cartItem}>
                                <Text style={styles.productTitle}>{product.title}</Text>

                                <View style={styles.productRow}>
                                    <Image
                                        source={{ uri: product.image }}
                                        style={styles.productImage}
                                    />

                                    <View style={styles.quantityControl}>
                                        <TouchableOpacity
                                            onPress={() => handleDecrement(product.id)}
                                            style={styles.quantityButton}
                                        >
                                            <Text style={styles.quantityButtonText}>-</Text>
                                        </TouchableOpacity>

                                        <Text style={styles.quantityText}>
                                            {String(product.quantity || 1).padStart(2, "0")}
                                        </Text>

                                        <TouchableOpacity
                                            onPress={() => handleIncrement(product)}
                                            style={styles.quantityButton}
                                        >
                                            <Text style={styles.quantityButtonText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.productFooter}>
                                    <Text style={styles.productPrice}>
                                        ${product.price.toFixed(2)}
                                    </Text>
                                    <View style={styles.ratingContainer}>
                                        <Ionicons
                                            name="star"
                                            size={16}
                                            color="#854C1F"
                                        />
                                        <Text style={styles.ratingText}>{product.rating}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Price Summary */}
                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Price</Text>
                            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Discount</Text>
                            <Text style={styles.summaryValue}>5%</Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabelBold}>Total</Text>
                            <Text style={styles.summaryValueBold}>${total.toFixed(2)}</Text>
                        </View>
                    </View>

                    {/* Pay Button */}
                    <Button onPress={() => router.push("/payment-method/page")}>Pay now</Button>
                </View>
            </SafeAreaView>
        </>
    );
}

const getStyles = (colorScheme: string) =>
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
            flex: 1,
        },
        container: {
            flex: 1,
            marginHorizontal: 16,
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
            color: layoutTheme.colors.text.inverse,
            fontFamily: layoutTheme.fonts.sora.semiBold,
            fontSize: 18,
        },
        content: {
            flex: 1,
            marginTop: 20,
        },
        cartItem: {
            marginBottom: 24,
        },
        productTitle: {
            color: layoutTheme.colors.text.inverse,
            fontFamily: layoutTheme.fonts.sora.semiBold,
            fontSize: 20,
            marginBottom: 16,
        },
        productRow: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
        },
        productImage: {
            width: 100,
            height: 100,
            borderRadius: 12,
        },
        quantityControl: {
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
        },
        quantityButton: {
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            alignItems: "center",
            justifyContent: "center",
        },
        quantityButtonText: {
            color: layoutTheme.colors.text.inverse,
            fontSize: 18,
            fontFamily: layoutTheme.fonts.sora.semiBold,
        },
        quantityText: {
            color: layoutTheme.colors.text.inverse,
            fontSize: 18,
            fontFamily: layoutTheme.fonts.sora.semiBold,
            minWidth: 30,
            textAlign: "center",
        },
        productFooter: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        productPrice: {
            color: layoutTheme.colors.text.inverse,
            fontFamily: layoutTheme.fonts.sora.regular,
            fontSize: 18,
        },
        ratingContainer: {
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
        },
        ratingText: {
            color: layoutTheme.colors.text.inverse,
            fontFamily: layoutTheme.fonts.sora.regular,
            fontSize: 16,
        },
        summaryContainer: {
            marginVertical: 20,
            gap: 12,
        },
        summaryRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        summaryLabel: {
            color: layoutTheme.colors.text.inverse,
            fontFamily: layoutTheme.fonts.sora.regular,
            fontSize: 16,
        },
        summaryValue: {
            color: layoutTheme.colors.text.inverse,
            fontFamily: layoutTheme.fonts.sora.regular,
            fontSize: 16,
        },
        summaryLabelBold: {
            color: layoutTheme.colors.text.inverse,
            fontFamily: layoutTheme.fonts.sora.semiBold,
            fontSize: 18,
        },
        summaryValueBold: {
            color: layoutTheme.colors.text.inverse,
            fontFamily: layoutTheme.fonts.sora.semiBold,
            fontSize: 18,
        },
    });