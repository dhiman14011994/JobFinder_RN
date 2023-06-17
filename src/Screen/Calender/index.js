import {
  View,
  Text,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../../Resources/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { style } from './styles';
import Strings from '../../Resources/Strings';
import { useDispatch, useSelector } from 'react-redux';
import MyEventComponent from '../../Component/MyEventComponent';
import {
  deleteCalenderEvents,
  getCalenderEvents,
} from '../../Redux/services/calenderService';
import moment from 'moment';
import EndPoint from '../../Redux/constants/EndPoint';
import Toast from 'react-native-simple-toast';
import { RouteName } from '../../Navigation/routeName';
import Emitter from '../../Util/eventEmitter';
import { setLoading } from '../../Redux/actions/authAction';
import {
  deleteInterviewAction,
  getInterviewAction,
} from '../../Redux/actions/jobAndEventAction';
import { NoDataFoundView } from '../../Component/CustomErrorComponent';

const Calender = ({ navigation }) => {
  const currentMonthIndexd = moment().month();
  const window = useWindowDimensions();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;
  const [allEvents, setAllEvents] = useState([]);
  const [selectMonth, setSelectMonth] = useState(currentMonthIndexd);

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
            setAllEvents(updateMonth);
          },
          onError: (error) => {
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
            console.log('error>>>>>', error);
            setAllEvents(monthLists);
            dispatch(setLoading(false));
          },
        })
      );
    }
  };

  const fetchAllData = async () => {
    const eventData = await getCalenderEvents(userData.access_token);
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
          var updateDate = moment(item?.event?.date, 'YYYY-MM-DD');
          if (updateDate?.format('MMMM') == items?.title) {
            asd.push(item);
          }
        });
        return { ...items, date: asd };
      });
      setAllEvents(updateMonth);
    } else {
      setAllEvents(monthLists);
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={style.monthVw({
          window,
          index,
          selectMonth,
          currentMonthIndexd,
        })}
        onPress={() => {
          setSelectMonth(index);
          navigation.navigate(RouteName.MANAGE_CALENDAR, {
            events: item,
            monthIndexToMove: index,
            allData: allEvents,
          });
        }}
      >
        <Text
          style={style.monthTx({
            window,
            index,
            selectMonth,
            currentMonthIndexd,
          })}
        >
          {item.title}
        </Text>
        {index == selectMonth && (
          <View
            style={{
              position: 'absolute',
              top: -10,
              right: -8,
              backgroundColor: Colors.Blueberry,
              height: 30,
              width: 30,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: Colors.White,
                textAlign: 'center',
              }}
            >
              {item.date.length}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderMyEvent = ({ item, index }) => {
    const formatDate = moment(
      item?.date || item?.event?.date,
      'YYYY-MM-DD HH:mm:ss Z'
    )
      .local()
      .format('DD-MMM-YYYY');

    const formatTime =
      type == Strings.PROFESSIONAL
        ? item?.event?.date
          ? moment(item?.event.date, 'YYYY-MM-DD HH:mm:ss Z')
              .local()
              .format('hh:mm A')
          : '12:00 AM'
        : `${item?.startTime} - ${item?.endTime}`;

    return (
      <MyEventComponent
        image={`${EndPoint.imageBaseURL}${
          type == Strings.PROFESSIONAL
            ? item?.event?.company_logo
            : item?.userinfo?.image
        }`}
        type={type}
        data={item}
        title={item?.event?.event_title}
        date={formatDate}
        time={formatTime}
        cancelPress={() => {
          if (type == Strings.PROFESSIONAL) {
            cancelPress({ id: item?.event?._id, index: index });
          } else {
            deleteInterview({ id: item?._id });
          }
        }}
      />
    );
  };

  const deleteInterview = ({ id }) => {
    var params = id;
    dispatch(
      deleteInterviewAction({
        params,
        onSuccess: async (result) => {
          fetchAllInterView();
          Emitter.emit('InterviewCreated');
          Toast.show(result?.message || 'Interview deleted successfully');
          dispatch(setLoading(false));
        },
        onError: (error) => {
          console.log('error>>>>>', error);
          dispatch(setLoading(false));
        },
      })
    );
  };

  const cancelPress = async ({ id, index }) => {
    let deleteEventdata = await deleteCalenderEvents({
      token: userData?.access_token,
      id: id,
    });
    if (deleteEventdata?.code < 210) {
      fetchAllData();
      var updatelist = allEvents;
      updatelist[selectMonth].splice(index, 1);
      setAllEvents(updatelist);
      Toast.show(deleteEventdata?.message);
    } else {
      Toast.show(deleteEventdata?.message);
    }
  };

  const renderHeaderComponent = () => {
    return (
      <>
        {allEvents.length == 0 ? (
          <View />
        ) : (
          <>
            <FlatList
              style={{ marginTop: 20 }}
              data={allEvents}
              renderItem={renderItem}
              numColumns={3}
            />
            <Text style={[style.scheduledTx, { marginBottom: 10 }]}>
              {type == Strings.PROFESSIONAL
                ? Strings.MY_EVENTS
                : Strings.INTERVIEWS}
            </Text>
          </>
        )}
      </>
    );
  };

  const renderFooterComponent = () => {
    return <View style={{ height: 200 }} />;
  };
  const listEmptyComponent = () => {
    return (
      <View style={style.emptyView}>
        <NoDataFoundView
          warning_message={
            type !== Strings.PROFESSIONAL
              ? 'No interview data'
              : 'No event data'
          }
        />
      </View>
    );
  };
  return (
    <SafeAreaView>
      <View style={style.container({ window })}>
        <Text style={style.headerTx}>{Strings.MY_RECRUTING_DATES}</Text>
        {allEvents.length !== 0 && (
          <Text style={style.scheduledTx}>{Strings.SCHEDULED_EVENTS}</Text>
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 20, marginHorizontal: '5%' }}
          ListHeaderComponent={renderHeaderComponent}
          data={
            allEvents.length == 0
              ? []
              : allEvents[selectMonth ? selectMonth : currentMonthIndexd]?.date
                  .length == 0
              ? []
              : allEvents[selectMonth ? selectMonth : currentMonthIndexd]?.date
          }
          ListEmptyComponent={listEmptyComponent}
          renderItem={renderMyEvent}
          ListFooterComponent={renderFooterComponent}
        />
      </View>
    </SafeAreaView>
  );
};

export default Calender;
