import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';
import { style } from './style';
import { Test } from '../../Resources/assets';
import { mxHeight } from '../../Util';

const CustomTutorialComponent = ({ data, index, dataLength }) => {
  return (
    <View>
      <View style={style.containerStyle}>
        <View style={style.numberContainer}>
          <Text style={style.numberStyle}>{`${index + 1}.`}</Text>
        </View>

        <Text style={style.titleStyle}>{data?.title}</Text>
        <View style={style.imageViewStyle}>
          <Image
            resizeMode="stretch"
            style={style.imageStyle}
            source={data?.image}
          />
        </View>
      </View>
      {dataLength == index + 1 && <View style={{ height: mxHeight * 0.2 }} />}
    </View>
  );
};

export default memo(CustomTutorialComponent);
