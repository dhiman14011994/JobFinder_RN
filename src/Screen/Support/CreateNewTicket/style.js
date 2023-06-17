import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fontResize } from '../../../Util/font';
import Colors from '../../../Resources/Colors';

export const style = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    flex: 1,
  },

  leftView: {
    width: '50%',
    paddingTop: '3%',
  },

  textInput: {
    height: '11%',
    width: '70%',
    borderWidth: 0.5,
    borderColor: Colors.DimGray,
    borderRadius: 10,
    marginTop: '2%',
    backgroundColor: Colors.gray2,
  },

  uploadText: {
    marginTop: '5%',
    color: Colors.lightGray,
    fontSize: fontResize(window.width * 0.01),
  },
});
