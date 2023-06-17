import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Colors from '../../Resources/Colors';
import { style } from './style';
import { CustomText, CustomView, Image } from '../../Component/CustomComponent';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../Component/CustomButton';
import {
  Calender,
  Call,
  CompanyIcon,
  DotIcon,
  EditBlack,
  EditIcon,
  Email,
  HideEyes,
  LocationIcon,
  NotificationIcon,
} from '../../Resources/assets/ProfileAssets';
import {
  ArrowLeftWhite,
  COMPANY_ICON,
  downloadIcon,
  dummyImage,
  SettingsImg,
  STAR_ICON,
  UserPlaceholder,
} from '../../Resources/assets';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Strings from '../../Resources/Strings';
import AddressComponent from '../../Component/AddressComponent';
import DetailsComponent from '../../Component/DetailsComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMyProfile,
  fetchOtherProfile,
  followUserAction,
  getSuggestionUserAction,
  setProfileData,
  unFollowUserAction,
} from '../../Redux/actions/profileAction';
import WorkExperienceComponent from '../../Component/WorkExperienceComponent';
import { RouteName } from '../../Navigation/routeName';
import EndPoint from '../../Redux/constants/EndPoint';
import { reset, setToken, setUserData } from '../../Redux/actions/authAction';
import { getWorkExperience, theme } from '../../Util/constant';
import Emitter from '../../Util/eventEmitter';
import Config from 'react-native-config';
import {
  getFirebaseChatList,
  getFirebaseChatOrderByUserList,
  getFirebaseChatUserList,
  getFirebaseUserData,
  setFirebaseChatList,
  setFirebaseUserData,
} from '../../Constants/FireStoremanager/FireStoremanager';
import CustomEducationComponent from '../../Component/CustomEducationComponent';
import CustomDetailsText from '../../Component/CustomDetailsText';
import { mxHeight } from '../../Util';
import Type from '../../Constants/Type/type';
import { fontResize } from '../../Util/font';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Toast from 'react-native-simple-toast';
import {
  shortEducationData,
  shortWorkInfoData,
} from '../Profile/CustomProfileFunction';

const OtherProfile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const otherUserProfile = useSelector(
    (state) => state.profile.otherUserProfile
  );
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;
  const userData = useSelector((state) => state.auth.userData);
  const { width, height } = useWindowDimensions();
  useEffect(() => {
    fetchOtherUserProfile();
  }, []);

  const fetchOtherUserProfile = () => {
    const { userId } = route.params;
    dispatch(
      fetchOtherProfile({
        userId,
        onSuccess: (result) => {},
        onError: (error) => {},
      })
    );
  };

  const followUser = (userId) => {
    const params = {
      follower_id: userId,
    };

    dispatch(
      followUserAction({
        params,
        onSuccess: (result) => {
          fetchOtherUserProfile();
          fetchSuggestionUser();
          Emitter.emit(Type.EMITTER.STORE_CREATE);
          Emitter.emit(Type.EMITTER.GET_PROFILE);
        },
        onError: (error) => {
          console.log('err>>>>', error);
        },
      })
    );
  };

  const unfollowUser = (userId) => {
    const params = {
      follower_id: userId,
    };

    dispatch(
      unFollowUserAction({
        params,
        onSuccess: (result) => {
          fetchOtherUserProfile();
          fetchSuggestionUser();
          Emitter.emit(Type.EMITTER.STORE_CREATE);
          Emitter.emit(Type.EMITTER.GET_PROFILE);
        },
        onError: (error) => {},
      })
    );
  };

  // get new connection user suggestion list
  const fetchSuggestionUser = () => {
    dispatch(
      getSuggestionUserAction({
        onSuccess: (result) => {},
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };

  const createChat = async () => {
    const otherUserId = otherUserProfile?._id;
    const userExist = await getFirebaseChatOrderByUserList({
      id: userData?.data?.user_id || userData?.data?._id,
      userId: otherUserId,
    });
    const newID = userData?.data?.user_id || userData?.data?._id;
    var chatId =
      newID > otherUserId ? `${newID}${otherUserId}` : `${otherUserId}${newID}`;
    if (userExist.length == 0) {
      const usergetExist = await getFirebaseUserData({
        id: otherUserId,
      });

      if (!usergetExist) {
        const userStoreData = {
          id: otherUserId,
          email: otherUserProfile?.email || '',
          device_token: otherUserProfile?.device_token || '',
          image:
            otherUserProfile?.image || otherUserProfile?.userinfo?.image || '',
          name: otherUserProfile?.name || '',
          role: otherUserProfile?.role || '',
          phone_number: otherUserProfile?.phone_number || '',
          status: 'offline',
          dateTime: new Date(),
        };
        const storeFirbaseData = await setFirebaseUserData({
          id: otherUserId,
          userData: userStoreData,
        });
      }

      var otherUserData = {
        id: otherUserId,
        name: otherUserProfile?.name || '',
        role: otherUserProfile?.role || '',
        image:
          otherUserProfile?.image || otherUserProfile?.userinfo?.image || '',
        status: '',
        chatId: chatId,
        message: '',
        maessageType: 'text',
        dateTime: new Date(),
      };
      var cureentUserData = {
        id: userData?.data?.user_id || userData?.data?._id,
        name: userData?.data?.name || '',
        role: userData?.data?.role || '',
        image: userData?.data?.image || '',
        status: '',
        chatId: chatId,
        message: '',
        maessageType: 'text',
        dateTime: new Date(),
      };
      var setUserList = await setFirebaseChatList({
        id: userData?.data?.user_id || userData?.data?._id,
        userData: otherUserData,
        chatUserId: otherUserId,
      });

      var setOtherUserList = await setFirebaseChatList({
        id: otherUserId,
        userData: cureentUserData,
      });
      navigation.navigate('ChatStack', {
        screen: RouteName.CHAT_DETAIL,
        params: {
          chatId: chatId,
          receiverId: otherUserId,
          isOther: true,
          receiverData: {
            id: otherUserId,
            name: otherUserProfile?.name || '',
            role: otherUserProfile?.role || '',
            image:
              otherUserProfile?.image ||
              otherUserProfile?.userinfo?.image ||
              '',
            status: '',
            chatId: chatId,
            message: '',
            maessageType: 'text',
            dateTime: new Date(),
          },
        },
      });
    } else {
      navigation.navigate('ChatStack', {
        screen: RouteName.CHAT_DETAIL,
        params: {
          chatId: chatId,
          receiverId: otherUserId,
          isOther: true,
          receiverData: {
            id: otherUserId,
            name: otherUserProfile?.name || '',
            role: otherUserProfile?.role || '',
            image:
              otherUserProfile?.image ||
              otherUserProfile?.userinfo?.image ||
              '',
            status: '',
            chatId: chatId,
            message: '',
            maessageType: 'text',
            dateTime: new Date(),
          },
        },
      });
    }
  };

  const professionalUserDetails = () => {
    return (
      <>
        {otherUserProfile?.privacy_setting &&
        otherUserProfile?.privacy_setting?.email_address ? (
          <View />
        ) : (
          <DetailsComponent
            width={width}
            height={height}
            onPress={() => {}}
            title={Strings.CONTACT_INFO}
            containerStyle={[
              style.profileVw({ width }),
              style.profileMarginBottom,
              style.profileMarginTop,
            ]}
          />
        )}
        {otherUserProfile?.privacy_setting &&
        otherUserProfile?.privacy_setting?.email_address ? (
          <View />
        ) : (
          <AddressComponent
            image={Email}
            text={otherUserProfile?.email ? otherUserProfile?.email : ''}
          />
        )}
        {otherUserProfile?.privacy_setting &&
        otherUserProfile?.privacy_setting?.phone_number ? (
          <View />
        ) : (
          <AddressComponent
            image={Call}
            text={
              otherUserProfile?.phone_number
                ? `${otherUserProfile?.country_code} ${otherUserProfile?.phone_number}`
                : ''
            }
          />
        )}

        {type === Strings.PROFESSIONAL &&
          otherUserProfile &&
          otherUserProfile?.education_info &&
          otherUserProfile?.education_info.length > 0 && (
            <View style={style.educationContainer}>
              <Text style={style.aboutTx}>{Strings.EDUCATION}</Text>
              {otherUserProfile?.education_info?.map((item, index) => (
                <CustomEducationComponent data={item} />
              ))}
            </View>
          )}

        {otherUserProfile?.privacy_setting == null ? (
          <View />
        ) : otherUserProfile?.privacy_setting &&
          otherUserProfile?.privacy_setting?.about_me ? (
          <View />
        ) : otherUserProfile?.about_me ? (
          <>
            <Text style={style.aboutTx}>{Strings.ABOUT}</Text>
            <Text style={style.aboutDetailsTx}>
              {otherUserProfile?.about_me ? otherUserProfile?.about_me : ''}
            </Text>
          </>
        ) : (
          <View />
        )}
        {otherUserProfile &&
        otherUserProfile?.privacy_setting &&
        otherUserProfile?.privacy_setting?.work_experience ? (
          <View />
        ) : (
          otherUserProfile &&
          otherUserProfile?.work_info &&
          otherUserProfile?.work_info.length > 0 && (
            <>
              <Text style={style.aboutTx}>{Strings.WORK_EXPERIENCE}</Text>
              {otherUserProfile?.work_info?.map((item, index) => (
                <WorkExperienceComponent
                  data={item}
                  image={COMPANY_ICON}
                  title={item?.your_role || ''}
                  date={item.start_date || ''}
                  jobType={''}
                  Experience={getWorkExperience({
                    startDate: item?.start_date,
                    endDate: item?.end_date,
                  })}
                  role={item?.company_name ? item?.company_name : ''}
                  startDate={item?.start_date || ''}
                  endDate={item?.end_date || ''}
                />
              ))}
            </>
          )
        )}
        {otherUserProfile?.privacy_setting &&
        otherUserProfile?.privacy_setting?.certificates ? (
          <View />
        ) : (
          otherUserProfile?.certificates &&
          otherUserProfile?.certificates.length > 0 && (
            <>
              <Text style={style.aboutTx}>{Strings.LICENSES}</Text>
              {otherUserProfile?.certificates?.map((item, index) => (
                <WorkExperienceComponent
                  data={item}
                  image={
                    item.certificate_image
                      ? {
                          uri: `${EndPoint.baseAssestURL}${item.certificate_image}`,
                        }
                      : CompanyIcon
                  }
                  title={item?.title || ''}
                  date={item.start_date || ''}
                  startDate={item?.start_date || ''}
                  endDate={item?.end_date || ''}
                  jobType={''}
                  Experience={'one year'}
                  role={item?.company_name ? item?.company_name : 'XYZ'}
                />
              ))}
            </>
          )
        )}
        {otherUserProfile?.link_your_resume &&
        otherUserProfile?.link_your_resume !== '' ? (
          <>
            <Text style={style.aboutTx}>Resume</Text>
            <View style={style.pdfVw}>
              <Image
                resizeMode="contain"
                style={{ width: 40, height: 40 }}
                source={require('../../Resources/assets/PdfIcon.png')}
              />
              <Text style={style.cvtx}>
                {otherUserProfile?.resume_name || 'Resume.pdf'}
              </Text>
            </View>
            <CustomText
              style={{ alignSelf: 'flex-end' }}
              fontFamily={'Gilroy-Bold'}
              textColor={Colors.Blueberry}
              marginBottom={height * 0.02}
              textAlign={'right'}
              textLine={'underline'}
              fontSize={fontResize(height * 0.02)}
              onPress={() => {
                downloadfile(otherUserProfile?.link_your_resume);
              }}
            >
              {'Download'}
            </CustomText>
          </>
        ) : (
          <View />
        )}
      </>
    );
  };

  const otherUserDetails = () => {
    return (
      <>
        <DetailsComponent
          width={width}
          height={height}
          onPress={() => {}}
          title={Strings.COMPANY_INFO}
          containerStyle={[
            style.profileVw({ width }),
            style.profileMarginBottom,
          ]}
        />
        <CustomDetailsText
          headerText={Strings.NAME}
          detailsText={otherUserProfile?.userinfo?.company_name}
        />
        <CustomDetailsText
          headerText={Strings.PHONE}
          detailsText={otherUserProfile?.userinfo?.company_phone}
        />
        <CustomDetailsText
          headerText={Strings.EMAIL}
          detailsText={otherUserProfile?.userinfo?.company_email}
        />
        <CustomDetailsText
          headerText={Strings.BUSINESS_NUMBER}
          detailsText={otherUserProfile?.userinfo?.business_number}
        />
        <CustomDetailsText
          headerText={Strings.BUSINESS_ADDRESS}
          detailsText={otherUserProfile?.userinfo?.business_address}
        />
        <CustomDetailsText
          headerText={Strings.ABOUT}
          detailsText={otherUserProfile?.userinfo?.about_company}
        />
        {otherUserProfile?.companyinfo && (
          <>
            <CustomDetailsText
              headerText={Strings.INDUSTRY}
              detailsText={otherUserProfile?.companyinfo?.industry}
            />
            <CustomDetailsText
              headerText={Strings.HEADQUARTES}
              detailsText={otherUserProfile?.companyinfo?.headquarters}
            />
            <CustomDetailsText
              headerText={Strings.FOUNDED}
              detailsText={otherUserProfile?.companyinfo?.founded}
            />
            <CustomDetailsText
              headerText={Strings.SIZE_OF_COMPANY}
              detailsText={otherUserProfile?.companyinfo?.size_of_company}
            />
          </>
        )}
        <View style={{ height: mxHeight * 0.2 }} />
      </>
    );
  };
  var msDiff = new Date();
  const workExpAscending = otherUserProfile?.work_info.sort(
    (a, b) =>
      (b?.end_date == ''
        ? msDiff.getFullYear()
        : moment(b?.end_date).format('yyyy')) -
      (a?.end_date == ''
        ? msDiff.getFullYear()
        : moment(a?.end_date).format('yyyy'))
  );

  const downloadfile = (url) => {
    const { config, fs } = ReactNativeBlobUtil;
    let PictureDir = fs.dirs.DownloadDir;
    var type = '.pdf';
    console.log('path>>>', `${PictureDir}/${new Date().getTime()}${type}`);
    config({
      title: 'file.pdf',
      path: `${PictureDir}/${new Date().getTime()}${type}`,
      fileCache: true,
      showNotification: true,
      notification: true,
    })
      .fetch('GET', `${Config.IMAGE_URL}${url}`, {})
      .then((res) => {
        Toast.show('download successfully');
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <View style={style.conainer}>
      <ScrollView style={style.scrollContainer} bounces={false}>
        <Image
          height={`${height * 0.25}px`}
          resizeMode="cover"
          source={
            otherUserProfile?.role === Strings.PROFESSIONAL
              ? otherUserProfile?.cover_photo
                ? {
                    uri: `${EndPoint.baseAssestURL}${otherUserProfile?.cover_photo}`,
                  }
                : require('../../Resources/assets/ProfileAssets/BG_User.png')
              : otherUserProfile?.userinfo?.cover_pic
              ? {
                  uri: `${EndPoint.baseAssestURL}${otherUserProfile?.userinfo?.cover_pic}`,
                }
              : require('../../Resources/assets/ProfileAssets/BG_User.png')
          }
        />
        <View style={style.EditButtonVw}>
          <TouchableOpacity
            style={style.bellBtn}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image height={'30px'} width={'30px'} source={ArrowLeftWhite} />
          </TouchableOpacity>
        </View>
        <View
          style={style.userImageView({
            height: height,
            width: width,
          })}
        >
          <CustomView
            style={{
              shadowColor: Colors.DimGray,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.2,
              shadowRadius: 6,

              elevation: 6,
            }}
            height={'110px'}
            width={'110px'}
            marginTop={'-60px'}
            borderRadius={'100px'}
            borderColor={Colors.White}
            borderWidth={'5px'}
          >
            <Image
              height={'100px'}
              width={'100px'}
              borderRadius="100px"
              source={
                otherUserProfile?.image
                  ? {
                      uri: `${EndPoint.baseAssestURL}${otherUserProfile?.image}`,
                    }
                  : UserPlaceholder
              }
            />
          </CustomView>
          <Text style={style.userNameTx}>{otherUserProfile?.name}{otherUserProfile?.gold_member ? <Image source={STAR_ICON} style={{height: fontResize(20), width: fontResize(20)}}/> : ''}</Text>
          <Text style={style.userRoleTx}>
            {otherUserProfile?.role === Strings.PROFESSIONAL
              ? otherUserProfile?.work_info != null &&
                otherUserProfile?.work_info.length > 0
                ? `${
                    shortWorkInfoData(otherUserProfile?.work_info)[0]
                      ?.company_name
                      ? shortWorkInfoData(otherUserProfile?.work_info)[0]
                          ?.company_name + ' \u25CF\n'
                      : ''
                  } ${
                    otherUserProfile?.education_info != null &&
                    otherUserProfile?.education_info.length > 0
                      ? shortEducationData(otherUserProfile?.education_info)[0]
                          .school
                      : ''
                  }`
                : ''
              : otherUserProfile?.userinfo?.company_name || ''}
          </Text>
          <View style={style.connectionView}>
            <Text style={style.connectionTx}>{`${
              otherUserProfile?.followers || 0
            } ${Strings.CONNECTIONS}`}</Text>
          </View>

          <View
            style={{
              paddingVertical: 12,
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <CustomButton
              onPress={() =>
                !otherUserProfile?.is_followed
                  ? followUser(otherUserProfile?._id)
                  : unfollowUser(otherUserProfile?._id)
              }
              width={'45%'}
              height={'50px'}
              backgroundColor={Colors.Blueberry}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              {...theme.fontSemiBold}
              fontSize={'18px'}
              textColor={Colors.White}
              textTransform={'capitalize'}
              text={
                otherUserProfile && !otherUserProfile?.is_followed
                  ? Strings.FOLLOW
                  : Strings.UNFOLLOW
              }
            />
            <CustomButton
              onPress={() => {
                createChat();
              }}
              width={'45%'}
              height={'50px'}
              backgroundColor={Colors.White}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              {...theme.fontSemiBold}
              fontSize={'18px'}
              textColor={Colors.PumpkinColor}
              textTransform={'capitalize'}
              borderColor={Colors.PumpkinColor}
              borderWidth={1}
              text={Strings.CONTACT}
            />
          </View>
          <View style={style.lineVw} />
          <DetailsComponent
            width={width}
            height={height}
            onPress={() => {}}
            title={
              otherUserProfile?.role === Strings.PROFESSIONAL
                ? Strings.DETAILS
                : Strings.CONTACT_INFO
            }
            containerStyle={[
              style.profileVw({ width }),
              style.profileMarginBottom,
            ]}
          />
          {otherUserProfile?.privacy_setting &&
            otherUserProfile?.role !== Strings.PROFESSIONAL && (
              <>
                <AddressComponent
                  image={Email}
                  text={otherUserProfile?.email ? otherUserProfile?.email : ''}
                />
                <AddressComponent
                  image={Call}
                  text={
                    otherUserProfile?.phone_number
                      ? `${otherUserProfile?.country_code} ${otherUserProfile?.phone_number}`
                      : ''
                  }
                  container={{ marginBottom: mxHeight * 0.03 }}
                />
              </>
            )}
          {otherUserProfile?.privacy_setting && professionalUserDetails()}
          {otherUserProfile?.role !== Strings.PROFESSIONAL &&
          otherUserProfile?.userinfo ? (
            otherUserDetails()
          ) : (
            <View />
          )}
        </View>
        <View style={{ height: mxHeight * 0.2 }} />
      </ScrollView>
    </View>
  );
};

export default OtherProfile;
