import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  marginTop: ({margin}) => ({
    marginTop: margin,
  }),
  marginLeft: ({margin}) => ({
    marginLeft: margin,
  }),
  marginRight: ({margin}) => ({
    marginRight: margin,
  }),
  marginBottom: ({margin}) => ({
    marginBottom: margin,
  }),
  marginHorizontal: ({margin}) => ({
    marginHorizontal: margin,
  }),
  marginVertical: ({margin}) => ({
    marginVertical: margin,
  }),
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  // Setting user Profile style
  profileContainer: ({width, height}) => ({
    flexDirection: 'row',
    width: width * 0.9,
    paddingVertical: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '5%',
  }),
  settingProfileVw: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roundImage: {
    backgroundColor: Colors.Blueberry,
    padding: 10,
    borderRadius: 50,
  },
  buttonStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFB4AE',
    borderRadius: 5,
    // position: 'absolute',
    // bottom: '3%',
  },
  imageStyle: {marginRight: 10, resizeMode: 'contain'},
});
