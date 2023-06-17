import {View, Text, Image, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {CustomText} from '../../../Component/CustomComponent';
import CustomButton from '../../../Component/CustomButton';
import {theme} from '../../../Util/constant';
import {unionIcon, crossIcon} from '../../../Resources/assets';
import Colors from '../../../Resources/Colors';
import {style} from './style';

const CustomDeleteItem = ({name, onRequestClose, visible, deletePress}) => {
  return (
    <Modal
      animationType={'fade'}
      transparent={false}
      visible={visible}
      onRequestClose={() => {
        onRequestClose();
      }}>
      <View style={style.container}>
        <View style={style.subContainer}>
          {/* Header */}

          <View style={style.deleteContainer}>
            <CustomText
              {...theme.fontSemiBold}
              fontSize={'20px'}
              textColor={'#181B1B'}
              textAlign="center">
              Delete Conversation?
            </CustomText>
            <Image
              resizeMode="contain"
              style={style.unionImage}
              source={unionIcon}
            />
            <CustomText
              {...theme.fontRegular}
              fontSize={'15px'}
              textAlign="center">
              {`Are you sure you want to delete ${name} conversation?`}
            </CustomText>
            <View style={style.buttonContainer}>
              <CustomButton
                onPress={() => {
                  deletePress();
                }}
                width={'45%'}
                height={'50px'}
                marginRight={'10%'}
                backgroundColor={'#FF5B51'}
                borderRadius={'10px'}
                alignItems={'center'}
                justifyContent={'center'}
                {...theme.fontSemiBold}
                fontSize={'16px'}
                textColor={Colors.White}
                textTransform={'capitalize'}
                text={'Delete'}
              />
              <CustomButton
                onPress={() => {
                  onRequestClose();
                }}
                width={'45%'}
                height={'50px'}
                backgroundColor={Colors.White}
                borderRadius={'10px'}
                alignItems={'center'}
                justifyContent={'center'}
                {...theme.fontSemiBold}
                fontSize={'16px'}
                textColor={'#8B8B8B'}
                textTransform={'capitalize'}
                text={'Cancel'}
                borderColor={'#8B8B8B'}
                borderWidth={'1px'}
              />
            </View>
          </View>
          <TouchableOpacity
            style={style.crossButton}
            onPress={() => onRequestClose()}>
            <Image
              resizeMode="contain"
              source={crossIcon}
              style={style.crossImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomDeleteItem;
