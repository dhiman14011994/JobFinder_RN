import { View, Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  headerSearch,
  dummyJob,
  shareIcon,
  dummyPost,
  mapMarkerIcon,
} from '../../Resources/assets';
import { mxWidth } from '../../Util';
import Colors from '../../Resources/Colors';
import { theme } from '../../Util/constant';
import FastImage from 'react-native-fast-image';
import EndPoint from '../../Redux/constants/EndPoint';
import moment from 'moment';

const EventItem = ({ item, toDetails }) => {
  // const date = new Date(item?.date);
  const formatDate = moment(item?.date, 'YYYY-MM-DD HH:mm:ss Z')
    .local()
    .format('MMMM DD, YYYY');
  const formatTime = moment(item?.date, 'YYYY-MM-DD HH:mm:ss Z')
    .local()
    .format('hh:mm A');
  return (
    <TouchableOpacity
      onPress={() => toDetails(item?._id)}
      style={{
        paddingVertical: 19,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}
    >
      <View style={{ borderRadius: 20, overflow: 'hidden' }}>
        <FastImage
          resizeMode={FastImage.resizeMode.fill}
          style={{
            width: '100%',
            height: mxWidth * 0.3,
          }}
          source={
            item?.company_logo
              ? {
                  uri: EndPoint.baseAssestURL + item?.company_logo,
                  priority: FastImage.priority.high,
                }
              : dummyPost
          }
        />

        <View
          style={{
            paddingVertical: 12,
            backgroundColor: Colors.Blueberry,
            paddingHorizontal: 22,
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              style={{
                marginTop: -((mxWidth * 0.14) / 1.6),
                backgroundColor: Colors.White,
                borderRadius: 8,
                width: mxWidth * 0.14,
                height: mxWidth * 0.14,
              }}
              source={
                item?.company_logo
                  ? {
                      uri: EndPoint.baseAssestURL + item?.company_logo,
                      priority: FastImage.priority.high,
                    }
                  : dummyJob
              }
            />

            <Text
              style={{
                ...theme.fontSemiBold,
                fontSize: 18,
                color: Colors.White,
                paddingHorizontal: 16,
              }}
            >
              {item && item?.event_title}
            </Text>
          </View>
          <View style={{ paddingVertical: 8 }}>
            <Text
              style={{
                ...theme.fontRegular,
                fontSize: 14,
                color: Colors.White,
              }}
            >
              {item && item?.job_description}
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View
              style={{
                justifyContent: 'center',
                backgroundColor: Colors.White,
                alignItems: 'center',
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  ...theme.fontRegular,
                  fontSize: 12,
                  color: '#99C24D',
                  padding: 8,
                }}
              >
                `{item && item?.attendees} Attendees`
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                backgroundColor: Colors.White,
                alignItems: 'center',
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  ...theme.fontRegular,
                  fontSize: 12,
                  color: '#99C24D',
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                }}
              >
                {formatDate}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                backgroundColor: Colors.White,
                alignItems: 'center',
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  ...theme.fontRegular,
                  fontSize: 12,
                  color: '#99C24D',
                  padding: 8,
                }}
              >
                {formatTime}
              </Text>
            </View>
          </View>
          <View style={{ paddingVertical: 8, flexDirection: 'row' }}>
            <Image
              resizeMode="contain"
              style={{
                width: mxWidth * 0.03,
                height: mxWidth * 0.03,
              }}
              source={mapMarkerIcon}
            />
            <Text
              style={{
                ...theme.fontRegular,
                fontSize: 12,
                color: Colors.White,
                paddingHorizontal: 8,
              }}
            >
              {item && item?.address}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          right: 40,
          top: 40,
          position: 'absolute',
          backgroundColor: Colors.White,
          borderRadius: 60,
          padding: 6,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          resizeMode="contain"
          style={{
            width: mxWidth * 0.06,
            height: mxWidth * 0.06,
          }}
          source={shareIcon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default EventItem;
