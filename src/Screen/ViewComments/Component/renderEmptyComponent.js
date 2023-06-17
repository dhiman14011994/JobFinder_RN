import { View, Text } from 'react-native';
import React from 'react';
import { theme } from '../../../Util/constant';
import Colors from '../../../Resources/Colors';

const renderEmptyComponent = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: '100%',
      }}
    >
      <Text
        style={{
          ...theme.fontSemiBold,
          fontSize: 16,
          color: Colors.Black,
        }}
      >
        Be the first to comment
      </Text>
    </View>
  );
};

export default renderEmptyComponent;
