/* eslint-disable react-native/no-inline-styles */
/* eslint-disable handle-callback-err */
import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  ImageBackground,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../Component/Header/Header';
import {
  RED_DELETE_ICON,
  backIcon,
  googleDoc_Icon,
} from '../../../Resources/assets';
import Strings from '../../../Resources/Strings';
import {
  ContainerView,
  CustomText,
  CustomView,
  Image,
} from '../../../Component/CustomComponent';
import Colors from '../../../Resources/Colors';
import { fontResize } from '../../../Util/font';
import CustomImageSelector from '../../../Component/CustomImageSelector';
import EndPoint from '../../../Redux/constants/EndPoint';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../../../Component/CustomModal/CustomModal';
import {
  requestCameraPermission,
  requestExternalWritePermission,
} from '../../../Constants/Permissions';
import { setLoading } from '../../../Redux/actions/authAction';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { imageUplaod } from '../../../Redux/services/profileService';
import Calender from '../../../Resources/assets/Calender.png';
import {
  BackgroundImg,
  UploadIcon,
  EditBlack,
} from '../../../Resources/assets/ProfileAssets';
import CustomInputText from '../../../Component/CustomInputText';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import DocumentPicker, { types } from 'react-native-document-picker';
import { isNative, mxWidth } from '../../../Util';
import CustomButton from '../../../Component/CustomButton';
import LocalFileIcon from '../../../Resources/assets/localFile.png';
import { style } from './style';
import { useNavigation } from '@react-navigation/native';
import {
  deleteEducationData,
  deleteWorkInfoData,
  fetchMyProfile,
  updateMyProfile,
} from '../../../Redux/actions/profileAction';
import Toast from 'react-native-simple-toast';
import CheckBox from '@react-native-community/checkbox';
import MonthPicker, {
  ACTION_DATE_SET,
  ACTION_DISMISSED,
  ACTION_NEUTRAL,
} from 'react-native-month-year-picker';
import Type from '../../../Constants/Type/type';
import { useRef } from 'react';
import CustomEducationInputView from '../../../Component/CustomEducationInputView';
import Emitter from '../../../Util/eventEmitter';

const EditProfile = () => {
  var inputRef = useRef(null);
  const window = useWindowDimensions();
  const navigation = useNavigation();
  const userData = useSelector((state) => state.auth.userData);
  const userInfo = useSelector((state) => state?.profile?.myProfile);
  const [userImage, setuserImage] = useState('');
  const [show, setShow] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [name, setName] = useState(userInfo?.name);
  const [phone, setPhone] = useState(
    userInfo?.phone_number ? userInfo?.phone_number : ''
  );
  const [email, setEmail] = useState(userInfo?.email);
  const [about, setAbout] = useState(userInfo?.about_me);
  const [userBackground, setUserBackground] = useState('');
  const [isBackground, setBackground] = useState(false);
  const selectUser = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;
  const dispatch = useDispatch();
  const [isModal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [isStartDate, setIsStartDate] = useState(true);
  const [startdate, setStartDate] = useState(new Date());
  const [id, setID] = useState(0);
  const [certificateId, setCertificateId] = useState(0);
  const [isCertificate, setIsCertificate] = useState(false);
  const [isCertificateDate, setIsCertificateDate] = useState(false);
  const [localeFile, setLocaleFile] = useState(userInfo?.link_your_resume);
  const [resumeType, setResumeType] = useState(userInfo?.resume_type || '');
  const [resumeName, setResumeName] = useState(userInfo?.resume_name || '');

  const scheme = useColorScheme();

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
  const [certificateData, setCertificateData] = useState({
    allCertificate: [
      {
        id: 0,
        title: '',
        company_name: '',
        start_date: '',
        end_date: '',
        certificate_image: '',
      },
    ],
  });

  useEffect(() => {
    if (selectUser == Strings.PROFESSIONAL) {
      // set work experience professional user
      if (userInfo?.work_info?.length != 0) {
        var updateExp = userInfo?.work_info?.map((item, index) => {
          var startD = moment(item?.start_date, 'YYYY-MM-DD');
          var endD = moment(item?.end_date, 'YYYY-MM-DD');
          let cureentData = {
            id: item?._id ? item?._id : index,
            company_name: item?.company_name ? item?.company_name : '',
            your_role: item?.your_role ? item?.your_role : '',
            start_date: item?.start_date ? new Date(startD) : '',
            end_date: item?.end_date ? new Date(endD) : '',
            your_experience: item?.your_experience ? item?.your_experience : '',
            is_currently_working: item?.is_currently_working
              ? item?.is_currently_working
              : false,
          };
          return cureentData;
        });
        setExperienceData({ ...experienceData, allExperience: updateExp });
      }

      if (userInfo?.education_info && userInfo?.education_info?.length != 0) {
        var updateEducation = userInfo?.education_info?.map((item, index) => {
          let cureentData = {
            id: item?._id ? item?._id : '',
            school: item?.school ? item?.school : '',
            degree_title: item?.degree_title ? item?.degree_title : '',
            study: item?.study ? item?.study : '',
          };
          return cureentData;
        });
        setEducationData({ ...educationData, allEducations: updateEducation });
      }

      if (userInfo?.certificates && userInfo?.certificates?.length != 0) {
        var updateCertificate = userInfo?.certificates?.map((item, index) => {
          var startD = moment(item?.start_date, 'YYYY-MM-DD');
          var endD = moment(item?.end_date, 'YYYY-MM-DD');
          let cureentData = {
            id: item?._id ? item?._id : index,
            title: item?.title ? item?.title : '',
            company_name: item?.company_name ? item?.company_name : '',
            start_date: item?.start_date ? new Date(startD) : '',
            end_date: item?.end_date ? new Date(endD) : '',
            certificate_image: item?.certificate_image
              ? item?.certificate_image
              : '',
          };
          return cureentData;
        });
        setCertificateData({
          ...certificateData,
          allCertificate: updateCertificate,
        });
      }
    }
  }, []);

  // Select user image local
  const selectImage = async (type) => {
    try {
      dispatch(setLoading(true));
      let options = {
        // maxWidth: 1000,
        // maxHeight: 1000,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        // quality: 0.1,
      };

      // if (isCameraPermitted && isStoragePermitted) {
      if (type === 'camera') {
        launchCamera(options, async (res) => {
          if (res?.assets && res?.assets[0]) {
            setModal(false);
            uploadFetchFile(res);
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
            uploadFetchFile(response);
          }
          setModal(false);
          dispatch(setLoading(false));
        }).catch((err) => {
          setModal(false);
          dispatch(setLoading(false));
        });
      }
      // } else {
      //   setModal(false);
      //   dispatch(setLoading(false));
      // }
    } catch (error) {
      setModal(false);
      dispatch(setLoading(false));
    }
  };

  const uploadFetchFile = async (res) => {
    try{
    const fileSize = Number(res?.assets[0]?.fileSize) / 1000000;
    if (fileSize < 20) {
      let imageData = {
        uri: res.assets[0].uri,
        type: 'image/jpg',
        name: 'image.jpg',
      };
      var getImageURI = await imageUplaod({
        file: imageData,
        token: userData?.access_token,
      });
      dispatch(setLoading(false));
      if (isBackground) {
        setUserBackground(getImageURI.data[0]);
        setBackground(false);
      } else {
        setuserImage(getImageURI.data[0]);
      }
    } else {
      alert(Strings.FILE_SIZE_TEXT);
      setBackground(false);
      dispatch(setLoading(false));
    }
  }
  catch(err){
    dispatch(setLoading(false));
  }
  };

  // Fetch Certificate local
  const selectCertificate = async (type) => {
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

              uploadCertificate(res);
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
              uploadCertificate(response);
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

  // Upload Certificate server
  const uploadCertificate = async (response) => {
    try{
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
      let updateCertificate = certificateData?.allCertificate?.map((item) => {
        if (item.id === certificateId) {
          return { ...item, certificate_image: getImageURI.data[0] };
        }
        return item;
      });
      setCertificateData({
        ...certificateData,
        allCertificate: updateCertificate,
      });
      setIsCertificate(false);
    } else {
      alert(Strings.FILE_SIZE_TEXT);
      dispatch(setLoading(false));
      setIsCertificate(false);
    }
  }
  catch(err){
    dispatch(setLoading(false));
  }
  };

  const updateEducation = ({ index, text, key }) => {
    try{
    let updateItem = educationData?.allEducations?.map((item, i) => {
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
  }
  catch(err){
    dispatch(setLoading(false));
  }
  };

  // Update Experience Value
  const updateValue = ({ index, text, key }) => {
    let updateItem = experienceData?.allExperience?.map((item, i) => {
      if (i === index) {
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

  // Update certificate Value
  const updateCertificateValue = ({ index, text, key }) => {
    let updateItem = certificateData?.allCertificate?.map((item, i) => {
      if (i === index) {
        if (key === 'title') {
          return { ...item, title: text };
        } else if (key === 'company_name') {
          return { ...item, company_name: text };
        }
      }
      return item;
    });
    setCertificateData({ ...certificateData, allCertificate: updateItem });
  };

  // Add More Experience
  const addNewData = () => {
    try{
    var index = experienceData?.allExperience?.length - 1;
    if (experienceData?.allExperience[index]?.your_role == '') {
      Toast.show('Work experience field are empty');
    } else {
      let newData = {
        id: experienceData?.allExperience?.length,
        company_name: '',
        your_role: '',
        start_date: '',
        end_date: '',
        your_experience: '',
        is_currently_working: false,
      };
      var updateData = experienceData?.allExperience;
      updateData.push(newData);
      console.log('updated list', updateData);
      setExperienceData({ ...experienceData, allExperience: updateData });
    }
  }
  catch(err){
    dispatch(setLoading(false));
  }
  };

  const addNewEducation = () => {
    var index = educationData?.allEducations?.length - 1;
    if (educationData?.allEducations[index]?.school == '') {
      Toast.show(Strings.EDUCATION_TYPE.EDUCATION_NAME_ERROR);
    } else if (educationData?.allEducations[index]?.degree_title == '') {
      Toast.show(Strings.EDUCATION_TYPE.DEGREE_TITLE_ERROR);
    } else if (educationData?.allEducations[index]?.study == '') {
      Toast.show(Strings.EDUCATION_TYPE.FIELD_OF_STUDY_ERROR);
    } else {
      let newData = {
        id: '',
        school: '',
        degree_title: '',
        study: '',
      };
      var updateData = educationData?.allEducations;
      updateData.push(newData);
      setEducationData({ ...educationData, allEducations: updateData });
    }
  };

  const removeEducation = ({ index, id }) => {
    try{
    var updateData = educationData?.allEducations;
    updateData.splice(index, 1);
    console.log(updateData.length, educationData?.allEducations.length);
    setEducationData({ ...educationData, allEducations: updateData });
    const param = {
      user_id: userInfo._id,
      education_id: id,
    };
    if (id !== '') {
      dispatch(
        deleteEducationData({
          param,
          onSuccess: (result) => {
            dispatch(setLoading(false));
          },
          onError: (error) => {
            dispatch(setLoading(false));
            console.log('Something went wrong.Error', error);
          },
        })
      );
    }
  }
  catch(err){
    dispatch(setLoading(false));
  }
  };

  const removeWorkExperience = ({ index, id }) => {
    try{
    const param = {
      work_id: id,
    };
    if (id < 10000) {
      var updateData = experienceData.allExperience;
      updateData.splice(index, 1);
      setExperienceData({ ...experienceData, allExperience: updateData });
    } else {
      var updateData = experienceData.allExperience;
      updateData.splice(index, 1);
      setExperienceData({ ...experienceData, allExperience: updateData });
      dispatch(
        deleteWorkInfoData({
          param,
          onSuccess: (result) => {
            console.log('result>>>', JSON.stringify(result));
            dispatch(setLoading(false));
          },
          onError: (error) => {
            dispatch(setLoading(false));
            console.log('Something went wrong.Error', error);
          },
        })
      );
    }
  }
  catch(err){
    dispatch(setLoading(false));
  }
  };

  // Add More Certificate
  const addNewCertificate = () => {
    var indexs = certificateData.allCertificate.length - 1;
    if (certificateData.allCertificate[indexs].title == '') {
      Toast.show('Certificate field are empty');
    } else {
      let newData = {
        id: certificateData.allCertificate.length,
        title: '',
        company_name: '',
        start_date: '',
        end_date: '',
        certificate_image: '',
      };
      var updateData = certificateData.allCertificate;
      updateData.push(newData);
      setCertificateData({ ...certificateData, allCertificate: updateData });
    }
  };

  // Upload Cv
  const fetchLocalFile = () => {
    try {
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
            setResumeType(
              data[0].type == 'application/pdf'
                ? Strings.LOCAL_PDF
                : Strings.LOCAL
            );
            setResumeName(data[0]?.name);
            var getImageURI = await imageUplaod({
              file: imageData,
              token: userData?.access_token,
            });
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
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const onValidation = () => {
    var isValid = true;
    var educationLastIndex = educationData?.allEducations.length - 1;
    if (selectUser == Strings.PROFESSIONAL) {
      if (
        educationData?.allEducations[educationLastIndex]?.school == '' ||
        educationData?.allEducations[educationLastIndex]?.degree_title == '' ||
        educationData?.allEducations[educationLastIndex]?.study == ''
      ) {
        if (
          educationData?.allEducations[educationLastIndex]?.school == '' &&
          educationData?.allEducations[educationLastIndex]?.degree_title ==
            '' &&
          educationData?.allEducations[educationLastIndex]?.study == ''
        ) {
          isValid = true;
        } else {
          if (
            educationData?.allEducations[educationLastIndex]?.school.length == 0
          ) {
            isValid = false;
            Toast.show(Strings.EDUCATION_TYPE.EMPTY_EDUCATION);
          } else if (
            educationData?.allEducations[educationLastIndex]?.degree_title
              .length == 0
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
      }
    }
    return isValid;
  };

  const createUserProfile = () => {
    try {
      if (!onValidation()) {
        return;
      }
      const workExperienceData = experienceData?.allExperience.filter(
        (item) => item.your_role !== ''
      );
      const allCertificateData = certificateData?.allCertificate.filter(
        (item) => item.title !== ''
      );
      const alleducationData = educationData?.allEducations.filter(
        (item) => item.school !== ''
      );
      let data = {
        image: userImage == '' ? userInfo?.image : userImage,
        cover_photo:
          userBackground == '' ? userInfo?.cover_photo : userBackground,
        name: name,
        email: email,
        phone_number: userInfo?.phone_number,
        country_code: userInfo?.country_code,
        about_me: about,
        work_info: workExperienceData,
        certificate: allCertificateData,
        is_hide: false,
        link_your_resume: localeFile,
        resume_name: resumeName,
        resume_type: resumeType,
        education_info: alleducationData,
      };

      let id = userInfo?._id;

      dispatch(setLoading(true));
      dispatch(
        updateMyProfile({
          token,
          data,
          id,
          onSuccess: (result) => {
            if (result.code === 200) {
              console.log('result.message', result.message);
              Toast.show(result.message, Toast.LONG);
              dispatch(setLoading(false));
              Emitter.emit(Type.EMITTER.GET_PROFILE);

              dispatch(
                fetchMyProfile({
                  token,
                  onSuccess: (result) => {
                    navigation.goBack();
                    dispatch(setLoading(false));
                  },
                  onError: (error) => {
                    dispatch(setLoading(false));
                    console.log('Something went wrong.', error);
                  },
                })
              );
            }
            dispatch(setLoading(false));
          },
          onError: (error) => {
            dispatch(setLoading(false));
            console.log('Something went wrong.Error', error);
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const onValueChange = (event, newDate) => {
    switch (event) {
      case ACTION_DATE_SET:
        var updateEndDate = experienceData?.allExperience?.map(
          (item, index) => {
            if (index === id) {
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
          allExperience: updateEndDate,
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

  return (
    <SafeAreaView>
      <Header
        isLeftIcon={true}
        leftImage={backIcon}
        fontSize={fontResize(22)}
        leftButtonPress={() => {
          navigation.goBack();
        }}
        fontFamily={'Gilroy-Bold'}
        headerText={Strings.EDIT_YOUR_PROFILE}
        bgColor={'transparent'}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{ width: window.width }}
      >
        <ContainerView
          marginTop={window.height * 0.05}
          marginBottom={window.height * 0.05}
          width={'100%'}
          flexDirection={'row'}
          alignItems={'center'}
        >
          <CustomText
            fontSize={fontResize(18)}
            marginLeft={window.width * 0.05}
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
        <View
          style={{
            width: window.width * 0.9,
            marginHorizontal: window.width * 0.05,
          }}
        >
          <CustomImageSelector
            AttachText={Strings.UPLOAD_PHOTO}
            label={Strings.USER_PROFILE_IMAGE}
            isEdit={true}
            imagePress={() => {
              setModal(true);
            }}
            imagePath={
              userImage === ''
                ? userInfo?.image
                  ? `${EndPoint.baseAssestURL}${userInfo?.image}`
                  : userImage
                : `${EndPoint.baseAssestURL}${userImage}`
            }
            marginBottom={window.height * 0.02}
            window={window}
          />
          
          <Text style={style.addCertificateTx}>{'Cover photo'}</Text>
          <ImageBackground
            style={{
              width: window.width * 0.9,
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
              resizeMode: 'cover',
              marginBottom: 30,
              marginTop: 15,
            }}
            source={
              userBackground === ''
                ? userInfo?.cover_photo
                  ? { uri: `${EndPoint.baseAssestURL}${userInfo?.cover_photo}` }
                  : BackgroundImg
                : { uri: `${EndPoint.baseAssestURL}${userBackground}` }
            }
          >
            <TouchableOpacity
              style={
                userBackground === '' && !userInfo?.cover_photo
                  ? {
                      padding: 15,
                      borderRadius: 50,
                      backgroundColor: '#ffffff22',
                    }
                  : {
                      padding: 10,
                      borderRadius: 50,
                      backgroundColor: '#ffffff44',
                      position: 'absolute',
                      top: 10,
                      right: 10,
                    }
              }
              onPress={() => {
                setModal(true);
                setBackground(true);
              }}
            >
              <Image
                height={'20px'}
                width={'20px'}
                source={
                  userBackground === '' && !userInfo?.cover_photo
                    ? UploadIcon
                    : EditBlack
                }
              />
            </TouchableOpacity>
            {userBackground === '' && !userInfo?.cover_photo && (
              <Text
                style={{
                  color: Colors.White,
                  fontSize: fontResize(14),
                  marginTop: 10,
                  textDecorationLine: 'underline',
                }}
                onPress={() => {
                  setModal(true);
                  setBackground(true);
                }}
              >
                {Strings.UPLOAD_PHOTO}
              </Text>
            )}
          </ImageBackground>
          <CustomInputText
            marginBottom={window.height * 0.02}
            label={Strings.NAME}
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
            value={`+${userInfo?.country_code} ${phone}`}
            editable={false}
            placeholder={'+911234567890'}
            window={window}
          />
          <CustomInputText
            label={Strings.ABOUT_ME}
            isDetails={true}
            onChangeText={(text) => {
              setAbout(text);
            }}
            window={window}
            value={about}
          />
        </View>

        {/* ************************ Professional Education ************************    */}
        {selectUser == Strings.PROFESSIONAL && (
          <ContainerView
            marginTop={window.height * 0.05}
            marginBottom={window.height * 0.05}
            width={'100%'}
            flexDirection={'row'}
            alignItems={'center'}
          >
            <CustomText
              fontSize={fontResize(18)}
              marginLeft={window.width * 0.05}
              fontFamily={'Gilroy-Bold'}
              textColor={Colors.EerieBlack}
            >
              {Strings.EDUCATION}
            </CustomText>
            <CustomView
              width={window.width * 0.7}
              marginLeft={window.width * 0.05}
              height={'1px'}
              bgColor={Colors.PrimaryGray}
            />
          </ContainerView>
        )}

        {selectUser == Strings.PROFESSIONAL &&
          educationData?.allEducations?.map((data, index) => {
            return (
              <>
                <View style={{ marginHorizontal: window.width * 0.05 }}>
                  <CustomEducationInputView
                    inputRef={inputRef}
                    data={data}
                    Type={Type}
                    index={index}
                    window={window}
                    updateEducation={updateEducation}
                  />

                  <CustomText
                    fontFamily={'Gilroy-Bold'}
                    textColor={Colors.Red}
                    marginBottom={window.height * 0.05}
                    textAlign={'right'}
                    textLine={'underline'}
                    fontSize={fontResize(window.height * 0.03)}
                    onPress={() => {
                      removeEducation({ index, id: data.id });
                    }}
                  >
                    {Strings.DELETE}
                  </CustomText>
                </View>
                {educationData.allEducations.length - 1 != index && (
                  <CustomView
                    width={window.width * 0.98}
                    height={'1px'}
                    bgColor={Colors.PrimaryGray}
                    marginLeft={window.width * 0.01}
                    marginBottom={window.height * 0.02}
                  />
                )}
              </>
            );
          })}

        {selectUser == Strings.PROFESSIONAL && (
          <View
            style={{
              width: window.width * 0.9,
              marginHorizontal: window.width * 0.05,
            }}
          >
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
              text={Strings.ADD_MORE}
              borderWidth={1}
              borderColor={Colors.Blueberry}
              alignSelf={'flex-end'}
              buttonContainer={{
                shadowColor: Colors.Blueberry,
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.8,
                elevation: 1,
              }}
            />
          </View>
        )}

        <ContainerView
          marginTop={window.height * 0.05}
          marginBottom={window.height * 0.05}
          width={'100%'}
          flexDirection={'row'}
          alignItems={'center'}
        >
          <CustomText
            fontSize={fontResize(18)}
            marginLeft={window.width * 0.05}
            fontFamily={'Gilroy-Bold'}
            textColor={Colors.EerieBlack}
          >
            {Strings.WORK_EXPERIENCE}
          </CustomText>
          <CustomView
            width={window.width * 0.7}
            marginLeft={window.width * 0.05}
            height={'1px'}
            bgColor={Colors.PrimaryGray}
          />
        </ContainerView>
        {experienceData?.allExperience?.map((item, index) => (
          <>
            <View
              style={{
                width: window.width * 0.9,
                marginHorizontal: window.width * 0.05,
              }}
            >
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
                value={item.your_role}
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
                  setOpen(true);
                  setIsStartDate(true);
                  setID(index);
                }}
                window={window}
                value={
                  item.start_date === ''
                    ? ''
                    : moment(item.start_date).format('MMMM YYYY')
                }
              />
              <CustomInputText
                marginBottom={window.height * 0.02}
                label={Strings.END_DATE}
                editable={false}
                disabled={item.is_currently_working}
                isRightButton
                rightButtonImage={Calender}
                rightButtonPress={() => {
                  setOpen(true);
                  setID(index);
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
              <CustomText
                fontFamily={'Gilroy-Bold'}
                textColor={Colors.Red}
                marginBottom={window.height * 0.05}
                textAlign={'right'}
                textLine={'underline'}
                fontSize={fontResize(window.height * 0.03)}
                onPress={() => {
                  removeWorkExperience({ index, id: item.id });
                }}
              >
                {Strings.DELETE}
              </CustomText>
            </View>
            {experienceData?.allExperience?.length - 1 !== index && (
              <CustomView
                width={window.width}
                height={'1px'}
                bgColor={Colors.PrimaryGray}
                marginBottom={window.height * 0.02}
                marginTop={window.height * 0.03}
              />
            )}
          </>
        ))}
        <View
          style={{
            width: window.width * 0.9,
            marginHorizontal: window.width * 0.05,
          }}
        >
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
            text={Strings.ADD_MORE}
            borderWidth={1}
            borderColor={Colors.Blueberry}
            alignSelf={'flex-end'}
            buttonContainer={{
              shadowColor: Colors.Blueberry,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.8,
              elevation: 1,
            }}
          />
        </View>

        {certificateData?.allCertificate?.map((item, index) => (
          <>
            <View
              style={{
                width: window.width * 0.9,
                marginHorizontal: window.width * 0.05,
              }}
            >
              <CustomImageSelector
                AttachText={Strings.ATTACH_CERTIFICATE_PHOTO}
                label={Strings.ADD_CERTIFICATE}
                imagePress={() => {
                  setModal(true);
                  setIsCertificate(true);
                  setCertificateId(item.id);
                }}
                imagePath={
                  item.certificate_image === ''
                    ? item.certificate_image
                    : `${EndPoint.baseAssestURL}${item.certificate_image}`
                }
                marginBottom={window.height * 0.02}
                window={window}
              />
              <CustomInputText
                marginBottom={window.height * 0.02}
                label={Strings.TITLE}
                onChangeText={(text) => {
                  updateCertificateValue({ index, text, key: 'title' });
                }}
                value={item.title}
                window={window}
              />
              <CustomInputText
                marginBottom={window.height * 0.02}
                label={Strings.COMPANY_NAME}
                onChangeText={(text) => {
                  updateCertificateValue({ index, text, key: 'company_name' });
                }}
                value={item.company_name}
                window={window}
              />

              <CustomInputText
                marginBottom={window.height * 0.02}
                label={Strings.START_DATE}
                editable={false}
                isRightButton
                rightButtonImage={Calender}
                rightButtonPress={() => {
                  setIsStartDate(true);
                  setIsCertificateDate(true);
                  setID(index);
                }}
                window={window}
                value={
                  item.start_date === ''
                    ? ''
                    : moment(item.start_date).format('L')
                }
              />
              <CustomInputText
                marginBottom={window.height * 0.02}
                label={Strings.END_DATE}
                editable={false}
                isRightButton
                rightButtonImage={Calender}
                rightButtonPress={() => {
                  setID(index);
                  setIsCertificateDate(true);
                  setIsStartDate(false);
                }}
                window={window}
                value={
                  item.end_date === '' ? '' : moment(item.end_date).format('L')
                }
              />
            </View>
            {certificateData?.allCertificate?.length - 1 !== index && (
              <CustomView
                width={window.width}
                height={'1px'}
                bgColor={Colors.PrimaryGray}
                marginBottom={window.height * 0.02}
                marginTop={window.height * 0.03}
              />
            )}
          </>
        ))}
        <View
          style={{
            width: window.width * 0.9,
            marginHorizontal: window.width * 0.05,
          }}
        >
          <CustomButton
            onPress={() => {
              addNewCertificate();
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
            text={Strings.ADD_MORE}
            borderWidth={1}
            borderColor={Colors.Blueberry}
            alignSelf={'flex-end'}
            buttonContainer={{
              shadowColor: Colors.Blueberry,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.8,
              elevation: 1,
            }}
          />
          <Text style={style.addCertificateTx}>{'Upload your resume'}</Text>
          <CustomButton
            onPress={() => {
              fetchLocalFile();
            }}
            width={'100%'}
            height={window?.height * 0.08}
            backgroundColor={Colors.PrimaryLightGray}
            marginTop={window.height * 0.03}
            borderRadius={'10px'}
            alignItems={'center'}
            justifyContent={'center'}
            fontFamily={'Gilroy-SemiBold'}
            fontSize={'18px'}
            textColor={Colors.Blueberry}
            text={Strings.UPLOAD}
            buttonImage={LocalFileIcon}
            borderWidth={1}
            borderColor={Colors.SilverLight}
          />

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
                      : require('../../../Resources/assets/PdfIcon.png')
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
                <Image style={style.deleteIcon} source={RED_DELETE_ICON} />
              </TouchableOpacity>
            </View>
          )}
          <CustomButton
            onPress={() => {
              createUserProfile();
            }}
            width={'100%'}
            height={'70px'}
            backgroundColor={Colors.Blueberry}
            marginTop={window.height * 0.03}
            marginBottom={window.height * 0.1}
            borderRadius={'10px'}
            alignItems={'center'}
            justifyContent={'center'}
            fontFamily={'Gilroy-SemiBold'}
            fontSize={'18px'}
            textColor={Colors.White}
            text={Strings.UPDATE_USER_PROFILE}
          />
        </View>
      </ScrollView>

      <CustomModal
        isVisible={isModal}
        cancelVissible={() => {
          setModal(false);
        }}
        selectImage={(text) => {
          if (isCertificate) {
            selectCertificate(text);
          } else {
            selectImage(text);
          }
        }}
      />
      {isNative && (
        <DatePicker
          modal
          theme={'light'}
          textColor={scheme == 'dark' ? '#fff' : '#000'}
          open={open}
          date={
            isStartDate
              ? experienceData?.allExperience[id]?.start_date == ''
                ? startdate
                : experienceData?.allExperience[id]?.start_date
              : experienceData?.allExperience[id]?.end_date == ''
              ? experienceData?.allExperience[id]?.start_date == ''
                ? startdate
                : experienceData?.allExperience[id]?.start_date
              : experienceData?.allExperience[id]?.end_date
          }
          mode={'date'}
          minimumDate={
            isCertificateDate
              ? !isStartDate
                ? certificateData?.allCertificate[id]?.start_date
                : new Date('1950-01-01')
              : !isStartDate
              ? experienceData?.allExperience[id]?.start_date
              : new Date('1950-01-01')
          }
          maximumDate={startdate}
          onConfirm={(date) => {
            setOpen(false);
            if (isCertificateDate) {
              var updateStartDate = certificateData?.allCertificate?.map(
                (item, index) => {
                  if (index === id) {
                    if (isStartDate) {
                      return { ...item, start_date: date };
                    } else {
                      return { ...item, end_date: date };
                    }
                  }
                  return item;
                }
              );
              setIsCertificateDate(false);
              setCertificateData({
                ...certificateData,
                allCertificate: updateStartDate,
              });
            } else {
              var updateEndDate = experienceData?.allExperience?.map(
                (item, index) => {
                  if (index === id) {
                    if (isStartDate) {
                      return { ...item, start_date: date };
                    } else {
                      return { ...item, end_date: date };
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
          onCancel={() => {
            setIsCertificateDate(false);
            setOpen(false);
          }}
        />
      )}
      {isCertificateDate && (
        <DatePicker
          modal
          theme={'light'}
          textColor={scheme === 'dark' ? '#fff' : '#000'}
          open={isCertificateDate}
          date={
            isStartDate
              ? certificateData?.allCertificate[id]?.start_date === ''
                ? startdate
                : certificateData?.allCertificate[id]?.start_date
              : certificateData?.allCertificate[id]?.end_date === ''
              ? certificateData?.allCertificate[id]?.start_date === ''
                ? startdate
                : certificateData?.allCertificate[id]?.start_date
              : certificateData?.allCertificate[id]?.end_date
          }
          mode={'date'}
          minimumDate={
            !isStartDate
              ? certificateData?.allCertificate[id]?.start_date
              : new Date('1950-01-01')
          }
          maximumDate={startdate}
          onConfirm={(date) => {
            setOpen(false);
            if (isStartDate) {
              var updateStartDate = certificateData?.allCertificate?.map(
                (item, index) => {
                  if (index === id) {
                    return { ...item, start_date: date };
                  }
                  return item;
                }
              );
              setIsCertificateDate(false);
              setCertificateData({
                ...certificateData,
                allCertificate: updateStartDate,
              });
            } else {
              var updateEndDate = certificateData?.allCertificate?.map(
                (item, index) => {
                  if (index === id) {
                    return { ...item, end_date: date };
                  }
                  return item;
                }
              );
              setIsCertificateDate(false);
              setCertificateData({
                ...certificateData,
                allCertificate: updateEndDate,
              });
            }
          }}
          onCancel={() => {
            setIsCertificateDate(false);
          }}
        />
      )}

      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={
            isStartDate
              ? experienceData?.allExperience[id]?.start_date == ''
                ? startdate
                : experienceData?.allExperience[id]?.start_date
              : experienceData?.allExperience[id]?.end_date == ''
              ? experienceData?.allExperience[id]?.start_date == ''
                ? startdate
                : experienceData?.allExperience[id]?.start_date
              : experienceData?.allExperience[id]?.end_date
          }
          minimumDate={new Date(1850, 1)}
          maximumDate={startdate}
          locale="ist"
        />
      )}
    </SafeAreaView>
  );
};
export default EditProfile;
