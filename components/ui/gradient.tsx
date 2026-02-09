import { layoutTheme } from "@/constant/theme";
import { useTheme } from "@/hooks/use-theme";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export default function Gradient() {
    const { colorScheme } = useTheme()
    const styles = getStyles(colorScheme)
    return (
        <LinearGradient
            colors={
                colorScheme === "dark"
                    ? (layoutTheme.colors.gradients.primary as any)
                    : (layoutTheme.colors.gradients.secondary as any)
            }
            style={styles.background}
        />
    )
}

const getStyles = (colorScheme: string) => StyleSheet.create({
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "100%",
        zIndex: -1,
    },
})