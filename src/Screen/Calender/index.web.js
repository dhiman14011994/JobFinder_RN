/* eslint-disable no-loop-func */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  useWindowDimensions,
} from 'react-native-web';
import React, { useState, useRef, useEffect } from 'react';
import Colors from '../../Resources/Colors';
import moment from 'moment';
import Emitter from '../../Util/eventEmitter';
import { getCalenderEvents } from '../../Redux/services/calenderService';
import { useDispatch, useSelector } from 'react-redux';
import {
  backIcon,
  calendarLeftArrowIcon,
  calendarRightArrowIcon,
  dummyJob,
  PostPlaceholder,
  rightIcon,
} from '../../Resources/assets';
import { CustomText, CustomView } from '../../Component/CustomComponent';
import { theme } from '../../Util/constant';
import { fontResize } from '../../Util/font';
import Strings from '../../Resources/Strings';

import Calendar from 'react-calendar';
import './Calendar.css';
import { setLoading } from '../../Redux/actions/authAction';
import {
  deleteInterviewAction,
  getInterviewAction,
} from '../../Redux/actions/jobAndEventAction';
import { mxHeight } from '../../Util';
import EndPoint from '../../Redux/constants/EndPoint';
import VectorIcon from '../../Resources/assets/Vector.png';

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

const Calender = () => {
  const curentmonth = new Date().getMonth();
  const dispatch = useDispatch();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(curentmonth);
  const [markedDates, setMarkedDates] = useState([]);
  const [timelineData, setTimeLineData] = useState([]);
  const flatlistRef = useRef();
  const [allData, setAllEvents] = useState([]);
  const [eventsDate, setEventsDate] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const window = useWindowDimensions();
  const [value, onChange] = useState(new Date());
  const [isSelectedDate, setSelectedDate] = useState(false);
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;
  var date11 = new Date();
  useEffect(() => {
    if (flatlistRef.current) {
      flatlistRef.current.scrollToIndex({
        index: currentMonthIndex,
        animated: true,
      });
    }
  }, [currentMonthIndex]);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          var moveToForwardIndex = index + 1;
          setCurrentMonthIndex(moveToForwardIndex);
          var initDate = new Date(
            date11.getFullYear(),
            date11.getMonth() + moveToForwardIndex,
            1
          );
          onChange(initDate);
        }}
        style={{
          paddingVertical: window.height * 0.005,
          paddingHorizontal: window.width * 0.01,
          borderColor:
            index === currentMonthIndex ? Colors.Blueberry : Colors.DimGray,
          borderWidth: 1,
          marginHorizontal: window.width * 0.007,
          borderRadius: window.width * 0.012,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CustomText
          fontSize={fontResize(window.width * 0.01)}
          {...theme.fontMedium}
          style={{ color: Colors.Black }}
        >
          {item}
        </CustomText>
      </TouchableOpacity>
    );
  };

  const moveToBack = () => {
    var moveToBackIndex = currentMonthIndex - 1;
    if (moveToBackIndex < 12 && moveToBackIndex >= 0) {
      setCurrentMonthIndex(moveToBackIndex);
      var initDate = new Date(
        date11.getFullYear(),
        date11.getMonth() + moveToBackIndex,
        1
      );
      onChange(initDate);
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
      var initDate = new Date(
        date11.getFullYear(),
        date11.getMonth() + moveToForwardIndex,
        1
      );
      onChange(initDate);
      setTimeout(() => {
        flatlistRef.current.scrollToIndex({
          index: moveToForwardIndex,
          animated: true,
        });
      }, 200);
    }
  };

  const createTimeLineForEvent = (dateValue) => {
    const currentMonthIndexd = moment(dateValue).month();
    let timeLineHours = [];
    let getMonthEvents =
      allData && allData?.length > 0 && allData[currentMonthIndexd];

    let getDateEvents = getMonthEvents?.date?.filter((item) => {
      const eventDate =
        type == Strings.PROFESSIONAL
          ? moment(item?.event?.date, 'YYYY-MM-DD HH:mm:ss Z').format(
              'YYYY-MM-DD'
            )
          : moment(item?.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
      return moment(eventDate).isSame(dateValue);
    });

    let marekdDate = getMonthEvents?.date?.map((item) => {
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
    let value = marekdDate?.reduce(function (result, item) {
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
          getDateEvents?.forEach((event) => {
            const eventDate =
              type === Strings.PROFESSIONAL
                ? moment(event?.event?.date, 'YYYY-MM-DD HH:mm:ss Z').format(
                    'YYYY-MM-DD'
                  )
                : moment(event?.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
            const eventTime =
              type === Strings.PROFESSIONAL
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

  useEffect(async () => {
    if (type !== Strings.PROFESSIONAL) {
      fetchAllInterView();
      Emitter.on('InterviewCreated', () => {
        fetchAllInterView();
      });
    } else {
      fetchAllData();

      Emitter.on('EventCreated', () => {
        fetchAllData();
      });
    }
    return () => {
      Emitter.off('InterviewCreated');
      Emitter.off('EventCreated');
    };
  }, []);

  const fetchAllInterView = () => {
    if (type !== Strings.PROFESSIONAL) {
      dispatch(setLoading(true));
      dispatch(
        getInterviewAction({
          onSuccess: async (result) => {
            dispatch(setLoading(false));
            if (result.code == 200) {
              var monthLists = [
                { title: 'January', date: [] },
                { title: 'February', date: [] },
                { title: 'March', date: [] },
                { title: 'April', date: [] },
                { title: 'May', date: [] },
                { title: 'June', date: [] },
                { title: 'July', date: [] },
                { title: 'August', date: [] },
                { title: 'September', date: [] },
                { title: 'October', date: [] },
                { title: 'November', date: [] },
                { title: 'December', date: [] },
              ];

              var updateMonth = monthLists?.map((items, index) => {
                let asd = [];
                var getDate = result?.data.map((item, index) => {
                  var updateDate = moment(item?.date, 'YYYY-MM-DD');
                  if (updateDate?.format('MMMM') == items?.title) {
                    asd.push(item);
                  }
                });
                return { ...items, date: asd };
              });
              let newInterviewDate = [];
              console.log('newEventsDate', result?.data);
              var eventsDate = result?.data?.map((it, index) => {
                if (it != null) {
                  let newDate = moment(it?.date, 'YYYY/MM/DD');
                  let day = newDate.format('DD');
                  let month = newDate.format('MM');
                  const realDate =
                    day + '-' + month + '-' + newDate.format('YYYY');
                  newInterviewDate.push(realDate);
                }
              });
              setEventsDate(newInterviewDate);
              console.log('newEventsDate', newInterviewDate);
              setAllEvents(updateMonth);
              let initDate = moment(currentMonthIndex + 1, 'M').format(
                'YYYY-MM-DD'
              );
              createTimeLineForEvent(initDate);
            } else {
              setAllEvents(monthLists);
              let initDate = moment(currentMonthIndex + 1, 'M').format(
                'YYYY-MM-DD'
              );
              createTimeLineForEvent(initDate);
            }
          },
          onError: (error) => {
            console.log('error', error);
            dispatch(setLoading(false));
          },
        })
      );
    }
  };

  const fetchAllData = async () => {
    const eventData = await getCalenderEvents(userData?.access_token);
    var monthLists = [
      { title: 'January', date: [] },
      { title: 'February', date: [] },
      { title: 'March', date: [] },
      { title: 'April', date: [] },
      { title: 'May', date: [] },
      { title: 'June', date: [] },
      { title: 'July', date: [] },
      { title: 'August', date: [] },
      { title: 'September', date: [] },
      { title: 'October', date: [] },
      { title: 'November', date: [] },
      { title: 'December', date: [] },
    ];
    if (eventData.code == 200) {
      var updateMonth = monthLists?.map((items, index) => {
        let asd = [];
        var getDate = eventData?.data.map((item, index) => {
          if (item?.event != null) {
            var updateDate = moment(item?.event?.date, 'YYYY-MM-DD');
            if (updateDate?.format('MMMM') === items?.title) {
              asd.push(item);
            }
          }
        });
        return { ...items, date: asd };
      });
      let newEventsDate = [];
      var eventsDate = eventData?.data?.map((it, index) => {
        if (it?.event != null) {
          let newDate = moment(it?.event?.date, 'YYYY/MM/DD');
          let day = newDate.format('DD');
          let month = newDate.format('MM');
          const realEventDate =
            day + '-' + month + '-' + newDate.format('YYYY');
          newEventsDate.push(realEventDate);
        }
      });
      setEventsDate(newEventsDate);
      setAllEvents(updateMonth);
      let initDate = moment(currentMonthIndex + 1, 'M').format('YYYY-MM-DD');
      createTimeLineForEvent(initDate);
    } else {
      setAllEvents(monthLists);
      let initDate = moment(currentMonthIndex + 1, 'M').format('YYYY-MM-DD');
      createTimeLineForEvent(initDate);
    }
  };

  return (
    <View
      style={{
        marginTop: '5%',
        paddingVertical: '5%',
        backgroundColor: Colors.White,
        borderRadius: window.width * 0.01,
      }}
    >
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        {isSelectedDate ? (
          <TouchableOpacity
            style={{ width: '20%', marginLeft: '5%' }}
            onPress={() => setSelectedDate(false)}
          >
            <Image
              style={{
                height: window.width * 0.014,
                width: window.width * 0.014,
              }}
              resizeMode={'contain'}
              source={backIcon}
            />
          </TouchableOpacity>
        ) : (
          <View style={{ width: '25%' }} />
        )}
        <CustomText
          style={{ width: '50%', paddingVertical: '3%' }}
          textAlign={'center'}
          fontFamily={'Gilroy-bold'}
          fontSize={fontResize(window.width * 0.01)}
        >
          {Strings.MY_EVENT_DATES}
        </CustomText>
        <View style={{ width: '25%' }} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '96%',
          overflow: 'hidden',
          marginHorizontal: '2%',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity onPress={moveToBack} style={{ padding: 12 }}>
          <Image
            resizeMode="contain"
            style={{ height: 18, width: 18 }}
            source={calendarLeftArrowIcon}
          />
        </TouchableOpacity>

        <View style={{ width: '76%' }}>
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
        </View>
        <TouchableOpacity onPress={moveToForward} style={{ padding: 12 }}>
          <Image
            resizeMode="contain"
            style={{ height: 18, width: 18 }}
            source={calendarRightArrowIcon}
          />
        </TouchableOpacity>
      </View>

      <Text
        style={{
          ...theme.fontSemiBold,
          fontSize: fontResize(mxHeight * 0.018),
          color: Colors.Black,
          marginTop: mxHeight * 0.02,
          marginLeft: mxHeight * 0.018,
        }}
      >
        {moment(currentMonthIndex + 1, 'M').format('MMMM YYYY')}
      </Text>
      {isSelectedDate ? (
        <View style={{ height: mxHeight * 0.35, marginTop: mxHeight * 0.02 }}>
          <ScrollView bounces={false} showsHorizontalScrollIndicator={false}>
            {timelineData.map((item, index) => (
              <View
                style={{
                  paddingVertical: 20,
                  width: '100%',
                  borderBottomWidth: 1,
                  borderBottomColor: '#DCDCDC',
                  paddingHorizontal: '2%',
                  flexDirection: 'row',
                }}
              >
                <Text
                  style={{
                    width: '50%',
                    ...theme.fontSemiBold,
                    fontSize: fontResize(mxHeight * 0.014),
                  }}
                >
                  {item?.time}
                </Text>
                <View style={{ width: '50%' }}>
                  {item?.eventD?.map((it, i) => {
                    const eventDate = moment(
                      it?.date,
                      'YYYY-MM-DD HH:mm:ss Z'
                    ).format('YYYY-MM-DD');
                    const eventTime = moment(
                      it?.date,
                      'YYYY-MM-DD HH:mm:ss Z'
                    ).format('hh:mm A');
                    return (
                      <View
                        style={{
                          width: '100%',
                          backgroundColor: Colors.eventColor,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderRadius: mxHeight * 0.01,
                          padding: '2%',
                          marginTop: i === 0 ? 0 : mxHeight * 0.005,
                        }}
                      >
                        <Image
                          style={{
                            width: mxHeight * 0.04,
                            height: mxHeight * 0.04,
                          }}
                          source={
                            type == Strings.PROFESSIONAL
                              ? it?.company_logo
                                ? {
                                    uri:
                                      EndPoint.imageBaseURL + it?.company_logo,
                                  }
                                : PostPlaceholder
                              : it?.userinfo?.image
                              ? {
                                  uri:
                                    EndPoint.imageBaseURL + it?.userinfo?.image,
                                }
                              : PostPlaceholder
                          }
                        />

                        <View style={{ width: '60%' }}>
                          <Text
                            style={{
                              ...theme.fontSemiBold,
                              width: '100%',
                              fontSize: fontResize(mxHeight * 0.014),
                              color: Colors.Black,
                            }}
                          >
                            {type == Strings.PROFESSIONAL
                              ? it && it?.event_title
                              : it && `${it?.userinfo.name} | `}
                            <Text
                              style={{
                                ...theme.fontSemiBold,
                                color: '#777E90',
                              }}
                            >
                              {type == Strings.PROFESSIONAL
                                ? ''
                                : `${it?.note}`}
                            </Text>
                          </Text>
                          <Text
                            style={{
                              ...theme.fontSemiBold,
                              fontSize: fontResize(mxHeight * 0.012),
                              color: Colors.lightGray,
                            }}
                          >
                            {eventDate}
                          </Text>
                          <Text
                            style={{
                              ...theme.fontMedium,
                              width: '100%',
                              fontSize: fontResize(mxHeight * 0.012),
                              color: Colors.Black,
                            }}
                          >
                            {eventTime}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View
          style={{
            width: '90%',
            // padding: '3%',
            margin: '5%',
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 5,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: mxHeight * 0.011,
            }}
          >
            <Text
              style={{
                ...theme.fontSemiBold,
                fontSize: fontResize(mxHeight * 0.011),
                color: '#18243C',
                marginHorizontal: mxHeight * 0.008,
              }}
            >
              {moment(currentMonthIndex + 1, 'M').format('MMM YYYY')}
            </Text>
            <Image
              resizeMode="contain"
              style={{
                height: mxHeight * 0.012,
                width: mxHeight * 0.012,
                marginLeft: mxHeight * 0.008,
              }}
              source={VectorIcon}
            />
          </View>
          <Calendar
            showNeighboringMonth={false}
            showNavigation={false}
            onChange={(data) => {
              let selectDate = moment(data).format('YYYY-MM-DD');
              createTimeLineForEvent(selectDate);
              setSelectedDate(true);
              onChange(data);
            }}
            tileClassName={({ date, view }) => {
              let day = date.getDate();
              let month = date.getMonth() + 1;
              if (date.getMonth() < 10) {
                month = '0' + month;
              }
              if (date.getDate() < 10) {
                day = '0' + day;
              }
              const realDate = day + '-' + month + '-' + date.getFullYear();
              if (eventsDate.find((x) => x === realDate)) {
                return 'highlight';
              }
            }}
            value={value}
            style={{ color: Colors.Blueberry, borderRadius: 10 }}
          />
        </View>
      )}
    </View>
  );
};

export default Calender;
