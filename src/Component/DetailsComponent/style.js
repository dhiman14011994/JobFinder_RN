import {StyleSheet} from 'react-native';
import Colors from '../../Resources/Colors';
import {fontResize} from '../../Util/font';
export const style = StyleSheet.create({
  addressVw: {
    flexDirection: 'row',
    width: '100%',
  },
  detailsTx: {
    color: Colors.Black,
    fontFamily: 'Gilroy-Bold',
    fontSize: fontResize(19),
  },
});
