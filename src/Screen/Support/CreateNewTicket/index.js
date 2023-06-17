import {
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../../Component/CustomHeader';
import { backIcon } from '../../../Resources/assets';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomText } from '../../../Component/CustomComponent';
import { fontResize } from '../../../Util/font';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomInputText from '../../../Component/CustomInputText';
import Strings from '../../../Resources/Strings';
import { mxHeight, mxWidth } from '../../../Util';
import { theme } from '../../../Util/constant';
import { useState } from 'react';
import CustomButton from '../../../Component/CustomButton';
import Colors from '../../../Resources/Colors';
import CameraIcon from '../../../Resources/assets/cameraIcon.png';
import { setLoading } from '../../../Redux/actions/authAction';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Emitter from '../../../Util/eventEmitter';
import {
  createSupportTicket,
  sendMessageSupport,
} from '../../../Redux/actions/profileAction';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import EndPoint from '../../../Redux/constants/EndPoint';
import moment from 'moment';
import { uploadImage } from '../../../Redux/actions/homeAction';
import Video from 'react-native-video';
import CustomModal from '../../../Component/CustomModal/CustomModal';

const CreateNewTicket = ({ navigation }) => {
  const dispatch = useDispatch();

  const [character, setCharacter] = useState(0);
  const [isModal, setModal] = useState(false);
  const [media, setMedia] = useState([]);
  let count = 0;
  let mediaArr = [];
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  const formik = useFormik({
    initialValues: {
      subject: '',
      description: '',
    },
    validationSchema: Yup.object({
      subject: Yup.string().required('Subject is required'),
      description: Yup.string().required('Description is required'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      uplodImage(values);
    },
  });

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
        alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const createTicket = (param) => {
    try {
      dispatch(setLoading(true));
      dispatch(
        createSupportTicket({
          param,
          onSuccess: (result) => {
            setTimeout(() => {
              Emitter.emit('TicketCreated');
              navigation.goBack();
            }, 200);

            console.log('send message', result.data);
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

  const uplodImage = () => {
    try {
      let param = {};
      dispatch(setLoading(true));
      console.log('Image UPload', count);
      if (media.length > 0) {
        if (count === media.length) {
          param = {
            subject: formik.values.subject,
            message: formik.values.description,
            upload_pic_video: [...mediaArr],
          };
          console.log('mediaArr UPload', param);
          count = 0;
          createTicket(param);
        } else {
          let data = { imagePath: media[count].uri };
          dispatch(
            uploadImage({
              data,
              onSuccess: (result) => {
                if (result.data) {
                }
                count += 1;
                mediaArr.push(result.data);
                console.log('mediaArr UPload', mediaArr);
                uplodImage();
                console.log('Image UPload', result.data);
                dispatch(setLoading(false));
              },
              onError: (error) => {
                dispatch(setLoading(false));
              },
            })
          );
        }
      } else {
        param = {
          subject: formik.values.subject,
          message: formik.values.description,
          upload_pic_video: [],
        };
        createTicket(param);
      }
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const selectImage = async (type) => {
    try {
      dispatch(setLoading(true));
      let isCameraPermitted = await requestCameraPermission();
      let isStoragePermitted = await requestExternalWritePermission();
      let options = {
        maxWidth: 1000,
        maxHeight: 1000,
        mediaType: 'mixed',
        videoQuality: 'low',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        quality: 0.1,
      };
      if (isCameraPermitted && isStoragePermitted) {
        dispatch(setLoading(false));
        if (type === 'camera') {
          launchCamera(options, (res) => {
            if (res?.assets && res?.assets[0]) {
              uploadFetchFile(res);
            }
            setModal(false);
            dispatch(setLoading(false));
          }).catch((err) => {
            setModal(false);
            dispatch(setLoading(false));
          });
        } else {
          launchImageLibrary(options, (response) => {
            if (response?.assets && response?.assets[0]) {
              uploadFetchFile(response);
            }
            setModal(false);
            dispatch(setLoading(false));
          }).catch((err) => {
            setModal(false);
            dispatch(setLoading(false));
          });
        }
      } else {
        dispatch(setLoading(false));
        setModal(false);
      }
    } catch (error) {
      dispatch(setLoading(false));
      setModal(false);
    }
  };

  const uploadFetchFile = async (response) => {
    const fileSize = Number(response?.assets[0]?.fileSize) / 1000000;
    if (fileSize < 20) {
      setModal(false);
      let mediaData = {
        uri: response.assets[0].uri,
        type: response.assets[0].type,
      };
      if (media.length > selectedMediaIndex) {
        if (media[selectedMediaIndex]) {
          media[selectedMediaIndex] = mediaData;
          setMedia([...media]);
        }
      } else {
        setMedia([...media, mediaData]);
      }

      dispatch(setLoading(false));
    } else {
      alert(Strings.FILE_SIZE_TEXT);
      dispatch(setLoading(false));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <CustomHeader
        leftButtons={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 12 }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 26, width: 26 }}
              source={backIcon}
            />
          </TouchableOpacity>
        }
        rightButtons={<></>}
        title={'Support'}
      />

      <KeyboardAwareScrollView style={{ paddingHorizontal: 16 }}>
        <View style={{ paddingVertical: 22 }}>
          <CustomText
            {...theme.fontSemiBold}
            {...theme.fontSemiBold}
            fontSize={`${fontResize(14)}px`}
          >
            Subject
          </CustomText>
          <CustomInputText
            window={{ width: mxWidth, height: mxHeight }}
            label={''}
            value={formik.values.subject}
            labelStyle={{ ...theme.fontMedium, fontSize: fontResize(13) }}
            placeholder={'Write subject here...'}
            isDetails={false}
            inputStyle={{ ...theme.fontMedium, fontSize: fontResize(15) }}
            inputOuterView={{
              borderColor: formik?.errors?.subject ? 'red' : '#C2C5CE',
              borderWidth: 1,
              paddingVertical: 6,
              borderRadius: 30,
              backgroundColor: '#F6F6F6',
            }}
            onChangeText={formik.handleChange('subject')}
            isError={formik?.errors?.subject !== ''}
            errorMessage={formik.errors.title && formik.errors.subject}
          />
        </View>
        <View>
          <CustomText {...theme.fontSemiBold} fontSize={`${fontResize(14)}px`}>
            Your Message
          </CustomText>
          <CustomInputText
            window={{ width: mxWidth, height: mxHeight }}
            label={''}
            value={formik.values.description}
            labelStyle={{ ...theme.fontMedium, fontSize: fontResize(13) }}
            placeholder={'Write something here...'}
            isDetails
            maxLength={550}
            inputStyle={{ ...theme.fontMedium, fontSize: fontResize(15) }}
            inputOuterView={{
              borderColor: formik?.errors?.description ? 'red' : '#C2C5CE',
              borderWidth: 1,
              paddingVertical: 6,
              paddingBottom: 12,
              borderRadius: 30,
              backgroundColor: '#F6F6F6',
            }}
            onChangeText={(text) => {
              formik.setFieldValue('description', text);
              setCharacter(text.length);
            }}
            isError={formik?.errors?.description !== ''}
            errorMessage={formik.errors.title && formik.errors.description}
          />

          <CustomText
            {...theme.fontSemiBold}
            {...theme.fontSemiBold}
            marginBottom={'16px'}
            fontSize={`${fontResize(14)}px`}
          >
            Upload Picture orr Videos
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setModal(true);
                setSelectedMediaIndex(0);
              }}
              style={{
                padding:
                  media.length > 0 && media[0]?.uri ? 5 : mxWidth * 0.075,
                backgroundColor: '#F4F7FF',
                borderRadius: 12,
                borderColor: Colors.Blueberry,
                borderWidth: 1,
                borderStyle: 'dashed',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {media.length > 0 && media[0]?.type.includes('video') ? (
                <Video
                  paused
                  source={{ uri: media[0]?.uri }}
                  style={{ height: fontResize(80), width: fontResize(80) }}
                />
              ) : (
                <Image
                  resizeMode={
                    media.length > 0 && media[0]?.uri ? 'cover' : 'contain'
                  }
                  style={
                    media.length > 0 && media[0]?.uri
                      ? { height: fontResize(80), width: fontResize(80) }
                      : { height: fontResize(44), width: fontResize(44) }
                  }
                  source={
                    media.length > 0 ? { uri: media[0]?.uri } : CameraIcon
                  }
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setModal(true);
                setSelectedMediaIndex(1);
              }}
              style={{
                padding:
                  media.length > 1 && media[1]?.uri ? 5 : mxWidth * 0.075,
                backgroundColor: '#F4F7FF',
                borderRadius: 12,
                borderColor: Colors.Blueberry,
                borderWidth: 1,
                borderStyle: 'dashed',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {media.length > 1 && media[1]?.type.includes('video') ? (
                <Video
                  paused
                  source={{ uri: media[1]?.uri }}
                  style={{ height: fontResize(80), width: fontResize(80) }}
                />
              ) : (
                <Image
                  resizeMode={
                    media.length > 1 && media[1]?.uri ? 'cover' : 'contain'
                  }
                  style={
                    media.length > 1 && media[1]?.uri
                      ? { height: fontResize(80), width: fontResize(80) }
                      : { height: fontResize(44), width: fontResize(44) }
                  }
                  source={
                    media.length > 1 ? { uri: media[1]?.uri } : CameraIcon
                  }
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setModal(true);
                setSelectedMediaIndex(2);
              }}
              style={{
                padding:
                  media.length > 2 && media[2]?.uri ? 5 : mxWidth * 0.075,
                backgroundColor: '#F4F7FF',
                borderRadius: 12,
                borderColor: Colors.Blueberry,
                borderWidth: 1,
                borderStyle: 'dashed',

                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {media.length > 2 && media[2]?.type.includes('video') ? (
                <Video
                  paused
                  source={{ uri: media[2]?.uri }}
                  style={{ height: fontResize(80), width: fontResize(80) }}
                />
              ) : (
                <Image
                  resizeMode={
                    media.length > 2 && media[2]?.uri ? 'cover' : 'contain'
                  }
                  style={
                    media.length > 2 && media[2]?.uri
                      ? { height: fontResize(80), width: fontResize(80) }
                      : { height: fontResize(44), width: fontResize(44) }
                  }
                  source={
                    media.length > 2 ? { uri: media[2]?.uri } : CameraIcon
                  }
                />
              )}
            </TouchableOpacity>
          </View>

          <View
            style={{
              position: 'absolute',
              right: 30,
              top: 45,
            }}
          >
            <CustomText
              textColor={character === 550 ? 'red' : '#C2C5CE'}
              fontSize={`${fontResize(13)}px`}
            >
              {character}/550
            </CustomText>
          </View>
        </View>

        <View style={{ paddingVertical: 20, marginTop: 60 }}>
          <CustomButton
            onPress={formik.handleSubmit}
            width={'100%'}
            height={'50px'}
            backgroundColor={Colors.Blueberry}
            marginTop={window.height * 0.03}
            marginBottom={window.height * 0.1}
            borderRadius={'10px'}
            alignItems={'center'}
            justifyContent={'center'}
            {...theme.fontSemiBold}
            fontSize={'18px'}
            textColor={Colors.White}
            text={Strings.SUBMIT}
          />
        </View>
      </KeyboardAwareScrollView>
      <CustomModal
        isVisible={isModal}
        cancelVissible={() => {
          setModal(false);
        }}
        selectImage={(text) => selectImage(text)}
      />
    </SafeAreaView>
  );
};

export default CreateNewTicket;

const styles = StyleSheet.create({});
