import {StyleSheet} from 'react-native';
import Colors from '../../Resources/Colors';
import {fontResize} from '../../Util/font';
export const style = StyleSheet.create({
  addressVw: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 12,
  },
  addressTx: {
    width: '80%',
    color: Colors.PrimaryGray1,
    fontFamily: 'Gilroy-Medium',
    fontSize: fontResize(16),
    lineHeight: fontResize(23),
    letterSpacing: 0.4,
    marginLeft: 10,
  },
});
