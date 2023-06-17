import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import {
  CustomText,
  CustomView,
  ContainerView,
} from '../../Component/CustomComponent';
import Colors from '../../Resources/Colors';
import { theme } from '../../Util/constant';
import { fontResize } from '../../Util/font';
import Strings from '../../Resources/Strings';
import { edit, success, headerImage } from '../../Resources/assets';
import SummaryComponent from '../../Component/SummaryComponent';
import CustomButton from '../../Component/CustomButton';
import { mxWidth } from '../../Util';
import { useDispatch, useSelector } from 'react-redux';
import Emitter from '../../Util/eventEmitter';
import { createJobPost } from '../../Redux/services/jobsService';
import { setLoading } from '../../Redux/actions/authAction';
import { imageUplaod } from '../../Redux/services/profileService';
import Success from '../../Component/Success/index.web';
import EndPoint from '../../Redux/constants/EndPoint';

const JobSummary = ({ navigation, route }) => {
  const { width, height } = Dimensions.get('window');
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const userType = useSelector((state) => state.auth.userType);
  const [isCreated, setCreated] = useState(false);

  const selectUser = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;
  const localData = route.params.data;

  const backToHome = () => {
    navigation.popToTop();
  };

  const goToSummary = async () => {
    try {
      dispatch(setLoading(true));
      let apiRequestData = {};

      if (localData.companyLogo != '') {
        var data = {
          job_title: localData.title,
          company_name: localData.companyName,
          company_logo: localData.companyLogo,
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
        setCreated(true);
      } else {
      }
      console.log(createJobResponse);
    } catch (error) {
      // alert(error)
      console.log('error', error);
      dispatch(setLoading(false));
    }
    // navigation.navigate(RouteName.CREATE_EVENT_POST)
  };

  const window = useWindowDimensions();
  return (
    <ScrollView bounces={false} style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          paddingVertical: window.height * 0.03,
          paddingHorizontal: window.width * 0.1,
          backgroundColor: Colors.White,
          flex: 1,
        }}
      >
        <View
          style={{ flexDirection: 'row', width: '10%', alignItems: 'center' }}
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
            {Strings.SUMMARY}
          </CustomText>

          <Image
            style={{
              width: window.width * 0.02,
              height: window.width * 0.02,
              marginStart: window.width * 0.02,
            }}
            resizeMode="contain"
            source={edit}
          />
        </View>

        <View style={{ width: '100%', flexDirection: 'row' }}>
          <View style={{ width: '50%', flexDirection: 'row' }}>
            <View style={styles.viewComponent}>
              <CustomText
                style={{
                  marginVertical: window.height * 0.03,
                  color: Colors.DimGray,
                }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {'Title of the Job: '}
              </CustomText>
              <CustomText
                style={{
                  marginVertical: window.height * 0.03,
                  color: Colors.DimGray,
                }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {'Company Name: '}
              </CustomText>

              <CustomText
                style={{
                  marginVertical: window.height * 0.03,
                  color: Colors.DimGray,
                }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {'Comapany Logo'}
              </CustomText>

              <CustomText
                style={{
                  marginVertical: window.height * 0.03,
                  color: Colors.DimGray,
                }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {'Job Type: '}
              </CustomText>

              <CustomText
                style={{
                  marginVertical: window.height * 0.03,
                  color: Colors.DimGray,
                }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {'Salary Range: '}
              </CustomText>

              <CustomText
                style={{
                  marginVertical: window.height * 0.03,
                  color: Colors.DimGray,
                }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {'Address: '}
              </CustomText>
            </View>

            <View
              style={[
                styles.viewComponent,
                { marginLeft: window.height * 0.05 },
              ]}
            >
              <CustomText
                style={{ marginVertical: window.height * 0.03 }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {localData.title}
              </CustomText>
              <CustomText
                style={{ marginVertical: window.height * 0.03 }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {localData.companyName}
              </CustomText>
              <Image
                style={{
                  width: window.height * 0.085,
                  height: window.height * 0.085,
                }}
                resizeMode="contain"
                source={
                  localData?.companyLogo
                    ? {
                        uri: `${EndPoint.baseAssestURL}${localData?.companyLogo}`,
                      }
                    : headerImage
                }
              />

              <CustomText
                style={{ marginVertical: window.height * 0.03 }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {localData.jobType}
              </CustomText>

              <CustomText
                style={{ marginVertical: window.height * 0.03 }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {`${localData.salary_range} (${localData.salary_period})`}
              </CustomText>

              <CustomText
                style={{ marginVertical: window.height * 0.03 }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {localData.address}
              </CustomText>
            </View>
          </View>

          <View style={{ width: '50%', flexDirection: 'row' }}>
            <View style={styles.viewComponent}>
              <CustomText
                style={{
                  color: Colors.DimGray,
                  marginTop: window.height * 0.03,
                }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {'Job Description : '}
              </CustomText>
              <CustomText
                style={{
                  marginTop: window.height * 0.01,
                  color: Colors.DimGray,
                }}
                fontSize={fontResize(mxWidth * 0.009)}
                {...theme.fontSemiBold}
              >
                {localData.jobDescription}
              </CustomText>

              <CustomText
                style={{
                  marginTop: window.height * 0.03,
                  color: Colors.DimGray,
                }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {'Qualifications: '}
              </CustomText>
              <CustomText
                style={{
                  marginTop: window.height * 0.01,
                  color: Colors.DimGray,
                }}
                fontSize={fontResize(mxWidth * 0.009)}
                {...theme.fontSemiBold}
              >
                {localData.qualifications}
              </CustomText>
            </View>
          </View>
        </View>

        <CustomButton
          onPress={() => {
            goToSummary();
          }}
          alignSelf={'flex-start'}
          width={window.width * 0.3}
          height={'60px'}
          backgroundColor={Colors.Blueberry}
          borderRadius={'10px'}
          fontSize={'16px'}
          textColor={Colors.White}
          textTransform={'capitalize'}
          text={'Continue'}
        />
      </View>

      <Success
        setCreated={setCreated}
        isCreated={isCreated}
        navigation={navigation}
      ></Success>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewComponent: {
    flexDirection: 'column',
    marginVertical: 20,
  },
});

export default JobSummary;
