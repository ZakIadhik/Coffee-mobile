import { layoutTheme } from "@/constant/theme";
import { useTheme } from "@/hooks/use-theme";
import { clearAllDeliveredNotifications } from "@/notification/listeners";
import { clearNotificationHistory, getNotificationHistory } from "@/services/push-service";
import * as Notifications from 'expo-notifications';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface NotificationData {
    title: string;
    body: string;
    price: number;
    quantity: number;
    type?: string;
    cardNumber?: string;
    timestamp?: string;
}

interface NotificationItem {
    id: string;
    title: string;
    body: string;
    data: NotificationData;
    receivedAt: string;
    shleduledAt: string;
}

export default function Notification() {
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme);

    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const renderItem = useCallback(({ item }: { item: NotificationItem }) => {
        const { title, body, data, receivedAt } = item;
        const date = new Date(receivedAt);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();

        return (
            <View style={styles.notificationCard}>
                <Text style={styles.notificationTitle}>{title}</Text>
                <Text style={styles.notificationBody}>{body}</Text>
                {data.type && (
                    <Text style={styles.notificationType}>Type: {data.type}</Text>
                )}
                {data.price > 0 && (
                    <Text style={styles.notificationPrice}>Amount: ${data.price.toFixed(2)}</Text>
                )}
                <Text style={styles.notificationDate}>
                    {formattedDate} at {formattedTime}
                </Text>
            </View>
        );
    }, [styles]);

    const fetchNotification = useCallback(async () => {
        try {
            const history = await getNotificationHistory();
            setNotifications(history);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    }, []);

    const handleClearAll = useCallback(async () => {
        try {
            await clearAllDeliveredNotifications();
            await clearNotificationHistory();
            setNotifications([]);
        } catch (error) {
            console.error('Error clearing notifications:', error);
        }
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchNotification();
        setRefreshing(false);
    }, [fetchNotification]);

    // Refresh notifications when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            fetchNotification();
        }, [fetchNotification])
    );

    // Listen for new notifications
    useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener(() => {
            // Refresh notification list when a new notification is received
            fetchNotification();
        });

        fetchNotification();

        return () => subscription.remove();
    }, [fetchNotification]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Notifications</Text>
                    <Text style={styles.headerCount}>({notifications.length})</Text>
                </View>
                <TouchableOpacity onPress={handleClearAll}>
                    <Text style={styles.clearAllButton}>Clear All</Text>
                </TouchableOpacity>
            </View>
            {notifications.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No notifications yet</Text>
                </View>
            ) : (
                <FlatList
                    data={notifications}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            )}
        </SafeAreaView>
    );
}

const getStyles = (colorScheme: string) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorScheme === 'dark' ? '#1A1A1A' : '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colorScheme === 'dark' ? '#333333' : '#E5E5E5',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: layoutTheme.fonts.sora.bold,
        color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
        marginRight: 8,
    },
    headerContent:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerCount: {
        fontSize: 18,
        color: colorScheme === 'dark' ? '#999999' : '#666666',
    },
    clearAllButton: {
        fontSize: 16,
        color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
        fontFamily: layoutTheme.fonts.sora.bold,
    },
    listContent: {
        padding: 16,
    },
    notificationCard: {
        backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#F5F5F5',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colorScheme === 'dark' ? '#333333' : '#E5E5E5',
    },
    notificationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
        marginBottom: 8,
    },
    notificationBody: {
        fontSize: 14,
        color: colorScheme === 'dark' ? '#CCCCCC' : '#333333',
        marginBottom: 8,
        lineHeight: 20,
    },
    notificationType: {
        fontSize: 12,
        color: colorScheme === 'dark' ? '#999999' : '#666666',
        marginBottom: 4,
        textTransform: 'capitalize',
    },
    notificationPrice: {
        fontSize: 14,
        fontWeight: '600',
        color: colorScheme === 'dark' ? '#4CAF50' : '#2E7D32',
        marginBottom: 8,
    },
    notificationDate: {
        fontSize: 12,
        color: colorScheme === 'dark' ? '#777777' : '#999999',
        fontStyle: 'italic',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyText: {
        fontSize: 16,
        color: colorScheme === 'dark' ? '#999999' : '#666666',
        textAlign: 'center',
    },
})