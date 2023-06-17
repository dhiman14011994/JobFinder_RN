import {StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyVw: {
    flex: 1,
    height: Dimensions.get('screen').height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
