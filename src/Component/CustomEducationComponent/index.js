import { View, Text } from 'react-native';
import React from 'react';
import { style } from './style';
import { memo } from 'react';
const CustomEducationComponent = ({
  data,
  styleText
}) => {
  return (
    <View style={style.container}>
      <Text style={[style.titleStyle, styleText]}>{data?.school}</Text>
      <Text style={[style.bodyStyle, styleText]}>{`${data?.degree_title} - ${data?.study}`}</Text>
    </View>
  );
};

export default memo(CustomEducationComponent);
