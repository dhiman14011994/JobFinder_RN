import {
  View,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  StyleSheet,
  Text,
  Dimensions,
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
import { CustomText } from '../../Component/CustomComponent';
import CustomButton from '../../Component/CustomButton';
import { RouteName } from '../../Navigation/routeName';
import { backIcon } from '../../Resources/assets';
import { isNative, mxHeight } from '../../Util';
import Colors from '../../Resources/Colors';
import Strings from '../../Resources/Strings';
import index from '../../Component/CustomButton';
import { setLoading, sendOtp, verifyOtp } from '../../Redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import SimpleToast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fontResize } from '../../Util/font';
import { theme } from '../../Util/constant';

const OTPVerification = ({ navigation, route }) => {
  const { height, width } = Dimensions.get('screen');
  const inputs = React.useRef([]);
  const {
    phoneNumber,
    countryCode,
    token,
    isForgetPassword,
    isSocial,
    result,
  } = route.params;
  var textInputs = [];
  var otp = [];
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  const [isError, setError] = useState(false);
  const [errMessage, setErrorMessage] = useState('');
  const [oldotp, setOldOtp] = useState(['', '', '', '']);
  useEffect(() => {}, []);

  const onTextChange = (text, index) => {
    if (text.length === 2) {
      inputs.current[index + 1].focus();
    } else {
      var updateOtp = [...oldotp];
      updateOtp[index] = text;
      otp[index] = text;
      setOldOtp(updateOtp);
      console.log('updateOtp', updateOtp);
      if (text.length === 1 && index < textInputs.length - 1) {
        inputs.current[index + 1].focus();
      } else {
        inputs.current[textInputs.length - 1].blur();
      }
    }
    if (isError) {
      if (index == 3) {
        if (
          text !== '' ||
          oldotp[0] !== '' ||
          oldotp[1] !== '' ||
          oldotp[2] !== ''
        ) {
          setError(false);
        }
      } else if (index == 2) {
        if (
          text !== '' ||
          oldotp[0] !== '' ||
          oldotp[1] !== '' ||
          oldotp[3] !== ''
        ) {
          setError(false);
        }
      } else if (index == 1) {
        if (
          text !== '' ||
          oldotp[0] !== '' ||
          oldotp[2] !== '' ||
          oldotp[3] !== ''
        ) {
          setError(false);
        }
      } else if (index == 0) {
        if (
          text !== '' ||
          oldotp[1] !== '' ||
          oldotp[2] !== '' ||
          oldotp[3] !== ''
        ) {
          setError(false);
        }
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
    if (e.nativeEvent.key === 'Backspace' && i !== 0) {
      inputs.current[i - 1].focus();
    }
  };

  for (let i = 0; i < 4; i += 1) {
    textInputs.push(
      <TextInput
        ref={(e) => {
          inputs.current[i] = e;
        }}
        style={[
          {
            width: width * 0.16,
            height: width * 0.16,
            fontSize: 16,
            textAlign: 'center',
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: 'white',

            color: Colors.Black,
            borderColor: isError
              ? oldotp[i] == ''
                ? 'red'
                : Colors.Black
              : Colors.Black,
          },
          isNative ? {} : { outlineColor: `${Colors.Blueberry}` },
        ]}
        onKeyPress={(e) => onKeyPress(e, i)}
        autoFocus={i === 0}
        value={otp[i]}
        maxLength={1}
        onTouchStart={() => {
          inputs.current[i].focus();
        }}
        // onFocus={() => onInputFocus(i)}
        onChangeText={(text) => onTextChange(text, i)}
        keyboardType="phone-pad"
      />
    );
  }

  const onValidation = () => {
    console.log('otpVerification', oldotp);
    var isValid = true;

    if (
      oldotp[0] == '' &&
      oldotp[1] == '' &&
      oldotp[2] == '' &&
      oldotp[3] == ''
    ) {
      isValid = false;
      setError(true);
      setErrorMessage('Please enter otp');
    } else if (
      oldotp[0] == '' ||
      oldotp[1] == '' ||
      oldotp[2] == '' ||
      oldotp[3] == ''
    ) {
      isValid = false;
      setError(true);
      setErrorMessage('Some otp field are empty');
    }

    return isValid;
  };

  const onPressVerify = () => {
    try {
      if (!onValidation()) {
        return;
      }
      dispatch(setLoading(true));
      const data = {
        token: token,
        data: {
          otp: oldotp.join(''),
        },
      };

      dispatch(
        verifyOtp({
          data,
          onSuccess: (res) => {
            if (res.code < 210) {
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
              setOldOtp(['', '', '', '']);
            } else {
              dispatch(setLoading(false));
              console.log('data>>>', res);
            }
          },
          onError: (error) => {
            dispatch(setLoading(false));
            console.log('error onPressVerify', JSON.stringify(error));
            SimpleToast.show(error || 'Something went wrong.');
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const onPressResend = () => {
    try {
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
          onSuccess: (res) => {
            dispatch(setLoading(false));
          },
          onError: (error) => {
            dispatch(setLoading(false));
            console.log('error sendotp', JSON.stringify(error));
          },
        })
      );
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  return (
    <Wrapper>
      <View style={styles.container}>
        {/* Header */}
        {isNative && (
          <HeaderContainer marginTop={mxHeight * 0.08}>
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
              <View style={styles.scrollContainer}>
                <View>
                  <TextComponent
                    fontSize={fontResize(30)}
                    style={{ ...theme.fontBold }}
                    isNative={isNative}
                  >
                    {Strings.VERIFY_YOUR_PHONE}
                  </TextComponent>
                  <MessageVerificationText isNative={isNative}>
                    {`Verification code sent to your phone\n +${countryCode} ${phoneNumber}`}
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

                  {isError && (
                    <Text style={{ fontSize: 15, color: 'red', marginTop: 5 }}>
                      {errMessage}
                    </Text>
                  )}

                  <View>
                    <CustomText
                      textColor={Colors.drakGray}
                      fontSize={'16px'}
                      marginTop={window.height * 1}
                      marginBottom={window.height * 0.02}
                      marginLeft={isNative ? '0px' : '10%'}
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
                        fontFamily={'Gilroy-SemiBold'}
                        textLine={'underline'}
                        textColor={Colors.Blueberry}
                      >
                        {Strings.RESEND_OTP}
                      </CustomText>
                    </CustomText>
                  </View>
                </View>
                <View>
                  <CustomButton
                    height={height * 0.07}
                    backgroundColor={Colors.Blueberry}
                    borderRadius={'10px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    //   fontFamily={'Gilroy-SemiBold'}
                    onPress={() => {
                      onPressVerify();
                    }}
                    fontSize={'18px'}
                    textColor={Colors.White}
                    text={Strings.VERIFY}
                  />
                </View>
              </View>
            </ScrollViewContainer>
          </LoginContainer>
        </LoginContainerParent>
      </View>
    </Wrapper>
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
  scrollContainer: {
    height: Dimensions.get('screen').height * 0.78,
    justifyContent: 'space-between',
  },
});

export default OTPVerification;
