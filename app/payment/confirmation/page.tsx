// http://localhost:8081/payment/confirmation/page

import Button from "@/components/ui/button";
import Gradient from "@/components/ui/gradient";
import { layoutTheme } from "@/constant/theme";
import { useTheme } from "@/hooks/use-theme";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function PaymentConfirmation() {
    const { colorScheme } = useTheme()
    const router = useRouter()
    const styles = getStyles(colorScheme)
    
    return (
        <View style={styles.container}>
            <Gradient/>
            
            <View style={styles.content}>
                {/* Title */}
                <Text style={styles.title}>Confirmation</Text>
                
                {/* Checkmark Circle */}
                <View style={styles.checkmarkContainer}>
                    <View style={styles.checkmarkCircle}>
                        <View style={styles.checkmark}>
                            <View style={styles.checkmarkStem} />
                            <View style={styles.checkmarkKick} />
                        </View>
                    </View>
                </View>
                
                {/* Success Message */}
                <Text style={styles.heading}>Your order has been accepted</Text>
                
                {/* Description */}
                <Text style={styles.description}>
                    Your order has been accepted. Your order has been accepted. Your order has been accepted
                </Text>
                
                {/* Thank You Button */}
                <View style={styles.buttonContainer}>
                    <Button 
                        onPress={() => router.push('/(tabs)/home')}
                        style={styles.button}
                    >
                        Thank You
                    </Button>
                </View>
            </View>
        </View>
    )
}

const getStyles = (colorScheme: string) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: layoutTheme.colors.primary[500],
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        justifyContent: 'space-between',
        paddingBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: '600',
        color: layoutTheme.colors.neutral.white,
        textAlign: 'center',
        marginBottom: 40,
    },
    checkmarkContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: -80,
    },
    checkmarkCircle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#8B6F47',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 10,
    },
    checkmark: {
        width: 80,
        height: 80,
        position: 'relative',
    },
    checkmarkStem: {
        position: 'absolute',
        width: 10,
        height: 60,
        backgroundColor: layoutTheme.colors.neutral.white,
        transform: [{ rotate: '45deg' }],
        left: 40,
        top: 5,
        borderRadius: 5,
    },
    checkmarkKick: {
        position: 'absolute',
        width: 10,
        height: 30,
        backgroundColor: layoutTheme.colors.neutral.white,
        transform: [{ rotate: '-45deg' }],
        left: 15,
        top: 35,
        borderRadius: 5,
    },
    heading: {
        fontSize: 24,
        fontWeight: '600',
        color: layoutTheme.colors.neutral.white,
        textAlign: 'center',
        marginTop: -100,
        marginBottom: 16,
    },
    description: {
        fontSize: 14,
        color: layoutTheme.colors.neutral.white,
        textAlign: 'center',
        opacity: 0.8,
        lineHeight: 22,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 'auto',
    },
    button: {
        width: '100%',
        height: 60,
        borderRadius: 16,
    },
})