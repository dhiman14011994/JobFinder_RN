import { StyleSheet, Dimensions } from 'react-native';
import { isNative } from '../../Util';
import { fontResize } from '../../Util/font';

const { width, height } = Dimensions.get('window');
export const style = StyleSheet.create({
  countryCodeText: {
    fontSize: fontResize(height * 0.018),
    fontFamily: 'Gilroy-Bold',
    color: '#696D6D',
  },
  downIcone: {
    height: height * 0.018,
    width: height * 0.018,
    paddingLeft: height * 0.01,
  },
  inputText: {
    padding: 6,
    color: '#000000',
  },
  errText: {
    marginTop: 10,
    color: 'red',
  },
  enterPhoneText: {
    marginVertical: 12,
    fontFamily: 'Gilroy-SemiBold',
    fontSize: fontResize(16),
    marginTop: 29,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
  },
  countryPicker: {
    padding: isNative ? 6 : 3,
    backgroundColor: '#F7F9FA',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
  },
});
