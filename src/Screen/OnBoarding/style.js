import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../Resources/Colors';
import {isNative} from '../../Util';
import {fontResize} from '../../Util/font';
import styled from 'styled-components/native';
import { theme } from '../../Util/constant';

const {width, height} = Dimensions.get("window")
export const styles = StyleSheet.create({
  // View
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.Blueberry,
    flex: 1,
    
  },
  ourDetailsVw: {
    width: isNative ? '80%' : '50%',
    marginHorizontal: isNative ? '10%' : '25%',
    padding: '5%',
    backgroundColor: Colors.LightBlue,
    borderRadius: 15,
  },
  // Image
  transparentImg: {
    height: '70%',
    width: '70%',
    position: 'absolute',
    top: '15%',
    left: '10%',
  },
  transparentWebImg: {
    height: '40%',
    width: '94%',
    position: 'absolute',
    left: '3%',
    top: '10%',
  },
  // Text
  ourMissionTx: {
    ...theme.fontSemiBold,
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: Colors.White,
  },
  ourDetailsTx: {
...theme.fontRegular,
    fontSize: isNative ? fontResize(15) : fontResize(height * 0.025),
    lineHeight: isNative ? fontResize(25) : fontResize(height * 0.05),
    color: Colors.White,

  },
  buttonStyleText: {
    ...theme.fontSemiBold,
    fontSize: isNative ? fontResize(18) : 18,
    color: Colors.Blueberry,
    width: '100%',
    textAlign: 'center',
  },
  // button
  buttonContainer: {
    width: '50%',
    marginHorizontal: '25%',
    height: 50,
    backgroundColor: Colors.White,
    marginTop: '10%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    position: 'absolute',
    bottom: '5%',
    left: '10%',
  },
  splashParent: {
    flex: 1,
    backgroundColor: Colors.Blueberry,
    justifyContent: 'center',
  },
  splashBottomImageParent: {
    justifyContent: 'flex-end',
    flex: 1,
  },
});

let SplashWrapper = styled.View`
  flex: 1;
  background-color: ${Colors.Blueberry};
  justify-content: center;
`;

let LogoParent = styled.View`
  width: ${props => props.width};
  justify-content: center;
  align-items: center;
  flex: 1;
  top: ${props => (props.isNative ? props.width * 0.3 : 0)};
`;

let LogoImage = styled.Image`
  width: ${props => (props.isNative ? props.width * 0.68 : props.width * 0.25)};
  height: ${props => props.height * 0.2};
  overflow: visible;
`;

let SplashPeopleImage = styled.Image`
  /* background-color: black; */
  width: ${props => (props.isNative ? props.width * 0.68 : props.width * 0.25)};
  height: ${props =>
    props.isNative ? props.width * 0.68 : props.width * 0.25};
  bottom: ${props => props.height * 0.22 - 60};
`;

let SpalshPeopleImageParent = styled.View`
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  width: ${props => props.width};
  height: ${props => props.height};
`;

let SplashBubbleImage = styled.Image`
  width: ${props => props.width};
  height: ${props => props.height};
  overflow: visible;
`;

let SplashBubbleBottomParent = styled.View`
  flex: 1;
  position: absolute;
`;

let SplashBottomImageParent = styled.View`
  justify-content: flex-end;
  flex: 1;
`;

let SplashBottomImage = styled.Image`
  width: ${props => props.width};
  height: ${props => props.height * 0.22};
  overflow: visible !important;
  bottom: 0;
`;

export {
  SplashWrapper,
  SplashBottomImage,
  SpalshPeopleImageParent,
  SplashBubbleBottomParent,
  SplashBubbleImage,
  SplashPeopleImage,
  SplashBottomImageParent,
  LogoImage,
  LogoParent,
};
