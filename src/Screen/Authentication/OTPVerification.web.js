/* eslint-disable react-native/no-inline-styles */
import {
  View,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  StyleSheet,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Wrapper,
  HeaderContainer,
  BackButton,
  LoginContainer,
  ScrollViewContainer,
  TextComponent,
  MessageVerificationText,
  LoginContainerParent,
} from './VerificationStyle';
import { RouteName } from '../../Navigation/routeName';
import { backIcon } from '../../Resources/assets';
import { isNative } from '../../Util';
import CustomButton from '../../Component/CustomButton';
import Colors from '../../Resources/Colors';
import Strings from '../../Resources/Strings';
import { CustomText } from '../../Component/CustomComponent';
import { setLoading, sendOtp, verifyOtp } from '../../Redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-simple-toasts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fontResize } from '../../Util/font';

const OTPVerification = ({ navigation, route }) => {
  const { height, width } = useWindowDimensions();
  const {
    phoneNumber,
    countryCode,
    token,
    isForgetPassword,
    isSocial,
    result,
  } = route.params;
  const inputs = React.useRef([]);
  const textInputs = [];
  const otp = [];
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  //   const [otp, setOtp] = useState([]);
  useEffect(() => {}, []);
  const onTextChange = (text, index) => {
    if (text.length === 2) {
      inputs.current[index + 1].focus();
    } else {
      otp[index] = text;
      if (text.length === 1 && index < textInputs.length - 1) {
        inputs.current[index + 1].focus();
      } else {
        inputs.current[textInputs.length - 1].blur();
      }
    }
  };
  const onInputFocus = (index) => {
    const prevIndex = index - 1;

    if (prevIndex > -1 && !otp[prevIndex] && !otp.join('')) {
      inputs.current[prevIndex].focus();
      return;
    }
  };

  const onKeyPress = (e, i) => {
    const val = otp[i] || '';
    console.log('onKeyPress', i, otp, val.length, e.nativeEvent.key);
    if (e.nativeEvent.key === 'Backspace' && i !== 0) {
      inputs.current[i - 1].focus();
    }
  };

  for (let i = 0; i < 4; i += 1) {
    textInputs.push(
      <TextInput
        ref={(e) => {
          inputs.current[i] = e;
          console.log('ref', i);
        }}
        style={{
          width: width > 700 ? width * 0.03 : width * 0.07,
          height: width > 700 ? width * 0.033 : width * 0.07,
          fontSize: fontResize(height * 0.018),
          textAlign: 'center',
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: 'white',
          outlineColor: `${Colors.Blueberry}`,
          color: Colors.Black,
        }}
        onKeyPress={(e) => onKeyPress(e, i)}
        autoFocus={i === 0}
        maxLength={1}
        onFocus={() => onInputFocus(i)}
        onChangeText={(text) => onTextChange(text, i)}
        keyboardType="phone-pad"
      />
    );
  }

  const onPressVerify = () => {
    try {
      dispatch(setLoading(true));
      const data = {
        token: token,
        data: {
          otp: otp.join(''),
        },
      };
      dispatch(
        verifyOtp({
          data,
          onSuccess: (res) => {
            if (res.code < 210) {
              console.log('result onPressVerify', res);
              dispatch(setLoading(false));
              navigation.navigate(
                isForgetPassword
                  ? RouteName.CHANGE_PASSWORD
                  : RouteName.CREATE_PROFILE,
                { isSocial: isSocial, result: result }
              );
              AsyncStorage.setItem(Strings.IS_VERIFICATION, 'true');
              AsyncStorage.setItem(
                Strings.CREATE_PROFILE_DATA,
                JSON.stringify(result)
              );
              textInputs = [];
              otp = [];
            } else {
              dispatch(setLoading(false));
            }
          },
          onError: (error) => {
            dispatch(setLoading(false));
            console.log('error onPressVerify', JSON.stringify(error));
          },
        })
      );
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  const onPressResend = () => {
    dispatch(setLoading(true));
    const data = {
      token: token,
      data: {
        country_code: countryCode.trim().toString(),
        phone_number: phoneNumber.trim().toString(),
      },
    };
    dispatch(
      sendOtp({
        data,
        onSuccess: (result) => {
          console.log('result sendotp', result);
          dispatch(setLoading(false));
        },
        onError: (error) => {
          dispatch(setLoading(false));
          console.log('error sendotp', JSON.stringify(error));
        },
      })
    );
  };

  return (
    <View style={styles.container}>
      <Wrapper>
        {/* Header */}
        {isNative && (
          <HeaderContainer>
            <TouchableOpacity
              style={[styles.button, { marginTop: 30, marginLeft: '10%' }]}
            >
              <BackButton resizeMode="contain" source={backIcon} />
            </TouchableOpacity>
          </HeaderContainer>
        )}
        <LoginContainerParent>
          <LoginContainer isNative={isNative} width={width} height={height}>
            <ScrollViewContainer bounces={false} isNative={isNative}>
              <TextComponent
                style={{ fontFamily: 'Gilroy-SemiBold' }}
                isNative={isNative}
                fontSize={fontResize(height * 0.03)}
              >
                Verify your phone
              </TextComponent>

              <MessageVerificationText
                style={{ marginTop: 5, marginBottom: 10 }}
                isNative={isNative}
                fontSize={fontResize(height * 0.019)}
              >
                {`Verification code sent to your phone +${countryCode} ${phoneNumber}`}
              </MessageVerificationText>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  //   width: '100%',
                  paddingTop: 16,
                }}
              >
                {textInputs}
              </View>

              <View>
                <CustomText
                  textColor={Colors.drakGray}
                  fontSize={fontResize(height * 0.018)}
                  marginTop={window.height * 1}
                  marginBottom={window.height * 0.02}
                  marginLeft={'0px'}
                  fontFamily={'Gilroy-Regular'}
                  style={{ marginTop: 50 }}
                  textAlign={'left'}
                >
                  {Strings.DID_NOT_RECIEVE_CODE}
                  <CustomText
                    onPress={() => {
                      //call API
                      onPressResend();
                    }}
                    fontSize={fontResize(height * 0.018)}
                    fontFamily={'Gilroy-SemiBold'}
                    textLine={'underline'}
                    textColor={Colors.Blueberry}
                  >
                    {Strings.RESEND_OTP}
                  </CustomText>
                </CustomText>

                <CustomButton
                  height={height * 0.07}
                  backgroundColor={Colors.Blueberry}
                  marginTop={height * 0.2}
                  borderRadius={'10px'}
                  fontSize={fontResize(height * 0.022)}
                  alignItems={'center'}
                  justifyContent={'center'}
                  //   fontFamily={'Gilroy-SemiBold'}
                  onPress={() => {
                    onPressVerify();
                  }}
                  textColor={Colors.White}
                  text={Strings.VERIFY}
                />
              </View>
            </ScrollViewContainer>
          </LoginContainer>
        </LoginContainerParent>
      </Wrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isNative ? '#fff' : null,
    justifyContent: 'center',
  },
  button: {
    // padding: 15,
  },
});

export default OTPVerification;
