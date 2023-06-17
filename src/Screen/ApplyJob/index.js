import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../Component/CustomHeader';
import {
  backIcon,
  applyJobSelectedIcon,
  uploadApplyJobIcon,
  UserPlaceholder,
} from '../../Resources/assets';
import Colors from '../../Resources/Colors';
import { CustomText } from '../../Component/CustomComponent';
import { theme } from '../../Util/constant';
import { fontResize } from '../../Util/font';
import FastImage from 'react-native-fast-image';
import { mxWidth } from '../../Util';
import EndPoint from '../../Redux/constants/EndPoint';
import { useSelector } from 'react-redux';
import DocumentPicker, { types } from 'react-native-document-picker';
import { useState } from 'react';
import {
  imageUplaod,
  sendPushNotificationService,
} from '../../Redux/services/profileService';
import CustomButton from '../../Component/CustomButton';
import Strings from '../../Resources/Strings';
import { useDispatch } from 'react-redux';
import { applyJobAction } from '../../Redux/actions/jobAndEventAction';
import { setLoading } from '../../Redux/actions/authAction';
import SuccessPopup from '../../Component/SuccessPopup';
import { fetchOtherProfile } from '../../Redux/actions/profileAction';
import { setNotificationData } from '../../Constants/FireStoremanager/FireStoremanager';
const ApplyJob = ({ navigation, route }) => {
  const userData = useSelector((state) => state.auth.userData.data);
  const auth = useSelector((state) => state.auth.userData);
  const { jobId, jobDetail } = route.params;
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [localeResumeFile, setLocaleResumeFile] = useState('');
  const [onSuccess, setOnSuccess] = useState(false);
  const [localeCoverLetterFile, setLocaleConverLetterFile] = useState('');
  const window = useWindowDimensions();
  const otherUserProfile = useSelector(
    (state) => state.profile.otherUserProfile
  );

  useEffect(() => {
    fetchOtherUserProfile();
  }, []);

  const fetchOtherUserProfile = () => {
    const userId = jobDetail.user_id;
    dispatch(
      fetchOtherProfile({
        userId,
        onSuccess: (result) => {},
        onError: (error) => {},
      })
    );
  };

  const applyUserJob = () => {
    try {
      if (selectedIndex === 1 && localeResumeFile === '') {
        return;
      }
      if (selectedIndex === 2 && localeCoverLetterFile === '') {
        return;
      }
      let params = {
        is_checked: selectedIndex === 0 ? true : false,
        job_id: jobId,
        upload_resume: localeResumeFile,
        cover_letter: localeCoverLetterFile,
      };
      dispatch(setLoading(true));
      dispatch(
        applyJobAction({
          params,
          onSuccess: async (result) => {
            if (result.data == '') {
              dispatch(setLoading(false));
              alert(result.message);
            } else {
              setOnSuccess(true);
              dispatch(setLoading(false));
              var chatId =
                userData?.user_id > jobDetail.user_id
                  ? `${userData?.user_id}${jobDetail.user_id}`
                  : `${jobDetail.user_id}${userData?.user_id}`;
              const notifcationParam = {
                registration_ids: [otherUserProfile?.device_token],
                data: {
                  my_custom_key: 'my_custom_value',
                  my_custom_key2: true,
                  name: otherUserProfile.name,
                  email: otherUserProfile.email,
                  phone: otherUserProfile.phone_number,
                  role: otherUserProfile.role,
                  image:
                    otherUserProfile?.image ||
                    otherUserProfile?.userinfo?.image,
                  userId: jobDetail.user_id,
                  chatId: chatId,
                },
                notification: {
                  title: `${userData.name} applied for ${jobDetail?.job_title} in ${jobDetail?.company_name}`,
                  description: 'data!',
                  icon: 'ic_notification',
                },
              };
              const sendNotification = await sendPushNotificationService(
                notifcationParam
              );
              const storeNotification = await setNotificationData({
                id: jobDetail.user_id,
                userData: {
                  name: userData.name || '',
                  email: userData.email || '',
                  phone: userData.phone_number || '',
                  role: userData.role || '',
                  image: userData?.image || userData?.userinfo?.image || '',
                  userId: userData.user_id,
                  chatId: chatId,
                  message: `${userData.name} applied for ${jobDetail?.job_title} in ${jobDetail?.company_name}`,
                  dateTime: new Date(),
                  job_id: jobId,
                },
              });
              dispatch(setLoading(false));
            }
          },
          onError: (error) => {
            // dispatch(setLoading(false));
            dispatch(setLoading(false));
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const applyJobAPi = () => {
    if (selectedIndex == 0) {
      // link_your_resume
      if (
        userData?.link_your_resume == '' ||
        userData?.link_your_resume == undefined ||
        userData?.link_your_resume == null
      ) {
        alert('Please upload resume manual.');
      } else {
        applyUserJob();
      }
    } else {
      applyUserJob();
    }
  };

  const fetchLocalFile = (type) => {
    try {
      dispatch(setLoading(true));
      DocumentPicker.pick({
        allowMultiSelection: true,
        type: [types.doc, types.docx, types.pdf],
      })
        .then(async (data) => {
          let imageData = {
            uri: data[0].uri,
            type: data[0].type,
            name: 'file.pdf',
          };

          const fileSize = data[0]?.size ? Number(data[0].size) / 1000000 : 0;

          if (fileSize < 20) {
            var getImageURI = await imageUplaod({
              file: imageData,
              token: auth?.access_token,
            });
            if (type === 'resume') {
              setLocaleResumeFile(`${getImageURI.data[0]}`);
              dispatch(setLoading(false));
            } else {
              setLocaleConverLetterFile(`${getImageURI.data[0]}`);
              dispatch(setLoading(false));
            }
          } else {
            alert(Strings.FILE_SIZE_TEXT);
            dispatch(setLoading(false));
          }
        })
        .catch((err) => {
          dispatch(setLoading(false));
          console.log('error', err, auth?.access_token);
        });
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.White }}>
      <CustomHeader
        leftButtons={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 6 }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 22, width: 22 }}
              source={backIcon}
            />
          </TouchableOpacity>
        }
        rightButtons={<></>}
        title={'Appy Now?'}
      />
      <View style={{ justifyContent: 'space-between' }}>
        <ScrollView
          bounces={false}
          style={{ paddingHorizontal: 22, marginVertical: 22 }}
        >
          <CustomText fontSize={fontResize(14)} {...theme.fontMedium}>
            {'Selected Apply Type'}
          </CustomText>

          {/* Axxess Profile Card */}
          <View style={{ paddingVertical: 16 }}>
            <CustomText
              fontSize={fontResize(14)}
              {...theme.fontMedium}
              style={{ color: Colors.Blueberry }}
            >
              {'Use AxessEQ Profile'}
            </CustomText>

            <TouchableOpacity
              onPress={() => setSelectedIndex(0)}
              style={{
                borderColor: Colors.Blueberry,
                borderWidth: 1,
                borderRadius: 16,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 22,
                paddingVertical: 20,
                backgroundColor: selectedIndex === 0 ? '#F6F8FF' : Colors.White,
                marginTop: 8,
              }}
            >
              {selectedIndex == 0 && (
                <View style={{ position: 'absolute', right: 0, top: -10 }}>
                  <Image
                    style={{ height: 18, width: 18 }}
                    source={applyJobSelectedIcon}
                  />
                </View>
              )}
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  height: mxWidth * 0.16,
                  width: mxWidth * 0.16,
                  borderRadius: mxWidth * 0.16,
                }}
                defaultSource={UserPlaceholder}
                source={
                  userData && userData?.image
                    ? {
                        uri: EndPoint.baseAssestURL + userData?.image,
                        priority: FastImage.priority.high,
                      }
                    : UserPlaceholder
                }
              />
              <View style={{ paddingHorizontal: 16 }}>
                <CustomText
                  fontSize={fontResize(16)}
                  {...theme.fontSemiBold}
                  style={{ color: Colors.Black }}
                >
                  {userData && userData.name}
                </CustomText>
                <CustomText
                  fontSize={fontResize(14)}
                  {...theme.fontRegular}
                  style={{ color: Colors.DimGray, paddingTop: 8 }}
                >
                  {userData && userData.skill}
                </CustomText>
              </View>
            </TouchableOpacity>
          </View>

          {/* Manualy Job Apply */}
          <View style={{ paddingVertical: 16 }}>
            <CustomText
              fontSize={fontResize(14)}
              {...theme.fontMedium}
              style={{ color: Colors.DimGray }}
            >
              {'Manual Apply'}
            </CustomText>

            <TouchableOpacity
              onPress={() => {
                setSelectedIndex(1);
                fetchLocalFile('resume');
              }}
              style={{
                borderColor: Colors.Silver,
                borderWidth: 1,
                borderRadius: 16,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 22,
                paddingVertical: 30,
                justifyContent: 'center',
                backgroundColor: selectedIndex === 1 ? '#F6F8FF' : Colors.White,
                marginTop: 8,
              }}
            >
              {selectedIndex == 1 && (
                <View style={{ position: 'absolute', right: 0, top: -10 }}>
                  <Image
                    style={{ height: 18, width: 18 }}
                    source={applyJobSelectedIcon}
                  />
                </View>
              )}
              {localeResumeFile !== '' ? (
                <View
                  style={{
                    width: '90%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    resizeMode="contain"
                    style={{ width: 40, height: 40 }}
                    source={require('../../Resources/assets/PdfIcon.png')}
                  />
                  <Text
                    style={{
                      ...theme.fontMedium,
                      fontSize: fontResize(15),
                      marginLeft: 30,
                      color: Colors.Black,
                    }}
                  >
                    {'resume.pdf'}
                  </Text>
                </View>
              ) : (
                <>
                  <Image
                    resizeMode={'contain'}
                    style={{
                      height: mxWidth * 0.1,
                      width: mxWidth * 0.1,
                      borderRadius: mxWidth * 0.16,
                    }}
                    source={uploadApplyJobIcon}
                  />
                  <View style={{ paddingHorizontal: 16 }}>
                    <CustomText
                      fontSize={fontResize(16)}
                      {...theme.fontMedium}
                      style={{ color: Colors.Blueberry }}
                    >
                      {'Upload Resume'}
                    </CustomText>
                  </View>
                </>
              )}
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setSelectedIndex(2);
                  fetchLocalFile('coverLetter');
                }}
                style={{
                  borderColor: Colors.Silver,
                  borderWidth: 1,
                  borderRadius: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 22,
                  paddingVertical: 30,
                  justifyContent: 'center',
                  backgroundColor:
                    selectedIndex === 2 ? '#F6F8FF' : Colors.White,
                  marginTop: 40,
                }}
              >
                {selectedIndex == 2 && (
                  <View style={{ position: 'absolute', right: 0, top: -10 }}>
                    <Image
                      style={{ height: 18, width: 18 }}
                      source={applyJobSelectedIcon}
                    />
                  </View>
                )}
                {localeCoverLetterFile !== '' ? (
                  <View
                    style={{
                      width: '90%',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{ width: 40, height: 40 }}
                      source={require('../../Resources/assets/PdfIcon.png')}
                    />
                    <Text
                      style={{
                        ...theme.fontMedium,
                        fontSize: fontResize(15),
                        marginLeft: 30,
                        color: Colors.Black,
                      }}
                    >
                      {'Coverletter.pdf'}
                    </Text>
                  </View>
                ) : (
                  <>
                    <Image
                      resizeMode={'contain'}
                      style={{
                        height: mxWidth * 0.1,
                        width: mxWidth * 0.1,
                        borderRadius: mxWidth * 0.16,
                      }}
                      source={uploadApplyJobIcon}
                    />
                    <View style={{ paddingHorizontal: 16 }}>
                      <CustomText
                        fontSize={fontResize(16)}
                        {...theme.fontMedium}
                        style={{ color: Colors.Blueberry }}
                      >
                        {'Upload Cover letter'}
                      </CustomText>
                    </View>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingHorizontal: 1 }}>
            <CustomButton
              onPress={applyJobAPi}
              width={'100%'}
              height={'50px'}
              backgroundColor={Colors.Blueberry}
              marginTop={window.height * 0.03}
              marginBottom={window.height * 0.3}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              {...theme.fontSemiBold}
              fontSize={'18px'}
              textColor={Colors.White}
              text={Strings.APPLY_NOW}
            />
          </View>
        </ScrollView>
      </View>
      <SuccessPopup
        showSuccess={onSuccess}
        onPressDone={() => {
          setOnSuccess(false);
          setTimeout(() => {
            navigation.goBack();
          }, 100);
        }}
      />
    </SafeAreaView>
  );
};

export default ApplyJob;
