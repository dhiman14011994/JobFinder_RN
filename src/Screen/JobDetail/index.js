import {
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { CustomText } from '../../Component/CustomComponent';
import Strings from '../../Resources/Strings';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
import SummaryComponent from '../../Component/SummaryComponent';
import { backIcon, PostPlaceholder } from '../../Resources/assets';
import CustomButton from '../../Component/CustomButton';

import { useDispatch, useSelector } from 'react-redux';
import { rightIcon } from '../../Resources/assets';
import { isNative, mxHeight, mxWidth } from '../../Util';
import {
  BackButton,
  HeaderContainer,
} from '../Authentication/VerificationStyle';

import EndPoint from '../../Redux/constants/EndPoint';
import { RouteName } from '../../Navigation/routeName';

import {
  fetchJobById,
  setLoading,
} from '../../Redux/actions/jobAndEventAction';
import { theme } from '../../Util/constant';
import FastImage from 'react-native-fast-image';

const JobDetail = ({ navigation, route }) => {
  const window = useWindowDimensions();
  const jobDetail = useSelector((state) => state.jobAndEvent.jobDetail);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchJobByIdAPI();
  }, []);

  const fetchJobByIdAPI = () => {
    try {
      const { eventId } = route.params;
      dispatch(setLoading(true));
      dispatch(
        fetchJobById({
          eventId,
          onSuccess: (result) => {
            dispatch(setLoading(false));
          },
          onError: (error) => {
            dispatch(setLoading(false));
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const backToHome = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.White, height: mxHeight }}>
      {isNative && (
        <HeaderContainer marginTop={0}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              padding: 20,
              borderRadius: 10,
              backgroundColor: Colors.GhostWhite,
              marginLeft: mxWidth * 0.05,
            }}
          >
            <BackButton resizeMode="contain" source={backIcon} />
          </TouchableOpacity>
        </HeaderContainer>
      )}
      <ScrollView
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            width: mxWidth * 0.9,
            marginHorizontal: mxWidth * 0.05,
            marginTop: mxWidth * 0.05,
          }}
        >
          <View alignItems={'center'} flexDirection={'row'}>
            <CustomText fontSize={fontResize(30)} {...theme.fontSemiBold}>
              {jobDetail && jobDetail?.job_title}
            </CustomText>
          </View>
          <View style={{ height: mxWidth * 0.05 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                height: mxWidth * 0.2,
                width: mxWidth * 0.2,
                backgroundColor: 'white',
                borderRadius: 10,
                borderColor: Colors.SpanishGray,
                borderWidth: 2,
                overflow: 'hidden',
              }}
            >
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  height: mxWidth * 0.2,
                  width: mxWidth * 0.2,
                  backgroundColor: 'white',
                  borderRadius: 10,
                }}
                defaultSource={PostPlaceholder}
                source={
                  jobDetail?.company_logo
                    ? {
                        uri: EndPoint.baseAssestURL + jobDetail?.company_logo,
                        priority: FastImage.priority.high,
                      }
                    : PostPlaceholder
                }
              />
            </View>
            <View style={{ paddingHorizontal: 12 }}>
              <CustomText
                {...theme.fontSemiBold}
                textColor={Colors.Black}
                marginBottom={'10px'}
                style={{ paddingEnd: window.width * 0.05 }}
              >
                {jobDetail && jobDetail?.job_title}
              </CustomText>
              <CustomText
                {...theme.fontSemiBold}
                fontSize={12}
                textColor={Colors.PrimaryGray}
                style={{ paddingEnd: window.width * 0.05 }}
              >
                {jobDetail && jobDetail?.company_name}
              </CustomText>
            </View>
          </View>

          <View style={{ height: mxWidth * 0.05 }} />
          <SummaryComponent
            label={Strings.JOB_POST_TITLE}
            data={jobDetail && jobDetail?.job_title}
          />
          <View style={{ height: mxWidth * 0.05 }} />
          <SummaryComponent
            label={Strings.JOB_TIME}
            data={jobDetail && jobDetail?.job_type}
          />
          <View style={{ height: mxWidth * 0.05 }} />
          <SummaryComponent
            label={Strings.SALARY_RANGE}
            data={`${jobDetail && jobDetail?.salary_range} (${
              jobDetail && jobDetail?.salary_period
            })`}
          />
          <View style={{ height: mxWidth * 0.05 }} />
          <SummaryComponent
            label={Strings.ADDRESS}
            data={jobDetail && jobDetail?.address}
          />
          <View style={{ height: mxWidth * 0.05 }} />
          <View
            style={{
              flexDirection: 'column',
              marginVertical: window.width * 0.02,
            }}
          >
            <CustomText
              {...theme.fontSemiBold}
              textColor={Colors.PrimaryGray}
              style={{ paddingEnd: window.width * 0.05 }}
            >
              {Strings.JOB_DESCRIPTION} :{' '}
            </CustomText>
            <View style={{ height: mxWidth * 0.05 }} />
            <CustomText
              {...theme.fontMedium}
              style={{ paddingVertical: window.width * 0.03 }}
            >
              {jobDetail && jobDetail?.job_description}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'column',
              marginVertical: window.width * 0.02,
            }}
          >
            <CustomText
              {...theme.fontSemiBold}
              textColor={Colors.PrimaryGray}
              style={{ paddingEnd: window.width * 0.05 }}
            >
              {Strings.QUALIFICATIONS} :{' '}
            </CustomText>
            <CustomText
              {...theme.fontMedium}
              style={{ paddingVertical: window.width * 0.03 }}
            >
              {jobDetail && jobDetail?.qualification}
            </CustomText>
          </View>

          <CustomButton
            onPress={() =>
              navigation.navigate(RouteName.APPLY_JOB, {
                jobId: jobDetail?._id,
                jobDetail: jobDetail,
              })
            }
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
            text={Strings.APPLY_JOB}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetail;
