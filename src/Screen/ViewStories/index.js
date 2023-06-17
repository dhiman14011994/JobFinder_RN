/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  FlatList,
  useWindowDimensions,
  Modal,
  ScrollView,
} from 'react-native';
import React, { useRef, useState } from 'react';
import {
  storyBackIcon,
  dummyImage,
  PostPlaceholder,
  UserPlaceholder,
} from '../../Resources/assets';
import CustomHeader from '../../Component/CustomHeader';
import { mxHeight } from '../../Util';
import Colors from '../../Resources/Colors';
import { theme } from '../../Util/constant';
import CustomButton from '../../Component/CustomButton';
import Strings from '../../Resources/Strings';
import { useDispatch, useSelector } from 'react-redux';
import EndPoint from '../../Redux/constants/EndPoint';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { interestedInStoryAction } from '../../Redux/actions/homeAction';
import { setLoading } from '../../Redux/actions/authAction';
// import FastImage from 'react-native-fast-image';
const ViewStories = ({
  showStroies,
  onClose,
  story,
  onUserProfile,
  currentUserId,
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  // const storyData = useSelector(state => state.home.storyData);

  const convertHMS = (date1) => {
    var msDiff = new Date();
    var PastYear = moment(date1).format('yyyy');
    var PastMonth = moment(date1).format('MM');
    var PastDate = moment(date1).format('DD');
    var PastHours = moment(date1).format('HH');
    var PastMinutes = moment(date1).format('mm');
    var PastSeconds = moment(date1).format('ss');
    var currentYear = msDiff.getFullYear();
    var currentmonth = msDiff.getMonth() + 1;
    var currentday = msDiff.getDate();
    var currentHours = msDiff.getHours();
    var currentMinutes = msDiff.getMinutes();
    var currentSeconds = msDiff.getSeconds();
    var defYear = currentYear - PastYear;
    var defMonth = currentmonth - PastMonth;
    var defDay = currentday - PastDate;
    var defHour = currentHours - PastHours;
    var defMinutes = currentMinutes - PastMinutes;
    var defSecond = currentSeconds - PastSeconds;

    if (defYear > 0) {
      let year = defYear + ' Y';
      return year;
    } else if (Number(defMonth) > 0) {
      let year = defMonth + ' M';
      return year;
    } else if (Number(defDay) > 0) {
      let year = defDay + ' D';
      return year;
    } else if (Number(defHour) > 0) {
      // if()
      if (Number(defMinutes) < 0) {
        let newHour = Number(defHour) - 1;
        let year =
          newHour == 0
            ? 60 + Number(defMinutes) + ' min'
            : newHour + ' hr ' + 60 + Number(defMinutes) + ' min';
        return year;
      } else {
        let year = defHour + ' hr';
        return year;
      }
    } else if (Number(defMinutes) > 0) {
      let year = defMinutes + ' min';
      return year;
    } else {
      let year = defSecond + ' sec';
      return year;
    }
  };

  const interestedTheStory = (res) => {
    try {
      const params = {
        user_id: res.user_id,
      };

      dispatch(setLoading(true));
      dispatch(
        interestedInStoryAction({
          params,
          onSuccess: (result) => {
            dispatch(setLoading(false));
          },
          onError: (error) => {
            dispatch(setLoading(false));
          },
        })
      );
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const renderItems = ({ item, index }) => {
    const keywords = item?.keywords.split(',');
    var fromTime = new Date(item?.created_at);
    var dateAgo = convertHMS(fromTime);
    return (
      <View
        style={{
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
          backgroundColor: item && item?.bgcolor,
          width: width,
          flex: 1,
          padding: 30,
        }}
      >
        <ScrollView bounces={false}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 18,
            }}
          >
            <TouchableOpacity onPress={() => onUserProfile(item?.user_id)}>
              <FastImage
                style={{
                  height: 60,
                  width: 60,
                  borderColor: Colors.White,
                  borderWidth: 3,
                  borderRadius: 30,
                }}
                defaultSource={UserPlaceholder}
                source={{
                  uri: EndPoint.baseAssestURL + story?.image,
                }}
              />
            </TouchableOpacity>
            <Text style={{ color: Colors.White, ...theme.fontSemiBold }}>
              {dateAgo + ' ago'}
            </Text>
          </View>
          <View style={{ paddingVertical: 12 }}>
            <Text
              style={{
                fontSize: 20,
                color: Colors.White,
                ...theme.fontSemiBold,
                textAlign: 'justify',
              }}
            >
              {item && item?.title}
            </Text>
          </View>
          {item?.image && (
            <View style={{ paddingVertical: 12 }}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                defaultSource={PostPlaceholder}
                source={{
                  uri: EndPoint.baseAssestURL + item?.image,
                  priority: FastImage.priority.high,
                }}
                style={{
                  height: width * 0.35,
                  width: '100%',
                }}
              />
            </View>
          )}
          <View style={{ paddingVertical: 12 }}>
            <Text
              style={{
                fontSize: 16,
                color: Colors.White,
                ...theme.fontMedium,
                textAlign: 'justify',
              }}
            >
              {item && item?.description}
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 22,
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}
          >
            {keywords.map((item) => {
              return (
                <View
                  style={{
                    paddingHorizontal: 16,
                    backgroundColor: Colors.DimGray,
                    marginHorizontal: 6,
                    marginVertical: 4,
                    paddingVertical: 6,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.White,
                      ...theme.fontSemiBold,
                    }}
                  >
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={{ paddingVertical: 12 }}>
            {currentUserId !== item.user_id ? (
              <CustomButton
                width={'100%'}
                height={'55px'}
                backgroundColor={Colors.White}
                marginBottom={'22px'}
                borderRadius={'10px'}
                alignItems={'center'}
                justifyContent={'center'}
                fontFamily={'Gilroy-SemiBold'}
                fontSize={'18px'}
                textColor={Colors.Blueberry}
                onPress={() => interestedTheStory(item)}
                text={Strings.IM_INTERESTED}
              />
            ) : (
              <View />
            )}
          </View>
        </ScrollView>
      </View>
    );
  };
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={showStroies}
      onRequestClose={() => {
        console.log('Modal has been closed.');
      }}
      style={{ flex: 1, backgroundColor: 'red' }}
    >
      <View
        style={{
          marginTop: mxHeight * 0.15,
          backgroundColor: Colors.White,
          flex: 1,
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
        }}
      >
        <CustomHeader
          leftButtons={
            <TouchableOpacity
              onPress={() => onClose()}
              style={{
                height: 50,
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F7F9FA',
                borderRadius: 12,
              }}
            >
              <Image
                resizeMode="contain"
                style={{ height: 14, width: 14 }}
                source={storyBackIcon}
              />
            </TouchableOpacity>
          }
          rightButtons={
            <>
              <TouchableOpacity
                onPress={() => onClose()}
                style={{ padding: 6 }}
              >
                <Text style={{ color: Colors.DimGray, ...theme.fontSemiBold }}>
                  Close
                </Text>
              </TouchableOpacity>
            </>
          }
          title={'Stories'}
        />
        <View
          style={{
            height: 44,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {story &&
            story.stories &&
            story?.stories?.map((item, index) => {
              const widthDot = scrollX.interpolate({
                inputRange: [
                  (index - 1) * width,
                  index * width,
                  (index + 1) * width,
                ],
                outputRange: [10, 30, 10],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  style={{
                    width: widthDot,
                    height: 8,
                    borderRadius: 10,
                    backgroundColor: Colors.Blueberry,
                    marginHorizontal: 8,
                  }}
                />
              );
            })}
        </View>
        <FlatList
          pagingEnabled
          data={story?.stories || []}
          horizontal
          bounces={false}
          renderItem={renderItems}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        />
      </View>
    </Modal>
  );
};

export default ViewStories;
