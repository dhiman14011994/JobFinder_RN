import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../../Resources/Colors';
import { mxHeight } from '../../Util';
import { theme } from '../../Util/constant';

export const style = StyleSheet.create({
  linearContainer: {
    borderRadius: 12,
    marginVertical: 22,
    padding: 12,
    width: '100%',
  },
  constainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linearPromoteView: {
    height: 60,
    width: '40%',
    borderRadius: 12,
    borderColor: Colors.White,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomVw: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  userName: {
    ...theme.fontBold,
    fontSize: 18,
    color: Colors.White,
    textTransform: 'capitalize',
  },
  userSkillTx: {
    ...theme.fontRegular,
    fontSize: 14,
    color: Colors.White,
    width: 100,
  },
  promoteText: {
    ...theme.fontSemiBold,
    fontSize: 14,
    color: Colors.White,
    textAlign: 'center',
  },
  freeText: {
    ...theme.fontRegular,
    fontSize: 16,
    color: Colors.White,
    paddingVertical: 8,
  },
  userImg: {
    height: 55,
    width: 55,
    borderRadius: 50,
  },
  rightImage: {
    height: 18,
    width: '25%',
  },

  // web style
  webContainer: {
    paddingLeft: 22,
    paddingRight: 22,
    backgroundColor: Colors.White,
    borderRadius: 22,
    flex: 1,
  },

  linearWebContainer: {
    borderRadius: 12,
    marginVertical: 22,
    padding: 12,
  },
  constainerWeb: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linearPromoteViewWeb: {
    height: 60,
    width: '40%',
    borderRadius: 12,
    borderColor: Colors.White,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomVwWeb: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  userNameWeb: {
    ...theme.fontBold,
    fontSize: 18,
    color: Colors.White,
    textTransform: 'capitalize',
  },
  userSkillTxWeb: {
    ...theme.fontRegular,
    fontSize: 16,
    color: Colors.White,
  },
  promoteTextWeb: {
    ...theme.fontSemiBold,
    fontSize: 14,
    color: Colors.White,
    textAlign: 'center',
  },
  freeTextWeb: {
    ...theme.fontRegular,
    fontSize: 16,
    color: Colors.White,
    paddingVertical: 8,
  },
  userImgWeb: {
    height: 55,
    width: 55,
    borderRadius: 50,
  },
  rightImageWeb: {
    height: 18,
    width: '25%',
  },
});
