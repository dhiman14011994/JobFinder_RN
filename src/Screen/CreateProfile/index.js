import {
  useWindowDimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Text,
  Image,
  View,
  useColorScheme,
  Keyboard,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import {
  CustomText,
  CustomView,
  ContainerView,
} from '../../Component/CustomComponent';
import Strings from '../../Resources/Strings';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
import CustomInputText from '../../Component/CustomInputText';
import CustomImageSelector from '../../Component/CustomImageSelector';
import CustomModal from '../../Component/CustomModal/CustomModal';
import DownArrow from '../../Resources/assets/downArrow.png';
import Calender from '../../Resources/assets/Calender.png';
import CustomButton from '../../Component/CustomButton';
import GoogleDriveIcon from '../../Resources/assets/googleDriveIcon.png';
import DropBoxIcon from '../../Resources/assets/dropboxIcon.png';
import LocalFileIcon from '../../Resources/assets/localFile.png';
import { setLoading, signUp } from '../../Redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker, { types } from 'react-native-document-picker';
import {
  RED_DELETE_ICON,
  backIcon,
  googleDoc_Icon,
} from '../../Resources/assets';
import { isNative, mxHeight, mxWidth } from '../../Util';
import {
  BackButton,
  HeaderContainer,
} from '../Authentication/VerificationStyle';
import { imageUplaod } from '../../Redux/services/profileService';
import EndPoint from '../../Redux/constants/EndPoint';
import { RouteName } from '../../Navigation/routeName';
import moment from 'moment';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import { setFirebaseUserData } from '../../Constants/FireStoremanager/FireStoremanager';
import { theme } from '../../Util/constant';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  GDrive,
  MimeTypes,
} from '@robinbobin/react-native-google-drive-api-wrapper';
import CheckBox from '@react-native-community/checkbox';

import MonthPicker, {
  ACTION_DATE_SET,
  ACTION_DISMISSED,
  ACTION_NEUTRAL,
} from 'react-native-month-year-picker';
import FastImage from 'react-native-fast-image';

import DropBoxWebView from './DropBoxWebView';
import { style } from './style';
import ReactNativeBlobUtil from 'react-native-blob-util';
import SelectDropdown from 'react-native-select-dropdown';
import Type from '../../Constants/Type/type';
import { getGoogleDirveData } from '../../Component/CustomFuction/CreateProfileFunction';
import { privacySettingChanges } from '../../Redux/actions/profileAction';

let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const CreateProfile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const window = useWindowDimensions();
  const [isGDriveVisible, setisGDriveVisible] = useState(false);
  const [isPresent, setPresent] = useState(false);
  const [resumeType, setResumeType] = useState('');

  const userData = useSelector((state) =>
    state.auth.registerData
      ? state.auth.registerData
      : state.auth.loginData
      ? state.auth.loginData
      : state.auth.socialLoginData
      ? state.auth.socialLoginData
      : state.auth.userData
  );
  const userData12 = useSelector((state) => state.auth);
  const userType = useSelector((state) => state.auth.userType);
  const [email, setEmail] = useState(userData?.data?.email || '');
  const [about, setAbout] = useState('');
  const [name, setName] = useState(userData.data.name);
  const MobileNumber = userData?.data?.country_code
    ? userData?.data?.phone_number
      ? `${userData?.data?.country_code} ${userData?.data?.phone_number}`
      : userData?.data?.phone_number
    : userData?.data?.country_code;
  const [phone, setPhone] = useState(MobileNumber ? MobileNumber : '');
  const [localeFile, setLocaleFile] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [localeFileErr, setLocaleFileErr] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [aboutCompany, setAboutCompany] = useState('');
  const [companyNameErr, setCompanyNameErr] = useState('');
  const [companyEmailErr, setCompanyEmailErr] = useState('');
  const [companyPhoneErr, setCompanyPhoneErr] = useState('');
  const [businessAddressErr, setBusinessAddressErr] = useState('');
  const [businessNumberErr, setBusinessNumberErr] = useState('');
  const [aboutCompanyErr, setAboutCompanyErr] = useState('');
  const [isModal, setModal] = useState(false);
  const [userImage, setuserImage] = useState('');
  const [userImageErr, setuserImageErr] = useState('');
  const [startdate, setStartDate] = useState(new Date());
  const [enddate, setEndDate] = useState(new Date());
  const [isopen, setOpen] = useState(false);
  const [isStartDate, setIsStartDate] = useState(true);
  const [id, setID] = useState(0);
  const scheme = useColorScheme();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [googleDriveData, setGoogleDriveData] = useState([]);
  const [experienceData, setExperienceData] = useState({
    allExperience: [
      {
        id: 0,
        company_name: '',
        your_role: '',
        start_date: '',
        end_date: '',
        your_experience: '',
        is_currently_working: false,
      },
    ],
  });
  const [settingData, setSettingData] = useState({
    name: false,
    address: false,
    started_date: false,
    email_address: true,
    phone_number: true,
    about_me: false,
    work_experience: false,
    certificates: false,
  });

  const [educationData, setEducationData] = useState({
    allEducations: [
      {
        id: '',
        school: '',
        degree_title: '',
        study: '',
      },
    ],
  });

  var inputRef = useRef(null);
  const selectUser = userData.data.role
    ? userData.data.role
    : Strings.PROFESSIONAL;

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [showDropBox, setShowDropBox] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const selectImage = async (type) => {
    try {
      dispatch(setLoading(true));
      // let isCameraPermitted = await requestCameraPermission();
      // let isStoragePermitted = await requestExternalWritePermission();
      let options = {
        // maxWidth: 1000,
        // maxHeight: 1000,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        // quality: 0.1,
      };

      if (type == 'camera') {
        launchCamera(options, async (res) => {
          if (res?.assets && res?.assets[0]) {
            setModal(false);
            fetchUserImage(res);
          }
          setModal(false);
          setuserImageErr('');
          dispatch(setLoading(false));
        }).catch((err) => {
          setModal(false);
          dispatch(setLoading(false));
        });
      } else {
        launchImageLibrary(options, async (response) => {
          if (response?.assets && response?.assets[0]) {
            setModal(false);
            fetchUserImage(response);
          }
          setModal(false);
          dispatch(setLoading(false));
        }).catch((err) => {
          setModal(false);
          dispatch(setLoading(false));
        });
      }
      // setModal(false);
      // } else {
      //   setModal(false);
      //   dispatch(setLoading(false));
      // }
    } catch (error) {
      setModal(false);
      dispatch(setLoading(false));
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

      dispatch(setLoading(false));
      setuserImageErr('');
      console.log('getImageURI.data[0])>>>>', getImageURI.data[0]);
      setuserImage(getImageURI.data[0]);
    } else {
      alert(Strings.FILE_SIZE_TEXT);
      dispatch(setLoading(false));
      setuserImageErr('');
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

  const addNewData = () => {
    var index = experienceData.allExperience.length - 1;
    if (experienceData.allExperience[index].your_role == '') {
      Toast.show('Work experience field are empty');
    } else {
      let newData = {
        id: experienceData.allExperience.length,
        your_role: '',
        company_name: '',
        start_date: '',
        end_date: '',
        your_experience: '',
        is_currently_working: false,
      };
      var updateData = experienceData.allExperience;
      updateData.push(newData);
      setExperienceData({ ...experienceData, allExperience: updateData });
    }
  };

  const addNewEducation = () => {
    var index = educationData.allEducations.length - 1;
    if (educationData.allEducations[index].school == '') {
      Toast.show(Strings.EDUCATION_TYPE.EDUCATION_NAME_ERROR);
    } else if (educationData.allEducations[index].degree_title == '') {
      Toast.show(Strings.EDUCATION_TYPE.DEGREE_TITLE_ERROR);
    } else if (educationData.allEducations[index].study == '') {
      Toast.show(Strings.EDUCATION_TYPE.FIELD_OF_STUDY_ERROR);
    } else {
      let newData = {
        id: '',
        school: '',
        degree_title: '',
        study: '',
      };
      var updateData = educationData.allEducations;
      updateData.push(newData);
      setEducationData({ ...educationData, allEducations: updateData });
    }
  };

  const removeEducation = ({ index }) => {
    var updateData = educationData.allEducations;
    updateData.splice(index, 1);
    setEducationData({ ...educationData, allEducations: updateData });
  };
  const removeWorkExp = ({ index }) => {
    var updateData = experienceData.allExperience;
    updateData.splice(index, 1);
    setExperienceData({ ...experienceData, allExperience: updateData });
  };

  const fetchLocalFile = () => {
    dispatch(setLoading(true));
    DocumentPicker.pick({
      allowMultiSelection: true,
      type: [types.doc, types.docx, types.pdf],
    })
      .then(async (data) => {
        const fileSize = data[0]?.size ? Number(data[0].size) / 1000000 : 0;

        if (fileSize < 20) {
          let imageData = {
            uri: data[0].uri,
            type: data[0].type,
            name: 'file.pdf',
          };
          var getImageURI = await imageUplaod({
            file: imageData,
            token: userData?.access_token,
          });
          setLocaleFileErr('');
          setResumeType(
            data[0].type == 'application/pdf'
              ? Strings.LOCAL_PDF
              : Strings.LOCAL
          );
          setResumeName(data[0]?.name);
          setLocaleFile(`${getImageURI.data[0]}`);
          dispatch(setLoading(false));
        } else {
          alert(Strings.FILE_SIZE_TEXT);
          dispatch(setLoading(false));
        }
      })
      .catch((err) => {
        dispatch(setLoading(false));
        console.log('error', err);
      });
  };

  const updateValue = ({ index, text, key }) => {
    let updateItem = experienceData.allExperience.map((item, i) => {
      if (i == index) {
        if (key === 'your role') {
          return { ...item, your_role: text };
        } else if (key === 'your experience') {
          return { ...item, your_experience: text };
        } else if (key === 'company_name') {
          return { ...item, company_name: text };
        } else if (key === 'currently working') {
          return { ...item, is_currently_working: !item.is_currently_working };
        }
      }
      return item;
    });
    setExperienceData({ ...experienceData, allExperience: updateItem });
  };

  const updateEducation = ({ index, text, key }) => {
    let updateItem = educationData.allEducations.map((item, i) => {
      if (i == index) {
        if (key == Type.EDUCATION.EDUCATION_NAME) {
          return { ...item, school: text };
        } else if (key == Type.EDUCATION.DEGREE) {
          return { ...item, degree_title: text };
        } else if (key == Type.EDUCATION.FIELD_OF_STUDY) {
          return { ...item, study: text };
        }
      }
      return item;
    });
    setEducationData({ ...educationData, allEducations: updateItem });
  };

  const onValidation = () => {
    var isValid = true;
    var educationLastIndex = educationData?.allEducations.length - 1;
    if (userImage === '') {
      setuserImageErr('Please choose image');
      isValid = false;
    }
    if (userData?.data?.role !== Strings.PROFESSIONAL) {
      if (companyName == '') {
        isValid = false;
        setCompanyNameErr(Strings.EMPTY_COMPANY_NAME);
      }
      if (companyEmail == '') {
        isValid = false;
        setCompanyEmailErr(Strings.EMPTY_COMPANY_EMAIL);
      } else if (!reg.test(companyEmail)) {
        isValid = false;
        setCompanyEmailErr(Strings.VAILD_COMPANY_EMAIL);
      }

      if (companyPhone.length == 0) {
        isValid = false;
        setCompanyPhoneErr(Strings.EMPTY_COMPANY_PHONE_NUMBER);
      } else if (companyPhone.length > 8 == false) {
        isValid = false;
        setCompanyPhoneErr(Strings.EMPTY_COMPANY_PHONE_NUMBER);
      }

      if (businessNumber == '') {
        isValid = false;
        setBusinessNumberErr(Strings.EMPTY_COMPANY_NUMBER);
      }
      if (businessAddress == '') {
        isValid = false;
        setBusinessAddressErr(Strings.EMPTY_COMPANY_ADDRESS);
      }
      if (aboutCompany == '') {
        isValid = false;
        setAboutCompanyErr(Strings.EMPTY_COMPANY_ABOUT);
      }
    } else {
      if (
        educationData?.allEducations[educationLastIndex]?.school.length == 0
      ) {
        isValid = false;
        Toast.show(Strings.EDUCATION_TYPE.EMPTY_EDUCATION);
      } else if (
        educationData?.allEducations[educationLastIndex]?.degree_title.length ==
        0
      ) {
        isValid = false;
        Toast.show(Strings.EDUCATION_TYPE.EMPTY_DEGREE);
      } else if (
        educationData?.allEducations[educationLastIndex]?.study.length == 0
      ) {
        isValid = false;
        Toast.show(Strings.EDUCATION_TYPE.EMPTY_STUDY);
      }
    }
    return isValid;
  };

  const createUserProfile = async () => {
    try {
      const CreateData = await AsyncStorage.getItem(
        Strings.CREATE_PROFILE_DATA
      );
      const IS_Social = AsyncStorage.getItem(Strings.IS_SOCIAL);
      const setSocial =
        route?.params === undefined
          ? IS_Social === 'true'
            ? true
            : false
          : route?.params?.isSocial;
      const data = JSON.parse(CreateData);
      if (!onValidation()) {
        return;
      }
      const workExperienceData = experienceData.allExperience.filter(
        (item) => item.your_role !== ''
      );
      const form =
        selectUser === Strings.PROFESSIONAL
          ? setSocial
            ? {
                education_info: educationData?.allEducations,
                name: name,
                email: email.trim().toLowerCase(),
                role: userType || selectUser,
                phone_number: userData?.data?.phone_number
                  ? userData?.data?.phone_number == 'undefined'
                    ? '1234567896'
                    : userData?.data?.phone_number
                  : '1234567896',
                country_code: userData?.data?.country_code
                  ? userData?.data?.country_code == 'undefined'
                    ? '91'
                    : userData?.data?.country_code
                  : '91',
                work_info: workExperienceData,
                link_your_resume: localeFile,
                image: userImage,
                about_me: about,
                from_social: setSocial,
                is_create: true,
                user_id: userData?.data?._id,
                uid: route?.params?.result?.data?.uid || data.data?.uid,
                provider:
                  route?.params?.result?.data?.provider || data.data?.provider,
                resume_type: resumeType,
                resume_name: resumeName,
              }
            : {
                education_info: educationData?.allEducations,
                name: name,
                email: email.trim().toLowerCase(),
                role: userType || selectUser,
                phone_number: userData?.data?.phone_number
                  ? userData?.data?.phone_number == 'undefined'
                    ? '1234567896'
                    : userData?.data?.phone_number
                  : '1234567896',
                country_code: userData?.data?.country_code
                  ? userData?.data?.country_code == 'undefined'
                    ? '91'
                    : userData?.data?.country_code
                  : '91',
                work_info: workExperienceData,
                link_your_resume: localeFile,
                image: userImage,
                about_me: about,
                from_social: setSocial,
                is_create: true,
                user_id: userData?.data?._id,
                resume_type: resumeType,
                resume_name: resumeName,
              }
          : setSocial
          ? {
              name: name,
              email: email.trim().toLowerCase(),
              role: userType || selectUser,
              phone_number: userData?.data?.phone_number
                ? userData?.data?.phone_number == 'undefined'
                  ? '1234567896'
                  : userData?.data?.phone_number
                : '1234567896',
              country_code: userData?.data?.country_code
                ? userData?.data?.country_code == 'undefined'
                  ? '91'
                  : userData?.data?.country_code
                : '91',
              company_name: companyName,
              company_email: companyEmail,
              company_phone: companyPhone,
              business_address: businessAddress,
              business_number: businessNumber,
              about_company: aboutCompany,
              image: userImage,
              from_social: setSocial,
              is_create: true,
              user_id: userData?.data?._id,
              uid: route?.params?.result?.data?.uid || data.data?.uid,
              provider:
                route?.params?.result?.data?.provider || data.data?.provider,
            }
          : {
              name: name,
              email: email.trim().toLowerCase(),
              role: userType || selectUser,
              phone_number: userData?.data?.phone_number
                ? userData?.data?.phone_number == 'undefined'
                  ? '1234567896'
                  : userData?.data?.phone_number
                : '1234567896',
              country_code: userData?.data?.country_code
                ? userData?.data?.country_code == 'undefined'
                  ? '91'
                  : userData?.data?.country_code
                : '91',
              company_name: companyName,
              company_email: companyEmail,
              company_phone: companyPhone,
              business_address: businessAddress,
              business_number: businessNumber,
              about_company: aboutCompany,
              image: userImage,
              from_social: setSocial,
              is_create: true,
              user_id: userData?.data?._id,
            };

      console.log('form>>>>>', JSON.stringify(form), userImage);

      dispatch(setLoading(true));
      dispatch(
        signUp({
          form,
          onSuccess: async (result) => {
            AsyncStorage.setItem(Strings.ACCESS_TOKEN_KEY, result.access_token);
            AsyncStorage.setItem(Strings.LOGIN_DATA, JSON.stringify(result));
            AsyncStorage.setItem(Strings.IS_CREATE_PROFILE, 'true');
            const userStoreData = {
              id: userData?.data?._id,
              email: result.data.email || email,
              device_token: result.data.device_token,
              image: result.data.image || userImage,
              name: result.data.name || name,
              role: result.data.role || userType || selectUser,
              phone_number:
                result.data.phone_number || userData?.data?.phone_number || '',
              status: 'online',
            };
            const storeFirbaseData = await setFirebaseUserData({
              id: userData?.data?._id,
              userData: userStoreData,
            });
            dispatch(setLoading(false));
            updatePrivacySetting();
            navigation.reset({
              index: 0,
              routes: [{ name: RouteName.HOMESTACK }],
            });
          },
          onError: (error) => {
            dispatch(setLoading(false));
            console.log('error create profile', JSON.stringify(error));
          },
        })
      );
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  const updatePrivacySetting = () => {
    let param = settingData;
    dispatch(
      privacySettingChanges({
        param,
        onSuccess: (result) => {
          dispatch(setLoading(false));
        },
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };

  const fetchGoogleDriveFile = async () => {
    const getDriveData = await getGoogleDirveData();
    if (getDriveData?.error) {
      setGoogleDriveData([]);
      setisGDriveVisible(false);
    } else {
      setGoogleDriveData(getDriveData?.data);
      setisGDriveVisible(true);
    }
  };

  const onValueChange = (event, newDate) => {
    switch (event) {
      case ACTION_DATE_SET:
        var updateStartDate = experienceData.allExperience.map(
          (item, index) => {
            if (item.id == id) {
              if (isStartDate) {
                return { ...item, start_date: newDate };
              } else {
                return { ...item, end_date: newDate };
              }
            }
            return item;
          }
        );
        setShow(false);
        setExperienceData({
          ...experienceData,
          allExperience: updateStartDate,
        });

        setShow(false);
        break;
      case ACTION_NEUTRAL:
        setShow(false);
        break;
      case ACTION_DISMISSED:
        setShow(false);
        break;
    }
  };

  const googleRenderItem = ({ item, index }) => {
    if (
      item.mimeType == 'application/vnd.google-apps.document' ||
      item.mimeType == 'application/pdf'
    ) {
      return (
        <TouchableOpacity
          onPress={() => {
            downloadGoogleDoc(item);
          }}
          style={[
            style.googleContainer,
            {
              marginLeft: index == 0 ? 0 : index % 2 == 0 ? 0 : mxWidth * 0.05,
              marginBottom:
                googleDriveData.length == index + 1
                  ? mxHeight * 0.15
                  : mxHeight * 0.02,
              height: mxHeight * 0.2,
            },
          ]}
        >
          <FastImage
            resizeMode={'contain'}
            style={style.docImage}
            source={
              item.mimeType == 'application/vnd.google-apps.document'
                ? googleDoc_Icon
                : require('../../Resources/assets/PdfIcon.png')
            }
          />
          <Text
            numberOfLines={2}
            style={[style.docText]}
          >{`Name: ${item.name}`}</Text>
        </TouchableOpacity>
      );
    }
  };

  const downloadGoogleDoc = async (item) => {
    setResumeType(
      item.mimeType == 'application/vnd.google-apps.document'
        ? Strings.GOOGLE_DRIVE_DOC
        : Strings.GOOGLE_DRIVE_PDF
    );
    setResumeName(item.name);
    setLocaleFile(item.id);
    setisGDriveVisible(false);
  };
  return (
    <SafeAreaView style={style.mainContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {isNative && (
          <HeaderContainer marginTop={0}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                paddingLeft: 15,
                paddingTop: Platform.OS == 'ios' ? 15 : 0,
              }}
            >
              <BackButton resizeMode="contain" source={backIcon} />
            </TouchableOpacity>
          </HeaderContainer>
        )}
        <CustomText
          marginLeft={window.width * 0.05}
          fontSize={fontResize(30)}
          fontFamily={'Gilroy-Bold'}
        >
          {Strings.CREATE_PROFILE}
        </CustomText>

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
            <CustomInputText
              marginBottom={window.height * 0.02}
              label={Strings.END_USER_TYPE}
              editable={false}
              disabled
              isRightButton
              placeholder={`I’m a ${selectUser}`}
              rightButtonImage={DownArrow}
              window={window}
              placeholderTextColor={Colors.Black}
            />
            <ContainerView
              marginTop={window.height * 0.05}
              marginBottom={window.height * 0.05}
              width={'100%'}
              flexDirection={'row'}
              alignItems={'center'}
            >
              <CustomText
                fontSize={fontResize(18)}
                fontFamily={'Gilroy-Bold'}
                textColor={Colors.EerieBlack}
              >
                {Strings.BASIC_INFO}
              </CustomText>
              <CustomView
                width={window.width * 0.7}
                marginLeft={window.width * 0.05}
                height={'1px'}
                bgColor={Colors.PrimaryGray}
              />
            </ContainerView>
            {selectUser == Strings.PROFESSIONAL && (
              <CustomImageSelector
                borderColor={userImageErr ? 'red' : Colors.DimGray}
                AttachText={Strings.ATTACH_YOUR_PHOTO}
                label={Strings.USER_PROFILE_IMAGE}
                imagePress={() => {
                  setModal(true);
                }}
                imagePath={
                  userImage == ''
                    ? userImage
                    : `${EndPoint.baseAssestURL}${userImage}`
                }
                marginBottom={window.height * 0.02}
                window={window}
                inputOuterView={{
                  borderColor: userImageErr ? 'red' : '#c4c4c4',
                }}
                errImage={userImageErr}
              />
            )}

            <CustomInputText
              ref={inputRef}
              marginBottom={window.height * 0.02}
              label={Strings.NAME}
              editable={false}
              onChangeText={(text) => {
                setName(text);
              }}
              value={name}
              placeholder={'Johnny'}
              window={window}
            />
            <CustomInputText
              marginBottom={window.height * 0.02}
              label={Strings.EMAIL}
              editable={false}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder={'example@domain.com'}
              window={window}
            />
            <CustomInputText
              label={Strings.PHONE}
              marginBottom={window.height * 0.02}
              onChangeText={(text) => setPhone(text)}
              value={`+${phone}`}
              maxLength={15}
              editable={false}
              placeholder={'+911234567890'}
              window={window}
            />
            {selectUser == Strings.PROFESSIONAL && (
              <CustomInputText
                label={Strings.ABOUT_ME}
                isDetails={true}
                onChangeText={(text) => {
                  setAbout(text);
                }}
                window={window}
                value={about}
              />
            )}

            {/* ************************ Professional Education ************************    */}
            {selectUser == Strings.PROFESSIONAL && (
              <ContainerView
                marginTop={window.height * 0.05}
                marginBottom={window.height * 0.05}
                flexDirection={'row'}
                alignItems={'center'}
              >
                <CustomText
                  fontSize={fontResize(18)}
                  fontFamily={'Gilroy-Bold'}
                  textColor={Colors.EerieBlack}
                >
                  {Strings.EDUCATION}
                </CustomText>
                <CustomView
                  width={window.width}
                  marginLeft={window.width * 0.05}
                  height={'1px'}
                  bgColor={Colors.PrimaryGray}
                />
              </ContainerView>
            )}

            {selectUser == Strings.PROFESSIONAL &&
              educationData.allEducations.map((data, index) => {
                return (
                  <View>
                    <CustomInputText
                      ref={inputRef}
                      marginBottom={window.height * 0.02}
                      label={Strings.EDUCATION_TYPE.EDUCATION_NAME}
                      editable={true}
                      onChangeText={(text) => {
                        updateEducation({
                          index,
                          text,
                          key: Type.EDUCATION.EDUCATION_NAME,
                        });
                      }}
                      value={data?.school}
                      placeholder={''}
                      window={window}
                    />

                    <CustomInputText
                      ref={inputRef}
                      marginBottom={window.height * 0.02}
                      label={Strings.EDUCATION_TYPE.DEGREE_TITLE}
                      editable={true}
                      onChangeText={(text) => {
                        updateEducation({
                          index,
                          text,
                          key: Type.EDUCATION.DEGREE,
                        });
                      }}
                      value={data?.degree_title}
                      placeholder={''}
                      window={window}
                    />

                    <CustomInputText
                      ref={inputRef}
                      marginBottom={window.height * 0.02}
                      label={Strings.EDUCATION_TYPE.FIELD_OF_STUDY}
                      editable={true}
                      onChangeText={(text) => {
                        updateEducation({
                          index,
                          text,
                          key: Type.EDUCATION.FIELD_OF_STUDY,
                        });
                      }}
                      value={data?.study}
                      placeholder={''}
                      window={window}
                    />
                    {index != 0 && (
                      <CustomText
                        fontFamily={'Gilroy-Bold'}
                        textColor={Colors.Red}
                        marginBottom={window.height * 0.05}
                        textAlign={'right'}
                        textLine={'underline'}
                        fontSize={fontResize(window.height * 0.03)}
                        onPress={() => {
                          removeEducation({ index });
                        }}
                      >
                        {Strings.DELETE}
                      </CustomText>
                    )}

                    {educationData.allEducations.length - 1 != index && (
                      <CustomView
                        width={window.width * 0.98}
                        height={'1px'}
                        bgColor={Colors.PrimaryGray}
                        marginLeft={window.width * 0.01}
                        marginBottom={window.height * 0.02}
                      />
                    )}
                  </View>
                );
              })}

            {selectUser == Strings.PROFESSIONAL && (
              <CustomButton
                onPress={() => {
                  addNewEducation();
                }}
                width={'40%'}
                height={'50px'}
                backgroundColor={Colors.PrimaryLightGray}
                marginTop={window.height * 0.03}
                marginBottom={window.height * 0.03}
                borderRadius={'10px'}
                alignItems={'center'}
                justifyContent={'center'}
                fontFamily={'Gilroy-SemiBold'}
                fontSize={'18px'}
                textColor={Colors.Blueberry}
                text={Strings.ADD_NEW}
                borderWidth={1}
                borderColor={Colors.SilverLight}
                alignSelf={'flex-end'}
              />
            )}

            <ContainerView
              marginTop={window.height * 0.05}
              marginBottom={window.height * 0.05}
              flexDirection={'row'}
              alignItems={'center'}
            >
              <CustomText
                fontSize={fontResize(18)}
                fontFamily={'Gilroy-Bold'}
                textColor={Colors.EerieBlack}
              >
                {selectUser == Strings.PROFESSIONAL
                  ? Strings.WORK_EXPERIENCE
                  : Strings.COMPANY_INFO}
              </CustomText>
              <CustomView
                width={window.width}
                marginLeft={window.width * 0.05}
                height={'1px'}
                bgColor={Colors.PrimaryGray}
              />
            </ContainerView>

            {selectUser == Strings.PROFESSIONAL &&
              experienceData.allExperience.map((item, index) => (
                <>
                  <CustomInputText
                    marginBottom={window.height * 0.02}
                    label={Strings.COMPANY_NAME}
                    onChangeText={(text) => {
                      updateValue({ index, text, key: 'company_name' });
                    }}
                    value={item.company_name}
                    window={window}
                  />
                  <CustomInputText
                    marginBottom={window.height * 0.02}
                    label={Strings.YOUR_ROLE}
                    onChangeText={(text) => {
                      updateValue({ index, text, key: 'your role' });
                    }}
                    value={experienceData.allExperience[index].your_role}
                    window={window}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      width: mxWidth,
                      alignItems: 'center',
                      marginBottom: window.height * 0.02,
                    }}
                  >
                    <CheckBox
                      disabled={false}
                      value={item.is_currently_working}
                      onFillColor={Colors.Blueberry}
                      onCheckColor={'#fff'}
                      onTintColor={'#fff'}
                      boxType={'square'}
                      onAnimationType={'stroke'}
                      onValueChange={(newValue) => {
                        updateValue({
                          index,
                          newValue,
                          key: 'currently working',
                        });
                      }}
                    />
                    <Text
                      style={{
                        fontSize: fontResize(16),
                        textTransform: 'none',
                        marginLeft: '4%',
                        color: Colors.EerieBlack,
                      }}
                    >
                      {Strings.PRESENT_WORK}
                    </Text>
                  </View>
                  <CustomInputText
                    marginBottom={window.height * 0.02}
                    label={Strings.START_DATE}
                    editable={false}
                    isRightButton
                    rightButtonImage={Calender}
                    rightButtonPress={() => {
                      setShow(true);
                      // setOpen(true);
                      setIsStartDate(true);
                      setID(item.id);
                    }}
                    window={window}
                    value={
                      item.start_date == ''
                        ? ''
                        : moment(item.start_date).format('MMMM YYYY')
                    }
                  />
                  <CustomInputText
                    marginBottom={window.height * 0.02}
                    label={Strings.END_DATE}
                    editable={false}
                    isRightButton
                    disabled={item.is_currently_working}
                    rightButtonImage={Calender}
                    rightButtonPress={() => {
                      setShow(true);
                      setID(item.id);
                      setIsStartDate(false);
                    }}
                    window={window}
                    value={
                      item.is_currently_working
                        ? Strings.PRESENT
                        : item.end_date == ''
                        ? ''
                        : moment(item.end_date).format('MMMM YYYY')
                    }
                  />

                  <CustomInputText
                    marginBottom={window.height * 0.02}
                    label={Strings.YOUR_EXPERIENCE}
                    isDetails={true}
                    onChangeText={(text) => {
                      updateValue({ index, text, key: 'your experience' });
                    }}
                    value={item.your_experience}
                    window={window}
                  />

                  {index != 0 && (
                    <CustomText
                      fontFamily={'Gilroy-Bold'}
                      textColor={Colors.Red}
                      marginBottom={window.height * 0.05}
                      textAlign={'right'}
                      textLine={'underline'}
                      fontSize={fontResize(window.height * 0.03)}
                      onPress={() => {
                        removeWorkExp({ index });
                      }}
                    >
                      {Strings.DELETE}
                    </CustomText>
                  )}

                  {experienceData.allExperience.length - 1 != index && (
                    <CustomView
                      width={window.width * 0.98}
                      height={'1px'}
                      bgColor={Colors.PrimaryGray}
                      marginLeft={window.width * 0.01}
                      marginBottom={window.height * 0.02}
                    />
                  )}
                </>
              ))}
            {/* ************************ Organization && Recruiter ************************    */}

            {selectUser != Strings.PROFESSIONAL && (
              <>
                <CustomInputText
                  marginBottom={window.height * 0.02}
                  label={Strings.COMPANY_NAME}
                  onChangeText={(text) => {
                    setCompanyName(text);
                    if (companyNameErr) {
                      setCompanyNameErr('');
                    }
                  }}
                  value={companyName}
                  window={window}
                  errorMessage={companyNameErr}
                  isError={companyNameErr !== ''}
                />
                <CustomInputText
                  marginBottom={window.height * 0.02}
                  label={Strings.COMPANY_EMAIL}
                  keyboardType={'email-address'}
                  onChangeText={(text) => {
                    setCompanyEmail(text);
                    if (companyEmailErr) {
                      setCompanyEmailErr(
                        !reg.test(text) ? Strings.VAILD_COMPANY_EMAIL : ''
                      );
                    }
                  }}
                  value={companyEmail}
                  window={window}
                  errorMessage={companyEmailErr}
                  isError={companyEmailErr !== ''}
                />
                <CustomInputText
                  marginBottom={window.height * 0.02}
                  label={Strings.COMPANY_PHONE}
                  maxLength={15}
                  keyboardType={'phone-pad'}
                  onChangeText={(text) => {
                    setCompanyPhone(text);
                    if (companyPhoneErr) {
                      setCompanyPhoneErr(
                        text.length > 8 == false
                          ? Strings.EMPTY_COMPANY_PHONE_NUMBER
                          : ''
                      );
                    }
                  }}
                  value={companyPhone}
                  window={window}
                  errorMessage={companyPhoneErr}
                  isError={companyPhoneErr !== ''}
                />
                <CustomInputText
                  marginBottom={window.height * 0.02}
                  label={Strings.BUSINESS_ADDRESS}
                  onChangeText={(text) => {
                    setBusinessAddress(text);
                    if (businessAddressErr) {
                      setBusinessAddressErr('');
                    }
                  }}
                  value={businessAddress}
                  window={window}
                  errorMessage={businessAddressErr}
                  isError={businessAddressErr !== ''}
                />
                <CustomInputText
                  marginBottom={window.height * 0.02}
                  label={Strings.BUSINESS_NUMBER}
                  onChangeText={(text) => {
                    setBusinessNumber(text);
                    if (businessNumberErr) {
                      setBusinessNumberErr('');
                    }
                  }}
                  value={businessNumber}
                  window={window}
                  errorMessage={businessNumberErr}
                  isError={businessNumberErr !== ''}
                />
                <CustomInputText
                  marginBottom={window.height * 0.02}
                  label={Strings.ABOUT_COMPANY}
                  isDetails={true}
                  onChangeText={(text) => {
                    setAboutCompany(text);
                    if (aboutCompanyErr) {
                      setAboutCompanyErr('');
                    }
                  }}
                  value={aboutCompany}
                  window={window}
                  errorMessage={aboutCompanyErr}
                  isError={aboutCompanyErr !== ''}
                />
                <CustomImageSelector
                  AttachText={Strings.ATTACH_COMPANT_LOGO}
                  label={Strings.COMPANY_LOGO}
                  imagePress={() => {
                    setModal(true);
                  }}
                  imagePath={
                    userImage == ''
                      ? userImage
                      : `${EndPoint.baseAssestURL}${userImage}`
                  }
                  marginBottom={window.height * 0.02}
                  window={window}
                  inputOuterView={{
                    borderColor: userImageErr ? 'red' : '#c4c4c4',
                  }}
                  errImage={userImageErr}
                />
              </>
            )}

            {/* ************************ Professionals ************************    */}
            {selectUser == Strings.PROFESSIONAL && (
              <>
                <Text
                  style={{
                    ...theme.fontSemiBold,
                    fontSize: fontResize(16),
                    color: Colors.Black,
                    marginTop: window.height * 0.08,
                  }}
                >
                  Link your resume on
                </Text>
                <CustomButton
                  onPress={() => {
                    fetchGoogleDriveFile();
                  }}
                  width={'100%'}
                  height={'50px'}
                  backgroundColor={Colors.PrimaryLightGray}
                  marginTop={window.height * 0.04}
                  borderRadius={'10px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  fontFamily={'Gilroy-SemiBold'}
                  fontSize={'18px'}
                  textColor={Colors.Blueberry}
                  text={Strings.GOOGLE_DRIVE}
                  buttonImage={GoogleDriveIcon}
                  borderWidth={1}
                  borderColor={localeFileErr ? 'red' : Colors.SilverLight}
                />
                {/* <CustomButton
                  onPress={() => {
                    setShowDropBox(true);
                  }}
                  width={'100%'}
                  height={'50px'}
                  backgroundColor={Colors.PrimaryLightGray}
                  marginTop={window.height * 0.03}
                  borderRadius={'10px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  fontFamily={'Gilroy-SemiBold'}
                  fontSize={'18px'}
                  textColor={Colors.Blueberry}
                  text={Strings.DROPBOX}
                  buttonImage={DropBoxIcon}
                  borderWidth={1}
                  borderColor={localeFileErr ? 'red' : Colors.SilverLight}
                /> */}
                <CustomButton
                  onPress={() => {
                    fetchLocalFile();
                  }}
                  width={'100%'}
                  height={'50px'}
                  backgroundColor={Colors.PrimaryLightGray}
                  marginTop={window.height * 0.03}
                  borderRadius={'10px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  fontFamily={'Gilroy-SemiBold'}
                  fontSize={'18px'}
                  textColor={Colors.Blueberry}
                  text={Strings.LOCALFILE}
                  buttonImage={LocalFileIcon}
                  borderWidth={1}
                  borderColor={localeFileErr ? 'red' : Colors.SilverLight}
                />
                {localeFileErr != '' && (
                  <Text style={{ color: 'red', marginTop: 10 }}>
                    {localeFileErr}
                  </Text>
                )}
                {localeFile !== '' && (
                  <View style={style.containerCV}>
                    <View style={style.cvView}>
                      <Image
                        resizeMode="contain"
                        style={{ width: 40, height: 40 }}
                        source={
                          resumeType == Strings.GOOGLE_DRIVE_DOC ||
                          resumeType == Strings.LOCAL
                            ? googleDoc_Icon
                            : require('../../Resources/assets/PdfIcon.png')
                        }
                      />
                      <Text
                        style={{
                          fontFamily: 'Gilroy-Bold',
                          fontSize: fontResize(15),
                          marginLeft: 30,
                          color: Colors.Black,
                        }}
                      >
                        {resumeName || 'Resume.pdf'}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setResumeName('');
                        setResumeType('');
                        setLocaleFile('');
                      }}
                    >
                      <Image
                        style={style.deleteIcon}
                        source={RED_DELETE_ICON}
                      />
                    </TouchableOpacity>
                  </View>
                )}

                <CustomButton
                  onPress={() => {
                    addNewData();
                  }}
                  width={'40%'}
                  height={'50px'}
                  backgroundColor={Colors.PrimaryLightGray}
                  marginTop={window.height * 0.03}
                  marginBottom={window.height * 0.03}
                  borderRadius={'10px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  fontFamily={'Gilroy-SemiBold'}
                  fontSize={'18px'}
                  textColor={Colors.Blueberry}
                  text={Strings.ADD_NEW}
                  borderWidth={1}
                  borderColor={Colors.SilverLight}
                  alignSelf={'flex-end'}
                />
              </>
            )}

            <CustomButton
              onPress={() => {
                createUserProfile();
              }}
              width={'100%'}
              height={'50px'}
              backgroundColor={Colors.Blueberry}
              marginTop={window.height * 0.03}
              marginBottom={
                isKeyboardVisible ? window.height * 0.5 : window.height * 0.1
              }
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              fontFamily={'Gilroy-SemiBold'}
              fontSize={'18px'}
              textColor={Colors.White}
              text={
                selectUser == Strings.PROFESSIONAL
                  ? Strings.CREATE_USER_PROFILE
                  : Strings.CREATE_COMPANY_PROFILE
              }
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

      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={
            isStartDate
              ? experienceData.allExperience[id].start_date == ''
                ? startdate
                : experienceData.allExperience[id].start_date
              : experienceData.allExperience[id].end_date == ''
              ? experienceData.allExperience[id].start_date == ''
                ? startdate
                : experienceData.allExperience[id].start_date
              : experienceData.allExperience[id].end_date
          }
          minimumDate={new Date(1850, 1)}
          maximumDate={startdate}
          locale="ist"
        />
      )}
      <DropBoxWebView
        onClose={() => setShowDropBox(false)}
        showLinkedIn={showDropBox}
        onSuccess={(data) => {
          console.log('data>>>', data);
          // getAccessTokenData(data);
        }}
      />
      <Modal
        visible={isGDriveVisible}
        style={{ flex: 1 }}
        onRequestClose={() => setisGDriveVisible(false)}
        transparent={true}
        animationType={'fade'}
      >
        <CustomView
          height={window?.height}
          paddingLeft={window.width * 0.05}
          paddingRight={window.width * 0.05}
          alignItems={'flex-start'}
          justifyContent={'flex-start'}
          bgColor={Colors.White}
        >
          {isNative && (
            <HeaderContainer marginTop={0}>
              <TouchableOpacity
                onPress={() => setisGDriveVisible(false)}
                style={{
                  paddingLeft: 15,
                  paddingTop: Platform.OS == 'ios' ? 15 : 20,
                }}
              >
                <BackButton resizeMode="contain" source={backIcon} />
              </TouchableOpacity>
            </HeaderContainer>
          )}
          <View style={style.subConstainer}>
            <FlatList
              numColumns={2}
              data={googleDriveData}
              renderItem={googleRenderItem}
            />
          </View>
        </CustomView>
      </Modal>
    </SafeAreaView>
  );
};

export default CreateProfile;
