import { StyleSheet, Dimensions } from 'react-native';
import { useWindowDimensions } from 'react-native-web';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';

const { width, height } = Dimensions.get('window');

export const style = StyleSheet.create({
  background: {
    backgroundColor: Colors.PrimaryGray,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    backgroundColor: Colors.White,
    height: width * 0.4,
    borderRadius: width * 0.01,
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.03,
  },

  closeButton: {
    height: height * 0.02,
    width: width * 0.02,
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title2: {
    marginTop: width * 0.01,
  },
});
