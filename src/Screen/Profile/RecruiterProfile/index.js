/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  ImageBackground,
  TouchableOpacity,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  ContainerView,
  CustomText,
  CustomView,
  Image,
} from '../../../Component/CustomComponent';
import Colors from '../../../Resources/Colors';
import { fontResize } from '../../../Util/font';
import EndPoint from '../../../Redux/constants/EndPoint';
import { useDispatch, useSelector } from 'react-redux';
import { style } from './style';
import {
  BackgroundImg,
  DownArrow,
  RightArrow,
  RightTick,
  UploadIcon,
  UploadImageIcon,
  EditRecruiterIcon,
  LocationIcon,
  Calender,
  Email,
  Call,
  ClockIcon,
  CompanyIcon,
} from '../../../Resources/assets/ProfileAssets';
import { backIcon, dummyImage } from '../../../Resources/assets';
import { RouteName } from '../../../Navigation/routeName';
import Strings from '../../../Resources/Strings';
import DetailsComponent from '../../../Component/DetailsComponent';
import AddressComponent from '../../../Component/AddressComponent';
import WorkExperienceComponent from '../../../Component/WorkExperienceComponent';
import { setLoading } from '../../../Redux/actions/authAction';
import { fetchRecruiterMyProfile } from '../../../Redux/actions/profileAction';

const RecruiterProfile = ({ navigation }) => {
  const window = useWindowDimensions();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [userImage, setuserImage] = useState(
    userData?.data?.image ? userData?.data?.image : ''
  );
  const token = useSelector((state) => state.auth.token);
  const userInfo = useSelector((state) => state?.profile?.myProfile);
  const [userBackground, setUserBackground] = useState('');
  const followerList = [1, 2, 3, 4];
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;
  const [items, setItems] = useState('');
  const vacanciesExp = [
    {
      image: CompanyIcon,
      title: 'AR&D Associate Scientist  ',
      jobtype: 'England, UK',
      duration: '4 Years',
      date: '2 days ago',
    },
    {
      image: CompanyIcon,
      title: 'Product Marketing Manager',
      jobtype: 'California, USA',
      duration: '1 Year',
      date: '4 days ago',
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
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
                userBackground == ''
                  ? BackgroundImg
                  : { uri: `${EndPoint.baseAssestURL}${userBackground}` }
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
                    navigation.navigate(RouteName.RECUITER_COMPANY);
                  }}
                >
                  <Image
                    resizeMode={'cover'}
                    height={'40px'}
                    width={'40px'}
                    source={EditRecruiterIcon}
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
                  userImage == ''
                    ? dummyImage
                    : {
                        uri: `${EndPoint.baseAssestURL}${userInfo.userinfo.image}`,
                      }
                }
              />
            </CustomView>
            <Text style={style.userNameTx}>
              {userInfo?.name ? userInfo?.name : 'ABC '}
              <Image
                resizeMode={'contain'}
                height={10}
                width={10}
                source={RightTick}
              />
            </Text>
            <Text style={style.userRoleTx}>
              {userInfo?.role ? userInfo?.role : 'Project Manager'}
            </Text>
            <CustomView
              width={window.width * 0.9}
              height={'1px'}
              bgColor={'#E0E0E0'}
              marginBottom={window.height * 0.04}
              marginTop={window.height * 0.03}
            />
            <Text style={style.followersTx}>{'0 Followers'}</Text>
          </View>
          <View
            style={{
              width: window.width,
              padding: window.width * 0.05,
              alignItems: 'center',
              backgroundColor: '#E5E5E5',
              marginTop: window.height * 0.04,
            }}
          >
            <View style={style.seeAllVw}>
              <Text style={style.recentTx}>{Strings.RECENT_CONTACTS}</Text>
              <Text style={style.viewAllTx}>{Strings.VIEW_ALL}</Text>
            </View>
            <View style={[style.seeAllVw, { marginTop: 10 }]}>
              {followerList.map((item, index) => (
                <TouchableOpacity>
                  <Image
                    width={window.width * 0.2}
                    height={window.width * 0.2}
                    resizeMode={'cover'}
                    style={{ borderRadius: window.width * 0.2 }}
                    source={dummyImage}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View
            style={{
              width: window.width * 0.9,
              marginHorizontal: window.width * 0.05,
              alignItems: 'center',
              marginVertical: window.width * 0.1,
            }}
          >
            {/* <DetailsComponent
              width={window.width}
              height={window.height}
              title={Strings.DETAILS}
              containerStyle={[
                style.profileVw({width: window.width}),
                style.profileMarginBottom,
              ]}
            />
            <AddressComponent
              image={LocationIcon}
              text={'3641 Zimmerman Lane, Los Angeles, California, 90017'}
            />
            <AddressComponent
              image={ClockIcon}
              text={'Mon to Fri, 9 AM to 6 PM'}
            /> */}
            <DetailsComponent
              width={window.width}
              height={window.height}
              title={Strings.CONTACT_INFO}
              containerStyle={[
                style.profileVw({ width: window.width }),
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

            <Text style={style.aboutTx}>{Strings.ABOUT}</Text>
            <Text style={style.aboutDetailsTx}>
              {
                'Highly experienced in managing the promotion and positioning of brands, products, and services. Highly experienced in managing the promotion and positioning of brands, products, and services.'
              }
            </Text>
            <View style={[style.seeAllVw, { marginTop: 20 }]}>
              <Text style={style.recentTx}>{Strings.VACANCIES}</Text>
              <Text style={style.seeAllTx}>{Strings.SEE_ALL}</Text>
            </View>
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
                isVacancies={true}
              />
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RecruiterProfile;
