import { View, FlatList } from 'react-native';
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

const DirectMessages = ({ navigation }) => {
  const userData = useSelector((state) => state.auth.userData);
  const chatUserList = useSelector((state) => state.profile.directChat);
  const dispatch = useDispatch();

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
  const onPressChat = (data) => {
    dispatch(
      SelectChatDetails({
        chatId: data.chatId,
        receiverId: data.id,
        receiverData: data,
        isOther: false,
      })
    );
    dispatch(isChatDetails(true));
    navigation.navigate(RouteName.CHAT_DETAIL_WEB, {
      chatId: data.chatId,
      receiverId: data.id,
      receiverData: data,
      isOther: false,
    });
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
      .then((documentSnapshot) => {
        setDeleteModal(true);
      })
      .catch((error) => {
        reject(error);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.White }}>
      <FlatList data={chatUserList} renderItem={renderItem} />
    </View>
  );
};
export default DirectMessages;
