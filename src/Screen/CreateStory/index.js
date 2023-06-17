/* eslint-disable handle-callback-err */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  PermissionsAndroid,
  Platform,
  useWindowDimensions,
} from 'react-native';
import React, { useState } from 'react';
import CustomHeader from '../../Component/CustomHeader';
import Toast from 'react-native-simple-toast';
import { backIcon } from '../../Resources/assets';
import { mxWidth } from '../../Util';
import { theme } from '../../Util/constant';
import CustomImageSelector from '../../Component/CustomImageSelector';
import Strings from '../../Resources/Strings';
import ColorPickerTextInput from '../../Component/ColorPickerTextInput';
import CustomInputText from '../../Component/CustomInputText';
import { searchGrayIcon } from '../../Resources/assets';
import Colors from '../../Resources/Colors';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../Component/CustomButton';
import CustomModal from '../../Component/CustomModal/CustomModal';
import { uploadImage, createStory } from '../../Redux/actions/homeAction';
import { useFormik } from 'formik';
import Emitter from '../../Util/eventEmitter';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setLoading } from '../../Redux/actions/authAction';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { CustomText } from '../../Component/CustomComponent';
import { fontResize } from '../../Util/font';
import * as Yup from 'yup';
import Type from '../../Constants/Type/type';

const CreateStory = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const window = useWindowDimensions();
  const [isModal, setModal] = useState(false);
  const [userImage, setuserImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywordText, setKeywordText] = useState('');
  const [keywords, setKeywords] = useState([]);
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState('#000');
  const [keywordErr, setKeywordErr] = useState('');
  const [isErrkeyword, setIsErrKeyword] = useState(false);
  const [stories, setStories] = useState({
    file: null,
    backgroundColor: '#000',
    colorName: 'black',
    title: '',
    description: '',
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      validation(values);
    },
  });

  const validation = (values) => {
    if (
      formik.values.title !== '' &&
      formik.values.description !== '' &&
      (keywords.length > 0 || keywordText !== '')
    ) {
      setIsErrKeyword(false);
      dispatch(setLoading(true));
      if (userImage) {
        uplodImage(values);
      } else {
        postStory(null, values);
      }
    } else {
      Toast.show('Fields are empty');
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
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        quality: 0.1,
      };
      if (isCameraPermitted && isStoragePermitted) {
        if (type === 'camera') {
          launchCamera(options, (res) => {
            if (res?.assets && res?.assets[0]) {
              setModal(false);
              setuserImage(res.assets[0].uri);
              dispatch(setLoading(false));
            }
            setModal(false);
            dispatch(setLoading(false));
          }).catch((err) => {
            setModal(false);
            dispatch(setLoading(false));
          });
        } else {
          launchImageLibrary(options, (response) => {
            console.log('response======', response);
            if (response?.assets && response?.assets[0]) {
              setModal(false);
              setuserImage(response.assets[0].uri);

              dispatch(setLoading(false));
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

  const AddNewStory = () => {
    if (keywordText.trim() !== '') {
      let text = keywordText;
      setKeywords([...keywords, text]);
      setKeywordText('');
    }
  };
  const postStory = (imagePath, values) => {
    let params = null;
    if (imagePath) {
      params = [
        {
          image: imagePath,
          bgcolor: selectedColor,
          title: values.title,
          description: values.description,
          keywords: keywords.length > 0 ? keywords.join(',') : keywordText,
        },
      ];
    } else {
      params = [
        {
          image: '',
          bgcolor: selectedColor,
          title: values.title,
          description: values.description,
          keywords: keywords.length > 0 ? keywords.join(',') : keywordText,
        },
      ];
    }
    dispatch(setLoading(true));

    dispatch(
      createStory({
        params,
        onSuccess: (result) => {
          Emitter.emit(Type.EMITTER.STORE_CREATE);
          navigation.goBack();
          dispatch(setLoading(false));
        },
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };

  const uplodImage = (values) => {
    let data = { imagePath: userImage };

    dispatch(
      uploadImage({
        data,
        onSuccess: (result) => {
          if (result.data) {
            postStory(result.data, values);
          }
          console.log('Image UPload', result.data);
          // dispatch(setLoading(false));
        },
        onError: (error) => {
          // dispatch(setLoading(false));
        },
      })
    );
  };

  const onTitleChange = (text) => {
    setTitle(text);
  };

  const checkKeyboards = () => {
    if (keywords.length == 0 && keywordText == '') {
      setIsErrKeyword(true);
      setKeywordErr('Keyboard is required');
    } else {
      setIsErrKeyword(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        title={''}
      />
      <View style={{ paddingVertical: 5, paddingHorizontal: 16, flex: 1 }}>
        <Text style={{ fontSize: 35, color: Colors.Black, ...theme.fontBold }}>
          {Strings.CREATE_STORY}
        </Text>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 22,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: Colors.Black,
                ...theme.fontSemiBold,
              }}
            >
              Story Info
            </Text>
            <View
              style={{
                marginLeft: 12,
                height: 1,
                width: mxWidth * 0.6,
                backgroundColor: '#D8D8D8',
              }}
            />
          </View>

          <View
            style={{
              borderBottomColor: Colors.DimGray,
            }}
          >
            <CustomImageSelector
              AttachText={Strings.ATTACH_YOUR_PHOTO}
              label={Strings.ADD_IMAGE_OPTIONAL}
              borderColor={'#C2C5CE'}
              imagePath={userImage}
              imagePress={() => setModal(true)}
              window={window}
            />
            <View style={{ paddingVertical: 22 }}>
              <ColorPickerTextInput
                onSelectedColor={(color) => setSelectedColor(color.color)}
              />
            </View>
            <View style={{ paddingVertical: 22 }}>
              <CustomInputText
                window={{ width: width, height: height }}
                label={Strings.TITLE}
                labelStyle={{ ...theme.fontSemiBold, fontSize: 18 }}
                inputOuterView={{
                  borderColor: formik?.errors?.title ? 'red' : '#C2C5CE',
                  borderWidth: 1,
                }}
                value={formik.values.title}
                onChangeText={formik.handleChange('title')}
                placeholder={''}
                isError={formik?.errors?.title !== ''}
                errorMessage={formik.errors.title && formik.errors.title}
              />
            </View>
            <View style={{ paddingVertical: 22 }}>
              <CustomInputText
                window={{ width: width, height: height }}
                label={Strings.DESCRIPTION}
                value={formik.values.description}
                labelStyle={{ ...theme.fontSemiBold, fontSize: 18 }}
                isDetails={true}
                inputOuterView={{
                  borderColor: formik?.errors?.description ? 'red' : '#C2C5CE',
                  borderWidth: 1,
                  paddingVertical: 8,
                }}
                maxLength={1000000}
                onChangeText={formik.handleChange('description')}
                placeholder={''}
                isError={formik?.errors?.description !== ''}
                errorMessage={formik.errors.title && formik.errors.description}
              />
            </View>
          </View>
          <View style={{ paddingVertical: 22 }}>
            <CustomInputText
              window={{ width: width, height: height }}
              label={Strings.ADD_KEYWORDS}
              labelStyle={{ ...theme.fontSemiBold, fontSize: 18 }}
              value={keywordText}
              inputOuterView={{
                borderColor: isErrkeyword ? 'red' : '#C2C5CE',
                borderWidth: 1,
                // paddingVertical: 8,
              }}
              isRightButton
              rightButtonImage={searchGrayIcon}
              disabled
              onChangeText={(text) => {
                setKeywordText(text);
                setIsErrKeyword(false);
              }}
              placeholder={''}
              isError={isErrkeyword}
              errorMessage={keywordErr}
            />
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {keywords &&
              keywords.length > 0 &&
              keywords.map((item) => {
                return (
                  <View
                    style={{
                      padding: 8,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      backgroundColor: Colors.Blueberry,
                      marginRight: 12,
                      borderRadius: 12,
                      marginVertical: 6,
                    }}
                  >
                    <CustomText
                      fontSize={fontResize(16)}
                      {...theme.fontMedium}
                      style={{ color: Colors.White }}
                    >
                      {item}
                    </CustomText>
                  </View>
                );
              })}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <CustomButton
              width={'35%'}
              height={'50px'}
              backgroundColor={Colors.White}
              marginTop={'22px'}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              fontFamily={'Gilroy-SemiBold'}
              fontSize={'18px'}
              textColor={Colors.Blueberry}
              borderColor={Colors.Blueberry}
              borderWidth={'1px'}
              onPress={AddNewStory}
              text={Strings.ADD_NEW}
            />
          </View>

          <View style={{ paddingVertical: 22 }}>
            <CustomButton
              width={'100%'}
              height={'55px'}
              backgroundColor={Colors.Blueberry}
              marginTop={'22px'}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              fontFamily={'Gilroy-SemiBold'}
              fontSize={'18px'}
              textColor={Colors.White}
              onPress={() => {
                checkKeyboards();
                formik.handleSubmit();
              }}
              text={Strings.CREATE_STORY}
            />
          </View>
        </ScrollView>
        <CustomModal
          isVisible={isModal}
          cancelVissible={() => {
            setModal(false);
          }}
          selectImage={(text) => selectImage(text)}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateStory;
