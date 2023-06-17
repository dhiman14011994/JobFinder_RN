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

import { signUp, setLoading, sendOtp } from '../../Redux/actions/authAction';
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
import { CustomText } from '../../Component/CustomComponent';
import CustomInputText from '../../Component/CustomInputText';
import CustomEmailView from '../../Component/CustomEmailText';
import { updatePassword } from '../../Redux/services/authService';

const ChangePassword = ({ navigation, route }) => {
  const { height, width } = useWindowDimensions();
  //   const {name, email, password, role} = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('');
  const authToken = useSelector((state) => state.auth.token);
  console.log('token>>', authToken);
  const dispatch = useDispatch();

  const onValidation = () => {
    var isValid = true;
    if (password.length === 0) {
      isValid = false;
      toast(Strings.INVALID_PASSWORD);
      setPasswordErr(Strings.INVALID_PASSWORD);
      return isValid;
    }
    if (password.length > 5 == false) {
      isValid = false;
      toast(Strings.INVALID_PASSWORD_LENGTH);
      setPasswordErr(Strings.INVALID_PASSWORD_LENGTH);
      return isValid;
    }
    if (confirmPassword.length === 0) {
      isValid = false;
      toast(Strings.INVALID_PASSWORD);
      setConfirmPasswordErr(Strings.INVALID_PASSWORD);
      return isValid;
    }
    if (confirmPassword.length > 5 == false) {
      isValid = false;
      toast(Strings.INVALID_PASSWORD_LENGTH);
      setConfirmPasswordErr(Strings.INVALID_PASSWORD_LENGTH);
      return isValid;
    }
    if (confirmPassword !== password) {
      isValid = false;
      toast(Strings.PASSWORD_MATCH);
      setConfirmPasswordErr(Strings.PASSWORD_MATCH);
      return isValid;
    }
    return isValid;
  };

  const onPressContinue = async () => {
    if (!onValidation()) {
      return;
    }

    const data = {
      new_password: password,
      confirm_password: confirmPassword,
    };
    const form = {
      token: authToken,
      data: data,
    };
    const changePasswordData = await updatePassword(form);
    console.log('changePasswordData>>>', changePasswordData);

    if (changePasswordData?.code == 200) {
      toast(changePasswordData.message);
      navigation.reset({
        index: 0,
        routes: [{ name: RouteName.LOGIN }],
      });
    }
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
              <TextComponent isNative={isNative}>
                {Strings.CHANGE_PASSWORD}
              </TextComponent>
              <CustomText
                style={{ lineHeight: 24 }}
                fontFamily={'Gilroy-Regular'}
                textColor={Colors.DimGray}
                marginTop={10}
                fontSize={10}
              >
                {Strings.CHANGE_PASSWORD_DETAILS}
              </CustomText>
              <CustomEmailView
                onChange={(text) => {
                  setPassword(text);
                  if (text.length < 5 == false) {
                    setPasswordErr('');
                  }
                }}
                title={Strings.NEW_PASSWORD}
                secureTextEntry
                placeholder={'***********'}
                errMsg={passwordErr}
              />
              <CustomEmailView
                onChange={(text) => {
                  setConfirmPassword(text);
                  if (text.length < 5 == false) {
                    setConfirmPasswordErr('');
                  }
                  if (confirmPassword == password) {
                    setConfirmPasswordErr('');
                  }
                }}
                title={Strings.CONFIRM_PASSWORD}
                secureTextEntry
                placeholder={'***********'}
                errMsg={confirmPasswordErr}
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

export default ChangePassword;
