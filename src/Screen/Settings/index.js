/* eslint-disable default-case */
import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingUserProfile from './Component/SettingUserProfile';
import { useSelector, useDispatch } from 'react-redux';
import { style } from './style';
import Strings from '../../Resources/Strings';
import {
  ADD_USER,
  backIcon,
  BellIcon,
  BlockUser,
  deleteAccount,
  FaqIcon,
  Logout,
  PaymentIcon,
  PolicyIcon,
  SettingsIcon,
  SettingsImg,
  SubScriptions,
  SupportIcon,
  TermsIcon,
  Tutorial,
  WhiteBlockUser,
} from '../../Resources/assets';
import CustomTabView from './Component/CustomTabView';
import CustomButton from '../../Component/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  deleteUserAccount,
  logoutUserAccount,
  reset,
  setToken,
  setUserData,
} from '../../Redux/actions/authAction';
import { setProfileData } from '../../Redux/actions/profileAction';
import { RouteName } from '../../Navigation/routeName';
import { theme } from '../../Util/constant';
import { fontResize } from '../../Util/font';
import Colors from '../../Resources/Colors';
import Header from '../../Component/Header/Header';

const Settings = ({ navigation }) => {
  const userInfo = useSelector((state) => state?.profile?.myProfile);
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const userData = useSelector((state) => state.auth.userData);
  const selectUser = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;
  const settingData =
    selectUser == Strings.PROFESSIONAL
      ? [
          {
            name: Strings.PAYMENT,
            image: PaymentIcon,
          },
          {
            name: Strings.NOTIFICATIONS,
            image: BellIcon,
          },
          {
            name: Strings.FAQ,
            image: FaqIcon,
          },
          {
            name: Strings.SUPPORT,
            image: SupportIcon,
          },
          {
            name: Strings.TERMS_CONDITION,
            image: TermsIcon,
          },
          {
            name: Strings.PRIVACY_POLICY,
            image: PolicyIcon,
          },
          {
            name: Strings.SUBSCRIPTIONS,
            image: SubScriptions,
          },
          {
            name: Strings.APP_TUTORIAL,
            image: Tutorial,
          },
          {
            name: Strings.PRIVACY_SETTINGS,
            image: SettingsIcon,
          },
          {
            name: Strings.BLOCK,
            image: WhiteBlockUser,
          },
        ]
      : [
          {
            name: Strings.PAYMENT,
            image: PaymentIcon,
          },
          {
            name: Strings.NOTIFICATIONS,
            image: BellIcon,
          },
          {
            name: Strings.FAQ,
            image: FaqIcon,
          },
          {
            name: Strings.SUPPORT,
            image: SupportIcon,
          },
          {
            name: Strings.TERMS_CONDITION,
            image: TermsIcon,
          },
          {
            name: Strings.PRIVACY_POLICY,
            image: PolicyIcon,
          },
          {
            name: Strings.APP_TUTORIAL,
            image: Tutorial,
          },
          {
            name: Strings.PRIVACY_SETTINGS,
            image: SettingsIcon,
          },
          {
            name: Strings.BLOCK,
            image: WhiteBlockUser,
          },
        ];

  const logout = async () => {
    AsyncStorage.removeItem(Strings.ACCESS_TOKEN_KEY);
    AsyncStorage.removeItem(Strings.LOGIN_DATA);
    dispatch(setToken(''));
    dispatch(setUserData(''));
    dispatch(setProfileData([]));
    dispatch(reset([]));
    navigation.reset({
      index: 0,
      routes: [{ name: RouteName.AUTH }],
    });
  };
  const logoutButtonPress = () => {
    Alert.alert('Confirm Logout', 'Are your sure you want to logout?', [
      {
        text: 'Yes',
        onPress: () => logoutAccount(),
      },
      { text: 'No', onPress: () => {} },
    ]);
  };

  const logoutAccount = () => {
    try{
    dispatch(
      logoutUserAccount({
        onSuccess: (result) => {
          logout();
        },
        onError: (error) => {
          logout();
          console.log('err>>>', error);
        },
      })
    );
    }
    catch(err){
      logout();
    }
  };

  const deleteAccountPress = () => {
    Alert.alert(
      'Confirm Delete Account',
      'Are your sure you want to delete account?. if you delete account then you will lost your data',
      [
        {
          text: 'Yes',
          onPress: () => deleteAccountUser(),
        },
        { text: 'No', onPress: () => {} },
      ]
    );
  };

  const deleteAccountUser = () => {
    dispatch(
      deleteUserAccount({
        onSuccess: (result) => {
          logout();
        },
        onError: (error) => {
          console.log('err>>>', error);
        },
      })
    );
  };

  const swichAnotherScreen = (index) => {
    switch (index) {
      case 0:
        navigation.navigate(RouteName.PAYMENT);
        break;
      case 1:
        navigation.navigate(RouteName.NOTIFICATION);
        break;
      case 2:
        navigation.navigate(RouteName.FAQ);
        break;
      case 3:
        navigation.navigate(RouteName.SUPPORT);
        break;
      case 4:
        navigation.navigate(RouteName.TERMS_CONDITION, {
          isLogin: false,
        });
        break;
      case 5:
        navigation.navigate(RouteName.PRIVACY_POLICY);
        break;
      case 6:
        navigation.navigate(RouteName.APP_TUTORIAL);
        break;
      case 7:
        navigation.navigate(RouteName.PRIVACY_SETTINGS);
        break;
      case 8:
        navigation.navigate(RouteName.BLOCK_USER_DATA);
        break;
    }
  };

  const swichProfAnotherScreen = (index) => {
    switch (index) {
      case 0:
        navigation.navigate(RouteName.PAYMENT);
        break;
      case 1:
        navigation.navigate(RouteName.NOTIFICATION);
        break;
      case 2:
        navigation.navigate(RouteName.FAQ);
        break;
      case 3:
        navigation.navigate(RouteName.SUPPORT);
        break;
      case 4:
        navigation.navigate(RouteName.TERMS_CONDITION, {
          isLogin: false,
        });
        break;
      case 5:
        navigation.navigate(RouteName.PRIVACY_POLICY);
        break;
      case 6:
        navigation.navigate(
          selectUser == Strings.PROFESSIONAL
            ? RouteName.SUBSCRIPTIONS
            : RouteName.PRIVACY_SETTINGS
        );
        break;
      case 7:
        navigation.navigate(RouteName.APP_TUTORIAL);
        break;
      case 8:
        navigation.navigate(RouteName.PRIVACY_SETTINGS);
        break;
      case 9:
        navigation.navigate(RouteName.BLOCK_USER_DATA);
        break;
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <CustomTabView
        image={item.image}
        text={item.name}
        width={width}
        height={height}
        onPress={() => {
          selectUser == Strings.PROFESSIONAL
            ? swichProfAnotherScreen(index)
            : swichAnotherScreen(index);
        }}
        containerStyle={{ marginHorizontal: '5%' }}
      />
    );
  };

  return (
    <SafeAreaView style={style.container}>
      {selectUser == Strings.PROFESSIONAL ? (
        <Header
          isLeftIcon={true}
          leftImage={backIcon}
          fontSize={fontResize(22)}
          leftButtonPress={() => {
            navigation.goBack();
          }}
          fontFamily={'Gilroy-Bold'}
          headerText={Strings.SETTINGS}
          bgColor={'transparent'}
        />
      ) : (
        <Text
          style={{
            ...theme.fontBold,
            fontSize: fontResize(24),
            color: Colors.Black,
            marginVertical: 10,
            marginBottom: 20,
            marginHorizontal: '5%',
          }}
        >
          {Strings.SETTINGS}
        </Text>
      )}

      <SettingUserProfile
        userInfo={userInfo}
        width={width}
        height={height}
        onPress={() =>
          navigation.navigate(
            selectUser == Strings.PROFESSIONAL
              ? RouteName.EDIT_PROFILE_SETTING
              : RouteName.RECUITER_PROFILE
          )
        }
      />

      <FlatList
        bounces={false}
        data={settingData}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListFooterComponent={
          <View
            style={{
              paddingVertical: 16,
              marginHorizontal: '5%',
              marginTop: '8%',
            }}
          >
            <CustomButton
              height={'60px'}
              buttonContainer={[style.buttonStyle, { marginBottom: '5%' }]}
              text={Strings.DELETE_ACCOUNT}
              textColor={'#EA4335'}
              buttonImage={deleteAccount}
              onPress={() => deleteAccountPress()}
              // onPress={() => {
              //   navigation.navigate(RouteName.DELETE_USER);
              // }}
              fontFamily={"'Gilroy-SemiBold'"}
              fontSize={'16px'}
              isLeftImage
              imageStyle={style.imageStyle}
            />
            <CustomButton
              height={'60px'}
              buttonContainer={style.buttonStyle}
              text={Strings.LOGOUT}
              textColor={'#EA4335'}
              buttonImage={Logout}
              onPress={() => logoutButtonPress()}
              fontFamily={"'Gilroy-SemiBold'"}
              fontSize={'16px'}
              isLeftImage
              imageStyle={style.imageStyle}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Settings;
