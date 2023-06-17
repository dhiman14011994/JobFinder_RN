import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';

const { width, height } = Dimensions.get('screen');
const window = Dimensions.get('window');

export const style = StyleSheet.create({
  subContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  emptyView: {
    width: '100%',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
  },
  sendBtn: {
    // marginLeft: '5%',
    width: width * 0.15,
    height: width * 0.1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Blueberry,
    marginRight: 10,
  },
  sendBtnWeb: {
    // marginLeft: '5%',
    width: window.width * 0.04,
    height: window.width * 0.03,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Blueberry,
    marginRight: 3,
  },
  emojBtn: {
    // marginLeft: '5%',
    width: 20,
    height: 20,
  },
  emojBtnWeb: {
    // marginLeft: '5%',
    width: window.width * 0.02,
    height: window.width * 0.02,
  },
  sendImg: {
    height: window.width * 0.04,
    width: window.width * 0.04,
    resizeMode: 'contain',
  },
  sendImgWeb: {
    height: window.width * 0.015,
    width: window.width * 0.015,
    resizeMode: 'contain',
  },
  msgTxtInpt: {
    fontSize: fontResize(height * 0.02),
    width: '100%',
    color: Colors.Black,
    borderColor: Colors.Gray,
    minHeight: 30,
    maxHeight: 100,
    paddingLeft: '5%',
  },
  msgTxtInptWeb: {
    fontSize: fontResize(height * 0.02),
    width: '96%',
    color: Colors.Black,
    marginHorizontal: '2%',
    borderColor: Colors.Gray,
    paddingLeft: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    // outlineColor: 'white',
  },
  inoutVw: {
    width: '60%',
  },
  sendingButtonView: {
    width: '40%',
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textVwCntnr: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 10,
    borderWidth: 1,
    // padding: 8,
    paddingVertical: 0,
    alignItems: 'center',
    flexDirection: 'row',
    // position: 'absolute',
    bottom: 5,

    alignSelf: 'center',
    backgroundColor: Colors.White,
  },
  pdfContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: width,
    height: height,
  },
  cureentDateStyle: {
    color: Colors.White,
  },
  cureentBlockStyle: {
    color: Colors.lightGray,
    fontSize: fontResize(12),
  },
  cureentDateViewStyle: {
    padding: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Blueberry,
    borderRadius: 8,
    marginVertical: height * 0.05,
  },
  cureentBlockViewStyle: {
    padding: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray11,
    borderRadius: 8,
    marginVertical: height * 0.05,
  },
});
