import { View, FlatList, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFirebaseChatOrderByUserList,
  getFirebaseUserData,
  setFirebaseChatList,
  setFirebaseUserData,
} from '../../../Constants/FireStoremanager/FireStoremanager';
import Colors from '../../../Resources/Colors';
import ConversationRow from '../../../Component/ConversationRow';
import { RouteName } from '../../../Navigation/routeName';
import Emitter from '../../../Util/eventEmitter';
import firestore from '@react-native-firebase/firestore';
import {
  fetchViewedNotificationAction,
  setLoading,
} from '../../../Redux/actions/profileAction';
import Strings from '../../../Resources/Strings';
import { NoDataFoundView } from '../../../Component/CustomErrorComponent';
import { style } from './styles';
const ChatNotifications = ({ navigation }) => {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const viewedNotifications = useSelector(
    (state) => state?.profile?.viewedNotifications
  );
  const type = userData?.data?.role
    ? userData?.data?.role
    : Strings.PROFESSIONAL;

  const [chatUserList, setChatUserList] = useState([]);
  const [notificationUserList, setnotificationUserList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchViewedProfileNotification();
    Emitter.on('ChatRef', () => {
      fetchViewedProfileNotification();
    });
    return () => {
      Emitter.off('ChatRef');
    };
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchViewedProfileNotification();
  }, [refreshing]);

  const fetchViewedProfileNotification = () => {
    try {
      dispatch(setLoading(true));
      dispatch(
        fetchViewedNotificationAction({
          onSuccess: (result) => {
            const listNotificationData = [];
            setChatUserList(result.data);
            setnotificationUserList(result.data);
            dispatch(setLoading(false));
            setRefreshing(false);
            if (type !== Strings.PROFESSIONAL) {
              getFirebaseNotification();
            }
          },
          onError: (error) => {
            dispatch(setLoading(false));
            console.log('error', error);
          },
        })
      );
    } catch (err) {
      setRefreshing(false);
      dispatch(setLoading(false));
      console.log('error', err);
    }
  };

  const getFirebaseNotification = () => {
    try {
      firestore()
        .collection('Notification')
        .doc(userData?.data?.user_id || userData?.data?._id)
        .collection('notificationList')
        .orderBy('dateTime', 'desc')
        .onSnapshot(
          (response) => {
            var listUserData = chatUserList;
            var chatUserData = {};
            response?.docs?.forEach((doc, index) => {
              chatUserData = doc.data();
              let findIndex = chatUserList.filter(
                (items) => items?.message_id == doc.id
              );
              if (findIndex.length == 0) {
                chatUserData.message_id = doc.id;
                listUserData.push(chatUserData);
              }
            });
            setChatUserList(listUserData);
            dispatch(setLoading(false));
            setRefreshing(false);
          },
          (error) => {
            console.log(error);
            setRefreshing(false);
            dispatch(setLoading(false));
          }
        );
    } catch (error) {
      dispatch(setLoading(false));
      setRefreshing(false);
      console.log('error', error);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <ConversationRow data={item} onPressChat={() => onPressChat(item)} />
    );
  };
  const onPressChat = async (data) => {
    const otherUserId = data?.userId || data?.user?._id;
    const cureentUserId = userData?.data?.user_id || userData?.data?._id;
    var chatId =
      cureentUserId > otherUserId
        ? `${cureentUserId}${otherUserId}`
        : `${otherUserId}${cureentUserId}`;

    const userExist = await getFirebaseChatOrderByUserList({
      id: cureentUserId,
      userId: otherUserId,
    });
    const otherUserExist = await getFirebaseChatOrderByUserList({
      id: otherUserId,
      userId: cureentUserId,
    });

    if (userExist.length == 0 || otherUserExist.length == 0) {
      checkUserExist({
        data: data,
        otherUserId: otherUserId,
        cureentUserId: cureentUserId,
        chatId: chatId,
      });
      checkCurrentUserExist({
        data: data,
        otherUserId: otherUserId,
        cureentUserId: cureentUserId,
        chatId: chatId,
      });
      checkOtherUserExist({
        data: data,
        otherUserId: otherUserId,
        cureentUserId: cureentUserId,
        chatId: chatId,
      });
      moveChatScreen(data);
    } else {
      moveChatScreen(data);
    }
  };

  const checkCurrentUserExist = async ({
    data,
    otherUserId,
    cureentUserId,
    chatId,
  }) => {
    const userExist = await getFirebaseChatOrderByUserList({
      id: cureentUserId,
      userId: otherUserId,
    });
    if (userExist.length == 0) {
      var otherUserData = {
        id: otherUserId,
        name: data?.name || data?.user?.name || '',
        role: data?.role || data?.user?.role || Strings.PROFESSIONAL,
        image: data?.image || data?.user?.image || data?.userinfo?.image || '',
        status: '',
        chatId: chatId,
        message: '',
        maessageType: 'text',
        dateTime: new Date(),
      };
      var setUserList = await setFirebaseChatList({
        id: cureentUserId,
        userData: otherUserData,
        chatUserId: otherUserId,
      });
    }
  };

  const checkOtherUserExist = async ({
    data,
    otherUserId,
    cureentUserId,
    chatId,
  }) => {
    const otherUserExist = await getFirebaseChatOrderByUserList({
      id: otherUserId,
      userId: cureentUserId,
    });

    if (otherUserExist.length == 0) {
      var cureentUserData = {
        id: cureentUserId,
        name: userData?.data?.name,
        role: userData?.data?.role,
        image: userData?.data?.image || '',
        status: '',
        chatId: chatId,
        message: '',
        maessageType: 'text',
        dateTime: new Date(),
      };
      var setOtherUserList = await setFirebaseChatList({
        id: otherUserId,
        userData: cureentUserData,
        chatUserId: cureentUserId,
      });
    }
  };

  const checkUserExist = async ({
    data,
    otherUserId,
    cureentUserId,
    chatId,
  }) => {
    const usergetExist = await getFirebaseUserData({
      id: otherUserId,
    });

    if (!usergetExist) {
      const userStoreData = {
        id: otherUserId,
        email: data?.email || data?.user?.email || '',
        device_token: data?.device_token || data?.user?.device_token || '',
        image: data?.image || data?.user?.image || data?.userinfo?.image || '',
        name: data?.name || data?.user?.name || '',
        role: data?.role || data?.user?.role || Strings.PROFESSIONAL,
        phone_number: data?.phone_number || data?.user?.phone_number,
        status: 'offline',
        dateTime: new Date(),
      };
      const storeFirbaseData = await setFirebaseUserData({
        id: otherUserId,
        userData: userStoreData,
      });
    }
  };

  const moveChatScreen = (data) => {
    const otherUserId = data?.userId || data?.user?._id;
    const cureentUserId = userData?.data?.user_id || userData?.data?._id;
    var chatId =
      cureentUserId > otherUserId
        ? `${cureentUserId}${otherUserId}`
        : `${otherUserId}${cureentUserId}`;

    navigation.navigate('ChatStack', {
      screen: RouteName.CHAT_DETAIL,
      params: {
        chatId: chatId,
        receiverId: otherUserId,
        isOther: false,
        receiverData: {
          id: otherUserId,
          name: data?.name || data?.user?.name || '',
          role: data?.role || data?.user?.role || Strings.PROFESSIONAL,
          image:
            data?.image || data?.user?.image || data?.userinfo?.image || '',
          status: '',
          chatId: chatId,
          message: '',
          maessageType: 'text',
          dateTime: new Date(),
        },
      },
    });
  };

  const listEmptyComponent = () => {
    return (
      <View style={style.emptyView}>
        <NoDataFoundView warning_message={'No notification found'} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.White }}>
      <FlatList
        data={
          type !== Strings.PROFESSIONAL
            ? [...chatUserList, ...notificationUserList]
            : notificationUserList
        }
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor={Colors.Blueberry}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={listEmptyComponent}
      />
    </View>
  );
};

export default ChatNotifications;
