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
} from 'react-native';
import React, { useState } from 'react';
import { CustomText, CustomView } from '../../Component/CustomComponent';
import { Calendar } from 'react-native-calendars';
import Strings from '../../Resources/Strings';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
import CustomModal from '../../Component/CustomModal/CustomModal';
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
import { RouteName } from '../../Navigation/routeName';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const MyBooking = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const window = useWindowDimensions();
  const userData = useSelector((state) => state.auth.userData);
  const userType = useSelector((state) => state.auth.userType);
  const localData = route?.params?.data ? route?.params?.data : {};

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
        if (type == 'camera') {
          launchCamera(options, async (res) => {
            if (res?.assets && res?.assets[0]) {
              setModal(false);
              uploadPostImage(res);
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
              uploadPostImage(response);
            }
          }).catch((err) => {
            setModal(false);
            dispatch(setLoading(false));
          });
        }
        // setModal(false);
      } else {
        setModal(false);
        dispatch(setLoading(false));
      }
    } catch (error) {
      setModal(false);
      dispatch(setLoading(false));
    }
  };

  const uploadPostImage = async (response) => {
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
    navigation.reset({
      index: 0,
      routes: [{ name: RouteName.HOME }],
    });
  };

  const goToSummary = async () => {
    // navigation.navigate(RouteName.CREATE_EVENT_POST)
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.White }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {isNative && (
          <HeaderContainer
            marginTop={0}
            style={{ width: '100%', alignItems: 'center' }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ padding: 15 }}
            >
              <BackButton resizeMode="contain" source={backIcon} />
            </TouchableOpacity>
            <CustomText
              style={{ justifyContent: 'center' }}
              fontSize={fontResize(20)}
              textColor={Colors.Black}
              fontFamily={'Gilroy-Bold'}
            >
              {Strings.MY_BOOKING}
            </CustomText>
          </HeaderContainer>
        )}

        <View alignItems={'center'} flexDirection={'row'}></View>
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
            <Calendar hideArrows={true} minDate={new Date()} firstDay={1} />

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

export default MyBooking;
