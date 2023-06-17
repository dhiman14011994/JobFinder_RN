//import liraries
import React, { Component, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../Component/CustomHeader';
import { backIcon, CONNECTION_ICON, dummyImage, STAR_ICON } from '../../Resources/assets';
import Strings from '../../Resources/Strings';
import { CustomText } from '../../Component/CustomComponent';
import { theme } from '../../Util/constant';
import Colors from '../../Resources/Colors';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFollowList,
  fetchOtherProfile,
} from '../../Redux/actions/profileAction';
import EndPoint from '../../Redux/constants/EndPoint';
import {
  getFirebaseChatOrderByUserList,
  getFirebaseUserData,
  setFirebaseChatList,
  setFirebaseUserData,
} from '../../Constants/FireStoremanager/FireStoremanager';
import { RouteName } from '../../Navigation/routeName';
import FastImage from 'react-native-fast-image';

// create a component
const Connection = ({ navigation }) => {
  const followerList = useSelector((state) => state.profile.followList);

  const checkTypeOf = typeof followerList;

  const userData = useSelector((state) => state.auth.userData);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchmyFollwers();
  }, []);

  const fetchOtherUserProfile = (userId) => {
    dispatch(
      fetchOtherProfile({
        userId,
        onSuccess: (result) => {
          createChat(result.data);
        },
        onError: (error) => {},
      })
    );
  };

  const fetchmyFollwers = () => {
    let params = `?follow=by_me`;
    dispatch(
      fetchFollowList({
        params,
        onSuccess: async (result) => {},
        onError: (error) => {
          console.log('Error', error);
        },
      })
    );
  };

  const createChat = async (otherUserProfile) => {
    const otherUserId = otherUserProfile?._id;
    const userExist = await getFirebaseChatOrderByUserList({
      id: userData?.data?.user_id || userData?.data?._id,
      userId: otherUserId,
    });
    const newID = userData?.data?.user_id || userData?.data?._id;
    var chatId =
      newID > otherUserId ? `${newID}${otherUserId}` : `${otherUserId}${newID}`;
    if (userExist.length == 0) {
      const usergetExist = await getFirebaseUserData({
        id: otherUserId,
      });

      if (!usergetExist) {
        const userStoreData = {
          id: otherUserId,
          email: otherUserProfile?.email || '',
          device_token: otherUserProfile?.device_token || '',
          image:
            otherUserProfile?.image || otherUserProfile?.userinfo?.image || '',
          name: otherUserProfile?.name || '',
          role: otherUserProfile?.role || '',
          phone_number: otherUserProfile?.phone_number || '',
          status: 'offline',
          dateTime: new Date(),
        };
        const storeFirbaseData = await setFirebaseUserData({
          id: otherUserId,
          userData: userStoreData,
        });
      }

      var otherUserData = {
        id: otherUserId,
        name: otherUserProfile?.name || '',
        role: otherUserProfile?.role || '',
        image:
          otherUserProfile?.image || otherUserProfile?.userinfo?.image || '',
        status: '',
        chatId: chatId,
        message: '',
        maessageType: 'text',
        dateTime: new Date(),
      };
      var cureentUserData = {
        id: userData?.data?.user_id || userData?.data?._id,
        name: userData?.data?.name || '',
        role: userData?.data?.role || '',
        image: userData?.data?.image || '',
        status: '',
        chatId: chatId,
        message: '',
        maessageType: 'text',
        dateTime: new Date(),
      };
      var setUserList = await setFirebaseChatList({
        id: userData?.data?.user_id || userData?.data?._id,
        userData: otherUserData,
        chatUserId: otherUserId,
      });

      var setOtherUserList = await setFirebaseChatList({
        id: otherUserId,
        userData: cureentUserData,
      });
      navigation.navigate('ChatStack', {
        screen: RouteName.CHAT_DETAIL,
        params: {
          chatId: chatId,
          receiverId: otherUserId,
          isOther: true,
          receiverData: {
            id: otherUserId,
            name: otherUserProfile?.name || '',
            role: otherUserProfile?.role || '',
            image:
              otherUserProfile?.image ||
              otherUserProfile?.userinfo?.image ||
              '',
            status: '',
            chatId: chatId,
            message: '',
            maessageType: 'text',
            dateTime: new Date(),
          },
        },
      });
    } else {
      navigation.navigate('ChatStack', {
        screen: RouteName.CHAT_DETAIL,
        params: {
          chatId: chatId,
          receiverId: otherUserId,
          isOther: true,
          receiverData: {
            id: otherUserId,
            name: otherUserProfile?.name || '',
            role: otherUserProfile?.role || '',
            image:
              otherUserProfile?.image ||
              otherUserProfile?.userinfo?.image ||
              '',
            status: '',
            chatId: chatId,
            message: '',
            maessageType: 'text',
            dateTime: new Date(),
          },
        },
      });
    }
  };

  const { width, height } = useWindowDimensions();

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
              {item?.name || ''}{item?.gold_member ? <Image source={STAR_ICON} style={{height: 18, width: 18}}/> : ''}
            </CustomText>

            <CustomText
              fontSize={'16px'}
              style={{ color: Colors.Black }}
              {...theme.fontMedium}
            >
              {item?.skill ? item?.skill : item?.role}
            </CustomText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            fetchOtherUserProfile(item?._id);
          }}
          style={{
            width: '15%',
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingEnd: 20,
          }}
        >
          <FastImage
            resizeMode="contain"
            style={{ height: 26, width: 26 }}
            source={CONNECTION_ICON}
          />
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
            <FastImage
              resizeMode="contain"
              style={{ height: 26, width: 26 }}
              source={backIcon}
            />
          </TouchableOpacity>
        }
        rightButtons={<></>}
        title={Strings.CONNECTIONS}
      />
      <FlatList
        bounces={false}
        data={followerList}
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
export default Connection;
