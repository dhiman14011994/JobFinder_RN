import { View, Text } from 'react-native';
import React from 'react';
import { style } from './style';
import { memo } from 'react';
const CustomDetailsText = ({
  headerText,
  detailsText,
  styleText,
  container,
}) => {
  return (
    <View style={[style.container, container]}>
      <Text style={[style.titleStyle, styleText]}>{headerText}</Text>
      <Text style={[style.bodyStyle, styleText]}>{detailsText}</Text>
    </View>
  );
};

export default memo(CustomDetailsText);
