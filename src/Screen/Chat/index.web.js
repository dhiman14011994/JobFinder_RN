import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import Strings from '../../Resources/Strings';
import Colors from '../../Resources/Colors';

import CustomChatHeader from '../../Component/CustomChatHeader';
import ChatWebRoute from '../../Navigation/chatWebRoute';
import { RouteName } from '../../Navigation/routeName';
import { useNavigation } from '@react-navigation/native';
import { fontResize } from '../../Util/font';
import CustomSearchViewWeb from '../../Component/CustomSearchInputWeb';
import { useDispatch, useSelector } from 'react-redux';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { firestore } from '../../Constants/FirebaseWeb';
import {
  CompanyChatDetails,
  DirectChatDetails,
  fetchViewedNotificationAction,
} from '../../Redux/actions/profileAction';
import { isNative } from '../../Util';

const Chat = ({}) => {
  const [activeTab, setTab] = useState(Strings.COMPANIES);
  const window = Dimensions.get('window');
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [showDeleteModal, setDeleteModal] = useState(false);
  const isChatDetails = useSelector((state) => state.profile.isChatDetails);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    getChatUserList();
  }, []);

  const getChatUserList = async () => {
    try {
      const unsub = onSnapshot(
        query(
          collection(
            firestore,
            'ChatUserList',
            userData?.data?.user_id || userData?.data?._id,
            'userlist'
          ),
          orderBy('dateTime', 'desc')
        ),
        (snapshot) => {
          const newData = [];
          const companyNewData = [];
          var newRow = {};
          snapshot?.docs?.forEach((doc, index) => {
            newRow = doc.data();
            newRow.message_id = doc?.id;
            if (newRow?.role !== Strings.ORGANIZATION) {
              newData.push(newRow);
            } else {
              companyNewData.push(newRow);
            }
          });
          dispatch(DirectChatDetails(newData));
          dispatch(CompanyChatDetails(companyNewData));
        }
      );
    } catch (error) {
      console.log('error>>>Driect', error);
    }
  };

  const selectedTab = (text) => {
    if (text === Strings.COMPANIES) {
      setTab(text);
      navigation.navigate(RouteName.COMPANIES_WEB);
    } else if (text === Strings.DIRECT_MESSAGE) {
      setTab(text);
      navigation.navigate(RouteName.DIRECT_WEB);
    } else {
      setTab(text);
      navigation.navigate(RouteName.NOTIFICATION_WEB);
    }
  };
  return (
    <View
      style={{
        height: window.height * 0.6,
        backgroundColor: Colors.White,
        marginVertical: '10%',
        borderRadius: window.height * 0.02,
        overflow: 'hidden',
      }}
    >
      {isChatDetails ? (
        <View />
      ) : (
        <>
          {/* search view */}
          <View style={styles.searchContainer}>
            <Text style={styles.conversationText}>{Strings.CONVERSATIONS}</Text>
            <CustomSearchViewWeb
              placeholder={'search people'}
              onChange={(text) => setSearchText(text)}
              textinputContainer={[styles.textinputContainer]}
            />
          </View>
          <CustomChatHeader
            window={window}
            activeTab={activeTab}
            onTabPress={(text) => selectedTab(text)}
          />
        </>
      )}
      <ChatWebRoute />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingTop: '4%',
    // paddingVertical: '4%',
    paddingHorizontal: '5%',
  },
  conversationText: {
    fontSize: fontResize(24),
    fontFamily: 'Gilroy-Medium',
    fontWeight: '700',
    marginVertical: '5%',
  },
  textinputContainer: {
    backgroundColor: Colors.gray2,
  },
});

export default Chat;
