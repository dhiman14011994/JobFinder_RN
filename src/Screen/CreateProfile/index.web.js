/* eslint-disable react-native/no-inline-styles */
import {
  useWindowDimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  View,
  Image,
  Text,
  CheckBox,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  ButtonContainer,
  CustomText,
  CustomView,
  ContainerView,
} from '../../Component/CustomComponent';
import Strings from '../../Resources/Strings';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
import CustomInputText from '../../Component/CustomInputText';
import LeftImage from '../../Resources/assets/leftImage.png';
import CustomImageSelector from '../../Component/CustomImageSelector';
import CustomModal from '../../Component/CustomModal/CustomModal';
import DownArrow from '../../Resources/assets/downArrow.png';
import CustomButton from '../../Component/CustomButton';
import CustomWebButton from '../../Component/CustomWebButton';
import GoogleDriveIcon from '../../Resources/assets/googleDriveIcon.png';
import DropBoxIcon from '../../Resources/assets/dropboxIcon.png';
import LocalFileIcon from '../../Resources/assets/localFile.png';
import { useDropzone } from 'react-dropzone';
import { imageUplaod } from '../../Redux/services/profileService';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoading, signUp } from '../../Redux/actions/authAction';
import { GoogleClientID, isNative } from '../../Util';
import EndPoint from '../../Redux/constants/EndPoint';
import { RouteName } from '../../Navigation/routeName';
import DatePicker from 'sassy-datepicker';
import moment from 'moment';
import PdfIcon from '../../Resources/assets/PdfIcon.png';
import toast from 'react-simple-toasts';
import { TouchableOpacity } from 'react-native-web';
import {
  containsOnlyEmail,
  containsOnlyPhone,
  containsOnlyStrings,
} from '../../Util/validation';
import CustomHeader from '../../Component/CustomHeader';
import ImagePickerModal from '../../Component/Picker/index.web';
import Type from '../../Constants/Type/type';
import CameraModal from '../HomeWeb/Camera/Modal/index.web';
import { useRef } from 'react';
import AXPicker from 'react-month-picker';
import useDrivePicker from 'react-google-drive-picker';

import MonthBox from '../../Component/MonthPicker/index.web';
import './monthPicker.css';

var selectItem = '';

const CreateProfile = ({ navigation, route }) => {
  const window = useWindowDimensions();
  var newDate = new Date();
  const userData = useSelector((state) =>
    state.auth.registerData
      ? state.auth.registerData
      : state.auth.loginData
      ? state.auth.loginData
      : state.auth.socialLoginData
      ? state.auth.socialLoginData
      : state.auth.userData
  );
  const dispatch = useDispatch();
  const selectUser = userData.data.role
    ? userData.data.role
    : Strings.PROFESSIONAL;
  const userType = useSelector((state) => state.auth.userType);
  const [email, setEmail] = useState(userData?.data?.email);
  const [about, setAbout] = useState('');
  const [isPresent, setPresent] = useState(false);
  const [name, setName] = useState(userData?.data?.name);
  const MobileNumber = userData?.data?.country_code
    ? userData?.data?.phone_number
      ? `${userData?.data?.country_code} ${userData?.data?.phone_number}`
      : userData?.data?.phone_number
    : userData?.data?.country_code;
  const [phone, setPhone] = useState(MobileNumber ? MobileNumber : '');
  const [experience, setExperience] = useState('');
  const [isModal, setModal] = useState(false);
  const [isPicker, setPicker] = useState(false);
  const [userImage, setuserImage] = useState('');
  const [startdate, setStartDate] = useState('');
  const [enddate, setEndDate] = useState('');
  const [newStartdate, setNewStartDate] = useState(newDate);
  const [newEndDate, setNewEndDate] = useState(newDate);
  const [open, setOpen] = useState(false);
  const [isStartDate, setIsStartDate] = useState(true);
  const [id, setID] = useState(0);
  const [value, SetValue] = useState(new Date());
  const [isLocal, setIsLocal] = useState(false);
  const [localeFile, setLocaleFile] = useState('');
  const [localeFileName, setLocaleFileName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [aboutCompany, setAboutCompany] = useState('');
  const [isImageModal, setImageModal] = useState(false);
  const [isCamera, setCamera] = useState(false);
  var startRef = useRef([]);
  var endRef = useRef([]);
  const [singleValue, setSingleValue] = useState({
    year: parseInt(moment(new Date()).format('YYYY')),
    month: parseInt(moment(new Date()).format('MM')),
  });
  const [openPicker, data, authResponse] = useDrivePicker();

  const [experienceData, setExperienceData] = useState({
    allExperience: [
      {
        id: 0,
        your_role: '',
        start_date: '',
        end_date: '',
        your_experience: '',
        is_currently_working: false,
      },
    ],
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

  useEffect(() => {
    if (data) {
      console.log('data>>>', data);
    }
  }, [data]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept:
      selectItem == 'pdf'
        ? { 'text/pdf': ['.pdf'] }
        : {
            'image/jpeg': ['.jpeg', '.png'],
          },
    onDrop: async (acceptedFiles) => {
      try {
        let imageFile = await acceptedFiles.map((file) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        });

        uploadImageData(imageFile[0]);
      } catch (err) {
        dispatch(setLoading(false));
        selectItem = '';
      }
    },
  });

  const uploadImageData = async (data) => {
    dispatch(setLoading(true));
    var getImageURI = await imageUplaod({
      file: data,
      token: userData?.access_token,
    });
    setLocaleFileName(getImageURI?.fileName);
    if (selectItem == 'pdf') {
      selectItem = '';
      dispatch(setLoading(false));
      setLocaleFile(getImageURI.data[0]);
    } else {
      selectItem = '';
      dispatch(setLoading(false));
      setuserImage(getImageURI.data[0]);
    }
  };

  const handleDrivePicker = () => {
    openPicker({
      clientId:
        '764328256526-rbl75562nkq0hcao62o6q66mmj1vq8j5.apps.googleusercontent.com',
      developerKey: 'AIzaSyBcdY9NwB5DS5wMP58WReGKINRgCh_uVwQ',
      viewId: 'DOCS',
      // token: "ya29.a0AVvZVspwEFp8ob9cfXQIaJyjrhyGpmHikqAutQd_PuQqmgsyCuOMkpGqcurWipMMe0uZubDZnCQptbOUoUnQ3CIIuOXzadq3coknydYbt7jSiL6GOHI3NRJX_97Qsd-as56qhNmh-cNcdHGafq0DtIC2FB9naCgYKAQISARESFQGbdwaINs5I_e0mNQ7ibluzbRhdaA0163",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: false,
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button');
        }
      },
    });
  };

  const addNewData = () => {
    var index = experienceData.allExperience.length - 1;
    if (experienceData.allExperience[index].your_role == '') {
      toast('Work experience field are empty');
    } else {
      let newData = {
        id: experienceData.allExperience.length,
        your_role: '',
        start_date: '',
        end_date: '',
        your_experience: '',
      };
      var updateData = experienceData.allExperience;
      updateData.push(newData);
      setExperienceData({ ...experienceData, allExperience: updateData });
    }
  };

  const addNewEducation = () => {
    var index = educationData.allEducations.length - 1;
    if (educationData.allEducations[index].school == '') {
      toast(Strings.EDUCATION_TYPE.EDUCATION_NAME_ERROR);
    } else if (educationData.allEducations[index].degree_title == '') {
      toast(Strings.EDUCATION_TYPE.DEGREE_TITLE_ERROR);
    } else if (educationData.allEducations[index].study == '') {
      toast(Strings.EDUCATION_TYPE.FIELD_OF_STUDY_ERROR);
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

  const updateValue = ({ index, text, key }) => {
    let updateItem = experienceData.allExperience.map((item, i) => {
      if (i == index) {
        if (key === 'your role') {
          if (containsOnlyStrings(text)) {
            return { ...item, your_role: text };
          }
          if (text == '') {
            return { ...item, your_role: '' };
          }
        } else if (key === 'your experience') {
          return { ...item, your_experience: text };
        } else if (key === 'currently working') {
          return { ...item, is_currently_working: !isPresent };
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

  const getYear = () => {
    var currentYear = new Date().getFullYear();
    var years = [];
    var startYear = 1960;
    for (var i = startYear; i <= currentYear; i++) {
      years.push(startYear++);
    }
    return years;
  };

  const convertDateToObject = (date) => {
    return {
      year: parseInt(moment(date).format('YYYY')),
      month: parseInt(moment(date).format('MM')),
    };
  };

  const pickerLang = {
    months: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    from: 'From',
    to: 'To',
  };

  const makeText = (m) => {
    if (m && m.year && m.month)
      return pickerLang.months[m.month - 1] + ', ' + m.year;
    return '?';
  };

  const getMonthPickerValue = (date) => {
    return date == ''
      ? makeText(singleValue)
      : isValidDate(date)
      ? moment(date).format('MMM, yyyy')
      : date;
  };

  function isValidDate(date) {
    return (
      date &&
      Object.prototype.toString.call(date) === '[object Date]' &&
      !isNaN(date)
    );
  }

  const isDateAfter = (date1, date2) => {
    var firstDate = new Date(`1 ${date1}`);
    var secondDate = isValidDate(date2)
      ? new Date(date2)
      : new Date(`1 ${date2}`);
    if (firstDate < secondDate) {
      return false;
    } else {
      return true;
    }
  };

  const onValidation = () => {
    var isValid = true;
    var educationLastIndex = educationData?.allEducations.length - 1;
    if (selectUser == Strings.PROFESSIONAL) {
      if (
        educationData?.allEducations[educationLastIndex]?.school.length == 0
      ) {
        isValid = false;
        toast(Strings.EDUCATION_TYPE.EMPTY_EDUCATION);
      } else if (
        educationData?.allEducations[educationLastIndex]?.degree_title.length ==
        0
      ) {
        isValid = false;
        toast(Strings.EDUCATION_TYPE.EMPTY_DEGREE);
      } else if (
        educationData?.allEducations[educationLastIndex]?.study.length == 0
      ) {
        isValid = false;
        toast(Strings.EDUCATION_TYPE.EMPTY_STUDY);
      }
    }
    return isValid;
  };

  const createUserProfile = async () => {
    if (!onValidation()) {
      return;
    }
    const CreateData = await AsyncStorage.getItem(Strings.CREATE_PROFILE_DATA);
    const IS_Social = AsyncStorage.getItem(Strings.IS_SOCIAL);
    const setSocial =
      route?.params === undefined
        ? IS_Social === 'true'
          ? true
          : false
        : route?.params?.isSocial;
    const data = JSON.parse(CreateData);
    const workExperienceData = experienceData.allExperience.filter(
      (item) => item.your_role !== ''
    );
    const form =
      userData?.data?.role || userType || selectUser == Strings.PROFESSIONAL
        ? setSocial
          ? {
              education_info: educationData?.allEducations,
              name: name,
              email: email.trim().toLowerCase(),
              role: userData?.data?.role || userType || selectUser,
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
            }
          : {
              education_info: educationData?.allEducations,
              name: name,
              email: email.trim().toLowerCase(),
              role: userData?.data?.role || userType || selectUser,
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
            }
        : route?.isSocial
        ? {
            name: name,
            email: email.trim().toLowerCase(),
            role: userData?.data?.role || userType || selectUser,
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
            role: userData?.data?.role || userType || selectUser,
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

    dispatch(
      signUp({
        form,
        onSuccess: (result) => {
          AsyncStorage.setItem(Strings.ACCESS_TOKEN_KEY, result.access_token);
          AsyncStorage.setItem(Strings.LOGIN_DATA, JSON.stringify(result));
          AsyncStorage.setItem(Strings.IS_CREATE_PROFILE, 'true');
          navigation.reset({
            index: 0,
            routes: [{ name: RouteName.HOMESTACK }],
          });
        },
        onError: (error) => {
          dispatch(setLoading(false));
          console.log('error sign up', JSON.stringify(error));
        },
      })
    );
  };

  return (
    <>
      <CustomHeader
        window={window}
        isCreateProfile={true}
        activeTab={''}
        isProfile={true}
        backPress={() => navigation.goBack()}
      />
      <View
        style={{
          backgroundColor: Colors.White,
          marginTop: window.height * 0.01,
          borderTopLeftRadius: window.height * 0.02,
          borderTopRightRadius: window.height * 0.02,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <CustomView
            width={window.width * 0.9}
            marginLeft={window.width * 0.05}
            marginRight={window.width * 0.05}
            marginTop={window.height * 0.05}
            height={window.height * 0.95}
          >
            <CustomText
              marginBottom={window.height * 0.05}
              textAlign={'left'}
              style={{ width: window.width * 0.9 }}
              fontSize={fontResize(30)}
              fontFamily={'Gilroy-Bold'}
            >
              {Strings.CREATE_WEB_PROFILE}
            </CustomText>
            <ScrollView
              bounces={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{ width: '100%' }}
            >
              <CustomInputText
                width={window.width * 0.2}
                marginBottom={window.height * 0.02}
                label={Strings.USER_TYPE}
                editable={false}
                disabled
                isRightButton
                placeholder={`I’m a ${
                  userData?.data?.role || userType || selectUser
                }`}
                rightButtonImage={DownArrow}
                window={window}
              />
              <ContainerView
                marginTop={window.height * 0.05}
                marginBottom={window.height * 0.05}
                flexDirection={'row'}
                alignItems={'center'}
              >
                <CustomText
                  style={{ width: window.width * 0.09 }}
                  fontSize={fontResize(18)}
                  fontFamily={'Gilroy-Bold'}
                  textColor={Colors.EerieBlack}
                >
                  {Strings.BASIC_INFO}
                </CustomText>
                <CustomView
                  width={'92%'}
                  height={'1px'}
                  bgColor={Colors.PrimaryGray}
                />
              </ContainerView>
              <CustomView
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'flex-start'}
                width={'100%'}
                height={window.height * 0.305}
              >
                {selectUser == Strings.PROFESSIONAL && (
                  <TouchableOpacity
                    onPress={() => {
                      setPicker(true);
                    }}
                  >
                    <CustomImageSelector
                      disabled={true}
                      isWeb={true}
                      AttachText={Strings.ATTACH_YOUR_PHOTO}
                      label={Strings.USER_PROFILE_IMAGE}
                      width={window.width * 0.2}
                      imagePath={
                        userImage == ''
                          ? userImage
                          : `${EndPoint.baseAssestURL}${userImage}`
                      }
                      window={window}
                    />
                  </TouchableOpacity>
                )}
                <CustomView
                  height={window.height * 0.4}
                  width={window.width * 0.2}
                >
                  <CustomInputText
                    marginBottom={window.height * 0.06}
                    label={Strings.NAME}
                    onChangeText={(text) => {
                      if (containsOnlyStrings(text)) {
                        setName(text);
                      }
                      if (text == '') {
                        setName('text');
                      }
                    }}
                    value={name}
                    placeholder={'Abc'}
                    width={window.width * 0.2}
                    window={window}
                  />

                  <CustomInputText
                    label={Strings.PHONE}
                    onChangeText={(text) => {
                      if (containsOnlyPhone(text)) {
                        setPhone(text);
                      }
                      if (text == '') {
                        setPhone('text');
                      }
                    }}
                    value={`+${phone}`}
                    editable={false}
                    placeholder={'+911234567890'}
                    width={window.width * 0.2}
                    window={window}
                  />
                </CustomView>
                <CustomInputText
                  editable={false}
                  label={Strings.EMAIL}
                  marginBottom={window.height * 0.02}
                  onChangeText={(text) => {
                    if (containsOnlyEmail(text)) {
                      setEmail(text);
                    }
                    if (text == '') {
                      setEmail('');
                    }
                  }}
                  value={email}
                  placeholder={'abc@gmail.com'}
                  width={window.width * 0.2}
                  window={window}
                />
              </CustomView>

              {selectUser == Strings.PROFESSIONAL && (
                <>
                  <CustomInputText
                    marginTop={window.width * 0.05}
                    label={Strings.ABOUT_ME}
                    width={window.width * 0.5}
                    inputStyle={{ height: '95%' }}
                    isDetails={true}
                    onChangeText={(text) => {
                      if (containsOnlyStrings(text)) {
                        setAbout(text);
                      }
                      if (text == '') {
                        setAbout('');
                      }
                    }}
                    value={about}
                    window={window}
                  />

                  <ContainerView
                    marginTop={window.height * 0.1}
                    marginBottom={window.height * 0.05}
                    flexDirection={'row'}
                    alignItems={'center'}
                  >
                    <CustomText
                      style={{ width: '7%' }}
                      fontSize={fontResize(18)}
                      fontFamily={'Gilroy-Bold'}
                      textColor={Colors.EerieBlack}
                    >
                      {Strings.EDUCATION}
                    </CustomText>
                    <CustomView
                      width={'90%'}
                      height={'1px'}
                      bgColor={Colors.PrimaryGray}
                    />
                  </ContainerView>

                  {educationData.allEducations.map((item, index) => (
                    <>
                      <CustomView
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        alignItems={'flex-start'}
                        width={'100%'}
                        height={window.height * 0.15}
                      >
                        <CustomInputText
                          width={window.width * 0.2}
                          label={Strings.EDUCATION_TYPE.EDUCATION_NAME}
                          onChangeText={(text) => {
                            updateEducation({
                              index,
                              text,
                              key: Type.EDUCATION.EDUCATION_NAME,
                            });
                          }}
                          errorMessage={''}
                          value={data?.school}
                          window={window}
                        />

                        <CustomInputText
                          width={window.width * 0.2}
                          label={Strings.EDUCATION_TYPE.DEGREE_TITLE}
                          onChangeText={(text) => {
                            updateEducation({
                              index,
                              text,
                              key: Type.EDUCATION.DEGREE,
                            });
                          }}
                          errorMessage={''}
                          value={data?.degree_title}
                          window={window}
                        />

                        <CustomInputText
                          width={window.width * 0.2}
                          label={Strings.EDUCATION_TYPE.FIELD_OF_STUDY}
                          onChangeText={(text) => {
                            updateEducation({
                              index,
                              text,
                              key: Type.EDUCATION.FIELD_OF_STUDY,
                            });
                          }}
                          errorMessage={''}
                          value={data?.study}
                          window={window}
                        />
                      </CustomView>

                      {index != 0 && (
                        <CustomButton
                          onPress={() => {
                            removeEducation({ index });
                          }}
                          width={window.width * 0.09}
                          height={'50px'}
                          backgroundColor={Colors.PrimaryLightGray}
                          borderRadius={'10px'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          fontSize={'18px'}
                          textColor={Colors.Blueberry}
                          text={Strings.CANCEL}
                          borderWidth={1}
                          borderColor={Colors.Blueberry}
                          alignSelf={'flex-start'}
                          buttonContainer={{
                            shadowColor: Colors.Blueberry,
                            shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 0.2,
                            elevation: 5,
                            marginBottom: window.height * 0.08,
                          }}
                        />
                      )}

                      {educationData.allEducations.length - 1 != index && (
                        <CustomView
                          width={window.width * 0.98}
                          height={'1px'}
                          bgColor={Colors.PrimaryGray}
                          marginLeft={window.width * 0.01}
                          marginBottom={window.height * 0.08}
                          marginTop={window.height * 0.06}
                        />
                      )}
                    </>
                  ))}

                  {selectUser == Strings.PROFESSIONAL && (
                    <>
                      <CustomButton
                        onPress={() => {
                          addNewEducation();
                        }}
                        width={window.width * 0.09}
                        height={'50px'}
                        backgroundColor={Colors.PrimaryLightGray}
                        borderRadius={'10px'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        fontSize={'18px'}
                        textColor={Colors.Blueberry}
                        text={Strings.ADD_NEW}
                        borderWidth={1}
                        borderColor={Colors.Blueberry}
                        alignSelf={'flex-start'}
                        buttonContainer={{
                          shadowColor: Colors.Blueberry,
                          shadowOffset: { width: 0, height: 5 },
                          shadowOpacity: 0.2,
                          elevation: 5,
                          marginBottom: window.height * 0.08,
                        }}
                      />
                    </>
                  )}
                </>
              )}
              <ContainerView
                marginTop={window.height * 0.1}
                marginBottom={window.height * 0.05}
                flexDirection={'row'}
                alignItems={'center'}
              >
                <CustomText
                  style={{ width: window.width * 0.1 }}
                  fontSize={fontResize(18)}
                  fontFamily={'Gilroy-Bold'}
                  textColor={Colors.EerieBlack}
                >
                  {selectUser == Strings.PROFESSIONAL
                    ? Strings.WORK_EXPERIENCE
                    : Strings.COMPANY_INFO}
                </CustomText>
                <CustomView
                  width={'87%'}
                  height={'1px'}
                  bgColor={Colors.PrimaryGray}
                />
              </ContainerView>

              {selectUser == Strings.PROFESSIONAL && (
                <>
                  <CustomText
                    fontFamily={'Gilroy-Medium'}
                    fontSize={'18px'}
                    marginTop={window.height * 0.02}
                  >
                    {Strings.LINK_WITH_RESUME}
                  </CustomText>
                  <ContainerView
                    marginTop={window.height * 0.06}
                    marginBottom={window.height * 0.1}
                    bgColor={'red'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <CustomButton
                      onPress={() => {
                        handleDrivePicker();
                      }}
                      width={window.width * 0.2}
                      height={'50px'}
                      backgroundColor={Colors.PrimaryLightGray}
                      borderRadius={'10px'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      fontFamily={'Gilroy-SemiBold'}
                      fontSize={'18px'}
                      textColor={Colors.Blueberry}
                      text={Strings.GOOGLE_DRIVE}
                      buttonImage={GoogleDriveIcon}
                      borderWidth={1}
                      borderColor={Colors.SilverLight}
                    />
                    <CustomButton
                      onPress={() => {}}
                      width={window.width * 0.2}
                      height={'50px'}
                      backgroundColor={Colors.PrimaryLightGray}
                      borderRadius={'10px'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      fontFamily={'Gilroy-SemiBold'}
                      fontSize={'18px'}
                      textColor={Colors.Blueberry}
                      text={Strings.DROPBOX}
                      buttonImage={DropBoxIcon}
                      borderWidth={1}
                      borderColor={Colors.SilverLight}
                    />
                    <div
                      {...getRootProps({
                        className: 'dropzone',
                        onClick: (event) => {
                          setIsLocal(true);
                          selectItem = 'pdf';
                        },
                      })}
                    >
                      <input {...getInputProps()} />

                      <CustomWebButton
                        width={window.width * 0.2}
                        height={'50px'}
                        backgroundColor={Colors.PrimaryLightGray}
                        borderRadius={'10px'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        fontFamily={'Gilroy-SemiBold'}
                        fontSize={'18px'}
                        textColor={Colors.Blueberry}
                        text={Strings.LOCALFILE}
                        buttonImage={LocalFileIcon}
                        borderWidth={1}
                        borderColor={Colors.SilverLight}
                      />
                    </div>
                  </ContainerView>
                  {localeFile !== '' && (
                    <View
                      style={{
                        width: '90%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 20,
                        marginBottom: 20,
                      }}
                    >
                      <Image
                        resizeMode="contain"
                        style={{ width: 40, height: 40 }}
                        source={PdfIcon}
                      />
                      <Text
                        style={{
                          fontFamily: 'Gilroy-Bold',
                          fontSize: fontResize(15),
                          marginLeft: 30,
                          color: Colors.Black,
                        }}
                      >
                        {localeFileName ? localeFileName : 'Resume.pdf'}
                      </Text>
                    </View>
                  )}
                  {experienceData.allExperience.map((item, index) => (
                    <>
                      <CustomView
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        alignItems={'flex-start'}
                        width={'100%'}
                        height={window.height * 0.15}
                      >
                        <CustomInputText
                          width={window.width * 0.2}
                          label={Strings.YOUR_ROLE}
                          onChangeText={(text) => {
                            updateValue({ index, text, key: 'your role' });
                          }}
                          errorMessage={''}
                          value={item.your_role}
                          window={window}
                        />

                        <AXPicker
                          ref={(refs) => (startRef.current[index] = refs)}
                          years={() => getYear()}
                          value={
                            item.start_date == ''
                              ? singleValue
                              : convertDateToObject(item.start_date)
                          }
                          lang={pickerLang.months}
                          onChange={(value, text) => {
                            var updateStartDate =
                              experienceData?.allExperience.map(
                                (item, indexId) => {
                                  if (index == indexId) {
                                    var selectedDate = makeText({
                                      year: value,
                                      month: text,
                                    });
                                    return {
                                      ...item,
                                      start_date: selectedDate,
                                    };
                                  }
                                  return item;
                                }
                              );
                            setExperienceData({
                              ...experienceData,
                              allExperience: updateStartDate,
                            });
                            startRef.current[index].dismiss();
                          }}
                        >
                          <MonthBox
                            value={getMonthPickerValue(item.start_date)}
                            title={Strings.START_DATE}
                            window={window}
                            onClick={() => {
                              startRef.current[index].show();
                            }}
                          />
                        </AXPicker>

                        <View
                          style={{
                            flexDirection: 'column',
                            marginRight: window.width * 0.01,
                          }}
                        >
                          <AXPicker
                            ref={(refs) => (endRef.current[index] = refs)}
                            years={() => getYear()}
                            value={
                              item.end_date == ''
                                ? singleValue
                                : convertDateToObject(item.end_date)
                            }
                            lang={pickerLang.months}
                            onChange={(value, text) => {
                              var updateStartDate =
                                experienceData?.allExperience.map(
                                  (item, indexId) => {
                                    if (index == indexId) {
                                      var selectedDate = makeText({
                                        year: value,
                                        month: text,
                                      });
                                      if (
                                        isDateAfter(
                                          makeText({
                                            year: value,
                                            month: text,
                                          }),
                                          item.start_date
                                        )
                                      ) {
                                        return {
                                          ...item,
                                          end_date: selectedDate,
                                          is_currently_working: false,
                                        };
                                      } else {
                                        return {
                                          ...item,
                                          start_date: selectedDate,
                                          end_date: selectedDate,
                                          is_currently_working: false,
                                        };
                                      }
                                    }
                                    return item;
                                  }
                                );
                              setExperienceData({
                                ...experienceData,
                                allExperience: updateStartDate,
                              });
                              endRef.current[index].dismiss();
                            }}
                          >
                            <MonthBox
                              value={
                                item.is_currently_working
                                  ? Strings.PRESENT
                                  : getMonthPickerValue(item.end_date)
                              }
                              title={Strings.END_DATE}
                              window={window}
                              onClick={() => {
                                if (!item.is_currently_working) {
                                  endRef.current[index].show();
                                }
                              }}
                            />
                          </AXPicker>

                          <View
                            style={{
                              flexDirection: 'row',
                              paddingVertical: '3%',
                              alignItems: 'center',
                              marginTop: '3%',
                              justifyContent: 'center',
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
                                setPresent(!isPresent);
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
                        </View>
                      </CustomView>
                      <CustomInputText
                        marginBottom={window.height * 0.02}
                        label={Strings.YOUR_EXPERIENCE}
                        width={window.width * 0.3}
                        isDetails={true}
                        onChangeText={(text) =>
                          updateValue({ index, text, key: 'your experience' })
                        }
                        value={item.your_experience}
                        window={window}
                      />

                      {experienceData.allExperience.length - 1 != index && (
                        <CustomView
                          width={window.width * 0.98}
                          height={'1px'}
                          bgColor={Colors.PrimaryGray}
                          marginLeft={window.width * 0.01}
                          marginBottom={window.height * 0.08}
                          marginTop={window.height * 0.06}
                        />
                      )}
                    </>
                  ))}
                </>
              )}
              {selectUser !== Strings.PROFESSIONAL && (
                <>
                  <CustomView
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'flex-start'}
                    width={'100%'}
                    marginTop={window.height * 0.05}
                    height={window.height * 0.125}
                  >
                    <CustomInputText
                      marginRight={window.width * 0.1}
                      width={window.width * 0.2}
                      label={Strings.COMPANY_NAME}
                      value={companyName}
                      onChangeText={(text) => {
                        if (containsOnlyStrings(text)) {
                          setCompanyName(text);
                        }
                        if (text == '') {
                          setCompanyName('');
                        }
                      }}
                      window={window}
                    />
                    <CustomInputText
                      marginRight={window.width * 0.1}
                      width={window.width * 0.2}
                      label={Strings.COMPANY_EMAIL}
                      value={companyEmail}
                      onChangeText={(text) => {
                        if (containsOnlyEmail(text)) {
                          setCompanyEmail(text);
                        }
                        if (text == '') {
                          setCompanyEmail('');
                        }
                      }}
                      window={window}
                    />
                    <CustomInputText
                      marginRight={window.width * 0.2}
                      width={window.width * 0.2}
                      label={Strings.COMPANY_PHONE}
                      value={companyPhone}
                      onChangeText={(text) => {
                        if (containsOnlyPhone(text)) {
                          setCompanyPhone(text);
                        }
                        if (text == '') {
                          setCompanyPhone('');
                        }
                      }}
                      window={window}
                    />
                  </CustomView>
                  <CustomView
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'flex-start'}
                    width={'62.5%'}
                    marginTop={window.height * 0.05}
                    height={window.height * 0.125}
                  >
                    <CustomInputText
                      width={window.width * 0.2}
                      label={Strings.BUSINESS_ADDRESS}
                      value={businessAddress}
                      onChangeText={(text) => {
                        if (containsOnlyStrings(text)) {
                          setBusinessAddress(text);
                        }
                        if (text == '') {
                          setBusinessAddress('');
                        }
                      }}
                      window={window}
                    />
                    <CustomInputText
                      width={window.width * 0.2}
                      label={Strings.BUSINESS_NUMBER}
                      onChangeText={(text) => {
                        setBusinessNumber(text);
                      }}
                      window={window}
                    />
                  </CustomView>
                  <CustomView
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'flex-start'}
                    width={'100%'}
                    marginTop={window.height * 0.05}
                    height={window.height * 0.4}
                  >
                    <CustomInputText
                      label={Strings.ABOUT_COMPANY}
                      width={window.width * 0.4}
                      inputStyle={{ height: '95%' }}
                      isDetails={true}
                      onChangeText={(text) => {
                        if (containsOnlyStrings(text)) {
                          setAboutCompany(text);
                        }
                        if (text == '') {
                          setAboutCompany('');
                        }
                      }}
                      value={aboutCompany}
                      window={window}
                    />

                    <TouchableOpacity
                      onPress={() => {
                        setPicker(true);
                      }}
                    >
                      <CustomImageSelector
                        width={window.width * 0.2}
                        AttachText={Strings.ATTACH_COMPANT_LOGO}
                        label={Strings.COMPANY_LOGO}
                        imagePress={() => {
                          setImageModal(true);
                        }}
                        imagePath={
                          userImage == ''
                            ? userImage
                            : `${EndPoint.baseAssestURL}${userImage}`
                        }
                        marginBottom={window.height * 0.02}
                        // disabled={true}
                        isWeb={true}
                        window={window}
                      />
                    </TouchableOpacity>
                  </CustomView>
                </>
              )}
              {selectUser == Strings.PROFESSIONAL && (
                <>
                  <CustomButton
                    onPress={() => {
                      addNewData();
                    }}
                    width={window.width * 0.09}
                    height={'50px'}
                    backgroundColor={Colors.PrimaryLightGray}
                    borderRadius={'10px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    fontSize={'18px'}
                    textColor={Colors.Blueberry}
                    text={Strings.ADD_NEW}
                    borderWidth={1}
                    borderColor={Colors.Blueberry}
                    alignSelf={'flex-start'}
                    buttonContainer={{
                      shadowColor: Colors.Blueberry,
                      shadowOffset: { width: 0, height: 5 },
                      shadowOpacity: 0.2,
                      elevation: 5,
                      marginBottom: window.height * 0.08,
                    }}
                  />
                </>
              )}

              <View
                style={{
                  width: window.width * 0.2,
                  height: '50px',
                  shadowRadius: 10,
                  marginTop: window.height * 0.03,
                  marginBottom: window.height * 0.3,
                  shadowOpacity: 3,
                  borderRadius: '10px',
                  shadowColor: Colors.Blueberry,
                }}
              >
                <CustomButton
                  onPress={() => {
                    createUserProfile();
                  }}
                  width={window.width * 0.2}
                  height={'50px'}
                  backgroundColor={Colors.Blueberry}
                  borderRadius={'10px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  fontFamily={'Gilroy-SemiBold'}
                  fontSize={'18px'}
                  textColor={Colors.White}
                  alignSelf={'flex-start'}
                  text={
                    selectUser == Strings.PROFESSIONAL
                      ? Strings.CREATE_USER_PROFILE
                      : Strings.CREATE_COMPANY_PROFILE
                  }
                />
              </View>
            </ScrollView>
            <Modal
              visible={isImageModal}
              style={{ flex: 1, width: window.width, height: window.height }}
              onRequestClose={() => setImageModal(false)}
              transparent={true}
              animationType={'fade'}
            >
              <CustomView
                height={window.height}
                width={window.width}
                alignItems={'center'}
                justifyContent={'center'}
                bgColor={'rgba(0, 0, 0, 0.8)'}
              >
                <View
                  style={{
                    width: '90%',
                    marginHorizontal: '5%',
                    backgroundColor: Colors.White,
                    padding: '5%',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CustomText fontSize={20} marginBottom={20}>
                    {'Select Image'}
                  </CustomText>
                  <ButtonContainer
                    onPress={() => {
                      setImageModal(false);
                      // selectImage('camera');
                    }}
                    alignItems="flex-start"
                    justifyContent="flex-start"
                    width={'90%'}
                    marginTop={10}
                  >
                    <CustomText fontFamily="Gilroy-Medium" fontSize={20}>
                      Take Photo...
                    </CustomText>
                  </ButtonContainer>
                  <div
                    {...getRootProps({
                      className: 'dropzone',
                      onClick: (event) => {
                        setImageModal(false);
                      },
                    })}
                  >
                    <input {...getInputProps()} />
                    <ButtonContainer
                      marginTop={10}
                      alignItems="flex-start"
                      justifyContent="flex-start"
                      width={'90%'}
                      disabled={true}
                      onPress={() => {
                        // selectImage('gallery');
                      }}
                    >
                      <CustomText fontFamily="Gilroy-Medium" fontSize={20}>
                        Choose from Gallery...
                      </CustomText>
                    </ButtonContainer>
                  </div>

                  <ButtonContainer
                    onPress={() => setImageModal(false)}
                    marginTop={30}
                    width={'20%'}
                    alignSelf={'flex-end'}
                  >
                    <CustomText fontSize={15}>Cancel</CustomText>
                  </ButtonContainer>
                </View>
              </CustomView>
            </Modal>
          </CustomView>
        </KeyboardAvoidingView>
        <Modal
          visible={open}
          style={{ width: window.width, height: window.height }}
          onRequestClose={() => setOpen(false)}
          transparent={true}
          animationType={'fade'}
        >
          <View
            style={{
              width: window.width,
              height: window.height,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <DatePicker
              dateFormat="MMMM yyyy"
              value={
                isStartDate
                  ? experienceData.allExperience[id].start_date == ''
                    ? startdate
                    : experienceData.allExperience[id].start_date
                  : experienceData.allExperience[id].end_date == ''
                  ? enddate
                  : experienceData.allExperience[id].end_date
              }
              minDate={
                !isStartDate
                  ? experienceData.allExperience[id].start_date
                  : new Date('1950-01-01')
              }
              maxDate={new Date('2123-02-25')}
              onChange={(date) => {
                setOpen(false);
                if (isStartDate) {
                  setNewStartDate(date);
                  setStartDate(moment(date).format('L'));

                  var updateStartDate = experienceData.allExperience.map(
                    (item, index) => {
                      if (item.id == id) {
                        if (date > newEndDate) {
                          setNewEndDate(date);
                          setEndDate(moment(date).format('L'));
                          return { ...item, start_date: date, end_date: date };
                        } else {
                          return { ...item, start_date: date };
                        }
                      }
                      return item;
                    }
                  );
                  setExperienceData({
                    ...experienceData,
                    allExperience: updateStartDate,
                  });
                } else {
                  setNewEndDate(date);
                  setEndDate(moment(date).format('L'));
                  var updateEndDate = experienceData.allExperience.map(
                    (item, index) => {
                      if (item.id == id) {
                        if (date < newStartdate) {
                          setNewStartDate(date);
                          setStartDate(moment(date).format('L'));
                          return {
                            ...item,
                            start_date: date,
                            end_date: date,
                            is_currently_working: false,
                          };
                        } else {
                          return {
                            ...item,
                            end_date: date,
                            is_currently_working: false,
                          };
                        }
                      }
                      return item;
                    }
                  );
                  setExperienceData({
                    ...experienceData,
                    allExperience: updateEndDate,
                  });
                }
              }}
            />
          </View>
        </Modal>

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
                setuserImage(value);
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
              setIsLocal(false);
              selectItem = 'image';
              uploadImageData(value);
            }}
          />
        )}
      </View>
    </>
  );
};

export default CreateProfile;
