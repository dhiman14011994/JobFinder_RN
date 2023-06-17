import { TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../Component/CustomHeader';
import { backIcon } from '../../Resources/assets';
import Strings from '../../Resources/Strings';
import { style } from './style';

import { WebView } from 'react-native-webview';

const TermsCondition = ({ navigation }) => {
  const window = useWindowDimensions();

  return (
    <SafeAreaView style={style.container}>
      <CustomHeader
        constainerStyle={{ paddingHorizontal: 12 }}
        leftButtons={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              resizeMode="contain"
              style={{ height: 26, width: 26 }}
              source={backIcon}
            />
          </TouchableOpacity>
        }
        rightButtons={<></>}
        title={Strings.TERMS_CONDITION}
      />

      <WebView
        source={{ uri: 'https://api.axesseq.com/terms-of-use' }}
        style={{ height: window.height * 0.8, width: '100%' }}
        bounces={false}
      />
    </SafeAreaView>
  );
};

export default TermsCondition;
