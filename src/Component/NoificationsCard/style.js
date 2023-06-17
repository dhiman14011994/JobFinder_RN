import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../Resources/Colors';
import {theme} from '../../Util/constant';

export const style = StyleSheet.create({
  container: {
    width: '90%',
    marginHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderTopWidth: 1,
    marginTop: 15,
    padding: 5,
    paddingVertical: 10,
    borderColor: '#F2F2F2',
  },
  termText: {
    ...theme.fontMedium,
    lineHeight: 30,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.White,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  subContainer: {
    width: '60%',
  },
});
