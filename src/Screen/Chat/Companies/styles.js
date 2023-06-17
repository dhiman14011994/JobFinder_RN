import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../Resources/Colors';

const { width, height } = Dimensions.get('screen');

export const style = StyleSheet.create({
  hidenContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 15,
    marginHorizontal: 28,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    backgroundColor: 'red',
    width: 81,
    height: 81,
    borderRadius: 5,
  },
  emptyView: {
    width: '100%',
    justifyContent: 'center',
    height: height * 0.7,
    alignItems: 'center',
  },
});
