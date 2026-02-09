import { useTheme } from "@/hooks/use-theme";
import { zodResolver } from "@hookform/resolvers/zod";

import * as ImagePicker from "expo-image-picker";

import { layoutTheme } from "@/constant/theme";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";

import Button from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { CuponsSchema, cuponsSchema } from "./cupons.schema";

export default function CuponsForm() {
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme)

    const router = useRouter();

    const { height } = useWindowDimensions();

    const [loading, setLoading] = useState(false);
    const [cuponImage, setCuponImage] = useState<string | null>(null);

    const { control, watch, handleSubmit, formState: { errors }, setValue } = useForm<CuponsSchema>({
        resolver: zodResolver(cuponsSchema),
        defaultValues: {
            code: "",
            cuponImage: ""
        }
    })

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission Required", "Permission not granted to access media library");
            return
        }

        Alert.alert("Upload Cupon Photo", "Choose an option", [
            {
                text: "Take a photo",
                onPress: async () => {
                    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
                    if (cameraPermission.granted) {
                        const image = await ImagePicker.launchCameraAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            aspect: [1, 1],
                            quality: 1,
                        })

                        if (!image.canceled) {
                            setCuponImage(image.assets[0].uri);
                            setValue("cuponImage", image.assets[0].uri);
                        }
                    }
                }
            },
            {
                text: "Choose from library",
                onPress: async () => {
                    const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (libraryPermission.granted) {
                        const image = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            aspect: [4, 3],
                            quality: 1,
                        })
                        if (!image.canceled) {
                            setCuponImage(image.assets[0].uri);
                            setValue("cuponImage", image.assets[0].uri);
                        }
                    }
                }
            },
            {
                text: "Cancel",
                style: "cancel",
            },
        ],
            { cancelable: true })
    }



    const onSubmit = async (data: CuponsSchema) => {
        try {
            setLoading(true);
            await AsyncStorage.setItem("cupons", JSON.stringify(data));
            Alert.alert("Success", "Cupons information updated successfully", [
                {
                    text: "Keep Changes",
                    onPress: () => {
                        router.back();
                    }
                }
            ]);

        } catch (error) {
            Alert.alert("Error", "Failed to update cupons information");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    const getCuponsInformation = async () => {
        try {
            const cuponsInformation = await AsyncStorage.getItem("cupons");
            if (cuponsInformation) {
                const parsedData = JSON.parse(cuponsInformation);
                setValue("code", parsedData.code || "");
                setValue("cuponImage", parsedData.cuponImage || "");
                setCuponImage(parsedData.cuponImage || null);
            }
        } catch (error) {
            console.log("Error loading cupons information:", error);
        }
    }

    useEffect(() => {
        getCuponsInformation();
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
                                <Text style={styles.label}>Code</Text>
                                <Controller
                                    control={control}
                                    name="code"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={[styles.input, errors.code && styles.inputError]}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder="Enter code"
                                            placeholderTextColor={layoutTheme.colors.text.muted}
                                        />
                                    )}
                                />
                                {errors.code && <Text style={styles.error}>{errors.code.message}</Text>}
                            </View>

                            <View style={styles.uploadSection}>
                                <Text style={styles.uploadTitle}>Upload Your Licence Photo</Text>

                                <TouchableOpacity style={styles.uploadArea} onPress={pickImage}>
                                    {cuponImage || watch("cuponImage") ? (
                                        <Image
                                            source={{ uri: cuponImage || watch("cuponImage") || "" }}
                                            style={styles.uploadedImage}
                                        />
                                    ) : (
                                        <View style={styles.cameraIconContainer}>
                                            <Ionicons name="camera" size={60} color="#C4C4C4" />
                                        </View>
                                    )}
                                </TouchableOpacity>
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

    uploadSection: {
        marginBottom: 30,
    },
    uploadTitle: {
        fontSize: 18,
        fontFamily: layoutTheme.fonts.sora.semiBold,
        color: layoutTheme.colors.text.primary,
        textAlign: "center",
        marginBottom: 20,
    },
    uploadArea: {
        width: "100%",
        height: 200,
        backgroundColor: "#F5F5F5",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    cameraIconContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    uploadedImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
});