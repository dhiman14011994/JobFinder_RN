import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

const style = StyleSheet.create({
  container: {
    maxWidth: width * 0.7,
    marginHorizontal: width * 0.05,
    marginBottom: width * 0.05,
    padding: 10,
    borderRadius: 10,
  },
  containerWeb: {
    maxWidth: width * 0.7,
    marginHorizontal: width * 0.01,
    marginBottom: width * 0.05,
    padding: 10,
    borderRadius: 10,
  },
  imageView: {
    width: 80,
    height: 80,
  },
  userImageView: {
    width: 15,
    height: 15,
    borderRadius: 30,
    position: 'absolute',
    bottom: -20,
    right: 0,
  },
});

export default style;
