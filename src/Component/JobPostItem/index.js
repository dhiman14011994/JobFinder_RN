import { View, Text, Switch, TouchableOpacity } from 'react-native';
import React from 'react';
import { dummyJob, PostPlaceholder } from '../../Resources/assets';
import { mxWidth } from '../../Util';
import { theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';
import FastImage from 'react-native-fast-image';
import EndPoint from '../../Redux/constants/EndPoint';
import { useState } from 'react';
import { fontResize } from '../../Util/font';

const JobPostItem = ({
  item,
  toDetails,
  isMyJob,
  isSwitchOn,
  onSwitchChangeValue,
  
}) => {
  const [isHidePost, setIsHidePost] = useState(
    item?.is_hide === 0 ? true : false
  );

  return (
    <TouchableOpacity
      onPress={() => toDetails(item && item?._id)}
      style={{
        flexDirection: 'row',
        paddingVertical: 18,
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          height: mxWidth * 0.12,
          width: mxWidth * 0.12,
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          style={{
            height: mxWidth * 0.12,
            width: mxWidth * 0.12,
            backgroundColor: 'white',
            borderRadius: 10,
          }}
          defaultSource={PostPlaceholder}
          source={
            item?.company_logo
              ? {
                  uri: EndPoint.baseAssestURL + item?.company_logo,
                  priority: FastImage.priority.high,
                }
              : PostPlaceholder
          }
        />
      </View>

      <View style={{ paddingHorizontal: 12 }}>
        <Text
          style={{
            ...theme.fontSemiBold,
            fontSize: fontResize(16),
            color: Colors.Black,
          }}
        >
          {item && item?.job_title}
        </Text>
        <Text
          style={{
            ...theme.fontRegular,
            fontSize: 14,
            paddingVertical: 6,
            color: Colors.Black,
          }}
        >
          {item && item?.company_name}
        </Text>
        <Text style={{ ...theme.fontRegular, fontSize: 14, color: '#99C24D' }}>
          {item && item?.salary_range} / {item && item?.salary_period}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: Colors.background,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          height: 26,
        }}
      >
        <Text
          style={{
            ...theme.fontRegular,
            fontSize: 12,
            paddingHorizontal: 8,
            color: Colors.Black,
          }}
        >
          {item && item?.job_type}
        </Text>
      </View>
      {isMyJob && (
        <Switch
          trackColor={{ false: '#767577', true: Colors.Blueberry }}
          thumbColor={isHidePost ? Colors.White : '#f4f3f4'}
          ios_backgroundColor={Colors.PrimaryLightGray}
          onValueChange={() => {
            setIsHidePost(!isHidePost);
            onSwitchChangeValue(item?._id, isHidePost ? 1 : 0);
          }}
          value={isHidePost}
        />
      )}
    </TouchableOpacity>
  );
};

export default JobPostItem;
