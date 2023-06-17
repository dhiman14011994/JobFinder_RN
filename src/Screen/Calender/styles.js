import { StyleSheet } from 'react-native';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';

export const style = StyleSheet.create({
  container: ({ window }) => ({
    width: window.width,
    // paddingHorizontal: window.width * 0.05,
  }),
  headerTx: { 
    fontFamily: 'Gilroy-Bold',
    fontSize: fontResize(20),
    lineHeight: fontResize(24),
    color: Colors.Black,
    marginLeft: '5%',
  },
  emptyView: {
    width: '100%',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
  },
  scheduledTx: {
    fontFamily: 'Gilroy-Bold',
    fontSize: fontResize(18),
    lineHeight: fontResize(21),
    color: Colors.lightGray,
    marginTop: '10%',
    marginLeft: '5%',
  },
  monthVw: ({ window, index, selectMonth, currentMonthIndexd }) => ({
    justifyContent: 'center',
    alignItems: 'center',
    width: window.width * 0.27,
    height: 35,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: window.width * 0.045,
    marginBottom: index > 8 ? 0 : 20,
    borderColor:
      selectMonth === index
        ? Colors.Blueberry
        : currentMonthIndexd > index
        ? Colors.Silver
        : Colors.Black,
    marginTop: index > 2 ? 0 : 20,
  }),
  monthTx: ({ window, index, selectMonth, currentMonthIndexd }) => ({
    color:
      selectMonth === index
        ? Colors.Black
        : currentMonthIndexd > index
        ? Colors.lightGray
        : Colors.Black,
  }),
  webContainer: ({ window }) => ({
    marginTop: '5%',
    paddingVertical: '5%',
    backgroundColor: Colors.White,
    borderRadius: window.width * 0.01,
  }),
});
