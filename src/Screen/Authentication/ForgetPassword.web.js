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

import { setToken } from '../../Redux/actions/authAction';
import { backIcon } from '../../Resources/assets';
import { isNative } from '../../Util';
import CountryPickerView from '../../Component/CountryPicker';
import CustomButton from '../../Component/CustomButton';
import Colors from '../../Resources/Colors';
import Strings from '../../Resources/Strings';
import { RouteName } from '../../Navigation/routeName';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-simple-toasts';
import { CustomText } from '../../Component/CustomComponent';
import CustomInputText from '../../Component/CustomInputText';
import CustomEmailView from '../../Component/CustomEmailText';
import { forgotPassword } from '../../Redux/services/authService';
import { fontResize } from '../../Util/font';

const ForgetPassword = ({ navigation, route }) => {
  const { height, width } = useWindowDimensions();
  //   const {name, email, password, role} = route.params;
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberErr, setPhoneNumberErr] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const dispatch = useDispatch();

  const onValidation = () => {
    var isValid = true;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(email)) {
      isValid = false;
      toast(Strings.INVALID_EMAIL);
      setEmailErr(Strings.INVALID_EMAIL);
      return isValid;
    }
    if (phoneNumber.length > 9 == false) {
      isValid = false;
      toast(Strings.INVALID_PHONE_NUMBER);
      setPhoneNumberErr(Strings.INVALID_PHONE_NUMBER);
      return isValid;
    }
    return isValid;
  };

  const onPressContinue = async () => {
    if (!onValidation()) {
      return;
    }

    const form = {
      email: email.trim().toLowerCase(),
      phone_number: phoneNumber,
      country_code: countryCode,
    };
    const forgetPasswordData = await forgotPassword(form);
    console.log('forgetPasswordData>>>>', forgetPasswordData);
    dispatch(setToken(forgetPasswordData?.access_token));
    navigation.navigate(RouteName.OTPVERIFICATION, {
      token: forgetPasswordData?.access_token,
      phoneNumber: phoneNumber,
      countryCode: countryCode,
      isForgetPassword: true,
      isSocial: false,
      result: '',
    });
  };

  return (
    <View style={styles.container}>
      <Wrapper>
        {/* Header */}
        {isNative && (
          <HeaderContainer>
            <TouchableOpacity style={styles.button}>
              <BackButton resizeMode="contain" source={backIcon} />
            </TouchableOpacity>
          </HeaderContainer>
        )}
        <LoginContainerParent>
          <LoginContainer isNative={isNative} width={width} height={height}>
            <ScrollViewContainer bounces={false} isNative={isNative}>
              <TextComponent
                isNative={isNative}
                fontSize={fontResize(height * 0.03)}
              >
                {Strings.RESET_PASSWORD}
              </TextComponent>
              <CustomText
                style={{ lineHeight: fontResize(height * 0.024) }}
                fontFamily={'Gilroy-Regular'}
                textColor={Colors.DimGray}
                marginTop={10}
                fontSize={fontResize(height * 0.015)}
              >
                {Strings.RESET_PASSWORD_DETAILS}
              </CustomText>
              <CustomEmailView
                onChange={(text) => {
                  setEmail(text);
                  if (emailErr) {
                    let regData =
                      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    if (!regData.test(email)) {
                      setEmailErr(Strings.INVALID_EMAIL);
                    } else {
                      setEmailErr('');
                    }
                  }
                }}
                fontSize={fontResize(height * 0.015)}
                title={Strings.EMAIL}
                placeholder={'Enter the email'}
                errMsg={emailErr}
              />
              <CountryPickerView
                onPhoneNumberChange={({ text, countryCode }) => {
                  setPhoneNumber(text);
                  setCountryCode(countryCode);
                  if (text.length > 9 === true) {
                    setPhoneNumberErr('');
                  }
                }}
                errMsg={phoneNumberErr}
              />
              <View>
                <CustomButton
                  height={height * 0.07}
                  backgroundColor={Colors.Blueberry}
                  marginTop={height * 0.08}
                  borderRadius={'10px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  fontFamily={'Gilroy-SemiBold'}
                  fontSize={fontResize(height * 0.02)}
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

export default ForgetPassword;
