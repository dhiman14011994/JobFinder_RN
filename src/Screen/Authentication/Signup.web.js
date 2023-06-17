import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import Header from '../../Component/Header/Header';
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
import { FacebookProvider, Login as FBLogin } from 'react-facebook';
import GoogleLogin from 'react-google-login';
import { facebookAppId, webClientID } from '../../Constants';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-simple-toasts';
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithApple,
} from '../../Constants/FirebaseWeb';
import { setLoading, socialLogin } from '../../Redux/actions/authAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { emailCheck } from '../../Redux/services/authService';
import { async } from '@firebase/util';
import Network from '../../Redux/constants/Network';
import EndPoint from '../../Redux/constants/EndPoint';
import { containsOnlyEmail, containsOnlyStrings } from '../../Util/validation';

const isNative = Platform.OS !== 'web';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const window = useWindowDimensions();
  const userType = useSelector((state) => state.auth.userType);
  const dispatch = useDispatch();

  const onValidation = () => {
    var isValid = true;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let nameReg =
      /^[a-zA-Z'\-\pL]+(?:(?! {2})[a-zA-Z'\-\pL ])*[a-zA-Z'\-\pL]+$/;
    if (name.length > 2 == false) {
      isValid = false;
      setNameErr(Strings.INVALID_NAME);
    }
    if (!nameReg.test(name)) {
      isValid = false;
      setNameErr(Strings.INVALID_NAME);
    }
    if (!reg.test(email)) {
      isValid = false;
      setEmailErr(Strings.INVALID_EMAIL);
    }
    if (password.length === 0) {
      isValid = false;
      setPasswordErr(Strings.INVALID_PASSWORD);
    }
    if (password.length > 5 == false) {
      isValid = false;
      setPasswordErr(Strings.INVALID_PASSWORD);
    }
    return isValid;
  };

  const onPressContinue = async () => {
    if (!onValidation()) {
      return;
    }
    verifyEmail();
  };

  const verifyEmail = async () => {
    Network.post(EndPoint.checkEmail, { email: email })
      .then((response) => {
        if (response?.data?.is_email == true) {
          toast(response?.data?.message);
        } else if (response?.data?.is_email == false) {
          navigation.navigate(RouteName.VERIFICATION, {
            email: email,
            password: password,
            name: name,
            role: userType,
            isSocial: false,
            result: '',
          });
        }
      })
      .catch((error) => {});
  };

  const googleSocialLogin = async () => {
    signInWithGoogle()
      .then((res) => {
        let data = {
          firebase_token: res,
          role: userType,
        };
        socialLoginApi(data);
      })
      .catch((err) => console.log('err', err));
  };

  const facebookSigin = () => {
    signInWithFacebook()
      .then((res) => {
        let data = {
          firebase_token: res,
          role: userType,
        };
        socialLoginApi(data);
      })
      .catch((err) => {
        console.log('err>>>>', err);
      });
  };

  const signinApple = () => {
    signInWithApple()
      .then((res) => {
        let data = {
          firebase_token: res,
          role: userType,
        };
        socialLoginApi(data);
      })
      .catch((err) => {
        console.log('err>>>>', err);
      });
  };

  const socialLoginApi = (data) => {
    try {
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
                navigation.reset({
                  index: 0,
                  routes: [{ name: RouteName.HOMESTACK }],
                });
              } else {
                navigation.navigate(RouteName.VERIFICATION, {
                  email: result?.data?.email,
                  password: '',
                  name: result?.data?.name,
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
            toast(error);
          },
        })
      );
    } catch (err) {}
  };

  return (
    <>
      <ScrollView bounces={false} style={{ flex: 1 }}>
        <View style={isNative ? style.subconstainer : style.webContainer}>
          <SafeAreaView
            style={[
              style.scrollView,
              {
                paddingVertical: window.height * 0.07,
                marginVertical: isNative ? 0 : window.height * 0.04,
              },
            ]}
          >
            <Text style={[style.selectText]}>{Strings.SIGNUP}</Text>
            <CustomInputText
              marginTop={window.height * 0.05}
              marginBottom={window.height * 0.01}
              marginLeft={'10%'}
              label={Strings.NAME}
              onChangeText={(text) => {
                if (containsOnlyStrings(text)) {
                  setName(text);
                }
                if (text == '') {
                  setName('');
                }
                if (nameErr) {
                  if (text.length > 2 == false) {
                    setNameErr(Strings.INVALID_NAME);
                  } else {
                    setNameErr('');
                  }
                }
              }}
              placeholder={'Abc xyz'}
              errorMessage={nameErr}
              isError={nameErr != ''}
              value={name}
              window={window}
            />
            <CustomInputText
              marginBottom={window.height * 0.01}
              marginLeft={'10%'}
              label={Strings.EMAIL}
              value={email}
              onChangeText={(text) => {
                if (containsOnlyEmail(text)) {
                  setEmail(text);
                }
                if (text == '') {
                  setEmail('');
                }
                if (emailErr) {
                  let regData = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                  if (!regData.test(email)) {
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
              marginBottom={window.height * 0.01}
              marginLeft={'10%'}
              label={Strings.PASSWORD}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordErr) {
                  if (text.length === 0) {
                    setPasswordErr(Strings.INVALID_PASSWORD);
                  } else if (text.length > 5 == false) {
                    setPasswordErr(Strings.INVALID_PASSWORD);
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
              marginTop={window.height * 0.02}
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
              marginTop={window.height * 0.02}
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
              // marginTop={window.height * 0.01}
              // marginBottom={window.height * 0.01}
              width={isNative ? '96%' : '56%'}
              height={window.height * 0.1}
            >
              {/* <GoogleLogin
                clientId={webClientID}
                render={renderProps => (
                  <ButtonContainer
                    onPress={renderProps.onClick}
                    width={isNative ? window.width * 0.2 : '20%'}
                    height={'50px'}
                    padding={'1px'}
                    backgroundColor={'transparent'}>
                    <Image
                      resizeMode={'contain'}
                      width={'100%'}
                      height={'100%'}
                      source={Google}
                    />
                  </ButtonContainer>
                )}
                buttonText="Login"
                onSuccess={data => {
                  console.log('social data>>>', data);
                }}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              /> */}

              <ButtonContainer
                onPress={signInWithFacebook}
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
                onPress={() => googleSocialLogin()}
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
                onPress={() => toast('linkdin')}
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
                  onPress={signInWithApple}
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
              textAlign={'left'}
            >
              {Strings.DO_NOT}
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
              textColor={Colors.PrimaryBlack}
              fontSize={'14px'}
              fontFamily={'Gilroy-Regular'}
              textAlign={'left'}
            >
              {Strings.BY_CLICK_LOGIN}
              <CustomText
                onPress={() => {
                  navigation.navigate(RouteName.TERMS_CONDITION);
                }}
                fontFamily={'Gilroy-SemiBold'}
                textColor={Colors.Blueberry}
              >
                {Strings.TERMS_CONDITIONS}
              </CustomText>
              {Strings.AND}
              <CustomText
                onPress={() => {
                  navigation.navigate(RouteName.PRIVACY_POLICY);
                }}
                fontFamily={'Gilroy-SemiBold'}
                textColor={Colors.Blueberry}
              >
                {Strings.PRIVACY_POLICY}
              </CustomText>
            </CustomText>
          </SafeAreaView>
        </View>
      </ScrollView>
    </>
  );
};

export default Signup;
