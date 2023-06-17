import { View, Text, Image } from 'react-native-web';
import React from 'react';
import LinearGradient from 'react-native-web-linear-gradient';
import { dummyImage, adBannerArrow } from '../../Resources/assets';
import Colors from '../../Resources/Colors';
import EndPoint from '../../Redux/constants/EndPoint';
import { style } from './styles';

const AdBannerPromotion = (user) => {
  return (
    <View style={style.webContainer}>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 1]}
        colors={[Colors.LinearColor1, Colors.LinearColor2]}
        style={style.linearWebContainer}
      >
        <View style={style.constainerWeb}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={style.userImgWeb}
              source={
                user.image?.userinfo?.profile_pic
                  ? {
                      uri:
                        EndPoint.baseAssestURL +
                        user.image?.userinfo?.profile_pic,
                    }
                  : dummyImage
              }
            />
            <View style={{ paddingLeft: 8 }}>
              <Text style={style.userNameWeb}>{user?.data?.name || ''}</Text>
              <Text style={style.userSkillTxWeb}>
                {user?.data?.role || 'ABC'}
              </Text>
            </View>
          </View>
          <LinearGradient
            start={{ x: 0.0, y: 0.25 }}
            end={{ x: 0.5, y: 1.0 }}
            locations={[0, 1]}
            colors={[Colors.LinearColor3, Colors.Blueberry]}
            style={style.linearPromoteViewWeb}
          >
            <Text style={style.promoteTextWeb}>
              {'Promote Your\nBusiness With Us'}
            </Text>
          </LinearGradient>
        </View>
        <Text style={style.freeTextWeb}>
          Free course on new technologies with free giveaways. Hurry up! Click
          to apply because limited seats are available.
        </Text>
        <View style={style.bottomVwWeb}>
          <Image
            resizeMode="contain"
            style={style.rightImageWeb}
            source={adBannerArrow}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default AdBannerPromotion;
