import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  useColorScheme,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from '../../../Component/CustomHeader';
import Strings from '../../../Resources/Strings';
import { backIcon } from '../../../Resources/assets';
import NotchArea from '../../../Component/SafeArea';
import Colors from '../../../Resources/Colors';
import CustomButton from '../../../Component/CustomButton';
import {
  Calendar,
  TimelineList,
  AgendaList,
  ExpandableCalendar,
  CalendarProvider,
} from 'react-native-calendars';
import { set } from 'react-native-reanimated';
import { style } from './style';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import * as RNLocalize from 'react-native-localize';
import CustomInputText from '../../../Component/CustomInputText';
import { isNative } from '../../../Util';
import { ButtonContainer } from '../../../Component/CustomComponent';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../Redux/actions/authAction';
import { scheduleInterviewAction } from '../../../Redux/actions/jobAndEventAction';
import Emitter from '../../../Util/eventEmitter';

const InterviewDateTime = ({ navigation, route }) => {
  const [firstDate, setFirstDate] = useState('2022-10-01');
  const [lastDate, setLastDate] = useState('2022-10-31');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startRealTime, setStartRealTime] = useState('');
  const [endRealTime, setEndRealTime] = useState('');
  const [isStart, setIsStart] = useState(false);
  const [isEndTime, setIsEndTime] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [note, setNote] = useState('');
  const [selectDate, setSelectDate] = useState({
    '2012-05-16': { selected: true, marked: true },
    '2012-05-17': { marked: true },
    '2012-05-18': { disabled: true },
  });
  const [currentFixDate, setCurrentFixDate] = useState('');
  const [selectNewData, setSelectNewDate] = useState('');

  const [selectedDate, setSelectedDate] = useState('');
  var newDate = new Date();
  const cureentMonth = moment(newDate).format('MMM');
  const cureentYear = newDate.getFullYear();
  const scheme = useColorScheme();
  const window = useWindowDimensions();
  const dispatch = useDispatch();

  useEffect(() => {
    var firstDay = moment().startOf('month').format('YYYY-MM-DD');
    var lastDay = moment().endOf('month').format('YYYY-MM-DD');

    var cureentdate = moment().format('yyyy-MM-DD');

    setCurrentFixDate({
      [cureentdate]: { selected: true },
    });
    setSelectNewDate(cureentdate);
    setSelectDate({
      [cureentdate]: { selected: true },
    });

    setFirstDate(firstDay);
    setLastDate(lastDay);
  }, []);

  const getLastDate = ({ m, y }) => {
    if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
      return 31;
    } else if (m == 2) {
      return y % 4 == 0 ? 29 : 28;
    } else {
      return 30;
    }
  };

  const setInterview = () => {
    if (note == '') {
      alert('Please enter note');
    } else if (startTime == '' || endTime == '') {
      alert('Please select time');
    } else {
      const params = {
        interviewUserID: route?.params?.receiverId,
        startTime: startTime,
        endTime: endTime,
        date: selectNewData,
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
  return (
    <SafeAreaView style={[NotchArea.AndroidSafeArea, { flex: 1 }]}>
      <View
        style={{
          backgroundColor: Colors.White,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomColor: '#D4DADE',
          borderBottomWidth: 1,
        }}
      >
        <CustomHeader
          constainerStyle={{ paddingHorizontal: '5%' }}
          leftButtons={
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image
                resizeMode="contain"
                style={{ height: 26, width: 26 }}
                source={backIcon}
              />
            </TouchableOpacity>
          }
          rightButtons={<></>}
          title={Strings.SET_TIME_DATE}
        />
      </View>
      <ScrollView bounces={false}>
        <View style={style.calenderView}>
          <View style={style.cureentView}>
            <Text
              style={style.cureentMonthTx}
            >{`${cureentMonth} ${cureentYear}`}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  setVisible(true);
                  setIsEndTime(false);
                  setIsStart(true);
                }}
                style={style.timeButton}
              >
                <Text style={style.timeTx}>{startTime || '10:00'}</Text>
              </TouchableOpacity>
              <Text style={style.toText}>{'To'}</Text>
              <TouchableOpacity
                onPress={() => {
                  setVisible(true);
                  setIsStart(false);
                  setIsEndTime(true);
                }}
                style={style.timeButton}
              >
                <Text style={style.timeTx}>{endTime || '10:00'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Calendar
            // initialDate={newDate}
            minDate={firstDate || '2022-10-01'}
            maxDate={lastDate || '2022-10-31'}
            theme={{
              selectedDayBackgroundColor: Colors.Blueberry,
              todayTextColor: Colors.Blueberry,
              monthTextColor: Colors.White,
            }}
            onDayPress={(day) => {
              let oldMarks = {
                ...currentFixDate,
                [day.dateString]: { selected: true },
              };
              setSelectNewDate(day.dateString);
              setSelectDate(oldMarks);
            }}
            onDayLongPress={(day) => {
              let oldMarks = {
                ...currentFixDate,
                [day.dateString]: { selected: true },
              };

              setSelectNewDate(day.dateString);
              setSelectDate(oldMarks);
            }}
            monthFormat={'yyyy MM'}
            onMonthChange={(month) => {}}
            hideArrows={true}
            renderArrow={(direction) => <Arrow />}
            hideExtraDays={true}
            disableMonthChange={true}
            firstDay={1}
            hideDayNames={false}
            showWeekNumbers={false}
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            onPressArrowRight={(addMonth) => addMonth()}
            disableArrowLeft={true}
            disableArrowRight={true}
            disableAllTouchEventsForDisabledDays={true}
            renderHeader={(date) => {}}
            enableSwipeMonths={false}
            markedDates={selectDate}
          />

          <View style={[style.timeZoneView]}>
            <Text style={style.timeZoneTx}>{'Time Zone'}</Text>
            <Text style={style.zoneTx}>
              {RNLocalize.getTimeZone() || 'UTC'}
            </Text>
          </View>
        </View>
        <View
          style={[style.cureentView, { marginBottom: window.height * 0.2 }]}
        >
          <CustomInputText
            marginTop={window.height * 0.05}
            marginBottom={window.height * 0.02}
            marginLeft={isNative ? '0px' : '10%'}
            label={Strings.Note}
            onChangeText={(text) => {
              setNote(text);
            }}
            placeholder={'Front-End Dev'}
            isError={false}
            value={note}
            window={window}
            inputOuterView={{ backgroundColor: '#fff' }}
          />
        </View>
      </ScrollView>

      <CustomButton
        width={isNative ? '90%' : '80%'}
        height={window.height * 0.06}
        backgroundColor={Colors.Blueberry}
        marginTop={window.height * 0.03}
        borderRadius={'10px'}
        alignItems={'center'}
        justifyContent={'center'}
        fontFamily={'Gilroy-SemiBold'}
        fontSize={'18px'}
        textColor={Colors.White}
        onPress={() => {
          setInterview();
        }}
        text={Strings.SET}
        buttonContainer={{ position: 'absolute', bottom: '5%' }}
      />

      <DatePicker
        modal
        theme={'light'}
        date={
          isStart
            ? startRealTime == ''
              ? new Date()
              : startRealTime
            : endRealTime == ''
            ? new Date()
            : endRealTime
        }
        textColor={scheme == 'dark' ? '#fff' : '#000'}
        open={isVisible}
        mode={'time'}
        onConfirm={(date) => {
          var newTime = moment(date, 'HH:mm:ss').format('hh:mm A');

          if (isStart) {
            setStartTime(newTime);
            setStartRealTime(date);
            setVisible(false);
            setIsStart(false);
            setIsEndTime(false);
          } else if (isEndTime) {
            setEndRealTime(date);
            setEndTime(newTime);
            setVisible(false);
            setIsStart(false);
            setIsEndTime(false);
          }
        }}
        onCancel={() => {
          setVisible(false);
          setIsStart(false);
          setIsEndTime(false);
        }}
      />
    </SafeAreaView>
  );
};

export default InterviewDateTime;
