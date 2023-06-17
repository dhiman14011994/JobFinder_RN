import { View, Text, Platform, SafeAreaView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import Recruiter from '../../Resources/assets/Recruiter.png';
import Professionals from '../../Resources/assets/Professionals.png';
import Organization from '../../Resources/assets/Organization.png';
import CustomUserType from '../../Component/CustomUserType';
import { style } from './UserTypeStyle';
import Strings from '../../Resources/Strings';
import Colors from '../../Resources/Colors';
import { isNative } from '../../Util';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RouteName } from '../../Navigation/routeName';
import { useDispatch } from 'react-redux';
import { setUserType } from '../../Redux/actions/authAction';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import NotificationManager from '../../Util/notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

const UserType = ({ navigation }) => {
  const dispatch = useDispatch();
  const [id, setId] = useState(5);
  const selectType = (data) => {
    setId(data);
    navigation.navigate(RouteName.LOGIN, {
      userType:
        data === 1
          ? Strings.PROFESSIONAL
          : data === 2
          ? Strings.RECRUITER
          : Strings.ORGANIZATION,
    });
    dispatch(
      setUserType(
        data === 1
          ? Strings.PROFESSIONAL
          : data === 2
          ? Strings.RECRUITER
          : Strings.ORGANIZATION
      )
    );
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.readonly',
      ],
      webClientId:
        '764328256526-rbl75562nkq0hcao62o6q66mmj1vq8j5.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  useEffect(() => {
    const notificationManager = new NotificationManager();
    const isEnabled = notificationManager.requestUserPermission();
    if (isEnabled) {
      notificationManager
        .registerWithFCM()
        .then((deviceToken) => {
          console.log('deviceToken>>>', deviceToken);
          AsyncStorage.setItem(Strings.DEVICE_TOKEN, deviceToken);
        })
        .catch((err) => {
          console.log('err>>>', err);
        });
    }
  }, []);

  const sigupButton = () => {
    navigation.navigate(RouteName.SIGNUP, {
      role:
        id == 3
          ? Strings.ORGANIZATION
          : id == 2
          ? Strings.RECRUITER
          : Strings.PROFESSIONAL,
    });
    dispatch(
      setUserType(
        id == 3
          ? Strings.ORGANIZATION
          : id == 2
          ? Strings.RECRUITER
          : Strings.PROFESSIONAL
      )
    );
  };

  return (
    <SafeAreaView style={style.scrollView}>
      <View style={isNative ? style.subconstainer : style.webContainer}>
        <Text style={style.selectText}>{Strings.SELECT_USER_TYPE}</Text>
        <CustomUserType
          onPress={() => {
            selectType(1);
          }}
          buttonContainer={[
            style.buttonContainer,
            {
              borderColor: id == 1 ? Colors.Blueberry : Colors.lightGray,
              marginTop: isNative ? hp('15%') : 20,
            },
          ]}
          text={Strings.PROFESSIONALS}
          textStyle={[
            style.buttonTextStyle,
            { color: id == 1 ? Colors.Blueberry : Colors.lightGray },
          ]}
          image={Professionals}
          imageStyle={style.imageStyle}
        />
        <CustomUserType
          onPress={() => selectType(2)}
          buttonContainer={[
            style.buttonContainer,
            { borderColor: id == 2 ? Colors.Blueberry : Colors.lightGray },
          ]}
          text={Strings.RECRUITER}
          textStyle={[
            style.buttonTextStyle,
            { color: id == 2 ? Colors.Blueberry : Colors.lightGray },
          ]}
          image={Recruiter}
          imageStyle={style.imageStyle}
        />
        <CustomUserType
          onPress={() => selectType(3)}
          buttonContainer={[
            style.buttonContainer,
            {
              borderColor: id == 3 ? Colors.Blueberry : Colors.lightGray,
              marginBottom: 50,
            },
          ]}
          text={Strings.ORGANIZATION}
          textStyle={[
            style.buttonTextStyle,
            { color: id == 3 ? Colors.Blueberry : Colors.lightGray },
          ]}
          image={Organization}
          imageStyle={style.imageStyle}
        />
      </View>
      {isNative && (
        <Text style={style.donotTx}>
          {Strings.DO_NOT}
          <Text
            onPress={() => {
              sigupButton();
            }}
            style={style.signupTx}
          >
            {Strings.SIGNUP}
          </Text>
        </Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E5E5',
  },
  subconstainer: {
    flex: 1,
  },
  scrollView: {
    width: Platform.OS !== 'web' ? '100%' : '40%',
    backgroundColor: '#fff',
    paddingHorizontal: '10%',
    borderRadius: Platform.OS !== 'web' ? 0 : 20,
    paddingVertical: Platform.OS !== 'web' ? 0 : 100,
  },
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: '#fff',
  },
  link: {
    color: '#1B95E0',
  },
  button: {
    borderRadius: 3,
    padding: 20,
    marginVertical: 10,
    marginTop: 10,
    backgroundColor: '#1B95E0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default UserType;
