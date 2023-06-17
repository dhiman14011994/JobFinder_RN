import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../Component/CustomHeader';
import { backIcon } from '../../Resources/assets';
import Colors from '../../Resources/Colors';
import { CustomText } from '../../Component/CustomComponent';
import { theme } from '../../Util/constant';
import { fontResize } from '../../Util/font';
import CheckBox from '@react-native-community/checkbox';
import { RouteName } from '../../Navigation/routeName';
import Strings from '../../Resources/Strings';
import CustomButton from '../../Component/CustomButton';
import {
  fetchAllSupportTicket,
  fetchSingleSupportTicketChat,
  privacySettingChanges,
  sendMessageSupport,
  getPrivacySetting,
} from '../../Redux/actions/profileAction';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../Redux/actions/authAction';

const PrivacySettings = ({ navigation }) => {
  const dispatch = useDispatch();
  const privacyData = useSelector((state) => state?.profile?.privacySetting);
  const [settingData, setSettingData] = useState({
    name: privacyData?.name || false,
    address: privacyData?.address || false,
    started_date: privacyData?.started_date || false,
    email_address: privacyData?.email_address || false,
    phone_number: privacyData?.phone_number || false,
    about_me: privacyData?.about_me || false,
    work_experience: privacyData?.work_experience || false,
    certificates: privacyData?.certificates || false,
  });

  useEffect(() => {
    fetchPrivacyData();
  }, []);

  const fetchPrivacyData = () => {
    dispatch(
      getPrivacySetting({
        onSuccess: (result) => {
          let updateData = {
            name: result?.data?.name || false,
            address: result?.data?.address || false,
            started_date: result?.data?.started_date || false,
            email_address: result?.data?.email_address || false,
            phone_number: result?.data?.phone_number || false,
            about_me: result?.data?.about_me || false,
            work_experience: result?.data?.work_experience || false,
            certificates: result?.data?.certificates || false,
          };
          setSettingData(updateData);
        },
        onError: (error) => {
          console.log('error', error);
        },
      })
    );
  };

  const saveChanges = () => {
    let param = settingData;
    dispatch(
      privacySettingChanges({
        param,
        onSuccess: (result) => {
          fetchPrivacyData();
          setTimeout(() => {
            navigation.goBack();
          }, 200);

          dispatch(setLoading(false));
        },
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };

  const renderSectionTitle = (title) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 12,
          alignItems: 'center',
        }}
      >
        <CustomText
          fontSize={`${fontResize(16)}px`}
          textTransform={'capitalize'}
          {...theme.fontBold}
        >
          {title}
        </CustomText>
        <View
          style={{
            height: 0.5,
            flex: 1,
            marginLeft: 16,
            backgroundColor: Colors.DimGray,
          }}
        />
      </View>
    );
  };

  const renderCheckBoxWithTitle = (value, type) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          alignItems: 'center',
        }}
      >
        <CheckBox
          disabled={false}
          value={settingData[type]}
          onFillColor={Colors.Blueberry}
          onCheckColor={'#ffffff'}
          onTintColor={'#ffffff'}
          tintColors={({ true: '#0c437c' }, { false: '#d4d4d4' })}
          boxType={'square'}
          onAnimationType={'stroke'}
          onValueChange={(newValue) => {
            setSettingData({ ...settingData, [type]: newValue });
          }}
        />
        <CustomText
          fontSize={`${fontResize(16)}px`}
          marginLeft={'12px'}
          textTransform={'capitalize'}
          {...theme.fontRegular}
        >
          {value}
        </CustomText>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.White }}>
      <CustomHeader
        leftButtons={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 12 }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 26, width: 26 }}
              source={backIcon}
            />
          </TouchableOpacity>
        }
        rightButtons={<></>}
        title={'Privacy Settings'}
      />
      <ScrollView bounces={false}>
        <View style={{ paddingHorizontal: 22 }}>
          <CustomText
            fontSize={`${fontResize(14)}px`}
            textTransform={'capitalize'}
            {...theme.fontRegular}
          >
            {
              'Select the details that you want to remain hidden in your profile'
            }
          </CustomText>
          {renderSectionTitle('Basic info')}
          {renderCheckBoxWithTitle('Name', 'name')}
          {renderCheckBoxWithTitle('Address', 'address')}
          {renderCheckBoxWithTitle('Stated Date', 'started_date')}
          {renderSectionTitle('Contact info')}
          {renderCheckBoxWithTitle('Email Address', 'email_address')}
          {renderCheckBoxWithTitle('Phone Number', 'phone_number')}
          {renderSectionTitle('About')}
          {renderCheckBoxWithTitle('About Me', 'about_me')}
          {renderCheckBoxWithTitle('Work Experience', 'work_experience')}
          {renderCheckBoxWithTitle('Certificates', 'certificates')}
          <CustomButton
            onPress={saveChanges}
            width={'100%'}
            height={'50px'}
            backgroundColor={Colors.Blueberry}
            marginTop={'16px'}
            marginBottom={'16px'}
            borderRadius={'10px'}
            alignItems={'center'}
            justifyContent={'center'}
            {...theme.fontSemiBold}
            fontSize={'18px'}
            textColor={Colors.White}
            text={Strings.SAVE_CHANGE}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacySettings;
