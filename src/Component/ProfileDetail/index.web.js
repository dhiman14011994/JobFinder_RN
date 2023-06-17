//import liraries
import React, { Component, useState, useEffect } from 'react';
import {
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import Modal from 'modal-enhanced-react-native-web';
import { theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';
import { CustomText } from '../CustomComponent';
import { fontResize } from '../../Util/font';
import {
  unionIcon,
  banner,
  dummyImage,
  crossIcon,
  location,
  calender,
  UserPlaceholder,
} from '../../Resources/assets';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMyProfile,
  fetchOtherProfile,
  followUserAction,
  unFollowUserAction,
} from '../../Redux/actions/profileAction';
import EndPoint from '../../Redux/constants/EndPoint';
import { Email, Call, CompanyIcon } from '../../Resources/assets/ProfileAssets';
import Strings from '../../Resources/Strings';
import {
  getFirebaseChatList,
  getFirebaseChatOrderByUserList,
  getFirebaseChatUserList,
  getFirebaseUserData,
  setFirebaseChatList,
  setFirebaseUserData,
} from '../../Constants/FireStoremanager/FireStoremanager';
import CustomEducationComponent from '../CustomEducationComponent';
import { style } from './style';
import CustomDetailsText from '../CustomDetailsText';
import DetailsComponent from '../DetailsComponent';
import AddressComponent from '../AddressComponent';

// create a component
const ProfileDetail = ({
  showProfileModal,
  setProfileModal,
  item,
  suggestionPress,
}) => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const [showFullProfile, setFullProfile] = useState(false);
  const [results, setResults] = useState([]);
  const userInfo = useSelector((state) => state?.profile?.myProfile);
  const userData = useSelector((state) => state.auth.userData);
  const otherUserProfile = useSelector(
    (state) => state?.profile?.otherUserProfile
  );

  const fetchOtherUserProfile = () => {
    const userId = item._id;

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
          suggestionPress();
        },
        onError: (error) => {
          console.log('Results follow', error);
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
          suggestionPress();
        },
        onError: (error) => {},
      })
    );
  };

  const renderList = ({ item, index }) => {
    return (
      <View style={{ paddingVertical: 5, flexDirection: 'row', marginTop: 5 }}>
        <Image
          style={{ width: 18, height: 18, marginRight: 10 }}
          source={CompanyIcon}
        />

        <View style={{ flexDirection: 'column' }}>
          <CustomText
            {...theme.fontBold}
            fontSize={`${fontResize(12)}px`}
            textColor={Colors.Black}
          >
            {item?.your_role || ''}
          </CustomText>
          <CustomText
            marginTop={5}
            {...theme.fontMedium}
            fontSize={`${fontResize(12)}px`}
            textColor={Colors.drakGray}
          >
            {item?.company_name ? item?.company_name : ''}
          </CustomText>
          <CustomText
            marginTop={5}
            {...theme.fontMedium}
            fontSize={`${fontResize(12)}px`}
            textColor={Colors.drakGray}
          >
            {item?.start_date || ''} - {item?.end_date || ''}
          </CustomText>
        </View>
      </View>
    );
  };

  const contactUser = async () => {
    try {
      const otherUserId = otherUserProfile?._id;
      const userExist = await getFirebaseChatOrderByUserList({
        id: userData?.data?.user_id || userData?.data?._id,
        userId: otherUserId,
      });
      const newID = userData?.data?.user_id || userData?.data?._id;
      var chatId =
        newID > otherUserId
          ? `${newID}${otherUserId}`
          : `${otherUserId}${newID}`;
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
              otherUserProfile?.image ||
              otherUserProfile?.userinfo?.image ||
              '',
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

        //   navigation.navigate('ChatStack', {
        //     screen: RouteName.CHAT_DETAIL,
        //     params: {
        //       chatId: chatId,
        //       receiverId: otherUserId,
        //       isOther: true,
        //       receiverData: {
        //         id: otherUserId,
        //         name: otherUserProfile?.name || '',
        //         role: otherUserProfile?.role || '',
        //         image:
        //           otherUserProfile?.image ||
        //           otherUserProfile?.userinfo?.image ||
        //           '',
        //         status: '',
        //         chatId: chatId,
        //         message: '',
        //         maessageType: 'text',
        //         dateTime: new Date(),
        //       },
        //     },
        //   });
        setProfileModal(!showProfileModal);
      } else {
        //   navigation.navigate('ChatStack', {
        //     screen: RouteName.CHAT_DETAIL,
        //     params: {
        //       chatId: chatId,
        //       receiverId: otherUserId,
        //       isOther: true,
        //       receiverData: {
        //         id: otherUserId,
        //         name: otherUserProfile?.name || '',
        //         role: otherUserProfile?.role || '',
        //         image:
        //           otherUserProfile?.image ||
        //           otherUserProfile?.userinfo?.image ||
        //           '',
        //         status: '',
        //         chatId: chatId,
        //         message: '',
        //         maessageType: 'text',
        //         dateTime: new Date(),
        //       },
        //     },
        //   });
        setProfileModal(!showProfileModal);
      }
    } catch (err) {
      console.log('err>>>', err);
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
              {
                width: width * 0.9,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              },
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

        {otherUserProfile?.privacy_setting == null ? (
          <View />
        ) : otherUserProfile?.privacy_setting &&
          otherUserProfile?.privacy_setting?.about_me ? (
          <View />
        ) : (
          otherUserProfile?.about_me && (
            <>
              <CustomText
                marginTop={height * 0.01}
                {...theme.fontBold}
                fontSize={`${fontResize(height * 0.018)}px`}
                textColor={Colors.Black}
              >
                About
              </CustomText>

              <View
                style={{
                  paddingVertical: 5,
                  flexDirection: 'row',
                  marginTop: height * 0.005,
                  marginRight: 20,
                }}
              >
                <CustomText
                  {...theme.fontMedium}
                  fontSize={`${fontResize(height * 0.014)}px`}
                  textColor={Colors.drakGray}
                >
                  {otherUserProfile?.about_me ? otherUserProfile?.about_me : ''}
                </CustomText>
              </View>
            </>
          )
        )}
        {otherUserProfile &&
          otherUserProfile?.education_info &&
          otherUserProfile?.education_info.length > 0 && (
            <>
              <CustomText
                marginTop={height * 0.01}
                {...theme.fontBold}
                fontSize={`${fontResize(height * 0.018)}px`}
                textColor={Colors.Black}
              >
                {Strings.EDUCATION}
              </CustomText>

              {otherUserProfile?.education_info?.map((item, index) => (
                <CustomEducationComponent
                  data={item}
                  styleText={style.styleText}
                />
              ))}
            </>
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
              <CustomText
                marginTop={height * 0.01}
                {...theme.fontBold}
                fontSize={`${fontResize(height * 0.018)}px`}
                textColor={Colors.Black}
              >
                {Strings.WORK_EXPERIENCE}
              </CustomText>

              {otherUserProfile?.work_info?.map((item, index) => (
                <FlatList data={item} renderItem={renderList} />
              ))}
            </>
          )
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
            {
              width: width * 0.9,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            },
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
        <View style={{ height: height * 0.2 }} />
      </>
    );
  };

  return (
    <Modal
      animationType="transparent"
      transparent={true}
      visible={showProfileModal}
      onRequestClose={() => {
        setProfileModal(!showProfileModal);
      }}
    >
      <View
        style={{
          width: width * 0.3,
          height: showFullProfile ? height * 0.8 : height * 0.55,
          alignSelf: 'center',
          flexDirection: 'row',
          shadowColor: Colors.Black,
          backgroundColor: Colors.White,
          overflow: 'hidden',
          shadowRadius: height * 0.02,
          shadowOpacity: 3,
          borderRadius: height * 0.01,
          flexDirection: 'column',
        }}
      >
        <Image
          style={{ width: '100%', height: '45%' }}
          source={
            otherUserProfile?.role === Strings.PROFESSIONAL
              ? otherUserProfile?.cover_photo
                ? {
                    uri: `${EndPoint.baseAssestURL}${otherUserProfile?.cover_photo}`,
                  }
                : banner
              : otherUserProfile?.userinfo?.cover_pic
              ? {
                  uri: `${EndPoint.baseAssestURL}${otherUserProfile?.userinfo?.cover_pic}`,
                }
              : banner
          }
        />

        <TouchableOpacity
          onPress={() => {
            setProfileModal(false);
          }}
          style={{ position: 'absolute', right: 0, margin: width * 0.01 }}
        >
          <Image
            style={{ width: width * 0.015, height: width * 0.015 }}
            source={crossIcon}
          />
        </TouchableOpacity>

        <View style={{ alignItems: 'center', marginTop: -width * 0.025 }}>
          <Image
            style={{
              width: width * 0.05,
              height: width * 0.05,
              borderRadius: width * 0.05,
              position: 'relative',
              top: 0,
            }}
            source={
              otherUserProfile?.image
                ? {
                    uri: `${EndPoint.baseAssestURL}${otherUserProfile?.image}`,
                  }
                : UserPlaceholder
            }
          />
        </View>
        <View style={{ height: height * 0.35 }}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <CustomText
              marginTop={height * 0.015}
              textAlign={'center'}
              {...theme.fontMedium}
              fontSize={`${fontResize(height * 0.018)}px`}
              textColor={Colors.Black}
            >
              {otherUserProfile?.name}
            </CustomText>
            <CustomText
              marginTop={height * 0.005}
              textAlign={'center'}
              {...theme.fontMedium}
              fontSize={`${fontResize(height * 0.018)}px`}
              textColor={Colors.Black}
            >
              {otherUserProfile?.role === Strings.PROFESSIONAL
                ? otherUserProfile?.work_info != null &&
                  otherUserProfile?.work_info.length > 0 &&
                  otherUserProfile?.work_info[0]?.company_name &&
                  otherUserProfile?.work_info[
                    otherUserProfile?.work_info.length - 1
                  ]?.company_name
                  ? `${
                      otherUserProfile?.work_info[0].is_currently_working
                        ? otherUserProfile?.work_info[0]?.company_name
                        : otherUserProfile?.work_info[
                            otherUserProfile?.work_info.length - 1
                          ]?.company_name
                    } \u25CF\n ${
                      otherUserProfile?.education_info != null &&
                      otherUserProfile?.education_info.length > 0
                        ? otherUserProfile?.education_info[
                            otherUserProfile?.education_info.length - 1
                          ].school
                        : ''
                    }`
                  : ''
                : otherUserProfile?.userinfo?.company_name || ''}
            </CustomText>

            <View style={{ alignItems: 'center', marginTop: height * 0.01 }}>
              <View
                style={{
                  backgroundColor: Colors.PrimaryLightBlue,
                  paddingHorizontal: width * 0.01,
                  paddingVertical: width * 0.005,
                  borderRadius: 4,
                }}
              >
                <CustomText
                  textAlign={'center'}
                  {...theme.fontMedium}
                  fontSize={`${fontResize(height * 0.012)}px`}
                  textColor={Colors.Blueberry}
                >
                  {`${otherUserProfile?.followers || 0} ${Strings.CONNECTIONS}`}
                </CustomText>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: '60%',
                marginTop: height * 0.02,
                alignSelf: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  width: '40%',
                  marginRight: '5%',
                  marginLeft: '5%',
                  backgroundColor: Colors.Blueberry,
                  padding: height * 0.01,
                  borderRadius: height * 0.005,
                }}
                onPress={() => {
                  !otherUserProfile?.is_followed
                    ? followUser(otherUserProfile?._id)
                    : unfollowUser(otherUserProfile?._id);
                }}
              >
                <CustomText
                  textAlign={'center'}
                  {...theme.fontMedium}
                  fontSize={`${fontResize(height * 0.014)}px`}
                  textColor={Colors.White}
                >
                  {otherUserProfile?.is_followed ? 'Following' : 'Follow'}
                </CustomText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  contactUser();
                }}
                style={{
                  width: '40%',
                  marginRight: '5%',
                  marginLeft: '5%',
                  padding: height * 0.01,
                  borderRadius: height * 0.005,
                  borderWidth: 1,
                  borderColor: Colors.PumpkinColor,
                }}
              >
                <CustomText
                  textAlign={'center'}
                  {...theme.fontMedium}
                  fontSize={`${fontResize(height * 0.014)}px`}
                  textColor={Colors.PumpkinColor}
                >
                  Contact
                </CustomText>
              </TouchableOpacity>
            </View>

            {showFullProfile ? (
              ''
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setFullProfile(true);
                }}
                style={{ alignItems: 'center', marginTop: height * 0.02 }}
              >
                <View style={{ paddingVertical: 2 }}>
                  <CustomText
                    textAlign={'center'}
                    {...theme.fontMedium}
                    fontSize={`${fontResize(height * 0.014)}px`}
                    textColor={Colors.Blueberry}
                  >
                    {Strings.VIEW_FULL_PROFILE}
                  </CustomText>
                  <View
                    style={{ height: 1, backgroundColor: Colors.Blueberry }}
                  ></View>
                </View>
              </TouchableOpacity>
            )}

            {showFullProfile ? (
              <View style={{ width: '100%', margin: height * 0.015 }}>
                {otherUserProfile?.role !== Strings.PROFESSIONAL && (
                  <>
                    <DetailsComponent
                      width={width}
                      height={height}
                      onPress={() => {}}
                      title={Strings.CONTACT_INFO}
                      containerStyle={[
                        {
                          width: width * 0.9,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: 10,
                        },
                        style.profileMarginBottom,
                        style.profileMarginTop,
                      ]}
                    />
                    <AddressComponent
                      image={Email}
                      text={
                        otherUserProfile?.email ? otherUserProfile?.email : ''
                      }
                    />
                    <AddressComponent
                      image={Call}
                      text={
                        otherUserProfile?.phone_number
                          ? `${otherUserProfile?.country_code} ${otherUserProfile?.phone_number}`
                          : ''
                      }
                      container={{ marginBottom: height * 0.03 }}
                    />
                  </>
                )}
                {professionalUserDetails()}
                {otherUserProfile?.role !== Strings.PROFESSIONAL &&
                otherUserProfile?.userinfo ? (
                  otherUserDetails()
                ) : (
                  <View />
                )}
              </View>
            ) : (
              ''
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ProfileDetail;
