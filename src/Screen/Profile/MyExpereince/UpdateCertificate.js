import { View, Text, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import Colors from '../../../Resources/Colors';
import Strings from '../../../Resources/Strings';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import CustomImageSelector from '../../../Component/CustomImageSelector';
import EndPoint from '../../../Redux/constants/EndPoint';
import {
  ContainerView,
  CustomText,
  CustomView,
} from '../../../Component/CustomComponent';
import CustomButton from '../../../Component/CustomButton';
import toast from 'react-simple-toasts';
import CustomInputText from '../../../Component/CustomInputText';
import { Calender } from '../../../Resources/assets/ProfileAssets';
import { styles } from './style';
import { useDropzone } from 'react-dropzone';
import { setLoading } from '../../../Redux/actions/authAction';
import { imageUplaod } from '../../../Redux/services/profileService';
import DatePicker from 'sassy-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { fontResize } from '../../../Util/font';
import { TouchableOpacity } from 'react-native-web';
import ImagePickerModal from '../../../Component/Picker/index.web';
import Type from '../../../Constants/Type/type';
import CameraModal from '../../HomeWeb/Camera/Modal/index.web';

const UpdateCertificate = ({
  window,
  updateCertificateImage,
  updateCertificateValue,
  certificateData,
  addNewCertificate,
}) => {
  const userData = useSelector((state) => state.auth.userData);
  const userInfo = useSelector((state) => state?.profile?.myProfile);
  const dispatch = useDispatch();
  const [isCertificateDate, setIsCertificateDate] = useState(false);
  const [isModal, setModal] = useState(false);
  const [isCertificate, setIsCertificate] = useState(false);
  const [certificateId, setCertificateId] = useState(0);
  const [isStartDate, setIsStartDate] = useState(true);
  const [startdate, setStartDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [id, setID] = useState(0);
  const [isPicker, setPicker] = useState(false);
  const [isCamera, setCamera] = useState(false);
  const selectUser = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  var selectItem = '';
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: { 'image/jpeg': ['.jpeg'], 'image/png': ['.png'] },
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

        dispatch(setLoading(false));
        let updateCertificate = certificateData.allCertificate.map((item) => {
          if (item.id === certificateId) {
            return { ...item, certificate_image: getImageURI.data[0] };
          }
          return item;
        });
        dispatch(setLoading(false));
        updateCertificateImage(updateCertificate);
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

      dispatch(setLoading(false));
      let updateCertificate = certificateData.allCertificate.map((item) => {
        if (item.id === certificateId) {
          return { ...item, certificate_image: getImageURI.data[0] };
        }
        return item;
      });
      updateCertificateImage(updateCertificate);
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  return (
    <View>
      {selectUser === Strings.RECRUITER ? (
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
              {Strings.OTHER}
            </CustomText>
            <CustomView
              width={'70%'}
              marginLeft={'5%'}
              height={'1px'}
              bgColor={Colors.PrimaryGray}
            />
          </ContainerView>
        </View>
      ) : (
        <View>
          {certificateData.allCertificate.map((item, index) => (
            <>
              <View style={styles.workExpView}>
                {/* <div
                  {...getRootProps({
                    className: 'dropzone',
                    onClick: (event) => {
                      setCertificateId(item.id);
                      selectItem = 'image';
                    },
                  })}
                >
                  <input {...getInputProps()} />
                  <CustomImageSelector
                    disabled={true}
                    isWeb={true}
                    AttachText={Strings.ATTACH_CERTIFICATE_PHOTO}
                    label={Strings.ADD_CERTIFICATE}
                    imagePath={
                      item.certificate_image === ''
                        ? item.certificate_image
                        : `${EndPoint.baseAssestURL}${item.certificate_image}`
                    }
                    marginBottom={window.height * 0.02}
                    width={'100%'}
                    window={window}
                  />
                </div> */}

                <TouchableOpacity
                  onPress={() => {
                    setCertificateId(item.id);
                    selectItem = 'image';
                    setPicker(true);
                  }}
                >
                  <CustomImageSelector
                    disabled={true}
                    isWeb={true}
                    AttachText={Strings.ATTACH_CERTIFICATE_PHOTO}
                    label={Strings.ADD_CERTIFICATE}
                    imagePath={
                      item.certificate_image === ''
                        ? item.certificate_image
                        : `${EndPoint.baseAssestURL}${item.certificate_image}`
                    }
                    marginBottom={window.height * 0.02}
                    width={'100%'}
                    window={window}
                  />
                </TouchableOpacity>

                <CustomInputText
                  marginBottom={window.height * 0.02}
                  label={Strings.TITLE}
                  onChangeText={(text) => {
                    updateCertificateValue({ index, text, key: 'title' });
                  }}
                  value={item.title}
                  window={window}
                  width={'100%'}
                />

                <CustomInputText
                  marginBottom={window.height * 0.02}
                  label={Strings.COMPANY_NAME}
                  onChangeText={(text) => {
                    updateCertificateValue({
                      index,
                      text,
                      key: 'company_name',
                    });
                  }}
                  value={item.company_name}
                  window={window}
                  width={'100%'}
                />

                <CustomInputText
                  marginBottom={window.height * 0.02}
                  label={Strings.START_DATE}
                  editable={false}
                  isRightButton
                  rightButtonImage={Calender}
                  rightButtonPress={() => {
                    setOpen(true);
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
                  width={'100%'}
                />
                <CustomInputText
                  marginBottom={window.height * 0.02}
                  label={Strings.END_DATE}
                  editable={false}
                  isRightButton
                  rightButtonImage={Calender}
                  rightButtonPress={() => {
                    setOpen(true);
                    setID(index);
                    setIsCertificateDate(true);
                    setIsStartDate(false);
                  }}
                  window={window}
                  value={
                    item.end_date === ''
                      ? ''
                      : moment(item.end_date).format('L')
                  }
                  width={'100%'}
                />
              </View>
              {certificateData.allCertificate.length - 1 !== index && (
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
          {/* <View
        style={{
          width: window.width * 0.9,
          marginHorizontal: window.width * 0.05,
        }}
      > */}
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
              shadowOpacity: 0.2,
              elevation: 5,
            }}
          />
          {/* </View> */}
          <Modal
            visible={open}
            style={{
              width: window.width,
              height: window.height,
            }}
            onRequestClose={() => setOpen(false)}
            transparent={true}
            animationType={'fade'}
          >
            <View
              style={{
                width: window.width * 0.3,
                height: window.height,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',
              }}
            >
              <DatePicker
                value={
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
                minDate={
                  !isStartDate
                    ? certificateData.allCertificate[id].start_date
                    : new Date('1950-01-01')
                }
                maxDate={startdate}
                onChange={(date) => {
                  setOpen(false);
                  if (isStartDate) {
                    var updateStartDate = certificateData.allCertificate.map(
                      (item, index) => {
                        if (index === id) {
                          return { ...item, start_date: date };
                        }
                        return item;
                      }
                    );
                    setIsCertificateDate(false);
                    // setCertificateData({
                    //   ...certificateData,
                    //   allCertificate: updateStartDate,
                    // });
                    updateCertificateImage(updateStartDate);
                  } else {
                    var updateEndDate = certificateData.allCertificate.map(
                      (item, index) => {
                        if (index === id) {
                          return { ...item, end_date: date };
                        }
                        return item;
                      }
                    );
                    setIsCertificateDate(false);
                    // setCertificateData({
                    //   ...certificateData,
                    //   allCertificate: updateEndDate,
                    // });
                    updateCertificateImage(updateEndDate);
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
              let updateCertificate = certificateData.allCertificate.map(
                (item) => {
                  if (item.id === certificateId) {
                    return { ...item, certificate_image: value };
                  }
                  return item;
                }
              );
              updateCertificateImage(updateCertificate);
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

export default UpdateCertificate;
