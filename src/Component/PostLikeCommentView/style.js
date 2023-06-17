import React from 'react';
import { StyleSheet } from 'react-native';
import { theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  likeText: {
    ...theme.fontRegular,
    fontSize: fontResize(12),
    color: Colors.PrimaryGray1,
  },
  comment: {
    ...theme.fontRegular,
    fontSize: fontResize(12),
    color: Colors.PrimaryGray1,
    paddingHorizontal: 12,
  },
  shareText: {
    ...theme.fontRegular,
    fontSize: fontResize(12),
    color: Colors.PrimaryGray1,
  },
});

export default style;
