import { View, Text, Image } from 'react-native';
import React from 'react';
import { STAR_ICON } from '../../Resources/assets';

const CustomHeader = ({
  leftButtons,
  rightButtons,
  title,
  isTitleLeft = false,
  constainerStyle,
  screenName = '',
  titleStyle = {},
  isSubscription= false,
}) => {
  return (
    <>
      <View
        style={[
          {
            paddingVertical: 16,
            paddingHorizontal: 22,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
          constainerStyle,
        ]}
      >
        {!isTitleLeft && !screenName && (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              paddingHorizontal: 22,
              alignItems: 'center',
              left: 22,
            }}
          >
            <Text
              style={{
                fontFamily: 'Gilroy-Bold',
                fontSize: 17,
                textTransform: 'capitalize',
                color: '#2B2A30',
                ...titleStyle,
              }}
            >
              {title}{isSubscription ? <Image source={STAR_ICON} style={{width: 20, height: 20}}/> : ''}
            </Text>
          </View>
        )}

        <View style={{ flexDirection: 'row' }}>
          {isTitleLeft ? (
            <Text
              style={{
                fontFamily: 'Gilroy-Bold',
                fontSize: 17,
                color: '#2B2A30',
              }}
            >
              {title}
            </Text>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {screenName === 'Home' ? (
                <>
                  {leftButtons}
                  <Text
                    style={{
                      fontFamily: 'Gilroy-Bold',
                      fontSize: 17,
                      paddingHorizontal: 12,
                      color: '#2B2A30',
                    }}
                  >
                    {title}
                  </Text>
                </>
              ) : (
                leftButtons
              )}
            </View>
          )}
        </View>

        <View style={{ flexDirection: 'row' }}>{rightButtons}</View>
      </View>
    </>
  );
};

export default CustomHeader;
