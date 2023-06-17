//import liraries
import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../Component/CustomHeader';
import { STAR_ICON, backIcon, dummyImage } from '../../Resources/assets';
import Strings from '../../Resources/Strings';
import { CustomText } from '../../Component/CustomComponent';
import { theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';
import { CustomView, Image } from '../../Component/CustomComponent';
import {
  fetchFollowList,
  fetchFollowListOther,
  followUserAction,
} from '../../Redux/actions/profileAction';
import { useDispatch, useSelector } from 'react-redux';
import EndPoint from '../../Redux/constants/EndPoint';
import FastImage from 'react-native-fast-image';
import { setLoading } from '../../Redux/actions/authAction';
import { RouteName } from '../../Navigation/routeName';

// create a component
const Followers = ({ navigation }) => {
  const followerList = useSelector((state) => state.profile.followListOther);

  const checkTypeOf = typeof followerList;

  const dispatch = useDispatch();
  const [list, setList] = React.useState([]);

  useEffect(() => {
    fetchmyFollwers();
  }, []);

  const followUser = (userId, index) => {
    try {
      dispatch(setLoading(true));
      const params = {
        follower_id: userId,
      };

      dispatch(
        followUserAction({
          params,
          onSuccess: (result) => {
            dispatch(setLoading(false));
            fetchmyFollwers();
          },
          onError: (error) => {
            dispatch(setLoading(false));
            console.log('error', error);
          },
        })
      );
    } catch (error) {
      dispatch(setLoading(false));
      console.log('error', error);
    }
  };

  const fetchmyFollwers = () => {
    try {
      dispatch(setLoading(false));
      let params = `?follow=by_other`;
      dispatch(
        fetchFollowListOther({
          params,
          onSuccess: async (result) => {
            dispatch(setLoading(false));
          },
          onError: (error) => {
            dispatch(setLoading(false));
            console.log('error', error);
          },
        })
      );
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
    }
  };

  const { width, height } = useWindowDimensions();

  const getFollowIndex = (index) => {
    const checkIndex = list.findIndex((element) => element == index);
    return checkIndex == -1 ? false : true;
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          marginVertical: '2%',
          flexDirection: 'row',
          padding: '2%',
          borderBottomWidth: 1,
          borderBottomColor: Colors.Gray,
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            padding: '2%',
            width: '75%',
          }}
          onPress={() => {
            navigation.navigate(RouteName.OTHER_PROFILE, { userId: item._id });
          }}
        >
          <FastImage
            style={{
              height: 60,
              width: 60,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: Colors.White,
            }}
            source={
              item?.image
                ? {
                    uri: EndPoint.baseAssestURL + item?.image,
                  }
                : dummyImage
            }
          />

          <View
            style={{
              marginHorizontal: '4%',
              justifyContent: 'space-evenly',
              width: '53%',
            }}
          >
            <CustomText
              fontSize={'18px'}
              style={{ color: Colors.Black }}
              {...theme.fontBold}
            >
              {item?.name}{item?.gold_member ? <Image source={STAR_ICON} style={{height: 18, width: 18}}/> : ''}
            </CustomText>

            <View style={{ flexDirection: 'row' }}>
              <CustomText
                fontSize={'16px'}
                style={{ color: Colors.Black }}
                {...theme.fontMedium}
              >
                {item?.skill ? item?.skill : item?.role}
              </CustomText>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={item?.followed_by_me ? true : false}
          onPress={() => {
            followUser(item?._id, index);
          }}
          style={{
            width: '25%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CustomText
            fontSize={'16px'}
            style={{
              color: item?.followed_by_me
                ? Colors.lightGray
                : Colors.GreenColor,
            }}
            {...theme.fontBold}
          >
            {
              //  getFollowIndex(index)? "Following":
              item?.followed_by_me ? 'Following' : 'Follow'
            }
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        constainerStyle={{ paddingHorizontal: 12 }}
        leftButtons={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              resizeMode="contain"
              style={{ height: 26, width: 26 }}
              source={backIcon}
            />
          </TouchableOpacity>
        }
        rightButtons={<></>}
        title={Strings.FOLLOWERS}
      />

      <CustomText
        fontSize={'18px'}
        style={{
          paddingVertical: 8,
          color: 'gray',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: Colors.gray2,
          paddingTop: 20,
          paddingBottom: 20,
          padding: 20,
        }}
        {...theme.fontMedium}
      >
        {`${
          checkTypeOf == 'string' ? 0 : followerList.length
        } people following you`}
      </CustomText>
      <FlatList
        bounces={false}
        data={checkTypeOf == 'string' ? [] : followerList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
});

//make this component available to the app
export default Followers;
