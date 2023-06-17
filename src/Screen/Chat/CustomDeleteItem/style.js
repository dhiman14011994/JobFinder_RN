import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../../Resources/Colors';

const {width, height} = Dimensions.get('screen');

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    marginHorizontal: '5%',
    width: '90%',
    paddingVertical: 30,
    borderRadius: 20,
    backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteContainer: {
    paddingHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unionImage: {
    width: 40,
    height: 40,
    marginVertical: 30,
  },
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  crossButton: {
    position: 'absolute',
    top: 20,
    right: '5%',
  },
  crossImage: {
    width: 20,
    height: 20,
  },
});
