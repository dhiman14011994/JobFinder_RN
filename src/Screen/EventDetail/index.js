import {
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { CustomText } from '../../Component/CustomComponent';
import Emitter from '../../Util/eventEmitter';
import Strings from '../../Resources/Strings';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../Resources/Colors';
import { fontResize } from '../../Util/font';
import SummaryComponent from '../../Component/SummaryComponent';
import { backIcon, PostPlaceholder } from '../../Resources/assets';
import CustomButton from '../../Component/CustomButton';

import { useDispatch, useSelector } from 'react-redux';
import { rightIcon } from '../../Resources/assets';
import { isNative, mxWidth } from '../../Util';
import {
  BackButton,
  HeaderContainer,
} from '../Authentication/VerificationStyle';
import EndPoint from '../../Redux/constants/EndPoint';
import moment from 'moment';
import {
  fetchEventById,
  addEventToCalendar,
  setLoading,
  applyEventAction,
  fetchEvents,
} from '../../Redux/actions/jobAndEventAction';
import { theme } from '../../Util/constant';
import FastImage from 'react-native-fast-image';
import ImGoingPopup from '../../Component/ImGoingPopup';
import SuccessPopup from '../../Component/SuccessPopup';

const EventDetail = ({ navigation, route }) => {
  const window = useWindowDimensions();
  const [showImGoingPopup, setShowImGoingPopup] = useState(false);
  const [isApplyCalender, setApplyCalender] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const eventDetail = useSelector((state) => state.jobAndEvent.eventDetail);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchEventByIdAPI();
  }, []);

  const fetchEventByIdAPI = () => {
    const { eventId } = route.params;
    dispatch(setLoading(true));
    dispatch(
      fetchEventById({
        eventId,
        onSuccess: (result) => {
          dispatch(setLoading(false));
        },
        onError: (error) => {
          dispatch(setLoading(false));
        },
      })
    );
  };

  const backToHome = () => {
    navigation.goBack();
  };

  // const utcDate = moment(eventDetail?.date).utc();
  const formatDate = moment(eventDetail?.date, 'YYYY-MM-DD HH:mm:ss Z')
    .local()
    .format('MMMM DD, YYYY');
  const formatTime = moment(eventDetail?.date, 'YYYY-MM-DD HH:mm:ss Z')
    .local()
    .format('hh:mm A');

  const addToCalendar = () => {
    let params = {
      event_id: eventDetail?._id,
    };

    dispatch(
      addEventToCalendar({
        params,
        onSuccess: (result) => {
          setShowImGoingPopup(false);
          console.log('showSuccess', showImGoingPopup);
          setTimeout(() => {
            Emitter.emit('EventCreated');
            //
          }, 500);

          console.log('showSuccess', showSuccess);
          dispatch(
            fetchEvents({
              onSuccess: (result) => {
                console.log('Results fetch jobs', result);

                dispatch(setLoading(false));
              },
              onError: (error) => {
                // dispatch(setLoading(false));
                dispatch(setLoading(false));
              },
            })
          );
        },
        onError: (error) => {
          console.log('Something went wrong.');
        },
      })
    );
  };

  const applyEvent = () => {
    let params = {
      event_id: eventDetail?._id,
    };
    dispatch(
      applyEventAction({
        params,
        onSuccess: (result) => {
          console.log('response>>>>', result);
          dispatch(
            fetchEvents({
              onSuccess: (result) => {
                console.log('Results fetch jobs', result);
                setShowSuccess(true);

                dispatch(setLoading(false));
              },
              onError: (error) => {
                dispatch(setLoading(false));
              },
            })
          );
        },
        onError: (error) => {
          console.log('Error>>>>', error);
        },
      })
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.White,
        justifyContent: 'space-between',
        flex: 1,
        height: window.height,
      }}
    >
      <View style={{ width: window.height, height: window.height * 0.9 }}>
        {isNative && (
          <HeaderContainer marginTop={0}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                padding: 20,
                borderRadius: 10,
                backgroundColor: Colors.GhostWhite,
                marginLeft: mxWidth * 0.05,
              }}
            >
              <BackButton resizeMode="contain" source={backIcon} />
            </TouchableOpacity>
          </HeaderContainer>
        )}
        <ScrollView
          bounces={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 16 }}
        >
          <View
            style={{ width: mxWidth * 0.9, marginHorizontal: mxWidth * 0.05 }}
          >
            <CustomText
              marginTop={window.width * 0.1}
              fontSize={fontResize(30)}
              {...theme.fontSemiBold}
            >
              {eventDetail && eventDetail?.event_title}
            </CustomText>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: mxWidth * 0.05,
              }}
            >
              <View
                style={{
                  height: mxWidth * 0.2,
                  width: mxWidth * 0.2,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  borderColor: Colors.SpanishGray,
                  borderWidth: 2,
                  overflow: 'hidden',
                }}
              >
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    height: mxWidth * 0.2,
                    width: mxWidth * 0.2,
                    backgroundColor: 'white',
                    borderRadius: 10,
                  }}
                  defaultSource={PostPlaceholder}
                  source={
                    eventDetail?.company_logo
                      ? {
                          uri:
                            EndPoint.baseAssestURL + eventDetail?.company_logo,
                          priority: FastImage.priority.high,
                        }
                      : PostPlaceholder
                  }
                />
              </View>
              <View style={{ paddingHorizontal: 12 }}>
                <CustomText
                  {...theme.fontSemiBold}
                  textColor={Colors.Black}
                  marginBottom={'10px'}
                  style={{ paddingEnd: window.width * 0.05 }}
                >
                  {eventDetail && eventDetail?.event_title}
                </CustomText>
                <CustomText
                  {...theme.fontSemiBold}
                  fontSize={12}
                  textColor={Colors.PrimaryGray}
                  style={{ paddingEnd: window.width * 0.05 }}
                >
                  {eventDetail && eventDetail?.company_name}
                </CustomText>
              </View>
            </View>

            <View style={{ height: mxWidth * 0.05 }} />
            <SummaryComponent
              label={Strings.ATTENDEES}
              data={eventDetail && eventDetail?.attendees}
            />
            <View style={{ height: mxWidth * 0.05 }} />
            <SummaryComponent label={Strings.DATE} data={formatDate} />
            <View style={{ height: mxWidth * 0.05 }} />
            <SummaryComponent label={Strings.TIME} data={formatTime} />
            <View style={{ height: mxWidth * 0.05 }} />
            <SummaryComponent
              label={Strings.ADDRESS}
              data={eventDetail && eventDetail?.address}
            />

            <View
              style={{
                flexDirection: 'column',
                marginVertical: window.width * 0.02,
              }}
            >
              <CustomText
                {...theme.fontSemiBold}
                textColor={Colors.PrimaryGray}
                style={{ paddingEnd: window.width * 0.05 }}
              >
                {Strings.EVENT_DESCRIPTION} :{' '}
              </CustomText>
              <CustomText
                {...theme.fontMedium}
                style={{ paddingVertical: window.width * 0.03 }}
              >
                {eventDetail && eventDetail?.job_description}
              </CustomText>
            </View>
          </View>
        </ScrollView>
        <View style={{ paddingHorizontal: 16, width: window.width }}>
          <CustomButton
            onPress={() => setShowImGoingPopup(true)}
            width={'100%'}
            height={'50px'}
            backgroundColor={Colors.Blueberry}
            marginTop={window.height * 0.03}
            marginBottom={window.height * 0.1}
            borderRadius={'10px'}
            alignItems={'center'}
            justifyContent={'center'}
            {...theme.fontSemiBold}
            fontSize={'18px'}
            textColor={Colors.White}
            text={Strings.IM_GOING}
          />
        </View>

        <ImGoingPopup
          eventDetail={eventDetail}
          showGoingPopup={showImGoingPopup}
          addToCalendar={() => {
            addToCalendar();
            applyEvent();
            setApplyCalender(true);
          }}
          dismiss={() => {
            applyEvent();
            setShowImGoingPopup(false);
          }}
        />
        <SuccessPopup
          showSuccess={showSuccess}
          onPressDone={() => {
            setShowSuccess(false);
            setTimeout(() => {
              navigation.goBack();
              setApplyCalender(false);
            }, 100);
          }}
          showMessage={
            isApplyCalender
              ? Strings.SUCCESSFULLY_ADD_CALENDER
              : Strings.SUCCESSFULLY_EVENT
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default EventDetail;
