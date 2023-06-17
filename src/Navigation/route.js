import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  useWindowDimensions,
  Modal,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import { RouteName } from './routeName';
import OurGoal from '../Screen/OnBoarding/OurGoal';
import Login from '../Screen/Authentication/Login';
import Starting from '../Screen/OnBoarding/Starting';
import Splash from '../Screen/OnBoarding/Splash';
import UserType from '../Screen/Authentication/UserType';
import Verification from '../Screen/Authentication/Verification';
import Signup from '../Screen/Authentication/Signup';
import { useDispatch, useSelector } from 'react-redux';

import Home from '../Screen/Home';
import CreateProfile from '../Screen/CreateProfile';
import CreateStory from '../Screen/CreateStory';
import CreateJobPost from '../Screen/CreateJobPost';
import CreateEventPost from '../Screen/CreateEventPost';
import JobSummary from '../Screen/JobSummary';
import EventSummary from '../Screen/EventSummary';
import ViewStories from '../Screen/ViewStories';
import JobDetail from '../Screen/JobDetail';
import { isNative } from '../Util';

import Colors from '../Resources/Colors';

import OTPVerification from '../Screen/Authentication/OTPVerification';
import ForgetPassword from '../Screen/Authentication/ForgetPassword';
import ChangePassword from '../Screen/Authentication/ChangePassword';
import MobileBottomTabBar from './mobileBottomTabBar';
import MyBooking from '../Screen/MyBooking';
import MyRecrutingDates from '../Screen/MyRecrutingDates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinkedInPage from '../Screen/Authentication/linkedIn';
import MyExpereince from '../Screen/Profile/MyExpereince';
import PrivacyPolicy from '../Screen/PrivacyPolicy';
import TermsCondition from '../Screen/TermsCondition';
import CreateJob from '../Screen/CreateJob/index.web';
import CreatePromotionPost from '../Screen/CreatePromotionPost';
import PromotionSummary from '../Screen/PromotionSummary';
import NetInfo from '@react-native-community/netinfo';
import CheckInternet from '../Screen/NoNetwork';
import AppTutorial from '../Screen/AppTutorial';
import DeleteUser from '../Screen/DeleteUser';
import OurMission from '../Screen/OurMission';

import GoldAxessFullAccess from '../Component/GoldAxessFullAccess';
import Strings from '../Resources/Strings';
import {
  addAppVersionAction,
  fetchAppVersionAction,
} from '../Redux/actions/homeAction';
import DeviceInfo from 'react-native-device-info';
import UpgradeApp from '../Component/UpgradeApp';

const Stack = createNativeStackNavigator();
const OnBoardingStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

const Authentication = () => {
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      console.log('InternetConnection', state.isConnected);
    });

    return () => {
      // Unsubscribe
      unsubscribe();
    };
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={RouteName.INTERNET_CONNECTION}
    >
      {!isConnected ? (
        <Stack.Screen
          name={RouteName.INTERNET_CONNECTION}
          component={CheckInternet}
        />
      ) : (
        <>
          <Stack.Screen name={RouteName.STARTING} component={Starting} />
          <Stack.Screen
            name={RouteName.CREATE_PROFILE}
            component={CreateProfile}
          />
          <Stack.Screen name={RouteName.ONBOARDING} component={BoardingStack} />
          <Stack.Screen name={RouteName.AUTH} component={LoginStack} />
          <Stack.Screen
            name={RouteName.HOMESTACK}
            component={HomeScreenStack}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const BoardingStack = () => {
  return (
    <OnBoardingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <OnBoardingStack.Screen name={RouteName.SPLASH} component={Splash} />
      <OnBoardingStack.Screen name={RouteName.OURGOAL} component={OurGoal} />
      <OnBoardingStack.Screen name={RouteName.AUTH} component={LoginStack} />
    </OnBoardingStack.Navigator>
  );
};

const HomeScreenStack = () => {
  const window = useWindowDimensions();
  return (
    <HomeStack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerShown: false,
        headerTitleStyle: {},
        headerStyle: {
          backgroundColor: '#ffffff',
          height: window.height * 0.15,
          borderBottomWidth: 5,
        },
        headerTitle: '',
      })}
    >
      <HomeStack.Screen
        name={RouteName.HOME}
        component={isNative ? MobileBottomTabBar : Home}
      />
      <HomeStack.Screen name={RouteName.CREATE_STORY} component={CreateStory} />
      <HomeStack.Screen name={RouteName.VIEW_STORIES} component={ViewStories} />
      <HomeStack.Screen
        name={RouteName.CREATE_PROFILE}
        component={CreateProfile}
      />
      <HomeStack.Screen
        name={RouteName.CREATE_JOB_POST}
        component={CreateJobPost}
      />
      <HomeStack.Screen name={RouteName.CREATE_JOB} component={CreateJob} />
      <HomeStack.Screen
        name={RouteName.CREATE_EVENT_POST}
        component={CreateEventPost}
      />
      <HomeStack.Screen
        name={RouteName.CREATE_PROMOTIONS}
        component={CreatePromotionPost}
      />
      <HomeStack.Screen name={RouteName.JOB_SUMMARY} component={JobSummary} />

      <HomeStack.Screen
        name={RouteName.PROMOTION_SUMMARY}
        component={PromotionSummary}
      />
      <HomeStack.Screen
        name={RouteName.EVENT_SUMMARY}
        component={EventSummary}
      />
      <HomeStack.Screen name={RouteName.JOB_DETAIL} component={JobDetail} />

      <HomeStack.Screen name={RouteName.MY_BOOKING} component={MyBooking} />
      <HomeStack.Screen
        name={RouteName.MY_RECRUTING_DATES}
        component={MyRecrutingDates}
      />
      <HomeStack.Screen
        name={RouteName.MY_EXPEREINCE}
        component={MyExpereince}
      />
      <HomeStack.Screen name={RouteName.DELETE_USER} component={DeleteUser} />
      <HomeStack.Screen name={RouteName.OUR_MISSION} component={OurMission} />
    </HomeStack.Navigator>
  );
};
const LoginStack = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={RouteName.USERTYPE}
    >
      <AuthStack.Screen name={RouteName.USERTYPE} component={UserType} />
      <AuthStack.Screen name={RouteName.LOGIN} component={Login} />
      <AuthStack.Screen name={RouteName.SIGNUP} component={Signup} />
      <AuthStack.Screen name={RouteName.APP_TUTORIAL} component={AppTutorial} />
      <AuthStack.Screen
        name={RouteName.PRIVACY_POLICY}
        component={PrivacyPolicy}
      />
      <AuthStack.Screen
        name={RouteName.TERMS_CONDITION}
        component={TermsCondition}
      />
      <AuthStack.Screen
        name={RouteName.FORGET_PASSWORD}
        component={ForgetPassword}
      />
      <AuthStack.Screen
        name={RouteName.CHANGE_PASSWORD}
        component={ChangePassword}
      />
      <AuthStack.Screen
        name={RouteName.VERIFICATION}
        component={Verification}
      />
      <AuthStack.Screen
        name={RouteName.OTPVERIFICATION}
        component={OTPVerification}
      />
      <AuthStack.Screen
        name={RouteName.CREATE_PROFILE}
        component={CreateProfile}
      />
      <AuthStack.Screen
        name={RouteName.LinkedInPage}
        component={LinkedInPage}
      />
    </AuthStack.Navigator>
  );
};

const linking = {
  prefixes: ['http://localhost:3000/'],
  config: {
    screens: {
      starting: 'starting', //URL `/feed` will open screen named `Chat`.
      OnBoarding: {
        initialRouteName: 'onBoarding',
        screens: {
          ourGoal: '/our-goal',
          AUTH: {
            initialRouteName: 'auth',
            screens: {
              usertype: '/choose-role',
              login: '/login',
              Signup: '/sign-up',
              linkedin_page: '/linkedIn',
            },
          },
        },
      },
    },
  },
};

const Route = () => {
  const dispatch = useDispatch();
  const [isForceUpdate, setIsForceUpdate] = useState(false);
  useEffect(() => {
    const appVersion = DeviceInfo.getVersion();

    fetchAppVersion(appVersion);
  }, []);
  // get app version list
  const fetchAppVersion = (appVersion) => {
    dispatch(
      fetchAppVersionAction({
        onSuccess: (result) => {
          if (result?.data) {
            const { version, force_update } = result?.data;
            const serverVersionString = version.replace(/\./g, '');
            const serverVersion = parseFloat(serverVersionString);
            const currentVersionString = appVersion.replace(/\./g, '');
            const currentVersion = parseFloat(currentVersionString);
            if (currentVersion < serverVersion) {
              if (force_update) {
                AsyncStorage.setItem(Strings.SHOW_BIG_BANNER, 'false');
              }
              setIsForceUpdate(force_update);
            }
          }
        },
        onError: (error) => {},
      })
    );
  };

  const isLoading = useSelector((state) => state.auth.isLoading);

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Authentication />
      {isLoading && (
        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={isLoading}
        >
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <ActivityIndicator size="large" color={Colors.Blueberry} />
          </View>
        </Modal>
      )}
      {isForceUpdate && (
        <Modal
          animated={true}
          animationType={'fade'}
          transparent={true}
          visible={isForceUpdate}
        >
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <UpgradeApp />
          </View>
        </Modal>
      )}
    </NavigationContainer>
  );
};

export default Route;
