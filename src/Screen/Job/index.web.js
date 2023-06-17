import { View, ScrollView } from 'react-native-web';
import React, { useEffect } from 'react';
import Profile from '../Profile';
import Chat from '../Chat';
import Calender from '../Calender';
import JobEventWeb from '../JobEventWeb';
import { style } from './style';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../Redux/actions/authAction';
import { fetchEvents, fetchJobs } from '../../Redux/actions/jobAndEventAction';
import JobChat from '../Chat/JobChat';

const JobEventMain = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const fetchAllJobs = () => {
    try {
      dispatch(setLoading(true));
      dispatch(
        fetchJobs({
          onSuccess: (result) => {
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
    dispatch(
      fetchEvents({
        onSuccess: (result) => {
          dispatch(setLoading(false));
        },
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };
  return (
    <View style={style.container}>
      <View style={style.subContainer}>
        {/* // Render Profile */}

        <View style={style.profileContainer}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <Profile />
          </ScrollView>
        </View>
        {/* Render Feeds */}
        <View style={style.jobContainer}>
          <JobEventWeb />
        </View>
        {/* render Chat and Calender */}
        <View style={style.profileContainer}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <Calender />
            {/* <JobChat /> */}
            <Chat />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default JobEventMain;
