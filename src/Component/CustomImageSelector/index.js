import { useWindowDimensions } from 'react-native';
import React from 'react';
import Colors from '../../Resources/Colors';
import { isNative } from '../../Util';
import {
  Image,
  CustomText,
  ErrorText,
  Container,
  InputContainer,
  IconView,
  Text,
  IconButton,
} from '../CustomComponent';
import CameraIcon from '../../Resources/assets/cameraIcon.png';
import { fontResize } from '../../Util/font';

const CustomImageSelector = ({
  inputContainer,
  label,
  inputOuterView,
  marginTop,
  marginBottom,
  AttachText,
  imagePress,
  imagePath,
  borderColor,
  width,
  marginLeft,
  marginRight,
  isFromCreateStroy,
  disabled,
  isWeb,
  isEdit,
  window,
  errImage,
  errorTextStyle,
  height,
  labelFontSize,
}) => {
  return (
    <Container
      marginTop={marginTop}
      marginBottom={marginBottom}
      width={width}
      isNative={isNative}
      marginLeft={marginLeft}
      marginRight={marginRight}
      style={[inputContainer]}
    >
      <Text fontSize={labelFontSize} textColor={Colors.Black}>
        {label}
      </Text>
      <InputContainer
        window={window}
        height={height ? height : window.height * 0.3}
        borderColor={borderColor ? borderColor : Colors.DimGray}
        style={[inputOuterView]}
      >
        {isWeb ? (
          <IconView>
            <Image
              width={
                isFromCreateStroy
                  ? '30vh'
                  : !imagePath
                  ? window.width * 0.03
                  : isNative
                  ? '100%'
                  : window.width * 0.09
              }
              height={
                isFromCreateStroy
                  ? '40vh'
                  : !imagePath
                  ? window.width * 0.03
                  : isNative
                  ? '100%'
                  : window.width * 0.07
              }
              resizeMode="contain"
              source={
                isFromCreateStroy
                  ? { uri: imagePath }
                  : !imagePath
                  ? CameraIcon
                  : { uri: imagePath }
              }
            />
            {!imagePath && (
              <CustomText
                textLine={'underline'}
                fontFamily={'Gilroy-light'}
                fontSize={fontResize(window.width * 0.012)}
                marginTop={10}
                textColor={Colors.Blueberry}
              >
                {AttachText}
              </CustomText>
            )}
          </IconView>
        ) : (
          <IconButton disabled={disabled} onPress={imagePress}>
            <Image
              width={
                isFromCreateStroy
                  ? '30vh'
                  : !imagePath
                  ? 50
                  : isEdit
                  ? window.width * 0.3
                  : '100%'
              }
              height={
                isFromCreateStroy
                  ? '40vh'
                  : !imagePath
                  ? 50
                  : isEdit
                  ? window.width * 0.3
                  : '100%'
              }
              borderRadius={isEdit ? window.width * 0.3 : '0px'}
              resizeMode={isEdit ? 'cover' : 'contain'}
              source={
                isFromCreateStroy
                  ? { uri: imagePath }
                  : !imagePath
                  ? CameraIcon
                  : { uri: imagePath }
              }
            />
            {!imagePath && !isEdit && (
              <CustomText
                textLine={'underline'}
                fontFamily={'Gilroy-light'}
                fontSize={fontResize(18)}
                marginTop={10}
                textColor={Colors.Blueberry}
              >
                {AttachText}
              </CustomText>
            )}
            {isEdit && (
              <CustomText
                textLine={'underline'}
                fontFamily={'Gilroy-light'}
                fontSize={fontResize(18)}
                marginTop={10}
                textColor={Colors.Blueberry}
              >
                {AttachText}
              </CustomText>
            )}
          </IconButton>
        )}
      </InputContainer>
      {errImage !== '' && (
        <ErrorText style={[errorTextStyle]}>{errImage}</ErrorText>
      )}
    </Container>
  );
};

export default CustomImageSelector;
