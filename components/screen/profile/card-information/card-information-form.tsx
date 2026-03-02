import { useTheme } from "@/hooks/use-theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { layoutTheme } from "@/constant/theme";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";
import { cardInformationSchema, CardInformationSchema } from "./card-information.schema";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function CardInformationForm() {
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme)
    const router = useRouter();
    const { height } = useWindowDimensions();
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, formState: { errors }, setValue } = useForm<CardInformationSchema>({
        resolver: zodResolver(cardInformationSchema),
        defaultValues: {
            cardNumber: "",
            cardHolder: "",
            expiryDate: "",
            cvv: "",
        }
    })

    const onSubmit = async (data: CardInformationSchema) => {
        try {
            setLoading(true);
            await AsyncStorage.setItem("cardInformation", JSON.stringify(data));
            Alert.alert("Success", "Card information updated successfully", [
                {
                    text: "Tamam",
                    onPress: () => {
                        router.back();
                    }
                }
            ]);
        } catch (error) {
            Alert.alert("Error", "Failed to update card information");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const getCardInformation = async () => {
        const cardInformation = await AsyncStorage.getItem("cardInformation");
        if (cardInformation) {
            const parsed = JSON.parse(cardInformation);
            setValue("cardNumber", parsed.cardNumber);
            setValue("cardHolder", parsed.cardHolder);
            setValue("expiryDate", parsed.expiryDate);
            setValue("cvv", parsed.cvv);
        }
    }

    useEffect(() => {
        getCardInformation();
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ ...styles.formFields, height: height - 200 }}>
                        <View style={styles.fieldsContainer}>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>Card Number</Text>
                                <Controller
                                    control={control}
                                    name="cardNumber"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={[styles.input, errors.cardNumber && styles.inputError]}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder="0000 0000 0000 0000"
                                            placeholderTextColor={layoutTheme.colors.text.muted}
                                            keyboardType="number-pad"
                                            maxLength={16}
                                        />
                                    )}
                                />
                                {errors.cardNumber && <Text style={styles.error}>{errors.cardNumber.message}</Text>}
                            </View>

                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>Card Holder Name</Text>
                                <Controller
                                    control={control}
                                    name="cardHolder"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={[styles.input, errors.cardHolder && styles.inputError]}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder="Enter card holder name"
                                            placeholderTextColor={layoutTheme.colors.text.muted}
                                        />
                                    )}
                                />
                                {errors.cardHolder && <Text style={styles.error}>{errors.cardHolder.message}</Text>}
                            </View>

                            <View style={styles.rowContainer}>
                                <View style={[styles.fieldContainer, styles.halfWidth]}>
                                    <Text style={styles.label}>Expiry Date</Text>
                                    <Controller
                                        control={control}
                                        name="expiryDate"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={[styles.input, errors.expiryDate && styles.inputError]}
                                                onChangeText={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                placeholder="MM/YY"
                                                placeholderTextColor={layoutTheme.colors.text.muted}
                                                keyboardType="number-pad"
                                                maxLength={5}
                                            />
                                        )}
                                    />
                                    {errors.expiryDate && <Text style={styles.error}>{errors.expiryDate.message}</Text>}
                                </View>

                                <View style={[styles.fieldContainer, styles.halfWidth]}>
                                    <Text style={styles.label}>CVV</Text>
                                    <Controller
                                        control={control}
                                        name="cvv"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                style={[styles.input, errors.cvv && styles.inputError]}
                                                onChangeText={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                placeholder="123"
                                                placeholderTextColor={layoutTheme.colors.text.muted}
                                                keyboardType="number-pad"
                                                maxLength={4}
                                                secureTextEntry
                                            />
                                        )}
                                    />
                                    {errors.cvv && <Text style={styles.error}>{errors.cvv.message}</Text>}
                                </View>
                            </View>
                        </View>

                        <Button onPress={handleSubmit(onSubmit)} >
                            {loading ? <ActivityIndicator size="small" color={layoutTheme.colors.neutral.white} /> : <Text>Keep Changes</Text>}
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const getStyles = (colorScheme: string) => StyleSheet.create({
    container: {
        flex: 1,
    },
    formFields: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        gap: 20,
    },
    fieldsContainer: {
        gap: 20,
    },
    fieldContainer: {
        gap: 10,
    },
    rowContainer: {
        flexDirection: "row",
        gap: 15,
    },
    halfWidth: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        fontFamily: layoutTheme.fonts.sora.semiBold,
        color: colorScheme === "dark" ? layoutTheme.colors.neutral.white : layoutTheme.colors.text.primary,
    },
    input: {
        width: "100%",
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colorScheme === "dark" ? layoutTheme.colors.neutral.dark : layoutTheme.colors.neutral.light,
        backgroundColor: colorScheme === "dark" ? layoutTheme.colors.primary[900] : layoutTheme.colors.background.white,
        fontSize: 16,
        fontFamily: layoutTheme.fonts.sora.regular,
        color: colorScheme === "dark" ? layoutTheme.colors.neutral.white : layoutTheme.colors.text.primary,
    },
    inputError: {
        borderColor: layoutTheme.colors.text.error,
    },
    error: {
        color: layoutTheme.colors.text.error,
        fontSize: 12,
        fontFamily: layoutTheme.fonts.sora.regular,
        marginTop: -5,
    },
});
