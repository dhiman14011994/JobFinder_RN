/* eslint-disable react-native/no-inline-styles */
import {
  useWindowDimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  Modal,
  View,
  Image,
  Text,
  useColorScheme,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../../Component/Header/Header';
import {
  ButtonContainer,
  CustomText,
  CustomView,
  ContainerView,
} from '../../../Component/CustomComponent';
import Strings from '../../../Resources/Strings';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../Resources/Colors';
import { fontResize } from '../../../Util/font';
import CustomInputText from '../../../Component/CustomInputText';
import LeftImage from '../../../Resources/assets/leftImage.png';
import CustomImageSelector from '../../../Component/CustomImageSelector';
import CustomModal from '../../../Component/CustomModal/CustomModal';
import DownArrow from '../../../Resources/assets/downArrow.png';
import Calender from '../../../Resources/assets/Calender.png';
import CustomButton from '../../../Component/CustomButton';
import CustomWebButton from '../../../Component/CustomWebButton';
import GoogleDriveIcon from '../../../Resources/assets/googleDriveIcon.png';
import DropBoxIcon from '../../../Resources/assets/dropboxIcon.png';
import LocalFileIcon from '../../../Resources/assets/localFile.png';
import { useDropzone } from 'react-dropzone';
import { imageUplaod } from '../../../Redux/services/profileService';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoading } from '../../../Redux/actions/authAction';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

import EndPoint from '../../../Redux/constants/EndPoint';
import DatePicker from 'sassy-datepicker';
import moment from 'moment';
import PdfIcon from '../../../Resources/assets/PdfIcon.png';
import toast from 'react-simple-toasts';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
  const window = useWindowDimensions();
  const navigation = useNavigation();
  const userData = useSelector((state) => state.auth.userData);
  const userInfo = useSelector((state) => state?.profile?.myProfile);
  const [userImage, setuserImage] = useState(
    userInfo?.image ? userInfo?.image : ''
  );
  const token = useSelector((state) => state.auth.token);
  const [name, setName] = useState(userInfo?.name);
  const [phone, setPhone] = useState(
    userInfo?.phone_number ? userInfo?.phone_number : ''
  );
  const [email, setEmail] = useState(userInfo?.email);
  const [about, setAbout] = useState(userInfo?.about_me);
  const [isLocal, setIsLocal] = useState(false);
  const [userBackground, setUserBackground] = useState(
    userInfo?.cover_photo ? userInfo?.cover_photo : ''
  );
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
  const scheme = useColorScheme();

  console.log('=====>>>>>>Profile', JSON.stringify(userInfo));
  const [experienceData, setExperienceData] = useState({
    allExperience: [
      {
        id: 0,
        company_name: '',
        your_role: '',
        start_date: '',
        end_date: '',
        your_experience: '',
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
          };
          return cureentData;
        });
        setExperienceData({ ...experienceData, allExperience: updateExp });
      }

      if (userInfo?.certificates?.length != 0) {
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
  var selectItem = '';
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept:
      selectItem == 'pdf'
        ? { 'text/pdf': ['.pdf'] }
        : { 'image/jpeg': ['.jpeg'], 'image/png': ['.png'] },
    onDrop: async (acceptedFiles) => {
      try {
        let imageFile = await acceptedFiles.map((file) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        });
        dispatch(setLoading(true));
        var getImageURI = await imageUplaod({
          file: imageFile[0],
          token: userData?.access_token,
        });
        if (selectItem == 'pdf') {
          dispatch(setLoading(false));
          setLocaleFile(getImageURI.data[0]);
        } else {
          dispatch(setLoading(false));
          setuserImage(getImageURI.data[0]);
        }
      } catch (err) {
        dispatch(setLoading(false));
      }
    },
  });

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

  const updateValue = ({ index, text, key }) => {
    let updateItem = experienceData.allExperience.map((item, i) => {
      if (i == index) {
        if (key === 'your role') {
          return { ...item, your_role: text };
        } else if (key === 'your experience') {
          return { ...item, your_experience: text };
        }
      }
      return item;
    });
    setExperienceData({ ...experienceData, allExperience: updateItem });
  };

  const createUserProfile = async () => {};

  return (
    <SafeAreaView style={{ backgroundColor: Colors.White }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <CustomView
          width={window.width * 0.8}
          marginLeft={window.width * 0.1}
          marginRight={window.width * 0.1}
          marginTop={window.height * 0.05}
          height={window.height * 0.9}
        >
          <CustomText
            marginBottom={window.height * 0.05}
            textAlign={'left'}
            style={{ width: window.width * 0.8 }}
            fontSize={fontResize(30)}
            fontFamily={'Gilroy-Bold'}
          >
            {Strings.CREATE_WEB_PROFILE}
          </CustomText>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            bounces={false}
            style={{ width: '100%' }}
          >
            <ContainerView
              marginTop={window.height * 0.05}
              marginBottom={window.height * 0.05}
              flexDirection={'row'}
              alignItems={'center'}
            >
              <CustomText
                style={{ width: window.width * 0.3 }}
                fontSize={fontResize(18)}
                fontFamily={'Gilroy-Medium'}
                textColor={Colors.EerieBlack}
              >
                {Strings.BASIC_INFO}
              </CustomText>
              <CustomView
                width={'87%'}
                marginLeft={window.width * 0.03}
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
              {selectUser == 'Professionals' && (
                <div
                  {...getRootProps({
                    className: 'dropzone',
                    onClick: (event) => {
                      setIsLocal(false);
                      selectItem = 'image';
                    },
                  })}
                >
                  <input {...getInputProps()} />
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
                </div>
              )}
              <CustomView
                height={window.height * 0.4}
                width={window.width * 0.2}
              >
                <CustomInputText
                  marginBottom={window.height * 0.06}
                  label={Strings.NAME}
                  onChangeText={(text) => setName(text)}
                  value={name}
                  placeholder={'Abc'}
                  width={window.width * 0.2}
                  window={window}
                />
                <CustomInputText
                  label={Strings.EMAIL}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  placeholder={'abc@gmail.com'}
                  width={window.width * 0.2}
                  window={window}
                />
              </CustomView>
              <CustomInputText
                label={Strings.PHONE}
                marginBottom={window.height * 0.02}
                onChangeText={(text) => setPhone(text)}
                value={`+${phone}`}
                placeholder={'+911234567890'}
                width={window.width * 0.2}
                window={window}
              />
            </CustomView>

            {selectUser == 'Professionals' && (
              <CustomInputText
                marginTop={window.width * 0.05}
                label={Strings.ABOUT_ME}
                width={window.width * 0.5}
                inputStyle={{ height: '95%' }}
                isDetails={true}
                onChangeText={(text) => setAbout(text)}
                value={about}
                window={window}
              />
            )}
            <ContainerView
              marginTop={window.height * 0.1}
              marginBottom={window.height * 0.05}
              flexDirection={'row'}
              alignItems={'center'}
            >
              <CustomText
                style={{ width: window.width * 0.3 }}
                fontSize={fontResize(18)}
                fontFamily={'Gilroy-Medium'}
                textColor={Colors.EerieBlack}
              >
                {selectUser == 'Professionals'
                  ? Strings.WORK_EXPERIENCE
                  : Strings.COMPANY_INFO}
              </CustomText>
              <CustomView
                width={'87%'}
                marginLeft={window.width * 0.03}
                height={'1px'}
                bgColor={Colors.PrimaryGray}
              />
            </ContainerView>

            {selectUser == 'Professionals' && (
              <>
                <CustomText
                  fontFamily={'Gilroy-SemiBold'}
                  fontSize={'18px'}
                  marginTop={window.height * 0.1}
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
                      {'Resume.pdf'}
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
                      <CustomInputText
                        width={window.width * 0.2}
                        label={Strings.START_DATE}
                        editable={false}
                        isRightButton
                        rightButtonImage={Calender}
                        rightButtonPress={() => {
                          setOpen(true);
                          setIsStartDate(true);
                          setID(item.id);
                        }}
                        window={window}
                        value={
                          item.start_date == ''
                            ? ''
                            : moment(item.start_date).format('L')
                        }
                      />
                      <CustomInputText
                        width={window.width * 0.2}
                        label={Strings.END_DATE}
                        editable={false}
                        isRightButton
                        rightButtonImage={Calender}
                        rightButtonPress={() => {
                          setOpen(true);
                          setID(item.id);
                          setIsStartDate(false);
                        }}
                        window={window}
                        value={
                          item.end_date == ''
                            ? ''
                            : moment(item.end_date).format('L')
                        }
                      />
                    </CustomView>
                    <CustomInputText
                      marginBottom={window.height * 0.1}
                      label={Strings.YOUR_EXPERIENCE}
                      inputStyle={{ height: '95%' }}
                      width={window.width * 0.5}
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
                      />
                    )}
                  </>
                ))}
              </>
            )}
            {selectUser == 'Professionals' && (
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
                />
              </>
            )}

            <CustomButton
              onPress={() => {
                createUserProfile();
              }}
              width={window.width * 0.2}
              height={'50px'}
              backgroundColor={Colors.Blueberry}
              marginTop={window.height * 0.03}
              marginBottom={window.height * 0.15}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              fontFamily={'Gilroy-SemiBold'}
              fontSize={'18px'}
              textColor={Colors.White}
              alignSelf={'flex-start'}
              text={
                selectUser == 'Professionals'
                  ? Strings.CREATE_USER_PROFILE
                  : Strings.CREATE_COMPANY_PROFILE
              }
            />
          </ScrollView>
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
            value={
              isStartDate
                ? experienceData.allExperience[id].start_date == ''
                  ? startdate
                  : experienceData.allExperience[id].start_date
                : experienceData.allExperience[id].end_date == ''
                ? startdate
                : experienceData.allExperience[id].end_date
            }
            minDate={
              !isStartDate
                ? experienceData.allExperience[id].start_date
                : new Date('1950-01-01')
            }
            maxDate={startdate}
            onChange={(date) => {
              setOpen(false);
              if (isStartDate) {
                var updateStartDate = experienceData.allExperience.map(
                  (item, index) => {
                    if (item.id == id) {
                      return { ...item, start_date: date };
                    }
                    return item;
                  }
                );
                setExperienceData({
                  ...experienceData,
                  allExperience: updateStartDate,
                });
              } else {
                var updateEndDate = experienceData.allExperience.map(
                  (item, index) => {
                    if (item.id == id) {
                      return { ...item, end_date: date };
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
    </SafeAreaView>
  );
};

export default EditProfile;
