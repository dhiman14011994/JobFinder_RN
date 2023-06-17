import { StyleSheet } from 'react-native';
import { mxHeight, mxWidth } from '../../Util';
import Colors from '../../Resources/Colors';
import { theme } from '../../Util/constant';
import { fontResize } from '../../Util/font';

export const style = StyleSheet.create({
  containerStyle: {
    marginBottom: mxHeight * 0.03,
    // height: mxHeight * 0.6,
    width: mxWidth * 0.9,
    borderRadius: mxWidth * 0.08,
    backgroundColor: 'rgba(255,255,255,0.4)',
    padding: mxWidth * 0.06,
  },

  titleStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '95%',
    ...theme.fontSemiBold,
    fontSize: fontResize(20),
    color: Colors.Black,
    marginTop: '4%',
  },

  numberContainer: {
    width: mxWidth * 0.09,
    height: mxWidth * 0.09,
    alignItems: 'center',
    backgroundColor: Colors.Black,
    justifyContent: 'center',
    borderRadius: (mxWidth * 0.09) / 2,
    borderWidth: 1,
  },

  numberStyle: {
    ...theme.fontBold,
    fontSize: fontResize(15),
    color: Colors.White,
  },

  imageStyle: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    borderRadius: mxHeight * 0.02,
  },
  imageViewStyle: {
    marginVertical: '8%',
    height: mxHeight * 0.5,
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: mxHeight * 0.02,
    overflow: 'hidden',
  },
});
