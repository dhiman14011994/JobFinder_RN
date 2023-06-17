import { StyleSheet } from 'react-native';
import { mxHeight, mxWidth } from '../../../Util';
import Colors from '../../../Resources/Colors';
import { fontResize } from '../../../Util/font';
import { Dimensions } from 'react-native-web';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {
    paddingVertical: mxHeight * 0.01,
  },
  titleStyle: {
    color: Colors.DimGray,
    fontSize: fontResize(16),
    fontFamily: 'Gilroy-Regular',
    marginLeft: mxWidth * 0.04,
  },
  buttonWebStyle: {
    paddingVertical: height * 0.01,
  },
  titleWebStyle: {
    color: Colors.DimGray,
    fontSize: fontResize(width * 0.01),
    fontFamily: 'Gilroy-Regular',
    marginStart: width * 0.01,
  },
});
export default styles;
