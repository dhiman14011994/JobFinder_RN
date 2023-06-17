import React from 'react';
import { useWindowDimensions, View, TouchableOpacity } from 'react-native';
import {
  CustomView,
  ButtonContainer,
  CustomText,
  Image,
} from '../CustomComponent';

const Header = ({
  isHeaderLogout,
  isLeftIcon,
  isRightIcon,
  leftImage,
  rightImage,
  headerText,
  fontSize,
  textColor,
  fontFamily,
  leftButtonPress,
  rightButtonPress,
  bgColor,
}) => {
  const window = useWindowDimensions();
  return (
    <View
      style={{
        width: isHeaderLogout ? window?.width * 0.7 : window?.width,
        height: window?.height * 0.05,
        paddingHorizontal: window?.width * 0.05,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: bgColor ? bgColor : 'transparent',
      }}>
      {isLeftIcon ? (
        <TouchableOpacity onPress={leftButtonPress}>
          <Image
            resizeMode="contain"
            width={window?.width * 0.1}
            height={window?.height * 0.03}
            source={leftImage}
          />
        </TouchableOpacity>
      ) : (
        <CustomView
          width={window?.width * 0.1}
          height={window?.height * 0.03}
        />
      )}
      <CustomText
        fontSize={fontSize}
        textColor={textColor}
        fontFamily={fontFamily}>
        {headerText}
      </CustomText>
      {isRightIcon ? (
        <ButtonContainer
          width={window?.width * 0.1}
          onPress={rightButtonPress}
          height={window?.height * 0.03}>
          <Image
            width={window?.width * 0.1}
            height={window?.height * 0.03}
            source={rightImage}
          />
        </ButtonContainer>
      ) : (
        <CustomView
          width={window?.width * 0.1}
          height={window?.height * 0.03}
        />
      )}
    </View>
  );
};

export default Header;
