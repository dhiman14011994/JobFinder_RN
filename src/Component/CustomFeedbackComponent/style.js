import { StyleSheet } from 'react-native';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
import { theme } from '../../Util/constant';
import { mxHeight, mxWidth } from '../../Util';

export const style = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },

  radioStyle: {
    marginLeft: 0,
    paddingLeft: 0,
  },

  titleStyle: {
    ...theme.fontRegular,
    fontSize: fontResize(18),
    color: Colors.lightGray,
  },

  textStyle: {
    ...theme.fontSemiBold,
    fontSize: fontResize(15),
    color: Colors.Black,
  },

  noteStyle: {
    ...theme.fontMedium,
    fontSize: fontResize(13),
    color: Colors.lightGray,
    marginTop: mxHeight * 0.01,
  },

  ReportStyle: {
    marginTop: mxHeight * 0.01,
    ...theme.fontSemiBold,
    fontSize: fontResize(12),
    color: Colors.blue[200],
  },

  radioContainer: {
    paddingVertical: mxWidth * 0.01,
    paddingRight: mxWidth * 0.006,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mxHeight * 0.006,
  },
});
