import React from 'react';
import {CustomView, CustomText, Image} from '../CustomComponent';

const index = ({
  marginVertical,
  width,
  buttonContainer,
  text,
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
}) => {
  return (
    <CustomView
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
      borderWidth={borderWidth}
      borderColor={borderColor}
      style={[buttonContainer]}>
      {buttonImage && (
        <Image
          height={20}
          width={25}
          style={{position: 'absolute', left: '18.93%', alignItems: 'center'}}
          source={buttonImage}
        />
      )}
      <CustomText
        fontSize={fontSize}
        textColor={textColor}
        fontFamily={fontFamily}>
        {text}
      </CustomText>
    </CustomView>
  );
};

export default index;
