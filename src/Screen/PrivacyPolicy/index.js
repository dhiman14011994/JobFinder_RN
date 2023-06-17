import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../../Component/CustomHeader';
import {backIcon} from '../../Resources/assets';
import Strings from '../../Resources/Strings';
import {style} from './style';
import {CustomText} from '../../Component/CustomComponent';
import {fontResize} from '../../Util/font';
import {WebView} from 'react-native-webview';
import {mxHeight} from '../../Util';

const PrivacyPolicy = ({navigation}) => {
  return (
    <SafeAreaView style={style.container}>
      <CustomHeader
        constainerStyle={{paddingHorizontal: 12}}
        leftButtons={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              resizeMode="contain"
              style={{height: 26, width: 26}}
              source={backIcon}
            />
          </TouchableOpacity>
        }
        rightButtons={<></>}
        title={Strings.PRIVACY_POLICY}
      />
      <WebView
        source={{uri: 'https://api.axesseq.com/Privacy-Policy'}}
        style={{height: mxHeight * 0.8, width: '100%'}}
        bounces={false}
      />
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
