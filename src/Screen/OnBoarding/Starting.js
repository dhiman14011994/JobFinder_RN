/* eslint-disable react-hooks/exhaustive-deps */
import { Image, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Start from '../../Resources/assets/Logo.png';
import StartWeb from '../../Resources/assets/StartWeb.png';
import { isNative, mxWidth } from '../../Util';
import { RouteName } from '../../Navigation/routeName';
import Strings from '../../Resources/Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUserData } from '../../Redux/actions/authAction';
import { updateUserStatus } from '../../Constants/FireStoremanager/FireStoremanager';

const Starting = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(async () => {
    const token = await AsyncStorage.getItem(Strings.ACCESS_TOKEN_KEY);
    const userData = await AsyncStorage.getItem(Strings.LOGIN_DATA);
    const isCreate = await AsyncStorage.getItem(Strings.IS_CREATE_PROFILE);
    const isVerification = await AsyncStorage.getItem(Strings.IS_VERIFICATION);
    if (token != undefined && token != null) {
      dispatch(setToken(token));
      dispatch(setUserData(JSON.parse(userData)));
      let userInfo = JSON.parse(userData);
      setTimeout(() => {
        if (userInfo !== undefined || userInfo !== null) {
          if (isNative) {
            let updateStatus = updateUserStatus({
              id: userInfo.data._id,
              status: 'online',
            });
          }
        }
        navigation.reset({
          index: 0,
          routes: [
            {
              name:
                isCreate == null && isVerification == null
                  ? RouteName.ONBOARDING
                  : isCreate == 'true' && isVerification == 'true'
                  ? RouteName.HOMESTACK
                  : isVerification == 'false'
                  ? RouteName.ONBOARDING
                  : isCreate == 'false'
                  ? RouteName.CREATE_PROFILE
                  : RouteName.HOMESTACK,
            },
          ],
        });
      }, 3000);
    } else {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: RouteName.ONBOARDING }],
        });
      }, 3000);
    }
  }, []);

  if (isNative) {
    return (
      <View
        style={{
          width: mxWidth,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#4D74F9',
        }}
      >
        <Image
          source={isNative ? Start : StartWeb}
          style={{ width: mxWidth * 0.8, height: 100 }}
          resizeMode="contain"
        />
      </View>
    );
  } else {
    return (
      <>
        <Image source={StartWeb} style={{ width: mxWidth, height: '100%' }} />
      </>
    );
  }
};

export default Starting;
