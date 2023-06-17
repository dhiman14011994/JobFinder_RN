import {StyleSheet} from 'react-native';
import Colors from '../../../Resources/Colors';
import {fontResize} from '../../../Util/font';

export const style = StyleSheet.create({
  conainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  addCertificateTx: {
    marginTop: 30,
    fontFamily: 'Gilroy-Bold',
    fontSize: fontResize(16),
    lineHeight: fontResize(24),
    color: Colors.Black,
  },
  userNameTx: {
    fontFamily: 'Gilroy-Black',
    fontSize: fontResize(20),
    letterSpacing: 0.4,
    color: Colors.Black,
    marginTop: 10,
  },
  userRoleTx: {
    fontFamily: 'Gilroy-Regular',
    fontSize: fontResize(14),
    letterSpacing: 0.4,
    color: Colors.PrimaryGray1,
    marginTop: 5,
  },
  profileVw: ({width}) => ({
    width: width * 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  basicInfoVw: {
    width: '100%',
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.PrimaryGray,
    justifyContent: 'center',
  },
  followersTx: {
    fontFamily: 'Gilroy-Regular',
    color: Colors.Blueberry,
    textDecorationLine: 'underline',
    fontSize: fontResize(16),
    lineHeight: fontResize(24),
    letterSpacing: 0.5,
    // marginTop: '5%',
  },
  seeAllVw: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentTx: {
    fontSize: fontResize(19),
    fontFamily: 'Gilroy-Regular',
    lineHeight: fontResize(28),
    color: Colors.Black,
  },
  seeAllTx: {
    fontSize: fontResize(12),
    fontFamily: 'Gilroy-Regular',
    lineHeight: fontResize(18),
    color: Colors.PrimaryGray,
    textDecorationLine: 'underline',
  },
  viewAllTx: {
    fontSize: fontResize(12),
    fontFamily: 'Gilroy-Regular',
    lineHeight: fontResize(18),
    color: Colors.Blueberry,
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
});
