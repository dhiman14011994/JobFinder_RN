import {
  useWindowDimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
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
import CustomModal from '../../Component/CustomModal/CustomModal';
import { edit, success } from '../../Resources/assets';
import CustomButton from '../../Component/CustomButton';
import { setLoading } from '../../Redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { backIcon } from '../../Resources/assets';
import { isNative } from '../../Util';
import {
  BackButton,
  HeaderContainer,
} from '../Authentication/VerificationStyle';
import { imageUplaod } from '../../Redux/services/profileService';
import { createEventPost } from '../../Redux/services/jobsService';
import moment from 'moment';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Emitter from '../../Util/eventEmitter';
import { createPromotionPost } from '../../Redux/services/promotionService';

const PromotionSummary = ({ navigation, route }) => {
  const backToHome = () => {
    navigation.popToTop();
  };

  const dispatch = useDispatch();
  const window = useWindowDimensions();
  const userData = useSelector((state) => state.auth.userData);
  const userType = useSelector((state) => state.auth.userType);
  const localData = route.params.data;

  const [isJobCreated, setJobCreated] = useState(false);

  const goToSummary = async () => {
    try {
      dispatch(setLoading(true));
      let apiRequestData = {};

      if (localData.image != '') {
        var data = {
          promotion_title: localData.title,
          image: localData.promtionImage,
          description: localData.description,
          start_date: localData.dateAndTime,
          end_date: localData.endDateAndTime,
          amount: localData.amount,
        };
        apiRequestData = { ...data };
      } else {
        var data = {
          promotion_title: localData.title,
          description: localData.description,
          start_date: localData.dateAndTime,
          end_date: localData.endDateAndTime,
          amount: localData.amount,
        };
        apiRequestData = { ...data };
      }

      var createJobResponse = await createPromotionPost(apiRequestData);
      console.log('createJobResponse>>>', createJobResponse);

      if (createJobResponse.code == 200) {
        Emitter.emit('PromotionCreated');
        dispatch(setLoading(false));
        setJobCreated(true);
      } else {
        dispatch(setLoading(false));
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
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
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            bounces={false}
            style={{ width: window.width * 0.9 }}
          >
            <SummaryComponent
              label={Strings.PROMOTION_TITLE}
              data={localData.title}
            />
            <SummaryComponent
              label={Strings.COMPANY_LOGO}
              data={localData.promtionImage}
              isImage
            />
            <SummaryComponent label={Strings.AMOUNT} data={localData.amount} />
            <SummaryComponent
              label={Strings.START_DATE_TIME}
              data={moment(localData.dateAndTime).format('LLL')}
            />
            <SummaryComponent
              label={Strings.END_DATE_TIME}
              data={moment(localData.endDateAndTime).format('LLL')}
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
                {Strings.DESCRIPTION} :{' '}
              </CustomText>
              <CustomText
                textColor={Colors.Black}
                fontFamily={'Gilroy-Bold'}
                style={{ paddingVertical: window.width * 0.03 }}
              >
                {localData.description}
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
              text={Strings.CREATE_PROMOTIONS}
            />
          </ScrollView>
        </CustomView>
        <Modal
          animated={true}
          animationType={'fade'}
          onDismiss={() => {
            console.log('Modal has been closed');
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
                backgroundColor: 'transparent',
                borderTopEndRadius: 32,
                borderTopStartRadius: 32,

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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PromotionSummary;
