import { Platform, StatusBar, StyleSheet } from 'react-native';
import Colors from '../../../Resources/Colors';
import { theme } from '../../../Util/constant';
import { fontResize } from '../../../Util/font';
import { mxHeight, mxWidth } from '../../../Util';
import { Dimensions } from 'react-native-web';

const { width, height } = Dimensions.get('window');

export const style = StyleSheet.create({
  container: {
    width: mxWidth,
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.White,
  },

  headerStyle: {
    paddingHorizontal: 20,
  },

  imageStyle: {
    height: 24,
    width: 24,
    tintColor: Colors.Black,
  },

  subContainer: {
    paddingHorizontal: mxWidth * 0.05,
    paddingVertical: mxHeight * 0.02,
  },

  titleStyle: {
    width: mxWidth * 0.6,
    ...theme.fontSemiBold,
    fontSize: fontResize(mxWidth * 0.05),
    color: Colors.Black,
    textAlign: 'center',
  },

  textStyle: {
    ...theme.fontMedium,
    fontSize: fontResize(mxWidth * 0.05),
    color: Colors.DimGray,
  },

  noteStyle: {
    ...theme.fontMedium,
    fontSize: fontResize(mxWidth * 0.04),
    color: Colors.lightGray,
    marginTop: mxHeight * 0.01,
  },

  containerWeb: {
    width: mxWidth,
    flex: 1,
    backgroundColor: Colors.White,
  },

  headerWebStyle: {
    paddingHorizontal: mxWidth * 0.1,
    backgroundColor: 'red',
  },

  titleWebStyle: {
    width: mxWidth * 0.6,
    ...theme.fontSemiBold,
    fontSize: fontResize(mxWidth * 0.07),
    color: Colors.Black,
    textAlign: 'center',
  },
});
