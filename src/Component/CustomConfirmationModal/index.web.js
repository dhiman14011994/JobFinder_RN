import React from 'react';
import {
  View,
  Image,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';
import { CustomText } from '../CustomComponent';
import { fontResize } from '../../Util/font';
import styles from './style';
import { unionIcon } from '../../Resources/assets';
import Strings from '../../Resources/Strings';
import { mxHeight, mxWidth } from '../../Util';
import Type from '../../Constants/Type/type';

const CustomConfirmationWebModal = ({
  isModal,
  setModal,
  data,
  setSelection,
}) => {
  const { width, height } = useWindowDimensions();
  return (
    <Modal
      visible={isModal}
      onRequestClose={() => {
        setModal(!isModal);
      }}
      transparent={true}
      animationType={'fade'}
    >
      <View
        style={{
          width: width,
          height: height,
          backgroundColor: 'rgba(0,0,0,0.4)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={styles.subWebConatiner}>
          <CustomText
            textAlign={'center'}
            {...theme.fontBold}
            fontSize={fontResize(mxWidth * 0.02)}
            textColor={Colors.Black}
          >
            {data?.title}
          </CustomText>

          <Image style={styles.imageStyle} source={unionIcon} />
          <CustomText
            style={{ margin: mxHeight * 0.001 }}
            textAlign={'center'}
            {...theme.fontMedium}
            fontSize={fontResize(mxWidth * 0.015)}
            textColor={Colors.drakGray}
          >
            {data?.desc}
          </CustomText>

          <View style={styles.buttonWebContainer}>
            <TouchableOpacity
              style={styles.buttonWebStyle}
              onPress={() => {
                setSelection(Type.CONFIRMATION.YES);
                setModal(!isModal);
              }}
            >
              <CustomText
                textAlign={'center'}
                {...theme.fontMedium}
                fontSize={fontResize(mxWidth * 0.02)}
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
              style={styles.button2WebStyle}
            >
              <CustomText
                textAlign={'center'}
                {...theme.fontMedium}
                fontSize={fontResize(mxWidth * 0.02)}
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

export default CustomConfirmationWebModal;
