/* eslint-disable no-unused-expressions */
import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Colors from '../../Resources/Colors';
import { style } from './styles';
import { CustomView, Image } from '../../Component/CustomComponent';
import {
  Call,
  CompanyIcon,
  EditBlack,
  EditIcon,
  Email,
  HideEyes,
  BellIcon,
} from '../../Resources/assets/ProfileAssets';
import {
  Award_ICON,
  COMPANY_ICON,
  dummyImage,
  googleDoc_Icon,
  SettingsImg,
  STAR_ICON,
  SubScriptions,
} from '../../Resources/assets';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Strings from '../../Resources/Strings';
import AddressComponent from '../../Component/AddressComponent';
import DetailsComponent from '../../Component/DetailsComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMyProfile,
  getPrivacySetting,
} from '../../Redux/actions/profileAction';
import WorkExperienceComponent from '../../Component/WorkExperienceComponent';
import { RouteName } from '../../Navigation/routeName';
import EndPoint from '../../Redux/constants/EndPoint';
import { getWorkExperience } from '../../Util/constant';
import { mxHeight } from '../../Util';
import CustomEducationComponent from '../../Component/CustomEducationComponent';
import FastImage from 'react-native-fast-image';
import {
  shortCertificatesInfoData,
  shortEducationsData,
  shortWorkInfoData,
} from './CustomProfileFunction';
import { fontResize } from '../../Util/font';
import Emitter from '../../Util/eventEmitter';
import Type from '../../Constants/Type/type';
import moment from 'moment';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const [fills, setFills] = useState(100);
  const [isEdit, setEdit] = useState(false);

  const userData = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.token);
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;
  const userInfo = useSelector((state) => state?.profile?.myProfile);
  const [showUnlockFullAccess, setShowUnlockFullAccess] = useState(
    userInfo?.profile_subscription ? false : true
  );
  const isNotification = useSelector((state) => state.auth.isNotification);
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
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchProProfile();
    fetchPrivacyData();
    Emitter.on(Type.EMITTER.GET_PROFILE, () => {
      fetchProProfile();
      fetchPrivacyData();
    });
    return () => {
      Emitter.off(Type.EMITTER.GET_PROFILE);
    };
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

  const fetchProProfile = () => {
    if (type == Strings.PROFESSIONAL) {
      dispatch(
        fetchMyProfile({
          token,
          onSuccess: async (result) => {
            setShowUnlockFullAccess(
              userInfo?.profile_subscription == null
                ? true
                : userInfo?.profile_subscription
                ? false
                : true
            );
          },
          onError: (error) => {},
        })
      );
    }
  };

  var msDiff = new Date();
  const workExpAscending = userInfo?.work_info?.sort(
    (a, b) =>
      (b?.end_date == ''
        ? msDiff.getFullYear()
        : moment(b?.end_date).format('yyyy')) -
      (a?.end_date == ''
        ? msDiff.getFullYear()
        : moment(a?.end_date).format('yyyy'))
  );

  return (
    <View style={style.conainer}>
      <ScrollView bounces={false} style={style.scrollContainer}>
        <FastImage
          style={{ height: height * 0.2, width: width }}
          resizeMode="cover"
          source={
            userInfo?.cover_photo
              ? { uri: `${EndPoint.baseAssestURL}${userInfo?.cover_photo}` }
              : require('../../Resources/assets/ProfileAssets/BG_User.png')
          }
        />

        <View style={style.EditButtonVw}>
          <TouchableOpacity
            style={style.bellBtn}
            onPress={() => {
              setEdit(true);
            }}
          >
            <Image
              style={{
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowColor: 'black',
                shadowOpacity: 1,
              }}
              height={'22px'}
              width={'22px'}
              source={EditIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.bellBtn}
            onPress={() => navigation.navigate(RouteName.NOTIFICATION)}
          >
            <Image
              style={{
                ...Platform.select({
                  ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                  },
                  android: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 3,
                  },
                }),
              }}
              height={'22px'}
              width={'22px'}
              source={BellIcon}
            />
            {isNotification && (
              <View
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: 'red',
                  borderRadius: 5,
                  position: 'absolute',
                  right: 10,
                  top: 10,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={style.userImageView({
            height: height,
            width: width,
          })}
        >
          <CustomView
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
                userInfo?.image
                  ? { uri: `${EndPoint.baseAssestURL}${userInfo?.image}` }
                  : dummyImage
              }
            />
          </CustomView>
          {!settingData.name && (
            <Text style={style.userNameTx}>
              {userInfo?.name ? userInfo?.name : 'ABC'}{userInfo?.gold_member ? <Image source={STAR_ICON} style={{width: fontResize(height * 0.03), height: fontResize(height * 0.03)}}/> : ''}
            </Text>
          )}
          <Text style={style.userRoleTx}>
            {type === Strings.PROFESSIONAL
              ? userInfo?.work_info != null && userInfo?.work_info.length > 0
                ? `${
                    shortWorkInfoData(userInfo?.work_info)[0]
                      .is_currently_working
                      ? shortWorkInfoData(userInfo?.work_info)[0]
                          ?.company_name || ''
                      : workExpAscending[0]?.company_name || ''
                  } \u25CF\n ${
                    userInfo?.education_info != null &&
                    userInfo?.education_info.length > 0
                      ? shortEducationsData(userInfo?.education_info)[0].school
                      : ''
                  }`
                : ''
              : ''}
          </Text>
          <View style={style.connectionView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(RouteName.FOLLOWERS);
              }}
            >
              <Text style={style.connectionTx}>{`${userInfo?.followers || 0} ${
                Strings.FOLLOWERS
              }`}</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: fontResize(5) }}>{`\u25CF`}</Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate(RouteName.CONNECTIONS);
              }}
            >
              <Text style={style.connectionTx}>{`${userInfo?.following || 0} ${
                Strings.CONNECTIONS
              } `}</Text>
            </TouchableOpacity>
          </View>
          <View style={style.profileVw({ width })}>
            <Text style={style.profileCompletionTx}>
              {Strings.PROFILE_COMPLETION}
            </Text>
            <View style={style.lineView({ width })} />
            <AnimatedCircularProgress
              size={60}
              width={5}
              fill={
                userInfo?.profile_completion
                  ? userInfo?.profile_completion
                  : fills
              }
              rotation={360}
              tintColor="#4CD964"
              backgroundColor={Colors.Gray}
            >
              {(fill) => (
                <Text style={style.progressText}>
                  {userInfo?.profile_completion
                    ? userInfo?.profile_completion
                    : fills}
                  %
                </Text>
              )}
            </AnimatedCircularProgress>
          </View>
          {!settingData.email_address && !settingData.phone_number && (
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
          {!settingData.email_address && (
            <AddressComponent
              image={Email}
              text={userInfo?.email ? userInfo?.email : 'xyz@yopmail.com'}
            />
          )}
          {!settingData.phone_number && (
            <AddressComponent
              image={Call}
              text={
                userInfo?.phone_number
                  ? `${userInfo?.country_code} ${userInfo?.phone_number}`
                  : '91 9876543210'
              }
            />
          )}

          {!settingData.about_me && (
            <>
              <Text style={style.aboutTx}>{Strings.ABOUT}</Text>
              <Text style={style.aboutDetailsTx}>
                {userInfo?.about_me
                  ? userInfo?.about_me
                  : 'Highly experienced in managing the promotion and positioning of brands, products, and services. Highly experienced in managing the promotion and positioning of brands, products, and services.'}
              </Text>
            </>
          )}

          {type === Strings.PROFESSIONAL && (
            <View style={style.educationContainer}>
              {userInfo?.education_info != undefined &&
                userInfo?.education_info != null &&
                userInfo?.education_info.length != 0 && (
                  <Text style={style.aboutTx}>{Strings.EDUCATION}</Text>
                )}
              {shortEducationsData(userInfo?.education_info || []).map(
                (item, index) => (
                  <CustomEducationComponent data={item} />
                )
              )}
            </View>
          )}
          {!settingData.work_experience && (
            <>
              <Text style={style.aboutTx}>{Strings.WORK_EXPERIENCE}</Text>

              {shortWorkInfoData(userInfo?.work_info)?.map((item, index) => (
                <WorkExperienceComponent
                  data={item}
                  image={COMPANY_ICON}
                  title={item?.your_role}
                  date={item.start_date}
                  jobType={''}
                  Experience={getWorkExperience({
                    startDate: item?.start_date,
                    endDate: item?.end_date,
                  })}
                  role={item?.company_name ? item?.company_name : 'XYZ'}
                  startDate={item?.start_date}
                  endDate={item?.end_date}
                />
              ))}
            </>
          )}
          {!settingData.certificates &&
          userInfo?.certificates != undefined &&
          userInfo?.certificates != null &&
          userInfo?.certificates?.length !== 0 ? (
            <>
              <Text style={style.aboutTx}>{Strings.LICENSES}</Text>
              {shortCertificatesInfoData(userInfo?.certificates)?.map(
                (item, index) => (
                  <WorkExperienceComponent
                    data={item}
                    image={
                      item.certificate_image
                        ? {
                            uri: `${EndPoint.baseAssestURL}${item.certificate_image}`,
                          }
                        : CompanyIcon
                    }
                    title={item?.title}
                    date={item.start_date}
                    startDate={item?.start_date}
                    endDate={item?.end_date}
                    jobType={''}
                    isCertificates={true}
                    Experience={getWorkExperience({
                      startDate: item?.start_date,
                      endDate: item?.end_date,
                    })}
                    role={item?.company_name ? item?.company_name : 'XYZ'}
                  />
                )
              )}
            </>
          ) : (
            <View />
          )}

          {userInfo?.link_your_resume !== '' ? (
            <>
              <Text style={style.aboutTx}>{'Resume'}</Text>
              <View style={style.pdfVw}>
                <Image
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                  source={
                    userInfo?.resume_type == Strings.GOOGLE_DRIVE_DOC ||
                    userInfo?.resume_type == Strings.LOCAL
                      ? googleDoc_Icon
                      : require('../../Resources/assets/PdfIcon.png')
                  }
                />
                <Text style={style.cvtx}>
                  {userInfo?.resume_name || 'Resume.pdf'}
                </Text>
              </View>
            </>
          ) : (
            <View />
          )}
          <View style={{ height: mxHeight * 0.1 }} />
        </View>
      </ScrollView>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={isEdit}
        onRequestClose={() => {
          setEdit(false);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setEdit(false)}
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }}
        >
          <View style={style.modalMainContainer}>
            <TouchableOpacity
              style={style.editDetailsBtn}
              onPress={() => {
                setEdit(false);
                navigation.navigate(RouteName.EDIT_PROFILE);
              }}
            >
              <Image height={'14px'} width={'14px'} source={EditBlack} />
              <Text style={style.editDetails}>{Strings.EDIT_DETAILS}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.editDetailsBtn}
              onPress={() => setEdit(false)}
            >
              <Image height={'14px'} width={'14px'} source={HideEyes} />
              <Text style={style.editDetails}>{Strings.MY_WORKSPLACE}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.editDetailsBtn}
              onPress={() => {
                navigation.navigate(RouteName.SETTINGS_STACK);
                setEdit(false);
              }}
            >
              <Image height={'14px'} width={'14px'} source={SettingsImg} />
              <Text style={style.editDetails}>{Strings.SETTINGS}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={style.editDetailsBtn}
              onPress={() => {
                navigation.navigate(RouteName.SUBSCRIPTIONS);
                setEdit(false);
              }}
            >
              <Image height={'14px'} width={'14px'} source={Award_ICON} />
              <Text style={[style.editDetails, { textAlign: 'center' }]}>
                {Strings.SWITCH_SUBSCRIPTION}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Profile;
