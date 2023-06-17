/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  await AsyncStorage.setItem('isNotification', 'true');
});

AppRegistry.registerHeadlessTask('SomeTaskName', () => {});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    return null;
  }
  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
