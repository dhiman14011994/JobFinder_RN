import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { CustomText } from '../CustomComponent';
import { fontResize } from '../../Util/font';
import Colors from '../../Resources/Colors';
import Strings from '../../Resources/Strings';
import { UserPlaceholder } from '../../Resources/assets';
import { theme } from '../../Util/constant';
import { mxWidth } from '../../Util';
import EndPoint from '../../Redux/constants/EndPoint';

const CustomBlockUser = ({ item, onPress }) => {
  return (
    <View
      activeOpacity={1}
      style={{
        width: mxWidth * 0.9,
        flexDirection: 'row',
        marginVertical: 14,
        marginHorizontal: mxWidth * 0.05,
        borderRadius: 12,
        backgroundColor: Colors.White,
        shadowColor: Colors.PrimaryGray1,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,

        elevation: 5,
        paddingVertical: 12,
        paddingHorizontal: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          width: mxWidth * 0.6,
        }}
      >
        <FastImage
          style={{ height: 44, width: 44, borderRadius: 44 / 2 }}
          defaultSource={UserPlaceholder}
          source={
            item?.user.image
              ? { uri: EndPoint.baseAssestURL + item?.user.image }
              : UserPlaceholder
          }
        />

        <View style={{ paddingHorizontal: 12, flex: 1 }}>
          <CustomText {...theme.fontRegular}>
            {item?.user?.name || ''}
          </CustomText>
          <CustomText
            numberOfLines={2}
            ellipsizeMode="tail"
            {...theme.fontRegular}
            textColor={Colors.DimGray}
            fontSize={`${fontResize(12)}px`}
          >
            {item?.user?.about_me || ''}
          </CustomText>
        </View>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Text
          style={{
            color: Colors.Blueberry,
            fontSize: fontResize(18),
            fontFamily: 'Gilroy-Bold',
          }}
        >
          {Strings.UNBLOCK}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomBlockUser;
