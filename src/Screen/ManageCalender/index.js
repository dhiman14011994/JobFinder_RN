/* eslint-disable no-loop-func */
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Calendar,
  TimelineList,
  AgendaList,
  ExpandableCalendar,
  CalendarProvider,
} from 'react-native-calendars';
import CustomHeader from '../../Component/CustomHeader';
import { backIcon, dummyJob, PostPlaceholder } from '../../Resources/assets';
import Colors from '../../Resources/Colors';
import moment from 'moment';
import { useState } from 'react';
import { CustomText } from '../../Component/CustomComponent';
import { fontResize } from '../../Util/font';
import { theme } from '../../Util/constant';
import Timeline from 'react-native-timeline-flatlist';
import FastImage from 'react-native-fast-image';
import EndPoint from '../../Redux/constants/EndPoint';
import {
  calendarLeftArrowIcon,
  calendarRightArrowIcon,
} from '../../Resources/assets';
import { useSelector } from 'react-redux';
import Strings from '../../Resources/Strings';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const items = [
  {
    time: '09:00 - 10:00',
    title: 'Event 1',
    description: 'Event 1 Description',
  },
  {
    time: '011:00 - 12:00',
    title: 'Event 2',
    description: 'Event 2 Description',
  },
  {
    time: '01:00 - 02:00',
    title: 'Event 3',
    description: 'Event 3 Description',
  },
  {
    time: '03:00 - 04:00',
    title: 'Event 4',
    description: 'Event 4 Description',
  },
  {
    time: '05:00 - 06:00',
    title: 'Event 5',
    description: 'Event 5 Description',
  },
];

const ManageCalendar = ({ navigation, route }) => {
  const flatlistRef = useRef();
  const { events, monthIndexToMove, allData } = route.params;
  const [currentMonthIndex, setCurrentMonthIndex] = useState(monthIndexToMove);
  const [timelineData, setTimeLineData] = useState([]);
  const [markedDates, setMarkedDates] = useState([]);
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const createTimeLineForEvent = (dateValue) => {
    const currentMonthIndexd = moment(dateValue).month();
    let timeLineHours = [];
    console.log('allData', allData);
    let getMonthEvents =
      allData && allData?.length > 0 && allData[currentMonthIndexd];
    // console.log('initDate', getMonthEvents);
    let getDateEvents = getMonthEvents.date.filter((item) => {
      const eventDate =
        type == Strings.PROFESSIONAL
          ? moment(item?.event?.date, 'YYYY-MM-DD HH:mm:ss Z').format(
              'YYYY-MM-DD'
            )
          : moment(item?.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
      return moment(eventDate).isSame(dateValue);
    });

    let marekdDate = getMonthEvents.date.map((item) => {
      if (item?.event?.date || item?.date) {
        const eventDate =
          type == Strings.PROFESSIONAL
            ? moment(item?.event?.date, 'YYYY-MM-DD HH:mm:ss Z').format(
                'YYYY-MM-DD'
              )
            : moment(item?.date, 'YYYY-MM-DD').format('YYYY-MM-DD');

        return {
          [eventDate]: { selected: true },
        };
      }
    });
    let value = marekdDate.reduce(function (result, item) {
      var key = Object.keys(item)[0]; //first property: a, b, c
      result[key] = item[key];
      return result;
    }, {});
    setMarkedDates(value);

    var hours = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        hours.push(moment({ hour, minute }).format('hh:mm A'));
      }
    }

    let count = 0;
    for (let i = 0; i < hours.length; i++) {
      if (timeLineHours.length < hours.length) {
        let time = `${hours[count]} - ${
          hours[count + 1] ? hours[count + 1] : hours[0]
        }`;
        var eventArr = [];
        if (getDateEvents && getDateEvents?.length > 0) {
          getDateEvents.forEach((event) => {
            const eventDate =
              type == Strings.PROFESSIONAL
                ? moment(event?.event?.date, 'YYYY-MM-DD HH:mm:ss Z').format(
                    'YYYY-MM-DD'
                  )
                : moment(event?.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
            const eventTime =
              type == Strings.PROFESSIONAL
                ? moment(event?.event?.date, 'YYYY-MM-DD HH:mm:ss Z').format(
                    'hh:mm A'
                  )
                : moment(event?.startTime, 'hh:mm A').format('hh:mm A');
            var eventD = {};

            let date1 = moment(
              `${eventDate} ${eventTime}`,
              'YYYY-MM-DD hh:mm A'
            );
            let date2 = moment(
              `${eventDate} ${hours[count]}`,
              'YYYY-MM-DD hh:mm A'
            );
            let date3 = moment(
              `${eventDate} ${hours[count + 1] ? hours[count + 1] : hours[0]}`,
              'YYYY-MM-DD hh:mm A'
            );
            if (date1.isAfter(date2) && date1.isBefore(date3)) {
              eventD = type == Strings.PROFESSIONAL ? event?.event : event;
              eventArr.push(eventD);
            }
          });
          timeLineHours.push({
            time: time,
            startTime: hours[count],
            endTime: hours[count + 1] ? hours[count + 1] : hours[0],
            eventD: eventArr,
          });
        } else {
          timeLineHours.push({
            time: time,
            startTime: hours[count],
            endTime: hours[count + 1] ? hours[count + 1] : hours[0],
            eventD: [],
          });
        }
        count += 1;
      }

      setTimeLineData(timeLineHours);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 40,
          borderColor:
            index == currentMonthIndex ? Colors.Blueberry : Colors.DimGray,
          borderWidth: 1,
          marginHorizontal: 12,
          borderRadius: 20,
        }}
      >
        <CustomText
          fontSize={fontResize(16)}
          {...theme.fontMedium}
          style={{ color: Colors.Black }}
        >
          {item}
        </CustomText>
      </View>
    );
  };
  useEffect(() => {
    let initDate = moment(currentMonthIndex + 1, 'M').format('YYYY-MM-DD');
    createTimeLineForEvent(initDate);
  }, []);
  useEffect(() => {
    // scroll to current month
    if (flatlistRef.current) {
      flatlistRef.current.scrollToIndex({
        index: monthIndexToMove,
        animated: true,
      });
    }
  }, [currentMonthIndex]);

  const moveToBack = () => {
    var moveToBackIndex = currentMonthIndex - 1;
    if (moveToBackIndex < 12 && moveToBackIndex >= 0) {
      setCurrentMonthIndex(moveToBackIndex);
      setTimeout(() => {
        flatlistRef.current.scrollToIndex({
          index: moveToBackIndex,
          animated: true,
        });
      }, 200);
    }
  };

  const moveToForward = () => {
    var moveToForwardIndex = currentMonthIndex + 1;

    if (moveToForwardIndex < 12 && moveToForwardIndex >= 0) {
      setCurrentMonthIndex(moveToForwardIndex);
      setTimeout(() => {
        flatlistRef.current.scrollToIndex({
          index: moveToForwardIndex,
          animated: true,
        });
      }, 200);
    }
  };
  let initDate = moment(currentMonthIndex + 1, 'M').format('YYYY-MM-DD');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.White }}>
      <CustomHeader
        leftButtons={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 12 }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 26, width: 26 }}
              source={backIcon}
            />
          </TouchableOpacity>
        }
        rightButtons={<></>}
        title={'My Event Dates'}
      />
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={moveToBack} style={{ padding: 12 }}>
          <Image
            resizeMode="contain"
            style={{ height: 18, width: 18 }}
            source={calendarLeftArrowIcon}
          />
        </TouchableOpacity>
        <FlatList
          ref={flatlistRef}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={months}
          onScrollToIndexFailed={(error) => {
            setTimeout(() => {
              if (months.length !== 0 && flatlistRef !== null) {
                flatlistRef.current.scrollToIndex({
                  index: error.index,
                  animated: true,
                });
              }
            }, 100);
          }}
          renderItem={renderItem}
        />
        <TouchableOpacity onPress={moveToForward} style={{ padding: 12 }}>
          <Image
            resizeMode="contain"
            style={{ height: 18, width: 18 }}
            source={calendarRightArrowIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={{ paddingVertical: 16, paddingHorizontal: 16 }}>
        <CustomText
          fontSize={fontResize(20)}
          {...theme.fontMedium}
          style={{ color: Colors.Black }}
        >
          {moment(currentMonthIndex + 1, 'M').format('MMMM YYYY')}
        </CustomText>
      </View>

      <CalendarProvider
        date={initDate}
        onDateChanged={() => {}}
        onMonthChange={() => {}}
        showTodayButton={false}
        disabledOpacity={0.6}
      >
        <ExpandableCalendar
          pastScrollRange={0}
          futureScrollRange={0}
          onCalendarToggled={(value) => {
            setIsCalendarExpanded(value);
          }}
          markedDates={markedDates}
          theme={{
            selectedDayBackgroundColor: Colors.Blueberry,
            todayTextColor: Colors.Blueberry,
            monthTextColor: Colors.White,
          }}
          date={initDate}
          hideArrows={true}
          allowShadow={false}
          onDayPress={(date) => {
            let dateString = date.dateString;
            createTimeLineForEvent(dateString);
          }}
        />
        {!isCalendarExpanded && (
          <View style={{ flex: 1 }}>
            <Timeline
              separator={true}
              lineWidth={0}
              circleStyle={{ width: 0 }}
              data={timelineData}
              timeStyle={{
                textAlign: 'center',
                paddingLeft: 12,
                color: Colors.Black,
                padding: 5,
                ...theme.fontSemiBold,
              }}
              renderDetail={(data, sectionID, rowID) => {
                return (
                  <>
                    {data?.eventD.length > 0 ? (
                      data?.eventD.map((item) => {
                        const eventDate = moment(
                          item?.date,
                          'YYYY-MM-DD HH:mm:ss Z'
                        ).format('YYYY-MM-DD');
                        const eventTime =
                          type == Strings.PROFESSIONAL
                            ? moment(
                                item?.date,
                                'YYYY-MM-DD HH:mm:ss Z'
                              ).format('hh:mm A')
                            : `${item?.startTime} - ${item?.endTime}`;
                        return (
                          <View
                            style={{
                              marginBottom: 10,
                              backgroundColor: '#E0E7FF',
                              flexDirection: 'row',
                              borderRadius: 16,
                              // marginHorizontal: 12,
                              paddingHorizontal: 12,
                              paddingVertical: 14,
                              alignItems: 'center',
                            }}
                          >
                            <FastImage
                              style={{ height: 44, width: 44 }}
                              defaultSource={PostPlaceholder}
                              source={
                                type == Strings.PROFESSIONAL
                                  ? item?.company_logo
                                    ? {
                                        uri:
                                          EndPoint.imageBaseURL +
                                          item?.company_logo,
                                      }
                                    : PostPlaceholder
                                  : item?.userinfo?.image
                                  ? {
                                      uri:
                                        EndPoint.imageBaseURL +
                                        item?.userinfo?.image,
                                    }
                                  : PostPlaceholder
                              }
                            />
                            <View style={{ marginHorizontal: 12 }}>
                              <CustomText
                                fontSize={fontResize(15)}
                                {...theme.fontSemiBold}
                                style={{ color: Colors.Black }}
                              >
                                {type == Strings.PROFESSIONAL
                                  ? item && item?.event_title
                                  : item && `${item?.userinfo.name} | `}{' '}
                                <CustomText
                                  fontSize={fontResize(15)}
                                  {...theme.fontSemiBold}
                                  style={{ color: '#777E90' }}
                                >
                                  {type == Strings.PROFESSIONAL
                                    ? ''
                                    : `${item?.note}`}
                                </CustomText>
                              </CustomText>
                              <CustomText
                                fontSize={fontResize(13)}
                                {...theme.fontMedium}
                                style={{
                                  color: Colors.Black,
                                  paddingVertical: 6,
                                }}
                              >
                                {eventDate}
                              </CustomText>
                              <CustomText
                                fontSize={fontResize(13)}
                                {...theme.fontMedium}
                                style={{ color: Colors.Black }}
                              >
                                {eventTime}
                              </CustomText>
                            </View>
                          </View>
                        );
                      })
                    ) : (
                      <View style={{ paddingVertical: 30 }} />
                    )}
                  </>
                );
              }}
            />
          </View>
        )}
      </CalendarProvider>
    </SafeAreaView>
  );
};

export default ManageCalendar;
