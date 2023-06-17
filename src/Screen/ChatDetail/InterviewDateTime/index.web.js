import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '../../../Resources/Colors';
import { theme } from '../../../Util/constant';

import { fontResize } from '../../../Util/font';
import Strings from '../../../Resources/Strings';
import { backIcon } from '../../../Resources/assets';
import CustomHeaderChat from '../../../Component/CustomHeaderChat';
import moment from 'moment';
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import * as RNLocalize from 'react-native-localize';
import CustomInputText from '../../../Component/CustomInputText';
import TimePicker from 'react-time-picker';
import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native-web';
import { setLoading } from '../../../Redux/actions/authAction';
import { scheduleInterviewAction } from '../../../Redux/actions/jobAndEventAction';
import Emitter from '../../../Util/eventEmitter';
import { containsOnlyStrings } from '../../../Util/validation';

const InterviewDateTime = ({ navigation, route }) => {
  var newDate = new Date();

  const window = useWindowDimensions();
  const width = window.width;
  const height = window.height;
  const cureentMonth = moment(newDate).format('MMM');
  const cureentYear = newDate.getFullYear();
  const [allData, setAllEvents] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const [value, onChange] = useState(new Date());
  const [isSelectedDate, setSelectedDate] = useState(false);
  const [markedDates, setMarkedDates] = useState([]);
  const [timelineData, setTimeLineData] = useState([]);
  const [eventsDate, setEventsDate] = useState([]);
  const [note, setNote] = useState('');

  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const [startRealTime, setStartRealTime] = useState('');
  const [endRealTime, setEndRealTime] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    var newTime = moment(newDate, 'HH:mm').format('hh:mm A');
    setStartRealTime(newTime);
    setEndRealTime(newTime);
  }, []);

  const setInterview = () => {
    if (note == '') {
      alert('Please enter note');
    } else if (startRealTime == '' || endRealTime == '') {
      alert('Please select time');
    } else {
      const params = {
        interviewUserID: route?.params?.receiverId,
        startTime: startRealTime,
        endTime: endRealTime,
        date: value,
        note: note,
        timezone: RNLocalize.getTimeZone() || 'Asia/Kolkat',
      };
      dispatch(setLoading(true));
      dispatch(
        scheduleInterviewAction({
          params,
          onSuccess: async (result) => {
            dispatch(setLoading(false));
            Emitter.emit('InterviewCreated');
            navigation.goBack();
          },
          onError: (error) => {
            console.log('err>>', error);
            dispatch(setLoading(false));
          },
        })
      );
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomColor: '#D4DADE',
        borderBottomWidth: 1,
      }}
    >
      <CustomHeaderChat
        constainerStyle={{ paddingHorizontal: height * 0.02 }}
        leftButtons={
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 16, width: 16 }}
              source={backIcon}
            />
          </TouchableOpacity>
        }
        title={Strings.SET_TIME_DATE}
      />

      <ScrollView bounces={false}>
        <View
          style={{
            backgroundColor: Colors.White,
          }}
        >
          <View
            style={{
              marginHorizontal: width * 0.01,
              marginBottom: height * 0.01,
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <Text
              style={{
                ...theme.fontMedium,
                color: Colors.Black,
                fontSize: fontResize(width * 0.012),
              }}
            >{`${cureentMonth} ${cureentYear}`}</Text>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginLeft: width * 0.01,
                marginEnd: width * 0.01,
              }}
            >
              <TimePicker
                clearIcon={null}
                clockIcon={null}
                onChange={(value) => {
                  var newTime = moment(value, 'HH:mm').format('hh:mm A');
                  setStartRealTime(newTime);
                }}
                value={
                  startRealTime == ''
                    ? new Date()
                    : moment(startRealTime, 'hh:mm A').format('HH:mm')
                }
                closeClock={false}
              />

              <Text style={style.toText}>{'To'}</Text>
              <TimePicker
                clearIcon={null}
                clockIcon={null}
                onChange={(value) => {
                  var newTime = moment(value, 'HH:mm').format('hh:mm A');
                  setEndRealTime(newTime);
                }}
                value={
                  endRealTime == ''
                    ? new Date()
                    : moment(endRealTime, 'hh:mm A').format('HH:mm')
                }
                closeClock={false}
              />
            </View>
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
            style={{
              color: Colors.Blueberry,
              borderRadius: 10,
              marginHorizontal: width * 0.01,
            }}
          />

          <View
            style={{
              paddingVertical: 20,
              marginTop: 10,
              marginHorizontal: width * 0.01,
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderTopWidth: 1,
              borderTopColor: 'rgba(196, 196, 196, 0.5)',
            }}
          >
            <Text style={style.timeZoneTx}>{'Time Zone'}</Text>
            <Text style={style.zoneTx}>
              {RNLocalize.getTimeZone() || 'UTC'}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 10,
            marginHorizontal: width * 0.01,
            flexDirection: 'row',
          }}
        >
          <CustomInputText
            fontSize={14}
            width={'100%'}
            paddingVertical={20}
            label={Strings.Note}
            onChangeText={(text) => {
              if (containsOnlyStrings(text)) {
                setNote(text);
              }
              if (text == '') {
                setNote('');
              }
            }}
            placeholder={'Front-End Dev'}
            isError={false}
            value={note}
            window={window}
            inputOuterView={{ backgroundColor: '#fff' }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            setInterview();
          }}
        >
          <View
            style={{
              width: '90%',
              padding: 10,
              marginVertical: 20,
              backgroundColor: Colors.Blueberry,
              marginHorizontal: width * 0.01,
              alignSelf: 'center',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                ...theme.fontMedium,
                color: Colors.White,
                lineHeight: fontResize(22),
                fontSize: fontResize(18),
              }}
            >
              Set
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  toText: {
    marginHorizontal: 10,
  },
  timeButton: {
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.PaleCornflowerBlue,
    borderRadius: 5,
  },
  cureentMonthTx: {
    ...theme.fontMedium,
    color: Colors.Black,
    lineHeight: fontResize(22),
    fontSize: fontResize(18),
  },
  timeTx: {
    ...theme.fontRegular,
    fontSize: fontResize(14),
    color: Colors.Black,
  },
  timeZoneTx: {
    ...theme.fontMedium,
    fontSize: fontResize(14),
    color: Colors.Black,
  },
  zoneTx: {
    ...theme.fontRegular,
    fontSize: fontResize(14),
    color: '#787878',
  },
});

export default InterviewDateTime;
