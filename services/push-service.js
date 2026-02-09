import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

/**
 * Send booking confirmation notification
 * @param {Object} bookingDetails - Booking information
 * @param {string} bookingDetails.carBrand - Car brand name
 * @param {string} bookingDetails.carModel - Car model name
 * @param {number} bookingDetails.rentalDays - Number of rental days
 * @param {number} bookingDetails.totalPrice - Total booking price
 * @param {string} bookingDetails.bookingId - Unique booking ID
 * @returns {Promise<string>} - Notification identifier
 */
export async function sendBookingConfirmationNotification (bookingDetails){
  const { title} = bookingDetails

  const notificationTitle = "🎉 Booking Confirmed!"
  const body = `Your ${title} are wait you`

  const data = {
    type:"booking_confirmed",
    title,
  }
  return await sendLocalNotification({title: notificationTitle, body, data})
}

/**
 * Send a local push notification immediately
 * @param {Object} params - Notification parameters
 * @param {string} params.title - Notification title
 * @param {string} params.body - Notification body
 * @param {Object} params.data - Additional data (price, quantity, type, etc.)
 * @param {number} params.data.price - Item price
 * @param {number} params.data.quantity - Item quantity
 * @param {string} params.data.type - Notification type
 * @returns {Promise<string>} - Notification identifier
 */
export async function sendLocalNotification({ title, body, data = {} }) {
  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: {
          ...data,
          title,
          body,
          price: data.price || 0,
          quantity: data.quantity || 0,
        },
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        vibrate: [0, 250, 250, 250],
        badge: 1,
      },
      trigger: null, // null means send immediately
    });

    // Save to notification history
    await saveNotificationToHistory({
      id: notificationId,
      title,
      body,
      data: {
        ...data,
        title,
        body,
        price: data.price || 0,
        quantity: data.quantity || 0,
      },
    });

    console.log('Local notification sent:', notificationId);
    return notificationId;
  } catch (error) {
    console.error('Error sending local notification:', error);
    throw error;
  }
}

/**
 * Schedule a notification for later
 * @param {Object} params - Notification parameters
 * @param {string} params.title - Notification title
 * @param {string} params.body - Notification body
 * @param {Object} params.data - Additional data (price, quantity)
 * @param {number} params.data.price - Item price
 * @param {number} params.data.quantity - Item quantity
 * @param {number} params.seconds - Seconds from now to trigger
 * @returns {Promise<string>} - Notification identifier
 */
export async function scheduleNotification({ title, body, data = {}, seconds = 60 }) {
  try {
    const scheduledAt = new Date(Date.now() + seconds * 1000).toISOString();
    
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: {
          title,
          body,
          price: data.price || 0,
          quantity: data.quantity || 0,
        },
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        vibrate: [0, 250, 250, 250],
        badge: 1,
      },
      trigger: {
        seconds,
      },
    });

    // Save to notification history
    await saveNotificationToHistory({
      id: notificationId,
      title,
      body,
      data: {
        title,
        body,
        price: data.price || 0,
        quantity: data.quantity || 0,
      },
      scheduledAt,
    });

    console.log('Notification scheduled:', notificationId);
    return notificationId;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    throw error;
  }
}

/**
 * Send payment confirmation notification
 * @param {Object} paymentDetails - Payment information
 * @param {number} paymentDetails.amount - Payment amount
 * @param {string} paymentDetails.cardNumber - Last 4 digits of card
 * @param {string} paymentDetails.paymentId - Unique payment ID
 * @returns {Promise<string>} - Notification identifier
 */
export async function sendPaymentConfirmationNotification(paymentDetails) {
  const { amount, cardNumber, paymentId } = paymentDetails;

  const title = '💳 Payment Successful';
  const body = `Your payment of $${amount.toFixed(2)} has been processed successfully!`;

  const data = {
    title,
    body,
    price: amount,
    quantity: 1,
    type: 'payment_confirmed',
    paymentId,
    cardNumber,
    timestamp: new Date().toISOString(),
  };

  return await sendLocalNotification({ title, body, data });
}

/**
 * Send order confirmation notification
 * @param {Object} orderDetails - Order information
 * @param {string} orderDetails.coffeeName - Coffee name
 * @param {number} orderDetails.quantity - Number of items
 * @param {number} orderDetails.totalPrice - Total order price
 * @param {string} orderDetails.orderId - Unique order ID
 * @returns {Promise<string>} - Notification identifier
 */
export async function sendOrderConfirmationNotification(orderDetails) {
  const { coffeeName, quantity, totalPrice, orderId } = orderDetails;

  const title = '☕ Order Confirmed!';
  const body = `Your order of ${quantity} ${coffeeName} ${
    quantity === 1 ? 'is' : 'are'
  } confirmed. Total: $${totalPrice.toFixed(2)}`;

  const data = {
    title,
    body,
    price: totalPrice,
    quantity,
    type: 'order_confirmed',
    orderId,
    coffeeName,
    timestamp: new Date().toISOString(),
  };

  return await sendLocalNotification({ title, body, data });
}

/**
 * Send order ready notification
 * @param {Object} params - Order ready parameters
 * @param {string} params.coffeeName - Coffee name
 * @param {number} params.quantity - Number of items
 * @param {number} params.totalPrice - Total order price
 * @param {string} params.orderId - Order ID
 * @returns {Promise<string>} - Notification identifier
 */
export async function sendOrderReadyNotification({ coffeeName, quantity, totalPrice, orderId }) {
  const title = '✅ Your Order is Ready!';
  const body = `Your ${coffeeName} ${quantity > 1 ? `(${quantity}x)` : ''} is ready for pickup!`;

  const data = {
    title,
    body,
    price: totalPrice,
    quantity,
    type: 'order_ready',
    orderId,
    coffeeName,
  };

  return await sendLocalNotification({ title, body, data });
}

/**
 * Send special offer notification
 * @param {Object} params - Offer parameters
 * @param {string} params.offerTitle - Offer title
 * @param {string} params.coffeeName - Coffee name on offer
 * @param {number} params.discountPrice - Discounted price
 * @param {number} params.originalPrice - Original price
 * @returns {Promise<string>} - Notification identifier
 */
export async function sendSpecialOfferNotification({ offerTitle, coffeeName, discountPrice, originalPrice }) {
  const title = '🎉 Special Offer!';
  const body = `${offerTitle}: Get ${coffeeName} for $${discountPrice.toFixed(2)} (was $${originalPrice.toFixed(2)})`;

  const data = {
    title,
    body,
    price: discountPrice,
    quantity: 1,
    type: 'special_offer',
    coffeeName,
    originalPrice,
  };

  return await sendLocalNotification({ title, body, data });
}

/**
 * Save notification history to AsyncStorage
 * @param {Object} notification - Notification data to save
 * @param {string} notification.id - Notification ID
 * @param {string} notification.title - Notification title
 * @param {string} notification.body - Notification body
 * @param {Object} notification.data - Notification data
 * @param {string} notification.data.title - Data title
 * @param {string} notification.data.body - Data body
 * @param {number} notification.data.price - Item price
 * @param {number} notification.data.quantity - Item quantity
 * @param {string} [notification.scheduledAt] - Scheduled time (ISO string)
 */
export async function saveNotificationToHistory(notification) {
  try {
    const historyKey = 'notification_history';
    const existingHistory = await AsyncStorage.getItem(historyKey);
    const history = existingHistory ? JSON.parse(existingHistory) : [];

    const notificationItem = {
      id: notification.id,
      title: notification.title,
      body: notification.body,
      data: {
        ...notification.data,
        title: notification.data.title,
        body: notification.data.body,
        price: notification.data.price,
        quantity: notification.data.quantity,
      },
      receivedAt: new Date().toISOString(),
      shleduledAt: notification.scheduledAt || '',
    };

    history.unshift(notificationItem);

    // Keep only last 50 notifications
    const trimmedHistory = history.slice(0, 50);

    await AsyncStorage.setItem(historyKey, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Error saving notification to history:', error);
  }
}

/**
 * Get notification history
 * @returns {Promise<Array>} - Array of notification items
 * Each item contains: id, title, body, data (title, body, price, quantity), receivedAt, shleduledAt
 */
export async function getNotificationHistory() {
  try {
    const historyKey = 'notification_history';
    const history = await AsyncStorage.getItem(historyKey);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting notification history:', error);
    return [];
  }
}

/**
 * Clear notification history
 */
export async function clearNotificationHistory() {
  try {
    await AsyncStorage.removeItem('notification_history');
  } catch (error) {
    console.error('Error clearing notification history:', error);
  }
}

/**
 * Server-side push notification sender (for backend integration)
 * This would typically be called from your backend server
 * For now, it's a placeholder showing how to structure the data
 * 
 * In production, you would:
 * 1. Send push token to your backend when user registers
 * 2. Your backend would call Expo's push notification service
 * 3. Use expo-server-sdk on your Node.js backend
 * 
 * Example backend code:
 * 
 * const { Expo } = require('expo-server-sdk');
 * const expo = new Expo();
 * 
 * async function sendPushNotification(pushToken, title, body, data) {
 *   const message = {
 *     to: pushToken,
 *     sound: 'default',
 *     title: title,
 *     body: body,
 *     data: data,
 *     priority: 'high',
 *     channelId: 'order-updates',
 *   };
 *   
 *   const ticket = await expo.sendPushNotificationsAsync([message]);
 *   return ticket;
 * }
 * 
 * @param {Object} orderDetails - Order information
 * @param {string} orderDetails.coffeeName - Coffee name
 * @param {number} orderDetails.quantity - Order quantity
 * @param {number} orderDetails.totalPrice - Total price
 * @param {string} orderDetails.orderId - Order ID
 * @param {string} orderDetails.pushToken - User's push notification token
 * @returns {Object} - Push notification payload
 */
export function getServerNotificationPayload(orderDetails) {
  const { coffeeName, quantity, totalPrice, orderId, pushToken } = orderDetails;

  return {
    to: pushToken,
    sound: 'default',
    title: '☕ Order Confirmed!',
    body: `Your order of ${quantity} ${coffeeName} ${
      quantity === 1 ? 'is' : 'are'
    } confirmed. Total: $${totalPrice.toFixed(2)}`,
    data: {
      title: '☕ Order Confirmed!',
      body: `Your order of ${quantity} ${coffeeName} ${
        quantity === 1 ? 'is' : 'are'
      } confirmed. Total: $${totalPrice.toFixed(2)}`,
      price: totalPrice,
      quantity,
      type: 'order_confirmed',
      orderId,
      coffeeName,
      timestamp: new Date().toISOString(),
    },
    priority: 'high',
    channelId: 'order-updates',
  };
}
