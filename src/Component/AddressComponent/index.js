import { View, Text } from 'react-native';
import React from 'react';
import { style } from './style';
import { Image } from '../CustomComponent';

const AddressComponent = ({ image, text, container }) => {
  return (
    <View style={[style.addressVw, container]}>
      <Image
        resizeMode={'contain'}
        height={'22px'}
        width={'22px'}
        source={image}
      />
      <Text style={style.addressTx}>{text}</Text>
    </View>
  );
};

export default AddressComponent;
