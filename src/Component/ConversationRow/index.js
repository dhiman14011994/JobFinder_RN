import { View, Text, TouchableOpacity,Image } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { STAR_ICON, dummyImage } from '../../Resources/assets';
import { CustomText } from '../CustomComponent';
import { fontResize } from '../../Util/font';
import { compareTodayDate, theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';
import EndPoint from '../../Redux/constants/EndPoint';
import moment from 'moment';

const ConversationRow = ({ data, onPressChat }) => {
  const newTime = data?.dateTime
    ? new Date(
        data?.dateTime?.seconds * 1000 + data?.dateTime?.nanoseconds / 1000000
      )
    : '';
  const atTime = data?.dateTime ? newTime.toLocaleTimeString() : '';
  const time = data?.dateTime ? atTime : data?.created_at;
  const fireBaseTime = new Date(
    data?.dateTime?.seconds * 1000 + data?.dateTime?.nanoseconds / 1000000
  );

  const updateTime =
    time == undefined
      ? ''
      : time == null
      ? ''
      : data?.dateTime
      ? moment(atTime, 'HH:mm:ss').format('LT')
      : moment(time).format('hh:mm A');

  const currentDateTime = data?.dateTime?.toDate()
    ? compareTodayDate(data?.dateTime?.toDate()) == 'Today'
      ? moment(data?.dateTime?.toDate()).format('HH:mm')
      : compareTodayDate(data?.dateTime?.toDate())
    : '';

  return (
    <TouchableOpacity
      onPress={onPressChat}
      activeOpacity={1}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingHorizontal: 28,
        backgroundColor: '#fff',
      }}
    >
      <FastImage
        resizeMode="contain"
        style={{ width: 60, height: 60, borderRadius: 30 }}
        source={
          data?.image
            ? { uri: EndPoint.baseAssestURL + data?.image }
            : data?.user?.image
            ? { uri: EndPoint.baseAssestURL + data?.user?.image }
            : dummyImage
        }
      />
      <View style={{ paddingHorizontal: 12, flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {console.log("data>>", data)}
          <CustomText
            fontSize={`${fontResize(15)}px`}
            marginBottom={'10px'}
            {...theme.fontMedium}
          >
            {data?.name
              ? data?.name
              : data?.description
              ? data?.description
              : 'abc'}{data.gold_member ? <Image source={STAR_ICON} style={{height: fontResize(15), width: fontResize(15)}}/> : ''}
          </CustomText>

          <CustomText
            {...theme.fontMedium}
            fontSize={`${fontResize(14)}px`}
            textColor={Colors.DimGray}
          >
            {currentDateTime}
          </CustomText>
        </View>
        {data?.message ? (
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={{ flex: 1 }}>
              <CustomText
                {...theme.fontMedium}
                fontSize={`${fontResize(14)}px`}
                textColor={Colors.DimGray}
              >
                {data?.message
                  ? data?.message
                  : 'Please send us the list of applicants.'}
              </CustomText>
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ConversationRow;
