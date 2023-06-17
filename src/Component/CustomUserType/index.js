import {Text, Pressable, Image} from 'react-native';
import React from 'react';
import {style} from './style';
import Colors from '../../Resources/Colors';

const CustomUserType = ({
  onPress,
  image,
  text,
  buttonContainer,
  imageStyle,
  textStyle,
  resizeMode,
}) => {
  return (
    <Pressable onPress={onPress} style={[buttonContainer]}>
      <Image
        style={[style.buttonStyleImage, imageStyle]}
        resizeMode={resizeMode}
        source={image}
      />
      <Text style={[{color: Colors.Black}, textStyle]}>{text}</Text>
    </Pressable>
  );
};

export default CustomUserType;
