import { Image, Dimensions, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { mxHeight, mxWidth } from '../../Util';
import { LockPlanIcon, logo, CancelPlanIcon } from '../../Resources/assets';
import { CustomText } from '../CustomComponent';
import { theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
import CustomButton from '../CustomButton';
const UnlockFullAccess = ({ onUnlock, OnCancel, isCancel }) => {
  const { height, width } = Dimensions.get('window');
  return (
    <View
      style={{
        backgroundColor: '#4386C6',
        borderRadius: 12,
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginBottom: 10,
      }}
    >
      {isCancel && (
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={OnCancel}>
            <Image
              style={{ height: height * 0.015, width: width * 0.015 }}
              source={CancelPlanIcon}
            />
          </TouchableOpacity>
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 12,
        }}
      >
        <Image
          resizeMode="contain"
          style={{ height: height * 0.04, width: width * 0.04 }}
          source={LockPlanIcon}
        />

        <CustomText
          {...theme.fontBold}
          fontSize={`${fontResize(height * 0.025)}px`}
          textTransform={'none'}
          textColor={Colors.White}
        >
          {'Unlock Full'}
        </CustomText>

        <Image
          paddingHorizontal={10}
          resizeMode="contain"
          style={{ height: height * 0.03, width: width * 0.08 }}
          source={logo}
        />
      </View>

      <CustomText
        {...theme.fontRegular}
        textAlign={'center'}
        fontSize={`${fontResize(height * 0.02)}px`}
        textTransform={'none'}
        textColor={Colors.White}
      >
        {'See who viewed your profile and many other exciting features'}
      </CustomText>
      <CustomText
        marginTop={'12px'}
        marginBottom={'12px'}
        textAlign={'center'}
        {...theme.fontSemiBold}
        fontSize={`${fontResize(height * 0.02)}px`}
        textTransform={'none'}
        textColor={Colors.White}
      >
        {'only in $19.99/year'}
      </CustomText>

      <CustomButton
        onPress={() => {
          onUnlock();
        }}
        width={width * 0.3}
        height={'40px'}
        backgroundColor={Colors.LightOrangeColor}
        borderRadius={'10px'}
        alignItems={'center'}
        justifyContent={'center'}
        {...theme.fontSemiBold}
        fontSize={`${fontResize(height * 0.02)}px`}
        textColor={Colors.White}
        textTransform={'capitalize'}
        text={'Unlock'}
      />
    </View>
  );
};

export default UnlockFullAccess;
