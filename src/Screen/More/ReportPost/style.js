import { Platform, StatusBar, StyleSheet } from 'react-native';
import Colors from '../../../Resources/Colors';
import { theme } from '../../../Util/constant';
import { fontResize } from '../../../Util/font';
import { mxHeight, mxWidth } from '../../../Util';

export const style = StyleSheet.create({
  container: {
    width: mxWidth,
    height: mxHeight,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.White,
  },

  headerStyle: {
    paddingHorizontal: 20,
  },

  imageStyle: {
    height: 24,
    width: 24,
    tintColor: Colors.DimGray,
  },

  subContainer: {
    paddingHorizontal: mxWidth * 0.05,
    paddingVertical: mxHeight * 0.02,
  },

  titleStyle: {
    width: mxWidth * 0.6,
    ...theme.fontSemiBold,
    fontSize: fontResize(mxWidth * 0.07),
    color: Colors.Black,
    textAlign: 'center',
  },

  ReportStyle: {
    marginTop: mxHeight * 0.01,
    ...theme.fontSemiBold,
    fontSize: fontResize(mxWidth * 0.05),
    color: Colors.blue[200],
  },
});
