
import Button from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { sendPaymentConfirmationNotification } from "@/services/push-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { paymentSchema, PaymentSchema } from "./payment.schema";
import { useCoffeeStore } from "@/store/use-product";



export default function PaymentForm() {
    const { colorScheme } = useTheme()
    const styles = getStyles(colorScheme)
    const { totalPrice } = useCoffeeStore();

    const [formattedCardNumber, setFormattedCardNumber] = useState("");
    const [formattedExpiry, setFormattedExpiry] = useState("");
    const [formattedCardHolder, setFormattedCardHolder] = useState("");



    const { control, setValue, handleSubmit, formState: { errors } } = useForm<PaymentSchema>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            cardNumber: "",
            cardHolderName: "",
            expiry: "",
            cvv: "",
        }
    })

    const formatCardNumber = (text: string) => {
        const cleaned = text.replace(/\D/g, "");
        const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
        setFormattedCardNumber(formatted);
        setValue("cardNumber", formatted, { shouldValidate: true });
    };

    const formatCardHolderChange = (text: string) => {
        const cleaned = text.replace(/[^a-zA-Z\s]/g, "");
        setFormattedCardHolder(cleaned);
        setValue("cardHolderName", cleaned, { shouldValidate: true });
    };

    const formatExpiry = (text: string) => {
        const cleaned = text.replace(/\D/g, "");
        let formatted = cleaned;
        if (cleaned.length >= 2) {
            formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
        }
        setFormattedExpiry(formatted);
        setValue("expiry", formatted, { shouldValidate: true });
    };

    const handleCvvChange = (text: string) => {
        setValue("cvv", text, { shouldValidate: true });
    };

    const onSubmit = async (data: PaymentSchema) => {
        try {
            if (!data) {
                Alert.alert("Error", "Please fill in all fields");
                return;
            }

            // Generate unique payment ID
            const paymentId = `PAY-${Date.now()}`;
            const amount = totalPrice;

            // Send payment confirmation notification to device
            await sendPaymentConfirmationNotification({
                amount,
                cardNumber: data.cardNumber.slice(-4),
                paymentId,
            });

            router.push("/payment/confirmation/page");
        } catch (error) {
            Alert.alert("Error", "Something went wrong");
            console.log(error);
        }
    };


    return (
        <View style={styles.container}>

            {/* Card Number */}
            <Controller
                control={control}
                name="cardNumber"
                render={({ field: { onBlur } }) => (
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Card Number</Text>
                        <TextInput
                            style={[
                                styles.input,
                                errors.cardNumber && styles.inputError,
                            ]}
                            value={formattedCardNumber}
                            placeholder="0000 0000 0000 0000"
                            placeholderTextColor="#6B7280"
                            onChangeText={formatCardNumber}
                            onBlur={onBlur}
                            keyboardType="numeric"
                            maxLength={19}
                        />
                        {errors.cardNumber && (
                            <Text style={styles.errorText}>
                                {errors.cardNumber.message}
                            </Text>
                        )}
                    </View>
                )}
            />

            {/* Card Holder Name */}
            <Controller
                control={control}
                name="cardHolderName"
                render={({ field: { onBlur } }) => (
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Card Holder Name</Text>
                        <TextInput
                            style={[
                                styles.input,
                                errors.cardHolderName && styles.inputError,
                            ]}
                            value={formattedCardHolder}
                            placeholder="Abdur Rohim Mia"
                            placeholderTextColor="#6B7280"
                            onChangeText={formatCardHolderChange}
                            onBlur={onBlur}
                        />
                        {errors.cardHolderName && (
                            <Text style={styles.errorText}>
                                {errors.cardHolderName.message}
                            </Text>
                        )}
                    </View>
                )}
            />

            {/* Expiry && CVV */}
            <View style={styles.inputWrapperRow}>
                <Controller
                    control={control}
                    name="expiry"
                    render={({ field: { onBlur } }) => (
                        <View style={[styles.inputWrapper, styles.inputHalf]}>
                            <Text style={styles.label}>Expiry Date</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    errors.expiry && styles.inputError,
                                ]}
                                value={formattedExpiry}
                                placeholder="MM/YY"
                                placeholderTextColor="#6B7280"
                                onChangeText={formatExpiry}
                                onBlur={onBlur}
                                keyboardType="numeric"
                                maxLength={5}
                            />
                            {errors.expiry && (
                                <Text style={styles.errorText}>
                                    {errors.expiry.message}
                                </Text>
                            )}
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name="cvv"
                    render={({ field: { onBlur } }) => (
                        <View style={[styles.inputWrapper, styles.inputHalf]}>
                            <Text style={styles.label}>CVV</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    errors.cvv && styles.inputError,
                                ]}
                                placeholder="3 Digits"
                                placeholderTextColor="#6B7280"
                                onChangeText={handleCvvChange}
                                onBlur={onBlur}
                                keyboardType="numeric"
                                maxLength={3}
                                secureTextEntry
                            />
                            {errors.cvv && (
                                <Text style={styles.errorText}>
                                    {errors.cvv.message}
                                </Text>
                            )}
                        </View>
                    )}
                />

            </View>

            <View style={styles.messageContainer}>
                <Text style={styles.messageText}>
                    Your order has been accepted. Your order has been accepted. Your order has been accepted
                </Text>
            </View>

            <Button onPress={handleSubmit(onSubmit)}>Pay</Button>

        </View>
    );
}

const getStyles = (colorScheme: string) => StyleSheet.create({
    container: {
        flex: 1,
    },
    inputWrapper: {
        marginBottom: 24,
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        color: '#D1D1D1',
        marginBottom: 12,
    },
    input: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#4A5568',
        padding: 12,
        paddingLeft: 0,
        fontSize: 16,
        color: '#FFFFFF',
    },
    inputWrapperRow: {
        flexDirection: "row",
        gap: 24,
    },
    inputHalf: {
        flex: 1,
    },
    inputError: {
        borderBottomColor: "red",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 4,
    },
    messageContainer: {
        marginTop: 40,
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageText: {
        fontSize: 14,
        color: '#9CA3AF',
        textAlign: 'center',
        lineHeight: 20,
    },
});