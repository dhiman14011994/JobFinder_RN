import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Alert,
} from 'react-native';
import React, { useRef, useEffect } from 'react';
import Colors from '../../../Resources/Colors';
import FastImage from 'react-native-fast-image';
import { WHITE_CROSS_ICON, dummyImage } from '../../../Resources/assets';
import { theme } from '../../../Util/constant';
import { fontResize } from '../../../Util/font';
import Strings from '../../../Resources/Strings';
import { CustomText } from '../../../Component/CustomComponent';
import EndPoint from '../../../Redux/constants/EndPoint';
import Emitter from '../../../Util/eventEmitter';

const SuggestionUserList = ({
  item,
  goToProfile,
  width,
  height,
  index,
  cancelSuggestion,
  followUser,
  isFollow,
}) => {
  const translation = useRef(new Animated.Value(0)).current;
  const duration = 700;

  const animatedSuggestionUser = () => {
    animatedDeleteUserView();
    setTimeout(() => {
      animatedUserView();
    }, 1200);
  };

  const requestFollowUser = () => {
    followUser();
    setTimeout(() => {
      animatedSuggestionUser();
    }, 2000);
  };

  const hideUserData = () => {
    Alert.alert('Hide user', Strings.CANCEL_SUGGESTION_MESSAGE, [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          animatedSuggestionUser();
          cancelSuggestion();
        },
      },
    ]);
  };

  const animatedDeleteUserView = () => {
    Animated.timing(translation, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };
  const animatedUserView = () => {
    Animated.timing(translation, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Animated.View
      style={[
        {
          transform: [
            {
              scale: translation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => goToProfile(item?._id)}
        style={[
          styles.container,
          {
            width: width * 0.38,
            marginLeft: index == 0 ? 0 : index % 2 ? width * 0.05 : 0,
          },
        ]}
      >
        <FastImage
          style={{
            height: height * 0.1,
            width: width * 0.38,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
          resizeMode="cover"
          source={
            item?.cover_photo
              ? { uri: `${EndPoint.baseAssestURL}${item?.cover_photo}` }
              : require('../../../Resources/assets/ProfileAssets/BG_User.png')
          }
        />
        <FastImage
          source={
            item?.image
              ? { uri: `${EndPoint.baseAssestURL}${item?.image}` }
              : dummyImage
          }
          style={{
            height: width * 0.16,
            width: width * 0.16,
            marginTop: -width * 0.08,
            borderRadius: width * 0.16,
            marginBottom: 10,
          }}
        />

        <CustomText
          style={{
            width: width * 0.25,
            marginVertical: 5,
          }}
          textAlign={'center'}
          {...theme.fontRegular}
          numberOfLines={2}
        >
          {item?.name || ''}
        </CustomText>
        <CustomText
          numberOfLines={2}
          ellipsizeMode="tail"
          {...theme.fontRegular}
          textColor={Colors.DimGray}
          fontSize={`${fontResize(12)}px`}
        >
          {item?.role || ''}
        </CustomText>
        <TouchableOpacity
          style={{
            width: width * 0.25,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: Colors.Blueberry,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 5,
            marginVertical: height * 0.02,
          }}
          disabled={isFollow == index}
          onPress={() => requestFollowUser()}
        >
          <CustomText {...theme.fontRegular} textColor={Colors.Blueberry}>
            {isFollow == index ? Strings.FOLLOWED : Strings.FOLLOW}
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            hideUserData();
          }}
          style={{
            position: 'absolute',
            top: 15,
            right: 10,
            width: 30,
            height: 30,
            borderRadius: 30,
            backgroundColor: Colors.Black,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image source={WHITE_CROSS_ICON} style={{ width: 15, height: 15 }} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SuggestionUserList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
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
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
});
