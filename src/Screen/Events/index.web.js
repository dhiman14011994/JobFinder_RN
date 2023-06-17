/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '../../Resources/Colors';
import EventItem from '../../Component/EventItem';
import { mxHeight, mxWidth } from '../../Util';
import { theme } from '../../Util/constant';
import { useDispatch, useSelector } from 'react-redux';
import {
  BackButton,
  HeaderContainer,
} from '../Authentication/VerificationStyle';
import {
  addCalendarDateIcon,
  addCalendarTimeIcon,
  backIcon,
  CrossIcon,
  dummyJob,
  SuccessIcon,
} from '../../Resources/assets';
import { CustomText } from '../../Component/CustomComponent';
import { fontResize } from '../../Util/font';
import EndPoint from '../../Redux/constants/EndPoint';
import Strings from '../../Resources/Strings';
import SummaryComponent from '../../Component/SummaryComponent';
import moment from 'moment';
import CustomButton from '../../Component/CustomButton';
import {
  addEventToCalendar,
  applyEventAction,
  fetchEvents,
} from '../../Redux/actions/jobAndEventAction';
import Type from '../../Constants/Type/type';

const Events = ({ navigation, eventDeleted, selectionType }) => {
  const [isVisable, setVisable] = useState(false);
  const [isImGoing, setImGoning] = useState(false);
  const [eventItem, setEventItem] = useState('');
  const [eventdate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [isSucessfully, setSucessfully] = useState(false);
  const searchedEvents = useSelector(
    (state) => state.jobAndEvent.searchedEvents
  );

  const dispatch = useDispatch();
  const events = useSelector((state) => state.jobAndEvent.events);
  const userData = useSelector((state) => state.auth.userData);
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const renderItem = ({ item }) => {
    return (
      <EventItem
        selectionType={selectionType}
        item={item}
        type={type}
        toDetails={(id) => {
          setVisable(true);
          setEventItem(item);
          const formatDate = moment(item?.date, 'YYYY-MM-DD HH:mm:ss Z')
            .local()
            .format('MMMM DD, YYYY');
          const formatTime = moment(item?.date, 'YYYY-MM-DD HH:mm:ss Z')
            .local()
            .format('hh:mm A');
          setEventDate(formatDate);
          setEventTime(formatTime);
        }}
        isDeleted={() => {
          eventDeleted();
        }}
      />
    );
  };

  const addToCalendar = () => {
    let params = {
      event_id: eventItem?._id,
    };
    dispatch(
      addEventToCalendar({
        params,
        onSuccess: (result) => {},
        onError: (error) => {},
      })
    );
  };

  const applyEvent = () => {
    let params = {
      event_id: eventItem?._id,
    };
    dispatch(
      applyEventAction({
        params,
        onSuccess: (result) => {
          dispatch(
            fetchEvents({
              onSuccess: (result) => {
                setSucessfully(true);
                setTimeout(() => {
                  setImGoning(false);
                  setVisable(false);
                  setSucessfully(false);
                }, 5000);
              },
              onError: (error) => {
                setImGoning(false);
                setVisable(false);
                setSucessfully(false);
                console.log('error>>', error);
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
    <View
      style={{ flex: 1, backgroundColor: Colors.White, paddingHorizontal: 16 }}
    >
      {selectionType == Type.EVENT_TYPE.TAB && (
        <Text
          style={{
            ...theme.fontSemiBold,
            fontSize: 20,
            marginVertical: mxWidth * 0.01,
          }}
        >
          Recommended
        </Text>
      )}

      <FlatList
        horizontal={type == Strings.PROFESSIONAL}
        data={searchedEvents.length > 0 ? searchedEvents : events && events}
        renderItem={renderItem}
      />
      <Modal
        visible={isVisable}
        style={{ flex: 1 }}
        transparent={true}
        animationType={'fade'}
      >
        <View
          style={{
            backgroundColor: Colors.background,
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: isSucessfully ? 'flex-start' : 'center',
          }}
        >
          {isSucessfully ? (
            <View
              style={{
                alignSelf: 'flex-end',
                backgroundColor: Colors.White,
                borderRadius: mxHeight * 0.01,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: mxHeight * 0.02,
                marginRight: mxHeight * 0.02,
                paddingHorizontal: mxHeight * 0.02,
                paddingVertical: mxHeight * 0.02,
              }}
            >
              <Image
                style={{
                  width: mxHeight * 0.05,
                  height: mxHeight * 0.05,
                  marginLeft: -mxHeight * 0.01,
                  // backgroundColor: 'red',
                }}
                resizeMode={'cover'}
                source={SuccessIcon}
              />
              <Text
                style={{
                  ...theme.fontBold,
                  color: Colors.Black,
                  fontSize: fontResize(mxHeight * 0.02),
                }}
              >
                {Strings.SUCCESSFULLY_APPLIED}
              </Text>
            </View>
          ) : isImGoing ? (
            <View
              style={{
                width: mxWidth * 0.5,

                paddingHorizontal: '4%',
                paddingVertical: '3%',
                backgroundColor: Colors.White,
                borderRadius: 20,
              }}
            >
              <HeaderContainer marginTop={0}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setVisable(false);
                    }}
                    style={{
                      height: mxWidth * 0.03,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <BackButton resizeMode="contain" source={backIcon} />
                    <Text
                      style={{
                        ...theme.fontBold,
                        marginLeft: 10,
                        fontSize: fontResize(mxWidth * 0.014),
                      }}
                    >
                      {Strings.APPLY_NOW}
                      {'?'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginRight: mxWidth * 0.003 }}
                    onPress={() => {
                      setVisable(false);
                    }}
                  >
                    <Image
                      style={{
                        width: mxWidth * 0.02,
                        height: mxWidth * 0.02,
                      }}
                      source={CrossIcon}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                </View>
              </HeaderContainer>

              <View
                style={{ alignItems: 'center', marginTop: mxWidth * 0.014 }}
              >
                <CustomText
                  {...theme.fontRegular}
                  fontSize={fontResize(mxWidth * 0.014)}
                  textColor={Colors.DimGray}
                >
                  {'Add the event details into your calendar'}
                </CustomText>
              </View>
              <View
                style={{
                  backgroundColor: '#EEF5E1',
                  borderRadius: 12,
                  marginVertical: mxWidth * 0.014,
                }}
              >
                <View style={{ alignItems: 'center', paddingVertical: 12 }}>
                  <CustomText
                    {...theme.fontSemiBold}
                    fontSize={fontResize(mxWidth * 0.014)}
                    textColor={Colors.DimGray}
                  >
                    {'Event Details'}
                  </CustomText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 22,
                    paddingTop: 12,
                    paddingBottom: 24,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      resizeMode="contain"
                      style={{ height: 20, width: 20, margin: 8 }}
                      source={addCalendarDateIcon}
                    />
                    <CustomText
                      {...theme.fontSemiBold}
                      fontSize={fontResize(mxWidth * 0.012)}
                      textColor={'#6A961A'}
                    >
                      {eventdate}
                    </CustomText>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      resizeMode="contain"
                      style={{ height: 20, width: 20, margin: 8 }}
                      source={addCalendarTimeIcon}
                    />
                    <CustomText
                      {...theme.fontSemiBold}
                      fontSize={fontResize(mxWidth * 0.012)}
                      textColor={'#6A961A'}
                    >
                      {eventTime}
                    </CustomText>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 22,
                  paddingVertical: 12,
                  justifyContent: 'space-between',
                }}
              >
                <CustomButton
                  width={'55%'}
                  height={'55px'}
                  backgroundColor={Colors.Blueberry}
                  marginTop={'22px'}
                  borderRadius={'10px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  {...theme.fontSemiBold}
                  fontSize={'16px'}
                  textColor={Colors.White}
                  onPress={() => {
                    addToCalendar();
                    applyEvent();
                  }}
                  text={'Add to Calendar'}
                />
                <CustomButton
                  width={'40%'}
                  height={'55px'}
                  backgroundColor={Colors.White}
                  marginTop={'22px'}
                  borderRadius={'10px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  {...theme.fontSemiBold}
                  fontSize={'16px'}
                  textColor={'#F6690F'}
                  buttonContainer={{
                    borderColor: '#F6690F',
                    borderWidth: 1,
                  }}
                  onPress={() => {
                    applyEvent();
                  }}
                  text={'Dismiss'}
                />
              </View>
            </View>
          ) : (
            <ScrollView
              bounces={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <View
                style={{
                  width: mxWidth * 0.5,
                  marginVertical: mxHeight * 0.05,
                  padding: '5%',
                  backgroundColor: Colors.White,
                  borderRadius: 20,
                }}
              >
                <HeaderContainer marginTop={0}>
                  <View
                    style={{
                      marginLeft: mxWidth * 0.01,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setVisable(false);
                      }}
                      style={{
                        height: mxWidth * 0.03,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}
                    >
                      <BackButton resizeMode="contain" source={backIcon} />
                      <Text
                        style={{
                          ...theme.fontBold,
                          marginLeft: 10,
                          fontSize: fontResize(mxWidth * 0.014),
                        }}
                      >
                        {Strings.APPLY_NOW}
                        {'?'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginRight: mxWidth * 0.003 }}
                      onPress={() => {
                        setVisable(false);
                      }}
                    >
                      <Image
                        style={{
                          width: mxWidth * 0.02,
                          height: mxWidth * 0.02,
                        }}
                        source={CrossIcon}
                        resizeMode={'contain'}
                      />
                    </TouchableOpacity>
                  </View>
                </HeaderContainer>

                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: mxWidth * 0.02,
                    }}
                  >
                    <Image
                      resizeMode={'contain'}
                      style={{
                        height: mxWidth * 0.06,
                        width: mxWidth * 0.06,
                        backgroundColor: Colors.White,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        borderRadius: mxWidth * 0.01,
                        borderColor: Colors.background,
                        borderWidth: 2,
                      }}
                      source={
                        eventItem?.company_logo
                          ? {
                              uri:
                                EndPoint.baseAssestURL +
                                eventItem?.company_logo,
                              priority: 'high',
                            }
                          : dummyJob
                      }
                    />
                    <View style={{ paddingHorizontal: 12 }}>
                      <CustomText
                        {...theme.fontSemiBold}
                        textColor={Colors.Black}
                        marginBottom={'10px'}
                      >
                        {eventItem && eventItem?.event_title}
                      </CustomText>
                      <CustomText
                        {...theme.fontSemiBold}
                        fontSize={12}
                        textColor={Colors.PrimaryGray}
                      >
                        {eventItem && eventItem?.company_name}
                      </CustomText>
                    </View>
                  </View>
                  <SummaryComponent
                    label={Strings.EVENT_TITLE}
                    data={eventItem && eventItem?.event_title}
                  />
                  <SummaryComponent
                    label={Strings.ATTENDEES}
                    data={eventItem && eventItem?.attendees}
                  />
                  <SummaryComponent label={Strings.DATE} data={eventdate} />
                  <SummaryComponent label={Strings.TIME} data={eventTime} />
                  <SummaryComponent
                    label={Strings.ADDRESS}
                    data={eventItem && eventItem?.address}
                  />

                  <View
                    style={{
                      flexDirection: 'column',
                      marginVertical: mxWidth * 0.01,
                    }}
                  >
                    <CustomText
                      {...theme.fontSemiBold}
                      textColor={Colors.PrimaryGray}
                    >
                      {Strings.EVENT_DESCRIPTION} :{' '}
                    </CustomText>
                    <CustomText
                      {...theme.fontMedium}
                      style={{ paddingVertical: mxWidth * 0.01 }}
                    >
                      {eventItem && eventItem?.job_description}
                    </CustomText>
                  </View>

                  <View style={{ paddingHorizontal: 16 }}>
                    <CustomButton
                      onPress={() => {
                        setImGoning(true);
                      }}
                      width={'60%'}
                      height={'45px'}
                      backgroundColor={Colors.Blueberry}
                      marginTop={mxHeight * 0.03}
                      marginBottom={mxHeight * 0.03}
                      borderRadius={'10px'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      {...theme.fontSemiBold}
                      fontSize={'18px'}
                      textColor={Colors.White}
                      text={Strings.IM_ATTENDED}
                    />
                  </View>
                </>
              </View>
            </ScrollView>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default Events;
