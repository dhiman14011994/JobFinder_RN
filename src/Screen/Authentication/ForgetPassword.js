/* eslint-disable no-shadow */
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import {
  Wrapper,
  HeaderContainer,
  BackButton,
  LoginContainer,
  ScrollViewContainer,
  TextComponent,
  LoginContainerParent,
} from './VerificationStyle';
import { sendOtp, setLoading, setToken } from '../../Redux/actions/authAction';
import { backIcon } from '../../Resources/assets';
import { isNative, mxHeight } from '../../Util';
import CountryPickerView from '../../Component/CountryPicker';
import CustomButton from '../../Component/CustomButton';
import Colors from '../../Resources/Colors';
import Strings from '../../Resources/Strings';
import { RouteName } from '../../Navigation/routeName';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { CustomText } from '../../Component/CustomComponent';
import { fontResize } from '../../Util/font';
import CustomInputText from '../../Component/CustomInputText';
import { forgotPassword } from '../../Redux/services/authService';
import { theme } from '../../Util/constant';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgetPassword = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const window = useWindowDimensions();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberErr, setPhoneNumberErr] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const { width, height } = Dimensions.get('screen');
  const dispatch = useDispatch();

  const onValidation = () => {
    var isValid = true;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == '') {
      isValid = false;
      setEmailErr(Strings.EMPTY_EMAIL);
    } else if (!reg.test(email)) {
      isValid = false;
      setEmailErr(Strings.INVALID_EMAIL);
    }
    if (phoneNumber == '') {
      isValid = false;
      setPhoneNumberErr(Strings.EMPTY_PHONE_NUMBER);
    } else if (phoneNumber.length > 8 === false) {
      isValid = false;
      setPhoneNumberErr(Strings.INVALID_PHONE_NUMBER);
    }
    return isValid;
  };

  const onPressContinue = async () => {
    try {
      if (!onValidation()) {
        return;
      }
      const form = {
        email: email.trim().toLowerCase(),
        phone_number: phoneNumber,
        country_code: countryCode,
      };
      const forgetPasswordData = await forgotPassword(form);
      if (forgetPasswordData?.access_token) {
        dispatch(setToken(forgetPasswordData?.access_token));
        dispatch(setLoading(true));
        const data = {
          token: forgetPasswordData?.access_token,
          data: {
            country_code: countryCode.trim().toString(),
            phone_number: phoneNumber.trim().toString(),
          },
        };

        dispatch(
          sendOtp({
            data,
            onSuccess: (res) => {
              dispatch(setLoading(false));
              navigation.navigate(RouteName.OTPVERIFICATION, {
                token: forgetPasswordData?.access_token,
                phoneNumber: phoneNumber,
                countryCode: countryCode,
                isForgetPassword: true,
                isSocial: false,
                result: '',
              });
            },
            onError: (error) => {
              dispatch(setLoading(false));
              console.log('error sendotp', JSON.stringify(error));
            },
          })
        );
      } else {
        dispatch(setLoading(false));
        Toast.show(
          (forgetPasswordData && forgetPasswordData?.message) ||
            'Something Went Wrong'
        );
      }
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  return (
    <SafeAreaView style={{flex:1, backgroundColor: Colors.White}}>
      <View style={styles.container}>
        {/* Header */}
        {isNative && (
          <HeaderContainer marginTop={mxHeight * 0.05}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}
            >
              <BackButton resizeMode="contain" source={backIcon} />
            </TouchableOpacity>
          </HeaderContainer>
        )}
        <LoginContainerParent>
          <LoginContainer isNative={isNative} width={width} height={height}>
            <ScrollViewContainer bounces={false} isNative={isNative}>
              <View style={styles.scrollContainer}>
                <View>
                  <TextComponent
                    fontSize={fontResize(30)}
                    style={{ ...theme.fontBold }}
                    isNative={isNative}
                  >
                    {Strings.RESET_PASSWORD}
                  </TextComponent>

                  <CustomText
                    style={{ lineHeight: 24 }}
                    fontFamily={'Gilroy-Regular'}
                    textColor={Colors.DimGray}
                    marginTop={10}
                    fontSize={fontResize(16)}
                  >
                    {Strings.RESET_PASSWORD_DETAILS}
                  </CustomText>
                  <CustomInputText
                    marginTop={height * 0.05}
                    marginBottom={height * 0.02}
                    label={Strings.EMAIL}
                    autoCapitalize={'none'}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (emailErr) {
                        let regData =
                          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                        if (text === '') {
                          setEmailErr(Strings.EMPTY_EMAIL);
                        } else if (!regData.test(text)) {
                          setEmailErr(Strings.INVALID_EMAIL);
                        } else {
                          setEmailErr('');
                        }
                      }
                    }}
                    keyboardType={'email-address'}
                    placeholder={'example@domain.com'}
                    value={email}
                    window={window}
                    isError={emailErr !== ''}
                    errorMessage={emailErr}
                  />

                  <CountryPickerView
                    onPhoneNumberChange={({ text, countryCode }) => {
                      setPhoneNumber(text);
                      setCountryCode(countryCode);
                      if (phoneNumberErr) {
                        if (text === '') {
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
                </View>
                <View>
                  <CustomButton
                    height={height * 0.07}
                    backgroundColor={Colors.Blueberry}
                    borderRadius={'10px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    fontFamily={'Gilroy-SemiBold'}
                    fontSize={'18px'}
                    textColor={Colors.White}
                    onPress={() => {
                      onPressContinue();
                    }}
                    text={Strings.RESET_PASSWORD}
                  />
                </View>
              </View>
            </ScrollViewContainer>
          </LoginContainer>
        </LoginContainerParent>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height,
    backgroundColor: isNative ? '#fff' : null,
    justifyContent: 'center',
  },
  button: {
    paddingLeft: '10%',
  },
  scrollContainer: {
    height: Dimensions.get('screen').height * 0.8,
    justifyContent: 'space-between',
  },
});

export default ForgetPassword;
