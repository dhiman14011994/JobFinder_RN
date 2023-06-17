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
import {
  linkdinLogin,
  setLoading,
  socialLogin,
} from '../../Redux/actions/authAction';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import Toast from 'react-native-simple-toast';
import { facebookLogin, googleLogin } from '../../Constants/SocailLogin';
import { firbaseLogin } from '../../Constants/Firebase';
import { BackButton, HeaderContainer } from './VerificationStyle';
import { backIcon } from '../../Resources/assets';
import { emailCheck } from '../../Redux/services/authService';
import Network from '../../Redux/constants/Network';
import EndPoint from '../../Redux/constants/EndPoint';
import LinkedInWebView from './LinkedInWebView';
import { getLinkdinAccessTokenService } from '../../Redux/services/profileService';
import { mxHeight } from '../../Util';

const isNative = Platform.OS !== 'web';

const Signup = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const { role } = route.params;
  const { userType } = useSelector((state) => state.auth);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const dispatch = useDispatch();

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
    if (name.length > 2 == false) {
      isValid = false;
      setNameErr(Strings.INVALID_NAME);
    }
    if (email == '') {
      isValid = false;
      setEmailErr(Strings.EMPTY_EMAIL);
    } else if (!reg.test(email)) {
      isValid = false;
      setEmailErr(Strings.INVALID_EMAIL);
    }
    if (password.length === 0) {
      isValid = false;
      setPasswordErr(Strings.EMPTY_PASSWORD);
    } else if (password.length > 5 == false) {
      isValid = false;
      setPasswordErr(Strings.INVALID_NEW_PASSWORD_LENGTH);
    }
    return isValid;
  };

  const onPressContinue = () => {
    if (!onValidation()) {
      return;
    }
    verifyEmail();
  };

  const onFacebookButtonPress = async () => {
    try {
      facebookLogin()
        .then((result) => {
          getFirebaseToken('Facebook', result, userType);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      googleLogin()
        .then((response) => {
          getFirebaseToken('Google', response);
        })
        .catch((error) => {
          console.log('google sign in2', error);
        });
    } catch (error) {
      console.log('google error', error);
    }
  };

  const getFirebaseToken = (socialType, socialToken) => {
    firbaseLogin(socialType, socialToken, role).then((data) => {
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
              } else {
                navigation.navigate(RouteName.VERIFICATION, {
                  email: result.data.email,
                  password: '',
                  name: result.data.name,
                  role: role,
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
    });
  };

  const verifyEmail = async () => {
    Network.post(EndPoint.checkEmail, { email: email })
      .then((response) => {
        if (response?.data?.is_email == true) {
          Toast.show(response?.data?.message);
        } else if (response?.data?.is_email == false) {
          navigation.navigate(RouteName.VERIFICATION, {
            email: email,
            password: password,
            name: name,
            role: role,
            isSocial: false,
            result: '',
          });
        }
      })
      .catch((error) => {});
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
                role: role,
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

  const onAppleButtonPress = async () => {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce
    );
    getFirebaseToken('Apple', appleCredential, userType);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.White }}>
      <ScrollView
        bounces={false}
        // style={{ flex: 1, backgroundColor: 'transparent' }}
      >
        <View style={style.subconstainer}>
          <View style={[style.scrollView]}>
            {isNative && (
              <HeaderContainer
                marginTop={
                  Platform.OS == 'android'
                    ? window.height * 0.06
                    : window.height * 0.02
                }
              >
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ paddingTop: Platform.OS == 'ios' ? 15 : 0 }}
                >
                  <BackButton resizeMode="contain" source={backIcon} />
                </TouchableOpacity>
              </HeaderContainer>
            )}
            <Text style={[style.selectText]}>{Strings.SIGNUP}</Text>
            <CustomInputText
              marginTop={window.height * 0.05}
              marginBottom={window.height * 0.02}
              marginLeft={isNative ? '0px' : '10%'}
              label={Strings.NAME}
              onChangeText={(text) => {
                setName(text);
                if (nameErr) {
                  if (text.length > 2 == false) {
                    setNameErr(Strings.INVALID_NAME);
                  } else {
                    setNameErr('');
                  }
                }
              }}
              placeholder={'Johnny'}
              errorMessage={nameErr}
              isError={nameErr != ''}
              value={name}
              window={window}
            />
            <CustomInputText
              marginBottom={window.height * 0.02}
              marginLeft={isNative ? '0px' : '10%'}
              label={Strings.EMAIL}
              autoCapitalize={'none'}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailErr) {
                  let regData = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                  if (text == '') {
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
              window={window}
              isError={emailErr != ''}
              errorMessage={emailErr}
            />
            <CustomInputText
              marginBottom={window.height * 0.02}
              marginLeft={isNative ? '0px' : '10%'}
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
              placeholder={'***********'}
              secureTextEntry
              window={window}
              value={password}
              isError={passwordErr != ''}
              errorMessage={passwordErr}
            />

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
                onPressContinue();
              }}
              text={Strings.CONTINUE}
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
                {Strings.SIGN_UP_WITH}
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
              marginTop={window.height * 0.03}
              marginBottom={window.height * 0.035}
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
              textColor={Colors.drakGray}
              fontSize={'16px'}
              marginBottom={window.height * 0.02}
              marginLeft={isNative ? '0px' : '10%'}
              fontFamily={'Gilroy-Regular'}
              textTransform={'none'}
              textAlign={'left'}
            >
              {Strings.ALREADY_HAVE_ACCOUNT}
              <CustomText
                onPress={() => navigation.navigate(RouteName.LOGIN)}
                fontFamily={'Gilroy-SemiBold'}
                textLine={'underline'}
                textColor={Colors.Blueberry}
              >
                {Strings.LOGIN}
              </CustomText>
            </CustomText>
            <CustomText
              marginLeft={isNative ? '0px' : '10%'}
              marginRight={isNative ? '0px' : '10%'}
              marginBottom={'30px'}
              textColor={Colors.PrimaryBlack}
              fontSize={'14px'}
              fontFamily={'Gilroy-Regular'}
              textTransform={'none'}
              textAlign={'left'}
            >
              {Strings.BY_CLICK_LOGIN}
              <CustomText
                fontFamily={'Gilroy-SemiBold'}
                textTransform={'none'}
                onPress={() =>
                  navigation.navigate(RouteName.TERMS_CONDITION, {
                    isLogin: true,
                  })
                }
                textColor={Colors.Blueberry}
              >
                {Strings.TERMS_CONDITIONS}
              </CustomText>
              {Strings.AND}
              <CustomText
                fontFamily={'Gilroy-SemiBold'}
                onPress={() => navigation.navigate(RouteName.PRIVACY_POLICY)}
                textColor={Colors.Blueberry}
              >
                {Strings.PRIVACY_POLICY}
              </CustomText>
            </CustomText>
            {isKeyboardVisible && <View style={{ height: mxHeight * 0.5 }} />}
          </View>
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

export default Signup;
