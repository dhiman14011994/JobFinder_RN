import { View, Text, TouchableOpacity,Image } from 'react-native';
import React from 'react';
import { mxHeight, mxWidth } from '../../Util';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
import { theme } from '../../Util/constant';
import FastImage from 'react-native-fast-image';
import { STAR_ICON, UserPlaceholder } from '../../Resources/assets';
import EndPoint from '../../Redux/constants/EndPoint';

const CustomTagView = ({ item, index, addTagData }) => {
  return (
    <TouchableOpacity
      style={{
        width: mxWidth * 0.8,
        // height: 20,
        marginBottom: 5,
        borderBottomWidth: 1,
        marginTop: index == 0 ? 10 : 5,
        flexDirection: 'row',
        paddingVertical: 10,
        borderColor: Colors.gray2,
      }}
      onPress={() => {
        addTagData({ item });
      }}
    >
      <FastImage
        style={{
          height: mxHeight * 0.05,
          width: mxHeight * 0.05,
          borderRadius: mxHeight * 0.05,
          borderColor: Colors.Blueberry,
          borderWidth: 1,
        }}
        defaultSource={UserPlaceholder}
        source={
          item?.image
            ? {
                uri: EndPoint.baseAssestURL + item?.image,
              }
            : UserPlaceholder
        }
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: fontResize(18), color: Colors.Black }}>
          {item.name ||  ''}{item?.gold_member ? <Image source={STAR_ICON} style={{width: fontResize(18), height: fontResize(18)}}/> : ''}
        </Text>
        <Text>{item.role}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomTagView;
