import {
  View,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../Component/Header/Header';
import { backIcon } from '../../../Resources/assets';
import Strings from '../../../Resources/Strings';
import Colors from '../../../Resources/Colors';
import { fontResize } from '../../../Util/font';
import { useSelector } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { theme } from '../../../Util/constant';
import BusinessProfile from '../BusinessProfile';
import MyProfile from '../MyProfile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteName } from '../../../Navigation/routeName';
import { useDispatch } from 'react-redux';
import RecruiterProfile from '../RecruiterProfile';
import {
  fetchRecruiterMyProfile,
  setProfileData,
} from '../../../Redux/actions/profileAction';
import {
  reset,
  setLoading,
  setToken,
  setUserData,
} from '../../../Redux/actions/authAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CustomText } from '../../../Component/CustomComponent';
import { GoogleLogout } from 'react-google-login';
import CustomHeader from '../../../Component/CustomHeader';

const Tab = createMaterialTopTabNavigator();
const EditProfileStack = createNativeStackNavigator();
const RecruiterProfileTab = ({ navigation }) => {
  const window = useWindowDimensions();
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const selectUser = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;
  const token = useSelector((state) => state.auth.token);

  const StackProfile = () => {
    return (
      <EditProfileStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <EditProfileStack.Screen
          name={RouteName.RECUITER_PROFILE}
          component={RecruiterProfile}
        />
        <EditProfileStack.Screen
          name={RouteName.RECUITER_COMPANY}
          component={BusinessProfile}
        />
      </EditProfileStack.Navigator>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.White }}>
      <CustomHeader
        constainerStyle={{ paddingHorizontal: 12 }}
        leftButtons={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              resizeMode="contain"
              style={{ height: 26, width: 26 }}
              source={backIcon}
            />
          </TouchableOpacity>
        }
        rightButtons={<></>}
        title={Strings.PROFILE}
      />

      <View style={{ height: window.height * 0.888 }}>
        <Tab.Navigator
          initialRouteName="Job"
          tabBarOptions={{
            labelStyle: { textTransform: 'lowercase' },
          }}
          screenOptions={{
            tabBarInactiveTintColor: Colors.DimGray,
            tabBarActiveTintColor: Colors.Blueberry,
            tabBarLabelStyle: {
              fontSize: 16,
              ...theme.fontMedium,
              textTransform: 'none',
            },
            tabBarIndicatorStyle: {
              height: 4,
              backgroundColor: Colors.Blueberry,
            },
            tabBarStyle: { height: 60 },
          }}
        >
          <Tab.Screen
            name="Business Profile"
            component={BusinessProfile}
            options={{
              tabBarLabel:
                selectUser === Strings.ORGANIZATION
                  ? 'Business Profile'
                  : 'Recruiter Company',
            }}
          />
          <Tab.Screen
            name="My Profile"
            component={MyProfile}
            options={{ tabBarLabel: 'My Profile' }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};
export default RecruiterProfileTab;
