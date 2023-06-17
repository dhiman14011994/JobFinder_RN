import { StyleSheet, Platform, Dimensions } from 'react-native';
import Colors from '../../Resources/Colors';
import { mxWidth, isNative, mxHeight } from '../../Util';
import { fontResize } from '../../Util/font';
const { width, height } = Dimensions.get('window');

export const style = StyleSheet.create({
  mainContainer: { backgroundColor: Colors.White, height: '100%' },
  googleContainer: {
    width: mxWidth * 0.38,
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    elevation: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.Gray,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  subConstainer: {
    width: '90%',
    marginHorizontal: '5%',
    backgroundColor: Colors.White,
    borderRadius: 10,
    height: mxHeight * 0.85,
  },
  docImage: {
    width: mxWidth * 0.3,
    height: mxWidth * 0.2,
    borderRadius: 10,
    marginVertical: mxHeight * 0.01,
  },
  docText: {
    fontSize: fontResize(mxHeight * 0.02),
    color: Colors.Black,
    fontFamily: 'Gilroy-Bold',
    width: '90%',
    marginBottom: mxHeight * 0.01,
  },
  dropDownContainer: {
    width: '100%',
    height: height * 0.06,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.Silver,
    marginBottom: height * 0.02,
    marginTop: height * 0.01,
  },
  deleteIcon: {
    width: height * 0.02,
    height: height * 0.02,
  },
  cvView: {
    width: width * 0.7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerCV: {
    width: width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
});
