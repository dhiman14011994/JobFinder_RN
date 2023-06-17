import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import Colors from '../../../Resources/Colors';
import EndPoint from '../../../Redux/constants/EndPoint';
import { STAR_ICON, UserPlaceholder } from '../../../Resources/assets';
import { theme } from '../../../Util/constant';
import { CustomText } from '../../../Component/CustomComponent';
import { fontResize } from '../../../Util/font';
import FastImage from 'react-native-fast-image';

const SearchUserList = ({ item, goToProfile }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => goToProfile(item?._id)}
      style={styles.container}
    >
      <FastImage
        style={styles.userImageStyle}
        defaultSource={UserPlaceholder}
        source={
          item?.image
            ? { uri: EndPoint.baseAssestURL + item?.image }
            : UserPlaceholder
        }
      />

      <View style={styles.userNameView}>
        <CustomText {...theme.fontRegular}>{item?.name || ''}{item?.gold_member ? <Image source={STAR_ICON} style={{height: 18, width: 18}}/> : ''}</CustomText>
        <CustomText
          numberOfLines={2}
          ellipsizeMode="tail"
          {...theme.fontRegular}
          textColor={Colors.DimGray}
          fontSize={`${fontResize(12)}px`}
        >
          {item?.role || ''}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default SearchUserList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 12,
    marginHorizontal: 4,
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
  },
  userNameView: {
    paddingHorizontal: 12,
    flex: 1,
  },
  userImageStyle: {
    height: 44,
    width: 44,
    borderRadius: 44 / 2,
  },
});
