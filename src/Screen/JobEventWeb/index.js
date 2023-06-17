import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import JobEventTabHeader from '../../Component/JobEventTabHeader';
import Strings from '../../Resources/Strings';
import JobWeb from '../JobWeb';
import Events from '../Events';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../Redux/actions/authAction';
import { fetchEvents, fetchJobs } from '../../Redux/actions/jobAndEventAction';
import { useNavigation } from '@react-navigation/native';
import JobDetail from '../JobDetail';
import {
  BackButton,
  HeaderContainer,
} from '../Authentication/VerificationStyle';
import { calendarLeftArrowIcon } from '../../Resources/assets';
import { mxHeight, mxWidth } from '../../Util';
import ApplyJobView from './ApplyJobView';
import Type from '../../Constants/Type/type';
import Emitter from '../../Util/eventEmitter';

const JobEventWeb = ({ onApplyJob }) => {
  const window = useWindowDimensions();
  const navigation = useNavigation();
  const [active, setActivity] = useState(Strings.JOB_POST_WEB);
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobAndEvent.jobs);
  const searchedJobs = useSelector((state) => state.jobAndEvent.searchedJobs);
  const searchedEvents = useSelector(
    (state) => state.jobAndEvent.searchedEvents
  );
  const [isapplyJob, setApplyJob] = useState(false);
  const [applyJobData, setApplyJobData] = useState('');
  const events = useSelector((state) => state.jobAndEvent.events);
  const userData = useSelector((state) => state.auth.userData);
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const viewApplyJob = ({ id, data }) => {
    setApplyJob(true);
    setApplyJobData(data);
  };
  useEffect(() => {
    Emitter.on('see event', () => {
      setActivity(Strings.EVENTS);
    });
    return () => {
      Emitter.off('see event');
    };
  }, []);

  return (
    <>
      {isapplyJob ? (
        <ApplyJobView
          type={type}
          setApplyJob={setApplyJob}
          applyJobData={applyJobData}
        />
      ) : (
        <>
          <JobEventTabHeader
            window={window}
            activeTab={active}
            onTabPress={setActivity}
            type={type}
          />
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            {active === Strings.JOB_POST_WEB ? (
              <JobWeb
                jobs={jobs}
                searchedJobs={searchedJobs}
                type={type}
                onjobPress={(data) => viewApplyJob(data)}
              />
            ) : (
              <Events
                selectionType={Type.EVENT_TYPE.TAB}
                navigation={navigation}
                events={events}
                type={type}
                searchedEvents={searchedEvents}
              />
            )}
          </ScrollView>
        </>
      )}
    </>
  );
};

export default JobEventWeb;
