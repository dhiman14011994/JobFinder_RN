import { StyleSheet } from 'react-native';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
export const style = StyleSheet.create({
  addressVw: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 12,
  },
  titleTx: {
    color: Colors.Black,
    fontFamily: 'Gilroy-Medium',
    fontSize: fontResize(16),
    lineHeight: fontResize(24),
    letterSpacing: 0.4,
    marginLeft: 10,
  },
  detailsTx: {
    color: Colors.PrimaryGray1,
    fontFamily: 'Gilroy-Medium',
    fontSize: fontResize(14),
    lineHeight: fontResize(20),
    letterSpacing: 0.4,
    marginLeft: 10,
  },
  dateTx: {
    color: Colors.PrimaryGray1,
    fontFamily: 'Gilroy-Medium',
    fontSize: fontResize(14),
    lineHeight: fontResize(20),
    letterSpacing: 0.4,
    marginLeft: 10,
  },
  roleTx: {
    color: Colors.Black,
    fontFamily: 'Gilroy-Medium',
    fontSize: fontResize(14),
    lineHeight: fontResize(20),
    letterSpacing: 0.4,
  },
  yourExperience: {
    width: '95%',
    color: Colors.Black,
    fontFamily: 'Gilroy-Medium',
    fontSize: fontResize(14),
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 20,
  },
});
