//import liraries
import React, { useMemo } from 'react';
import {
  TouchableOpacity,
  useWindowDimensions,
  Image,
  Modal,
  View,
} from 'react-native-web';
import Colors from '../../Resources/Colors';
import Strings from '../../Resources/Strings';
import { theme } from '../../Util/constant';
import { fontResize } from '../../Util/font';
import { CustomText } from '../CustomComponent';
import Type from '../../Constants/Type/type';
import { useDropzone } from 'react-dropzone';
import { setLoading } from '../../Redux/actions/authAction';
import { imageUplaod } from '../../Redux/services/profileService';
import { useDispatch } from 'react-redux';

const ImagePickerModal = ({
  showPickerModal,
  setPickerModal,
  setSelection,
  token,
}) => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/jpeg': ['.jpeg'],
      'image/png': ['.png'],
    },
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
          token: token,
        });
        dispatch(setLoading(false));
        setSelection(getImageURI.data[0]);
      } catch (err) {
        dispatch(setLoading(false));
      }
    },
  });

  return (
    <Modal
      animationType="transparent"
      transparent={true}
      visible={showPickerModal}
      onRequestClose={() => {
        setPickerModal(!showPickerModal);
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: width * 0.2,
            alignSelf: 'center',
            marginTop: 10,
            justifyContent: 'center',
            shadowColor: Colors.gray2,
            backgroundColor: Colors.White,
            padding: 20,
            overflow: 'hidden',
            shadowRadius: 20,
            shadowOpacity: 1,
            borderRadius: 10,
            flexDirection: 'column',
          }}
        >
          <CustomText
            textAlign={'flex-start'}
            {...theme.fontBold}
            fontSize={`${fontResize(16)}px`}
            textColor={Colors.Black}
          >
            {Strings.SELECT_IMAGE}
          </CustomText>

          <TouchableOpacity style={{ marginTop: 15 }}>
            <div
              {...getRootProps({
                className: 'dropzone',
              })}
            >
              <input {...getInputProps()} />

              <CustomText
                textAlign={'flex-start'}
                {...theme.fontMedium}
                marginTop={15}
                fontSize={`${fontResize(16)}px`}
                textColor={Colors.Black}
              >
                {Strings.GALLERY}
              </CustomText>
            </div>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelection(Type.IMAGE_TYPE.CAMERA);
            }}
          >
            <CustomText
              textAlign={'flex-start'}
              {...theme.fontMedium}
              marginTop={15}
              fontSize={`${fontResize(16)}px`}
              textColor={Colors.Black}
            >
              {Strings.CAMERA}
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setPickerModal(!showPickerModal);
            }}
          >
            <CustomText
              textAlign={'flex-end'}
              {...theme.fontMedium}
              marginTop={15}
              fontSize={`${fontResize(16)}px`}
              textColor={Colors.Black}
            >
              {Strings.CANCEL}
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ImagePickerModal;
