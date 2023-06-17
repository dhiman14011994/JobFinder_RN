import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
import { mxWidth } from '../../Util';

const { width, height } = Dimensions.get('window');

export const style = StyleSheet.create({
  conainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  webContainer: {
    width: '95%',
    backgroundColor: Colors.White,
    paddingHorizontal: '5%',
    marginTop: '5%',
    marginRight: '5%',
    borderRadius: height * 0.02,
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
    fontSize: fontResize(height * 0.03),
    letterSpacing: fontResize(height * 0.0008),
    color: Colors.Black,
    marginTop: height * 0.01,
  },
  userRoleTx: {
    width: '60%',
    textAlign: 'center',
    fontFamily: 'Gilroy-SemiBold',
    fontSize: fontResize(height * 0.02),
    letterSpacing: fontResize(height * 0.0008),
    color: Colors.Black,
    marginTop: height * 0.005,
  },
  connectionView: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: Colors.PrimaryLightBlue,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
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
    width: mxWidth * 0.7,
  },
  pdfVw: {
    width: mxWidth * 0.9,
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
    top: '5%',
    right: '4%',
    backgroundColor: '#00000002',
  },
  EditWebButtonVw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: '1%',
    right: '1%',
  },
  bellBtn: {
    padding: 8,
    marginHorizontal: 4,
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
    paddingVertical: 8,
  },
  modalMainContainer: {
    padding: 20,
    backgroundColor: Colors.White,
    alignSelf: 'flex-end',
    marginTop: '12%',
    marginRight: '13%',
    borderRadius: 10,
  },

  // web style
  userDetailsVw: {
    width: '100%',
    alignItems: 'center',
  },
  webProfileCompleteVw: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: '10%',
  },
  webEmptyVw: {
    width: '25%',
    height: 1,
    backgroundColor: Colors.Gray,
  },
  educationContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
  },
});
