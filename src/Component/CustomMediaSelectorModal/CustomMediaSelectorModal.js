import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import { ButtonContainer, CustomText } from '../CustomComponent';
import Colors from '../../Resources/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Strings from '../../Resources/Strings';
import { BLACK_CROSS_ICON } from '../../Resources/assets';

const CustomMediaSelectorModal = ({
  modalVisible,
  selectImage,
  onRequestClose,
  mediaType,
}) => {
  return (
    <Modal
      animated={true}
      animationType={'slide'}
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        onRequestClose();
      }}
    >
      <SafeAreaView style={style.container}>
        <View style={style.subContainer}>
          <TouchableOpacity
            style={style.crossButton}
            onPress={() => {
              onRequestClose();
            }}
          >
            <Image source={BLACK_CROSS_ICON} style={style.blackImage} />
          </TouchableOpacity>
          <CustomText fontSize={20} marginBottom={20}>
            {mediaType == 'image' ? Strings.SELECT_IMAGE : Strings.SELECT_VIDEO}
          </CustomText>
          <ButtonContainer
            onPress={() => {
              selectImage('camera');
            }}
            alignItems="flex-start"
            justifyContent="flex-start"
            width={'90%'}
            marginTop={10}
          >
            <CustomText fontFamily="Gilroy-Medium" fontSize={20}>
              {mediaType == 'image' ? Strings.TAKE_PHOTO : Strings.TAKE_VIDEO}
            </CustomText>
          </ButtonContainer>
          <ButtonContainer
            marginTop={10}
            alignItems="flex-start"
            justifyContent="flex-start"
            width={'90%'}
            onPress={() => {
              selectImage('gallery');
            }}
          >
            <CustomText fontFamily="Gilroy-Medium" fontSize={20}>
              {Strings.CHOOSE_GALLERY}
            </CustomText>
          </ButtonContainer>

          {/* <ButtonContainer
            onPress={() => cancelVissible(false)}
            marginTop={30}
            width={'20%'}
            alignSelf={'flex-end'}
          >
            <CustomText fontSize={15}>Cancel</CustomText>
          </ButtonContainer> */}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    // backgroundColor: `rgba(0, 0, 0, 0.1)`,
  },
  crossButton: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  subContainer: {
    width: '100%',
    backgroundColor: Colors.White,
    padding: '5%',
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 5,
    elevation: 10,
  },
  blackImage: {
    width: 15,
    height: 15,
  },
});

export default CustomMediaSelectorModal;
