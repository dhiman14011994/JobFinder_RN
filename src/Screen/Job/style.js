import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../Resources/Colors';
import { isNative } from '../../Util';
import { fontResize } from '../../Util/font';
import styled from 'styled-components/native';
const { width, height } = Dimensions.get('window');
export const style = StyleSheet.create({
  // View
  container: {
    flex: 1,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  profileContainer: {
    width: '25%',
  },
  jobContainer: {
    width: '48%',
    flex: 1,
    borderRadius: height * 0.02,
    marginTop: 18,
    marginLeft: 18,
    marginRight: 18,
    backgroundColor: Colors.White,
    overflow: 'hidden',
  },
});
