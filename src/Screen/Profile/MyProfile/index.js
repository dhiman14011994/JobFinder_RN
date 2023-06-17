/* eslint-disable react-native/no-inline-styles */
/* eslint-disable handle-callback-err */
import {
  View,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { dummyImage } from '../../../Resources/assets';
import Strings from '../../../Resources/Strings';
import { CustomView, Image } from '../../../Component/CustomComponent';
import Colors from '../../../Resources/Colors';
import EndPoint from '../../../Redux/constants/EndPoint';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../../../Component/CustomModal/CustomModal';
import {
  requestCameraPermission,
  requestExternalWritePermission,
} from '../../../Constants/Permissions';
import { setLoading } from '../../../Redux/actions/authAction';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { imageUplaod } from '../../../Redux/services/profileService';

import { UploadImageIcon } from '../../../Resources/assets/ProfileAssets';
import CustomInputText from '../../../Component/CustomInputText';
import { isNative } from '../../../Util';
import CustomButton from '../../../Component/CustomButton';
import Toast from 'react-native-simple-toast';
import {
  fetchOrganizationMyProfile,
  fetchRecruiterMyProfile,
  updateOrganizationMyProfile,
  updateRecruiterMyProfile,
} from '../../../Redux/actions/profileAction';

import firestore from '@react-native-firebase/firestore';

const MyProfile = () => {
  const window = useWindowDimensions();
  const userData = useSelector((state) => state.auth.userData);
  const userInfo = useSelector((state) => state?.profile?.myProfile);
  const [isModal, setModal] = useState(false);
  const [userImage, setuserImage] = useState(userInfo?.image);
  const [name, setName] = useState(userData?.name || '');
  const [phone, setPhone] = useState(userData?.phone_number);
  const [email, setEmail] = useState(userData?.email);
  const companyinfoData =
    userInfo?.companyinfo == null ? '' : userInfo?.companyinfo || '';
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const selectImage = async (type) => {
    try {
      dispatch(setLoading(true));
      let isCameraPermitted = await requestCameraPermission();
      let isStoragePermitted = await requestExternalWritePermission();
      let options = {
        maxWidth: 1000,
        maxHeight: 1000,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        quality: 0.1,
      };
      if (isCameraPermitted && isStoragePermitted) {
        if (type === 'camera') {
          launchCamera(options, async (res) => {
            if (res?.assets && res?.assets[0]) {
              setModal(false);
              uploadFetchFile(res);
            }
            setModal(false);
            dispatch(setLoading(false));
          }).catch((err) => {
            setModal(false);
            dispatch(setLoading(false));
          });
        } else {
          launchImageLibrary(options, async (response) => {
            if (response?.assets && response?.assets[0]) {
              setModal(false);
              uploadFetchFile(response);
            }
            setModal(false);
            dispatch(setLoading(false));
          }).catch((err) => {
            setModal(false);
            dispatch(setLoading(false));
          });
        }
      } else {
        setModal(false);
        dispatch(setLoading(false));
      }
    } catch (error) {
      setModal(false);
      dispatch(setLoading(false));
    }
  };

  const uploadFetchFile = async (res) => {
    const fileSize = Number(res?.assets[0]?.fileSize) / 1000000;
    if (fileSize < 20) {
      let imageData = {
        uri: res.assets[0].uri,
        type: 'image/jpg',
        name: 'image.jpg',
      };
      var getImageURI = await imageUplaod({
        file: imageData,
        token: userData?.access_token,
      });
      dispatch(setLoading(false));
      setuserImage(getImageURI.data[0]);
    } else {
      alert(Strings.FILE_SIZE_TEXT);
      dispatch(setLoading(false));
    }
  };

  const fetchAllData = () => {
    try {
      if (type === Strings.RECRUITER) {
        dispatch(setLoading(true));
        dispatch(
          fetchRecruiterMyProfile({
            token,
            onSuccess: (result) => {
              dispatch(setLoading(false));
            },
            onError: (error) => {
              dispatch(setLoading(false));
              Toast.show('Something went wrong.');
            },
          })
        );
      } else if (type === Strings.ORGANIZATION) {
        dispatch(setLoading(true));
        dispatch(
          fetchOrganizationMyProfile({
            token,
            onSuccess: (result) => {
              dispatch(setLoading(false));
            },
            onError: (error) => {
              dispatch(setLoading(false));
              Toast.show('Something went wrong.');
            },
          })
        );
      }
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const updateRecruiterProfile = () => {
    try {
      let data = {
        name: name || userInfo?.name || '',
        business_number: userInfo?.userinfo?.business_number || '',
        profile_pic: userInfo?.userinfo?.profile_pic || '',
        image: userImage || userInfo?.image,
        cover_pic: userInfo?.userinfo?.cover_pic || '',
        company_name: userInfo?.userinfo?.company_name,
        company_email: userInfo?.userinfo?.company_email || '',
        company_phone: userInfo?.userinfo?.company_phone || '',
        about_company: userInfo?.userinfo?.about_company,
        business_address: userInfo?.userinfo?.business_address,
        website: userInfo?.userinfo?.website,
        industry: companyinfoData?.industry,
        headquarters: companyinfoData?.headquarters,
        founded: companyinfoData?.founded,
        size_of_company: companyinfoData?.size_of_company,
      };
      let id = userInfo?._id;
      dispatch(setLoading(true));
      updateFirebaseUserInfo();
      updateFirebaseBasicUserInfo();
      if (type === Strings.RECRUITER) {
        dispatch(
          updateRecruiterMyProfile({
            token,
            data,
            id,
            onSuccess: (result) => {
              dispatch(setLoading(false));
              if (result.code === 200) {
                Toast.show(result.message);
                fetchAllData();
              }
              dispatch(setLoading(false));
            },
            onError: (error) => {
              dispatch(setLoading(false));
              Toast.show('Something went wrong.');
            },
          })
        );
      } else {
        dispatch(
          updateOrganizationMyProfile({
            token,
            data,
            id,
            onSuccess: (result) => {
              dispatch(setLoading(false));
              if (result.code === 200) {
                Toast.show(result.message);
                fetchAllData();
              }
              dispatch(setLoading(false));
            },
            onError: (error) => {
              dispatch(setLoading(false));
              Toast.show('Something went wrong.');
            },
          })
        );
      }
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const updateFirebaseUserInfo = () => {
    firestore()
      .collection('ChatUserList')
      .doc(userInfo?._id)
      .collection('userlist')
      .get()
      .then((res) => {
        res.docs.forEach((doc) => {
          var userInfoData = doc.data();
          firestore()
            .collection('ChatUserList')
            .doc(userInfoData?.id)
            .collection('userlist')
            .get()
            .then((ress) => {
              ress.docs.forEach((item) => {
                var uData = item.data();
                if (uData.id == userInfo?._id) {
                  firestore()
                    .collection('ChatUserList')
                    .doc(userInfoData?.id)
                    .collection('userlist')
                    .doc(item.id)
                    .update({
                      name: name || userInfo?.name || '',
                      image: userImage || userInfo?.image || '',
                    })
                    .catch((error) =>
                      console.log(' ChatUserListerror>>>', error)
                    );
                }
              });
            });
        });
      })
      .catch((error) => {});
  };

  const updateFirebaseBasicUserInfo = () => {
    firestore()
      .collection('Users')
      .doc(userInfo?._id)
      .update({
        name: name || userInfo?.name || '',
        image: userImage || userInfo?.image || '',
      })
      .catch((error) => console.log('error>>>', error));
  };
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
          style={{ width: window.width }}
        >
          <View
            style={{
              width: window.width * 0.9,
              marginHorizontal: window.width * 0.05,
              alignItems: 'center',
            }}
          >
            <CustomView
              height={'110px'}
              width={'110px'}
              marginTop={'50px'}
              borderRadius={'100px'}
              borderColor={Colors.White}
              borderWidth={'5px'}
            >
              <Image
                height={'100px'}
                width={'100px'}
                borderRadius="100px"
                source={
                  userImage
                    ? { uri: `${EndPoint.baseAssestURL}${userImage}` }
                    : userInfo?.image
                    ? {
                        uri: `${EndPoint.baseAssestURL}${userInfo?.image}`,
                      }
                    : dummyImage
                }
              />

              <TouchableOpacity
                style={{
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: -10,
                  right: -10,
                }}
                onPress={() => {
                  setModal(true);
                }}
              >
                <Image
                  resizeMode={'cover'}
                  height={'40px'}
                  width={'40px'}
                  source={UploadImageIcon}
                />
              </TouchableOpacity>
            </CustomView>

            <CustomInputText
              marginBottom={window.height * 0.02}
              label={Strings.NAME}
              onChangeText={(text) => {
                setName(text);
              }}
              value={name || userInfo?.name}
              placeholder={'Johnny'}
              window={window}
            />
            <CustomInputText
              marginBottom={window.height * 0.02}
              label={Strings.EMAIL_ADDRESS}
              editable={false}
              onChangeText={(text) => setEmail(text)}
              value={email || userInfo?.email}
              placeholder={'example@domain.com'}
              window={window}
            />
            <CustomInputText
              label={Strings.PHONE}
              marginBottom={window.height * 0.02}
              onChangeText={(text) => setPhone(text)}
              value={phone || userInfo?.phone_number}
              editable={false}
              placeholder={'+911234567890'}
              window={window}
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
                updateRecruiterProfile();
              }}
              text={Strings.SAVE_CHANGE}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomModal
        isVisible={isModal}
        cancelVissible={() => {
          setModal(false);
        }}
        selectImage={(text) => {
          selectImage(text);
        }}
      />
    </View>
  );
};

export default MyProfile;
