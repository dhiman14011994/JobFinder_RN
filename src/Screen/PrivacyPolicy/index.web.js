import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
import Strings from '../../Resources/Strings';

const PrivacyPolicy = () => {
  return (
    <View style={style.container}>
      <iframe
        height="98%"
        style={{ border: 'none' }}
        src="https://api.axesseq.com/Privacy-Policy"
        title="description"
      ></iframe>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: '15%',
    paddingTop: '6%',
  },
  mainText: {
    fontSize: fontResize(22),
    color: Colors.Black,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: fontResize(14),
    color: Colors.DimGray,
    marginTop: '3%',
  },
});

export default PrivacyPolicy;
