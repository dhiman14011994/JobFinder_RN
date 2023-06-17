import { StyleSheet, Dimensions } from 'react-native-web';
import Colors from '../../Resources/Colors';
import { mxHeight, mxWidth } from '../../Util';

export const style = StyleSheet.create({
  container: {
    marginVertical: mxWidth * 0.01,
    paddingVertical: mxWidth * 0.02,
    justifyContent: 'space-between',
    marginRight: mxWidth * 0.01,
    backgroundColor: '#F3F4FE',
    borderRadius: mxWidth * 0.02,
  },
  subContainer: {
    flexDirection: 'row',
    margin: mxWidth * 0.01,
  },
  imageContainer: {
    width: mxWidth * 0.1,
    borderRadius: mxWidth * 0.015,
  },
  jobImage: {
    height: mxWidth * 0.04,
    width: mxWidth * 0.08,
    borderRadius: mxWidth * 0.015,
  },
});
