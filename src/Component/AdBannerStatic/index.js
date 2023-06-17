import {View, Text, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {dummyImage, adBannerArrow} from '../../Resources/assets';
import Colors from '../../Resources/Colors';
import {useSelector} from 'react-redux';
import EndPoint from '../../Redux/constants/EndPoint';
import Strings from '../../Resources/Strings';
import {style} from './styles';

const AdBannerStatic = () => {
  const user = useSelector(state => state.auth.userData);
  const type = user?.data?.role ? user?.data?.role : Strings.PROFESSIONAL;
  const userInfo = useSelector(state => state?.profile?.myProfile);

  return (
    <LinearGradient
      start={{x: 0.0, y: 0.25}}
      end={{x: 0.5, y: 1.0}}
      locations={[0, 1]}
      colors={['#9EC555', '#9AC34F']}
      style={style.linearContainer}>
      <View style={style.constainer}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={style.userImg}
            source={
              type == Strings.PROFESSIONAL
                ? userInfo?.image
                  ? {uri: EndPoint.baseAssestURL + userInfo?.image}
                  : dummyImage
                : userInfo?.userinfo?.profile_pic
                ? {
                    uri:
                      EndPoint.baseAssestURL + userInfo?.userinfo?.profile_pic,
                  }
                : userInfo?.userinfo?.image
                ? {uri: EndPoint.baseAssestURL + userInfo?.userinfo?.image}
                : dummyImage
            }
          />
          <View style={{paddingLeft: 8}}>
            <Text style={[style.userName]}>{userInfo?.name || ''}</Text>
            <Text style={style.userSkillTx}>{user?.data?.skill || ''}</Text>
          </View>
        </View>
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          locations={[0, 1]}
          colors={[Colors.LinearColor3, Colors.Blueberry]}
          style={style.linearPromoteView}>
          <Text style={style.promoteText}>
            {'Promote Your\nBusiness With Us'}
          </Text>
        </LinearGradient>
      </View>
      <Text style={style.freeText}>
        Free course on new technologies with free giveaways. Hurry up! Click to
        apply because limited seats are available.
      </Text>
      <View style={style.bottomVw}>
        <Image
          resizeMode="contain"
          style={style.rightImage}
          source={adBannerArrow}
        />
      </View>
    </LinearGradient>
  );
};

export default AdBannerStatic;
