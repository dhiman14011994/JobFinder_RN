import {
  useWindowDimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React, { useState, useEffect } from 'react';
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
import { imageUplaod } from '../../Redux/services/profileService';
import EndPoint from '../../Redux/constants/EndPoint';
import { setLoading } from '../../Redux/actions/authAction';
import { updatePromotion } from '../../Redux/actions/promotionAction';

const CreatePromotionPost = ({ navigation, route }) => {
  const { data, isEdited } = route?.params;

  const window = useWindowDimensions();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);

  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [attendees, setAttendees] = useState('');
  const [dateAndTime, setDateAndTime] = useState('');
  const [endDateAndTime, setEndDateAndTime] = useState('');
  const [amount, setAmount] = useState('');
  const [isModal, setModal] = useState(false);
  const [promtionImage, setImage] = useState('');
  const [startdate, setStartDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isStartDate, setIsStartDate] = useState(true);
  const [isEndDate, setIsEndDate] = useState(true);
  const scheme = useColorScheme();
  const [id, setId] = useState('');

  useEffect(() => {
    if (isEdited) {
      setAmount(data?.amount);
      setTitle(data?.promotion_title);
      setDescription(data?.description);
      setDateAndTime(new Date(data?.start_date));
      setEndDateAndTime(new Date(data?.end_date));
      setImage(data?.image);
      setId(data?._id);
    }
  }, [data]);

  const selectUser = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const selectImage = async (type) => {
    try {
      // dispatch(setLoading(true));
      let isCameraPermitted = await requestCameraPermission();
      let isStoragePermitted = await requestExternalWritePermission();
      let options = {
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
                fetchUserImage(res);
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
              console.log('response?.assets[0]?.fileSize', response.assets[0]);
              const fileSize = Number(response.assets[0]?.fileSize) / 1000000;
              if (fileSize < 20) {
                fetchUserImage(response);
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

  const fetchUserImage = async (response) => {
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

      setImage(getImageURI.data[0]);
    } else {
      alert(Strings.FILE_SIZE_TEXT);
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
    let amtType = /^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/;
    if (title.trim().length > 2 == false) {
      isValid = false;
      Toast.show(Strings.INVALID_PROMOTION_TITLE);
      return isValid;
    }
    if (amount.trim().length > 1 == false) {
      isValid = false;
      Toast.show(Strings.INVALID_PROMOTION_AMOUNT);
      return isValid;
    }
    if (!amtType.test(amount)) {
      isValid = false;
      Toast.show(Strings.INVALID_AMOUNT);
      return isValid;
    }
    if (description.trim().length > 2 == false) {
      isValid = false;
      Toast.show(Strings.INVALID_PROMOTION_DESCRIPTION);
      return isValid;
    }
    if (promtionImage === '') {
      isValid = false;
      Toast.show(Strings.INVALID_IMAGE);
      return isValid;
    }
    return isValid;
  };

  const goToSummary = async () => {
    if (!onValidation()) {
      return;
    }

    var data = {
      title: title.trim(),
      promtionImage: promtionImage,
      amount: amount.trim(),
      description: description.trim(),
      dateAndTime: dateAndTime,
      endDateAndTime: endDateAndTime,
    };
    navigation.navigate(RouteName.PROMOTION_SUMMARY, { data: data });
  };

  const updatedPromotion = async () => {
    if (!onValidation()) {
      return;
    }

    try {
      dispatch(setLoading(true));
      let apiRequestData = {};

      if (promtionImage.image != '') {
        var data = {
          id: id,
          promotion_title: title.trim(),
          image: promtionImage,
          amount: amount.trim(),
          description: description.trim(),
          start_date: dateAndTime,
          end_date: endDateAndTime,
        };
        apiRequestData = { ...data };
      } else {
        var data = {
          id: id,
          promotion_title: title.trim(),
          amount: amount.trim(),
          description: description.trim(),
          start_date: dateAndTime,
          end_date: endDateAndTime,
        };
        apiRequestData = { ...data };
      }

      dispatch(
        updatePromotion({
          data,
          onSuccess: (result) => {
            backToHome();
            dispatch(setLoading(false));
            Emitter.emit('PromotionCreated');
          },
          onError: (error) => {
            dispatch(setLoading(false));
          },
        })
      );
    } catch (error) {
      console.log('error', error);
      dispatch(setLoading(false));
    }
  };
  const backToHome = () => {
    navigation.popToTop();
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
          {Strings.PLACE_AD}
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
              label={Strings.PROMOTION_TITLE}
              onChangeText={(text) => {
                setTitle(text);
              }}
              value={title}
              placeholder={''}
              window={window}
            />

            <CustomImageSelector
              AttachText={Strings.ATTACH_IMAGES_OR_PROOF}
              label={Strings.IMAGE}
              imagePress={() => {
                setModal(true);
              }}
              imagePath={
                promtionImage == ''
                  ? promtionImage
                  : `${EndPoint.baseAssestURL}${promtionImage}`
              }
              marginBottom={window.height * 0.02}
              window={window}
            />
            <CustomInputText
              marginBottom={window.height * 0.02}
              label={Strings.DESCRIPTION}
              isDetails={true}
              onChangeText={(text) => {
                setDescription(text);
              }}
              window={window}
              value={description}
            />
            <CustomInputText
              marginBottom={window.height * 0.02}
              label={Strings.START_DATE_TIME}
              editable={false}
              isRightButton
              rightButtonImage={Calender}
              rightButtonPress={() => {
                setOpen(true);
                setIsEndDate(false);
                setIsStartDate(true);
              }}
              window={window}
              value={dateAndTime == '' ? '' : moment(dateAndTime).format('lll')}
            />
            <CustomInputText
              marginBottom={window.height * 0.02}
              label={Strings.END_DATE_TIME}
              editable={false}
              isRightButton
              rightButtonImage={Calender}
              rightButtonPress={() => {
                setOpen(true);
                setIsStartDate(false);
                setIsEndDate(true);
              }}
              window={window}
              value={
                endDateAndTime == '' ? '' : moment(endDateAndTime).format('lll')
              }
            />
            <CustomInputText
              marginBottom={window.height * 0.02}
              label={Strings.AMOUNT}
              keyboardType={'numeric'}
              onChangeText={(text) => {
                setAmount(text);
              }}
              value={amount}
              window={window}
            />

            <CustomButton
              onPress={() => {
                isEdited ? updatedPromotion() : goToSummary();
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
              text={isEdited ? 'Update Promotion' : Strings.CONTINUE}
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
          date={
            isStartDate
              ? dateAndTime == ''
                ? startdate
                : dateAndTime
              : endDateAndTime == ''
              ? startdate
              : endDateAndTime
          }
          mode={'datetime'}
          minimumDate={
            isStartDate
              ? new Date()
              : dateAndTime == ''
              ? new Date()
              : dateAndTime
          }
          onConfirm={(date) => {
            setOpen(false);
            if (isStartDate) {
              setDateAndTime(date);
              setIsStartDate(false);
            } else {
              setIsEndDate(false);
              setEndDateAndTime(date);
            }
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default CreatePromotionPost;
