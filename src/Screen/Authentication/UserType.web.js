import { View, Text, SafeAreaView, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import Recruiter from '../../Resources/assets/Recruiter.png';
import Professionals from '../../Resources/assets/Professionals.png';
import Organization from '../../Resources/assets/Organization.png';
import CustomUserType from '../../Component/CustomUserType';
import { style } from './UserTypeStyle';
import Strings from '../../Resources/Strings';
import Colors from '../../Resources/Colors';
import { isNative } from '../../Util';
import { initializeApp } from 'firebase/app';
import { gapi } from 'gapi-script';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RouteName } from '../../Navigation/routeName';
import { useDispatch } from 'react-redux';
import { setUserType } from '../../Redux/actions/authAction';

const { width, height } = Dimensions.get('window');
const UserType = ({ navigation }) => {
  const dispatch = useDispatch();
  const [id, setId] = useState(5);
  const selectType = (data) => {
    setId(data);
    dispatch(
      setUserType(
        data == 1
          ? Strings.PROFESSIONAL
          : data == 2
          ? Strings.RECRUITER
          : Strings.ORGANIZATION
      )
    );
    navigation.navigate(RouteName.LOGIN);
  };

  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyAK9HAAyPUmlv0jHC74MzuulLlQiDoI_G8',
      authDomain: 'axesseq-cc197.firebaseapp.com',
      projectId: 'axesseq-cc197',
      storageBucket: 'axesseq-cc197.appspot.com',
      messagingSenderId: '764328256526',
      appId: '1:764328256526:web:8e56b47464d24d7c12c85f',
      measurementId: 'G-RH6WR3DRD9',
    };
    initializeApp(firebaseConfig);
    // function start() {
    //   gapi.client.init({
    //     clientId:
    //       '764328256526-rbl75562nkq0hcao62o6q66mmj1vq8j5.apps.googleusercontent.com',
    //     scope: 'email',
    //   });
    // }
    // gapi.load('client:auth2', start);
  }, []);
  return (
    <View
      style={{
        height: height,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5E5E5',
      }}
    >
      <SafeAreaView
        style={{
          width: width > 500 ? width * 0.25 : width * 0.8,
          backgroundColor: '#fff',
          marginHorizontal: isNative ? '10%' : '0%',
          paddingHorizontal: isNative ? '0%' : '2%',
          borderRadius: isNative ? 0 : 20,
          paddingVertical: isNative ? 0 : 60,
        }}
      >
        <Text style={style.selectText}>{Strings.SELECT_USER_TYPE}</Text>
        <CustomUserType
          onPress={() => {
            selectType(1);
          }}
          buttonContainer={[
            style.buttonContainer,
            {
              borderColor: id == 1 ? Colors.Blueberry : Colors.lightGray,
              marginTop: isNative ? hp('15%') : height * 0.05,
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
              marginBottom: height * 0.01,
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
      </SafeAreaView>
    </View>
  );
};

export default UserType;
