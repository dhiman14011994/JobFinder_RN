import React, { Component, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import {
  headerSearch,
  headerLogo,
  notificationIcon,
  faqActive,
  faqNoActive,
  paymentActive,
  paymentNoActive,
  subcriptionActive,
  subscriptionNoActive,
  termActive,
  termNoAcitve,
  profileActive,
  profileNoActive,
  settingActive,
  settingNoActive,
  notificationActive,
  notificationNoActive,
  SubScriptions,
  Logout,
  BlockUser,
} from '../../Resources/assets';
import Colors from '../../Resources/Colors';
import { mxWidth, mxHeight } from '../../Util';
import Strings from '../../Resources/Strings';
import SettingRoute from '../../Navigation/SettingRoute';
import { RouteName } from '../../Navigation/routeName';
import { fontResize } from '../../Util/font';
import { logout } from '../../Redux/services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { reset, setToken, setUserData } from '../../Redux/actions/authAction';
import { setProfileData } from '../../Redux/actions/profileAction';
import MoreModal from '../../Component/Feed/more/index.web';
import LogoutModal from './LogoutModal.web';
import { WhiteBlockUser } from '../../Resources/assets';

// create a component
const NotificationHeader = ({ navigation }) => {
  const [hideModal, sethideModal] = useState(false);
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(Strings.PAYMENT);

  const logout = async () => {
    AsyncStorage.removeItem(Strings.ACCESS_TOKEN_KEY);
    AsyncStorage.removeItem(Strings.LOGIN_DATA);
    dispatch(setToken(''));
    dispatch(setUserData(''));
    dispatch(setProfileData([]));
    dispatch(reset([]));
    navigation.reset({
      index: 0,
      routes: [{ name: RouteName.AUTH }],
    });
  };
  return (
    <>
      <View
        style={{
          marginTop: height * 0.01,
          flexDirection: 'row',
          alignContent: 'center',
          backgroundColor: 'white',
          justifyContent: 'space-between',
          width: width,
        }}
      >
        <TouchableOpacity
          style={{
            width: width * 0.1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
          }}
          onPress={() => {
            setActiveTab(Strings.PAYMENT);
            navigation.navigate(Strings.PAYMENT);
          }}
        >
          <View
            style={{
              borderRadius: height * 0.02,
              backgroundColor:
                activeTab == Strings.PAYMENT
                  ? Colors.Blueberry
                  : Colors.PrimaryLightGray,
              padding: height * 0.01,
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: height * 0.018, width: height * 0.018 }}
              source={
                activeTab == Strings.PAYMENT ? paymentActive : paymentNoActive
              }
            />
          </View>

          <Text
            style={[
              {
                marginHorizontal: width * 0.005,
                fontSize: fontResize(width * 0.01),
                color:
                  activeTab == Strings.PAYMENT
                    ? Colors.Blueberry
                    : Colors.PrimaryGray,
              },
            ]}
          >
            {Strings.PAYMENT}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setActiveTab(Strings.NOTIFICATIONS);
            navigation.navigate(Strings.NOTIFICATION);
          }}
          style={{
            width: width * 0.1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              borderRadius: height * 0.02,
              backgroundColor:
                activeTab == Strings.NOTIFICATIONS
                  ? Colors.Blueberry
                  : Colors.PrimaryLightGray,
              padding: height * 0.01,
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: height * 0.018, width: height * 0.018 }}
              source={
                activeTab == Strings.NOTIFICATIONS
                  ? notificationActive
                  : notificationNoActive
              }
            />
          </View>

          <Text
            style={[
              {
                marginHorizontal: width * 0.005,
                fontSize: fontResize(width * 0.01),
                color:
                  activeTab == Strings.NOTIFICATIONS
                    ? Colors.Blueberry
                    : Colors.PrimaryGray,
              },
            ]}
          >
            {Strings.NOTIFICATIONS}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: width * 0.1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
          }}
          onPress={() => {
            setActiveTab(Strings.FAQ);
            navigation.navigate(RouteName.FAQ);
          }}
        >
          <View
            style={{
              borderRadius: height * 0.02,
              backgroundColor:
                activeTab == Strings.FAQ
                  ? Colors.Blueberry
                  : Colors.PrimaryLightGray,
              padding: height * 0.01,
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: height * 0.018, width: height * 0.018 }}
              source={activeTab == Strings.FAQ ? faqActive : faqNoActive}
            />
          </View>
          <Text
            style={[
              {
                marginHorizontal: width * 0.005,
                fontSize: fontResize(width * 0.01),
                color:
                  activeTab == Strings.FAQ
                    ? Colors.Blueberry
                    : Colors.PrimaryGray,
              },
            ]}
          >
            {Strings.FAQ}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: width * 0.1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
          }}
          onPress={() => {
            setActiveTab(Strings.SUPPORT);
            navigation.navigate(RouteName.SUPPORT);
          }}
        >
          <View
            style={{
              borderRadius: height * 0.02,
              backgroundColor:
                activeTab == Strings.SUPPORT
                  ? Colors.Blueberry
                  : Colors.PrimaryLightGray,
              padding: height * 0.01,
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: height * 0.018, width: height * 0.018 }}
              source={
                activeTab == Strings.SUPPORT ? profileActive : profileNoActive
              }
            />
          </View>

          <Text
            style={[
              {
                marginHorizontal: width * 0.005,
                fontSize: fontResize(width * 0.01),
                color:
                  activeTab == Strings.SUPPORT
                    ? Colors.Blueberry
                    : Colors.PrimaryGray,
              },
            ]}
          >
            {Strings.SUPPORT}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: width * 0.1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
          }}
          onPress={() => {
            setActiveTab(Strings.TERMS_CONDITION);
            navigation.navigate(RouteName.TERMS_CONDITION);
          }}
        >
          <View
            style={{
              borderRadius: height * 0.02,
              backgroundColor:
                activeTab == Strings.TERMS_CONDITION
                  ? Colors.Blueberry
                  : Colors.PrimaryLightGray,
              padding: height * 0.01,
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: height * 0.018, width: height * 0.018 }}
              source={
                activeTab == Strings.TERMS_CONDITION ? termActive : termNoAcitve
              }
            />
          </View>

          <Text
            style={[
              {
                marginHorizontal: width * 0.005,
                fontSize: fontResize(width * 0.01),
                color:
                  activeTab == Strings.TERMS_CONDITION
                    ? Colors.Blueberry
                    : Colors.PrimaryGray,
              },
            ]}
          >
            {Strings.TERMS_CONDITION}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: width * 0.1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
          }}
          onPress={() => {
            setActiveTab(Strings.PRIVACY_POLICY);
            navigation.navigate(RouteName.PRIVACY_POLICY);
          }}
        >
          <View
            style={{
              borderRadius: height * 0.02,
              backgroundColor:
                activeTab == Strings.PRIVACY_POLICY
                  ? Colors.Blueberry
                  : Colors.PrimaryLightGray,
              padding: height * 0.01,
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: height * 0.018, width: height * 0.018 }}
              source={
                activeTab == Strings.PRIVACY_POLICY ? termActive : termNoAcitve
              }
            />
          </View>

          <Text
            style={[
              {
                marginHorizontal: width * 0.005,
                fontSize: fontResize(width * 0.01),
                color:
                  activeTab == Strings.PRIVACY_POLICY
                    ? Colors.Blueberry
                    : Colors.PrimaryGray,
              },
            ]}
          >
            {Strings.PRIVACY_POLICY}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: width * 0.1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
          }}
          onPress={() => {
            setActiveTab(Strings.SUBSCRIPTIONS_HEADER);
            navigation.navigate(RouteName.SUBSCRIPTIONS);
          }}
        >
          <View
            style={{
              borderRadius: height * 0.02,
              backgroundColor:
                activeTab == Strings.SUBSCRIPTIONS_HEADER
                  ? Colors.Blueberry
                  : Colors.PrimaryLightGray,
              padding: height * 0.01,
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: height * 0.018, width: height * 0.018 }}
              source={
                activeTab == Strings.SUBSCRIPTIONS_HEADER
                  ? subcriptionActive
                  : subscriptionNoActive
              }
            />
          </View>

          <Text
            style={[
              {
                marginHorizontal: width * 0.005,
                fontSize: fontResize(width * 0.01),
                color:
                  activeTab == Strings.SUBSCRIPTIONS_HEADER
                    ? Colors.Blueberry
                    : Colors.PrimaryGray,
              },
            ]}
          >
            {Strings.SUBSCRIPTIONS_HEADER}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: width * 0.1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
          }}
          onPress={() => {
            setActiveTab(Strings.PRIVACY_SETTING);
            navigation.navigate(RouteName.PRIVACY_SETTINGS);
          }}
        >
          <View
            style={{
              borderRadius: height * 0.02,
              backgroundColor:
                activeTab == Strings.PRIVACY_SETTING
                  ? Colors.Blueberry
                  : Colors.PrimaryLightGray,
              padding: height * 0.01,
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: height * 0.018, width: height * 0.018 }}
              source={
                activeTab == Strings.PRIVACY_SETTING
                  ? settingActive
                  : settingNoActive
              }
            />
          </View>

          <Text
            style={[
              {
                marginHorizontal: width * 0.005,
                fontSize: fontResize(width * 0.01),
                color:
                  activeTab == Strings.PRIVACY_SETTING
                    ? Colors.Blueberry
                    : Colors.PrimaryGray,
              },
            ]}
          >
            {Strings.PRIVACY_SETTING}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: width * 0.1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
          }}
          onPress={() => {
            setActiveTab(Strings.BLOCKED_USER);
            navigation.navigate(RouteName.BLOCK_USER_DATA);
          }}
        >
          <View
            style={{
              borderRadius: height * 0.02,
              backgroundColor:
                activeTab == Strings.BLOCKED_USER
                  ? Colors.Blueberry
                  : Colors.PrimaryLightGray,
              padding: height * 0.01,
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: height * 0.018, width: height * 0.018 }}
              source={
                activeTab == Strings.BLOCKED_USER ? WhiteBlockUser : BlockUser
              }
            />
          </View>

          <Text
            style={[
              {
                marginHorizontal: width * 0.005,
                fontSize: fontResize(width * 0.01),
                color:
                  activeTab == Strings.BLOCKED_USER
                    ? Colors.Blueberry
                    : Colors.PrimaryGray,
              },
            ]}
          >
            {Strings.BLOCKED_USER}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: width * 0.1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
          }}
          onPress={() => {
            sethideModal(!hideModal);
            // logout();
          }}
        >
          <View
            style={{
              borderRadius: height * 0.02,
              backgroundColor:
                activeTab == Strings.LOGOUT
                  ? Colors.Blueberry
                  : Colors.PrimaryLightGray,
              padding: height * 0.01,
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: height * 0.018, width: height * 0.018 }}
              source={Logout}
            />
          </View>

          <Text
            style={[
              {
                marginHorizontal: width * 0.005,
                fontSize: fontResize(width * 0.01),
                color: '#EA4335',
              },
            ]}
          >
            {Strings.LOGOUT}
          </Text>
        </TouchableOpacity>
      </View>
      <SettingRoute />
      <LogoutModal
        showDeleteModal={hideModal}
        setDeleteModal={sethideModal}
        onHideCallback={() => {
          logout();
        }}
        data={Strings.LOGOUT_ALERT}
      />
      ;
    </>
  );
};

// define your styles

//make this component available to the app
export default NotificationHeader;
