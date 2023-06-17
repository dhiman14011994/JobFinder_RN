import { StyleSheet, Dimensions } from 'react-native-web';
import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#DADADA',
  },
  buttonContainer: {
    height: Dimensions.get('window').height * 0.07,
    width: '18%',
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '2%',
  },
  tabEmptyView: {
    width: '100%',
    height: 3,
    backgroundColor: Colors.Blueberry,
    position: 'absolute',
    bottom: -2,
  },
  emptyView: {
    width: '100%',
    padding: 1,
    backgroundColor: Colors.Gray,
  },
});
