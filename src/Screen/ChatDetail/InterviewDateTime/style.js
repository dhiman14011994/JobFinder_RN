import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../../Resources/Colors';
import {theme} from '../../../Util/constant';
import {fontResize} from '../../../Util/font';

const {width, height} = Dimensions.get('screen');

export const style = StyleSheet.create({
  calenderView: {
    width: width * 0.9,
    marginHorizontal: width * 0.05,
    backgroundColor: Colors.White,
    marginTop: width * 0.03,
    borderRadius: 20,
  },
  cureentView: {
    marginTop: 30,
    marginHorizontal: width * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toText: {
    marginHorizontal: 10,
  },
  timeButton: {
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.PaleCornflowerBlue,
    borderRadius: 5,
  },
  cureentMonthTx: {
    ...theme.fontMedium,
    color: Colors.Black,
    lineHeight: fontResize(22),
    fontSize: fontResize(18),
  },
  timeTx: {
    ...theme.fontRegular,
    fontSize: fontResize(14),
    color: Colors.Black,
  },
  timeZoneView: {
    paddingVertical: 20,
    marginTop: 10,
    marginHorizontal: width * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(196, 196, 196, 0.5)',
  },
  timeZoneTx: {
    ...theme.fontMedium,
    fontSize: fontResize(14),
    color: Colors.Black,
  },
  zoneTx: {
    ...theme.fontRegular,
    fontSize: fontResize(14),
    color: '#787878',
  },
});
