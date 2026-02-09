import OrderCard from "@/components/screen/orders/order-card";
import Gradient from "@/components/ui/gradient";
import { layoutTheme } from "@/constant/theme";
import { useTheme } from "@/hooks/use-theme";
import { useCoffeeStore } from "@/store/use-product";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Orders() {
    const layoutTheme = useTheme();
    const styles = getStyles(layoutTheme.colorScheme);
    const { products, totalPrice, clearProducts } = useCoffeeStore()

    const handleCheckout = () => {
        router.push("/checkout/page");
    }

    return (
        <View style={styles.container}>
            <Gradient />
            <ScrollView style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Orders</Text>
                    <Text style={styles.headerTotal}>Total: ${totalPrice.toFixed(2)}</Text>
                    <TouchableOpacity onPress={clearProducts}>
                        <Text style={styles.headerClear}>Clear</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.orderList}>
                    {
                        products.map((product) => (
                            <OrderCard key={product.id} product={product} />
                        ))
                    }
                </View>
                {products.length > 0 && (
                    <TouchableOpacity style={styles.checkout} onPress={handleCheckout}>
                        <Text style={styles.checkoutText}>Checkout</Text>
                        </TouchableOpacity>
                    )}
            </ScrollView>
        </View>
    );
}

const getStyles = (colorScheme: string) => StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: layoutTheme.fonts.sora.bold,
        color: colorScheme === "dark" ? layoutTheme.colors.neutral.white : layoutTheme.colors.neutral.black,
    },
    orderList: {
        flex: 1,
        gap: 8,
    },
    headerTotal: {
        fontSize: 16,
        fontFamily: layoutTheme.fonts.sora.bold,
        color: colorScheme === "dark" ? layoutTheme.colors.neutral.white : layoutTheme.colors.neutral.black,
    },
    headerClear: {
        fontSize: 16,
        fontFamily: layoutTheme.fonts.sora.bold,
        color: colorScheme === "dark" ? layoutTheme.colors.neutral.white : layoutTheme.colors.neutral.black,
    },
    checkout: {
        marginTop: 24,
        alignItems: "center",
        backgroundColor: colorScheme === "dark" ? layoutTheme.colors.secondary[500] : layoutTheme.colors.primary[500],
        padding: 16,
    },
    checkoutText: {
        fontSize: 16,
        fontFamily: layoutTheme.fonts.sora.bold,
        color: colorScheme === "dark" ? layoutTheme.colors.neutral.white : layoutTheme.colors.neutral.black,
    },
})