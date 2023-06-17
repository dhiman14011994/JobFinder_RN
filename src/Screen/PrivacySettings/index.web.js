import React, { Component, useState, useEffect } from 'react';
import Strings from '../../Resources/Strings';
import { CustomText } from '../../Component/CustomComponent';
import {
  Image,
  useWindowDimensions,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native-web';
import { fontResize } from '../../Util/font';
import { mxWidth } from '../../Util';
import Colors from '../../Resources/Colors';
import { theme } from '../../Util/constant';
import { check } from '../../Resources/assets';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../Redux/actions/authAction';
import {
  fetchAllSupportTicket,
  fetchSingleSupportTicketChat,
  privacySettingChanges,
  sendMessageSupport,
  getPrivacySetting,
} from '../../Redux/actions/profileAction';
import CustomButton from '../../Component/CustomButton';

const PrivacySettings = () => {
  const window = useWindowDimensions();
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
          console.log('Results fetch fetchMyProfile', result);
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
          console.log('git status', result);
          fetchPrivacyData();
          dispatch(setLoading(false));
        },
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };

  return (
    <ScrollView bounces={false}>
      <View
        style={{
          width: window.width,
          height: window.height * 0.9,
          paddingVertical: window.height * 0.03,
          paddingHorizontal: window.width * 0.1,
          backgroundColor: Colors.White,
          borderRadius: window.width * 0.01,
        }}
      >
        <CustomText
          style={{
            width: window.width,
            paddingVertical: window.height * 0.03,
          }}
          textAlign={'left'}
          fontFamily={'Gilroy-bold'}
          fontSize={fontResize(mxWidth * 0.02)}
        >
          {Strings.PRIVACY_SETTINGS}
        </CustomText>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '50%', flexDirection: 'column' }}>
            <CustomText
              fontSize={fontResize(mxWidth * 0.011)}
              style={{ paddingVertical: window.height * 0.01 }}
              textColor={Colors.lightGray}
              {...theme.fontRegular}
            >
              Select the details that you want to remain hidden in your profile
            </CustomText>

            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <CustomText
                style={{
                  paddingVertical: window.height * 0.03,
                }}
                textAlign={'left'}
                fontFamily={'Gilroy-bold'}
                fontSize={fontResize(mxWidth * 0.013)}
              >
                Basic Info
              </CustomText>

              <View
                style={{
                  marginLeft: 20,
                  backgroundColor: Colors.gray2,
                  height: 2,
                  width: '60%',
                  alignSelf: 'center',
                }}
              ></View>
            </View>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => {
                setSettingData({ ...settingData, ['name']: !settingData.name });
                console.log('SettingData', settingData.name);
              }}
            >
              <View style={styles.checkboxView}>
                {settingData.name ? (
                  <Image
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                    source={check}
                  />
                ) : (
                  ''
                )}
              </View>
              <Text style={styles.label}>Name</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => {
                setSettingData({
                  ...settingData,
                  ['address']: !settingData.address,
                });
              }}
            >
              <View style={styles.checkboxView}>
                {settingData.address ? (
                  <Image
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                    source={check}
                  />
                ) : (
                  ''
                )}
              </View>
              <Text style={styles.label}>Address</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => {
                setSettingData({
                  ...settingData,
                  ['started_date']: !settingData.started_date,
                });
              }}
            >
              <View style={styles.checkboxView}>
                {settingData.started_date ? (
                  <Image
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                    source={check}
                  />
                ) : (
                  ''
                )}
              </View>
              <Text style={styles.label}>Started Date</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: '50%', flexDirection: 'column' }}>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <CustomText
                style={{
                  paddingBottom: window.height * 0.03,
                }}
                textAlign={'left'}
                fontFamily={'Gilroy-bold'}
                fontSize={fontResize(mxWidth * 0.013)}
              >
                Contact Info
              </CustomText>

              <View
                style={{
                  marginLeft: 20,
                  backgroundColor: Colors.gray2,
                  height: 2,
                  width: '60%',
                  alignSelf: 'center',
                }}
              ></View>
            </View>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => {
                setSettingData({
                  ...settingData,
                  ['email_address']: !settingData.email_address,
                });
              }}
            >
              <View style={styles.checkboxView}>
                {settingData.email_address ? (
                  <Image
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                    source={check}
                  />
                ) : (
                  ''
                )}
              </View>
              <Text style={styles.label}>Email Address</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => {
                setSettingData({
                  ...settingData,
                  ['phone_number']: !settingData.phone_number,
                });
              }}
            >
              <View style={styles.checkboxView}>
                {settingData.phone_number ? (
                  <Image
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                    source={check}
                  />
                ) : (
                  ''
                )}
              </View>
              <Text style={styles.label}>Phone Number</Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <CustomText
                style={{
                  paddingVertical: window.height * 0.03,
                }}
                textAlign={'left'}
                fontFamily={'Gilroy-bold'}
                fontSize={fontResize(mxWidth * 0.013)}
              >
                About
              </CustomText>

              <View
                style={{
                  marginLeft: 20,
                  backgroundColor: Colors.gray2,
                  height: 2,
                  width: '60%',
                  alignSelf: 'center',
                }}
              ></View>
            </View>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => {
                setSettingData({
                  ...settingData,
                  ['about_me']: !settingData.about_me,
                });
              }}
            >
              <View style={styles.checkboxView}>
                {settingData.about_me ? (
                  <Image
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                    source={check}
                  />
                ) : (
                  ''
                )}
              </View>
              <Text style={styles.label}>About Me</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => {
                setSettingData({
                  ...settingData,
                  ['work_experience']: !settingData.work_experience,
                });
              }}
            >
              <View style={styles.checkboxView}>
                {settingData.work_experience ? (
                  <Image
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                    source={check}
                  />
                ) : (
                  ''
                )}
              </View>
              <Text style={styles.label}>Work Experience</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => {
                setSettingData({
                  ...settingData,
                  ['certificates']: !settingData.certificates,
                });
              }}
            >
              <View style={styles.checkboxView}>
                {settingData.certificates ? (
                  <Image
                    resizeMode="contain"
                    style={{ width: 20, height: 20 }}
                    source={check}
                  />
                ) : (
                  ''
                )}
              </View>
              <Text style={styles.label}>Certificates</Text>
            </TouchableOpacity>
          </View>
        </View>
        <CustomButton
          onPress={saveChanges}
          width={'40%'}
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
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignContent: 'center',
    paddingVertical: 5,
  },

  label: {
    marginLeft: 20,
    color: Colors.drakGray,
    textAlign: 'left',
    fontFamily: 'Gilroy-Regular',
    fontSize: fontResize(mxWidth * 0.01),
  },
  checkboxView: {
    width: 25,
    height: 25,
    borderColor: Colors.drakGray,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PrivacySettings;
