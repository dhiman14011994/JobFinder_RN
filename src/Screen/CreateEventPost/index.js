/* eslint-disable handle-callback-err */
import {
  useWindowDimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React, { useState } from 'react';
import { CustomText, CustomView } from '../../Component/CustomComponent';
import Strings from '../../Resources/Strings';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
import CustomInputText from '../../Component/CustomInputText';
import CustomImageSelector from '../../Component/CustomImageSelector';
import CustomModal from '../../Component/CustomModal/CustomModal';
import Calender from '../../Resources/assets/Calender.png';
import CustomButton from '../../Component/CustomButton';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-native-date-picker';
import { backIcon } from '../../Resources/assets';
import { isNative } from '../../Util';
import {
  BackButton,
  HeaderContainer,
} from '../Authentication/VerificationStyle';
import { RouteName } from '../../Navigation/routeName';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';

const CreateEventPost = ({ navigation, route }) => {
  const window = useWindowDimensions();

  const userData = useSelector((state) =>
    state.auth.registerData
      ? state.auth.registerData
      : state.auth.loginData
      ? state.auth.loginData
      : state.auth.socialLoginData
  );
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [attendees, setAttendees] = useState('');
  const [dateAndTime, setDateAndTime] = useState('');
  const [address, setAddress] = useState('');
  const [isModal, setModal] = useState(false);
  const [userImage, setImage] = useState('');
  const [startdate, setStartDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isStartDate, setIsStartDate] = useState(true);
  const scheme = useColorScheme();

  const selectUser = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const selectImage = async (type) => {
    try {
      // dispatch(setLoading(true));
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
              const fileSize = Number(res?.assets[0]?.fileSize) / 1000000;
              if (fileSize < 20) {
                setImage(res.assets[0].uri);
              } else {
                alert(Strings.FILE_SIZE_TEXT);
              }
            }
            setModal(false);
          }).catch((err) => {
            setModal(false);
          });
        } else {
          launchImageLibrary(options, async (response) => {
            if (response?.assets && response?.assets[0]) {
              setModal(false);
              const fileSize = Number(response.assets[0]?.fileSize) / 1000000;
              if (fileSize < 20) {
                setImage(response.assets[0].uri);
              } else {
                alert(Strings.FILE_SIZE_TEXT);
              }
            }
            setModal(false);
          }).catch((err) => {
            setModal(false);
          });
        }
      } else {
        setModal(false);
      }
    } catch (error) {
      setModal(false);
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

  const onValidation = () => {
    var isValid = true;

    if (jobTitle.trim().length > 2 == false) {
      isValid = false;
      Toast.show(Strings.INVALID_JOB_TITLE);
      return isValid;
    }
    if (userImage == '') {
      isValid = false;
      Toast.show(Strings.INVALID_EVENT_IMAGE);
      return isValid;
    }
    if (jobDescription.trim().length > 2 == false) {
      isValid = false;
      Toast.show(Strings.INVALID_EVENT_DESCRIPTION);
      return isValid;
    }
    if (attendees.trim().length > 0 == false) {
      isValid = false;
      Toast.show(Strings.INVALID_ATTENDEES);
      return isValid;
    }
    if (dateAndTime.toString().trim().length > 2 == false) {
      isValid = false;
      Toast.show(Strings.INVALID_DATE_AND_TIME);
      return isValid;
    }
    if (address.trim().length > 2 == false) {
      isValid = false;
      Toast.show(Strings.INVALID_COMPANY_ADDRESS);
      return isValid;
    }
    return isValid;
  };

  const goToSummary = () => {
    if (!onValidation()) {
      return;
    }
    console.log('dateAndTime', dateAndTime);
    var data = {
      title: jobTitle.trim(),
      attendees: attendees.trim(),
      companyLogo: userImage,
      address: address.trim(),
      jobDescription: jobDescription.trim(),
      dateAndTime: dateAndTime,
    };
    console.log('data create event post====>', data);
    navigation.navigate(RouteName.EVENT_SUMMARY, { data: data });
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.White, height: window.height }}
    >
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

        <CustomText
          marginLeft={window.width * 0.05}
          fontSize={fontResize(30)}
          textColor={Colors.Black}
          fontFamily={'Gilroy-Bold'}
        >
          {Strings.CREATE_EVENT_POST}
        </CustomText>

        <CustomView
          width={window.width * 0.9}
          marginLeft={window.width * 0.05}
          marginRight={window.width * 0.05}
          marginTop={window.height * 0.05}
          // height={window.height * 0.787}
          height={window.height * 0.8}
        >
          <ScrollView
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{ width: window.width * 0.9 }}
          >
            <CustomInputText
              marginBottom={window.height * 0.02}
              label={Strings.EVENT_POST_TITLE}
              onChangeText={(text) => {
                setJobTitle(text);
              }}
              value={jobTitle}
              placeholder={''}
              window={window}
            />

            <CustomImageSelector
              AttachText={Strings.ATTACH_IMAGES_OR_PROOF}
              label={Strings.COMPANY_LOGO}
              imagePress={() => {
                setModal(true);
              }}
              imagePath={userImage == '' ? userImage : userImage}
              marginBottom={window.height * 0.02}
              window={window}
            />
            <CustomInputText
              marginBottom={window.height * 0.02}
              label={Strings.EVENT_DESCRIPTION}
              isDetails={true}
              onChangeText={(text) => {
                setJobDescription(text);
              }}
              window={window}
              value={jobDescription}
            />
            <CustomInputText
              marginBottom={window.height * 0.02}
              label={Strings.HOW_MANY_ATTENDEES}
              keyboardType={'number-pad'}
              onChangeText={(text) => {
                setAttendees(text);
              }}
              value={attendees}
              window={window}
            />
            <CustomInputText
              marginBottom={window.height * 0.02}
              label={Strings.DATE_AND_TIME}
              editable={false}
              isRightButton
              rightButtonImage={Calender}
              rightButtonPress={() => {
                setOpen(true);
                setIsStartDate(true);
              }}
              window={window}
              value={dateAndTime == '' ? '' : moment(dateAndTime).format('lll')}
            />
            <CustomInputText
              marginBottom={window.height * 0.02}
              label={Strings.ADDRESS}
              onChangeText={(text) => {
                setAddress(text);
              }}
              value={address}
              window={window}
            />

            <CustomButton
              onPress={() => {
                goToSummary();
              }}
              width={'100%'}
              height={'50px'}
              backgroundColor={Colors.Blueberry}
              marginTop={window.height * 0.03}
              marginBottom={window.height * 0.3}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              fontFamily={'Gilroy-SemiBold'}
              fontSize={'18px'}
              textColor={Colors.White}
              text={Strings.CONTINUE}
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
      {isNative && (
        <DatePicker
          modal
          theme={'light'}
          textColor={scheme == 'dark' ? '#fff' : '#000'}
          open={open}
          date={dateAndTime == '' ? startdate : dateAndTime}
          mode={'datetime'}
          minimumDate={new Date()}
          onConfirm={(date) => {
            setOpen(false);
            setDateAndTime(date);
            console.log(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default CreateEventPost;
