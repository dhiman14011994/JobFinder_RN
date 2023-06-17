import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {CustomText, Image} from '../../../Component/CustomComponent';
import EndPoint from '../../../Redux/constants/EndPoint';
import {dummyImage, rightIcon} from '../../../Resources/assets';
import {style} from '../style';
import {theme} from '../../../Util/constant';
import Colors from '../../../Resources/Colors';

const CustomTabView = ({
  image,
  onPress,
  width,
  height,
  text,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        style.profileContainer({width, height}),
        containerStyle,
        style.marginTop({margin: '3%'}),
      ]}
      onPress={onPress}>
      <View style={style.settingProfileVw}>
        <View style={style.roundImage}>
          <Image
            height={'20px'}
            width={'20px'}
            resizeMode={'contain'}
            source={image || dummyImage}
          />
        </View>
        <CustomText
          textTransform="none"
          fontSize={'16px'}
          marginLeft="20px"
          style={{...theme.fontMedium}}>
          {text || 'abc'}
        </CustomText>
      </View>
      <Image
        resizeMode="contain"
        height={'10px'}
        width="10px"
        source={rightIcon}
      />
    </TouchableOpacity>
  );
};

export default CustomTabView;
