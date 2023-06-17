import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
import { mxWidth } from '../../Util';

const { height } = Dimensions.get('window');

export const style = StyleSheet.create({
  conainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  scrollContainer: {
    width: '100%',
  },
  userImageView: ({ height, width }) => ({
    width: width * 0.9,
    marginHorizontal: width * 0.05,
    alignItems: 'center',
  }),
  userNameTx: {
    fontFamily: 'Gilroy-Black',
    fontSize: fontResize(20),
    letterSpacing: 0.4,
    color: Colors.Black,
    marginTop: 10,
  },
  userRoleTx: {
    width: '60%',
    textAlign: 'center',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: fontResize(20),
    letterSpacing: fontResize(height * 0.0008),
    color: Colors.Black,
    marginTop: height * 0.005,
  },
  connectionView: {
    padding: 8,
    backgroundColor: Colors.PrimaryLightBlue,
    borderRadius: 10,
    marginTop: 15,
  },
  connectionTx: {
    color: Colors.Blueberry,
    textDecorationLine: 'underline',
    paddingHorizontal: 10,
    fontFamily: 'Gilroy-Bold',
    fontSize: fontResize(12),
  },
  profileCompletionTx: {
    fontFamily: 'Gilroy-Bold',
    fontSize: fontResize(16),
    color: Colors.Black,
  },
  lineVw: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.Gray,
    marginBottom: 30,
  },
  profileVw: ({ width }) => ({
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  }),

  lineView: ({ width }) => ({
    width: width * 0.25,
    height: 1,
    backgroundColor: Colors.Gray,
  }),
  progressText: {
    color: Colors.Black,
  },
  detailsTx: {
    color: Colors.Black,
    fontFamily: 'Gilroy-Bold',
    fontSize: fontResize(19),
  },
  profileMarginBottom: {
    marginBottom: 5,
  },
  profileMarginTop: {
    marginTop: 25,
  },
  aboutTx: {
    width: '100%',
    marginTop: 20,
    color: Colors.Black,
    fontFamily: 'Gilroy-Bold',
    fontSize: fontResize(19),
  },
  aboutDetailsTx: {
    width: '100%',
    marginTop: 10,
    color: Colors.PrimaryGray1,
    fontFamily: 'Gilroy-Medium',
    fontSize: fontResize(16),
    lineHeight: fontResize(24),
  },
  cvtx: {
    fontFamily: 'Gilroy-Bold',
    fontSize: fontResize(15),
    marginLeft: 30,
    color: Colors.Black,
    width: mxWidth * 0.6,
  },
  pdfVw: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  EditButtonVw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: '3%',
    left: '4%',
  },
  bellBtn: {
    padding: 12,
  },
  editDetails: {
    fontFamily: 'Gilroy-Medium',
    fontSize: fontResize(14),
    lineHeight: fontResize(19),
    color: Colors.Black,
    marginLeft: 10,
  },
  editDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  modalMainContainer: {
    padding: 20,
    backgroundColor: Colors.White,
    alignSelf: 'flex-end',
    marginTop: '10%',
    marginRight: '10%',
    borderRadius: 10,
  },
  educationContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
  },
});
