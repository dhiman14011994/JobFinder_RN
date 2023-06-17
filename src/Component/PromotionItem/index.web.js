import { View, Image, Text, TouchableOpacity } from 'react-native';
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
import Strings from '../../Resources/Strings';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../Redux/actions/authAction';
import { deleteEventById } from '../../Redux/services/jobsService';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from '../../Navigation/routeName';
import Delete from '../Delete/index.web';
import Type from '../../Constants/Type/type';
import DeleteModal from '../JobPostItem/delete/index.web';
import { style } from './styles';
import { deletePromotionById } from '../../Redux/services/promotionService';

const PromotionItem = ({ item, toDetails, isDeleted, image }) => {
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
        id: item?._id,
      };
      apiRequestData = { ...data };

      var deletePromotionResponse = await deletePromotionById(apiRequestData);

      if (deletePromotionResponse.code == 200) {
        dispatch(setLoading(false));
        setCreated(true);
        isDeleted(true);
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log('error', error);
      dispatch(setLoading(false));
    }
  };

  return (
    <TouchableOpacity onPress={() => {}} style={style.webContainer}>
      <View style={style.subContainer}>
        <Image
          resizeMode={'cover'}
          style={style.imageContainer}
          source={
            item?.image
              ? {
                  uri: EndPoint.baseAssestURL + item?.image,
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
                image?.userinfo?.profile_pic
                  ? {
                      uri:
                        EndPoint.baseAssestURL + image?.userinfo?.profile_pic,
                    }
                  : dummyImage
              }
            />

            <Text style={style.title}>{item && item?.promotion_title}</Text>
          </View>
          <View>
            <Text style={style.descriptionText}>
              {item && item?.description}
            </Text>
          </View>
          <View style={style.attendeesMainView}>
            <View style={style.formateDateView}>
              <Text style={style.formateDateText}>
                {item && item?.start_date}
              </Text>
            </View>
            <View style={style.formateView}>
              <Text style={style.formateTime}>{item && item?.end_date}</Text>
            </View>

            <View style={style.formateDateView}>
              <Text style={style.formateDateText}>{item && item?.amount}</Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity style={style.shareButton}>
        <Image
          resizeMode="contain"
          style={style.shareImage}
          source={shareIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
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

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(RouteName.CREATE_PROMOTIONS, {
            isEdited: true,
            item: item,
          });
        }}
        style={style.editButton}
      >
        <Image resizeMode="contain" style={style.editImage} source={pencil} />
      </TouchableOpacity>

      <DeleteModal
        showDeleteModal={isDelete}
        setDeleteModal={(value) => {
          setDelete(value);
        }}
        onDeleteCallback={(type) => {
          if (type == Type.DELETE_TYPE.PROMOTION) {
            deleteEvent();
          }
        }}
        item={item}
        type={Type.DELETE_TYPE.PROMOTION}
      ></DeleteModal>
    </TouchableOpacity>
  );
};

export default PromotionItem;
