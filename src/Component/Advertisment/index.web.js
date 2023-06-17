//import liraries
import React, { Component } from 'react';
import { View, Dimensions, Image, TouchableOpacity } from 'react-native-web';
import Modal from 'modal-enhanced-react-native-web';
import { theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';
import { CustomText } from '../CustomComponent';
import { fontResize } from '../../Util/font';
import Strings from '../../Resources/Strings';
import { CancelPlanIcon } from '../../Resources/assets';

// create a component
const AdvertisementModal = ({ showModal, setModalVisibility }) => {
  const { width, height } = Dimensions.get('window');
  return (
    <Modal
      animationType="transparent"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setModalVisibility(!showModal);
      }}
    >
      <View
        style={{
          width: width * 0.7,
          height: height * 0.3,
          alignSelf: 'center',
          marginTop: 10,
          flexDirection: 'column',
          shadowColor: Colors.gray2,
          backgroundColor: Colors.Blueberry,
          padding: 10,
          overflow: 'hidden',
          shadowRadius: 20,
          shadowOpacity: 1,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <TouchableOpacity onPress={() => setModalVisibility(!showModal)}>
            <Image
              style={{
                width: 20,
                height: 20,
                marginTop: 20,
                tintColor: 'black',
                justifyContent: 'end',
              }}
              source={CancelPlanIcon}
            />
          </TouchableOpacity>
        </View>

        <View>
          <CustomText
            textAlign={'center'}
            {...theme.fontMedium}
            fontSize={`${fontResize(width * 0.07)}px`}
            font-family={'Gilroy-Bold'}
            textColor={Colors.Black}
          >
            {Strings.ADVERTISEMENT}
          </CustomText>
        </View>
      </View>
    </Modal>
  );
};

//make this component available to the app
export default AdvertisementModal;
