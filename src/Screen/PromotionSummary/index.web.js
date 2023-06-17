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
import moment from 'moment';
import { createPromotionPost } from '../../Redux/services/promotionService';

const PromotionSummary = ({ navigation, route }) => {
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

      if (localData.image != '') {
        var data = {
          promotion_title: localData.promotion_title,
          image: localData.image,
          description: localData.description,
          start_date: localData.start_date,
          end_date: localData.end_date,
          amount: localData.amount,
        };
        apiRequestData = { ...data };
      } else {
        var data = {
          promotion_title: localData.promotion_title,
          description: localData.description,
          start_date: localData.start_date,
          end_date: localData.end_date,
          amount: localData.amount,
        };
        apiRequestData = { ...data };
      }

      var createJobResponse = await createPromotionPost(apiRequestData);
      if (createJobResponse.code == 200) {
        Emitter.emit('PostCreated');
        dispatch(setLoading(false));
        setCreated(true);
      } else {
      }
    } catch (error) {
      dispatch(setLoading(false));
    }
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
                {'Promotion Title : '}
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
                {'Amount: '}
              </CustomText>

              <CustomText
                style={{
                  marginVertical: window.height * 0.03,
                  color: Colors.DimGray,
                }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {'Start Date & Time: '}
              </CustomText>

              <CustomText
                style={{
                  marginVertical: window.height * 0.03,
                  color: Colors.DimGray,
                }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {'End Date & Time: '}
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
                {localData.promotion_title}
              </CustomText>
              <Image
                style={{
                  width: window.height * 0.085,
                  height: window.height * 0.085,
                }}
                resizeMode="contain"
                source={
                  localData?.image
                    ? {
                        uri: `${EndPoint.baseAssestURL}${localData?.image}`,
                      }
                    : headerImage
                }
              />

              <CustomText
                style={{ marginVertical: window.height * 0.03 }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {localData.amount}
              </CustomText>

              <CustomText
                style={{ marginVertical: window.height * 0.03 }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {moment(localData.start_date).format('DD MMM yyyy')}
              </CustomText>

              <CustomText
                style={{ marginVertical: window.height * 0.03 }}
                fontSize={fontResize(mxWidth * 0.011)}
                {...theme.fontSemiBold}
              >
                {moment(localData.end_date).format('DD MMM yyyy')}
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
                {'Description : '}
              </CustomText>
              <CustomText
                style={{
                  marginTop: window.height * 0.01,
                }}
                fontSize={fontResize(mxWidth * 0.009)}
                {...theme.fontSemiBold}
              >
                {localData.description}
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
          text={'Create Promotion'}
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

export default PromotionSummary;
