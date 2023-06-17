import { StyleSheet } from 'react-native';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';

export const style = StyleSheet.create({
  container: {
    width: '100%',
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.SecondaryColor,
    marginVertical: 10,
  },
  titleTx: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: fontResize(16),
    lineHeight: fontResize(19),
    color: Colors.Black,
  },
  dateTimeVw: { width: '45%' },
  dateTx: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: fontResize(12),
    lineHeight: fontResize(24),
    color: Colors.lightGray,
  },
  timeTx: {
    fontFamily: 'Gilroy-Bold',
    fontSize: fontResize(14),
    lineHeight: fontResize(24),
    color: Colors.Black,
  },
});
