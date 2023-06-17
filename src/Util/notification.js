import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

class NotificationManager {
  // Request User to give permission notification
  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      return enabled;
    } else {
      return false;
    }
  };

  registerWithFCM = async () => {
    const _ = await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    return token.toString();
  };

  receiveNotifcationForeground = (onReceiveMessage) => {
    console.log('onReceiveMessage>>>', onReceiveMessage);

    // return unsubscribe;
  };

  receiveNotifcationBackground = (onReceiveMessage) => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      alert('here');
      console.log('remoteMessage receiveNotifcationBackground', remoteMessage);
      onReceiveMessage(remoteMessage);
    });
  };
  onNotificationOpenedApp = () => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      alert('here');
      console.log(
        'remoteMessage Notification caused app to open from background state:',
        remoteMessage.notification
      );
      // navigation.navigate(remoteMessage.data.type);
    });
  };
}

export default NotificationManager;
