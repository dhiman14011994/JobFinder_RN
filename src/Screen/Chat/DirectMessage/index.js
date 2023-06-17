import { View, FlatList, TouchableOpacity, Modal, Image } from 'react-native';
import React from 'react';
import Colors from '../../../Resources/Colors';
import ConversationRow from '../../../Component/ConversationRow';
import { RouteName } from '../../../Navigation/routeName';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';
import Emitter from '../../../Util/eventEmitter';
import Strings from '../../../Resources/Strings';
import { SwipeListView } from 'react-native-swipe-list-view';
import Svg, { G, Path } from 'react-native-svg';
import { style } from './style';
import CustomDeleteItem from '../CustomDeleteItem';
import { NoDataFoundView } from '../../../Component/CustomErrorComponent';

const DirectMessages = () => {
  const navigation = useNavigation();
  const userData = useSelector((state) => state.auth.userData);
  const [chatUserList, setChatUserList] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteValue, setDeleteValue] = useState({});
  const renderItem = ({ item, index }) => {
    return (
      <ConversationRow data={item} onPressChat={() => onPressChat(item)} />
    );
  };
  const onPressChat = (data) => {
    navigation.navigate(RouteName.CHAT_DETAIL, {
      chatId: data.chatId,
      receiverId: data.id,
      receiverData: data,
      isOther: false,
    });
  };
  useEffect(() => {
    getChatUserList();
    Emitter.on('ChatRef', () => {
      getChatUserList();
    });
    return () => {
      Emitter.off('ChatRef');
    };
  }, []);

  const getChatUserList = () => {
    try {
      firestore()
        .collection('ChatUserList')
        .doc(userData?.data?.user_id || userData?.data?._id)
        .collection('userlist')
        .orderBy('dateTime', 'desc')
        .onSnapshot(
          (response) => {
            const newData = [];
            var newRow = {};
            response?.docs?.forEach((doc, index) => {
              newRow = doc.data();
              newRow.message_id = doc?.id;
              if (newRow?.role !== Strings.ORGANIZATION) {
                newData.push(newRow);
              }
            });
            setChatUserList(newData);
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.log('error>>>Driect', error);
    }
  };

  const Trash = () => (
    <Svg width={30} height={30} fill="none" xmlns="http://www.w3.org/2000/svg">
      <G
        opacity={0.87}
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M3.75 7.5h22.5M10 7.5V5a2.5 2.5 0 0 1 2.5-2.5h5A2.5 2.5 0 0 1 20 5v2.5m3.75 0V25a2.5 2.5 0 0 1-2.5 2.5H8.75a2.5 2.5 0 0 1-2.5-2.5V7.5h17.5ZM12.5 13.75v7.5M17.5 13.75v7.5" />
      </G>
    </Svg>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={style.hidenContainer}>
      <TouchableOpacity
        style={style.deleteButton}
        onPress={() => {
          setIsDelete(true);
          setDeleteValue(data.item);
          // deleteRow(data.item, data.index);
        }}
      >
        <View>
          <Trash />
        </View>
      </TouchableOpacity>
    </View>
  );

  const deleteRow = (rowMap, rowKey) => {
    firestore()
      .collection('ChatUserList')
      .doc(userData?.data?.user_id || userData?.data?._id)
      .collection('userlist')
      .doc(rowMap.message_id)
      .delete()
      .then(() => {
        setIsDelete(false);
        console.log('User deleted!');
      });
  };
  const listEmptyComponent = () => {
    return (
      <View style={style.emptyView}>
        <NoDataFoundView warning_message={'No connection found'} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.White }}>
      {/* <FlatList data={chatUserList} renderItem={renderItem} /> */}
      <SwipeListView
        data={chatUserList}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-105}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        ListEmptyComponent={listEmptyComponent}
      />
      <CustomDeleteItem
        visible={isDelete}
        onRequestClose={() => setIsDelete(false)}
        name={deleteValue?.name || 'abc'}
        deletePress={() => {
          deleteRow(deleteValue);
        }}
      />
    </View>
  );
};
export default DirectMessages;
