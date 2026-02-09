import { layoutTheme } from "@/constant/theme";
import { useTheme } from "@/hooks/use-theme";
import { useCoffeeStore } from "@/store/use-product";
import { Coffee } from "@/types/coffee-data-types";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function OrderCard({ product }: { product: Coffee }) {
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme);
    const { removeProduct } = useCoffeeStore();
    const handleDelete = () => {
        removeProduct(product.id);
    }
    return (
        <View style={styles.container}>
            <View style={styles.infoWrap}>
                <Image source={{ uri: product.image }} style={styles.image} />
                <View style={styles.infoContent}>
                    <Text style={styles.title}>{product.title}</Text>
                    <Text style={styles.price}>${(product.price * product.quantity).toFixed(2)}</Text>
                </View>
                <View style={styles.quantityWrap}>
                    <Text style={styles.quantity}>{product.quantity}</Text>
                </View>

            </View>
            <View style={styles.delete}>
                <TouchableOpacity onPress={handleDelete}>
                    <Ionicons name="trash-outline" size={24} color={colorScheme === "dark" ? layoutTheme.colors.neutral.white : layoutTheme.colors.primary[500]} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const getStyles = (colorScheme: string) => StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 5,
        backgroundColor: colorScheme === "dark" ? layoutTheme.colors.primary[900] : layoutTheme.colors.secondary[100],
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    infoWrap: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    infoContent: {
        gap: 4,
    },
    title: {
        color: colorScheme === "dark" ? layoutTheme.colors.neutral.white : layoutTheme.colors.primary[500],
        fontFamily: layoutTheme.fonts.sora.bold
    },
    price: {
        color: colorScheme === "dark" ? layoutTheme.colors.secondary[300] : layoutTheme.colors.primary[500],
        fontFamily: layoutTheme.fonts.sora.bold,
        fontSize: 16,
    },
    quantityWrap: {

    },
    quantity: {
        color: colorScheme === "dark" ? layoutTheme.colors.neutral.white : layoutTheme.colors.primary[500],
        fontFamily: layoutTheme.fonts.sora.bold,
        fontSize: 16,
    },
    delete: {
        marginHorizontal:10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: colorScheme === "dark" ? layoutTheme.colors.primary[700] : layoutTheme.colors.secondary[100],
    },
})