import { View, Text } from 'react-native';
import React, { useState } from 'react';
import {
  ContainerView,
  CustomText,
  CustomView,
} from '../../../Component/CustomComponent';
import { fontResize } from '../../../Util/font';
import Colors from '../../../Resources/Colors';
import Strings from '../../../Resources/Strings';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { imageUplaod } from '../../../Redux/services/profileService';
import { setLoading } from '../../../Redux/actions/authAction';
import CustomImageSelector from '../../../Component/CustomImageSelector';
import EndPoint from '../../../Redux/constants/EndPoint';
import CustomInputText from '../../../Component/CustomInputText';
import { BackgroundImg } from '../../../Resources/assets/ProfileAssets';
import { TouchableOpacity } from 'react-native-web';
import ImagePickerModal from '../../../Component/Picker/index.web';
import Type from '../../../Constants/Type/type';
import CameraModal from '../../HomeWeb/Camera/Modal/index.web';

const UpdateBasicDetails = ({
  userData,
  userInfo,
  window,
  localeFile,
  userImage,
  name,
  address,
  website,
  phone,
  email,
  about,
  setChangeFile,
  userBackground,
}) => {
  const dispatch = useDispatch();
  const [isLocal, setIsLocal] = useState(false);
  const [isBackground, setBackground] = useState(false);
  const [selectItem, setSelectItem] = useState('');
  const [isPicker, setPicker] = useState(false);
  const [isCamera, setCamera] = useState(false);
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  // var selectItem = '';

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
        uploadImageData(imageFile[0]);
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
        setChangeFile({ type: 'local_file', value: getImageURI.data[0] });
      } else if (selectItem == 'coverimage') {
        dispatch(setLoading(false));
        setChangeFile({ type: 'coverimage', value: getImageURI.data[0] });
      } else {
        dispatch(setLoading(false));
        setChangeFile({ type: 'user_image', value: getImageURI.data[0] });
      }
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  return (
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
          {Strings.BASIC_INFO}
        </CustomText>
        <CustomView
          width={'70%'}
          marginLeft={'5%'}
          height={'1px'}
          bgColor={Colors.PrimaryGray}
        />
      </ContainerView>

      <TouchableOpacity
        onPress={() => {
          // selectItem = 'image';
          setSelectItem('image');
          setPicker(true);
        }}
      >
        <CustomImageSelector
          disabled={true}
          isWeb={true}
          AttachText={Strings.ATTACH_YOUR_PHOTO}
          label={Strings.USER_PROFILE_IMAGE}
          width={'100%'}
          imagePath={
            userImage == ''
              ? userImage
              : `${EndPoint.baseAssestURL}${userImage}`
          }
          window={window}
        />
      </TouchableOpacity>
      {type === Strings.PROFESSIONAL && (
        <TouchableOpacity
          onPress={() => {
            // selectItem = 'coverimage';
            setSelectItem('coverimage');
            setIsLocal(false);
            setPicker(true);
          }}
        >
          <CustomImageSelector
            disabled={true}
            isWeb={true}
            AttachText={Strings.ATTACH_YOUR_PHOTO}
            label={Strings.COVER_PHOTO}
            width={'100%'}
            marginTop={'5%'}
            imagePath={
              userBackground == ''
                ? BackgroundImg
                : `${EndPoint.baseAssestURL}${userBackground}`
            }
            window={window}
          />
        </TouchableOpacity>
      )}

      <CustomInputText
        marginTop={'5%'}
        label={Strings.NAME}
        onChangeText={(text) => {
          setChangeFile({ type: 'name', value: text });
        }}
        value={name}
        placeholder={'Johnny'}
        window={window}
        width={'100%'}
      />
      <CustomInputText
        marginTop={'5%'}
        label={Strings.EMAIL}
        editable={false}
        onChangeText={(text) => setChangeFile({ type: 'email', value: text })}
        value={email}
        placeholder={'example@domain.com'}
        window={window}
        isUpdate={true}
        width={'100%'}
      />
      <CustomInputText
        marginTop={'5%'}
        label={Strings.PHONE}
        onChangeText={(text) => setChangeFile({ type: 'phone', value: text })}
        value={`+${userInfo?.country_code} ${phone}`}
        editable={false}
        placeholder={'+911234567890'}
        window={window}
        width={'100%'}
      />
      {type !== Strings.RECRUITER && (
        <CustomInputText
          marginTop={'5%'}
          label={Strings.ABOUT_ME}
          isDetails={true}
          onChangeText={(text) => {
            setChangeFile({ type: 'about', value: text });
          }}
          window={window}
          value={about}
          marginBottom={'5%'}
          width={'100%'}
        />
      )}

      {type === Strings.ORGANIZATION && (
        <CustomInputText
          marginTop={'5%'}
          label={Strings.ADDRESS}
          onChangeText={(text) => {
            setChangeFile({ type: 'address', value: text });
          }}
          window={window}
          value={address}
          marginBottom={'5%'}
          width={'100%'}
        />
      )}
      {type !== Strings.PROFESSIONAL && (
        <CustomInputText
          marginTop={'5%'}
          label={Strings.WEBSITE}
          onChangeText={(text) => {
            setChangeFile({ type: 'website', value: text });
          }}
          window={window}
          value={website}
          marginBottom={'5%'}
          width={'100%'}
        />
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
              if (selectItem == 'pdf') {
                setChangeFile({ type: 'local_file', value: value });
              } else if (selectItem == 'coverimage') {
                setChangeFile({ type: 'coverimage', value: value });
              } else {
                setChangeFile({ type: 'user_image', value: value });
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

export default UpdateBasicDetails;
