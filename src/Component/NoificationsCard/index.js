import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { ButtonContainer, CustomText, Image } from '../CustomComponent';
import Colors from '../../Resources/Colors';
import { style } from './style';
import CustomButton from '../CustomButton';
import Strings from '../../Resources/Strings';
import FastImage from 'react-native-fast-image';
import { AdminIcon, UserPlaceholder } from '../../Resources/assets';
import EndPoint from '../../Redux/constants/EndPoint';

const NotificationsCard = ({
  userImage,
  title,
  description,
  referenceNo,
  reviewPress,
  isSelected,
  time,
  subscriptionType,
  userNamePress,
  item,
  onPress,
}) => {
  return (
    <TouchableOpacity
      disabled={item?.admin_title ? true : item?.data == null ? true : false}
      style={style.container}
      onPress={onPress}
    >
      <TouchableOpacity
        disabled={item?.admin_title ? true : false}
        onPress={() => {
          userNamePress();
        }}
      >
        <FastImage
          style={style.userImage}
          source={
            item?.admin_title
              ? AdminIcon
              : item?.user?.image
              ? { uri: EndPoint.baseAssestURL + item?.user?.image }
              : UserPlaceholder
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={item?.data?.post_id ? false : true}
        onPress={onPress}
        style={style.subContainer}
      >
        <CustomText fontSize={'14px'} textColor={Colors.Black}>
          {title}
        </CustomText>
        <CustomText
          disabled={item?.admin_title ? true : false}
          onPress={() => {
            userNamePress();
          }}
          fontSize="12px"
          marginTop={'8px'}
          textColor={Colors.PrimaryGray4}
        >
          {description}
        </CustomText>
        {!isSelected && (
          <CustomText
            fontSize="12px"
            marginTop={'8px'}
            textColor={
              subscriptionType == 1 ? Colors.Marigold : Colors.PrimaryGray4
            }
          >
            {subscriptionType == 1
              ? 'Gold Member'
              : subscriptionType == 0
              ? 'Basic Member'
              : ''}
          </CustomText>
        )}

        {/* <CustomButton
          width={'70%'}
          height={'40px'}
          backgroundColor={Colors.Crayola}
          marginTop={12}
          borderRadius={'10px'}
          alignItems={'center'}
          justifyContent={'center'}
          fontFamily={'Gilroy-SemiBold'}
          fontSize={'18px'}
          textColor={Colors.Ochre}
          onPress={() => {
            reviewPress();
          }}
          text={Strings.UNDER_REVIEW}
        /> */}
      </TouchableOpacity>
      {time ? (
        <CustomText fontSize="10px" textColor={Colors.PrimaryGray4}>
          {time}
        </CustomText>
      ) : null}
    </TouchableOpacity>
  );
};

export default NotificationsCard;
