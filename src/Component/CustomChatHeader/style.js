import { StyleSheet, Dimensions } from 'react-native-web';
import Colors from '../../Resources/Colors';

export const style = StyleSheet.create({
  container: {
    width: '96%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '2%',
  },
  buttonContainer: {
    height: Dimensions.get('window').height * 0.07,
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabEmptyView: {
    width: '100%',
    padding: 1,
    backgroundColor: Colors.Blueberry,
    position: 'absolute',
    bottom: 0,
  },
  emptyView: {
    width: '100%',
    padding: 1,
    backgroundColor: Colors.Gray,
  },
});
