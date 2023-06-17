import { StyleSheet } from 'react-native';
import React from 'react';
import { theme } from '../../Util/constant';
import { fontResize } from '../../Util/font';
import Colors from '../../Resources/Colors';
import { mxHeight, mxWidth } from '../../Util';

const style = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  subContainer: {
    flexDirection: 'row',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeImage: {
    height: 22,
    width: 22,
  },
  likeText: {
    ...theme.fontRegular,
    fontSize: 12,
    color: '#777E90',
    paddingLeft: 6,
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
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
  postImage: {
    height: mxWidth * 0.6,
    resizeMode: 'contain',
    width: mxWidth * 0.9,
  },
});

export default style;
