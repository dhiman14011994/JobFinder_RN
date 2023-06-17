import React from 'react';
import { View, Image, Modal, TouchableOpacity } from 'react-native';
import { theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';
import { CustomText } from '../CustomComponent';
import { fontResize } from '../../Util/font';
import styles from './style';
import { unionIcon } from '../../Resources/assets';
import Strings from '../../Resources/Strings';
import { mxHeight, mxWidth } from '../../Util';
import Type from '../../Constants/Type/type';

const CustomConfirmationModal = ({ isModal, setModal, data, setSelection }) => {
  return (
    <Modal
      visible={isModal}
      onRequestClose={() => {
        setModal(!isModal);
      }}
      transparent={true}
      animationType={'fade'}
    >
      <View style={styles.container}>
        <View style={styles.subConatiner}>
          <CustomText
            textAlign={'center'}
            {...theme.fontBold}
            fontSize={fontResize(mxWidth * 0.08)}
            textColor={Colors.Black}
          >
            {data?.title}
          </CustomText>

          <Image style={styles.imageStyle} source={unionIcon} />
          <CustomText
            style={{ margin: mxHeight * 0.1 }}
            textAlign={'center'}
            {...theme.fontMedium}
            fontSize={fontResize(mxWidth * 0.06)}
            textColor={Colors.drakGray}
          >
            {data?.desc}
          </CustomText>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                setSelection(Type.CONFIRMATION.YES);
                setModal(!isModal);
              }}
            >
              <CustomText
                textAlign={'center'}
                {...theme.fontMedium}
                fontSize={fontResize(mxWidth * 0.05)}
                textColor={Colors.White}
              >
                {Strings.YES}
              </CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelection(Type.CONFIRMATION.NO);
                setModal(!isModal);
              }}
              style={styles.button2Style}
            >
              <CustomText
                textAlign={'center'}
                {...theme.fontMedium}
                fontSize={fontResize(mxWidth * 0.05)}
                textColor={Colors.DimGray}
              >
                {Strings.NO}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomConfirmationModal;
