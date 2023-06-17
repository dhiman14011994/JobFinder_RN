import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  subContainer: {
    width: '90%',
    marginHorizontal: '5%',
  },
  questionVw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qaContainer: {
    width: '100%',
    paddingVertical: 20,
    marginTop: 20,
  },
});
