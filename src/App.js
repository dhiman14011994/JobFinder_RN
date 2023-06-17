import React, { useRef } from 'react';
import { StatusBar, Platform, AppState, NativeModules } from 'react-native';
import Route from './Navigation/route';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { useEffect } from 'react';
import NotificationManager from './Util/notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Strings from './Resources/Strings';
import messaging from '@react-native-firebase/messaging';
import { configureFacebook } from './Constants/SocailLogin';
import SplashScreen from 'react-native-splash-screen';
import { withIAPContext } from 'react-native-iap';
import { requestAllPermission } from './Constants/Permissions';
import DeviceInfo from 'react-native-device-info';
import {
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
  check,
} from 'react-native-permissions';
import Toast from 'react-native-simple-toast';

const App = () => {
  // const { AndoridAppKilledState } = NativeModule;
  const notificationManager = new NotificationManager();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }
console.log("appState.current>>>", appState.current)
      if (appState.current === 'unknown') {
        AsyncStorage.setItem(Strings.SHOW_BIG_BANNER, 'true');
      }

      appState.current = nextAppState;
      // setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NativeModules.CustomModule.show((value) => {
        if (value) {
          AsyncStorage.setItem(Strings.SHOW_BIG_BANNER, 'true');
        }
      });
    }
  }, []);

  useEffect(() => {
    SplashScreen.hide();
    configureFacebook();
    if (Platform.OS === 'android') {
      requestAllPermission();
      setTimeout(() => {
        permissionRequest();
      }, 1000);
    } else {
      getFirebaseToken();
    }

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {});
    return unsubscribe;
  }, []);

  const getFirebaseToken = () => {
    const isEnabled = notificationManager.requestUserPermission();

    if (isEnabled) {
      notificationManager
        .registerWithFCM()
        .then((deviceToken) => {
          AsyncStorage.setItem(Strings.DEVICE_TOKEN, deviceToken);
        })
        .catch((err) => {
          console.log('err>>>', err);
        });
    }
  };

  const permissionRequest = async () => {
    let systemVersion = DeviceInfo.getSystemVersion();
    if (systemVersion > 12) {
      check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              notificationPermission();
              break;
            case RESULTS.DENIED:
              notificationPermission();
              break;
            case RESULTS.LIMITED:
              notificationPermission();
              break;
            case RESULTS.GRANTED:
              console.log(Strings.GRANTED_PERMISSION);
              break;
            case RESULTS.BLOCKED:
              notificationPermission();
              break;
          }
        })
        .catch((error) => {
          // …
        });
    } else {
      getFirebaseToken();
    }
  };

  const notificationPermission = async () => {
    request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          openSettings().catch(() => console.warn(Strings.CANNOT_OPEN));
          console.log(Strings.UNIAVAILABLE_PERMISSION);
          break;
        case RESULTS.DENIED:
          openSettings().catch(() => console.warn(Strings.CANNOT_OPEN));
          console.log(Strings.DENIED_PERMISSION);
          break;
        case RESULTS.LIMITED:
          openSettings().catch(() => console.warn(Strings.CANNOT_OPEN));
          console.log(Strings.LIMITED_PERMISSION);
          break;
        case RESULTS.GRANTED:
          getFirebaseToken();
          console.log(Strings.GRANTED_PERMISSION);
          break;
        case RESULTS.BLOCKED:
          Toast.show(Strings.PERMISSION_NOTITIFCATION_MESSAGE);
          openSettings().catch(() => console.warn(Strings.CANNOT_OPEN));
          console.log(Strings.BLOCKED_PERMISSION);
          break;
      }
    });
  };

  return (
    <>
      <Provider store={store}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <Route />
      </Provider>
    </>
  );
};

export default withIAPContext(App);
