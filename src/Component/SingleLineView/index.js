import { View, Text } from 'react-native';
import React from 'react';

const SingleLineText = ({ backgroundColor, height }) => {
  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        height: height,
      }}
    />
  );
};

export default SingleLineText;
