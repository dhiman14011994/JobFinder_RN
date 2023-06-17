import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import {
  dummyJob,
  dummyPost,
  deleteRed,
  webEditIcon,
} from '../../Resources/assets';
import { mxWidth } from '../../Util';
import Colors from '../../Resources/Colors';
import { theme } from '../../Util/constant';
import FastImage from 'react-native-fast-image';
import EndPoint from '../../Redux/constants/EndPoint';
import moment from 'moment';
import { setLoading } from '../../Redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { deletePromotionById } from '../../Redux/services/promotionService';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from '../../Navigation/routeName';

const PromotionItem = ({ item, toDetails }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [isDelete, setDelete] = useState(false);
  const startFormatDate = moment(item?.start_date, 'YYYY-MM-DD HH:mm:ss Z')
    .local()
    .format('MMMM DD, YYYY');
  const endFormatDate = moment(item?.end_date, 'YYYY-MM-DD HH:mm:ss Z')
    .local()
    .format('MMMM DD, YYYY');

  const deleteEvent = async () => {
    try {
      dispatch(setLoading(true));
      let apiRequestData = {};

      var data = {
        id: item?._id,
      };
      apiRequestData = { ...data };

      var deletePromotionResponse = await deletePromotionById(apiRequestData);

      if (deletePromotionResponse.code == 200) {
        dispatch(setLoading(false));
        Emitter.emit('PromotionCreated');
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log('error', error);
      dispatch(setLoading(false));
    }
  };

  const deltePopup = () => {
    Alert.alert('Delete', 'Are you sure you want to delete?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deleteEvent();
        },
      },
    ]);
  };

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
            item?.image
              ? {
                  uri: EndPoint.baseAssestURL + item?.image,
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
              resizeMode={FastImage.resizeMode.cover}
              style={{
                marginTop: -((mxWidth * 0.14) / 1.6),
                backgroundColor: Colors.White,
                borderRadius: 8,
                width: mxWidth * 0.14,
                height: mxWidth * 0.14,
              }}
              source={
                item?.image
                  ? {
                      uri: EndPoint.baseAssestURL + item?.image,
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
              {item && item?.promotion_title}
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
              {item && item?.description}
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
                `{item && item?.amount}`
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
                {startFormatDate}
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
                {endFormatDate}
              </Text>
            </View>
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
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          deltePopup();
        }}
      >
        <Image
          resizeMode="contain"
          style={{
            width: mxWidth * 0.04,
            height: mxWidth * 0.04,
          }}
          source={deleteRed}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          right: 90,
          top: 40,
          position: 'absolute',
          backgroundColor: Colors.White,
          borderRadius: 60,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate(RouteName.CREATE_PROMOTIONS, {
            data: item,
            isEdited: true,
          });
        }}
      >
        <Image
          resizeMode="contain"
          style={{
            width: mxWidth * 0.04,
            height: mxWidth * 0.04,
          }}
          source={webEditIcon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PromotionItem;
