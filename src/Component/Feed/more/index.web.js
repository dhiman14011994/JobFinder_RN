//import liraries
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native-web';
import styles from './style';
import { memo } from 'react';
import Colors from '../../../Resources/Colors';
import { fontResize } from '../../../Util/font';
import { mxHeight, mxWidth } from '../../../Util';

const CustomMoreComponentWeb = ({ data, onClick, window }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onClick();
      }}
      activeOpacity={0.5}
      style={{ paddingVertical: mxHeight * 0.01 }}
    >
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={{
            height: mxHeight * 0.015,
            width: mxHeight * 0.015,
          }}
          source={data?.icon}
        />
        <Text
          style={{
            color: Colors.DimGray,
            fontSize: fontResize(mxWidth * 0.01),
            fontFamily: 'Gilroy-Regular',
            marginStart: mxWidth * 0.01,
          }}
        >
          {data?.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(CustomMoreComponentWeb);
