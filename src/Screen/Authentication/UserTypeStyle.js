import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../Resources/Colors';
import { isNative, mxWidth } from '../../Util';
import { fontResize } from '../../Util/font';
const { width, height } = Dimensions.get('window');
export const style = StyleSheet.create({
  buttonContainer: {
    width: isNative ? '100%' : '80%',
    marginHorizontal: isNative ? 0 : '10%',
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.08,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  buttonTextStyle: {
    fontSize: isNative ? fontResize(18) : 18,
    fontFamily: 'Gilroy-SemiBold',
  },
  imageStyle: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  webContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E5E5',
  },
  subconstainer: {
    // flex: 1,
    width: '80%',
    height: '100%',
    marginHorizontal: '10%',
    backgroundColor: Colors.White,
  },
  scrollView: {
    width: isNative ? '100%' : width > 500 ? '40%' : '80%',
    backgroundColor: '#fff',
    paddingHorizontal: isNative ? '0%' : '10%',
    borderRadius: isNative ? 0 : 20,
    paddingVertical: isNative ? 0 : 100,
  },
  selectText: {
    fontSize: isNative ? fontResize(30) : fontResize(height * 0.03),
    marginTop: height * 0.1,
    marginLeft: isNative ? 0 : '10%',
    color: isNative ? Colors.EerieBlack : Colors.Black,
    fontFamily: 'Gilroy-Bold',
  },
  donotTx: {
    position: 'absolute',
    bottom: '5%',
    left: '10%',
    fontSize: fontResize(16),
    color: Colors.drakGray,
    fontFamily: 'Gilroy-Regular',
  },
  signupTx: {
    color: Colors.Blueberry,
    fontFamily: 'Gilroy-SemiBold',
    textDecorationLine: 'underline',
  },
});
