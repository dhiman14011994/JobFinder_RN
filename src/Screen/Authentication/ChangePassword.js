import {
  View,
  TouchableOpacity,
  Text,
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
import { backIcon } from '../../Resources/assets';
import { isNative } from '../../Util';
import CustomButton from '../../Component/CustomButton';
import Colors from '../../Resources/Colors';
import Strings from '../../Resources/Strings';
import { RouteName } from '../../Navigation/routeName';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { CustomText } from '../../Component/CustomComponent';
import { fontResize } from '../../Util/font';
import CustomInputText from '../../Component/CustomInputText';
import { updatePassword } from '../../Redux/services/authService';
import { theme } from '../../Util/constant';

const ChangePassword = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('');
  const window = Dimensions.get('screen');
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const onValidation = () => {
    var isValid = true;
    if (password.length === 0) {
      isValid = false;
      setPasswordErr(Strings.INVALID_NEW_PASSWORD);
    } else if (password.length > 5 == false) {
      isValid = false;
      setPasswordErr(Strings.INVALID_NEW_PASSWORD_LENGTH);
    }
    if (confirmPassword.length === 0) {
      isValid = false;
      setConfirmPasswordErr(Strings.CONFIRM_INVALID_PASSWORD);
    } else if (confirmPassword.length > 5 == false) {
      isValid = false;
      setConfirmPasswordErr(Strings.PASSWORD_NOT_MATCH);
    } else if (confirmPassword !== password) {
      isValid = false;
      setConfirmPasswordErr(Strings.PASSWORD_NOT_MATCH);
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
      token: token,
      data: data,
    };
    const changePasswordData = await updatePassword(form);

    if (changePasswordData?.code == 200) {
      Toast.show(changePasswordData.message);
      navigation.reset({
        index: 0,
        routes: [{ name: RouteName.LOGIN }],
      });
    }
  };

  return (
    <Wrapper>
      <View style={styles.container}>
        {isNative && (
          <HeaderContainer
            marginTop={window.height * 0.08}
            marginLeft={window.width * 0.05}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}
            >
              <BackButton resizeMode="contain" source={backIcon} />
            </TouchableOpacity>
          </HeaderContainer>
        )}
        <LoginContainerParent>
          <LoginContainer
            isNative={isNative}
            width={window.width}
            height={window.height}
          >
            <ScrollViewContainer bounces={false} isNative={isNative}>
              <View style={styles.scrollContainer}>
                <View>
                  <TextComponent
                    fontSize={fontResize(30)}
                    style={{ ...theme.fontBold }}
                    isNative={isNative}
                  >
                    {Strings.CHANGE_PASSWORD}
                  </TextComponent>

                  <CustomText
                    style={{ lineHeight: 24 }}
                    fontFamily={'Gilroy-Regular'}
                    textTransform={'none'}
                    textColor={Colors.DimGray}
                    marginTop={10}
                    marginBottom={window.height * 0.08}
                    fontSize={fontResize(16)}
                  >
                    {Strings.CHANGE_PASSWORD_DETAILS}
                  </CustomText>
                  <CustomInputText
                    marginBottom={window.height * 0.02}
                    label={Strings.NEW_PASSWORD}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (text.length < 5 == false) {
                        setPasswordErr('');
                      }
                    }}
                    // value={password}
                    placeholder={'***********'}
                    secureTextEntry
                    window={window}
                    isError={passwordErr != ''}
                    errorMessage={passwordErr}
                  />

                  <CustomInputText
                    marginBottom={window.height * 0.02}
                    label={Strings.CONFIRM_PASSWORD}
                    onChangeText={(text) => {
                      setConfirmPassword(text);
                      if (text.length < 5 == false) {
                        setConfirmPasswordErr('');
                      }
                      if (confirmPassword == password) {
                        setConfirmPasswordErr('');
                      }
                    }}
                    value={confirmPassword}
                    placeholder={'***********'}
                    secureTextEntry
                    window={window}
                    isError={confirmPasswordErr != ''}
                    errorMessage={confirmPasswordErr}
                  />
                </View>
                <View>
                  <CustomButton
                    height={window.height * 0.07}
                    backgroundColor={Colors.Blueberry}
                    borderRadius={'10px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    fontFamily={'Gilroy-SemiBold'}
                    fontSize={'18px'}
                    textColor={Colors.White}
                    textTransform={'none'}
                    onPress={() => {
                      onPressContinue();
                    }}
                    text={Strings.SET_PASSWORD}
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
    height: Dimensions.get('screen').height * 0.8,
    justifyContent: 'space-between',
  },
});

export default ChangePassword;
