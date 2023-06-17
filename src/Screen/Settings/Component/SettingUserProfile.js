import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {CustomText, Image} from '../../../Component/CustomComponent';
import EndPoint from '../../../Redux/constants/EndPoint';
import {STAR_ICON, dummyImage, rightIcon} from '../../../Resources/assets';
import {style} from '../style';
import {theme} from '../../../Util/constant';
import Colors from '../../../Resources/Colors';

const SettingUserProfile = ({userInfo, onPress, width, height}) => {
  return (
    <TouchableOpacity
      style={[style.profileContainer({width, height}), {marginVertical: '3%'}]}
      onPress={onPress}>
      <View style={style.settingProfileVw}>
        <Image
          height={'60px'}
          width={'60px'}
          borderRadius="120px"
          source={
            userInfo?.image
              ? {uri: `${EndPoint.baseAssestURL}${userInfo.image}`}
              : dummyImage
          }
        />
        <View style={{marginLeft: 10}}>
          <CustomText
            textTransform="capitalize"
            fontSize={'20px'}
            style={{...theme.fontSemiBold}}>
            {userInfo?.name || 'abc'}{userInfo?.gold_member ? <Image source={STAR_ICON} style={{width: 20, height: 20}}/> : ''}
          </CustomText>
          <CustomText
            fontSize={'14px'}
            textColor={Colors.PrimaryGray2}
            style={{...theme.fontRegular}}>
            {userInfo?.email || 'abc'}
          </CustomText>
        </View>
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

export default SettingUserProfile;
