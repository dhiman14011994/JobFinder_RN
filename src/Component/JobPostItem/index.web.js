import { View, Text, Switch, TouchableOpacity, Image } from 'react-native-web';
import { dummyJob } from '../../Resources/assets';
import { mxHeight, mxWidth } from '../../Util';
import { theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';
import EndPoint from '../../Redux/constants/EndPoint';
import React, { useState } from 'react';
import { style } from './styles';
import { deleteRed, pencil, profileActive } from '../../Resources/assets';
import { fontResize } from '../../Util/font';
import Strings from '../../Resources/Strings';
import { detletJobById } from '../../Redux/services/jobsService';
import { setLoading } from '../../Redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { RouteName } from '../../Navigation/routeName';
import { useNavigation } from '@react-navigation/native';
import Delete from '../Delete/index.web';
import DeleteModal from './delete/index.web';
import Type from '../../Constants/Type/type';

const JobPostItem = ({
  item,
  toDetails,
  isMyJob,
  isSwitchOn,
  onSwitchChangeValue,
  type,
  jobDeleted,
}) => {
  const [isHidePost, setIsHidePost] = useState(
    item?.is_hide === 0 ? true : false
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isCreated, setCreated] = useState(false);
  const [isDelete, setDelete] = useState(false);

  const deleteJob = async () => {
    try {
      dispatch(setLoading(true));
      let apiRequestData = {};

      var data = {
        job_id: item?._id,
      };
      apiRequestData = { ...data };

      var deleteJobResponse = await detletJobById(apiRequestData);

      if (deleteJobResponse.code == 200) {
        dispatch(setLoading(false));
        jobDeleted(true);
        setCreated(true);
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log('error', error);
      dispatch(setLoading(false));
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        toDetails(item && item?._id);
      }}
      disabled={type !== Strings.PROFESSIONAL}
      style={style.container}
    >
      <View style={style.subContainer}>
        <View style={[style.imageContainer]}>
          <Image
            resizeMode={'contain'}
            style={style.jobImage}
            source={
              item?.company_logo
                ? {
                    uri: EndPoint.baseAssestURL + item?.company_logo,
                  }
                : dummyJob
            }
          />
        </View>
        {type !== Strings.PROFESSIONAL && (
          <View
            style={{
              position: 'absolute',
              right: mxHeight * 0.01,
              height: mxHeight * 0.058,
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setDelete(true);
              }}
              style={{
                marginHorizontal: mxHeight * 0.01,
                borderRadius: mxHeight * 0.02,
                padding: mxHeight * 0.01,
                height: mxHeight * 0.035,
                width: mxHeight * 0.035,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.White,
              }}
            >
              <Image
                resizeMode="contain"
                style={{ height: mxHeight * 0.018, width: mxHeight * 0.018 }}
                source={deleteRed}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderRadius: mxHeight * 0.02,
                padding: mxHeight * 0.01,
                height: mxHeight * 0.035,
                width: mxHeight * 0.035,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.White,
              }}
              onPress={() => {
                navigation.navigate(RouteName.CREATE_JOB_POST, {
                  isEdited: true,
                  item: item,
                });
              }}
            >
              <Image
                resizeMode="contain"
                style={{ height: mxHeight * 0.018, width: mxHeight * 0.018 }}
                source={pencil}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={{ paddingHorizontal: mxWidth * 0.008 }}>
          <Text
            style={{
              ...theme.fontSemiBold,
              fontSize: fontResize(mxWidth * 0.012),
              color: Colors.Black,
              width: mxWidth * 0.15,
            }}
          >
            {item && item?.job_title}
          </Text>
          <Text
            style={{
              ...theme.fontRegular,
              fontSize: fontResize(mxWidth * 0.01),
              paddingVertical: 6,
              color: Colors.Black,
              width: mxWidth * 0.15,
            }}
          >
            {item && item?.company_name}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          // marginRight: mxWidth * 0.03,
          // marginLeft: mxWidth * 0.03,
          marginTop: mxWidth * 0.02,
          width: '90%',
          marginHorizontal: '5%',
        }}
      >
        <View
          style={{
            backgroundColor: Colors.White,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            mxWidth: mxWidth * 0.15,
          }}
        >
          <Text
            style={{
              ...theme.fontBold,
              fontSize: fontResize(mxWidth * 0.008),
              paddingHorizontal: 8,
              color: '#99C24D',
            }}
          >
            {item && item?.job_type}
          </Text>
        </View>
        <Text
          style={{
            ...theme.fontMedium,
            fontSize: fontResize(mxWidth * 0.01),
            color: Colors.Black,
            alignSelf: 'flex-end',
            padding: 5,
          }}
        >
          {item && item?.salary_range} / {item && item?.salary_period}
        </Text>
      </View>

      {isMyJob && (
        <Switch
          trackColor={{ false: '#767577', true: Colors.Blueberry }}
          thumbColor={isHidePost ? Colors.White : '#f4f3f4'}
          ios_backgroundColor={Colors.PrimaryLightGray}
          onValueChange={() => {
            setIsHidePost(!isHidePost);
            onSwitchChangeValue(item?._id, isHidePost ? 1 : 0);
          }}
          value={isHidePost}
        />
      )}

      <DeleteModal
        showDeleteModal={isDelete}
        setDeleteModal={(value) => {
          setDelete(value);
        }}
        onDeleteCallback={(type) => {
          if (type == Type.DELETE_TYPE.JOB) {
            deleteJob();
          }
        }}
        item={item}
        type={Type.DELETE_TYPE.JOB}
      ></DeleteModal>
    </TouchableOpacity>
  );
};

export default JobPostItem;
