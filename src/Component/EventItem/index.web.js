import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import {
  dummyJob,
  shareIcon,
  dummyPost,
  mapMarkerIcon,
  deleteRed,
  pencil,
} from '../../Resources/assets';
import EndPoint from '../../Redux/constants/EndPoint';
import moment from 'moment';
import { style } from './styles';
import Strings from '../../Resources/Strings';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../Redux/actions/authAction';
import { deleteEventById } from '../../Redux/services/jobsService';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from '../../Navigation/routeName';
import Delete from '../Delete/index.web';
import Type from '../../Constants/Type/type';
import DeleteModal from '../JobPostItem/delete/index.web';
import EventShare from '../../Resources/assets/EventShare.png';
import EventCalender from '../../Resources/assets/EventCalender.png';

const EventItem = ({ item, toDetails, isDeleted }) => {
  // const date = new Date(item?.date);
  const formatDate = moment(item?.date, 'YYYY-MM-DD HH:mm:ss Z')
    .local()
    .format('MMMM DD, YYYY');
  const formatTime = moment(item?.date, 'YYYY-MM-DD HH:mm:ss Z')
    .local()
    .format('hh:mm A');

  const [isCreated, setCreated] = useState(false);
  const [isDelete, setDelete] = useState(false);

  const userData = useSelector((state) => state.auth.userData);
  const selectUser = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const deleteEvent = async () => {
    try {
      dispatch(setLoading(true));
      let apiRequestData = {};

      var data = {
        event_id: item?._id,
      };
      apiRequestData = { ...data };

      var deleteEventResponse = await deleteEventById(apiRequestData);

      if (deleteEventResponse.code == 200) {
        dispatch(setLoading(false));
        setCreated(true);
        isDeleted(true);
      } else {
        dispatch(setLoading(false));
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.log('error', error);
      dispatch(setLoading(false));
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        selectUser == Strings.PROFESSIONAL && toDetails(item?._id);
      }}
      style={
        selectUser == Strings.PROFESSIONAL
          ? style.subWebContainer
          : style.webContainer
      }
    >
      <View style={style.subContainer}>
        <Image
          resizeMode={'cover'}
          style={style.imageContainer}
          source={
            item?.company_logo
              ? {
                  uri: EndPoint.baseAssestURL + item?.company_logo,
                  priority: 'high',
                }
              : dummyPost
          }
        />

        <View style={style.detailsView}>
          <View style={style.subDetailsVw}>
            <Image
              resizeMode={'cover'}
              style={style.subIconImage}
              source={
                item?.company_logo
                  ? {
                      uri: EndPoint.baseAssestURL + item?.company_logo,
                      priority: 'high',
                    }
                  : dummyJob
              }
            />

            <Text style={style.title}>{item && item?.event_title}</Text>
          </View>
          <View
            style={
              selectUser == Strings.PROFESSIONAL
                ? {
                    height: Dimensions.get('window').height * 0.06,
                    justifyContent: 'center',
                    marginVertical: Dimensions.get('window').height * 0.01,
                  }
                : { paddingVertical: Dimensions.get('window').height * 0.03 }
            }
          >
            <Text
              numberOfLines={selectUser == Strings.PROFESSIONAL ? 2 : 2000}
              style={style.descriptionText}
            >
              {item && item?.job_description}
            </Text>
          </View>
          <View style={style.attendeesMainView}>
            <View style={style.attendeesSubView}>
              <Text style={style.attendeesTx}>
                `{item && item?.attendees} Attendees`
              </Text>
            </View>
            <View style={style.formateDateView}>
              <Text style={style.formateDateText}>{formatDate}</Text>
            </View>
            <View style={style.formateView}>
              <Text style={style.formateTime}>{formatTime}</Text>
            </View>
          </View>
          <View style={[style.markerView, { alignItems: 'center' }]}>
            <Image
              resizeMode="contain"
              style={style.mapMarkerIcon}
              source={mapMarkerIcon}
            />
            <Text style={style.addressText}>{item && item?.address}</Text>
          </View>
        </View>
      </View>
      <View style={style.shareView}>
        <TouchableOpacity style={[style.shareWebButton]}>
          <Image
            resizeMode="contain"
            style={[style.shareImage]}
            source={EventCalender}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[style.shareWebButton, { marginLeft: '10%' }]}>
          <Image
            resizeMode="contain"
            style={[style.shareImage, { marginLeft: -2 }]}
            source={EventShare}
          />
        </TouchableOpacity>
      </View>

      {selectUser !== Strings.PROFESSIONAL && (
        <TouchableOpacity
          onPress={() => {
            // deleteEvent()
            setDelete(true);
          }}
          style={style.deleteButton}
        >
          <Image
            resizeMode="contain"
            style={style.deleteImage}
            source={deleteRed}
          />
        </TouchableOpacity>
      )}

      {selectUser !== Strings.PROFESSIONAL && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(RouteName.CREATE_EVENT_POST, {
              isEdited: true,
              item: item,
            });
          }}
          style={style.editButton}
        >
          <Image resizeMode="contain" style={style.editImage} source={pencil} />
        </TouchableOpacity>
      )}

      <DeleteModal
        showDeleteModal={isDelete}
        setDeleteModal={(value) => {
          setDelete(value);
        }}
        onDeleteCallback={(type) => {
          if (type == Type.DELETE_TYPE.EVENT) {
            deleteEvent();
          }
        }}
        item={item}
        type={Type.DELETE_TYPE.EVENT}
      ></DeleteModal>
    </TouchableOpacity>
  );
};

export default EventItem;
