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
});
