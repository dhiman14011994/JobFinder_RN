import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../Resources/Colors';
import {theme} from '../../Util/constant';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    backgroundColor: Colors.White,
  },
  termText: {
    ...theme.fontMedium,
    lineHeight: 30,
  },
});
