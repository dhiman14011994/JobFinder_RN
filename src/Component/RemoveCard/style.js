import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../../Resources/Colors';
import { theme } from '../../Util/constant';
import { Dimensions } from 'react-native-web';

const { width, height } = Dimensions.get('window');

export const style = StyleSheet.create({
  blurCardViewIOS: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '10%',
  },
  blurCardViewAndroid: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginHorizontal: '10%',
  },
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    width: '100%',
    backgroundColor: Colors.White,
    borderRadius: 20,
    padding: '5%',
    justifyContent: 'space-between',
  },
  buttonVw: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
  },
  background: {
    backgroundColor: Colors.PrimaryGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerView: {
    backgroundColor: Colors.White,
    borderRadius: width * 0.01,
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.03,
  },
  webButtonVw: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
