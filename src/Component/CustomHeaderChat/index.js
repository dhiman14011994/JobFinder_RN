import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import { fontResize } from '../../Util/font';

const CustomHeaderChat = ({
  leftButtons,
  rightButtons,
  title,
  isTitleLeft = false,
  constainerStyle,
  titleStyle = {},
}) => {
  const { width, height } = Dimensions.get('window');
  return (
    <>
      <View
        style={[
          {
            paddingVertical: height * 0.02,
            paddingHorizontal: height * 0.01,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
          constainerStyle,
        ]}
      >
        {!isTitleLeft && (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              paddingHorizontal: height * 0.01,
              alignItems: 'center',
              left: height * 0.01,
            }}
          >
            <Text
              style={{
                fontFamily: 'Gilroy-Bold',
                fontSize: fontResize(),
                color: '#2B2A30',
                ...titleStyle,
              }}
            >
              {title}
            </Text>
          </View>
        )}

        <View style={{ flexDirection: 'row' }}>
          {isTitleLeft ? (
            <Text
              style={{
                fontFamily: 'Gilroy-Bold',
                fontSize: fontResize(height * 0.01),
                color: '#2B2A30',
              }}
            >
              {title}
            </Text>
          ) : (
            leftButtons
          )}
        </View>

        <View style={{ flexDirection: 'row' }}>{rightButtons}</View>
      </View>
    </>
  );
};

export default CustomHeaderChat;
