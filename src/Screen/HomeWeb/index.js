import { View, ScrollView, useWindowDimensions } from 'react-native-web';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '../Profile';
import Calender from '../Calender';
import Colors from '../../Resources/Colors';
import Emitter from '../../Util/eventEmitter';
import { getStoryByID } from '../../Redux/actions/homeAction';
import Chat from '../Chat';
import MainHome from './MainHome';
import Strings from '../../Resources/Strings';
import AllHomeHeader from '../../Component/AllHomeTabHeader';
import JobWeb from '../JobWeb';
import Events from '../Events';
import { fetchEvents, fetchJobs } from '../../Redux/actions/jobAndEventAction';
import { setLoading } from '../../Redux/actions/authAction';
import CustomButton from '../../Component/CustomButton';
import { RouteName } from '../../Navigation/routeName';
import PromotionWeb from '../PromotionWeb/index.web';
import { fetchPromotionPost } from '../../Redux/actions/promotionAction';

const HomeWeb = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.home.stories);
  const posts = useSelector((state) => state.home.posts);
  const [showStroies, setShowStroies] = useState(false);
  const window = useWindowDimensions();
  const searchedUser = useSelector((state) => state.home.searchedUser);
  const userData = useSelector((state) => state.auth.userData);
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;
  const jobs = useSelector((state) => state.jobAndEvent.jobs);
  const events = useSelector((state) => state.jobAndEvent.events);
  const promotion = useSelector((state) => state.promotion.promotions);
  const searchedJobs = useSelector((state) => state.jobAndEvent.searchedJobs);
  const searchedEvents = useSelector(
    (state) => state.jobAndEvent.searchedEvents
  );
  const [isAdvertisement, setAdvertisement] = useState(true);

  const [active, setActivity] = useState(Strings.ALL);

  useEffect(() => {
    fetchAllJobs();
    Emitter.on('JobCreated', () => {
      fetchAllJobs();
    });
    Emitter.on('EventCreated', () => {
      fetchAllEvents();
    });
    Emitter.on('PostCreated', () => {
      fetchAllPromotions();
    });
    return () => {
      Emitter.off('JobCreated');
      Emitter.off('EventCreated');
      Emitter.off('PostCreated');
    };
  }, []);

  const fetchAllJobs = () => {
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
  };

  const fetchAllEvents = () => {
    dispatch(setLoading(true));
    dispatch(
      fetchEvents({
        onSuccess: (result) => {
          dispatch(setLoading(false));
          if (type === Strings.ORGANIZATION) {
            fetchAllPromotions();
          }
        },
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };

  const fetchAllPromotions = () => {
    try {
      dispatch(setLoading(true));
      dispatch(
        fetchPromotionPost({
          onSuccess: (result) => {
            dispatch(setLoading(false));
          },
          onError: (error) => {
            dispatch(setLoading(false));
          },
        })
      );
    } catch (err) {
      console.log('=====Error', err);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        {/* // Render Profile */}

        <View style={{ width: '25%' }}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <Profile />
          </ScrollView>
        </View>

        {/* Render Feeds */}
        <View
          style={{
            width: '48%',
            flex: 1,
            borderRadius: 22,
            marginTop: 18,
            marginLeft: 18,
            marginRight: 18,
          }}
        >
          {type === Strings.PROFESSIONAL ? (
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <MainHome />
            </ScrollView>
          ) : (
            <>
              <AllHomeHeader
                window={window}
                activeTab={active}
                onTabPress={setActivity}
                type={type}
              />
              {active == Strings.ALL ? (
                <ScrollView
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                >
                  <MainHome />
                </ScrollView>
              ) : active == Strings.JOB_POST_WEB ? (
                <ScrollView
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                >
                  <View>
                    <CustomButton
                      width={'50%'}
                      marginLeft={'50%'}
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
                        navigation.navigate(RouteName.CREATE_JOB_POST, {
                          isEdited: false,
                        });
                      }}
                      text={Strings.CREATE_JOB_POST}
                    />
                  </View>
                  <JobWeb
                    jobs={jobs}
                    searchedJobs={searchedJobs}
                    jobDeleted={() => {
                      fetchAllJobs();
                    }}
                    userData={userData}
                  />
                </ScrollView>
              ) : active == Strings.PROMOTIONS ? (
                <ScrollView
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                >
                  <View>
                    <CustomButton
                      width={'50%'}
                      marginLeft={'50%'}
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
                        navigation.navigate(RouteName.CREATE_PROMOTIONS, {
                          isEdited: false,
                        });
                      }}
                      text={Strings.CREATE_PROMOTIONS}
                    />
                  </View>
                  <PromotionWeb
                    navigation={navigation}
                    promotions={promotion}
                    promotionDeleted={() => {
                      fetchAllPromotions();
                    }}
                  />
                </ScrollView>
              ) : (
                <ScrollView
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                >
                  <View>
                    <CustomButton
                      width={'50%'}
                      marginLeft={'50%'}
                      height={window.height * 0.06}
                      backgroundColor={Colors.Blueberry}
                      marginTop={window.height * 0.01}
                      marginBottom={window.height * 0.04}
                      borderRadius={'10px'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      fontFamily={'Gilroy-SemiBold'}
                      fontSize={'18px'}
                      textColor={Colors.White}
                      onPress={() => {
                        navigation.navigate(RouteName.CREATE_EVENT_POST);
                      }}
                      text={Strings.CREATE_EVENT_POST}
                    />
                  </View>
                  <Events
                    navigation={navigation}
                    events={events}
                    searchedEvents={searchedEvents}
                    eventDeleted={() => {
                      fetchAllEvents();
                    }}
                  />
                </ScrollView>
              )}
            </>
          )}
        </View>
        {/* render Chat and Calender */}
        <View style={{ width: '25%' }}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <Calender />
            <Chat />
          </ScrollView>
        </View>
      </View>

      {/* <AdvertisementModal
        showModal={isAdvertisement}
        setModalVisibility={(value) => {
          setAdvertisement(value);
        }}
      ></AdvertisementModal> */}
    </View>
  );
};

export default HomeWeb;
