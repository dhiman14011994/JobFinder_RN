import { View, Text, FlatList, useWindowDimensions } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobPostItem from '../../../Component/JobPostItem';
import { theme } from '../../../Util/constant';
import Strings from '../../../Resources/Strings';

import { RouteName } from '../../../Navigation/routeName';
import CustomButton from '../../../Component/CustomButton';
import Colors from '../../../Resources/Colors';
import { fetchMyEvents } from '../../../Redux/actions/jobAndEventAction';
import { CustomText } from '../../../Component/CustomComponent';
import { fontResize } from '../../../Util/font';
import EventItem from '../../../Component/EventItem';
import Emitter from '../../../Util/eventEmitter';
const MyEvents = ({ navigation }) => {
  const dispatch = useDispatch();
  const myEvents = useSelector((state) => state.jobAndEvent.myEvents);
  useEffect(() => {
    fetchMyEventsAPI();
    Emitter.on('EventCreated', () => {
      fetchMyEventsAPI();
    });
    return () => {
      Emitter.off('EventCreated');
    };
  }, []);

  const fetchMyEventsAPI = () => {
    dispatch(
      fetchMyEvents({
        onSuccess: (result) => {
          console.log('Event today', result);
          // dispatch(setLoading(false));

          //   dispatch(setLoading(false));
        },
        onError: (error) => {
          // dispatch(setLoading(false));
          //   dispatch(setLoading(false));
        },
      })
    );
  };

  const window = useWindowDimensions();
  const jobs = useSelector((state) => state.jobAndEvent.jobs);
  const renderItem = ({ item }) => {
    return (
      <EventItem
        item={item}
        // isMyJob
        // onSwitchChangeValue={() => {}}
        toDetails={() => {}}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.White }}>
      <View style={{ paddingHorizontal: 16 }}>
        <CustomButton
          onPress={() => navigation.navigate(RouteName.CREATE_EVENT_POST)}
          width={'100%'}
          height={'50px'}
          backgroundColor={Colors.Blueberry}
          marginTop={window.height * 0.03}
          marginBottom={window.height * 0.03}
          borderRadius={'10px'}
          alignItems={'center'}
          justifyContent={'center'}
          {...theme.fontSemiBold}
          fontSize={'18px'}
          textColor={Colors.White}
          text={Strings.CREATE_EVENT_POST}
        />
      </View>
      <FlatList
        ListHeaderComponent={
          <CustomText
            fontSize={fontResize(18)}
            {...theme.fontSemiBold}
            style={{ color: Colors.Black }}
          >
            {myEvents && myEvents.length > 0 ? 'Events Created' : ''}
          </CustomText>
        }
        ListEmptyComponent={
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CustomText
              fontSize={fontResize(16)}
              {...theme.fontMedium}
              style={{ color: Colors.Black }}
            >
              {'No Event Found'}
            </CustomText>
          </View>
        }
        style={{ paddingHorizontal: 16 }}
        data={myEvents}
        renderItem={renderItem}
      />
    </View>
  );
};

export default MyEvents;
