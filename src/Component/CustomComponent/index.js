import styled from 'styled-components/native';
import Colors from '../../Resources/Colors';

export const CustomText = styled.Text`
  font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'left')};
  color: ${(props) => (props.textColor ? props.textColor : '#000')};
  font-family: ${(props) =>
    props.fontFamily ? props.fontFamily : 'Gilroy-Medium'};
  font-style: normal;
  text-decoration-line: ${(props) =>
    props.textLine ? props.textLine : 'none'};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '0px')};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '0px')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '0px')};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : '0px'};
  text-transform: ${(props) =>
    props.textTransform ? props.textTransform : 'none'};
`;

export const ButtonContainer = styled.TouchableOpacity`
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : '40px')};
  padding: ${(props) => (props.padding ? props.padding : '0px')};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : '0px'};
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : 'transparent'};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '0px')};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '0px')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '0px')};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : '0px'};
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : 'center'};
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : 'column'};
  border-color: ${(props) =>
    props.borderColor ? props.borderColor : '#000000'};
  border-width: ${(props) => (props.borderWidth ? props.borderWidth : '0px')};
  align-self: ${(props) => (props.alignSelf ? props.alignSelf : 'center')};
`;

export const CustomView = styled.View`
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : '0px')};
  padding: ${(props) => (props.padding ? props.padding : '0px')};
  padding-top: ${(props) => (props.paddingTop ? props.paddingTop : '0px')};
  padding-bottom: ${(props) =>
    props.paddingBottom ? props.paddingBottom : '0px'};
  padding-left: ${(props) => (props.paddingLeft ? props.paddingLeft : '0px')};
  padding-right: ${(props) =>
    props.paddingRight ? props.paddingRight : '0px'};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : '0px'};
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : 'transparent'};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '0px')};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '0px')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '0px')};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : '0px'};
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : 'flex-start'};
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : 'column'};
  border-color: ${(props) =>
    props.borderColor ? props.borderColor : '#000000'};
  border-width: ${(props) => (props.borderWidth ? props.borderWidth : '0px')};
`;
export const ContainerView = styled.View`
  flex: 1;
  margin-vertical: ${(props) =>
    props.marginVertical ? props.marginVertical : '0px'};
  padding: ${(props) => (props.padding ? props.padding : '0px')};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : '0px'};
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : 'transparent'};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '0px')};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '0px')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '0px')};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : '0px'};
  margin-horizontal: ${(props) =>
    props.marginHorizontal ? props.marginHorizontal : '0px'};
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : 'flex-start'};
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : 'column'};
  border-color: ${(props) =>
    props.borderColor ? props.borderColor : '#000000'};
  border-width: ${(props) => (props.borderWidth ? props.borderWidth : '0px')};
`;

export const Image = styled.Image`
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : '0px')};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : '0px'};
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : 'transparent'};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '0px')};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '0px')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '0px')};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : '0px'};
  border-color: ${(props) =>
    props.borderColor ? props.borderColor : '#000000'};
  border-width: ${(props) => (props.borderWidth ? props.borderWidth : '0px')};
`;
export const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
  font-family: 'Gilroy';
  font-style: normal;
  margin-top: 5px;
`;
export const InputContainer = styled.View`
  border-radius: 10px;
  width: 100%;
  height: ${(props) =>
    props.height ? props.height : props.window && props.window.height * 0.07};
  border-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  border-color: ${(props) =>
    props.borderColor ? props.borderColor : '#c4c4c4'};
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')};
`;

export const Text = styled.Text`
  color: ${(props) => (props.textColor ? props.textColor : Colors.EerieBlack)};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : '24px')};
  font-family: ${(props) =>
    props.fontFamily ? props.fontFamily : 'Gilroy-SemiBold'};
  font-style: normal;
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : '8px'};
`;

export const Container = styled.View`
  width: ${(props) =>
    props.width ? props.width : props.isNative ? '100%' : '80%'};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '0px')};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '0px')};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : '0px'};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '0px')};
`;
export const IconView = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;
export const IconButton = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
`;
