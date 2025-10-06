import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Button, Platform, Text, View } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef(null);
  const responseListener = useRef(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((n) => {
        setNotification(n);
        console.log('DATA (foreground):', n?.request?.content?.data);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((resp) => {
        const data = resp?.notification?.request?.content?.data;
        console.log('DATA (tap):', data);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <Text style={{ textAlign: 'center' }}>
        Your Expo Push Token:
        {'\n'}
        {expoPushToken || '(aún no disponible)'}
      </Text>

      <View style={{ height: 12 }} />

      <Button
        title="Local: programar notificación (2s)"
        onPress={async () => {
          await scheduleLocalNotification();
        }}
      />

      <View style={{ height: 12 }} />

      <Button
        title="Remoto: enviarme un push con DATA"
        disabled={!expoPushToken}
        onPress={async () => {
          await sendExpoRemotePush(expoPushToken, {
            screen: 'Detalle',
            id: '42',
            promo: 'SUMMER24',
          });
        }}
      />

      {notification && (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text>Last Notification:</Text>
          <Text>{notification.request.content.title}</Text>
          <Text>{notification.request.content.body}</Text>
          <Text>DATA: {JSON.stringify(notification.request.content.data)}</Text>
        </View>
      )}
    </View>
  );
}

async function scheduleLocalNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '¡Mira esto!',
      body: 'Este es un mensaje de notificación local.',
      data: { data: 'Información adicional' }, // <- tu JSON
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    alert('Usa un dispositivo físico para push.');
    return null;
  }
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Permiso de notificaciones denegado.');
    return null;
  }

  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId;

  const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  console.log('ExpoPushToken:', token);

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}

async function sendExpoRemotePush(toToken, data) {
  const body = {
    to: toToken,
    title: 'Pedido #842 listo',
    body: 'Toca para ver detalles',
    data, 
    sound: 'default',
    channelId: 'default',
    priority: 'high',
  };

  const res = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  console.log('Expo push response:', json);
}
