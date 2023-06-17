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
import { createEventPost } from '../../Redux/services/jobsService';
import moment from 'moment';
import EndPoint from '../../Redux/constants/EndPoint';

const EventSummary = ({ navigation, route }) => {
  const { width, height } = Dimensions.get('window');
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const userType = useSelector((state) => state.auth.userType);
  const [isCreated, setCreated] = useState(false);
  const selectUser = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const localData = route.params.data;
  const window = useWindowDimensions();

  const goToSummary = async () => {
    try {
      dispatch(setLoading(true));
      let apiRequestData = {};
      const localTime = new Date(localData.dateAndTime);
      const utcTime = moment.utc(localTime).format('YYYY-MM-DD HH:mm:ss Z');

      console.log('format', utcTime);
      if (localData.companyLogo != '') {
        // var getImageURI = await imageUplaod({
        //   file: imageData,
        //   token: userData?.access_token,
        // });
        var data = {
          event_title: localData.title,
          company_logo: localData.companyLogo,
          role: selectUser,
          attendees: localData.attendees,
          address: localData.address,
          job_description: localData.jobDescription,
          date: utcTime,
        };
        apiRequestData = { ...data };
      }
      console.log('data create event post====>', apiRequestData);

      var createJobResponse = await createEventPost(apiRequestData);

      // console.log(
      //   'data create job post====> createJobResponse',
      //   JOSN.stringify(createJobResponse),
      // );
      if (createJobResponse.code == 200) {
        dispatch(setLoading(false));
        Emitter.emit('EventCreated');
        setCreated(true);
      } else {
        console.log('Something went wrong');
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
                {'Event Name: '}
              </CustomText>

              <CustomText
                style={{
                  marginVertical: window.height * 0.03,
                  color: Colors.DimGray,
                }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {'Comapany Logo: '}
              </CustomText>

              <CustomText
                style={{
                  marginVertical: window.height * 0.03,
                  color: Colors.DimGray,
                }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {'Attendees: '}
              </CustomText>

              <CustomText
                style={{
                  marginVertical: window.height * 0.03,
                  color: Colors.DimGray,
                }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {'Date: '}
              </CustomText>

              <CustomText
                style={{
                  marginVertical: window.height * 0.03,
                  color: Colors.DimGray,
                }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {'Time: '}
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

              <Image
                style={{
                  width: window.height * 0.085,
                  height: window.height * 0.085,
                }}
                resizeMode="contain"
                source={
                  localData?.companyLogo
                    ? { uri: EndPoint.baseAssestURL + localData.companyLogo }
                    : headerImage
                }
              />

              <CustomText
                style={{ marginVertical: window.height * 0.03 }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {localData.attendees}
              </CustomText>

              <CustomText
                style={{ marginVertical: window.height * 0.03 }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {/* {localData.dateAndTime} */}
                {'8 Sept 2023'}
              </CustomText>

              <CustomText
                style={{ marginVertical: window.height * 0.03 }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {/* {localData.dateAndTime} */}
                {'2:30 PM'}
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
                  width: window.width * 0.4,
                }}
                fontSize={fontResize(mxWidth * 0.009)}
                {...theme.fontSemiBold}
              >
                {localData.jobDescription}
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

export default EventSummary;
