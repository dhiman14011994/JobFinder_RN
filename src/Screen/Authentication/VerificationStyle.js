import { StyleSheet } from 'react-native';
import Colors from '../../Resources/Colors';
import { isNative, mxWidth } from '../../Util';
import { fontResize } from '../../Util/font';
import styled from 'styled-components/native';

let Wrapper = styled.SafeAreaView`
  flex: 1;
`;
let HeaderContainer = styled.View`
  height: ${(props) => (props.height ? props.height : '60')};
  flex-direction: row;
  background-color: #fff;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '0')};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '0')};
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '0')};
`;

let BackButton = styled.Image`
  width: 22;
  height: 22;
`;

let LoginContainer = styled.View`
  width: ${(props) =>
    props.isNative
      ? props.width
      : props.width > 700
      ? props.width * 0.33
      : props.width * 0.8};
  height: ${(props) => (props.isNative ? '100%' : props.height * 0.8)};
  border-radius: ${(props) => (props.isNative ? 0 : 22)};
  background-color: #fff;
`;

let ScrollViewContainer = styled.ScrollView`
  padding-left: ${(props) => (props.isNative ? '10%' : '60px')};
  padding-right: ${(props) => (props.isNative ? '10%' : '60px')};
`;
let TextComponent = styled.Text`
  color: #000;
  font-size: ${(props) => (props?.fontSize ? props.fontSize : '22px')};
  padding-top: ${(props) => (props.isNative ? '12px' : '60px')};
`;
let MessageVerificationText = styled.Text`
  color: #696d6d;
  font-size: ${(props) => (props?.fontSize ? props.fontSize : '16px')};
  padding-top: 12px;
`;

let LoginContainerParent = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

let LogoImage = styled.Image`
  width: ${(props) =>
    props.isNative ? props.width * 0.68 : props.width * 0.25};
  height: ${(props) => props.height * 0.2};
  overflow: visible;
`;

let SplashPeopleImage = styled.Image`
  /* background-color: black; */
  width: ${(props) =>
    props.isNative ? props.width * 0.68 : props.width * 0.25};
  height: ${(props) =>
    props.isNative ? props.width * 0.68 : props.width * 0.25};
  bottom: ${(props) => props.height * 0.22 - 60};
`;

let SpalshPeopleImageParent = styled.View`
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

let SplashBubbleImage = styled.Image`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
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
  width: ${(props) => props.width};
  height: ${(props) => props.height * 0.22};
  overflow: visible !important;
  bottom: 0;
`;

export {
  Wrapper,
  HeaderContainer,
  BackButton,
  LoginContainer,
  ScrollViewContainer,
  TextComponent,
  MessageVerificationText,
  LoginContainerParent,
};
