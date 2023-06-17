import { View, Text, Image } from 'react-native-web';
import React from 'react';
import LinearGradient from 'react-native-web-linear-gradient';
import { dummyImage, adBannerArrow } from '../../Resources/assets';
import Colors from '../../Resources/Colors';
import { useSelector } from 'react-redux';
import EndPoint from '../../Redux/constants/EndPoint';
import { style } from './styles';
const AdBannerStatic = () => {
  const user = useSelector(state => state.auth.userData);
  return (
    <View
      style={style.webContainer}>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 1]}
        colors={[Colors.LinearColor1, Colors.LinearColor2]}
        style={style.linearWebContainer}>
        <View
          style={style.constainerWeb}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={style.userImgWeb}
              source={
                user?.data?.image
                  ? { uri: EndPoint.baseAssestURL + user?.data?.image }
                  : dummyImage
              }
            />
            <View style={{ paddingLeft: 8 }}>
              <Text
                style={style.userNameWeb}>
                {user?.data?.name || ''}
              </Text>
              <Text
                style={style.userSkillTxWeb}>
                {user?.data?.skill || ''}
              </Text>
            </View>
          </View>
          <LinearGradient
            start={{ x: 0.0, y: 0.25 }}
            end={{ x: 0.5, y: 1.0 }}
            locations={[0, 1]}
            colors={[Colors.LinearColor3, Colors.Blueberry]}
            style={style.linearPromoteViewWeb}>
            <Text
              style={style.promoteTextWeb}>
              {'Promote Your Business With Us'}
            </Text>
          </LinearGradient>
        </View>
        <Text
          style={style.freeTextWeb}>
          Free course on new technologies with free giveaways. Hurry up! Click
          to apply because limited seats are available.
        </Text>
        <View
          style={style.bottomVwWeb}>
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

export default AdBannerStatic;
