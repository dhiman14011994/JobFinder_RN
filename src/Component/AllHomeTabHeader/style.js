import { StyleSheet, Dimensions } from 'react-native-web';
import Colors from '../../Resources/Colors';

const { height } = Dimensions.get('window');
export const style = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: height * 0.01,
    backgroundColor: Colors.White,
    marginBottom: height * 0.03,
  },
  buttonContainer: {
    height: height * 0.07,
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
    bottom: 2,
  },
  emptyView: {
    width: '100%',
    padding: 1,
    backgroundColor: Colors.Gray,
  },
});
