import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Platform,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
  Dimensions,
} from 'react-native';
import Strings from '../../Resources/Strings';
import { style } from './style';
import CustomInputText from '../../Component/CustomInputText';
import {
  signInWithApple,
  signInWithFacebook,
  signInWithGoogle,
} from '../../Constants/FirebaseWeb';
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
import toast from 'react-simple-toasts';
import { useLinkedIn, LinkedInCallback } from 'react-linkedin-login-oauth2';

import AppleSignin from 'react-apple-signin-auth';
import {
  login,
  setLoading,
  socialLogin,
  linkdinLogin,
} from '../../Redux/actions/authAction';
import axios from 'axios';
import { fontResize } from '../../Util/font';
import { containsOnlyEmail } from '../../Util/validation';
import { getLinkdinAccessTokenService } from '../../Redux/services/profileService';
const { width, height } = Dimensions.get('window');
const isNative = Platform.OS !== 'web';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const dispatch = useDispatch();
  const window = useWindowDimensions();
  const userType = useSelector((state) => state.auth.userType);

  useEffect(() => {}, []);

  const appleWebLogin = () => {
    // const provider = new OAuthProvider('apple.com');
    // provider.addScope('email');
    // provider.addScope('name');
    // const auth = getAuth();
    // signInWithPopup(auth, provider)
    //   .then(result => {
    //     // The signed-in user info.
    //     const user = result.user;
    //     // Apple credential
    //     const credential = OAuthProvider.credentialFromResult(result);
    //     const accessToken = credential.accessToken;
    //     const idToken = credential.idToken;
    //     console.log('access', idToken, accessToken);
    //     // ...
    //   })
    //   .catch(error => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // The credential that was used.
    //     const credential = OAuthProvider.credentialFromError(error);
    //     // ...
    //   });
  };

  const onValidation = () => {
    var isValid = true;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(email)) {
      isValid = false;
      setEmailErr(Strings.ENTER_VALID_CREDENTIALS);
    }
    if (password.length === 0) {
      isValid = false;
      setPasswordErr(Strings.ENTER_VALID_CREDENTIALS);
    }
    if (password.length > 5 == false) {
      isValid = false;
      setPasswordErr(Strings.INVALID_PASSWORD_LENGTH);
    }
    return isValid;
  };

  const loginFirebase = () => {
    // auth()
    //   .createUserWithEmailAndPassword('postman@yopmail.com', 'Qwerty@1')
    //   .then(data => {
    //     console.log(JSON.stringify(data));
    //     console.log('User account created & signed in!');
    //   })
    //   .catch(error => {
    //     if (error.code === 'auth/email-already-in-use') {
    //       console.log('That email address is already in use!');
    //     }
    //     if (error.code === 'auth/invalid-email') {
    //       console.log('That email address is invalid!');
    //     }
    //     console.error(error);
    //   });
  };

  // const getInfoFromToken = token => {
  //   let PROFILE_REQUEST_PARAMS = {
  //     fields: {
  //       string: 'id, name,  first_name, last_name',
  //     },
  //   };
  //   let profileRequest = new GraphRequest(
  //     '/me',
  //     {token, parameters: PROFILE_REQUEST_PARAMS},
  //     (error, result) => {
  //       if (error) {
  //         console.log('login info has error: ' + error);
  //       } else {
  //         this.setState({userInfo: result});
  //         console.log('result:', result);
  //       }
  //     },
  //   );
  //   new GraphRequestManager().addRequest(profileRequest).start();
  // };

  async function onFacebookButtonPress() {
    // LoginManager.setLoginBehavior(Platform.OS === 'ios' ? 'web' : 'web_only');
    // return await new Promise((resolve, reject) => {
    //   LoginManager.logOut();
    //   LoginManager.logInWithPermissions(['public_profile', 'email'])
    //     .then(result => {
    //       if (result.isCancelled) {
    //         reject('facebook Login cancelled');
    //       }
    //     })
    //     .then(() => {
    //       const infoRequest = new GraphRequest(
    //         '/me?fields=id,name,email,picture',
    //         null,
    //         (error, result) => {
    //           if (error) {
    //             console.log('Error fetching data: ', error);
    //           } else {
    //             console.log('fetching data facebook>>>', result);
    //             resolve(result);
    //           }
    //         },
    //       );
    //       new GraphRequestManager().addRequest(infoRequest).start();
    //     })
    //     .catch(err => reject(err));
    // });
  }

  const getLinkedInToken = async (code) => {
    var accessData = await getLinkdinAccessTokenService({
      code: code,
      redirect_uri: 'http://localhost:3000/linkedIn',
    });
    console.log('accessData>>>', accessData);
    const data = {
      token: accessData,
      role: userType,
      device_token: 'cxzcv',
    };
    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    let requestOptions = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    axios
      .post(
        'https://www.linkedin.com/oauth/v2/accessToken',
        JSON.stringify(formBody),
        requestOptions
      )
      .then((json) => {})
      .catch((error) => {
        console.error(error);
      });
    // fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //   },
    //   body: formBody,
    // })
    //   .then(response => response.json())
  };

  const onPressLogin = () => {
    try {
      if (!onValidation()) {
        return;
      }

      dispatch(setLoading(true));
      const data = {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      };
      dispatch(
        login({
          data,
          onSuccess: (result) => {
            if (result.code < 210) {
              dispatch(setLoading(false));
              AsyncStorage.setItem(
                Strings.ACCESS_TOKEN_KEY,
                result.access_token
              );
              AsyncStorage.setItem(Strings.LOGIN_DATA, JSON.stringify(result));
              AsyncStorage.setItem(Strings.IS_CREATE_PROFILE, 'true');
              AsyncStorage.setItem(Strings.IS_VERIFICATION, 'true');
              navigation.reset({
                index: 0,
                routes: [{ name: RouteName.HOMESTACK }],
              });
              toast(result?.message);
            } else {
              dispatch(setLoading(false));
            }
          },
          onError: (error) => {
            dispatch(setLoading(false));
            toast(error?.error?.message || error?.message);
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  // const responseGoogle = response => {
  //   const provider = new GoogleAuthProvider();
  //   provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  //   const auth = getAuth();
  //   console.log('response type >>>>', response);
  //   provider.setCustomParameters(response);
  //   signInWithPopup(auth, provider)
  //     .then(result => {
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       const user = result.user;
  //       console.log(' firebase token ', token);
  //       // ...
  //     })
  //     .catch(error => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  //   // const googleCredential = auth.GoogleAuthProvider.credential(
  //   //   userInfo?.idToken,
  //   // );
  // };

  // const {linkedInLogin} = useLinkedIn({
  //   redirectUri: 'https://www.linkedin.com/developers/tools/oauth/redirect',
  //   clientId: '78wgmz0j48ogg9',
  //   onSuccess: code => {
  //     console.log(code);
  //   },
  //   onError: error => {
  //     console.log(error);
  //   },
  //   scope: 'r_emailaddress r_liteprofile',
  // });
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
                dispatch(setLoading(false));
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
                dispatch(setLoading(false));
              }
            } else {
              dispatch(setLoading(false));
            }
          },
          onError: (error) => {
            dispatch(setLoading(false));
            // Toast.show('Something went wrong.');
          },
        })
      );
    } catch (err) {}
  };

  const { linkedInLogin } = useLinkedIn({
    clientId: '86oqhtj40bpw96',
    redirectUri: 'http://localhost:3000/linkedIn',
    onSuccess: (code) => {
      console.log('code//', code);
      getLinkedInToken(code);
    },
    scope: 'r_emailaddress r_liteprofile',
    closePopupMessage: 'Hello there',
    onError: (error) => {
      console.log(error);
      // setErrorMessage(error.errorMessage);
    },
  });

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

  const signInWithLinkedIn = () => {
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
  return (
    <>
      <ScrollView bounces={false} style={{ flex: 1 }}>
        <View style={style.webContainer}>
          <SafeAreaView
            style={[
              style.scrollView,
              {
                paddingVertical: window.height * 0.08,
                marginVertical: isNative ? 0 : window.height * 0.03,
              },
            ]}
          >
            <Text style={[style.selectText]}>{Strings.LOGIN}</Text>
            <CustomInputText
              marginTop={window.height * 0.05}
              marginBottom={window.height * 0.02}
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
              fontSize={fontResize(height * 0.022)}
              keyboardType={'email-address'}
              placeholder={'example@domain.com'}
              window={window}
              isError={emailErr != ''}
              errorMessage={emailErr}
            />
            <CustomInputText
              marginBottom={window.height * 0.02}
              marginLeft={'10%'}
              label={Strings.PASSWORD}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordErr) {
                  if (text.length === 0) {
                    setPasswordErr(Strings.INVALID_PASSWORD);
                  } else if (text.length > 5 == false) {
                    setPasswordErr(Strings.INVALID_PASSWORD_LENGTH);
                  } else {
                    setPasswordErr('');
                  }
                }
              }}
              fontSize={fontResize(height * 0.022)}
              placeholder={'***********'}
              secureTextEntry
              window={window}
              isError={passwordErr != ''}
              errorMessage={passwordErr}
            />
            <CustomText
              fontSize={fontResize(height * 0.019)}
              textAlign={'left'}
              textColor={Colors.Blueberry}
              textLine={'underline'}
              marginLeft={isNative ? '0px' : '10%'}
              onPress={() => navigation.navigate(RouteName.FORGET_PASSWORD)}
              fontFamily={'Gilroy-SemiBold'}
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
              fontSize={fontResize(height * 0.022)}
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
                fontSize={fontResize(height * 0.016)}
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
              marginTop={window.height * 0.001}
              marginBottom={window.height * 0.01}
              width={isNative ? '96%' : '56%'}
              height={window.height * 0.1}
            >
              <ButtonContainer
                onPress={() => facebookSigin()}
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

              {/* <FacebookProvider appId={facebookAppId}>
                <FBLogin
                  scope="email"
                  onCompleted={data => {
                    console.log('facebookData>>>', data);
                  }}
                  onError={() => {}}>
                  {({loading, handleClick, error, data}) => (
                    <ButtonContainer
                      onPress={handleClick}
                      width={isNative ? window.width * 0.2 : '20%'}
                      height={'50px'}
                      padding={'1px'}
                      backgroundColor={'transparent'}>
                      <Image
                        resizeMode={'contain'}
                        width={'100%'}
                        height={'100%'}
                        source={Facebook}
                      />
                    </ButtonContainer>
                  )}
                </FBLogin>
              </FacebookProvider> */}

              <ButtonContainer
                onPress={linkedInLogin}
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

              {/* <AppleSignin
                authOptions={{
                  clientId: 'com.geektech.axesseq',
                  scope: 'email name',
                  redirectURI:
                    'https://axesseq-web.drxx0pr676ahm.amplifyapp.com',
                  state: 'state',
                  nonce: 'nonce',

                  usePopup: true,
                }}
                onSuccess={response => console.log(response)}
                onError={error => console.error(error)}
                iconProp={{style: {marginTop: '10px'}}}
                render={props => (
                  <ButtonContainer
                    {...props}
                    onPress={props.onClick}
                    width={isNative ? window.width * 0.2 : '20%'}
                    height={'50px'}
                    padding={'1px'}
                    backgroundColor={'transparent'}>
                    {console.log('apple>>>', props)}
                    <Image
                      resizeMode={'contain'}
                      width={'100%'}
                      height={'100%'}
                      source={Apple}
                    />
                  </ButtonContainer>
                )}
              /> */}

              <ButtonContainer
                onPress={() => signinApple()}
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
            </CustomView>

            <CustomText
              textColor={Colors.drakGray}
              fontSize={fontResize(height * 0.018)}
              marginBottom={window.height * 0.02}
              marginLeft={isNative ? '0px' : '10%'}
              fontFamily={'Gilroy-Regular'}
              textAlign={'left'}
            >
              {Strings.DO_NOT}
              <CustomText
                onPress={() => {
                  navigation.navigate(RouteName.SIGNUP);
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
              fontSize={fontResize(height * 0.016)}
              fontFamily={'Gilroy-Regular'}
              textAlign={'left'}
            >
              {Strings.BY_CLICK_LOGIN}
              <CustomText
                onPress={() => {
                  navigation.navigate(RouteName.TERMS_CONDITION);
                }}
                fontFamily={'Gilroy-Regular'}
                textColor={Colors.Blueberry}
              >
                {Strings.TERMS_CONDITIONS}
              </CustomText>
              {Strings.AND}
              <CustomText
                onPress={() => {
                  navigation.navigate(RouteName.PRIVACY_POLICY);
                }}
                fontFamily={'Gilroy-Regular'}
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

export default Login;
