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
import toast from 'react-simple-toasts';
import { containsOnlyCV, containsOnlyNumbers } from '../../Util/validation';

const Verification = ({ navigation, route }) => {
  const { height, width } = useWindowDimensions();
  const { name, email, password, role, isSocial, result } = route.params;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const dispatch = useDispatch();

  const onValidation = () => {
    var isValid = true;
    if (phoneNumber.length > 9 == false) {
      isValid = false;
      toast(Strings.INVALID_PHONE_NUMBER);
      return isValid;
    }

    if (!containsOnlyNumbers(phoneNumber)) {
      isValid = false;
      toast(Strings.INVALID_PHONE_NUMBER);
      return isValid;
    }

    return isValid;
  };

  const onPressContinue = async () => {
    if (!onValidation()) {
      return;
    }

    const form = isSocial
      ? {
          name: name,
          email: email.trim().toLowerCase(),
          role: role,
          phone_number: phoneNumber,
          country_code: countryCode,
          from_social: true,
          is_create: false,
          uid: result?.data?.uid,
          provider: result?.data?.provider,
        }
      : {
          name: name,
          email: email.trim().toLowerCase(),
          password: password,
          role: role,
          phone_number: phoneNumber,
          country_code: countryCode,
          from_social: false,
          is_create: false,
        };
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
                  toast(res.message);
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
                  toast('Something went wrong.');
                },
              })
            );
          } else {
            dispatch(setLoading(false));
          }
        },
        onError: (error) => {
          dispatch(setLoading(false));
          toast(
            error
              ? error.email
                ? error.email[0]
                  ? error.email[0]
                  : 'Something went wrong'
                : 'Something went wrong'
              : 'Something went wrong'
          );
          console.log('error sign up', JSON.stringify(error));
          // Toast.show('Something went wrong.');
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
            <TouchableOpacity style={styles.button}>
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
              >
                Continue with Phone
              </TextComponent>
              <MessageVerificationText isNative={isNative}>
                You’ll receive 4 digit code to verify next.
              </MessageVerificationText>
              <CountryPickerView
                onPhoneNumberChange={({ text, countryCode }) => {
                  setPhoneNumber(text);
                  setCountryCode(countryCode);
                }}
              />
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
