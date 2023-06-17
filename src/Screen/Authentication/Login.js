import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { backIcon } from '../../Resources/assets';
import Strings from '../../Resources/Strings';
import { style } from './style';
import CustomInputText from '../../Component/CustomInputText';
import {
  CustomText,
  CustomView,
  ButtonContainer,
  Image,
} from '../../Component/CustomComponent';
import Colors from '../../Resources/Colors';
import CustomButton from '../../Component/CustomButton';
import Facebook from '../../Resources/assets/facebook.png';
import Apple from '../../Resources/assets/apple.png';
import Google from '../../Resources/assets/google.png';
import Linkdin from '../../Resources/assets/linkdin.png';
import { RouteName } from '../../Navigation/routeName';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  linkdinLogin,
  login,
  sendOtp,
  setLoading,
  socialLogin,
} from '../../Redux/actions/authAction';
import auth from '@react-native-firebase/auth';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import LinkedInWebView from './LinkedInWebView';
import Toast from 'react-native-simple-toast';
import { facebookLogin, googleLogin } from '../../Constants/SocailLogin';
import { firbaseLogin } from '../../Constants/Firebase';
import { BackButton, HeaderContainer } from './VerificationStyle';
import {
  getFirebaseUserData,
  setFirebaseUserData,
} from '../../Constants/FireStoremanager/FireStoremanager';
import { getLinkdinAccessTokenService } from '../../Redux/services/profileService';
import { mxHeight } from '../../Util';
import { fontResize } from '../../Util/font';
import Config from 'react-native-config';

// const dropboxV2Api = require('dropbox-v2-api');

const isNative = Platform.OS !== 'web';

const Login = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const { userType } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const window = useWindowDimensions();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onValidation = () => {
    var isValid = true;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(email)) {
      isValid = false;
      setEmailErr(Strings.INVALID_EMAIL);
    }
    if (password == '') {
      isValid = false;
      setPasswordErr(Strings.EMPTY_PASSWORD);
    } else if (password.length > 5 == false) {
      isValid = false;
      setPasswordErr(Strings.INVALID_NEW_PASSWORD_LENGTH);
    }
    return isValid;
  };

  const onGoogleButtonPress = async () => {
    try {
      await googleLogin()
        .then((response) => {
          getFirebaseToken('Google', response);
        })
        .catch((error) => {
          console.log('google sign in1', error);
        });
    } catch (error) {
      console.log('google error', error);
    }
  };

  const getFirebaseToken = (socialType, socialToken) => {
    try {
      firbaseLogin(socialType, socialToken, userType).then((data) => {
        dispatch(setLoading(true));
        dispatch(
          socialLogin({
            data,
            onSuccess: (result) => {
              if (result.code < 210) {
                dispatch(setLoading(false));
                if (result.already_register) {
                  AsyncStorage.setItem(
                    Strings.ACCESS_TOKEN_KEY,
                    result.access_token
                  );
                  AsyncStorage.setItem(
                    Strings.LOGIN_DATA,
                    JSON.stringify(result)
                  );
                  navigation.reset({
                    index: 0,
                    routes: [{ name: RouteName.HOMESTACK }],
                  });
                  dispatch(setLoading(false));
                } else {
                  navigation.navigate(RouteName.VERIFICATION, {
                    email: result.data.email,
                    password: '',
                    name: result.data.name,
                    role: userType,
                    isSocial: true,
                    result: result,
                  });
                  dispatch(setLoading(false));
                }
              } else {
                dispatch(setLoading(false));
                Toast.show(
                  (result && result?.message) || 'Something went wrong'
                );
              }
            },
            onError: (error) => {
              dispatch(setLoading(false));
              console.log('errorLogin', error);
              Toast.show('Something went wrong.');
            },
          })
        );
      });
    } catch (error) {
      dispatch(setLoading(false));
      console.log('err>>>', error);
    }
  };

  const onAppleButtonPress = async () => {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce
    );
    getFirebaseToken('Apple', appleCredential, userType);
  };

  const onFacebookButtonPress = async () => {
    try {
      facebookLogin()
        .then((result) => {
          console.log('result>>>', result);
          getFirebaseToken('Facebook', result, userType);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const onPressLogin = async () => {
    try {
      if (!onValidation()) {
        return;
      }

      dispatch(setLoading(true));

      AsyncStorage.getItem(Strings.DEVICE_TOKEN).then((deviceToken) => {
        const data = {
          email: email.trim().toLowerCase(),
          password: password.trim(),
          device_token: deviceToken,
        };
        dispatch(
          login({
            data,
            onSuccess: async (result) => {
              if (result.code < 210) {
                dispatch(setLoading(false));
                AsyncStorage.setItem(
                  Strings.ACCESS_TOKEN_KEY,
                  result.access_token
                );
                AsyncStorage.setItem(
                  Strings.LOGIN_DATA,
                  JSON.stringify(result)
                );
                AsyncStorage.setItem(Strings.IS_CREATE_PROFILE, 'true');
                AsyncStorage.setItem(Strings.IS_VERIFICATION, 'true');

                if (result.isVerification == 'false') {
                  const otpdata = {
                    token: result.access_token,
                    data: {
                      country_code: result.data.phone_number,
                      phone_number: result.data.country_code,
                    },
                  };
                  dispatch(
                    sendOtp({
                      data: otpdata,
                      onSuccess: (res) => {
                        if (res.code < 210) {
                          dispatch(setLoading(false));
                          navigation.navigate(RouteName.OTPVERIFICATION, {
                            token: result.access_token,
                            phoneNumber: result.data.phone_number,
                            countryCode: result.data.country_code,
                            isForgetPassword: false,
                            isSocial: result?.data?.is_social || 'false',
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
                  if (result.data.role == Strings.PROFESSIONAL) {
                    if (result.data.work_info.length == 0) {
                      navigation.navigate(RouteName.CREATE_PROFILE, {
                        isSocial: result?.data?.is_social || false,
                        result: result,
                      });
                    } else {
                      addUserDataFirestore(result);
                      navigation.reset({
                        index: 0,
                        routes: [{ name: RouteName.HOMESTACK }],
                      });
                    }
                  } else {
                    addUserDataFirestore(result);
                    navigation.reset({
                      index: 0,
                      routes: [{ name: RouteName.HOMESTACK }],
                    });
                  }
                }
              } else {
                dispatch(setLoading(false));
              }
            },
            onError: (error) => {
              dispatch(setLoading(false));
              console.log('error', error);
              Toast.show(error?.error || 'Something went wrong.');
            },
          })
        );
      });
    } catch (error) {
      console.log('errorError>>', error);
    }
  };

  const addUserDataFirestore = async (result) => {
    const userExist = await getFirebaseUserData({
      id: result?.data?.user_id,
    });
    if (userExist !== true) {
      const userStoreData = {
        id: result?.data?.user_id || result?.data?._id,
        email: result?.data?.email || email,
        device_token: result.data.device_token,
        image: result?.data?.image || result?.data?.userinfo?.image || '',
        name: result?.data?.name || '',
        role: result?.data?.role || '',
        phone_number: result?.data?.phone_number || '',
        status: 'online',
      };
      const storeFirbaseData = await setFirebaseUserData({
        id: result?.data?.user_id || result?.data?._id,
        userData: userStoreData,
      });
    }
  };

  const getAccessTokenData = async (item) => {
    var accessData = await getLinkdinAccessTokenService({
      code: item,
      redirect_uri: 'https://www.linkedin.com/developers/tools/oauth/redirect',
    });
    var device_token = await AsyncStorage.getItem(Strings.DEVICE_TOKEN);

    const data = {
      token: accessData.access_token,
      role: userType,
      device_token: device_token,
    };
    dispatch(
      linkdinLogin({
        data,
        onSuccess: (result) => {
          if (result.code < 210) {
            dispatch(setLoading(false));
            if (result.already_register) {
              AsyncStorage.setItem(
                Strings.ACCESS_TOKEN_KEY,
                result.access_token
              );
              AsyncStorage.setItem(Strings.LOGIN_DATA, JSON.stringify(result));
              navigation.reset({
                index: 0,
                routes: [{ name: RouteName.HOMESTACK }],
              });
            } else {
              navigation.navigate(RouteName.VERIFICATION, {
                email: result.data.email,
                password: '',
                name: result.data.name,
                role: userType,
                isSocial: true,
                result: result,
              });
            }
          } else {
            dispatch(setLoading(false));
          }
        },
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isNative ? Colors.White : 'trransparent',
      }}
    >
      <ScrollView bounces={false}>
        {/* <View style={isNative ? style.subconstainer : style.webContainer}> */}
        <View
          style={[
            style.scrollView,
            {
              paddingVertical: window.height * 0.02,
              marginVertical: isNative ? 0 : window.height * 0.04,
            },
          ]}
        >
          {isNative && (
            <HeaderContainer marginTop={mxHeight * 0.05}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ paddingTop: Platform.OS == 'ios' ? 15 : 0 }}
              >
                <BackButton resizeMode="contain" source={backIcon} />
              </TouchableOpacity>
            </HeaderContainer>
          )}

          <Text style={[style.selectText]}>{Strings.LOGIN}</Text>

          <CustomInputText
            marginTop={window.height * 0.05}
            marginBottom={window.height * 0.02}
            label={Strings.EMAIL}
            autoCapitalize={'none'}
            onChangeText={(text) => {
              setEmail(text);
              if (emailErr) {
                let regData = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!regData.test(text)) {
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
            isError={emailErr != ''}
            errorMessage={emailErr}
          />
          <CustomInputText
            marginBottom={window.height * 0.02}
            label={Strings.PASSWORD}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordErr) {
                if (text.length === 0) {
                  setPasswordErr(Strings.EMPTY_PASSWORD);
                } else if (text.length > 5 == false) {
                  setPasswordErr(Strings.INVALID_NEW_PASSWORD_LENGTH);
                } else {
                  setPasswordErr('');
                }
              }
            }}
            // value={password}
            placeholder={'***********'}
            secureTextEntry
            window={window}
            isError={passwordErr != ''}
            errorMessage={passwordErr}
          />

          <CustomText
            style={{ width: '50%' }}
            fontSize={'16px'}
            textAlign={'left'}
            textColor={Colors.Blueberry}
            textLine={'underline'}
            marginLeft={isNative ? '0px' : '10%'}
            onPress={() => {
              navigation.navigate(RouteName.FORGET_PASSWORD);
            }}
            fontFamily={'Gilroy-Bold'}
          >
            {Strings.FORGOT_PASSWORD}
          </CustomText>

          <CustomButton
            width={isNative ? '100%' : '80%'}
            height={window.height * 0.06}
            backgroundColor={Colors.Blueberry}
            marginTop={window.height * 0.03}
            borderRadius={'10px'}
            alignItems={'center'}
            justifyContent={'center'}
            fontFamily={'Gilroy-SemiBold'}
            fontSize={'18px'}
            textColor={Colors.White}
            onPress={() => {
              onPressLogin();
            }}
            text={Strings.LOGIN}
          />
          <CustomView
            justifyContent={'space-between'}
            alignItems={'center'}
            flexDirection={'row'}
            marginTop={window.height * 0.035}
            height={window.height * 0.035}
          >
            <CustomView
              height={isNative ? '1px' : '0px'}
              bgColor={Colors.Silver}
              width={'25%'}
            />
            <CustomText
              textColor={Colors.DimGray}
              fontSize={'14px'}
              fontFamily={'Gilroy-Regular'}
            >
              {Strings.LOGIN_WITH}
            </CustomText>
            <CustomView
              height={isNative ? '1px' : '0px'}
              bgColor={Colors.Silver}
              width={'25%'}
            />
          </CustomView>
          <CustomView
            justifyContent={'space-between'}
            alignItems={'center'}
            flexDirection={'row'}
            marginLeft={isNative ? '2%' : '22%'}
            marginRight={'2%'}
            marginTop={window.height * 0.035}
            marginBottom={window.height * 0.04}
            width={isNative ? '96%' : '56%'}
            height={window.height * 0.1}
          >
            <ButtonContainer
              onPress={() => onGoogleButtonPress()}
              width={isNative ? window.width * 0.2 : '20%'}
              height={'50px'}
              padding={'1px'}
              backgroundColor={'transparent'}
            >
              <Image
                resizeMode={'contain'}
                width={'100%'}
                height={'100%'}
                source={Google}
              />
            </ButtonContainer>
            <ButtonContainer
              onPress={() => onFacebookButtonPress()}
              width={isNative ? window.width * 0.2 : '20%'}
              height={'50px'}
              padding={'1px'}
              backgroundColor={'transparent'}
            >
              <Image
                resizeMode={'contain'}
                width={'100%'}
                height={'100%'}
                source={Facebook}
              />
            </ButtonContainer>
            <ButtonContainer
              onPress={() => setShowLinkedIn(true)}
              width={isNative ? window.width * 0.2 : '20%'}
              height={'50px'}
              padding={'1px'}
              backgroundColor={'transparent'}
            >
              <Image
                resizeMode={'contain'}
                width={'100%'}
                height={'100%'}
                source={Linkdin}
              />
            </ButtonContainer>
            {Platform.OS !== 'android' && (
              <ButtonContainer
                onPress={() => onAppleButtonPress()}
                width={isNative ? window.width * 0.2 : '20%'}
                height={'50px'}
                padding={'1px'}
                backgroundColor={'transparent'}
              >
                <Image
                  resizeMode={'contain'}
                  width={'100%'}
                  height={'100%'}
                  source={Apple}
                />
              </ButtonContainer>
            )}
          </CustomView>

          <CustomText
            fontSize={fontResize(mxHeight * 0.028)}
            fontFamily={'Gilroy-Bold'}
            textColor={Colors.Blueberry}
            marginBottom={window.height * 0.04}
            textAlign={'center'}
            textLine={'underline'}
            onPress={() => {
              navigation.navigate(RouteName.APP_TUTORIAL);
            }}
          >
            {Strings.VIEW_APP_TUTORIAL}
          </CustomText>

          <CustomText
            textColor={Colors.drakGray}
            fontSize={'16px'}
            marginBottom={window.height * 0.02}
            marginLeft={isNative ? '0px' : '10%'}
            fontFamily={'Gilroy-Regular'}
            textAlign={'left'}
          >
            {Strings.DO_NOT}
            <CustomText
              onPress={() => {
                navigation.navigate(RouteName.SIGNUP, { role: userType });
              }}
              fontFamily={'Gilroy-SemiBold'}
              textLine={'underline'}
              textColor={Colors.Blueberry}
            >
              {Strings.SIGNUP}
            </CustomText>
          </CustomText>
          <CustomText
            marginLeft={isNative ? '0px' : '10%'}
            marginRight={isNative ? '0px' : '10%'}
            textColor={Colors.PrimaryBlack}
            fontSize={'14px'}
            fontFamily={'Gilroy-Regular'}
            textAlign={'left'}
          >
            {Strings.BY_CLICK_LOGIN}
            <CustomText
              onPress={() =>
                navigation.navigate(RouteName.TERMS_CONDITION, {
                  isLogin: true,
                })
              }
              fontFamily={'Gilroy-SemiBold'}
              textColor={Colors.Blueberry}
            >
              {Strings.TERMS_CONDITIONS}
            </CustomText>
            {Strings.AND}
            <CustomText
              onPress={() => navigation.navigate(RouteName.PRIVACY_POLICY)}
              fontFamily={'Gilroy-SemiBold'}
              textColor={Colors.Blueberry}
            >
              {Strings.PRIVACY_POLICY}
            </CustomText>
          </CustomText>

          {isKeyboardVisible && <View style={{ height: mxHeight * 0.5 }} />}
        </View>
      </ScrollView>
      <LinkedInWebView
        onClose={() => setShowLinkedIn(false)}
        showLinkedIn={showLinkedIn}
        onSuccess={(data) => {
          getAccessTokenData(data);
        }}
      />
    </SafeAreaView>
  );
};

export default Login;
