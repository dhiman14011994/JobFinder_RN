/* eslint-disable handle-callback-err */
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

const EventSummary = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const window = useWindowDimensions();
  const userData = useSelector((state) => state.auth.userData);
  const userType = useSelector((state) => state.auth.userType);
  const localData = route.params.data;

  const [isJobCreated, setJobCreated] = useState(false);
  const [isModal, setModal] = useState(false);
  const [userImage, setImage] = useState('');

  const selectUser = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const selectImage = async (type) => {
    try {
      dispatch(setLoading(true));
      let isCameraPermitted = await requestCameraPermission();
      let isStoragePermitted = await requestExternalWritePermission();
      let options = {
        // maxWidth: 1000,
        // maxHeight: 1000,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        // quality: 0.1,
      };
      if (isCameraPermitted && isStoragePermitted) {
        if (type === 'camera') {
          launchCamera(options, async (res) => {
            if (res?.assets && res?.assets[0]) {
              setModal(false);
              fetchSelectedImage(res);
            }
            setModal(false);
            dispatch(setLoading(false));
          }).catch((err) => {
            setModal(false);
            dispatch(setLoading(false));
          });
        } else {
          launchImageLibrary(options, async (response) => {
            if (response?.assets && response?.assets[0]) {
              setModal(false);
              fetchSelectedImage(response);
            }
            setModal(false);
            dispatch(setLoading(false));
          }).catch((err) => {
            setModal(false);
            dispatch(setLoading(false));
          });
        }
      } else {
        setModal(false);
        dispatch(setLoading(false));
      }
    } catch (error) {
      setModal(false);
      dispatch(setLoading(false));
    }
  };

  const fetchSelectedImage = async (response) => {
    const fileSize = Number(response?.assets[0]?.fileSize) / 1000000;
    if (fileSize < 20) {
      let imageData = {
        uri: response.assets[0].uri,
        type: 'image/jpg',
        name: 'image.jpg',
      };
      var getImageURI = await imageUplaod({
        file: imageData,
        token: userData?.access_token,
      });

      dispatch(setLoading(false));
      setImage(getImageURI.data[0]);
    } else {
      alert(Strings.FILE_SIZE_TEXT);
      dispatch(setLoading(false));
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          }
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission error', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const backToHome = () => {
    navigation.popToTop();
  };

  const goToSummary = async () => {
    try {
      dispatch(setLoading(true));
      let apiRequestData = {};
      const localTime = new Date(localData.dateAndTime);
      const utcTime = moment.utc(localTime).format('YYYY-MM-DD HH:mm:ss Z');

      console.log('format', utcTime);
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
          event_title: localData.title,
          company_logo: getImageURI.data[0],
          role: selectUser,
          attendees: localData.attendees,
          address: localData.address,
          job_description: localData.jobDescription,
          date: utcTime,
        };
        apiRequestData = { ...data };
      } else {
        var data = {
          event_title: localData.title,
          company_name: localData.companyName,
          role: selectUser,
          attendees: localData.jobType,
          address: localData.address,
          job_description: localData.jobDescription,
          date: utcTime,
        };
        apiRequestData = { ...data };
      }
      console.log('data create job post====>', apiRequestData);

      var createJobResponse = await createEventPost(apiRequestData);
      if (createJobResponse.code == 200) {
        dispatch(setLoading(false));
        Emitter.emit('EventCreated');
        setJobCreated(true);
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
            style={{ width: window.width * 0.9 }}
          >
            <SummaryComponent
              label={Strings.EVENT_POST_TITLE}
              data={localData.title}
            />
            <SummaryComponent
              label={Strings.COMPANY_LOGO}
              data={localData.companyLogo}
              isImage
              isLocal
            />
            <SummaryComponent
              label={Strings.HOW_MANY_ATTENDEES}
              data={localData.attendees}
            />
            <SummaryComponent
              label={Strings.DATE}
              data={moment(localData.dateAndTime).format('LL')}
            />
            <SummaryComponent
              label={Strings.TIME}
              data={moment(localData.dateAndTime).format('LT')}
            />
            <SummaryComponent
              label={Strings.ADDRESS}
              data={localData.address}
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
                {Strings.EVENT_DESCRIPTION} :{' '}
              </CustomText>
              <CustomText
                textColor={Colors.Black}
                fontFamily={'Gilroy-Bold'}
                style={{ paddingVertical: window.width * 0.03 }}
              >
                {localData.jobDescription}
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
              text={Strings.CREATE_EVENT_POST}
            />
          </ScrollView>
        </CustomView>
      </KeyboardAvoidingView>
      <CustomModal
        isVisible={isModal}
        cancelVissible={() => {
          setModal(false);
        }}
        selectImage={(text) => selectImage(text)}
      />
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

export default EventSummary;
