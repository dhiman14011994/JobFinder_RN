import React from 'react';
import { Image } from '../CustomComponent';
import { style } from './style';
import { CancelIcon } from '../../Resources/assets/ProfileAssets';
import { View, Text, TouchableOpacity } from 'react-native-web';
import { fontResize } from '../../Util/font';
import Colors from '../../Resources/Colors';

const MyEventComponentWeb = ({ image, title, date, time, cancelPress }) => {
  return (
    <View style={style.container}>
      <Image
        width={'50px'}
        height={'50px'}
        borderRadius={'10px'}
        resizeMode="cover"
        source={{ uri: image }}
      />
      <Text
        style={{
          fontFamily: 'Gilroy-SemiBold',
          fontSize: fontResize(16),
          lineHeight: fontResize(19),
          color: Colors.Black,
          width: '25%',
        }}
      >
        {title}
      </Text>
      <View style={{ width: '45%' }}>
        <Text
          style={{
            fontFamily: 'Gilroy-SemiBold',
            fontSize: fontResize(12),
            lineHeight: fontResize(24),
            color: Colors.lightGray,
          }}
        >
          {date}
        </Text>
        <Text
          style={{
            fontFamily: 'Gilroy-Bold',
            fontSize: fontResize(14),
            lineHeight: fontResize(24),
            color: Colors.Black,
          }}
        >
          {time}
        </Text>
      </View>
      <TouchableOpacity
        onPress={cancelPress}
        style={{ position: 'absolute', top: 10, right: 15 }}
      >
        <Image
          width={'24px'}
          height={'24px'}
          resizeMode={'cover'}
          borderRadius={'24px'}
          source={CancelIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MyEventComponentWeb;
