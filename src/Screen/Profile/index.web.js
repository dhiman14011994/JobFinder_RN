import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../../Resources/Colors';
import { useDispatch, useSelector } from 'react-redux';
import EndPoint from '../../Redux/constants/EndPoint';
import { style } from './styles';
import Strings from '../../Resources/Strings';
import {
  fetchMyProfile,
  fetchOrganizationMyProfile,
  fetchRecruiterMyProfile,
} from '../../Redux/actions/profileAction';
import { Image } from '../../Component/CustomComponent';
import {
  DotIcon,
  Email,
  Call,
  CompanyIcon,
} from '../../Resources/assets/ProfileAssets';
import { dummyImage, pdfIcon, settingIcon } from '../../Resources/assets';
import DetailsComponent from '../../Component/DetailsComponent';
import AddressComponent from '../../Component/AddressComponent';
import WorkExperienceComponent from '../../Component/WorkExperienceComponent';
import { RouteName } from '../../Navigation/routeName';
import { useNavigation } from '@react-navigation/native';
import { CircularProgressbar } from 'react-circular-progressbar';
import './Css/styles.css';
import UnlockFullAccess from '../../Component/UnlockFullAccess';
import Emitter from '../../Util/eventEmitter';
import CustomEducationComponent from '../../Component/CustomEducationComponent';

const Profile = () => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state?.profile?.myProfile);
  const userData = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.token);
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const [isEdit, setEdit] = useState(false);
  const [showUnlockFullAccess, setShowUnlockFullAccess] = useState(
    userInfo?.profile_subscription ? false : true
  );

  useEffect(() => {
    fetchProProfile();
    Emitter.on('profileUpdate', () => {
      fetchProProfile();
    });
    return () => {
      Emitter.off('profileUpdate');
    };
  }, []);

  const fetchProProfile = () => {
    if (type == Strings.PROFESSIONAL) {
      dispatch(
        fetchMyProfile({
          token,
          onSuccess: (result) => { },
          onError: (error) => { },
        })
      );
    } else if (type === Strings.RECRUITER) {
      dispatch(
        fetchRecruiterMyProfile({
          token,
          onSuccess: (result) => { },
          onError: (error) => { },
        })
      );
    } else if (type === Strings.ORGANIZATION) {
      dispatch(
        fetchOrganizationMyProfile({
          token,
          onSuccess: (result) => { },
          onError: (error) => { },
        })
      );
    }
  };
  return (
    <View style={[style.webContainer, { height: height * 0.8 }]}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={[style.scrollContainer, , { height: height * 0.8 }]}
      >
        <Image
          style={{
            height: height * 0.1,
            width: height * 0.1,
            borderRadius: height * 0.2,
            marginTop: 20,
            alignSelf: 'center',
            marginTop: height * 0.02,
          }}
          resizeMode="cover"
          source={
            type == Strings.PROFESSIONAL
              ? userInfo?.image
                ? {
                  uri: `${EndPoint.baseAssestURL}${userInfo?.image}`,
                }
                : dummyImage
              : userInfo?.userinfo?.profile_pic
                ? {
                  uri: `${EndPoint.baseAssestURL}${userInfo?.userinfo?.profile_pic}`,
                }
                : dummyImage
          }
        />
        <View style={style.EditWebButtonVw}>
          <TouchableOpacity
            style={style.bellBtn}
            onPress={() => {
              navigation.navigate(RouteName.MY_EXPEREINCE);
            }}
          >
            <Image height={'22px'} width={'22px'} source={settingIcon} />
          </TouchableOpacity>
        </View>

        <View style={style.userDetailsVw}>
          <Text style={style.userNameTx}>
            {userInfo?.name ? userInfo?.name : ''}
          </Text>
          <Text style={style.userRoleTx}>
            {type === Strings.PROFESSIONAL ? (userInfo?.work_info != null && userInfo?.work_info.length > 0) ? (`${userInfo?.work_info[0].is_currently_working ? userInfo?.work_info[0]?.company_name : userInfo?.work_info[userInfo?.work_info.length - 1]?.company_name} \u25CF\n ${(userInfo?.education_info != null && userInfo?.education_info.length > 0) ? userInfo?.education_info[userInfo?.education_info.length - 1].school : ""}`) : "" : ""}
          </Text>
          <View style={style.connectionView}>
            <Text
              style={style.connectionTx}
            >{`${userInfo.followers} ${Strings.CONNECTIONS}`}</Text>
          </View>

          <View style={style.webProfileCompleteVw}>
            <Text style={style.profileCompletionTx}>
              {Strings.PROFILE_COMPLETION}
            </Text>
            <View style={style.webEmptyVw} />
            <View style={{ width: 40, height: 40 }}>
              <CircularProgressbar
                value={userInfo?.profile_completion || 10}
                text={`${userInfo?.profile_completion || 10}%`}
              />
            </View>
          </View>
          <View style={style.lineVw} />

          <DetailsComponent
            imageWidth={20}
            onPress={() => { }}
            title={Strings.CONTACT_INFO}
            containerStyle={[
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
                width: '100%',
              },
              style.profileMarginBottom,
              style.profileMarginTop,
            ]}
          />
          <AddressComponent
            image={Email}
            text={userInfo?.email ? userInfo?.email : 'xyz@yopmail.com'}
          />
          <AddressComponent
            image={Call}
            text={
              userInfo?.phone_number
                ? `${userInfo?.country_code} ${userInfo?.phone_number}`
                : '91 9876543210'
            }
          />
          {userInfo?.about_me || userInfo?.userinfo?.about_company ? (
            <>
              <Text style={style.aboutTx}>
                {type == Strings.PROFESSIONAL
                  ? Strings.ABOUT
                  : Strings.ABOUT_COMPANY}
              </Text>
              <Text style={style.aboutDetailsTx}>
                {userInfo?.about_me
                  ? userInfo?.about_me
                  : userInfo?.userinfo?.about_company
                    ? userInfo?.userinfo?.about_company
                    : ''}
              </Text>
            </>
          ) : (
            <View />
          )}
          {type == Strings.PROFESSIONAL &&
            <>
              <Text style={style.aboutTx}>
                {Strings.EDUCATION}
              </Text>
              {userInfo?.education_info?.map((item, index) => (
                <CustomEducationComponent
                  data={item}
                />
              ))}
            </>
          }
          {type == Strings.PROFESSIONAL &&
            userInfo !== undefined &&
            userInfo?.work_info != undefined &&
            userInfo?.work_info?.length != undefined && (
              <>
                {userInfo !== undefined &&
                  userInfo?.work_info != undefined &&
                  userInfo?.work_info?.length != undefined ? (
                  userInfo?.work_info?.length != 0 ? (
                    <>
                      <Text style={style.aboutTx}>
                        {Strings.WORK_EXPERIENCE}
                      </Text>

                      {userInfo?.work_info?.map((item, index) => (
                        <WorkExperienceComponent
                          data={item}
                          image={CompanyIcon}
                          title={item?.your_role}
                          date={item.start_date}
                          jobType={''}
                          Experience={'one year'}
                          role={item?.company_name ? item?.company_name : 'XYZ'}
                          startDate={item?.start_date}
                          endDate={item?.end_date}
                        />
                      ))}
                    </>
                  ) : (
                    <View />
                  )
                ) : (
                  <View />
                )}
                {userInfo?.certificates.length != 0 ? (
                  <>
                    <Text style={style.aboutTx}>{Strings.LICENSES}</Text>

                    {userInfo?.certificates?.map((item, index) => (
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
                        Experience={'one year'}
                        role={item?.company_name ? item?.company_name : 'XYZ'}
                      />
                    ))}
                  </>
                ) : (
                  <View />
                )}
              </>
            )}

          {userInfo?.link_your_resume && (
            <>
              <Text style={style.aboutTx}>{'Resume'}</Text>
              <View style={style.pdfVw}>
                <Image
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                  source={pdfIcon}
                />
                <Text style={style.cvtx}>{'Resume.pdf'}</Text>
              </View>
            </>
          )}
          {/* {type == Strings.PROFESSIONAL && showUnlockFullAccess && (
            <View
              style={{
                width: width * 0.21,
                paddingHorizontal: 20,
                paddingVertical: height * 0.03,
                borderRadius: height * 0.02,
                overflow: 'hidden',
                backgroundColor: '#4386C6',
                marginVertical: height * 0.02,
              }}
            >
              <UnlockFullAccess
                onUnlock={() => {
                  // setShowUnlockFullAccess(false);
                  navigation.navigate(RouteName.NOTIFICATION_HEADER_STACK, {
                    screen: RouteName.SUBSCRIPTIONS,
                  });
                }}
                OnCancel={() => setShowUnlockFullAccess(false)}
              />
            </View>
          )} */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
