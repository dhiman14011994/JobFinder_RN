import {
  useWindowDimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Text,
  Modal,
  Image,
  View,
  useColorScheme,
} from 'react-native';
import React, { useState } from 'react';
import { CustomText, CustomView } from '../../Component/CustomComponent';
import Strings from '../../Resources/Strings';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
import SummaryComponent from '../../Component/SummaryComponent';
import { edit, success } from '../../Resources/assets';
import CustomButton from '../../Component/CustomButton';
import { setLoading, signUp } from '../../Redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { backIcon } from '../../Resources/assets';
import { isNative } from '../../Util';
import {
  BackButton,
  HeaderContainer,
} from '../Authentication/VerificationStyle';
import { imageUplaod } from '../../Redux/services/profileService';
import { createJobPost } from '../../Redux/services/jobsService';
import EndPoint from '../../Redux/constants/EndPoint';
import { RouteName } from '../../Navigation/routeName';
import moment from 'moment';
import Emitter from '../../Util/eventEmitter';

const JobSummary = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const window = useWindowDimensions();
  const userData = useSelector((state) => state.auth.userData);
  const userType = useSelector((state) => state.auth.userType);
  const localData = route.params.data;

  const [isJobCreated, setJobCreated] = useState(false);
  const selectUser = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const backToHome = () => {
    navigation.popToTop();
  };

  const goToSummary = async () => {
    try {
      dispatch(setLoading(true));
      let apiRequestData = {};

      if (localData.companyLogo != '') {
        let imageData = {
          uri: localData.companyLogo,
          type: 'image/jpg',
          name: 'image.jpg',
        };
        var getImageURI = await imageUplaod({
          file: imageData,
          token: userData?.access_token,
        });
        var data = {
          job_title: localData.title,
          company_name: localData.companyName,
          company_logo: getImageURI.data[0],
          role: selectUser,
          job_type: localData.jobType,
          salary_range: localData.salary_range,
          salary_period: localData.salary_period,
          address: localData.address,
          job_description: localData.jobDescription,
          qualification: localData.qualifications,
        };
        apiRequestData = { ...data };
      } else {
        var data = {
          job_title: localData.title,
          company_name: localData.companyName,
          role: selectUser,
          job_type: localData.jobType,
          salary_range: localData.salary_range,
          salary_period: localData.salary_period,
          address: localData.address,
          job_description: localData.jobDescription,
          qualification: localData.qualifications,
        };
        apiRequestData = { ...data };
      }

      var createJobResponse = await createJobPost(apiRequestData);
      if (createJobResponse.code == 200) {
        Emitter.emit('JobCreated');
        dispatch(setLoading(false));
        setJobCreated(true);
      } else {
        console.log('job not create');
      }
      console.log(createJobResponse);
    } catch (error) {
      // alert(error)
      console.log('error', error);
      dispatch(setLoading(false));
    }
    // navigation.navigate(RouteName.CREATE_EVENT_POST)
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.White }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {isNative && (
          <HeaderContainer marginTop={0}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ padding: 15 }}
            >
              <BackButton resizeMode="contain" source={backIcon} />
            </TouchableOpacity>
          </HeaderContainer>
        )}

        <View alignItems={'center'} flexDirection={'row'}>
          <CustomText
            marginLeft={window.width * 0.05}
            fontSize={fontResize(30)}
            textColor={Colors.Black}
            fontFamily={'Gilroy-Bold'}
          >
            {Strings.SUMMARY}
          </CustomText>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: window.width * 0.15 }}
          >
            <Image
              style={{
                width: window.width * 0.05,
                height: window.width * 0.05,
              }}
              resizeMode="contain"
              source={edit}
            />
          </TouchableOpacity>
        </View>

        <CustomView
          width={window.width * 0.9}
          marginLeft={window.width * 0.05}
          marginRight={window.width * 0.05}
          marginTop={window.height * 0.05}
          height={window.height * 0.787}
        >
          <ScrollView
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{ width: window.width * 0.9 }}
          >
            <SummaryComponent
              label={Strings.JOB_POST_TITLE}
              data={localData.title}
            />
            <SummaryComponent
              label={Strings.COMPANY_NAME}
              data={localData.companyName}
            />
            <SummaryComponent
              label={Strings.COMPANY_LOGO}
              data={localData.companyLogo}
              isImage
              isLocal
            />
            <SummaryComponent
              label={Strings.JOB_TYPE}
              data={localData.jobType}
            />
            <SummaryComponent
              label={Strings.ADDRESS}
              data={localData.address}
            />
            <SummaryComponent
              label={Strings.SALARY_RANGE}
              data={`${localData.salary_range} (${localData.salary_period})`}
            />

            <View
              style={{
                flexDirection: 'column',
                marginVertical: window.width * 0.02,
              }}
            >
              <CustomText
                fontFamily={'Gilroy-Bold'}
                textColor={Colors.PrimaryGray}
                style={{ paddingEnd: window.width * 0.05 }}
              >
                {Strings.JOB_DESCRIPTION} :{' '}
              </CustomText>
              <CustomText
                fontFamily={'Gilroy-Bold'}
                textColor={Colors.Black}
                style={{ paddingVertical: window.width * 0.03 }}
              >
                {localData.jobDescription}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'column',
                marginVertical: window.width * 0.02,
              }}
            >
              <CustomText
                fontFamily={'Gilroy-Bold'}
                textColor={Colors.PrimaryGray}
                style={{ paddingEnd: window.width * 0.05 }}
              >
                {Strings.QUALIFICATIONS} :{' '}
              </CustomText>
              <CustomText
                fontFamily={'Gilroy-Bold'}
                textColor={Colors.Black}
                style={{ paddingVertical: window.width * 0.03 }}
              >
                {localData.qualifications}
              </CustomText>
            </View>

            <CustomButton
              onPress={() => {
                goToSummary();
              }}
              width={'100%'}
              height={'50px'}
              backgroundColor={Colors.Blueberry}
              marginTop={window.height * 0.03}
              marginBottom={window.height * 0.1}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              fontFamily={'Gilroy-SemiBold'}
              fontSize={'18px'}
              textColor={Colors.White}
              text={Strings.CREATE_JOB_POST}
            />
          </ScrollView>
        </CustomView>
      </KeyboardAvoidingView>
      <Modal
        animated={true}
        animationType={'fade'}
        onDismiss={() => {
          console.log('Modal has been closed');
          // alert("Modal has been closed.");
          backToHome();
        }}
        // transparent={true}
        visible={isJobCreated}
      >
        <View
          style={{
            backgroundColor: Colors.lightGray,
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.White,
              borderTopEndRadius: 32,
              borderTopStartRadius: 32,
              marginTop: window.width * 0.3,
              flex: 1,
              paddingLeft: window.width * 0.05,
              paddingRight: window.width * 0.05,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              style={{
                width: window.width * 0.3,
                height: window.width * 0.3,
              }}
              resizeMode="cover"
              source={success}
            />
            <CustomText
              fontFamily={'Gilroy-Bold'}
              textColor={Colors.Black}
              fontSize="24px"
              style={{ paddingVertical: window.width * 0.05 }}
            >
              {Strings.SUBMITTED}
            </CustomText>
            <CustomButton
              onPress={() => {
                setJobCreated(false);
                setTimeout(() => {
                  backToHome();
                }, 200);
              }}
              buttonContainer={{ position: 'absolute', bottom: 0 }}
              width={'100%'}
              height={'50px'}
              backgroundColor={Colors.Blueberry}
              marginTop={window.height * 0.03}
              marginBottom={window.height * 0.1}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              fontFamily={'Gilroy-SemiBold'}
              fontSize={'18px'}
              textColor={Colors.White}
              text={Strings.OK}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default JobSummary;
