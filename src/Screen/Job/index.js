import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../Component/CustomHeader';
import { notificationIcon } from '../../Resources/assets';
import Colors from '../../Resources/Colors';
import CustomSearchBar from '../../Component/CustomSearchBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Events from '../Events';
import { theme } from '../../Util/constant';
import { mxWidth } from '../../Util';
import JobPostItem from '../../Component/JobPostItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEvents,
  fetchJobs,
  onEventSearch,
  onJobSearch,
} from '../../Redux/actions/jobAndEventAction';
import { setLoading } from '../../Redux/actions/authAction';
import { RouteName } from '../../Navigation/routeName';
import { useState } from 'react';
import Emitter from '../../Util/eventEmitter';

const Tab = createMaterialTopTabNavigator();
const JobEventMain = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isEvent, setIsEvent] = useState(false);
  const isNotification = useSelector((state) => state.auth.isNotification);

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const fetchAllJobs = () => {
    try {
      dispatch(setLoading(true));
      dispatch(
        fetchJobs({
          onSuccess: (result) => {
            console.log('Results fetch jobs', result);

            dispatch(setLoading(false));
            fetchAllEvents();
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

  const fetchAllEvents = () => {
    // dispatch(setLoading(true));
    dispatch(
      fetchEvents({
        onSuccess: (result) => {
          console.log('Results fetch jobs', result);

          dispatch(setLoading(false));
        },
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };

  const onSearch = (text) => {
    if (isEvent) {
      dispatch(
        onEventSearch({
          text,
        })
      );
    } else {
      dispatch(
        onJobSearch({
          text,
        })
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.White }}>
      <CustomHeader
        leftButtons={null}
        rightButtons={
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate(RouteName.JOB_NOTIFICATION)}
              style={{ padding: 6 }}
            >
              <Image
                resizeMode="contain"
                style={{ height: 30, width: 30 }}
                source={notificationIcon}
              />
              {isNotification && (
                <View
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: 'red',
                    borderRadius: 5,
                    position: 'absolute',
                    right: 10,
                    top: 10,
                  }}
                />
              )}
            </TouchableOpacity>
          </>
        }
        isTitleLeft
        title={'Jobs'}
      />
      <View style={{ paddingHorizontal: 22, paddingVertical: 12 }}>
        <CustomSearchBar onSearchText={(text) => onSearch(text)} />
      </View>
      <Tab.Navigator
        initialRouteName="JobPosts"
        tabBarOptions={{
          labelStyle: { textTransform: 'lowercase' },
        }}
        screenOptions={{
          tabBarInactiveTintColor: Colors.DimGray,
          tabBarActiveTintColor: Colors.Blueberry,
          tabBarLabelStyle: {
            fontSize: 16,
            ...theme.fontMedium,
            textTransform: 'none',
          },
          tabBarIndicatorStyle: {
            height: 4,
            backgroundColor: Colors.Blueberry,
          },
          tabBarStyle: { height: 60 },
        }}
      >
        <Tab.Screen
          name="JobPosts"
          component={Job}
          options={{ tabBarLabel: 'Job Posts', inactiveTintColor: 'red' }}
          listeners={{
            tabPress: (e) => {
              // Prevent default action
              setIsEvent(false);
              dispatch(onEventSearch(''));
            },
          }}
        />
        <Tab.Screen
          name="Events"
          component={Events}
          options={{ tabBarLabel: 'Events' }}
          listeners={{
            tabPress: (e) => {
              // Prevent default action
              setIsEvent(true);
              dispatch(onJobSearch(''));
            },
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const Job = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.White }}>
      <Tab.Navigator
        initialRouteName="FeaturedJob"
        tabBarOptions={{
          labelStyle: { textTransform: 'lowercase' },
        }}
        screenOptions={{
          tabBarActiveTintColor: Colors.Black,
          tabBarLabelStyle: {
            fontSize: 16,
            ...theme.fontMedium,
            textTransform: 'none',
          },
          tabBarIndicatorStyle: { height: 0 },
          tabBarItemStyle: { width: mxWidth * 0.65, minWidht: '600' },
          tabBarScrollEnabled: true,
          tabBarStyle: { height: 60, shadowOpacity: 0 },
        }}
      >
        <Tab.Screen
          name="FeaturedJob"
          component={FeaturedJob}
          options={{
            tabBarLabel: 'Featured Jobs',
            // tabBarItemStyle: {width: mxWidth * 0.65},
          }}
        />
        <Tab.Screen
          name="Recommended"
          component={RecommendedJob}
          options={{
            tabBarLabel: 'Recommended',
            // tabBarItemStyle: {width: mxWidth * 0.65},
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const FeaturedJob = ({ navigation }) => {
  const jobs = useSelector((state) => state.jobAndEvent.jobs);
  console.log('jobs>>>>', jobs);
  const searchedJobs = useSelector((state) => state.jobAndEvent.searchedJobs);
  const renderItem = ({ item }) => {
    return (
      <JobPostItem
        item={item}
        toDetails={(id) =>
          navigation.navigate(RouteName.JOB_DETAIL, { eventId: id })
        }
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.White }}>
      <FlatList
        style={{ paddingHorizontal: 16 }}
        data={
          searchedJobs.length > 0 ? searchedJobs : jobs && jobs.Featured_Jobs
        }
        renderItem={renderItem}
      />
    </View>
  );
};

const RecommendedJob = ({ navigation }) => {
  const jobs = useSelector((state) => state.jobAndEvent.jobs);
  const searchedJobs = useSelector((state) => state.jobAndEvent.searchedJobs);
  const renderItem = ({ item }) => {
    return (
      <JobPostItem
        item={item}
        toDetails={(id) =>
          navigation.navigate(RouteName.JOB_DETAIL, { eventId: id })
        }
      />
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.White }}>
      <FlatList
        style={{ paddingHorizontal: 16 }}
        data={
          searchedJobs.length > 0 ? searchedJobs : jobs && jobs.Recommended_Jobs
        }
        renderItem={renderItem}
      />
    </View>
  );
};

export default JobEventMain;
