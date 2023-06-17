/* eslint-disable react-native/no-inline-styles */
import { View, Text, Modal, FlatList, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Strings from '../../../Resources/Strings';
import {
  ContainerView,
  CustomText,
  CustomView,
} from '../../../Component/CustomComponent';
import CustomInputText from '../../../Component/CustomInputText';
import Colors from '../../../Resources/Colors';
import { Calender } from '../../../Resources/assets/ProfileAssets';
import CustomButton from '../../../Component/CustomButton';
import toast from 'react-simple-toasts';
import DatePicker from 'sassy-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import LocalFileIcon from '../../../Resources/assets/localFile.png';
import CustomWebButton from '../../../Component/CustomWebButton';
import { setLoading } from '../../../Redux/actions/authAction';
import { imageUplaod } from '../../../Redux/services/profileService';
import GoogleDriveIcon from '../../../Resources/assets/googleDriveIcon.png';
import DropBoxIcon from '../../../Resources/assets/dropboxIcon.png';
import { useDropzone } from 'react-dropzone';
import PdfIcon from '../../../Resources/assets/PdfIcon.png';
import { styles } from './style';
import { fontResize } from '../../../Util/font';
import CustomImageSelector from '../../../Component/CustomImageSelector';
import EndPoint from '../../../Redux/constants/EndPoint';
import { CheckBox, TouchableOpacity } from 'react-native-web';
import ImagePickerModal from '../../../Component/Picker/index.web';
import Type from '../../../Constants/Type/type';
import CameraModal from '../../HomeWeb/Camera/Modal/index.web';
import AXPicker from 'react-month-picker';
import 'react-month-picker/css/month-picker.css';
import MonthBox from '../../../Component/MonthPicker/index.web';
import { useMemo } from 'react';
import { useRef } from 'react';

const UpdateWorkExperence = ({
  window,
  experienceData,
  companyinfoData,
  updateValue,
  updateCompanyValue,
  addNewData,
  setExperience,
  industry,
  sizeOfComapny,
  headquarters,
  founded,
  companyImage,
  setChangeFile,
  companyName,
  companyEmail,
  companyPhone,
  companyAddress,
  businessNumber,
  aboutCompany,
}) => {
  const userData = useSelector((state) => state.auth.userData);
  const userInfo = useSelector((state) => state?.profile?.myProfile);
  const [localeFile, setLocaleFile] = useState(userInfo?.link_your_resume);
  const [isLocal, setIsLocal] = useState(false);
  const dispatch = useDispatch();
  const selectUser = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const [isModal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [isStartDate, setIsStartDate] = useState(true);
  const [value, setValue] = useState(true);
  const [startdate, setStartDate] = useState(new Date());
  const [id, setID] = useState(0);
  const [isPicker, setPicker] = useState(false);
  const [isCamera, setCamera] = useState(false);
  const [selectItem, setSelectItem] = useState(false);
  const [singleValue, setSingleValue] = useState({
    year: parseInt(moment(new Date()).format('YYYY')),
    month: parseInt(moment(new Date()).format('MM')),
  });

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

  var startRef = useRef([]);
  var endRef = useRef([]);

  const makeText = (m) => {
    if (m && m.year && m.month)
      return pickerLang.months[m.month - 1] + ', ' + m.year;
    return '?';
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

  function isValidDate(date) {
    return (
      date &&
      Object.prototype.toString.call(date) === '[object Date]' &&
      !isNaN(date)
    );
  }

  const convertDateToObject = (date) => {
    return {
      year: parseInt(moment(date).format('YYYY')),
      month: parseInt(moment(date).format('MM')),
    };
  };

  const getMonthPickerValue = (date) => {
    return date == ''
      ? makeText(singleValue)
      : isValidDate(date)
      ? moment(date).format('MMM, yyyy')
      : date;
  };

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

  const renderItem = ({ item, index }) => {
    return (
      <>
        <View style={styles.workExpView}>
          <View>
            <CustomInputText
              marginTop={'5%'}
              width={'100%'}
              label={Strings.COMPANY_NAME}
              onChangeText={(text) => {
                updateValue({ index, text, key: 'company_name' });
              }}
              errorMessage={''}
              value={item.company_name}
              window={window}
            />

            <CustomInputText
              marginTop={'5%'}
              width={'100%'}
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
                var updateStartDate = experienceData?.allExperience.map(
                  (item, indexId) => {
                    if (index == indexId) {
                      var selectedDate = makeText({ year: value, month: text });
                      return { ...item, start_date: selectedDate };
                    }
                    return item;
                  }
                );
                setExperience(updateStartDate);
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
                var updateStartDate = experienceData?.allExperience.map(
                  (item, indexId) => {
                    if (index == indexId) {
                      var selectedDate = makeText({ year: value, month: text });
                      if (
                        isDateAfter(
                          makeText({ year: value, month: text }),
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
                setExperience(updateStartDate);
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
                    text: !item.is_currently_working,
                    key: 'currently_working',
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

            <View>
              <CustomInputText
                marginBottom={'5%'}
                label={Strings.YOUR_EXPERIENCE}
                width={'100%'}
                marginTop={'5%'}
                isDetails={true}
                onChangeText={(text) =>
                  updateValue({ index, text, key: 'your experience' })
                }
                value={item.your_experience}
                window={window}
              />

              {experienceData.allExperience.length - 1 !== index && (
                <CustomView
                  width={window.width * 0.98}
                  height={'1px'}
                  bgColor={Colors.PrimaryGray}
                  marginLeft={window.width * 0.01}
                  marginBottom={window.height * 0.08}
                />
              )}
            </View>
          </View>
        </View>
      </>
    );
  };

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
        } else if (selectItem == 'companyImage') {
          dispatch(setLoading(false));
          updateCompanyValue({
            type: 'companyImage',
            value: getImageURI.data[0],
          });
        }
      } catch (err) {
        dispatch(setLoading(false));
      }
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
        dispatch(setLoading(false));
        setLocaleFile(getImageURI.data[0]);
      } else if (selectItem == 'companyImage') {
        dispatch(setLoading(false));
        updateCompanyValue({
          type: 'companyImage',
          value: getImageURI.data[0],
        });
      }
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  return (
    <View>
      {selectUser !== Strings.PROFESSIONAL ? (
        <View>
          <ContainerView
            marginTop={window?.height * 0.05}
            marginBottom={window?.height * 0.05}
            width={'100%'}
            flexDirection={'row'}
            alignItems={'center'}
          >
            <CustomText
              fontSize={fontResize(18)}
              fontFamily={'Gilroy-Medium'}
              textColor={Colors.EerieBlack}
            >
              {Strings.COMPANY_INFO}
            </CustomText>

            <CustomView
              width={'70%'}
              marginLeft={'5%'}
              height={'1px'}
              bgColor={Colors.PrimaryGray}
            />
          </ContainerView>

          {selectUser === Strings.RECRUITER && (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setPicker(true);
                  setIsLocal(false);
                  setSelectItem('companyImage');
                }}
              >
                <CustomImageSelector
                  disabled={true}
                  isWeb={true}
                  AttachText={Strings.ATTACH_YOUR_PHOTO}
                  label={Strings.COMPANY_PROFILE_IMAGE}
                  width={'100%'}
                  imagePath={
                    companyImage == ''
                      ? companyImage
                      : `${EndPoint.baseAssestURL}${companyImage}`
                  }
                  window={window}
                />
              </TouchableOpacity>

              <CustomInputText
                marginTop={'5%'}
                label={Strings.COMPANY_NAME}
                onChangeText={(text) => {
                  updateCompanyValue({ type: 'companyName', value: text });
                }}
                value={companyName}
                placeholder={'Johnny'}
                window={window}
                width={'100%'}
              />

              <CustomInputText
                marginTop={'5%'}
                label={Strings.COMPANY_EMAIL}
                editable={true}
                onChangeText={(text) =>
                  updateCompanyValue({ type: 'companyEmail', value: text })
                }
                value={companyEmail}
                placeholder={'example@domain.com'}
                window={window}
                isUpdate={true}
                width={'100%'}
              />

              <CustomInputText
                marginTop={'5%'}
                label={Strings.COMPANY_PHONE}
                onChangeText={(text) =>
                  updateCompanyValue({ type: 'companyPhone', value: text })
                }
                value={companyPhone}
                editable={true}
                placeholder={'+911234567890'}
                window={window}
                width={'100%'}
              />

              <CustomInputText
                marginTop={'5%'}
                label={Strings.BUSINESS_ADDRESS}
                onChangeText={(text) => {
                  updateCompanyValue({ type: 'companyAddress', value: text });
                }}
                window={window}
                value={companyAddress}
                marginBottom={'5%'}
                width={'100%'}
              />

              <CustomInputText
                marginTop={'5%'}
                label={Strings.BUSINESS_NUMBER}
                onChangeText={(text) =>
                  updateCompanyValue({ type: 'businessPhone', value: text })
                }
                value={businessNumber}
                editable={true}
                placeholder={'+911234567890'}
                window={window}
                width={'100%'}
              />
            </View>
          )}
          <CustomInputText
            marginTop={'5%'}
            width={'100%'}
            label={Strings.INDUSTRY}
            onChangeText={(text) => {
              updateCompanyValue({ value: text, type: 'industry' });
            }}
            errorMessage={''}
            value={industry}
            window={window}
          />

          <CustomInputText
            marginTop={'5%'}
            width={'100%'}
            label={Strings.SIZE_OF_COMPANY}
            onChangeText={(text) => {
              updateCompanyValue({ value: text, type: 'size of company' });
            }}
            errorMessage={''}
            value={sizeOfComapny}
            window={window}
          />

          <CustomInputText
            marginTop={'5%'}
            width={'100%'}
            label={Strings.HEADQUARTES}
            onChangeText={(text) => {
              updateCompanyValue({ value: text, type: 'headquarters' });
            }}
            errorMessage={''}
            value={headquarters}
            window={window}
          />

          <CustomInputText
            marginTop={'5%'}
            width={'100%'}
            label={Strings.FOUNDED}
            onChangeText={(text) => {
              updateCompanyValue({ value: text, type: 'founded' });
            }}
            errorMessage={''}
            value={founded}
            window={window}
          />

          <CustomInputText
            marginTop={'5%'}
            label={Strings.ABOUT_COMPANY}
            isDetails={true}
            onChangeText={(text) => {
              updateCompanyValue({ type: 'aboutCompany', value: text });
            }}
            window={window}
            value={aboutCompany}
            marginBottom={'5%'}
            width={'100%'}
          />
        </View>
      ) : (
        <View>
          {experienceData.allExperience.map((item, index) =>
            renderItem({ item, index })
          )}
          <View>
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

            <CustomText
              fontFamily={'Gilroy-SemiBold'}
              fontSize={'18px'}
              marginTop={window.height * 0.1}
            >
              {Strings.LINK_WITH_RESUME}
            </CustomText>
            <ContainerView
              marginTop={window.height * 0.05}
              marginBottom={window.height * 0.1}
              bgColor={'red'}
              // flexDirection={'row'}
              // justifyContent={'space-between'}
              alignItems={'center'}
            >
              <CustomButton
                onPress={() => {}}
                width={'100%'}
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
                width={'100%'}
                height={'50px'}
                backgroundColor={Colors.PrimaryLightGray}
                borderRadius={'10px'}
                marginTop={'5%'}
                alignItems={'center'}
                justifyContent={'center'}
                fontFamily={'Gilroy-SemiBold'}
                fontSize={'18px'}
                textColor={Colors.Blueberry}
                text={Strings.DROPBOX}
                buttonImage={DropBoxIcon}
                borderWidth={1}
                borderColor={Colors.SilverLight}
                buttonContainer={{
                  shadowColor: Colors.Blueberry,
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 0.2,
                  elevation: 5,
                }}
              />
              <div
                {...getRootProps({
                  className: 'dropzone',
                  onClick: (event) => {
                    setIsLocal(true);
                    setSelectItem('pdf');
                  },
                })}
              >
                <input {...getInputProps()} />

                <CustomWebButton
                  width={window.width * 0.3}
                  height={'50px'}
                  backgroundColor={Colors.PrimaryLightGray}
                  borderRadius={'10px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  fontFamily={'Gilroy-SemiBold'}
                  fontSize={'18px'}
                  marginTop={'5%'}
                  marginBottom="5%"
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
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: window.height * 0.25,
                  marginBottom: '5%',
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
          </View>
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
                    ? experienceData?.allExperience[id]?.start_date == ''
                      ? startdate
                      : experienceData?.allExperience[id]?.start_date
                    : experienceData?.allExperience[id]?.end_date == ''
                    ? startdate
                    : experienceData?.allExperience[id]?.end_date
                }
                minDate={
                  !isStartDate
                    ? experienceData?.allExperience[id]?.start_date
                    : new Date('1950-01-01')
                }
                maxDate={new Date('2123-02-25')}
                onChange={(date) => {
                  setOpen(false);
                  if (isStartDate) {
                    var updateStartDate = experienceData?.allExperience.map(
                      (item, index) => {
                        if (item.id == id) {
                          if (date > new Date(item.end_date)) {
                            return {
                              ...item,
                              start_date: date,
                              end_date: date,
                            };
                          } else {
                            return { ...item, start_date: date };
                          }
                        }
                        return item;
                      }
                    );
                    setExperience(updateStartDate);
                  } else {
                    var updateEndDate = experienceData?.allExperience.map(
                      (item, index) => {
                        if (item.id == id) {
                          if (date < new Date(item.start_date)) {
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
                    setExperience(updateEndDate);
                  }
                }}
              />
            </View>
          </Modal>
        </View>
      )}

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
              updateCompanyValue({ type: 'companyImage', value: value });
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

export default UpdateWorkExperence;
