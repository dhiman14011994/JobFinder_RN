import { Platform, StatusBar, StyleSheet } from 'react-native';
import Colors from '../../Resources/Colors';
import { theme } from '../../Util/constant';
import { fontResize } from '../../Util/font';
import { mxHeight, mxWidth } from '../../Util';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.Blueberry,
  },

  imageContainer: {
    alignItems: 'center',
  },

  titleStyle: {
    width: mxWidth * 0.6,
    ...theme.fontBold,
    fontSize: fontResize(40),
    color: Colors.White,
    textAlign: 'center',
  },

  subTitleStyle: {
    paddingVertical: mxHeight * 0.02,
    width: mxWidth * 0.6,
    ...theme.fontSemiBold,
    fontSize: fontResize(35),
    color: Colors.White,
    textAlign: 'center',
  },
});
