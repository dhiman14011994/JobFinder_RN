import { View, FlatList, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../../Resources/Colors';
import ConversationRow from '../../../Component/ConversationRow';
import { RouteName } from '../../../Navigation/routeName';
import { useDispatch, useSelector } from 'react-redux';
import {
  isChatDetails,
  SelectChatDetails,
} from '../../../Redux/actions/profileAction';

import { firestore } from '../../../Constants/FirebaseWeb';
import { doc, deleteDoc } from 'firebase/firestore';

const Companies = ({ navigation }) => {
  const window = useWindowDimensions();
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const chatUserList = useSelector((state) => state.profile.companyChat);
  const renderItem = ({ item, index }) => {
    return (
      <ConversationRow
        data={item}
        onPressChat={() => onPressChat(item)}
        deleteChat={() => {
          deleteChatUser(item);
        }}
      />
    );
  };

  const deleteChatUser = (item) => {
    deleteDoc(
      doc(
        firestore,
        'ChatUserList',
        userData?.data?.user_id || userData?.data?._id,
        'userlist',
        item?.message_id
      )
    )
      .then((documentSnapshot) => {})
      .catch((error) => {
        console.log('error', error);
        reject(error);
      });
  };

  const onPressChat = (data) => {
    dispatch(
      SelectChatDetails({
        chatId: data.chatId,
        receiverId: data.id,
        receiverData: data,
        isOther: false,
      })
    );
    navigation.navigate(RouteName.CHAT_DETAIL_WEB, {
      chatId: data.chatId,
      receiverId: data.id,
      receiverData: data,
      isOther: false,
    });
    dispatch(isChatDetails(true));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.White,
        height: window.height * 0.5,
      }}
    >
      <FlatList data={chatUserList} renderItem={renderItem} />
    </View>
  );
};

export default Companies;
