import { StyleSheet } from 'react-native';
import Colors from '../../../Resources/Colors';

export const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subContainer: {
    width: '33%',
    backgroundColor: Colors.White,
    borderRadius: 10,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editWebBtn: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '5%',
  },
  workExpView: {
    width: '100%',
  },
});
