import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Image } from '../CustomComponent';
import { style } from './style';

const DetailsComponent = ({
  title,
  width,
  height,
  image,
  containerStyle,
  onPress,
  imageWidth,
  imageHeight,
}) => {
  return (
    <View style={containerStyle}>
      <Text style={style.detailsTx}>{title}</Text>
      {image && (
        <TouchableOpacity onPress={onPress}>
          <Image
            width={imageWidth ? imageWidth : width * 0.08}
            resizeMode={'contain'}
            height={imageHeight ? imageHeight : '5px'}
            source={image}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DetailsComponent;
