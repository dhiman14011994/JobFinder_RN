import {
  View,
  TouchableOpacity,
  Text,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
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
import {
  signUp,
  setLoading,
  sendOtp,
  setToken,
} from '../../Redux/actions/authAction';
import { backIcon } from '../../Resources/assets';
import { isNative } from '../../Util';
// import { TouchableOpacity } from 'react-native-web';
import CountryPickerView from '../../Component/CountryPicker';
import CustomButton from '../../Component/CustomButton';
import Colors from '../../Resources/Colors';
import Strings from '../../Resources/Strings';
import { RouteName } from '../../Navigation/routeName';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import { fontResize } from '../../Util/font';
import { theme } from '../../Util/constant';

const Verification = ({ navigation, route }) => {
  const { height, width } = useWindowDimensions();
  const { name, email, password, role, isSocial, result } = route.params;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberErr, setPhoneNumberErr] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const dispatch = useDispatch();
  const { userType } = useSelector((state) => state.auth);

  const onValidation = () => {
    var isValid = true;
    if (phoneNumber == '') {
      isValid = false;
      setPhoneNumberErr(Strings.EMPTY_PHONE_NUMBER);
      dispatch(setLoading(false));
    } else if (phoneNumber.length > 8 == false) {
      isValid = false;
      setPhoneNumberErr(Strings.INVALID_PHONE_NUMBER);
      dispatch(setLoading(false));
    }
    return isValid;
  };

  const onPressContinue = () => {
    if (!onValidation()) {
      return;
    }

    AsyncStorage.getItem(Strings.DEVICE_TOKEN).then((deviceToken) => {
      const form = isSocial
        ? {
            name: name,
            email: email.trim().toLowerCase(),
            role: userType,
            phone_number: phoneNumber,
            country_code: countryCode,
            from_social: true,
            is_create: false,
            uid: result?.data?.uid,
            provider: result?.data?.provider,
            device_token: deviceToken,
          }
        : {
            name: name,
            email: email.trim().toLowerCase(),
            password: password,
            role: userType,
            phone_number: phoneNumber,
            country_code: countryCode,
            from_social: false,
            is_create: false,
            device_token: deviceToken,
          };

      dispatch(setLoading(true));
      dispatch(
        signUp({
          form,
          onSuccess: (res) => {
            if (res.code < 210) {
              dispatch(setLoading(false));
              AsyncStorage.setItem(Strings.ACCESS_TOKEN_KEY, res.access_token);
              AsyncStorage.setItem(Strings.LOGIN_DATA, JSON.stringify(res));
              AsyncStorage.setItem(Strings.IS_CREATE_PROFILE, 'false');
              AsyncStorage.setItem(Strings.IS_VERIFICATION, 'false');
              AsyncStorage.setItem(Strings.IS_SOCIAL, isSocial.toString());

              let token = res?.access_token;
              dispatch(setToken(token));
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
                  onSuccess: (res) => {
                    if (res.code < 210) {
                      dispatch(setLoading(false));
                      navigation.navigate(RouteName.OTPVERIFICATION, {
                        token: token,
                        phoneNumber: phoneNumber,
                        countryCode: countryCode,
                        isForgetPassword: false,
                        isSocial: isSocial,
                        result: result,
                      });
                    } else {
                      dispatch(setLoading(false));
                    }
                  },
                  onError: (error) => {
                    dispatch(setLoading(false));
                    console.log('error sendotp', JSON.stringify(error));

                    Toast.show('Otp Something went wrong.');
                  },
                })
              );
            } else {
              dispatch(setLoading(false));
              Toast.show((res && res?.message) || 'Something went wrong');
            }
          },
          onError: (error) => {
            dispatch(setLoading(false));
            console.log('error sign up', JSON.stringify(error.email[0]));
            Toast.show(
              error?.email
                ? error?.email[0] || 'Something went wrong.'
                : 'Something went wrong.'
            );
          },
        })
      );
    });
  };

  return (
    <View style={styles.container}>
      <Wrapper>
        {/* Header */}
        {isNative && (
          <HeaderContainer marginTop={width * 0.1}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: '10%' }}
            >
              <BackButton resizeMode="contain" source={backIcon} />
            </TouchableOpacity>
          </HeaderContainer>
        )}
        <LoginContainerParent>
          <LoginContainer isNative={isNative} width={width} height={height}>
            <ScrollViewContainer bounces={false} isNative={isNative}>
              <TextComponent
                isNative={isNative}
                fontSize={fontResize(30)}
                style={{ ...theme.fontBold }}
              >
                Continue With Phone
              </TextComponent>
              <MessageVerificationText isNative={isNative}>
                You’ll receive 4 digit code to verify next.
              </MessageVerificationText>
              <CountryPickerView
                onPhoneNumberChange={({ text, countryCode }) => {
                  setPhoneNumber(text);
                  setCountryCode(countryCode);
                  if (phoneNumberErr) {
                    if (text == '') {
                      setPhoneNumberErr(Strings.EMPTY_PHONE_NUMBER);
                    } else if (text.length > 8 == false) {
                      setPhoneNumberErr(Strings.INVALID_PHONE_NUMBER);
                    } else {
                      setPhoneNumberErr('');
                    }
                  }
                }}
                errMsg={phoneNumberErr}
              />
              <Text style={{color: Colors.ORANGE, textDecorationLine: 'underline', fontSize: fontResize(height * 0.015), marginTop: phoneNumberErr ? 10 : -5}}>{Strings.ENTER_MOBILE_NUMBER}</Text>
              <View>
                <CustomButton
                  height={height * 0.07}
                  backgroundColor={Colors.Blueberry}
                  marginTop={height * 0.2}
                  borderRadius={'10px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  fontFamily={'Gilroy-SemiBold'}
                  fontSize={'18px'}
                  textColor={Colors.White}
                  onPress={() => {
                    onPressContinue();
                  }}
                  text={Strings.CONTINUE}
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
    padding: 15,
  },
});

export default Verification;
