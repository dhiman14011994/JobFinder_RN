import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { useWindowDimensions } from 'react-native-web';
import { useDispatch, useSelector } from 'react-redux';
import { CustomText } from '../../../Component/CustomComponent';
import CustomInputText from '../../../Component/CustomInputText';
import { ic_leftBackIcon } from '../../../Resources/assets';
import Colors from '../../../Resources/Colors';
import Strings from '../../../Resources/Strings';
import { fontResize } from '../../../Util/font';
import CustomButton from '../../../Component/CustomButton';
import { theme } from '../../../Util/constant';
import { style } from './style';
import { useDropzone } from 'react-dropzone';
import { imageUplaod } from '../../../Redux/services/profileService';
import CameraIcon from '../../../Resources/assets/cameraIcon.png';
import { setLoading } from '../../../Redux/actions/authAction';
import {
  createSupportTicket,
  sendMessageSupport,
} from '../../../Redux/actions/profileAction';
import Emitter from '../../../Util/eventEmitter';
import EndPoint from '../../../Redux/constants/EndPoint';
import ImagePickerModal from '../../../Component/Picker/index.web';
import Type from '../../../Constants/Type/type';
import CameraModal from '../../HomeWeb/Camera/Modal/index.web';

const CreateNewTicket = ({ navigation }) => {
  const dispatch = useDispatch();
  const window = useWindowDimensions();
  const width = window.width * 0.5;
  const height = window.height;
  const [character, setCharacter] = useState(0);
  const [isModal, setModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [subjectErr, setSubjectErr] = useState('');
  const [message, setMessage] = useState('');
  const [messageErr, setMessageErr] = useState('');
  const [media1, setMedia1] = useState('');
  const [media2, setMedia2] = useState('');
  const [media3, setMedia3] = useState('');

  let count = 0;
  let mediaArr = [];
  const [localeFile, setLocaleFile] = useState('');
  const [userImage, setuserImage] = useState('');
  const [isPicker, setPicker] = useState(false);
  const [isCamera, setCamera] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const userData = useSelector((state) =>
    state.auth.registerData
      ? state.auth.registerData
      : state.auth.loginData
      ? state.auth.loginData
      : state.auth.socialLoginData
      ? state.auth.socialLoginData
      : state.auth.userData
  );

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
      const image = [];
      if (media1 !== '' || media2 !== '' || media3 !== '') {
        if (media1 !== '') {
          image[0] = media1;
        }
        if (media2 !== '') {
          image[1] = media2;
        }
        if (media3 !== '') {
          image[2] = media3;
        }
        param = {
          subject: subject,
          message: message,
          upload_pic_video: [...image],
        };
        count = 0;
        createTicket(param);
      } else {
        param = {
          subject: subject,
          message: message,
          upload_pic_video: [],
        };
        createTicket(param);
      }
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  const onPressSubmit = () => {
    try {
      if (!onValidation()) {
        return;
      }
      dispatch(setLoading(true));
      uplodImage('');
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  var selectItem = '';
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept:
      selectItem == 'pdf'
        ? { 'text/pdf': ['.pdf'] }
        : { 'image/jpeg': ['.jpeg'], 'image/png': ['.png'] },
    onDrop: async (acceptedFiles) => {
      try {
        const fileSize = acceptedFiles[0]?.size
          ? Number(acceptedFiles[0].size) / 1000000
          : 0;
        if (fileSize < 20) {
          let imageFile = await acceptedFiles.map((file) => {
            return Object.assign(file, {
              preview: URL.createObjectURL(file),
            });
          });

          var getImageURI = await imageUplaod({
            file: imageFile[0],
            token: userData?.access_token,
          });
          if (selectItem == 'pdf') {
            setLocaleFile(getImageURI.data[0]);
          } else {
            switch (selectedMediaIndex) {
              case 0: {
                setMedia1(getImageURI.data[0]);
                break;
              }
              case 1: {
                setMedia2(getImageURI.data[0]);
                break;
              }
              case 2: {
                setMedia3(getImageURI.data[0]);
                break;
              }
            }
          }
        } else {
          alert('File size is greater than 20MB');
          dispatch(setLoading(false));
        }
      } catch (err) {}
    },
  });

  const uploadImageData = async (data) => {
    try {
      dispatch(setLoading(true));
      var getImageURI = await imageUplaod({
        file: data,
        token: userData?.access_token,
      });
      if (selectItem == 'pdf') {
        setLocaleFile(getImageURI.data[0]);
      } else {
        switch (selectedMediaIndex) {
          case 0: {
            setMedia1(getImageURI.data[0]);
            dispatch(setLoading(false));
            break;
          }
          case 1: {
            setMedia2(getImageURI.data[0]);
            dispatch(setLoading(false));
            break;
          }
          case 2: {
            setMedia3(getImageURI.data[0]);
            dispatch(setLoading(false));
            break;
          }
        }
        dispatch(setLoading(false));
      }
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const onValidation = () => {
    var isValid = true;
    if (subject.length === 0) {
      isValid = false;
      setSubjectErr(Strings.SUBJECT_REQUIRED);
    }
    if (message.length === 0) {
      isValid = false;
      setMessageErr(Strings.MESSAGE_REQUIRED);
    }
    return isValid;
  };
  return (
    <View
      style={{
        width: window.width,
        height: window.height * 0.9,
        paddingVertical: window.height * 0.01,
        paddingHorizontal: window.width * 0.2,
        backgroundColor: Colors.White,
        borderRadius: window.width * 0.01,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: -window.width * 0.1,
        }}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={ic_leftBackIcon}
          style={{
            height: window.height * 0.03,
            width: window.width * 0.02,
            resizeMode: 'contain',
            marginRight: window.width * 0.01,
            tintColor: Colors.Black,
          }}
        />
        <CustomText
          style={{
            width: window.width,
            paddingVertical: window.height * 0.03,
          }}
          textAlign={'left'}
          fontFamily={'Gilroy-bold'}
          fontSize={fontResize(window.width * 0.02)}
        >
          {Strings.SUPPORT}
        </CustomText>
      </TouchableOpacity>

      <View
        style={{
          width: width,
          height: window.height * 0.9,
          justifyContent: 'space-between',
          flex: 1,
          flexDirection: 'row',
        }}
      >
        <View>
          <CustomInputText
            labelStyle={{
              color: Colors.lightGray,
              fontSize: fontResize(window.width * 0.01),
            }}
            inputStyle={{ fontSize: fontResize(window.width * 0.01) }}
            width={width * 0.49}
            marginTop={window.height * 0.03}
            placeholder={'Write subject here...'}
            marginBottom={window.height * 0.02}
            label={Strings.SUBJECT}
            onChangeText={(text) => {
              setSubject(text);
              if (subjectErr) {
                if (text.length === 0) {
                  setSubjectErr(Strings.SUBJECT_REQUIRED);
                } else {
                  setSubjectErr('');
                }
              }
            }}
            value={subject}
            window={window}
            isError={subjectErr != ''}
            errorMessage={subjectErr}
            inputOuterView={{ borderRadius: width * 0.04 }}
          />
          <CustomText
            {...theme.fontSemiBold}
            {...theme.fontSemiBold}
            marginBottom={window.height * 0.01}
            fontSize={fontResize(window.width * 0.01)}
            style={{ color: Colors.lightGray }}
          >
            Upload Image
          </CustomText>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              width: width * 0.49,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setPicker(true);
                setSelectedMediaIndex(0);
              }}
              activeOpacity={0.7}
              style={{
                width: width * 0.45 * 0.33,
                height: height * 0.1,
                padding: media1 != '' ? 5 : width * 0.075,
                backgroundColor: '#F4F7FF',
                borderRadius: width * 0.04,
                borderColor: Colors.Blueberry,
                borderWidth: 1,
                borderStyle: 'dashed',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                resizeMode="contain"
                style={
                  media1 != ''
                    ? { height: height * 0.1, width: width * 0.13 }
                    : { height: height * 0.05, width: width * 0.05 }
                }
                source={
                  media1 != ''
                    ? `${EndPoint.baseAssestURL}${media1}`
                    : CameraIcon
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setPicker(true);
                setSelectedMediaIndex(1);
              }}
              activeOpacity={0.7}
              style={{
                width: width * 0.45 * 0.33,
                padding: media2 != '' ? 5 : width * 0.075,
                backgroundColor: '#F4F7FF',
                borderRadius: width * 0.04,
                borderColor: Colors.Blueberry,
                borderWidth: 1,
                borderStyle: 'dashed',
                justifyContent: 'center',
                alignItems: 'center',
                height: height * 0.1,
              }}
            >
              <Image
                resizeMode="contain"
                style={
                  media2 != ''
                    ? { height: height * 0.1, width: width * 0.13 }
                    : { height: height * 0.05, width: width * 0.05 }
                }
                source={
                  media2 != ''
                    ? `${EndPoint.baseAssestURL}${media2}`
                    : CameraIcon
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setPicker(true);
                setSelectedMediaIndex(2);
              }}
              activeOpacity={0.7}
              style={{
                padding: media3 != '' ? 5 : width * 0.075,
                backgroundColor: '#F4F7FF',
                borderRadius: width * 0.04,
                borderColor: Colors.Blueberry,
                borderWidth: 1,
                borderStyle: 'dashed',
                width: width * 0.45 * 0.33,
                justifyContent: 'center',
                alignItems: 'center',
                height: height * 0.1,
              }}
            >
              <Image
                // resizeMode={
                //   media.length > 2 && media[2]?.uri ? 'cover' : 'contain'
                // }
                resizeMode="contain"
                style={
                  media3 != ''
                    ? { height: height * 0.1, width: width * 0.13 }
                    : { height: height * 0.05, width: width * 0.05 }
                }
                source={
                  media3 != ''
                    ? `${EndPoint.baseAssestURL}${media3}`
                    : CameraIcon
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <CustomInputText
            labelStyle={{
              color: Colors.lightGray,
              fontSize: fontResize(window.width * 0.01),
            }}
            inputStyle={{ fontSize: fontResize(window.width * 0.01) }}
            width={width * 0.45}
            marginTop={window.height * 0.03}
            marginBottom={window.height * 0.02}
            label={Strings.YOUR_MESSAGE}
            maxLength={10000000}
            placeholder={'Write something here...'}
            isDetails={true}
            onChangeText={(text) => {
              setMessage(text);
              if (subjectErr) {
                if (text.length === 0) {
                  setMessageErr(Strings.MESSAGE_REQUIRED);
                } else {
                  setMessageErr('');
                }
              }
            }}
            value={message}
            window={window}
            isError={messageErr != ''}
            errorMessage={messageErr}
            inputOuterView={{ borderRadius: width * 0.04 }}
          />

          <CustomButton
            onPress={() => {
              onPressSubmit();
            }}
            width={width * 0.45}
            height={height * 0.07}
            backgroundColor={Colors.Blueberry}
            borderRadius={width * 0.02}
            alignItems={'center'}
            justifyContent={'center'}
            {...theme.fontSemiBold}
            fontSize={fontResize(width * 0.023)}
            textColor={Colors.White}
            textTransform={'capitalize'}
            text={'Submit'}
          />
        </View>
      </View>

      {isPicker && (
        <ImagePickerModal
          showPickerModal={isPicker}
          setPickerModal={() => {
            setPicker(false);
          }}
          setSelection={(value) => {
            if (value === Type.IMAGE_TYPE.CAMERA) {
              setCamera(true);
            } else {
              switch (selectedMediaIndex) {
                case 0: {
                  setMedia1(value);
                  break;
                }
                case 1: {
                  setMedia2(value);
                  break;
                }
                case 2: {
                  setMedia3(value);
                  break;
                }
              }
            }
            setPicker(false);
          }}
          token={userData?.access_token}
        />
      )}

      {isCamera && (
        <CameraModal
          showCameraModal={isCamera}
          setCameraModal={(value) => {
            setCamera(value);
          }}
          setCameraData={(value) => {
            setCamera(false);
            uploadImageData(value);
          }}
        />
      )}
    </View>
  );
};

export default CreateNewTicket;
