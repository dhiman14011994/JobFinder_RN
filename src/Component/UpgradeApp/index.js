import { View, Text, Image, Platform, Linking } from 'react-native';
import React from 'react';
import Colors from '../../Resources/Colors';
import { mxHeight, mxWidth } from '../../Util';
import Strings from '../../Resources/Strings';
import CustomButton from './../CustomButton';
import { logo } from '../../Resources/assets';
const UpgradeApp = () => {
  return (
    <View
      style={{
        flex: 1,
        width: mxWidth,
        backgroundColor: Colors.Blueberry,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={logo}
        resizeMode="contain"
        style={{ width: '70%', height: '15%' }}
      />
      <CustomButton
        width={'80%'}
        marginTop={0}
        height={55}
        backgroundColor={Colors.White}
        borderRadius={'10px'}
        alignItems={'center'}
        justifyContent={'center'}
        fontFamily={'Gilroy-SemiBold'}
        fontSize={'18px'}
        textColor={Colors.Blueberry}
        onPress={() => {
          if (Platform.OS === 'android') {
            const appURL =
              'https://play.google.com/store/apps/details?id=com.axesseq';
            if (Linking.canOpenURL(appURL)) {
              Linking.openURL(appURL);
            }
          } else {
            const appURL = 'https://apps.apple.com/us/app/axesseq/id6444820689';
            if (Linking.canOpenURL(appURL)) {
              Linking.openURL(appURL);
            }
          }
        }}
        text={Strings.UPGRADE_APP}
      />
    </View>
  );
};

export default UpgradeApp;
