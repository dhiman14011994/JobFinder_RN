/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { dummyImage } from '../../../Resources/assets';
import Strings from '../../../Resources/Strings';
import SelectDropdown from 'react-native-select-dropdown';
import { CustomView, Image } from '../../../Component/CustomComponent';
import Colors from '../../../Resources/Colors';
import { fontResize } from '../../../Util/font';
import EndPoint from '../../../Redux/constants/EndPoint';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../../../Component/CustomModal/CustomModal';
import {
  requestCameraPermission,
  requestExternalWritePermission,
} from '../../../Constants/Permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { imageUplaod } from '../../../Redux/services/profileService';
import {
  updateOrganizationMyProfile,
  updateRecruiterMyProfile,
  fetchRecruiterMyProfile,
  fetchOrganizationMyProfile,
} from '../../../Redux/actions/profileAction';

import {
  DownArrow,
  RightArrow,
  RightTick,
  UploadImageIcon,
} from '../../../Resources/assets/ProfileAssets';
import CustomInputText from '../../../Component/CustomInputText';
import { isNative } from '../../../Util';
import CustomButton from '../../../Component/CustomButton';

import { style } from './style';
import DetailsComponent from '../../../Component/DetailsComponent';
import { setLoading } from '../../../Redux/actions/authAction';
import Toast from 'react-native-simple-toast';

const BusinessProfile = () => {
  const [isModal, setModal] = useState(false);
  const [isBackground, setBackground] = useState(false);
  const jobSalaryRangeList = [
    '0 - 100',
    '100 - 1000',
    '1000 - 5000',
    '5000 - 90000',
  ];
  const [isBasicInfo, setBasicInfo] = useState(false);
  const [isCompanyInfo, setCompanyInfo] = useState(false);
  const [editCompanyOverview, setEditCompanyOverview] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const userInfo = useSelector((state) => state?.profile?.myProfile);
  const companyinfoData =
    userInfo?.companyinfo == null ? '' : userInfo?.companyinfo || '';
  const token = useSelector((state) => state.auth.token);
  const [userBackground, setUserBackground] = useState(
    userInfo?.userinfo?.cover_pic
  );
  const [userImage, setuserImage] = useState(
    type == Strings.PROFESSIONAL
      ? userInfo?.image
      : userInfo?.userinfo?.profile_pic
  );

  const [name, setName] = useState(userInfo?.userinfo?.company_name);
  const [phone, setPhone] = useState(userInfo?.userinfo?.company_phone);
  const [email, setEmail] = useState(userInfo?.userinfo?.company_email);
  const [about, setAbout] = useState(userInfo?.userinfo?.about_company);
  const [address, setAddress] = useState(userInfo?.userinfo?.business_address);
  const [website, setwebsite] = useState(userInfo?.userinfo?.website);
  const [industry, setIndustry] = useState(companyinfoData?.industry);
  const [sizeOfComapny, setSizeCompany] = useState(
    companyinfoData?.size_of_company || jobSalaryRangeList[0]
  );
  const [headquarters, setHeadquarters] = useState(
    companyinfoData?.headquarters
  );
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;
  const [founded, setFounded] = useState(companyinfoData?.founded);
  const dispatch = useDispatch();
  const window = useWindowDimensions();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = () => {
    try {
      if (type === Strings.RECRUITER) {
        dispatch(setLoading(true));
        dispatch(
          fetchRecruiterMyProfile({
            token,
            onSuccess: (result) => {
              console.log('Results fetch fetchRecruiterMyProfile', result);
              dispatch(setLoading(false));
            },
            onError: (error) => {
              console.log('error>>', error);
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
              console.log('Results fetch fetchOrganizationMyProfile', result);
              dispatch(setLoading(false));
            },
            onError: (error) => {
              dispatch(setLoading(false));
              Toast.show('Something went wrong.');
            },
          })
        );
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log('error', error);
    }
  };
  const selectImage = async (type) => {
    try {
      dispatch(setLoading(true));
      let isCameraPermitted = await requestCameraPermission();
      let isStoragePermitted = await requestExternalWritePermission();
      let options = {
        // maxWidth: 1000,
        // maxHeight: 1000,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        // quality: 0.1,
      };
      if (isCameraPermitted && isStoragePermitted) {
        if (type === 'camera') {
          launchCamera(options, async (res) => {
            if (res?.assets && res?.assets[0]) {
              setModal(false);

              uploadPostImage(res);
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
              uploadPostImage(response);
            }
            setModal(false);
            dispatch(setLoading(false));
          }).catch((err) => {
            setModal(false);
            dispatch(setLoading(false));
          });
        }
        // setModal(false);
      } else {
        setModal(false);
        dispatch(setLoading(false));
      }
    } catch (error) {
      setModal(false);
      dispatch(setLoading(false));
    }
  };

  const uploadPostImage = async (response) => {
    const fileSize = Number(response?.assets[0]?.fileSize) / 1000000;
    if (fileSize < 20) {
      let imageData = {
        uri: response.assets[0].uri,
        type: 'image/jpg',
        name: 'image.jpg',
      };
      var getImageURI = await imageUplaod({
        file: imageData,
        token: userData?.access_token,
      });
      dispatch(setLoading(false));
      if (isBackground) {
        setUserBackground(getImageURI.data[0]);
        setBackground(false);
      } else {
        setuserImage(getImageURI.data[0]);
      }
    } else {
      alert(Strings.FILE_SIZE_TEXT);
      dispatch(setLoading(false));
    }
  };
  const updateBusinessProfile = () => {
    try {
      let data = {
        name: userInfo?.name || '',
        business_number: userInfo?.userinfo?.business_number || '',
        profile_pic: userImage || userInfo?.userinfo?.image,
        image: userInfo?.image || '',
        cover_pic: userBackground || userInfo?.userinfo?.cover_pic || '',
        company_name: name || userInfo?.userinfo?.company_name,
        company_email: email || userInfo?.userinfo?.company_email,
        company_phone: phone || userInfo?.userinfo?.company_phone,
        about_company: about || userInfo?.userinfo?.about_company,
        business_address: address || userInfo?.userinfo?.business_address,
        website: website || userInfo?.userinfo?.website,
        industry: industry || companyinfoData?.industry,
        headquarters: headquarters || companyinfoData?.headquarters,
        founded: founded || companyinfoData?.founded,
        size_of_company: sizeOfComapny || companyinfoData?.size_of_company,
      };
      let id = userInfo?._id;

      dispatch(setLoading(true));
      dispatch(
        updateOrganizationMyProfile({
          token,
          data,
          id,
          onSuccess: (result) => {
            if (result.code == 200) {
              fetchAllData();
              Toast.show(result.message);
            }
            dispatch(setLoading(false));
          },
          onError: (error) => {
            // dispatch(setLoading(false));
            dispatch(setLoading(false));
            Toast.show('Something went wrong.');
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const updateRecruiterProfile = () => {
    try {
      let data = {
        name: userInfo?.name || '',
        business_number: userInfo?.userinfo?.business_number || '',
        profile_pic: userImage || userInfo?.userinfo?.image,
        image: userInfo?.image || '',
        cover_pic: userBackground || userInfo?.userinfo?.cover_pic || '',
        company_name: name || userInfo?.userinfo?.company_name,
        company_email: email || userInfo?.userinfo?.company_email,
        company_phone: phone || userInfo?.userinfo?.company_phone,
        about_company: about || userInfo?.userinfo?.about_company,
        business_address: address || userInfo?.userinfo?.business_address,
        website: website || userInfo?.userinfo?.website,
        industry: industry || companyinfoData?.industry,
        headquarters: headquarters || companyinfoData?.headquarters,
        founded: founded || companyinfoData?.founded,
        size_of_company: sizeOfComapny || companyinfoData?.size_of_company,
      };
      let id = userInfo?._id;

      dispatch(setLoading(true));
      dispatch(
        updateRecruiterMyProfile({
          token,
          data,
          id,
          onSuccess: (result) => {
            if (result.code == 200) {
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
    } catch (err) {
      Toast.show('Something went wrong.');
      dispatch(setLoading(false));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ width: window.width }}
        >
          <View
            style={{
              width: window.width * 0.9,
              marginHorizontal: window.width * 0.05,
              alignItems: 'center',
            }}
          >
            <ImageBackground
              style={{
                width: window.width * 0.9,
                height: 200,
                // justifyContent: 'center',
                alignItems: 'center',
                resizeMode: 'cover',
                marginBottom: 30,
                marginTop: 15,
                borderRadius: 20,
                overflow: 'hidden',
              }}
              source={
                userBackground
                  ? { uri: `${EndPoint.baseAssestURL}${userBackground}` }
                  : userInfo?.userinfo?.cover_pic
                  ? {
                      uri: `${EndPoint.baseAssestURL}${userInfo?.userinfo.cover_pic}`,
                    }
                  : require('../../../Resources/assets/ProfileAssets/BG_User.png')
              }
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  marginRight: '5%',
                  marginTop: '5%',
                }}
              >
                <TouchableOpacity
                  style={{
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setModal(true);
                    setBackground(true);
                  }}
                >
                  <Image
                    resizeMode={'cover'}
                    height={'40px'}
                    width={'40px'}
                    source={UploadImageIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 50,
                    marginLeft: 10,
                  }}
                  onPress={() => {
                    // setModal(true);
                    // setBackground(true);
                  }}
                >
                  <Image
                    resizeMode={'cover'}
                    height={'40px'}
                    width={'40px'}
                    source={RightTick}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>

            <CustomView
              height={'110px'}
              width={'110px'}
              marginTop={'-90px'}
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
                    ? {
                        uri: `${EndPoint.baseAssestURL}${userImage}`,
                      }
                    : userInfo?.userinfo?.profile_pic
                    ? {
                        uri: `${EndPoint.baseAssestURL}${userInfo?.userinfo?.profile_pic}`,
                      }
                    : userInfo?.userinfo?.image
                    ? {
                        uri: `${EndPoint.baseAssestURL}${userInfo?.userinfo?.image}`,
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
                  top: -10,
                  right: -10,
                }}
                onPress={() => {
                  setModal(true);
                  // setBackground(true);
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
            <Text style={style.userNameTx}>{userInfo?.name}</Text>
            <Text style={style.userRoleTx}>{userInfo?.skill}</Text>

            <CustomView
              width={window.width * 0.9}
              height={'1px'}
              bgColor={Colors.PrimaryGray}
              marginBottom={window.height * 0.02}
              marginTop={window.height * 0.03}
            />

            <View style={style.basicInfoVw}>
              <DetailsComponent
                width={window.width}
                height={window.height}
                image={isBasicInfo ? DownArrow : RightArrow}
                imageWidth={'20px'}
                imageHeight={'20px'}
                onPress={() => {
                  setBasicInfo(!isBasicInfo);
                }}
                title={Strings.BASIC_INFO}
                containerStyle={[
                  style.profileVw({ width: window.width }),
                  { marginVertical: isBasicInfo ? '5%' : 0 },
                ]}
              />
              {isBasicInfo && (
                <>
                  <CustomInputText
                    marginBottom={window.height * 0.02}
                    label={Strings.COMPANY_NAME}
                    editable={true}
                    onChangeText={(text) => {
                      setName(text);
                    }}
                    value={name ? name : userInfo?.userinfo?.company_name || ''}
                    placeholder={'Johnny'}
                    window={window}
                  />
                  <CustomInputText
                    marginBottom={window.height * 0.02}
                    label={Strings.EMAIL_ADDRESS}
                    editable={true}
                    onChangeText={(text) => setEmail(text)}
                    value={
                      email ? email : userInfo?.userinfo?.company_email || ''
                    }
                    placeholder={'example@domain.com'}
                    window={window}
                  />
                  <CustomInputText
                    label={Strings.PHONE}
                    marginBottom={window.height * 0.02}
                    keyboardType="numeric"
                    onChangeText={(text) => setPhone(text)}
                    value={
                      phone
                        ? `${phone}`
                        : userInfo?.userinfo?.company_phone
                        ? `${userInfo?.userinfo?.company_phone}`
                        : ''
                    }
                    editable={true}
                    placeholder={'+911234567890'}
                    window={window}
                  />
                  <CustomInputText
                    label={Strings.COMPANY_OVERVIEW}
                    marginBottom={window.height * 0.02}
                    isDetails={true}
                    isEdit={true}
                    editable={editCompanyOverview}
                    editPress={() => {
                      setEditCompanyOverview(!editCompanyOverview);
                    }}
                    onChangeText={(text) => {
                      setAbout(text);
                    }}
                    window={window}
                    value={
                      about
                        ? about
                        : userInfo?.userinfo?.about_company
                        ? userInfo?.userinfo?.about_company
                        : ''
                    }
                  />

                  <CustomInputText
                    marginBottom={window.height * 0.02}
                    label={Strings.ADDRESS}
                    onChangeText={(text) => {
                      setAddress(text);
                    }}
                    value={
                      address
                        ? address
                        : userInfo?.userinfo?.business_address || ''
                    }
                    placeholder={'110, house'}
                    window={window}
                  />
                  <CustomInputText
                    marginBottom={window.height * 0.02}
                    label={Strings.WEBSITE}
                    onChangeText={(text) => {
                      setwebsite(text);
                    }}
                    value={website || userInfo?.userinfo?.website}
                    placeholder={'www.abc.com'}
                    window={window}
                  />
                </>
              )}
            </View>
            <View
              style={[
                style.basicInfoVw,
                { marginTop: '5%', marginBottom: window.height * 0.12 },
              ]}
            >
              <DetailsComponent
                width={window.width}
                height={window.height}
                image={isCompanyInfo ? DownArrow : RightArrow}
                imageWidth={'20px'}
                imageHeight={'20px'}
                onPress={() => {
                  setCompanyInfo(!isCompanyInfo);
                }}
                title={Strings.COMPANY_INFO}
                containerStyle={[
                  style.profileVw({ width: window.width }),
                  { marginVertical: isCompanyInfo ? '5%' : 0 },
                ]}
              />
              {isCompanyInfo && (
                <>
                  <CustomInputText
                    marginBottom={window.height * 0.02}
                    label={Strings.INDUSTRY}
                    onChangeText={(text) => {
                      setIndustry(text);
                    }}
                    value={
                      industry ? industry : companyinfoData?.industry || ''
                    }
                    placeholder={'110, house'}
                    window={window}
                  />
                  <Text
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      fontSize: fontResize(16),
                      lineHeight: fontResize(24),
                      color: Colors.Black,
                      marginBottom: 10,
                    }}
                  >
                    {Strings.SIZE_OF_COMPANY}
                  </Text>
                  <SelectDropdown
                    defaultValueByIndex={0}
                    buttonStyle={{
                      width: '100%',
                      height: window?.height * 0.08,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: Colors.Silver,
                      marginBottom: window.height * 0.02,
                    }}
                    buttonTextStyle={{
                      textAlign: 'left',
                      textColor: Colors.Black,
                      fontSize: fontResize(16),
                      fontFamily: 'Gilroy-SemiBold',
                    }}
                    data={jobSalaryRangeList}
                    onSelect={(selectedItem, index) => {
                      setSizeCompany(`${selectedItem}/${index}`);
                    }}
                    renderDropdownIcon={(isOpened) => {
                      return (
                        <Image
                          resizeMode={'center'}
                          width={window.height * 0.02}
                          height={window.height * 0.02}
                          source={DownArrow}
                        />
                      );
                    }}
                    dropdownIconPosition={'right'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    rowTextStyle={{
                      textAlign: 'left',
                      textColor: Colors.Black,
                      fontSize: fontResize(16),
                      fontFamily: 'Gilroy-SemiBold',
                    }}
                  />
                  <CustomInputText
                    marginBottom={window.height * 0.02}
                    label={Strings.HEADQUARTES}
                    onChangeText={(text) => {
                      setHeadquarters(text);
                    }}
                    value={
                      headquarters
                        ? headquarters
                        : companyinfoData?.headquarters || ''
                    }
                    placeholder={'110, house'}
                    window={window}
                  />
                  <CustomInputText
                    marginBottom={window.height * 0.02}
                    label={Strings.FOUNDED}
                    onChangeText={(text) => {
                      setFounded(text);
                    }}
                    value={founded ? founded : companyinfoData?.founded || ''}
                    placeholder={'2002'}
                    window={window}
                  />
                </>
              )}
            </View>
            <CustomButton
              width={isNative ? '100%' : '80%'}
              height={window.height * 0.06}
              backgroundColor={Colors.Blueberry}
              marginTop={window.height * 0.03}
              marginBottom={window.height * 0.15}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              fontFamily={'Gilroy-SemiBold'}
              fontSize={'18px'}
              textColor={Colors.White}
              onPress={() => {
                if (type === Strings.RECRUITER) {
                  updateRecruiterProfile();
                } else {
                  updateBusinessProfile();
                }
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

export default BusinessProfile;
