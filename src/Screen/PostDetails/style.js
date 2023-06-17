import { Dimensions, Platform, StyleSheet } from 'react-native';
import React from 'react';
import { mxHeight, mxWidth } from '../../Util';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
const webWidth = Dimensions.get('window').width;
const webHeight = Dimensions.get('window').height;

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    width: mxWidth,
    height: Platform.OS == 'ios' ? mxHeight : '100%',
    paddingHorizontal: mxWidth * 0.05,
  },
  webContainer: {
    backgroundColor: Colors.White,
    width: webWidth,
    height: webHeight * 0.9,
    paddingHorizontal: webWidth * 0.1,
  },
  subContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  backButtonStyle: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: Colors.GhostWhite,
  },
  sendBtn: {
    width: mxWidth * 0.13,
    height: mxWidth * 0.1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sendWebBtn: {
    width: mxWidth * 0.13,
    height: webHeight * 0.08,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sendText: {
    color: Colors.White,
  },
  inoutVw: {
    width: '80%',
  },
  sendingButtonView: {
    width: '36%',
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '2%',
  },
  sendingWebButtonView: {
    width: '36%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '2%',
  },
  msgTxtInpt: {
    fontSize: 12,
    width: '100%',
    color: Colors.Black,
    borderColor: Colors.Gray,
    minHeight: 30,
    maxHeight: 100,
    paddingLeft: '5%',
  },
  msgWebTxtInpt: {
    width: '100%',
    color: Colors.Black,
    borderColor: Colors.Gray,
    height: webHeight * 0.025,
    paddingLeft: '5%',
    fontSize: fontResize(mxHeight * 0.018),
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  textVwCntnr: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 0,
    alignItems: 'center',
    flexDirection: 'row',

    alignSelf: 'center',
    backgroundColor: Colors.White,
  },
  textWebVwCntnr: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 0,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: Colors.White,
  },
});

export default style;
