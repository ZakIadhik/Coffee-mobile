import { useTheme } from "@/hooks/use-theme";
import { zodResolver } from "@hookform/resolvers/zod";

import { layoutTheme } from "@/constant/theme";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";
import { personalInformationSchema, PersonalInformationSchema } from "./persona-information.schema";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function PersonalInformationForm() {
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme)

    const router = useRouter();

    const { height } = useWindowDimensions();

    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, formState: { errors }, setValue } = useForm<PersonalInformationSchema>({
        resolver: zodResolver(personalInformationSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
        }
    })

    const onSubmit = async (data: PersonalInformationSchema) => {
        try {
            setLoading(true);
            await AsyncStorage.setItem("personalInformation", JSON.stringify(data));
            Alert.alert("Success", "Personal information updated successfully", [
                {
                    text: "Tamam",
                    onPress: () => {
                        router.back();
                    }
                }
            ]);

        } catch (error) {
            Alert.alert("Error", "Failed to update personal information");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const getPersonalInformation = async () => {
        const personalInformation = await AsyncStorage.getItem("personalInformation");
        if (personalInformation) {
            setValue("name", JSON.parse(personalInformation).name);
            setValue("email", JSON.parse(personalInformation).email);
            setValue("phone", JSON.parse(personalInformation).phone);
            setValue("address", JSON.parse(personalInformation).address);
        }
    }

    useEffect(() => {
        getPersonalInformation();
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
                                <Text style={styles.label}>Name</Text>
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={[styles.input, errors.name && styles.inputError]}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder="Enter your name"
                                            placeholderTextColor={layoutTheme.colors.text.muted}
                                        />
                                    )}
                                />
                                {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
                            </View>

                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>Email</Text>
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={[styles.input, errors.email && styles.inputError]}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder="Enter your email"
                                            placeholderTextColor={layoutTheme.colors.text.muted}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                        />
                                    )}
                                />
                                {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
                            </View>

                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>Phone</Text>
                                <Controller
                                    control={control}
                                    name="phone"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={[styles.input, errors.phone && styles.inputError]}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder="Enter your phone number"
                                            placeholderTextColor={layoutTheme.colors.text.muted}
                                            keyboardType="phone-pad"
                                        />
                                    )}
                                />
                                {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}
                            </View>

                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>Address</Text>
                                <Controller
                                    control={control}
                                    name="address"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={[styles.input, styles.textArea, errors.address && styles.inputError]}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder="Enter your address"
                                            placeholderTextColor={layoutTheme.colors.text.muted}
                                            multiline
                                            numberOfLines={3}
                                            textAlignVertical="top"
                                        />
                                    )}
                                />
                                {errors.address && <Text style={styles.error}>{errors.address.message}</Text>}
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
    textArea: {
        minHeight: 80,
        paddingTop: 15,
    },
    error: {
        color: layoutTheme.colors.text.error,
        fontSize: 12,
        fontFamily: layoutTheme.fonts.sora.regular,
        marginTop: -5,
    },
});