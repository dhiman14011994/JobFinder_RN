import { StyleSheet } from 'react-native';
import React from 'react';
import { theme } from '../../Util/constant';
import { fontResize } from '../../Util/font';
import Colors from '../../Resources/Colors';
import { mxHeight, mxWidth } from '../../Util';

const style = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  descriptionText: {
    ...theme.fontRegular,
    fontSize: fontResize(15),
    color: Colors.CodGray,
  },
  imageView: {
    height: mxWidth * 0.6,
    borderRadius: 12,
    width: mxWidth * 0.9,
  },
  imageWebView: {
    height: mxWidth * 0.2,
    borderRadius: 12,
    width: mxWidth * 0.3,
  },
  postImage: {
    height: mxWidth * 0.6,
    resizeMode: 'contain',
    width: mxWidth * 0.9,
  },
  postWebImage: {
    height: mxWidth * 0.2,
    width: mxWidth * 0.2,
    borderRadius: mxWidth * 0.05,
  },
});

export default style;
