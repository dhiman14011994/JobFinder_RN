import { StyleSheet, Platform, Dimensions } from 'react-native';
import Colors from '../../Resources/Colors';
import { mxWidth, isNative, mxHeight } from '../../Util';
import { fontResize } from '../../Util/font';
const { width, height } = Dimensions.get('window');

export const style = StyleSheet.create({
  webContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  subconstainer: {
    // flex: 1,
    // height: mxHeight,
    backgroundColor: Colors.White,
  },
  scrollView: {
    width: isNative ? '80%' : width > 500 ? '30%' : '80%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: isNative ? 0 : '10%',
    marginHorizontal: isNative ? '10%' : 0,
    borderRadius: isNative ? 0 : 20,
    // height: isNative ? '100%' : '90%',
  },
  accountTypeHeader: {
    fontSize: isNative ? fontResize(30) : fontResize(height * 0.035),
    marginTop: height * 0.06,
    fontWeight: 'bold',
    marginLeft: Platform.OS !== 'web' ? 0 : '10%',
  },
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: '#fff',
  },
  link: {
    color: '#1B95E0',
  },
  button: {
    borderRadius: 3,
    padding: 20,
    marginVertical: 10,
    marginTop: 10,
    backgroundColor: '#1B95E0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectText: {
    fontSize: isNative ? fontResize(30) : fontResize(height * 0.035),
    marginLeft: isNative ? 0 : '10%',
    color: Colors.EerieBlack,
    fontFamily: 'Gilroy-Bold',
    // marginTop: isNative ? '10%' : 0,
  },
});
