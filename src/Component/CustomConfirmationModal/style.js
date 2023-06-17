import { StyleSheet } from 'react-native';
import { mxHeight, mxWidth } from '../../Util';
import Colors from '../../Resources/Colors';

const styles = StyleSheet.create({
  container: {
    width: mxWidth,
    height: mxHeight,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  subConatiner: {
    width: mxWidth * 0.8,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: Colors.gray2,
    backgroundColor: Colors.White,
    padding: mxWidth * 0.1,
    overflow: 'hidden',
    shadowRadius: 20,
    shadowOpacity: 1,
    borderRadius: mxWidth * 0.03,
    flexDirection: 'column',
  },

  subWebConatiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: Colors.gray2,
    backgroundColor: Colors.White,
    padding: mxWidth * 0.03,
    overflow: 'hidden',
    shadowRadius: 20,
    shadowOpacity: 1,
    borderRadius: mxWidth * 0.03,
    flexDirection: 'column',
  },

  imageStyle: {
    width: 30,
    height: 30,
    marginTop: 20,
    alignSelf: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },

  buttonStyle: {
    width: '40%',
    marginRight: '5%',
    marginLeft: '5%',
    backgroundColor: Colors.Red,
    padding: 10,
    borderRadius: 5,
  },

  button2Style: {
    width: '40%',
    marginRight: '5%',
    marginLeft: '5%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.DimGray,
  },

  buttonWebStyle: {
    width: '30%',
    marginRight: '5%',
    marginLeft: '5%',
    backgroundColor: Colors.Red,
    padding: 10,
    borderRadius: 5,
  },

  button2WebStyle: {
    width: '30%',
    marginRight: '5%',
    marginLeft: '5%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.DimGray,
  },

  buttonWebContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: mxHeight * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
