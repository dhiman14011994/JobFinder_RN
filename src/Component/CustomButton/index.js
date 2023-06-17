import React from 'react';
import {isNative} from '../../Util';
import {ButtonContainer, CustomText, Image} from '../CustomComponent';

const index = ({
  marginVertical,
  width,
  buttonContainer,
  text,
  onPress,
  disabled,
  height,
  padding,
  borderRadius,
  backgroundColor,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  marginHorizontal,
  alignItems,
  justifyContent,
  fontSize,
  textColor,
  fontFamily,
  buttonImage,
  borderWidth,
  borderColor,
  alignSelf,
  isLeftImage,
  imageStyle,
  textTransform,
  textStyle,
}) => {
  return (
    <ButtonContainer
      marginVertical={marginVertical}
      width={width}
      height={height}
      padding={padding}
      borderRadius={borderRadius}
      bgColor={backgroundColor}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginHorizontal={marginHorizontal}
      alignItems={alignItems}
      justifyContent={justifyContent}
      disabled={disabled}
      onPress={onPress}
      borderWidth={borderWidth}
      borderColor={borderColor}
      alignSelf={alignSelf}
      activeOpacity={0.8}
      style={[buttonContainer]}>
      {buttonImage && (
        <Image
          height={20}
          width={25}
          style={
            isLeftImage
              ? imageStyle
              : {
                  position: 'absolute',
                  left: isNative ? '18.93%' : '10.93%',
                  alignItems: 'center',
                }
          }
          resizeMode={'contain'}
          source={buttonImage}
        />
      )}
      <CustomText
        fontSize={fontSize}
        textColor={textColor}
        textTransform={textTransform}
        style={textStyle}
        fontFamily={fontFamily}>
        {text}
      </CustomText>
    </ButtonContainer>
  );
};

export default index;
