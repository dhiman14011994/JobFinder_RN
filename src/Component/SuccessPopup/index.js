import {View, Text, Image, Modal, useWindowDimensions} from 'react-native';
import React from 'react';
import Colors from '../../Resources/Colors';
import Strings from '../../Resources/Strings';
import {CustomText} from '../CustomComponent';
import {success} from '../../Resources/assets';
import CustomButton from '../../Component/CustomButton';
import {fontResize} from '../../Util/font';
const SuccessPopup = ({showSuccess, onPressDone, showMessage}) => {
  const window = useWindowDimensions();
  return (
    <View>
      <Modal
        // animated={true}
        animationType={'slide'}
        onDismiss={() => {
          console.log('Modal has been closed');
          // alert("Modal has been closed.");
          //   backToHome();
        }}
        // transparent={true}
        visible={showSuccess}>
        <View
          style={{
            backgroundColor: Colors.lightGray,
            flex: 1,
          }}>
          <View
            style={{
              backgroundColor: Colors.White,
              borderTopEndRadius: 32,
              borderTopStartRadius: 32,
              marginTop: window.width * 0.3,
              flex: 1,
              paddingLeft: window.width * 0.05,
              paddingRight: window.width * 0.05,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                width: window.width * 0.3,
                height: window.width * 0.3,
              }}
              resizeMode="cover"
              source={success}
            />
            <CustomText
              fontFamily={'Gilroy-Bold'}
              textColor={Colors.Black}
              fontSize={fontResize(24)}
              style={{paddingVertical: window.width * 0.05}}>
              {showMessage || Strings.SUCCESSFULLY_APPLIED}
            </CustomText>
            <CustomButton
              onPress={() => {
                onPressDone();
              }}
              buttonContainer={{position: 'absolute', bottom: 0}}
              width={'100%'}
              height={'50px'}
              backgroundColor={Colors.Blueberry}
              marginTop={window.height * 0.03}
              marginBottom={window.height * 0.1}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              fontFamily={'Gilroy-SemiBold'}
              fontSize={'18px'}
              textColor={Colors.White}
              text={Strings.OK}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SuccessPopup;
