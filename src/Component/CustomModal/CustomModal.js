import { View, Modal, useWindowDimensions, Dimensions } from 'react-native';
import React from 'react';
import { CustomView, ButtonContainer, CustomText } from '../CustomComponent';
import Colors from '../../Resources/Colors';

const CustomModal = ({ isVisible, cancelVissible, selectImage }) => {
  const window = Dimensions.get('window');
  return (
    <Modal
      visible={isVisible}
      style={{ flex: 1 }}
      onRequestClose={() => cancelVissible(false)}
      transparent={true}
      animationType={'fade'}
    >
      <View
        style={{
          height: window?.height,
          width: window.width,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }}
      >
        <View
          style={{
            width: '90%',
            marginHorizontal: '5%',
            backgroundColor: Colors.White,
            padding: '5%',
            borderRadius: 10,
          }}
        >
          <CustomText fontSize={20} marginBottom={20}>
            {'Select Image'}
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
              Take Photo...
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
              Choose from Gallery...
            </CustomText>
          </ButtonContainer>

          <ButtonContainer
            onPress={() => cancelVissible(false)}
            marginTop={30}
            width={'20%'}
            alignSelf={'flex-end'}
          >
            <CustomText fontSize={15}>Cancel</CustomText>
          </ButtonContainer>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
